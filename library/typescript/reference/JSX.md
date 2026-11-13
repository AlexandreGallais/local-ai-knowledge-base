---
title: "JSX (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/reference/JSX.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# JSX

JSX is an embeddable XML-like syntax.
It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific.
JSX rose to popularity with the React framework, but has since seen other implementations as well.
TypeScript supports embedding, type checking, and compiling JSX directly to JavaScript.

## Basic usage

In order to use JSX you must do two things.

1. Name your files with a `.tsx` extension
2. Enable the `jsx` option

TypeScript ships with several JSX modes: `preserve`, `react` (classic runtime), `react-jsx` (automatic runtime), `react-jsxdev` (automatic development runtime), and `react-native`.
The `preserve` mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel).
Additionally the output will have a `.jsx` file extension.
The `react` mode will emit `React.createElement`, does not need to go through a JSX transformation before use, and the output will have a `.js` file extension.
The `react-native` mode is the equivalent of `preserve` in that it keeps all JSX, but the output will instead have a `.js` file extension.

| Mode           | Input     | Output                                            | Output File Extension |
| -------------- | --------- | ------------------------------------------------- | --------------------- |
| `preserve`     | `` | ``                                         | `.jsx`                |
| `react`        | `` | `React.createElement("div")`                      | `.js`                 |
| `react-native` | `` | ``                                         | `.js`                 |
| `react-jsx`    | `` | `_jsx("div", {}, void 0);`                        | `.js`                 |
| `react-jsxdev` | `` | `_jsxDEV("div", {}, void 0, false, {...}, this);` | `.js`                 |

You can specify this mode using either the `jsx` command line flag or the corresponding option `jsx` in your tsconfig.json file.

> \*Note: You can specify the JSX factory function to use when targeting react JSX emit with `jsxFactory` option (defaults to `React.createElement`)

## The `as` operator

Recall how to write a type assertion:

```ts
const foo = <Foo>bar;
```

This asserts the variable `bar` to have the type `Foo`.
Since TypeScript also uses angle brackets for type assertions, combining it with JSX's syntax would introduce certain parsing difficulties. As a result, TypeScript disallows angle bracket type assertions in `.tsx` files.

Since the above syntax cannot be used in `.tsx` files, an alternate type assertion operator should be used: `as`.
The example can easily be rewritten with the `as` operator.

```ts
const foo = bar as Foo;
```

The `as` operator is available in both `.ts` and `.tsx` files, and is identical in behavior to the angle-bracket type assertion style.
