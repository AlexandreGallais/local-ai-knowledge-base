---
title: "naming-convention (part 3 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/naming-convention.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# naming-convention (part 3 of 3)

## FAQ

This is a big rule, and there's a lot of docs. Here are a few clarifications that people often ask about or figure out via trial-and-error.

### How does the rule evaluate a selector?

Each selector is checked in the following way:

1. check the `filter`
   1. if `filter` is omitted → skip this step.
   2. if the name matches the `filter` → continue evaluating this selector.
   3. if the name does not match the `filter` → skip this selector and continue to the next selector.
2. check the `selector`
   1. if `selector` is one individual selector → the name's type must be of that type.
   2. if `selector` is a group selector → the name's type must be one of the grouped types.
   3. if `selector` is an array of selectors → apply the above for each selector in the array.
3. check the `types`
   1. if `types` is omitted → skip this step.
   2. if the name has a type in `types` → continue evaluating this selector.
   3. if the name does not have a type in `types` → skip this selector and continue to the next selector.

A name is considered to pass the config if it:

1. Matches one selector and passes all of that selector's format checks.
2. Matches no selectors.

A name is considered to fail the config if it matches one selector and fails one that selector's format checks.

### How does the rule automatically order selectors?

Each identifier should match exactly one selector. It may match multiple group selectors - but only ever one selector.
With that in mind - the base sort order works out to be:

1. Individual Selectors
2. Grouped Selectors
3. Default Selector

Within each of these categories, some further sorting occurs based on what selector options are supplied:

1. `filter` is given the highest priority above all else.
2. `types`
3. `modifiers`
4. everything else

For example, if you provide the following config:

```ts
[
  /* 1 */ { selector: 'default', format: ['camelCase'] },
  /* 2 */ { selector: 'variable', format: ['snake_case'] },
  /* 3 */ { selector: 'variable', types: ['boolean'], format: ['UPPER_CASE'] },
  /* 4 */ { selector: 'variableLike', format: ['PascalCase'] },
];
```

Then for the code `const x = 1`, the rule will validate the selectors in the following order: `3`, `2`, `4`, `1`.
To clearly spell it out:

- (3) is tested first because it has `types` and is an individual selector.
- (2) is tested next because it is an individual selector.
- (4) is tested next as it is a grouped selector.
- (1) is tested last as it is the base default selector.

Its worth noting that whilst this order is applied, all selectors may not run on a name.
This is explained in "How does the rule evaluate a name's format?"

### How does the rule evaluate a name's format?

When the format of an identifier is checked, it is checked in the following order:

1. validate leading underscore
1. validate trailing underscore
1. validate prefix
1. validate suffix
1. validate custom
1. validate format

For steps 1-4, if the identifier matches the option, the matching part will be removed.
This is done so that you can apply formats like PascalCase without worrying about prefixes or underscores causing it to not match.

One final note is that if the name were to become empty via this trimming process, it is considered to match all `format`s. An example of where this might be useful is for generic type parameters, where you want all names to be prefixed with `T`, but also want to allow for the single character `T` name.

Here are some examples to help illustrate

Name: `_IMyInterface`
Selector:

```json
{
  "leadingUnderscore": "require",
  "prefix": ["I"],
  "format": ["UPPER_CASE", "StrictPascalCase"]
}
```

1. `name = _IMyInterface`
1. validate leading underscore
   1. config is provided
   1. check name → pass
   1. Trim underscore → `name = IMyInterface`
1. validate trailing underscore
   1. config is not provided → skip
1. validate prefix
   1. config is provided
   1. check name → pass
   1. Trim prefix → `name = MyInterface`
1. validate suffix
   1. config is not provided → skip
1. validate custom
   1. config is not provided → skip
1. validate format
   1. for each format...
      1. `format = 'UPPER_CASE'`
         1. check format → fail.
            - Important to note that if you supply multiple formats - the name only needs to match _one_ of them!
      1. `format = 'StrictPascalCase'`
         1. check format → success.
1. **_success_**

Name: `IMyInterface`
Selector:

```json
{
  "format": ["StrictPascalCase"],
  "trailingUnderscore": "allow",
  "custom": {
    "regex": "^I[A-Z]",
    "match": false
  }
}
```

1. `name = IMyInterface`
1. validate leading underscore
   1. config is not provided → skip
1. validate trailing underscore
   1. config is provided
   1. check name → pass
   1. Trim underscore → `name = IMyInterface`
1. validate prefix
   1. config is not provided → skip
1. validate suffix
   1. config is not provided → skip
1. validate custom
   1. config is provided
   1. `regex = new RegExp("^I[A-Z]")`
   1. `regex.test(name) === custom.match`
   1. **_fail_** → report and exit

### What happens if I provide a `modifiers` to a Group Selector?

Some group selectors accept `modifiers`. For the most part these will work exactly the same as with individual selectors.
There is one exception to this in that a modifier might not apply to all individual selectors covered by a group selector.

For example - `memberLike` includes the `enumMember` selector, and it allows the `protected` modifier.
An `enumMember` can never ever be `protected`, which means that the following config will never match any `enumMember`:

```json
{
  "selector": "memberLike",
  "modifiers": ["protected"]
}
```

To help with matching, members that cannot specify an accessibility will always have the `public` modifier. This means that the following config will always match any `enumMember`:

```json
{
  "selector": "memberLike",
  "modifiers": ["public"]
}
```

## Examples

### Enforce that all variables, functions and properties follow are camelCase

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    { "selector": "variableLike", "format": ["camelCase"] }
  ]
}
```

### Enforce that private members are prefixed with an underscore

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "memberLike",
      "modifiers": ["private"],
      "format": ["camelCase"],
      "leadingUnderscore": "require"
    }
  ]
}
```

### Enforce that boolean variables are prefixed with an allowed verb

**Note:** As documented above, the prefix is trimmed before format is validated, thus PascalCase must be used to allow variables such as `isEnabled`.

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "variable",
      "types": ["boolean"],
      "format": ["PascalCase"],
      "prefix": ["is", "should", "has", "can", "did", "will"]
    }
  ]
}
```

### Enforce that all variables are either in camelCase or UPPER_CASE

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "variable",
      "format": ["camelCase", "UPPER_CASE"]
    }
  ]
}
```

### Enforce that all const variables are in UPPER_CASE

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "variable",
      "modifiers": ["const"],
      "format": ["UPPER_CASE"]
    }
  ]
}
```

### Enforce that type parameters (generics) are prefixed with `T`

This allows you to emulate the old `generic-type-naming` rule.

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "typeParameter",
      "format": ["PascalCase"],
      "prefix": ["T"]
    }
  ]
}
```

### Enforce that interface names do not begin with an `I`

This allows you to emulate the old `interface-name-prefix` rule.

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "interface",
      "format": ["PascalCase"],
      "custom": {
        "regex": "^I[A-Z]",
        "match": false
      }
    }
  ]
}
```

### Enforce that function names are either in camelCase or PascalCase

Function names are typically camelCase, but UI library components (especially JSX, such as React and Solid) use PascalCase to distinguish them from intrinsic elements. If you are writing function components, consider allowing both camelCase and PascalCase for functions.

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "function",
      "format": ["camelCase", "PascalCase"]
    }
  ]
}
```

### Enforce that variable and function names are in camelCase

This allows you to lint multiple type with same pattern.

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": ["variable", "function"],
      "format": ["camelCase"],
      "leadingUnderscore": "allow"
    }
  ]
}
```

### Ignore properties that **_require_** quotes

Sometimes you have to use a quoted name that breaks the convention (for example, HTTP headers).
If this is a common thing in your codebase, then you have a few options.

If you simply want to allow all property names that require quotes, you can use the `requiresQuotes` modifier to match any property name that _requires_ quoting, and use `format: null` to ignore the name.

```jsonc
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": [
        "classProperty",
        "objectLiteralProperty",
        "typeProperty",
        "classMethod",
        "objectLiteralMethod",
        "typeMethod",
        "accessor",
        "enumMember",
      ],
      "format": null,
      "modifiers": ["requiresQuotes"],
    },
  ],
}
```

If you have a small and known list of exceptions, you can use the `filter` option to ignore these specific names only:

```jsonc
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "property",
      "format": ["strictCamelCase"],
      "filter": {
        // you can expand this regex to add more allowed names
        "regex": "^(Property-Name-One|Property-Name-Two)$",
        "match": false,
      },
    },
  ],
}
```

You can use the `filter` option to ignore names with specific characters:

```jsonc
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "property",
      "format": ["strictCamelCase"],
      "filter": {
        // you can expand this regex as you find more cases that require quoting that you want to allow
        "regex": "[- ]",
        "match": false,
      },
    },
  ],
}
```

Note that there is no way to ignore any name that is quoted - only names that are required to be quoted.
This is intentional - adding quotes around a name is not an escape hatch for proper naming.
If you want an escape hatch for a specific name - you should can use an `eslint-disable` comment.

### Ignore destructured names

Sometimes you might want to allow destructured properties to retain their original name, even if it breaks your naming convention.

You can use the `destructured` modifier to match these names, and explicitly set `format: null` to apply no formatting:

```jsonc
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "variable",
      "modifiers": ["destructured"],
      "format": null,
    },
  ],
}
```

### Enforce the codebase follows ESLint's `camelcase` conventions

```json
{
  "camelcase": "off",
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "default",
      "format": ["camelCase"]
    },

    {
      "selector": "variable",
      "format": ["camelCase", "UPPER_CASE"]
    },
    {
      "selector": "parameter",
      "format": ["camelCase"],
      "leadingUnderscore": "allow"
    },

    {
      "selector": "memberLike",
      "modifiers": ["private"],
      "format": ["camelCase"],
      "leadingUnderscore": "require"
    },

    {
      "selector": "typeLike",
      "format": ["PascalCase"]
    }
  ]
}
```

## When Not To Use It

This rule can be very strict.
If you don't have strong needs for enforcing naming conventions, we recommend using it only to flag very egregious violations of your naming standards.
Consider documenting your naming conventions and enforcing them in code review if you have processes like that.

If you do not want to enforce naming conventions for anything, you can disable this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend that if you care about naming conventions, pick a single option for this rule that works best for your project.
