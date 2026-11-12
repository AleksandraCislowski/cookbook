# Recipe Templates

Use `recipe-template.md` as the starting point for new recipes.

Recommended workflow:

```bash
npm run new-recipe -- "Recipe Name"
```

The script creates:

```txt
recipes/recipe-name.md
```

Each recipe should have one matching image:

```txt
public/images/recipes/recipe-name.jpg
```

The script is safer than copying the template manually because it keeps the slug
and markdown filename aligned.

Set `cuisine` to one cuisine, or separate multiple cuisines with commas when
appropriate, for example `cuisine: Włoska, Fast food`. Each cuisine is shown and
filtered separately; a single cuisine is enough for most recipes.

After adding the source image, optimize it:

```bash
npm run optimize-recipe-image -- recipe-name
```
