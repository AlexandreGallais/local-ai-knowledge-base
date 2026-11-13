---
title: "member-ordering (part 3 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/member-ordering.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# member-ordering (part 3 of 3)

## All Supported Options

### Member Types (Granular Form)

There are multiple ways to specify the member types.
The most explicit and granular form is the following:

```jsonc
[
  // Index signature
  "signature",
  "readonly-signature",

  // Fields
  "public-static-field",
  "public-static-readonly-field",
  "protected-static-field",
  "protected-static-readonly-field",
  "private-static-field",
  "private-static-readonly-field",
  "#private-static-field",
  "#private-static-readonly-field",

  "public-decorated-field",
  "public-decorated-readonly-field",
  "protected-decorated-field",
  "protected-decorated-readonly-field",
  "private-decorated-field",
  "private-decorated-readonly-field",

  "public-instance-field",
  "public-instance-readonly-field",
  "protected-instance-field",
  "protected-instance-readonly-field",
  "private-instance-field",
  "private-instance-readonly-field",
  "#private-instance-field",
  "#private-instance-readonly-field",

  "public-abstract-field",
  "public-abstract-readonly-field",
  "protected-abstract-field",
  "protected-abstract-readonly-field",

  "public-field",
  "public-readonly-field",
  "protected-field",
  "protected-readonly-field",
  "private-field",
  "private-readonly-field",
  "#private-field",
  "#private-readonly-field",

  "static-field",
  "static-readonly-field",
  "instance-field",
  "instance-readonly-field",
  "abstract-field",
  "abstract-readonly-field",

  "decorated-field",
  "decorated-readonly-field",

  "field",
  "readonly-field",

  // Static initialization
  "static-initialization",

  // Constructors
  "public-constructor",
  "protected-constructor",
  "private-constructor",

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
]
```

**Note:**
If you only specify some of the possible types, the non-specified ones can have any particular order.
This means that they can be placed before, within or after the specified types and the linter won't complain about it.

### Member Group Types (With Accessibility, Ignoring Scope)

It is also possible to group member types by their accessibility (`static`, `instance`, `abstract`), ignoring their scope.

```jsonc
[
  // Index signature
  // No accessibility for index signature.

  // Fields
  "public-field", // = ["public-static-field", "public-instance-field"]
  "protected-field", // = ["protected-static-field", "protected-instance-field"]
  "private-field", // = ["private-static-field", "private-instance-field"]

  // Static initialization
  // No accessibility for static initialization.

  // Constructors
  // Only the accessibility of constructors is configurable. See below.

  // Getters
  "public-get", // = ["public-static-get", "public-instance-get"]
  "protected-get", // = ["protected-static-get", "protected-instance-get"]
  "private-get", // = ["private-static-get", "private-instance-get"]

  // Setters
  "public-set", // = ["public-static-set", "public-instance-set"]
  "protected-set", // = ["protected-static-set", "protected-instance-set"]
  "private-set", // = ["private-static-set", "private-instance-set"]

  // Methods
  "public-method", // = ["public-static-method", "public-instance-method"]
  "protected-method", // = ["protected-static-method", "protected-instance-method"]
  "private-method", // = ["private-static-method", "private-instance-method"]
]
```

### Member Group Types (With Accessibility and a Decorator)

It is also possible to group methods or fields with a decorator separately, optionally specifying
their accessibility.

```jsonc
[
  // Index signature
  // No decorators for index signature.

  // Fields
  "public-decorated-field",
  "protected-decorated-field",
  "private-decorated-field",

  "decorated-field", // = ["public-decorated-field", "protected-decorated-field", "private-decorated-field"]

  // Static initialization
  // No decorators for static initialization.

  // Constructors
  // There are no decorators for constructors.

  // Getters
  "public-decorated-get",
  "protected-decorated-get",
  "private-decorated-get",

  "decorated-get", // = ["public-decorated-get", "protected-decorated-get", "private-decorated-get"]

  // Setters
  "public-decorated-set",
  "protected-decorated-set",
  "private-decorated-set",

  "decorated-set", // = ["public-decorated-set", "protected-decorated-set", "private-decorated-set"]

  // Methods
  "public-decorated-method",
  "protected-decorated-method",
  "private-decorated-method",

  "decorated-method", // = ["public-decorated-method", "protected-decorated-method", "private-decorated-method"]
]
```

### Member Group Types (With Scope, Ignoring Accessibility)

Another option is to group the member types by their scope (`public`, `protected`, `private`), ignoring their accessibility.

```jsonc
[
  // Index signature
  // No scope for index signature.

  // Fields
  "static-field", // = ["public-static-field", "protected-static-field", "private-static-field"]
  "instance-field", // = ["public-instance-field", "protected-instance-field", "private-instance-field"]
  "abstract-field", // = ["public-abstract-field", "protected-abstract-field"]

  // Static initialization
  // No scope for static initialization.

  // Constructors
  "constructor", // = ["public-constructor", "protected-constructor", "private-constructor"]

  // Getters
  "static-get", // = ["public-static-get", "protected-static-get", "private-static-get"]
  "instance-get", // = ["public-instance-get", "protected-instance-get", "private-instance-get"]
  "abstract-get", // = ["public-abstract-get", "protected-abstract-get"]

  // Setters
  "static-set", // = ["public-static-set", "protected-static-set", "private-static-set"]
  "instance-set", // = ["public-instance-set", "protected-instance-set", "private-instance-set"]
  "abstract-set", // = ["public-abstract-set", "protected-abstract-set"]

  // Methods
  "static-method", // = ["public-static-method", "protected-static-method", "private-static-method"]
  "instance-method", // = ["public-instance-method", "protected-instance-method", "private-instance-method"]
  "abstract-method", // = ["public-abstract-method", "protected-abstract-method"]
]
```

### Member Group Types (With Scope and Accessibility)

The third grouping option is to ignore both scope and accessibility.

```jsonc
[
  // Index signature
  // No grouping for index signature.

  // Fields
  "field", // = ["public-static-field", "protected-static-field", "private-static-field", "public-instance-field", "protected-instance-field", "private-instance-field",
  //              "public-abstract-field", "protected-abstract-field"]

  // Static initialization
  // No grouping for static initialization.

  // Constructors
  // Only the accessibility of constructors is configurable.

  // Getters
  "get", // = ["public-static-get", "protected-static-get", "private-static-get", "public-instance-get", "protected-instance-get", "private-instance-get",
  //                "public-abstract-get", "protected-abstract-get"]

  // Setters
  "set", // = ["public-static-set", "protected-static-set", "private-static-set", "public-instance-set", "protected-instance-set", "private-instance-set",
  //                "public-abstract-set", "protected-abstract-set"]

  // Methods
  "method", // = ["public-static-method", "protected-static-method", "private-static-method", "public-instance-method", "protected-instance-method", "private-instance-method",
  //                "public-abstract-method", "protected-abstract-method"]
]
```

### Member Group Types (Readonly Fields)

It is possible to group fields by their `readonly` modifiers.

```jsonc
[
  // Index signature
  "readonly-signature",
  "signature",

  // Fields
  "readonly-field", // = ["public-static-readonly-field", "protected-static-readonly-field", "private-static-readonly-field", "public-instance-readonly-field", "protected-instance-readonly-field", "private-instance-readonly-field", "public-abstract-readonly-field", "protected-abstract-readonly-field"]
  "field", // = ["public-static-field", "protected-static-field", "private-static-field", "public-instance-field", "protected-instance-field", "private-instance-field", "public-abstract-field", "protected-abstract-field"]
]
```

### Grouping Different Member Types at the Same Rank

It is also possible to group different member types at the same rank.

```jsonc
[
  // Index signature
  "signature",

  // Fields
  "field",

  // Static initialization
  "static-initialization",

  // Constructors
  "constructor",

  // Getters and Setters at the same rank
  ["get", "set"],

  // Methods
  "method",
]
```

## When Not To Use It

If you don't care about the general order of your members, then you will not need this rule.
