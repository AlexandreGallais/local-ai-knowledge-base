---
title: "no-this-alias"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-this-alias.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-this-alias

Assigning a variable to `this` instead of properly using arrow lambdas may be a symptom of pre-ES6 practices
or not managing scope well.

## Examples

**❌ Incorrect**

```ts
const self = this;

setTimeout(function () {
  self.doWork();
});
```

**✅ Correct**

```ts
setTimeout(() => {
  this.doWork();
});
```

## Options

### `allowDestructuring`

It can sometimes be useful to destructure properties from a class instance, such as retrieving multiple properties from the instance in one of its methods.
`allowDestructuring` allows those destructures and is `true` by default.
You can explicitly disallow them by setting `allowDestructuring` to `false`.

Examples of code for the `{ "allowDestructuring": false }` option:

**❌ Incorrect**

```ts
class ComponentLike {
  props: unknown;
  state: unknown;

  render() {
    const { props, state } = this;

    console.log(props);
    console.log(state);
  }
}
```

**✅ Correct**

```ts
class ComponentLike {
  props: unknown;
  state: unknown;

  render() {
    console.log(this.props);
    console.log(this.state);
  }
}
```

### `allowedNames`

`no-this-alias` can alternately be used to allow only a specific list of names as `this` aliases.
We recommend against this except as a transitory step towards fixing all rule violations.

Examples of code for the `{ "allowedNames": ["self"] }` option:

**❌ Incorrect**

```ts
class Example {
  method() {
    const that = this;
  }
}
```

**✅ Correct**

```ts
class Example {
  method() {
    const self = this;
  }
}
```

## When Not To Use It

If your project is structured in a way that it needs to assign `this` to variables, this rule is likely not for you.
If only a subset of your project assigns `this` to variables then you might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
