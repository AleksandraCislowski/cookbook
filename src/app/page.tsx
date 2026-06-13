import { CookbookHome } from '@/components/CookbookHome';
import { getRecipes } from '@/data/recipes';

export default function HomePage() {
  const recipes = getRecipes();

  return <CookbookHome recipes={recipes} />;
}
