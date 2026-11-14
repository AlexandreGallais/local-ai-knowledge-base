---
title: "Using Tailwind CSS with Angular"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/tailwind.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Using Tailwind CSS with Angular

Tailwind CSS is a utility-first CSS framework that can be used to build modern websites without ever leaving your HTML. This guide will walk you through setting up Tailwind CSS in your Angular project.

## Automated Setup with `ng add`

Angular CLI provides a streamlined way to integrate Tailwind CSS into your project using the `ng add` command. This command automatically installs the necessary packages, configures Tailwind CSS, and updates your project's build settings.

First, navigate to your Angular project's root directory in a terminal and run the following command:

```shell
ng add tailwindcss
```

This command performs the following actions:

- Installs `tailwindcss` and its peer dependencies.
- Configures the project to use Tailwind CSS.
- Adds the Tailwind CSS `@import` statement to your styles.

After running `ng add tailwindcss`, you can immediately start using Tailwind's utility classes in your component templates.

## Manual Setup (Alternative Method)

If you prefer to set up Tailwind CSS manually, follow these steps:

### 1. Create an Angular project

First, create a new Angular project if you don't have one set up already.

```shell
ng new my-project
cd my-project
```

### 2. Install Tailwind CSS

Next, open a terminal in your Angular project's root directory and run the following command to install Tailwind CSS and its peer dependencies:

```
  
    npm install tailwindcss @tailwindcss/postcss postcss
```
  File: `yarn`

```shell
    yarn add tailwindcss @tailwindcss/postcss postcss
```
  File: `pnpm`

```shell
    pnpm add tailwindcss @tailwindcss/postcss postcss
```
  File: `bun`

```shell
    bun add tailwindcss @tailwindcss/postcss postcss
```

### 3. Configure PostCSS Plugins

Next, add a `.postcssrc.json` file in the file root of the project.
Add the `@tailwindcss/postcss` plugin into your PostCSS configuration.

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 4. Import Tailwind CSS

Add an `@import` to `./src/styles.css` that imports Tailwind CSS.

```css
@import 'tailwindcss';
```

If you're using SCSS, add `@use` to `./src/styles.scss`.

```scss
@use 'tailwindcss';
```

### 5. Start using Tailwind in your project

You can now start using Tailwind's utility classes in your component templates to style your application. Run your build process with `ng serve` and you should see the styled heading.

For example, you can add the following to your `app.html` file:

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```

## Additional Resources

- Tailwind CSS Documentation
