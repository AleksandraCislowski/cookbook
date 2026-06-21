import type { Recipe } from '@/data/recipes';

type UnitForms = {
  few: string;
  many: string;
  one: string;
};

const inflectedUnits: UnitForms[] = [
  { one: 'łyżka', few: 'łyżki', many: 'łyżek' },
  { one: 'łyżeczka', few: 'łyżeczki', many: 'łyżeczek' },
  { one: 'szklanka', few: 'szklanki', many: 'szklanek' },
  { one: 'garść', few: 'garście', many: 'garści' },
  { one: 'opakowanie', few: 'opakowania', many: 'opakowań' },
  { one: 'puszka', few: 'puszki', many: 'puszek' },
  { one: 'plaster', few: 'plastry', many: 'plastrów' },
  { one: 'ząbek', few: 'ząbki', many: 'ząbków' },
];

const unitFormsByVariant = new Map(
  inflectedUnits.flatMap((forms) =>
    Object.values(forms).map((variant) => [variant, forms] as const),
  ),
);
const measuredUnits = new Set(['g', 'kg', 'ml', 'l']);

function parseAmount(value: string) {
  const trimmedValue = value.trim();
  const amount = Number(trimmedValue.replace(',', '.'));

  if (!Number.isFinite(amount)) {
    return undefined;
  }

  return amount;
}

function isIntegerAmount(value: number) {
  return Math.abs(value - Math.round(value)) < 0.001;
}

function getPolishUnitForm(value: number, forms: UnitForms) {
  if (!isIntegerAmount(value)) {
    return forms.few;
  }

  const roundedValue = Math.round(value);
  const lastDigit = roundedValue % 10;
  const lastTwoDigits = roundedValue % 100;

  if (roundedValue === 1) {
    return forms.one;
  }

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return forms.few;
  }

  return forms.many;
}

function getLeadingUnit(rest: string) {
  const unitMatch = rest.trimStart().match(/^([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)/);
  return unitMatch?.[1]?.toLowerCase();
}

function getPracticalUnit(rest: string) {
  const unit = getLeadingUnit(rest);

  if (unit === 'g' || unit === 'ml') {
    return unit;
  }

  return undefined;
}

function shouldUseCountPrefix(rest: string) {
  const unit = getLeadingUnit(rest);

  if (!unit) {
    return false;
  }

  return !measuredUnits.has(unit) && !unitFormsByVariant.has(unit);
}

function getInflectedRest(rest: string, value: number) {
  const restMatch = rest.match(/^(\s*)([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)(.*)$/);

  if (!restMatch) {
    return rest;
  }

  const [, leadingWhitespace, unit, suffix] = restMatch;
  const forms = unitFormsByVariant.get(unit.toLowerCase());

  if (!forms) {
    return rest;
  }

  return `${leadingWhitespace}${getPolishUnitForm(value, forms)}${suffix}`;
}

function roundToNearest(value: number, precision: number) {
  return Math.round(value / precision) * precision;
}

function formatPracticalAmount(value: number, unit?: string) {
  if ((unit === 'g' || unit === 'ml') && value >= 10) {
    const precision = value >= 100 ? 10 : 5;

    return String(roundToNearest(value, precision));
  }

  return undefined;
}

function formatAmount(value: number, rest: string) {
  const practicalAmount = formatPracticalAmount(value, getPracticalUnit(rest));

  if (practicalAmount) {
    return practicalAmount;
  }

  const roundedValue = Math.round(value * 100) / 100;

  if (Number.isInteger(roundedValue)) {
    return String(roundedValue);
  }

  return roundedValue.toLocaleString('pl-PL', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

export function scaleIngredientText(
  ingredient: string,
  multiplier: number,
) {
  if (multiplier === 1) {
    return ingredient;
  }

  const amountMatch = ingredient.match(
    /^(\D*?)(\d+(?:[,.]\d+)?)(\s*)(.+)$/,
  );

  if (!amountMatch) {
    return ingredient;
  }

  const [, prefix, rawAmount, spacing, rest] = amountMatch;
  const amount = parseAmount(rawAmount);

  if (amount === undefined) {
    return ingredient;
  }

  const scaledAmount = amount * multiplier;
  const separator = prefix
    ? spacing
    : shouldUseCountPrefix(rest)
      ? 'x '
      : spacing;

  return `${prefix}${formatAmount(scaledAmount, rest)}${separator}${getInflectedRest(
    rest,
    scaledAmount,
  )}`;
}

type RecipeItemGroups = Recipe['ingredientGroups'];

export function scaleIngredientGroups<TGroups extends RecipeItemGroups>(
  ingredientGroups: TGroups,
  baseServings: number,
  targetServings: number,
): TGroups {
  if (baseServings <= 0 || targetServings <= 0) {
    return ingredientGroups;
  }

  const multiplier = targetServings / baseServings;

  return ingredientGroups.map((group) => ({
    ...group,
    items: group.items.map((ingredient) =>
      scaleIngredientText(ingredient, multiplier),
    ),
  })) as TGroups;
}
