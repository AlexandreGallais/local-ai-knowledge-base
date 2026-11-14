---
title: "ban-ts-comment"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/ban-ts-comment.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# ban-ts-comment

TypeScript provides several comment directives that can be used to alter how it processes files.
Using these to suppress TypeScript compiler errors reduces the effectiveness of TypeScript overall.
Instead, it's generally better to correct the types of code, to make directives unnecessary.

The comment directives supported by TypeScript are:

```ts
// @ts-expect-error
// @ts-ignore
// @ts-nocheck
// @ts-check
```

This rule lets you set which comment directives you want to allow in your codebase.

## Options

By default, `@ts-check` is allowed, as it enables rather than suppresses errors, and `@ts-expect-error` is allowed when it includes a description. `@ts-ignore` and `@ts-nocheck` are reported.

### `ts-expect-error`, `ts-ignore`, `ts-nocheck`, `ts-check` directives

A value of `true` for a particular directive means that this rule will report if it finds any usage of said directive.

**❌ Incorrect**

```ts
if (false) {
  // @ts-ignore: Unreachable code error
  console.log('hello');
}
if (false) {
  /* @ts-ignore: Unreachable code error */
  console.log('hello');
}
```

**✅ Correct**

```ts
if (false) {
  // Compiler warns about unreachable code error
  console.log('hello');
}
```

### `allow-with-description`

A value of `'allow-with-description'` for a particular directive means that this rule will report if it finds a directive that does not have a description following the directive (on the same line).

For example, with `{ 'ts-expect-error': 'allow-with-description' }`:

**❌ Incorrect**

```ts
if (false) {
  // @ts-expect-error
  console.log('hello');
}
if (false) {
  /* @ts-expect-error */
  console.log('hello');
}
```

**✅ Correct**

```ts
if (false) {
  // @ts-expect-error: Unreachable code error
  console.log('hello');
}
if (false) {
  /* @ts-expect-error: Unreachable code error */
  console.log('hello');
}
```

### `descriptionFormat`

For each directive type, you can specify a custom format in the form of a regular expression. Only description that matches the pattern will be allowed.

For example, with `{ 'ts-expect-error': { descriptionFormat: '^: TS\\d+ because .+$' } }`:

**❌ Incorrect**

```ts
// @ts-expect-error: the library definition is wrong
const a = doSomething('hello');
```

**✅ Correct**

```ts
// @ts-expect-error: TS1234 because the library definition is wrong
const a = doSomething('hello');
```

### `minimumDescriptionLength`

Use `minimumDescriptionLength` to set a minimum length for descriptions when using the `allow-with-description` option for a directive.

For example, with `{ 'ts-expect-error': 'allow-with-description', minimumDescriptionLength: 10 }` the following pattern is:

**❌ Incorrect**

```ts
if (false) {
  // @ts-expect-error: TODO
  console.log('hello');
}
```

**✅ Correct**

```ts
if (false) {
  // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
  console.log('hello');
}
```

## When Not To Use It

If your project or its dependencies were not architected with strong type safety in mind, it can be difficult to always adhere to proper TypeScript semantics.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- TypeScript Type Checking JavaScript Files
