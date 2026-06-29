const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".heic", ".heif", ".avif"];
const DEFAULT_MAX_WIDTH = 1200;
const DEFAULT_QUALITY = 82;

function printUsage() {
  console.log(`Użycie:
  npm run optimize-recipe-image -- recipe-slug
  npm run optimize-recipe-image -- first-recipe second-recipe third-recipe
  npm run optimize-recipe-image -- public/images/recipes/recipe-slug.png
  npm run optimize-recipe-image -- --all

Opcje:
  --max-width 1200   Maksymalny dłuższy bok obrazu.
  --quality 82       Jakość JPEG dla sips.
  --keep-source      Zachowaj oryginał po utworzeniu .jpg.`);
}

function getOptionValue(args, optionName, fallback) {
  const optionIndex = args.indexOf(optionName);

  if (optionIndex === -1) {
    return fallback;
  }

  const rawValue = args[optionIndex + 1];
  const value = Number(rawValue);

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Niepoprawna wartość ${optionName}: ${rawValue}`);
  }

  return value;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSlugFromInput(input) {
  const filename = path.basename(input);
  const extension = path.extname(filename);

  return slugify(extension ? filename.slice(0, -extension.length) : filename);
}

function findSourceImage(imageRoot, slug, explicitInput) {
  if (explicitInput && fs.existsSync(explicitInput)) {
    return path.resolve(explicitInput);
  }

  for (const extension of IMAGE_EXTENSIONS) {
    const imagePath = path.join(imageRoot, `${slug}${extension}`);

    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

function updateRecipeImageField(recipePath, imageFilename) {
  if (!fs.existsSync(recipePath)) {
    return false;
  }

  const recipeContent = fs.readFileSync(recipePath, "utf8");
  const updatedRecipeContent = recipeContent.match(/^image:\s*.*$/m)
    ? recipeContent.replace(/^image:\s*.*$/m, `image: ${imageFilename}`)
    : recipeContent.replace(/^---\s*\n/, `---\nimage: ${imageFilename}\n`);

  if (updatedRecipeContent !== recipeContent) {
    fs.writeFileSync(recipePath, updatedRecipeContent);
  }

  return true;
}

function getImageDimensions(imagePath) {
  const result = spawnSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", imagePath], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return "";
  }

  const width = result.stdout.match(/pixelWidth:\s*(\d+)/)?.[1];
  const height = result.stdout.match(/pixelHeight:\s*(\d+)/)?.[1];

  return width && height ? `${width}x${height}` : "";
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function optimizeImage({ imageRoot, input, keepSource, maxWidth, projectRoot, quality }) {
  const slug = getSlugFromInput(input);

  if (!slug) {
    throw new Error(`Nie udało się utworzyć sluga z: ${input}`);
  }

  const sourcePath = findSourceImage(imageRoot, slug, input);

  if (!sourcePath) {
    throw new Error(`Nie znaleziono obrazu dla sluga: ${slug}`);
  }

  const outputFilename = `${slug}.jpg`;
  const outputPath = path.join(imageRoot, outputFilename);
  const temporaryOutputPath = path.join(imageRoot, `${slug}.optimized.tmp.jpg`);
  const beforeSize = fs.statSync(sourcePath).size;
  const beforeDimensions = getImageDimensions(sourcePath);
  const result = spawnSync(
    "sips",
    [
      "-Z",
      String(maxWidth),
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      String(quality),
      sourcePath,
      "--out",
      temporaryOutputPath,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    fs.rmSync(temporaryOutputPath, { force: true });
    throw new Error(result.stderr || `Nie udało się zoptymalizować: ${sourcePath}`);
  }

  fs.renameSync(temporaryOutputPath, outputPath);

  const recipePath = path.join(projectRoot, "recipes", `${slug}.md`);
  const recipeUpdated = updateRecipeImageField(recipePath, outputFilename);
  const afterSize = fs.statSync(outputPath).size;
  const afterDimensions = getImageDimensions(outputPath);

  const sourceRemoved = !keepSource && path.resolve(sourcePath) !== path.resolve(outputPath);

  if (sourceRemoved) {
    fs.rmSync(sourcePath);
  }

  console.log(
    [
      `${slug}:`,
      beforeDimensions || null,
      `${formatBytes(beforeSize)} -> ${formatBytes(afterSize)}`,
      afterDimensions ? `(${afterDimensions})` : null,
      recipeUpdated ? "markdown zaktualizowany" : "brak markdown",
      sourceRemoved ? "oryginał usunięty" : null,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    printUsage();
    return;
  }

  const projectRoot = process.cwd();
  const imageRoot = path.join(projectRoot, "public", "images", "recipes");
  const recipeRoot = path.join(projectRoot, "recipes");
  const maxWidth = getOptionValue(args, "--max-width", DEFAULT_MAX_WIDTH);
  const quality = getOptionValue(args, "--quality", DEFAULT_QUALITY);
  const keepSource = args.includes("--keep-source");
  const positionalArgs = args.filter(
    (arg, index) =>
      !arg.startsWith("--") &&
      args[index - 1] !== "--max-width" &&
      args[index - 1] !== "--quality",
  );

  if (!fs.existsSync(imageRoot)) {
    throw new Error(`Brakuje katalogu: ${path.relative(projectRoot, imageRoot)}`);
  }

  if (args.includes("--all")) {
    fs.readdirSync(recipeRoot)
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => filename.slice(0, -".md".length))
      .forEach((slug) =>
        optimizeImage({
          imageRoot,
          input: slug,
          keepSource,
          maxWidth,
          projectRoot,
          quality,
        }),
      );

    return;
  }

  if (positionalArgs.length === 0) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  positionalArgs.forEach((input) =>
    optimizeImage({
      imageRoot,
      input,
      keepSource,
      maxWidth,
      projectRoot,
      quality,
    }),
  );
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
