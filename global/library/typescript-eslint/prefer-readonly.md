---
title: "prefer-readonly"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-readonly.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-readonly

Private member variables (whether using the `private` modifier or private `#` fields) are never permitted to be modified outside of their declaring class.
If that class never modifies their value, they may safely be marked as `readonly`.

This rule reports on private members are marked as `readonly` if they're never modified outside of the constructor.

## Examples

**❌ Incorrect**

```ts
class Container {
  // These member variables could be marked as readonly
  private neverModifiedMember = true;
  private onlyModifiedInConstructor: number;
  #neverModifiedPrivateField = 3;

  public constructor(
    onlyModifiedInConstructor: number,
    // Private parameter properties can also be marked as readonly
    private neverModifiedParameter: string,
  ) {
    this.onlyModifiedInConstructor = onlyModifiedInConstructor;
  }
}
```

**✅ Correct**

```ts
class Container {
  // Public members might be modified externally
  public publicMember: boolean;

  // Protected members might be modified by child classes
  protected protectedMember: number;

  // This is modified later on by the class
  private modifiedLater = 'unchanged';

  public mutate() {
    this.modifiedLater = 'mutated';
  }

  // This is modified later on by the class
  #modifiedLaterPrivateField = 'unchanged';

  public mutatePrivateField() {
    this.#modifiedLaterPrivateField = 'mutated';
  }
}
```

## Options

### `onlyInlineLambdas`

```jsonc
{
  "@typescript-eslint/prefer-readonly": [
    "error",
    { "onlyInlineLambdas": true },
  ],
}
```

Example of code for the `{ "onlyInlineLambdas": true }` options:

**❌ Incorrect**

```ts
class Container {
  private onClick = () => {
    /* ... */
  };
}
```

**✅ Correct**

```ts
class Container {
  private neverModifiedPrivate = 'unchanged';
}
```

## When Not To Use It

If you aren't trying to enforce strong immutability guarantees, this rule may be too restrictive for your project.
