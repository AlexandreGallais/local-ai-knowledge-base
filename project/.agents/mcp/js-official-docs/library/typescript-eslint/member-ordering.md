---
title: "member-ordering (part 1 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/member-ordering.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# member-ordering

This rule aims to standardize the way classes, interfaces, and type literals are structured and ordered.
A consistent ordering of fields, methods and constructors can make code easier to read, navigate, and edit.

**Note:**
This rule is _feature frozen_: it will no longer receive new features such as new options.
It still will accept bug and documentation fixes for its existing area of features.

Stylistic rules that enforce naming and/or sorting conventions tend to grow incomprehensibly complex as increasingly obscure features are requested.
This rule has reached the limit of what is reasonable for the typescript-eslint project to maintain.
See eslint-plugin: Feature freeze naming and sorting stylistic rules for more information.

## Options

```ts
interface Options {
  default?: OrderConfig;
  classes?: OrderConfig;
  classExpressions?: OrderConfig;
  interfaces?: OrderConfig;
  typeLiterals?: OrderConfig;
}

type OrderConfig = MemberType[] | SortedOrderConfig | 'never';

interface SortedOrderConfig {
  memberTypes?: MemberType[] | 'never';
  optionalityOrder?: 'optional-first' | 'required-first';
  order?:
    | 'alphabetically'
    | 'alphabetically-case-insensitive'
    | 'as-written'
    | 'natural'
    | 'natural-case-insensitive';
}

// See below for the more specific MemberType strings
type MemberType = string | string[];
```

You can configure `OrderConfig` options for:

- **`default`**: all constructs (used as a fallback)
- **`classes`**?: override ordering specifically for classes
- **`classExpressions`**?: override ordering specifically for class expressions
- **`interfaces`**?: override ordering specifically for interfaces
- **`typeLiterals`**?: override ordering specifically for type literals

The `OrderConfig` settings for each kind of construct may configure sorting on up to three levels:

- **`memberTypes`**: organizing on member type groups such as methods vs. properties
- **`optionalityOrder`**: whether to put all optional members first or all required members first
- **`order`**: organizing based on member names, such as alphabetically

### Groups

You can define many different groups based on different attributes of members.
The supported member attributes are, in order:

- **Accessibility** (`'public' | 'protected' | 'private' | '#private'`)
- **Decoration** (`'decorated'`): Whether the member has an explicit accessibility decorator
- **Kind** (`'call-signature' | 'constructor' | 'field' | 'readonly-field' | 'get' | 'method' | 'set' | 'signature' | 'readonly-signature'`)

Member attributes may be joined with a `'-'` to combine into more specific groups.
For example, `'public-field'` would come before `'private-field'`.

### Orders

The `order` value specifies what order members should be within a group.
It defaults to `as-written`, meaning any order is fine.
Other allowed values are:

- `alphabetically`: Sorted in a-z alphabetical order, directly using string `<` comparison (so `B` comes before `a`)
- `alphabetically-case-insensitive`: Sorted in a-z alphabetical order, ignoring case (so `a` comes before `B`)
- `natural`: Same as `alphabetically`, but using `natural-compare-lite` for more friendly sorting of numbers
- `natural-case-insensitive`: Same as `alphabetically-case-insensitive`, but using `natural-compare-lite` for more friendly sorting of numbers

### Default configuration

The default configuration looks as follows:

```jsonc
{
  "default": {
    "memberTypes": [
      // Index signature
      "signature",
      "call-signature",

      // Fields
      "public-static-field",
      "protected-static-field",
      "private-static-field",
      "#private-static-field",

      "public-decorated-field",
      "protected-decorated-field",
      "private-decorated-field",

      "public-instance-field",
      "protected-instance-field",
      "private-instance-field",
      "#private-instance-field",

      "public-abstract-field",
      "protected-abstract-field",

      "public-field",
      "protected-field",
      "private-field",
      "#private-field",

      "static-field",
      "instance-field",
      "abstract-field",

      "decorated-field",

      "field",

      // Static initialization
      "static-initialization",

      // Constructors
      "public-constructor",
      "protected-constructor",
      "private-constructor",

      "constructor",

      // Accessors
      "public-static-accessor",
      "protected-static-accessor",
      "private-static-accessor",
      "#private-static-accessor",

      "public-decorated-accessor",
      "protected-decorated-accessor",
      "private-decorated-accessor",

      "public-instance-accessor",
      "protected-instance-accessor",
      "private-instance-accessor",
      "#private-instance-accessor",

      "public-abstract-accessor",
      "protected-abstract-accessor",

      "public-accessor",
      "protected-accessor",
      "private-accessor",
      "#private-accessor",

      "static-accessor",
      "instance-accessor",
      "abstract-accessor",

      "decorated-accessor",

      "accessor",

      // Getters
      "public-static-get",
      "protected-static-get",
      "private-static-get",
      "#private-static-get",

      "public-decorated-get",
      "protected-decorated-get",
      "private-decorated-get",

      "public-instance-get",
      "protected-instance-get",
      "private-instance-get",
      "#private-instance-get",

      "public-abstract-get",
      "protected-abstract-get",

      "public-get",
      "protected-get",
      "private-get",
      "#private-get",

      "static-get",
      "instance-get",
      "abstract-get",

      "decorated-get",

      "get",

      // Setters
      "public-static-set",
      "protected-static-set",
      "private-static-set",
      "#private-static-set",

      "public-decorated-set",
      "protected-decorated-set",
      "private-decorated-set",

      "public-instance-set",
      "protected-instance-set",
      "private-instance-set",
      "#private-instance-set",

      "public-abstract-set",
      "protected-abstract-set",

      "public-set",
      "protected-set",
      "private-set",
      "#private-set",

      "static-set",
      "instance-set",
      "abstract-set",

      "decorated-set",

      "set",

      // Methods
      "public-static-method",
      "protected-static-method",
      "private-static-method",
      "#private-static-method",

      "public-decorated-method",
      "protected-decorated-method",
      "private-decorated-method",

      "public-instance-method",
      "protected-instance-method",
      "private-instance-method",
      "#private-instance-method",

      "public-abstract-method",
      "protected-abstract-method",

      "public-method",
      "protected-method",
      "private-method",
      "#private-method",

      "static-method",
      "instance-method",
      "abstract-method",

      "decorated-method",

      "method",
    ],
  },
}
```

**Note:**
The default configuration contains member group types which contain other member types.
This is intentional to provide better error messages.

**Tip:**
By default, the members are not sorted.
If you want to sort them alphabetically, you have to provide a custom configuration.
