---
title: "no-unused-private-class-members"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unused-private-class-members.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unused-private-class-members

This rule extends the base `eslint/no-unused-private-class-members` rule.
It adds support for members declared with TypeScript's `private` keyword.

## Options

This rule has no options.

## Examples

**❌ Incorrect**

```ts
class A {
  private foo = 123;
}
```

**✅ Correct**

```tsx
class A {
  private foo = 123;

  constructor() {
    console.log(this.foo);
  }
}
```

## Limitations

This rule does not detect the following cases:

(1) Private members only used via a variable that would require type analysis to resolve the type.

```ts
type T = Foo;
class Foo {
  private prop = 123;

  method1(a: Foo) {
    // ✅ Detected as a usage
    const prop = this.prop;

    // ✅ Detected as a usage (variables with explicit and simple type annotations are handled)
    const otherProp = a.prop;
  }

  method2(a: T) {
    // ❌ NOT detected as a usage (complex type annotation that requires type information to handle)
    const prop = a.prop;
  }
}
```

(2) Usages of the private member outside of the class:

```ts
class Foo {
  private prop = 123;
}

const instance = new Foo();
// ❌ NOT detected as a usage
console.log(foo['prop']);
```

(3) Reassignments of `this` multiple times:

```ts
class Foo {
  private prop = 123;

  foo() {
    const self1 = this;
    const self2 = self1;
    return self2.prop;
  }
}
```

(4) Mutable reassignments of `this`:

```ts
class Foo {
  private prop = 123;
  private parent: Foo | null;

  foo() {
    let self = this;
    while (self.parent != null) {
      self = self.parent;
    }
    return self.prop;
  }
}
```

## When Not To Use It

If you don't want to be notified about unused private class members, you can safely turn this rule off.
