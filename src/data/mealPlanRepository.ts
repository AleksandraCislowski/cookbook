import type { MealPlanDocument, WeeklyMealPlan } from '@/data/mealPlan';

export const MEAL_PLANS_COLLECTION = 'mealPlans';

export type MealPlanLookup = {
  ownerId: string;
  weekStartsOn: string;
};

export type MealPlanWrite = MealPlanLookup & {
  meals: WeeklyMealPlan;
};

export type MealPlanRepository = {
  findByWeek: (lookup: MealPlanLookup) => Promise<MealPlanDocument | null>;
  upsertWeek: (write: MealPlanWrite) => Promise<MealPlanDocument>;
};

export const mealPlanMongoIndexes = [
  {
    key: { ownerId: 1, weekStartsOn: 1 },
    options: { unique: true, name: 'owner_week_unique' },
  },
] as const;
