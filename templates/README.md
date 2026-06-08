# Recipe Templates

Use `recipe-template.md` as the starting point for new recipes.

Recommended workflow:

```bash
npm run new-recipe -- "Recipe Name"
```

The script creates:

```txt
recipes/recipe-name.md
public/images/recipes/recipe-name/
```

You can copy the template manually, but the script is safer because it keeps the
recipe slug, markdown file, and image folder aligned.
