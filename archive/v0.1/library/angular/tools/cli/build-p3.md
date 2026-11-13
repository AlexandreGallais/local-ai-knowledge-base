---
title: "Building Angular apps (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/build.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Building Angular apps (part 3 of 3)

## Configuring CommonJS dependencies

Always prefer native ECMAScript modules (ESM) throughout your application and its dependencies.
ESM is a fully specified web standard and JavaScript language feature with strong static analysis support. This makes bundle optimizations more powerful than other module formats.

Angular CLI also supports importing CommonJS dependencies into your project and will bundle these dependencies automatically.
However, CommonJS modules can prevent bundlers and minifiers from optimizing those modules effectively, which results in larger bundle sizes.
For more information, see How CommonJS is making your bundles larger.

Angular CLI outputs warnings if it detects that your browser application depends on CommonJS modules.
When you encounter a CommonJS dependency, consider asking the maintainer to support ECMAScript modules, contributing that support yourself, or using an alternative dependency which meets your needs.
If the best option is to use a CommonJS dependency, you can disable these warnings by adding the CommonJS module name to `allowedCommonJsDependencies` option in the `build` options located in `angular.json`.

```json
"build": {
  "builder": "@angular/build:application",
  "options": {
     "allowedCommonJsDependencies": [
        "lodash"
     ]
     …
   }
   …
},
```

## Configuring browser compatibility

The Angular CLI uses Browserslist to ensure compatibility with different browser versions.
Depending on supported browsers, Angular will automatically transform certain JavaScript and CSS features to ensure the built application does not use a feature which has not been implemented by a supported browser. However, the Angular CLI will not automatically add polyfills to supplement missing Web APIs. Use the `polyfills` option in `angular.json` to add polyfills.

By default, the Angular CLI uses a `browserslist` configuration which matches browsers supported by Angular for the current major version.

To override the internal configuration, run `ng generate config browserslist`, which generates a `.browserslistrc` configuration file in the project directory matching Angular's supported browsers.

See the browserslist repository for more examples of how to target specific browsers and versions.
Avoid expanding this list to more browsers. Even if your application code more broadly compatible, Angular itself might not be.
You should only ever _reduce_ the set of browsers or versions in this list.

HELPFUL: Use browsersl.ist to display compatible browsers for a `browserslist` query.

## Configuring Tailwind

Angular supports Tailwind CSS, a utility-first CSS framework.

To integrate Tailwind CSS with Angular CLI, see Using Tailwind CSS with Angular

## Critical CSS inlining

Angular can inline the critical CSS definitions of your application to improve First Contentful Paint (FCP).
This option is enabled default. You can disable this inlining in the `styles` customization options.

This optimization extracts the CSS needed to render the initial viewport and inlines it directly into the generated HTML, allowing the browser to display content faster without waiting for the full stylesheets to load. The remaining CSS then loads asynchronously in the background. Angular CLI uses Beasties to analyze your application’s HTML and styles.
