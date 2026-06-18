export const MEAL_PLAN_SCHEMA_VERSION = 1;
export const DEFAULT_MEAL_PLAN_OWNER_ID = 'local';
export const NO_MEAL_VALUE = '__no_meal__';

export const WEEK_DAYS = [
  { key: 'monday', label: 'Poniedziałek', shortLabel: 'Pon' },
  { key: 'tuesday', label: 'Wtorek', shortLabel: 'Wt' },
  { key: 'wednesday', label: 'Środa', shortLabel: 'Śr' },
  { key: 'thursday', label: 'Czwartek', shortLabel: 'Czw' },
  { key: 'friday', label: 'Piątek', shortLabel: 'Pt' },
  { key: 'saturday', label: 'Sobota', shortLabel: 'Sob' },
  { key: 'sunday', label: 'Niedziela', shortLabel: 'Nd' },
] as const;

export const MEAL_SLOTS = [
  { key: 'breakfast', label: 'Śniadanie' },
  { key: 'lunch', label: 'Obiad' },
  { key: 'dinner', label: 'Kolacja' },
] as const;

export type WeekDayKey = (typeof WEEK_DAYS)[number]['key'];
export type MealSlotKey = (typeof MEAL_SLOTS)[number]['key'];
export type DayMealPlan = Record<MealSlotKey, string>;
export type WeeklyMealPlan = Record<WeekDayKey, DayMealPlan>;

export type MealPlanDocument = {
  _id?: string;
  schemaVersion: typeof MEAL_PLAN_SCHEMA_VERSION;
  ownerId: string;
  weekStartsOn: string;
  meals: WeeklyMealPlan;
  createdAt: string;
  updatedAt: string;
};

const emptyDayPlan: DayMealPlan = {
  breakfast: '',
  lunch: '',
  dinner: '',
};

export function getCurrentWeekStartIso(date = new Date()) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const distanceFromMonday = day === 0 ? -6 : 1 - day;

  weekStart.setDate(weekStart.getDate() + distanceFromMonday);
  weekStart.setHours(0, 0, 0, 0);

  return weekStart.toISOString().slice(0, 10);
}

export function createEmptyMealPlan() {
  return WEEK_DAYS.reduce<WeeklyMealPlan>(
    (plan, day) => ({
      ...plan,
      [day.key]: { ...emptyDayPlan },
    }),
    {} as WeeklyMealPlan,
  );
}

export function createMealPlanDocument(
  overrides: Partial<MealPlanDocument> = {},
): MealPlanDocument {
  const timestamp = new Date().toISOString();

  return {
    schemaVersion: MEAL_PLAN_SCHEMA_VERSION,
    ownerId: DEFAULT_MEAL_PLAN_OWNER_ID,
    weekStartsOn: getCurrentWeekStartIso(),
    meals: createEmptyMealPlan(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

export function normalizeDayMealPlan(value: unknown): DayMealPlan {
  if (typeof value === 'string') {
    return {
      ...emptyDayPlan,
      lunch: value,
    };
  }

  if (!value || typeof value !== 'object') {
    return { ...emptyDayPlan };
  }

  const rawDayPlan = value as Partial<Record<MealSlotKey, unknown>>;

  return MEAL_SLOTS.reduce<DayMealPlan>(
    (plan, slot) => ({
      ...plan,
      [slot.key]:
        typeof rawDayPlan[slot.key] === 'string' ? rawDayPlan[slot.key] : '',
    }),
    { ...emptyDayPlan },
  );
}

export function normalizeWeeklyMealPlan(value: unknown): WeeklyMealPlan {
  if (!value || typeof value !== 'object') {
    return createEmptyMealPlan();
  }

  const rawMealPlan = value as Partial<Record<WeekDayKey, unknown>>;

  return WEEK_DAYS.reduce<WeeklyMealPlan>((plan, day) => {
    return {
      ...plan,
      [day.key]: normalizeDayMealPlan(rawMealPlan[day.key]),
    };
  }, createEmptyMealPlan());
}

export function normalizeMealPlanDocument(value: unknown): MealPlanDocument {
  if (!value || typeof value !== 'object') {
    return createMealPlanDocument();
  }

  const rawDocument = value as Partial<Record<keyof MealPlanDocument, unknown>>;
  const looksLikeDocument =
    rawDocument.meals && typeof rawDocument.meals === 'object';
  const timestamp = new Date().toISOString();

  return createMealPlanDocument({
    _id: typeof rawDocument._id === 'string' ? rawDocument._id : undefined,
    ownerId:
      typeof rawDocument.ownerId === 'string'
        ? rawDocument.ownerId
        : DEFAULT_MEAL_PLAN_OWNER_ID,
    weekStartsOn:
      typeof rawDocument.weekStartsOn === 'string'
        ? rawDocument.weekStartsOn
        : getCurrentWeekStartIso(),
    meals: normalizeWeeklyMealPlan(
      looksLikeDocument ? rawDocument.meals : value,
    ),
    createdAt:
      typeof rawDocument.createdAt === 'string'
        ? rawDocument.createdAt
        : timestamp,
    updatedAt:
      typeof rawDocument.updatedAt === 'string'
        ? rawDocument.updatedAt
        : timestamp,
  });
}

export function countPlannedMeals(mealPlan: WeeklyMealPlan) {
  return WEEK_DAYS.reduce((count, day) => {
    return (
      count +
      MEAL_SLOTS.filter((slot) => {
        const value = mealPlan[day.key][slot.key];

        return Boolean(value) && value !== NO_MEAL_VALUE;
      }).length
    );
  }, 0);
}
