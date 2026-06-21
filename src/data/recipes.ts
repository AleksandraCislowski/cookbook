import fs from 'node:fs';
import path from 'node:path';

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  cuisine: string;
  prepTime?: number;
  cookTime?: number;
  bakeTime?: number;
  bakeTemperature?: string;
  restTime?: number;
  passiveTime?: number;
  passiveTimeLabel?: string;
  advanceNotice?: string;
  servings?: number;
  image: string;
  ingredients: string[];
  ingredientGroups: {
    title: string;
    items: string[];
  }[];
  spices: string[];
  spiceGroups: {
    title: string;
    items: string[];
  }[];
  steps: string[];
  note: string;
  addedDate: string;
};

type RecipeFrontmatter = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  bakeTime: number;
  bakeTemperature: string;
  restTime: number;
  passiveTime: number;
  passiveTimeLabel: string;
  advanceNotice: string;
  servings: number;
  publishedAt: string;
};

const RECIPES_DIRECTORY = path.join(process.cwd(), 'recipes');
const RECIPE_IMAGE_DIRECTORY = '/images/recipes';

function parseScalar(value: string) {
  const trimmedValue = value.trim();

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function parseFrontmatter(rawFrontmatter: string) {
  const frontmatter: Record<string, string | string[]> = {};
  const lines = rawFrontmatter.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim() || line.startsWith(' ')) {
      continue;
    }

    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (rawValue === '') {
      const values: string[] = [];
      let nextIndex = index + 1;

      while (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const listItem = nextLine.match(/^\s+-\s+(.*)$/);

        if (listItem) {
          values.push(parseScalar(listItem[1]));
          nextIndex += 1;
          continue;
        }

        if (nextLine.startsWith(' ') || !nextLine.trim()) {
          nextIndex += 1;
          continue;
        }

        break;
      }

      if (values.length > 0) {
        frontmatter[key] = values;
        index = nextIndex - 1;
      }

      continue;
    }

    frontmatter[key] = parseScalar(rawValue);
  }

  return frontmatter;
}

function readRequiredString(
  frontmatter: Record<string, string | string[]>,
  key: keyof RecipeFrontmatter,
) {
  const value = frontmatter[key];

  if (typeof value !== 'string' || !value) {
    throw new Error(`Missing required recipe field: ${key}`);
  }

  return value;
}

function readOptionalString(
  frontmatter: Record<string, string | string[]>,
  key: keyof RecipeFrontmatter,
) {
  const value = frontmatter[key];

  if (typeof value !== 'string') {
    return '';
  }

  return value;
}

function readRequiredNumber(
  frontmatter: Record<string, string | string[]>,
  key: keyof RecipeFrontmatter,
) {
  const value = Number(readRequiredString(frontmatter, key));

  if (!Number.isFinite(value)) {
    throw new Error(`Recipe field must be a number: ${key}`);
  }

  return value;
}

function readOptionalNumber(
  frontmatter: Record<string, string | string[]>,
  key: keyof RecipeFrontmatter,
) {
  const rawValue = readOptionalString(frontmatter, key);

  if (!rawValue) {
    return undefined;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    throw new Error(`Recipe field must be a number: ${key}`);
  }

  if (value <= 0) {
    return undefined;
  }

  return value;
}

function readRequiredCategories(
  frontmatter: Record<string, string | string[]>,
  key: keyof RecipeFrontmatter,
) {
  const value = frontmatter[key];
  const categories =
    typeof value === 'string'
      ? value.split(',')
      : Array.isArray(value)
        ? value
        : [];
  const normalizedCategories = categories
    .map((category) => category.trim())
    .filter(Boolean);

  if (normalizedCategories.length === 0) {
    throw new Error(`Missing required recipe field: ${key}`);
  }

  return Array.from(new Set(normalizedCategories)).sort(
    (firstCategory, secondCategory) =>
      firstCategory.localeCompare(secondCategory, 'pl'),
  );
}

function getSection(markdown: string, heading: string) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionMatch = markdown.match(
    new RegExp(
      `^##\\s+${escapedHeading}\\s*$([\\s\\S]*?)(?=^##\\s+|(?![\\s\\S]))`,
      'm',
    ),
  );

  return sectionMatch?.[1].trim() ?? '';
}

function readListItems(section: string) {
  return section
    .split('\n')
    .map((line) => line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/)?.[1]?.trim())
    .filter((value): value is string => Boolean(value));
}

function readGroupedListItems(section: string) {
  const groups: Recipe['ingredientGroups'] = [];
  let currentGroup: Recipe['ingredientGroups'][number] = {
    title: '',
    items: [],
  };

  section.split('\n').forEach((line) => {
    const heading = line.match(/^###\s+(.+)$/)?.[1]?.trim();

    if (heading) {
      if (currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }

      currentGroup = {
        title: heading,
        items: [],
      };

      return;
    }

    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/)?.[1]?.trim();

    if (item) {
      currentGroup.items.push(item);
    }
  });

  if (currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function readNote(markdown: string) {
  const noteSection = getSection(markdown, 'Notatki');
  const listItems = readListItems(noteSection);

  if (listItems.length > 0) {
    return listItems[0];
  }

  return noteSection
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ');
}

function parseRecipeFile(filename: string): Recipe {
  const filePath = path.join(RECIPES_DIRECTORY, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!frontmatterMatch) {
    throw new Error(`Recipe is missing frontmatter: ${filename}`);
  }

  const frontmatter = parseFrontmatter(frontmatterMatch[1]);
  const markdown = fileContent.slice(frontmatterMatch[0].length);
  const slug = readRequiredString(frontmatter, 'slug');
  const ingredientGroups = readGroupedListItems(getSection(markdown, 'Składniki'));
  const spiceGroups = readGroupedListItems(getSection(markdown, 'Przyprawy'));

  return {
    slug,
    title: readRequiredString(frontmatter, 'title'),
    description: readOptionalString(frontmatter, 'description'),
    categories: readRequiredCategories(frontmatter, 'category'),
    cuisine: readOptionalString(frontmatter, 'cuisine'),
    prepTime: readOptionalNumber(frontmatter, 'prepTime'),
    cookTime: readOptionalNumber(frontmatter, 'cookTime'),
    bakeTime: readOptionalNumber(frontmatter, 'bakeTime'),
    bakeTemperature: readOptionalString(frontmatter, 'bakeTemperature'),
    restTime: readOptionalNumber(frontmatter, 'restTime'),
    passiveTime: readOptionalNumber(frontmatter, 'passiveTime'),
    passiveTimeLabel: readOptionalString(frontmatter, 'passiveTimeLabel'),
    advanceNotice: readOptionalString(frontmatter, 'advanceNotice'),
    servings: readOptionalNumber(frontmatter, 'servings'),
    image: `${RECIPE_IMAGE_DIRECTORY}/${slug}.png`,
    ingredients: ingredientGroups.flatMap((group) => group.items),
    ingredientGroups,
    spices: spiceGroups.flatMap((group) => group.items),
    spiceGroups,
    steps: readListItems(getSection(markdown, 'Przygotowanie')),
    note: readNote(markdown),
    addedDate: readRequiredString(frontmatter, 'publishedAt'),
  };
}

export function getRecipes() {
  return fs
    .readdirSync(RECIPES_DIRECTORY)
    .filter((filename) => filename.endsWith('.md'))
    .map(parseRecipeFile)
    .sort((firstRecipe, secondRecipe) =>
      secondRecipe.addedDate.localeCompare(firstRecipe.addedDate),
    );
}

export function getRecipeSlugs() {
  return getRecipes().map((recipe) => recipe.slug);
}

export function getRecipeBySlug(slug: string) {
  return getRecipes().find((recipe) => recipe.slug === slug);
}
