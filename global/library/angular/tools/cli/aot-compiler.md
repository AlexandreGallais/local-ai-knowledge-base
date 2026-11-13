---
title: "Ahead-of-time (AOT) compilation (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/aot-compiler.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Ahead-of-time (AOT) compilation

An Angular application consists mainly of components and their HTML templates.
Because the components and templates provided by Angular cannot be understood by the browser directly, Angular applications require a compilation process before they can run in a browser.

The Angular ahead-of-time (AOT) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase _before_ the browser downloads and runs that code.
Compiling your application during the build process provides a faster rendering in the browser.

This guide explains how to specify metadata and apply available compiler options to compile your applications efficiently using the AOT compiler.

HELPFUL: Watch Alex Rickabaugh explain the Angular compiler at AngularConnect 2019.

Here are some reasons you might want to use AOT.

| Reasons                                 | Details                                                                                                                                                                                                                                            |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Faster rendering                        | With AOT, the browser downloads a pre-compiled version of the application. The browser loads executable code so it can render the application immediately, without waiting to compile the application first.                                       |
| Fewer asynchronous requests             | The compiler _inlines_ external HTML templates and CSS style sheets within the application JavaScript, eliminating separate ajax requests for those source files.                                                                                  |
| Smaller Angular framework download size | There's no need to download the Angular compiler if the application is already compiled. The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.                                              |
| Detect template errors earlier          | The AOT compiler detects and reports template binding errors during the build step before users can see them.                                                                                                                                      |
| Better security                         | AOT compiles HTML templates and components into JavaScript files long before they are served to the client. With no templates to read and no risky client-side HTML or JavaScript evaluation, there are fewer opportunities for injection attacks. |

## Choosing a compiler

Angular offers two ways to compile your application:

| Angular compile       | Details                                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------ |
| Just-in-Time \(JIT\)  | Compiles your application in the browser at runtime. This was the default until Angular 8.        |
| Ahead-of-Time \(AOT\) | Compiles your application and libraries at build time. This is the default starting in Angular 9. |

When you run the `ng build` \(build only\) or `ng serve` \(build and serve locally\) CLI commands, the type of compilation \(JIT or AOT\) depends on the value of the `aot` property in your build configuration specified in `angular.json`.
By default, `aot` is set to `true` for new CLI applications.

See the CLI command reference and Building and serving Angular apps for more information.

## How AOT works

The Angular AOT compiler extracts **metadata** to interpret the parts of the application that Angular is supposed to manage.
You can specify the metadata explicitly in **decorators** such as `@Component()`, or implicitly in the constructor declarations of the decorated classes.
The metadata tells Angular how to construct instances of your application classes and interact with them at runtime.

In the following example, the `@Component()` metadata object and the class constructor tell Angular how to create and display an instance of `Typical`.

```angular-ts
@Component({
  selector: 'app-typical',
  template: '<div>A typical component for {{data().name}}</div>',
})
export class Typical {
  data = input.required<TypicalData>();
  private someService = inject(SomeService);
}
```

The Angular compiler extracts the metadata _once_ and generates a _factory_ for `Typical`.
When it needs to create a `Typical` instance, Angular calls the factory, which produces a new visual element, bound to a new instance of the component class with its injected dependency.

### Compilation phases

There are three phases of AOT compilation.

|     | Phase                  | Details                                                                                                                                                                                                                                                                                                                     |
| :-- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | code analysis          | In this phase, the TypeScript compiler and _AOT collector_ create a representation of the source. The collector does not attempt to interpret the metadata it collects. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.                                           |
| 2   | code generation        | In this phase, the compiler's `StaticReflector` interprets the metadata collected in phase 1, performs additional validation of the metadata, and throws an error if it detects a metadata restriction violation.                                                                                                           |
| 3   | template type checking | In this phase, the Angular _template compiler_ uses the TypeScript compiler to validate the binding expressions in templates. Strict checking in this phase is enabled by default and controlled by the `strictTemplates` configuration option; see Angular compiler options. |

### Metadata restrictions

You write metadata in a _subset_ of TypeScript that must conform to the following general constraints:

- Limit expression syntax to the supported subset of JavaScript
- Only reference exported symbols after code folding
- Only call functions supported by the compiler
- Input/Outputs and data-bound class members must be public or protected.For additional guidelines and instructions on preparing an application for AOT compilation, see Angular: Writing AOT-friendly applications.

HELPFUL: Errors in AOT compilation commonly occur because of metadata that does not conform to the compiler's requirements \(as described more fully below\).
For help in understanding and resolving these problems, see AOT Metadata Errors.

### Configuring AOT compilation

You can provide options in the TypeScript configuration file that controls the compilation process.
See Angular compiler options for a complete list of available options.

## Phase 1: Code analysis

The TypeScript compiler does some of the analytic work of the first phase.
It emits the `.d.ts` _type definition files_ with type information that the AOT compiler needs to generate application code.
At the same time, the AOT **collector** analyzes the metadata recorded in the Angular decorators and outputs metadata information in **`.metadata.json`** files, one per `.d.ts` file.

You can think of `.metadata.json` as a diagram of the overall structure of a decorator's metadata, represented as an abstract syntax tree (AST).

HELPFUL: Angular's schema.ts describes the JSON format as a collection of TypeScript interfaces.

### Expression syntax limitations

The AOT collector only understands a subset of JavaScript.
Define metadata objects with the following limited syntax:

| Syntax                    | Example                                                    |
| :------------------------ | :--------------------------------------------------------- |
| Literal object            | `{cherry: true, apple: true, mincemeat: false}`            |
| Literal array             | `['cherries', 'flour', 'sugar']`                           |
| Spread in literal array   | `['apples', 'flour', …]`                                   |
| Calls                     | `bake(ingredients)`                                        |
| New                       | `new Oven()`                                               |
| Property access           | `pie.slice`                                                |
| Array index               | `ingredients[0]`                                           |
| Identity reference        | `Component`                                                |
| A template string         | ``pie is ${multiplier} times better than cake`` |
| Literal string            | `'pi'`                                                     |
| Literal number            | `3.14153265`                                               |
| Literal boolean           | `true`                                                     |
| Literal null              | `null`                                                     |
| Supported prefix operator | `!cake`                                                    |
| Supported binary operator | `a+b`                                                      |
| Conditional operator      | `a ? b : c`                                                |
| Parentheses               | `(a+b)`                                                    |

If an expression uses unsupported syntax, the collector writes an error node to the `.metadata.json` file.
The compiler later reports the error if it needs that piece of metadata to generate the application code.

HELPFUL: If you want `ngc` to report syntax errors immediately rather than produce a `.metadata.json` file with errors, set the `strictMetadataEmit` option in the TypeScript configuration file.

```json

"angularCompilerOptions": {
  …
  "strictMetadataEmit" : true
}

```

Angular libraries have this option to ensure that all Angular `.metadata.json` files are clean and it is a best practice to do the same when building your own libraries.

### Code folding

The compiler can only resolve references to **_exported_** symbols.
The collector, however, can evaluate an expression during collection and record the result in the `.metadata.json`, rather than the original expression.
This allows you to make limited use of non-exported symbols within expressions.

For example, the collector can evaluate the expression `1 + 2 + 3 + 4` and replace it with the result, `10`.
This process is called _folding_.
An expression that can be reduced in this manner is _foldable_.

The collector can evaluate references to module-local `const` declarations and initialized `var` and `let` declarations, effectively removing them from the `.metadata.json` file.

Consider the following component definition:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template,
})
export class Hero {
  hero = input.required<Hero>();
}
```

The compiler could not refer to the `template` constant because it isn't exported.
The collector, however, can fold the `template` constant into the metadata definition by in-lining its contents.
The effect is the same as if you had written:

```angular-ts
@Component({
  selector: 'app-hero',
  template: '<div>{{hero().name}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

There is no longer a reference to `template` and, therefore, nothing to trouble the compiler when it later interprets the _collector's_ output in `.metadata.json`.

You can take this example a step further by including the `template` constant in another expression:

```angular-ts
const template = '<div>{{hero().name}}</div>';

@Component({
  selector: 'app-hero',
  template: template + '<div>{{hero().title}}</div>',
})
export class Hero {
  hero = input.required<Hero>();
}
```

The collector reduces this expression to its equivalent _folded_ string:

```angular-ts
'<div>{{hero().name}}</div><div>{{hero().title}}</div>';
```

#### Foldable syntax

The following table describes which expressions the collector can and cannot fold:

| Syntax                           | Foldable                                 |
| :------------------------------- | :--------------------------------------- |
| Literal object                   | yes                                      |
| Literal array                    | yes                                      |
| Spread in literal array          | no                                       |
| Calls                            | no                                       |
| New                              | no                                       |
| Property access                  | yes, if target is foldable               |
| Array index                      | yes, if target and index are foldable    |
| Identity reference               | yes, if it is a reference to a local     |
| A template with no substitutions | yes                                      |
| A template with substitutions    | yes, if the substitutions are foldable   |
| Literal string                   | yes                                      |
| Literal number                   | yes                                      |
| Literal boolean                  | yes                                      |
| Literal null                     | yes                                      |
| Supported prefix operator        | yes, if operand is foldable              |
| Supported binary operator        | yes, if both left and right are foldable |
| Conditional operator             | yes, if condition is foldable            |
| Parentheses                      | yes, if the expression is foldable       |

If an expression is not foldable, the collector writes it to `.metadata.json` as an AST for the compiler to resolve.
