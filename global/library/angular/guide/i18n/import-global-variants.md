---
title: "Import global variants of the locale data"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/import-global-variants.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Import global variants of the locale data

The Angular CLI automatically includes locale data if you run the `ng build` command with the `--localize` option.

```shell
ng build --localize
```

HELPFUL: The initial installation of Angular already contains locale data for English in the United States \(`en-US`\).
The Angular CLI automatically includes the locale data and sets the `LOCALE_ID` value when you use the `--localize` option with `ng build` command.

The `@angular/common` package on npm contains the locale data files.
Global variants of the locale data are available in `@angular/common/locales/global`.

## `import` example for French

For example, you could import the global variants for French \(`fr`\) in `main.ts` where you bootstrap the application.

File: `src/main.ts (import locale)`

```ts
import '@angular/common/locales/global/fr';
```

HELPFUL: In an `NgModules` application, you would import it in your `app.module`.
