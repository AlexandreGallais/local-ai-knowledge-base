---
title: "naming-convention (part 2 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/naming-convention.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# naming-convention (part 2 of 3)

## Options

This rule accepts an array of objects, with each object describing a different naming convention.
Each property will be described in detail below. Also see the examples section below for illustrated examples.

```ts
type Options = {
  // format options
  format:
    | (
        | 'camelCase'
        | 'strictCamelCase'
        | 'PascalCase'
        | 'StrictPascalCase'
        | 'snake_case'
        | 'UPPER_CASE'
      )[]
    | null;
  custom?: {
    regex: string;
    match: boolean;
  };
  leadingUnderscore?:
    | 'forbid'
    | 'require'
    | 'requireDouble'
    | 'allow'
    | 'allowDouble'
    | 'allowSingleOrDouble';
  trailingUnderscore?:
    | 'forbid'
    | 'require'
    | 'requireDouble'
    | 'allow'
    | 'allowDouble'
    | 'allowSingleOrDouble';
  prefix?: string[];
  suffix?: string[];

  // selector options
  selector: Selector | Selector[];
  filter?:
    | string
    | {
        regex: string;
        match: boolean;
      };
  // the allowed values for these are dependent on the selector - see below
  modifiers?: Modifiers<Selector>[];
  types?: Types<Selector>[];
}[];

// the default config is similar to ESLint's camelcase rule but more strict
const defaultOptions: Options = [
  {
    selector: 'default',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
    trailingUnderscore: 'allow',
  },

  {
    selector: 'import',
    format: ['camelCase', 'PascalCase'],
  },

  {
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE'],
    leadingUnderscore: 'allow',
    trailingUnderscore: 'allow',
  },

  {
    selector: 'typeLike',
    format: ['PascalCase'],
  },
];
```

### Format Options

Every single selector can have the same set of format options.
For information about how each selector is applied, see "How does the rule evaluate a name's format?".

#### `format`

The `format` option defines the allowed formats for the identifier. This option accepts an array of the following values, and the identifier can match any of them:

- `camelCase` - standard camelCase format - no underscores are allowed between characters, and consecutive capitals are allowed (i.e. both `myID` and `myId` are valid).
- `PascalCase` - same as `camelCase`, except the first character must be upper-case.
- `snake_case` - standard snake_case format - all characters must be lower-case, and underscores are allowed.
- `strictCamelCase` - same as `camelCase`, but consecutive capitals are not allowed (i.e. `myId` is valid, but `myID` is not).
- `StrictPascalCase` - same as `strictCamelCase`, except the first character must be upper-case.
- `UPPER_CASE` - same as `snake_case`, except all characters must be upper-case.

Instead of an array, you may also pass `null`. This signifies "this selector shall not have its format checked".
This can be useful if you want to enforce no particular format for a specific selector, after applying a group selector.

#### `custom`

The `custom` option defines a custom regex that the identifier must (or must not) match. This option allows you to have a bit more finer-grained control over identifiers, letting you ban (or force) certain patterns and substrings.
Accepts an object with the following properties:

- `match` - true if the identifier _must_ match the `regex`, false if the identifier _must not_ match the `regex`.
- `regex` - a string that is then passed into RegExp to create a new regular expression: `new RegExp(regex)`

#### `filter`

The `filter` option operates similar to `custom`, accepting the same shaped object, except that it controls if the rest of the configuration should or should not be applied to an identifier.

You can use this to include or exclude specific identifiers from specific configurations.

Accepts an object with the following properties:

- `match` - true if the identifier _must_ match the `regex`, false if the identifier _must not_ match the `regex`.
- `regex` - a string that is then passed into RegExp to create a new regular expression: `new RegExp(regex)`

Alternatively, `filter` accepts a regular expression (anything accepted into `new RegExp(filter)`). In this case, it's treated as if you had passed an object with the regex and `match: true`.

#### `leadingUnderscore` / `trailingUnderscore`

The `leadingUnderscore` / `trailingUnderscore` options control whether leading/trailing underscores are considered valid. Accepts one of the following values:

- `allow` - existence of a single leading/trailing underscore is not explicitly enforced.
- `allowDouble` - existence of a double leading/trailing underscore is not explicitly enforced.
- `allowSingleOrDouble` - existence of a single or a double leading/trailing underscore is not explicitly enforced.
- `forbid` - a leading/trailing underscore is not allowed at all.
- `require` - a single leading/trailing underscore must be included.
- `requireDouble` - two leading/trailing underscores must be included.

#### `prefix` / `suffix`

The `prefix` / `suffix` options control which prefix/suffix strings must exist for the identifier. Accepts an array of strings.

If these are provided, the identifier must start with one of the provided values. For example, if you provide `{ prefix: ['Class', 'IFace', 'Type'] }`, then the following names are valid: `ClassBar`, `IFaceFoo`, `TypeBaz`, but the name `Bang` is not valid, as it contains none of the prefixes.

**Note:** As documented above, the prefix is trimmed before format is validated, therefore PascalCase must be used to allow variables such as `isEnabled` using the prefix `is`.

### Selector Options

- `selector` allows you to specify what types of identifiers to target.
  - Accepts one or array of selectors to define an option block that applies to one or multiple selectors.
  - For example, if you provide `{ selector: ['function', 'variable'] }`, then it will apply the same option to variable and function nodes.
  - See Allowed Selectors, Modifiers and Types below for the complete list of allowed selectors.
- `modifiers` allows you to specify which modifiers to granularly apply to, such as the accessibility (`#private`/`private`/`protected`/`public`), or if the thing is `static`, etc.
  - The name must match _all_ of the modifiers.
  - For example, if you provide `{ modifiers: ['private','readonly','static'] }`, then it will only match something that is `private static readonly`, and something that is just `private` will not match.
  - The following `modifiers` are allowed:
    - `abstract`,`override`,`private`,`protected`,`readonly`,`static` - matches any member explicitly declared with the given modifier.
    - `async` - matches any method, function, or function variable which is async via the `async` keyword (e.g. does not match functions that return promises without using `async` keyword)
    - `const` - matches a variable declared as being `const` (`const x = 1`).
    - `destructured` - matches a variable declared via an object destructuring pattern (`const {x, z = 2}`).
      - Note that this does not match renamed destructured properties (`const {x: y, a: b = 2}`).
    - `exported` - matches anything that is exported from the module.
    - `global` - matches a variable/function declared in the top-level scope.
    - `#private` - matches any member with a private identifier (an identifier that starts with `#`)
    - `public` - matches any member that is either explicitly declared as `public`, or has no visibility modifier (i.e. implicitly public).
    - `requiresQuotes` - matches any name that requires quotes as it is not a valid identifier (i.e. has a space, a dash, etc in it).
    - `unused` - matches anything that is not used.
- `types` allows you to specify which types to match. This option supports simple, primitive types only (`array`,`boolean`,`function`,`number`,`string`).
  - The name must match _one_ of the types.
  - **_NOTE - Using this option will require that you lint with type information._**
  - For example, this lets you do things like enforce that `boolean` variables are prefixed with a verb.
  - The following `types` are allowed:
    - `array` matches any type assignable to `Array<unknown> | null | undefined`
    - `boolean` matches any type assignable to `boolean | null | undefined`
    - `function` matches any type assignable to `Function | null | undefined`
    - `number` matches any type assignable to `number | null | undefined`
    - `string` matches any type assignable to `string | null | undefined`

The ordering of selectors does not matter. The implementation will automatically sort the selectors to ensure they match from most-specific to least specific. It will keep checking selectors in that order until it finds one that matches the name. See "How does the rule automatically order selectors?"

#### Allowed Selectors, Modifiers and Types

There are two types of selectors, individual selectors, and grouped selectors.

##### Individual Selectors

Individual Selectors match specific, well-defined sets. There is no overlap between each of the individual selectors.

- `classicAccessor` - matches any accessor. It refers to the methods attached to `get` and `set` syntax.
  - Allowed `modifiers`: `abstract`, `override`, `private`, `protected`, `public`, `requiresQuotes`, `static`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `autoAccessor` - matches any auto-accessor. An auto-accessor is just a class field starting with an `accessor` keyword.
  - Allowed `modifiers`: `abstract`, `override`, `private`, `protected`, `public`, `requiresQuotes`, `static`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `class` - matches any class declaration.
  - Allowed `modifiers`: `abstract`, `exported`, `unused`.
  - Allowed `types`: none.
- `classMethod` - matches any class method. Also matches properties that have direct function expression or arrow function expression values. Does not match accessors.
  - Allowed `modifiers`: `abstract`, `async`, `override`, `#private`, `private`, `protected`, `public`, `requiresQuotes`, `static`.
  - Allowed `types`: none.
- `classProperty` - matches any class property. Does not match properties that have direct function expression or arrow function expression values.
  - Allowed `modifiers`: `abstract`, `override`, `#private`, `private`, `protected`, `public`, `readonly`, `requiresQuotes`, `static`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `enum` - matches any enum declaration.
  - Allowed `modifiers`: `exported`, `unused`.
  - Allowed `types`: none.
- `enumMember` - matches any enum member.
  - Allowed `modifiers`: `requiresQuotes`.
  - Allowed `types`: none.
- `function` - matches any named function declaration or named function expression.
  - Allowed `modifiers`: `async`, `exported`, `global`, `unused`.
  - Allowed `types`: none.
- `import` - matches namespace imports and default imports (i.e. does not match named imports).
  - Allowed `modifiers`: `default`, `namespace`.
  - Allowed `types`: none.
- `interface` - matches any interface declaration.
  - Allowed `modifiers`: `exported`, `unused`.
  - Allowed `types`: none.
- `objectLiteralMethod` - matches any object literal method. Also matches properties that have direct function expression or arrow function expression values. Does not match accessors.
  - Allowed `modifiers`: `async`, `public`, `requiresQuotes`.
  - Allowed `types`: none.
- `objectLiteralProperty` - matches any object literal property. Does not match properties that have direct function expression or arrow function expression values.
  - Allowed `modifiers`: `public`, `requiresQuotes`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `parameter` - matches any function parameter. Does not match parameter properties.
  - Allowed `modifiers`: `destructured`, `unused`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `parameterProperty` - matches any parameter property.
  - Allowed `modifiers`: `private`, `protected`, `public`, `readonly`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `typeAlias` - matches any type alias declaration.
  - Allowed `modifiers`: `exported`, `unused`.
  - Allowed `types`: none.
- `typeMethod` - matches any object type method. Also matches properties that have direct function expression or arrow function expression values. Does not match accessors.
  - Allowed `modifiers`: `public`, `requiresQuotes`.
  - Allowed `types`: none.
- `typeParameter` - matches any generic type parameter declaration.
  - Allowed `modifiers`: `unused`.
  - Allowed `types`: none.
- `typeProperty` - matches any object type property. Does not match properties that have direct function expression or arrow function expression values.
  - Allowed `modifiers`: `public`, `readonly`, `requiresQuotes`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `variable` - matches any `const` / `let` / `var` variable name.
  - Allowed `modifiers`: `async`, `const`, `destructured`, `exported`, `global`, `unused`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.

##### Group Selectors

Group Selectors are provided for convenience, and essentially bundle up sets of individual selectors.

- `default` - matches everything.
  - Allowed `modifiers`: all modifiers.
  - Allowed `types`: none.
- `accessor` - matches the same as `classicAccessor` and `autoAccessor`.
  - Allowed `modifiers`: `abstract`, `override`, `private`, `protected`, `public`, `requiresQuotes`, `static`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `memberLike` - matches the same as `classicAccessor`, `autoAccessor`, `enumMember`, `method`, `parameterProperty`, `property`.
  - Allowed `modifiers`: `abstract`, `async`, `override`, `#private`, `private`, `protected`, `public`, `readonly`, `requiresQuotes`, `static`.
  - Allowed `types`: none.
- `method` - matches the same as `classMethod`, `objectLiteralMethod`, `typeMethod`.
  - Allowed `modifiers`: `abstract`, `async`, `override`, `#private`, `private`, `protected`, `public`, `readonly`, `requiresQuotes`, `static`.
  - Allowed `types`: none.
- `property` - matches the same as `classProperty`, `objectLiteralProperty`, `typeProperty`.
  - Allowed `modifiers`: `abstract`, `async`, `override`, `#private`, `private`, `protected`, `public`, `readonly`, `requiresQuotes`, `static`.
  - Allowed `types`: `array`, `boolean`, `function`, `number`, `string`.
- `typeLike` - matches the same as `class`, `enum`, `interface`, `typeAlias`, `typeParameter`.
  - Allowed `modifiers`: `abstract`, `unused`.
  - Allowed `types`: none.
- `variableLike` - matches the same as `function`, `parameter` and `variable`.
  - Allowed `modifiers`: `async`, `unused`.
  - Allowed `types`: none.
