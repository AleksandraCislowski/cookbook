import type { MetadataRoute } from 'next';
import { getRecipes } from '@/data/recipes';
import { getAbsoluteUrl } from '@/utils/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const recipes = getRecipes();

  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...recipes.map((recipe) => ({
      url: getAbsoluteUrl(`/recipes/${recipe.slug}`),
      lastModified: new Date(recipe.addedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
