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

function normalizeTitle(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

if (!titleInput) {
  console.error('Użycie: npm run new-recipe -- "Nazwa przepisu"');
  process.exit(1);
}

const slug = slugify(titleInput);

if (!slug) {
  console.error("Nie udało się utworzyć poprawnego sluga z tej nazwy.");
  process.exit(1);
}

const projectRoot = process.cwd();
const recipePath = path.join(projectRoot, "recipes", `${slug}.md`);
const imageRoot = path.join(projectRoot, "public", "images", "recipes");
const imagePath = path.join(imageRoot, `${slug}.png`);
const templatePath = path.join(projectRoot, "templates", "recipe-template.md");

if (fs.existsSync(recipePath)) {
  console.error(`Przepis już istnieje: recipes/${slug}.md`);
  process.exit(1);
}

if (fs.existsSync(imagePath)) {
  console.error(`Zdjęcie już istnieje: public/images/recipes/${slug}.png`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const title = normalizeTitle(titleInput);
const today = new Date().toISOString().slice(0, 10);
const recipeContent = template
  .replace('title: "Nazwa przepisu"', `title: "${title}"`)
  .replace("slug: recipe-name", `slug: ${slug}`)
  .replace("image: recipe-name.png", `image: ${slug}.png`)
  .replace('publishedAt: "YYYY-MM-DD"', `publishedAt: "${today}"`)
  .replace('updatedAt: "YYYY-MM-DD"', `updatedAt: "${today}"`);

fs.mkdirSync(imageRoot, { recursive: true });
fs.writeFileSync(recipePath, recipeContent);

console.log(`Utworzono recipes/${slug}.md`);
console.log("");
console.log("Następne kroki:");
console.log(`1. Dodaj zdjęcie public/images/recipes/${slug}.png`);
console.log("2. Uzupełnij kategorie, tagi, czasy, składniki i przygotowanie.");
console.log("3. Przed publikacją odpal npm run build.");
