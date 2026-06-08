const fs = require("fs");
const path = require("path");

const titleInput = process.argv.slice(2).join(" ").trim();

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

if (!titleInput) {
  console.error('Usage: npm run new-recipe -- "Recipe Name"');
  process.exit(1);
}

const slug = slugify(titleInput);

if (!slug) {
  console.error("Could not create a valid slug from this title.");
  process.exit(1);
}

const projectRoot = process.cwd();
const recipePath = path.join(projectRoot, "recipes", `${slug}.md`);
const imageDirectory = path.join(projectRoot, "public", "images", "recipes", slug);
const templatePath = path.join(projectRoot, "templates", "recipe-template.md");

if (fs.existsSync(recipePath)) {
  console.error(`Recipe already exists: recipes/${slug}.md`);
  process.exit(1);
}

if (fs.existsSync(imageDirectory)) {
  console.error(`Image directory already exists: public/images/recipes/${slug}/`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const title = toTitleCase(titleInput);
const today = new Date().toISOString().slice(0, 10);
const recipeContent = template
  .replace('title: "Recipe Name"', `title: "${title}"`)
  .replace("slug: recipe-name", `slug: ${slug}`)
  .replace("image: recipe-name1.jpg", `image: ${slug}1.jpg`)
  .replace("  - recipe-name2.jpg", `  - ${slug}2.jpg`)
  .replace("  - recipe-name3.jpg", `  - ${slug}3.jpg`)
  .replace('publishedAt: "YYYY-MM-DD"', `publishedAt: "${today}"`)
  .replace('updatedAt: "YYYY-MM-DD"', `updatedAt: "${today}"`);

fs.mkdirSync(imageDirectory, { recursive: true });
fs.writeFileSync(recipePath, recipeContent);

console.log(`Created recipes/${slug}.md`);
console.log(`Created public/images/recipes/${slug}/`);
console.log("");
console.log("Next steps:");
console.log(`1. Add images named ${slug}1.jpg, ${slug}2.jpg, ...`);
console.log("2. Fill in category, cuisine, tags, timing, ingredients, and instructions.");
console.log("3. Run npm run build before publishing.");
