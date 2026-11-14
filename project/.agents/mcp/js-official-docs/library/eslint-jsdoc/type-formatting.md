---
title: "type-formatting (part 1 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/type-formatting.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `type-formatting`

Formats JSDoc type values.

Note that this rule should be considered **experimental**. The stringification
might not preserve other aspects of your original formatting and there could be
errors.

Currently offers the following options for formatting types.

## Options

A single options object has the following properties.

### `arrayBrackets`

Determines how array generics are represented. Set to `angle` for the style `Array<type>` or `square` for the style `type[]`. Defaults to "square".

### `arrowFunctionPostReturnMarkerSpacing`

The space character (if any) to use after return markers (`=>`). Defaults to " ".

### `arrowFunctionPreReturnMarkerSpacing`

The space character (if any) to use before return markers (`=>`). Defaults to " ".

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

### `functionOrClassParameterSpacing`

The space character (if any) to use between function or class parameters. Defaults to " ".

### `functionOrClassPostGenericSpacing`

The space character (if any) to use after a generic expression in a function or class. Defaults to "".

### `functionOrClassPostReturnMarkerSpacing`

The space character (if any) to use after return markers (`:`). Defaults to "".

### `functionOrClassPreReturnMarkerSpacing`

The space character (if any) to use before return markers (`:`). Defaults to "".

### `functionOrClassTypeParameterSpacing`

The space character (if any) to use between type parameters in a function or class. Defaults to " ".

### `genericAndTupleElementSpacing`

The space character (if any) to use between elements in generics and tuples. Defaults to " ".

### `genericDot`

Boolean value of whether to use a dot before the angled brackets of a generic (e.g., `SomeType.<AnotherType>`). Defaults to `false`.

### `keyValuePostColonSpacing`

The amount of spacing (if any) after the colon of a key-value or object-field pair. Defaults to " ".

### `keyValuePostKeySpacing`

The amount of spacing (if any) immediately after keys in a key-value or object-field pair. Defaults to "".

### `keyValuePostOptionalSpacing`

The amount of spacing (if any) after the optional operator (`?`) in a key-value or object-field pair. Defaults to "".

### `keyValuePostVariadicSpacing`

The amount of spacing (if any) after a variadic operator (`...`) in a key-value pair. Defaults to "".

### `methodQuotes`

The style of quotation mark for surrounding method names when quoted. Defaults to `double`

### `objectFieldIndent`

A string indicating the whitespace to be added on each line preceding an
object property-value field. Defaults to the empty string.

### `objectFieldQuote`

Whether and how object field properties should be quoted (e.g., `{"a": string}`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to special characters within the field). Digits will be kept as is,
regardless of setting (they can either represent a digit or a string digit).

### `objectFieldSeparator`

For object properties, specify whether a "semicolon", "comma", "linebreak",
"semicolon-and-linebreak", or "comma-and-linebreak" should be used after
each object property-value pair.

Defaults to `"comma"`.

### `objectFieldSeparatorOptionalLinebreak`

Whether `objectFieldSeparator` set to `"semicolon-and-linebreak"` or
`"comma-and-linebreak"` should be allowed to optionally drop the linebreak.

Defaults to `true`.

### `objectFieldSeparatorTrailingPunctuation`

If `separatorForSingleObjectField` is not in effect (i.e., if it is `false`
or there are multiple property-value object fields present), this property
will determine whether to add punctuation corresponding to the
`objectFieldSeparator` (e.g., a semicolon) to the final object field.
Defaults to `false`.

### `objectTypeBracketSpacing`

The space character (if any) to add after an object's initial curly bracket and before its ending curly bracket

### `parameterDefaultValueSpacing`

The space character (if any) to use between the equal signs of a default value. Defaults to " ".

### `postMethodNameSpacing`

The space character (if any) to add after a method name. Defaults to "".

### `postNewSpacing`

The space character (if any) to add after "new" in a constructor. Defaults to " ".

### `separatorForSingleObjectField`

Whether to apply the `objectFieldSeparator` (e.g., a semicolon) when there
is only one property-value object field present. Defaults to `false`.

### `stringQuotes`

How string literals should be quoted (e.g., `"abc"`). Set to `single`
or `double`. Defaults to 'double'.

### `trailingPunctuationMultilineOnly`

If `objectFieldSeparatorTrailingPunctuation` is set, this will determine whether the trailing punctuation is only added when the type is multiline

### `typeBracketSpacing`

A string of spaces that will be added immediately after the type's initial
curly bracket and immediately before its ending curly bracket. Defaults
to the empty string.

### `unionSpacing`

Determines the spacing to add to unions (`|`). Defaults to a single space (`" "`).

|||
|---|---|
|Context|everywhere|
|Tags|`param`, `property`, `returns`, `this`, `throws`, `type`, `typedef`, `yields`|
|Recommended|false|
|Settings|`mode`|
|Options|`arrayBrackets`, `arrowFunctionPostReturnMarkerSpacing`, `arrowFunctionPreReturnMarkerSpacing`, `enableFixer`, `functionOrClassParameterSpacing`, `functionOrClassPostGenericSpacing`, `functionOrClassPostReturnMarkerSpacing`, `functionOrClassPreReturnMarkerSpacing`, `functionOrClassTypeParameterSpacing`, `genericAndTupleElementSpacing`, `genericDot`, `keyValuePostColonSpacing`, `keyValuePostKeySpacing`, `keyValuePostOptionalSpacing`, `keyValuePostVariadicSpacing`, `methodQuotes`, `objectFieldIndent`, `objectFieldQuote`, `objectFieldSeparator`, `objectFieldSeparatorOptionalLinebreak`, `objectFieldSeparatorTrailingPunctuation`, `objectTypeBracketSpacing`, `parameterDefaultValueSpacing`, `postMethodNameSpacing`, `postNewSpacing`, `separatorForSingleObjectField`, `stringQuotes`, `trailingPunctuationMultilineOnly`, `typeBracketSpacing`, `unionSpacing`|
