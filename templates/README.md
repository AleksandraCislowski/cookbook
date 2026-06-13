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
public/images/recipes/recipe-name.png
```

The script is safer than copying the template manually because it keeps the slug
and markdown filename aligned.
