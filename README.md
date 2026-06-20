# Personal Cookbook

A personal recipe library built with Next.js, React, TypeScript, and MUI.

This project grew out of a very practical problem: I love cooking, but I was
tired of losing recipes across websites, saved posts, TikToks, notes, screenshots,
and messages. Personal Cookbook brings everything into one focused place, shaped
around the way I actually cook.

It is part kitchen companion, part content system, and part UI project. The goal
is not only to store recipes, but to make them easy to find, read, scale, and use
while cooking.

## Why I Built It

Cooking is one of my favourite things to do, and over time my recipes became
scattered across too many sources. I wanted a small product that solves that
everyday friction for me:

- one place for trusted recipes,
- a structure that fits my cooking habits,
- fast search and filtering when I do not know what to make,
- clean recipe pages that are comfortable to use in the kitchen,
- a workflow that makes adding new recipes simple and repeatable.

The project is intentionally personal, but built like a real application: typed
data, reusable components, a documented content workflow, and a UI designed for
actual use rather than a static portfolio screenshot.

## What It Does

- Browses recipes from local Markdown files.
- Supports recipe search across titles, descriptions, categories, cuisines,
  ingredients, and spices.
- Filters by category and cuisine.
- Sorts recipes by newest, fastest, or title.
- Shows recipe cards, recipe detail pages, metadata, ingredients, spices,
  instructions, notes, and images.
- Includes a cooking mode with large step-by-step instructions and progress.
- Supports serving-size scaling for ingredients.
- Provides a `new-recipe` script for generating consistent recipe files.
- Uses AI-assisted image styling to transform my own food photos into a cohesive
  kawaii-inspired visual style.

## AI Image Workflow

The recipe images start from my own food photos. I use AI as a creative tool to
adapt those photos into a playful kawaii style, so the cookbook feels consistent,
personal, and more visually distinctive than a folder of raw phone pictures.

This is not used to replace the cooking itself. It is used as a design layer:
real meals, real recipes, styled into a coherent visual language for the app.

## Tech Stack

- Next.js
- React
- TypeScript
- MUI
- Markdown recipe files with frontmatter
- Local content loader using Node.js file-system APIs

## Project Structure

```txt
recipes/                       Markdown recipe source files
public/images/recipes/          Recipe images
src/app/                        Next.js app routes
src/components/                 Reusable cookbook UI components
src/data/recipes.ts             Recipe loader and parser
src/utils/                      Recipe formatting and scaling helpers
scripts/new-recipe.js           Recipe scaffolding script
templates/recipe-template.md    Markdown recipe template
docs/content-workflow.md        Content authoring guide
```

## Running Locally

```bash
npm install
npm run dev
```

The app runs on:

```txt
http://localhost:3000
```

To check the project:

```bash
npm run typecheck
npm run build
```

## Adding A Recipe

```bash
npm run new-recipe -- "Recipe Name"
```

This creates a new Markdown file in `recipes/` using the shared template. Recipe
content is written in Polish because the app is made for my personal everyday
use, while the code and project documentation stay in English.

More details are documented in [docs/content-workflow.md](./docs/content-workflow.md).

## What This Project Shows

This project demonstrates how I approach product-minded frontend work:

- turning a real personal need into a focused application,
- designing reusable UI around practical user flows,
- keeping content editable without touching application code,
- using TypeScript to make local content safer to consume,
- combining engineering, visual design, and AI-assisted creative tooling,
- documenting the workflow so the project can grow without becoming messy.

It is a small project by scope, but it reflects the kind of software I like to
build: useful, personal, maintainable, and designed around real behaviour.
