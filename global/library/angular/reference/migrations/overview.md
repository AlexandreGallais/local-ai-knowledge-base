---
title: "Migrations"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/migrations/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrations

Learn about how you can migrate your existing angular project to the latest features incrementally.

  **Standalone**
    Standalone components provide a simplified way to build Angular applications. Standalone components specify their dependencies directly instead of getting them through NgModules.

  **Control Flow Syntax**
    Built-in Control Flow Syntax allows you to use more ergonomic syntax which is close to JavaScript and has better type checking. It replaces the need to import `CommonModule` to use functionality like `*ngFor`, `*ngIf` and `*ngSwitch`.

  **inject() Function**
    Angular's `inject` function offers more accurate types and better compatibility with standard decorators, compared to constructor-based injection.

  **Lazy-loaded routes**
    Convert eagerly loaded component routes to lazy loaded ones. This allows the build process to split production bundles into smaller chunks, to load less JavaScript at initial page load.

  **New `input()` API**
    Convert existing `@Input` fields to the new signal input API that is now production ready.

  **New `output()` function**
    Convert existing `@Output` custom events to the new output function that is now production ready.

  **Queries as signal**
    Convert existing decorator query fields to the improved signal queries API. The API is now production ready.

  **Cleanup unused imports**
    Clean up unused imports in your project.

  **Self-closing tags**
    Convert component templates to use self-closing tags where possible.

  **NgClass to Class Bindings**
      Convert component templates to prefer class bindings over the `NgClass` directives when possible.

  **NgStyle to Style Bindings**
      Convert component templates to prefer style bindings over the `NgStyle` directives when possible.

  **RouterTestingModule migration**
    Convert `RouterTestingModule` usages to `RouterModule` in TestBed configurations and add `provideLocationMocks()` when appropriate.

  **CommonModule to standalone imports**
    Replace imports of the `CommonModule` with imports of the individual directives and pipes used in the templates when possible.

  **Injectable to Service**
    Convert eligible `@Injectable` classes to the `@Service` decorator.
