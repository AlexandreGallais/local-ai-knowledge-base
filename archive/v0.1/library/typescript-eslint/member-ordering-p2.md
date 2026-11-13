---
title: "member-ordering (part 2 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/member-ordering.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# member-ordering (part 2 of 3)

## Examples

### General Order on All Constructs

This config specifies the order for all constructs.
It ignores member types other than signatures, methods, constructors, and fields.
It also ignores accessibility and scope.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "default": ["signature", "method", "constructor", "field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  B: string; // -> field

  new (); // -> constructor

  A(): void; // -> method

  [Z: string]: any; // -> signature
}
```

```ts
type Foo = {
  B: string; // -> field

  // no constructor

  A(): void; // -> method

  // no signature
};
```

```ts
class Foo {
  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field

  constructor() {} // -> constructor

  public static A(): void {} // -> method
  public B(): void {} // -> method

  [Z: string]: any; // -> signature
}
```

```ts
const Foo = class {
  private C: string; // -> field
  public D: string; // -> field

  constructor() {} // -> constructor

  public static A(): void {} // -> method
  public B(): void {} // -> method

  [Z: string]: any; // -> signature

  protected static E: string; // -> field
};
```

**✅ Correct**

```ts
interface Foo {
  [Z: string]: any; // -> signature

  A(): void; // -> method

  new (); // -> constructor

  B: string; // -> field
}
```

```ts
type Foo = {
  // no signature

  A(): void; // -> method

  // no constructor

  B: string; // -> field
};
```

```ts
class Foo {
  [Z: string]: any; // -> signature

  public static A(): void {} // -> method
  public B(): void {} // -> method

  constructor() {} // -> constructor

  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field
}
```

```ts
const Foo = class {
  [Z: string]: any; // -> signature

  public static A(): void {} // -> method
  public B(): void {} // -> method

  constructor() {} // -> constructor

  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field
};
```

### Classes

#### Public Instance Methods Before Public Static Fields

This config specifies that public instance methods should come first before public static fields.
Everything else can be placed anywhere.
It doesn't apply to interfaces or type literals as accessibility and scope are not part of them.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "default": ["public-instance-method", "public-static-field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
class Foo {
  private C: string; // (irrelevant)

  public D: string; // (irrelevant)

  public static E: string; // -> public static field

  constructor() {} // (irrelevant)

  public static A(): void {} // (irrelevant)

  [Z: string]: any; // (irrelevant)

  public B(): void {} // -> public instance method
}
```

```ts
const Foo = class {
  private C: string; // (irrelevant)

  [Z: string]: any; // (irrelevant)

  public static E: string; // -> public static field

  public D: string; // (irrelevant)

  constructor() {} // (irrelevant)

  public static A(): void {} // (irrelevant)

  public B(): void {} // -> public instance method
};
```

**✅ Correct**

```ts
class Foo {
  public B(): void {} // -> public instance method

  private C: string; // (irrelevant)

  public D: string; // (irrelevant)

  public static E: string; // -> public static field

  constructor() {} // (irrelevant)

  public static A(): void {} // (irrelevant)

  [Z: string]: any; // (irrelevant)
}
```

```ts
const Foo = class {
  public B(): void {} // -> public instance method

  private C: string; // (irrelevant)

  [Z: string]: any; // (irrelevant)

  public D: string; // (irrelevant)

  constructor() {} // (irrelevant)

  public static A(): void {} // (irrelevant)

  public static E: string; // -> public static field
};
```

#### Static Fields Before Instance Fields

This config specifies that static fields should come before instance fields, with public static fields first.
It doesn't apply to interfaces or type literals as accessibility and scope are not part of them.

```jsonc
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "default": ["public-static-field", "static-field", "instance-field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
class Foo {
  private E: string; // -> instance field

  private static B: string; // -> static field
  protected static C: string; // -> static field
  private static D: string; // -> static field

  public static A: string; // -> public static field

  [Z: string]: any; // (irrelevant)
}
```

```ts
const foo = class {
  public T(): void {} // method (irrelevant)

  private static B: string; // -> static field

  constructor() {} // constructor (irrelevant)

  private E: string; // -> instance field

  protected static C: string; // -> static field
  private static D: string; // -> static field

  [Z: string]: any; // signature (irrelevant)

  public static A: string; // -> public static field
};
```

**✅ Correct**

```ts
class Foo {
  public static A: string; // -> public static field

  private static B: string; // -> static field
  protected static C: string; // -> static field
  private static D: string; // -> static field

  private E: string; // -> instance field

  [Z: string]: any; // (irrelevant)
}
```

```ts
const foo = class {
  [Z: string]: any; // -> signature (irrelevant)

  public static A: string; // -> public static field

  constructor() {} // -> constructor (irrelevant)

  private static B: string; // -> static field
  protected static C: string; // -> static field
  private static D: string; // -> static field

  private E: string; // -> instance field

  public T(): void {} // -> method (irrelevant)
};
```

#### Class Declarations

This config only specifies an order for classes: methods, then the constructor, then fields.
It does not apply to class expressions (use `classExpressions` for them).
Default settings will be used for class declarations and all other syntax constructs other than class declarations.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "classes": ["method", "constructor", "field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
class Foo {
  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field

  constructor() {} // -> constructor

  public static A(): void {} // -> method
  public B(): void {} // -> method
}
```

**✅ Correct**

```ts
class Foo {
  public static A(): void {} // -> method
  public B(): void {} // -> method

  constructor() {} // -> constructor

  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field
}
```

#### Class Expressions

This config only specifies an order for classes expressions: methods, then the constructor, then fields.
It does not apply to class declarations (use `classes` for them).
Default settings will be used for class declarations and all other syntax constructs other than class expressions.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "classExpressions": ["method", "constructor", "field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
const foo = class {
  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field

  constructor() {} // -> constructor

  public static A(): void {} // -> method
  public B(): void {} // -> method
};
```

**✅ Correct**

```ts
const foo = class {
  public static A(): void {} // -> method
  public B(): void {} // -> method

  constructor() {} // -> constructor

  private C: string; // -> field
  public D: string; // -> field
  protected static E: string; // -> field
};
```

### Interfaces

This config only specifies an order for interfaces: signatures, then methods, then constructors, then fields.
It does not apply to type literals (use `typeLiterals` for them).
Default settings will be used for type literals and all other syntax constructs other than class expressions.

**Note:**
These member types are the only ones allowed for `interfaces`.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "interfaces": ["signature", "method", "constructor", "field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  B: string; // -> field

  new (); // -> constructor

  A(): void; // -> method

  [Z: string]: any; // -> signature
}
```

**✅ Correct**

```ts
interface Foo {
  [Z: string]: any; // -> signature

  A(): void; // -> method

  new (); // -> constructor

  B: string; // -> field
}
```

### Type Literals

This config only specifies an order for type literals: signatures, then methods, then constructors, then fields.
It does not apply to interfaces (use `interfaces` for them).
Default settings will be used for interfaces and all other syntax constructs other than class expressions.

**Note:**
These member types are the only ones allowed for `typeLiterals`.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "typeLiterals": ["signature", "method", "constructor", "field"] },
    ],
  },
}
```

**❌ Incorrect**

```ts
type Foo = {
  B: string; // -> field

  A(): void; // -> method

  new (); // -> constructor

  [Z: string]: any; // -> signature
};
```

**✅ Correct**

```ts
type Foo = {
  [Z: string]: any; // -> signature

  A(): void; // -> method

  new (); // -> constructor

  B: string; // -> field
};
```

### Sorting Options

#### Sorting Alphabetically Within Member Groups

The default member order will be applied if `memberTypes` is not specified.
You can see the default order in Default Configuration.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "order": "alphabetically",
        },
      },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  a: x;
  B: x;
  c: x;

  B(): void;
  c(): void;
  a(): void;
}
```

**✅ Correct**

```ts
interface Foo {
  B: x;
  a: x;
  c: x;

  B(): void;
  a(): void;
  c(): void;
}
```

#### Sorting Alphabetically Within Custom Member Groups

This config specifies that within each custom `memberTypes` group, members are in an alphabetic case-sensitive order.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "memberTypes": ["method", "field"],
          "order": "alphabetically",
        },
      },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  B(): void;
  c(): void;
  a(): void;

  a: x;
  B: x;
  c: x;
}
```

**✅ Correct**

```ts
interface Foo {
  B(): void;
  a(): void;
  c(): void;

  B: x;
  a: x;
  c: x;
}
```

#### Sorting Alphabetically Case Insensitive Within Member Groups

The default member order will be applied if `memberTypes` is not specified.
You can see the default order in Default Configuration.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "order": "alphabetically-case-insensitive",
        },
      },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  B: x;
  a: x;
  c: x;

  B(): void;
  c(): void;
  a(): void;
}
```

**✅ Correct**

```ts
interface Foo {
  a: x;
  B: x;
  c: x;

  a(): void;
  B(): void;
  c(): void;
}
```

#### Sorting Alphabetically Ignoring Member Groups

This config specifies that members are all sorted in an alphabetic case-sensitive order.
It ignores any member group types completely by specifying `"never"` for `memberTypes`.

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      { "default": { "memberTypes": "never", "order": "alphabetically" } },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  b(): void;
  a: boolean;

  [a: string]: number;
  new (): Bar;
  (): Baz;
}
```

**✅ Correct**

```ts
interface Foo {
  [a: string]: number;
  a: boolean;
  b(): void;

  (): Baz;
  new (): Bar;
}
```

#### Sorting Optional Members First or Last

The `optionalityOrder` option may be enabled to place all optional members in a group at the beginning or end of that group.

This config places all optional members before all required members:

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "optionalityOrder": "optional-first",
          "order": "alphabetically",
        },
      },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  a: boolean;
  b?: number;
  c: string;
}
```

**✅ Correct**

```ts
interface Foo {
  b?: number;
  a: boolean;
  c: string;
}
```

This config places all required members before all optional members:

```jsonc
// .eslintrc.json
{
  "rules": {
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": {
          "optionalityOrder": "required-first",
          "order": "alphabetically",
        },
      },
    ],
  },
}
```

**❌ Incorrect**

```ts
interface Foo {
  a: boolean;
  b?: number;
  c: string;
}
```

**✅ Correct**

```ts
interface Foo {
  a: boolean;
  c: string;
  b?: number;
}
```
