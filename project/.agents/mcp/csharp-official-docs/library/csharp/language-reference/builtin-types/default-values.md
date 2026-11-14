---
title: "Default values of built-in types"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/default-values.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default values of C# types (C# reference)

The following table shows the default values of C# types:

| Type                                                                        | Default value   |
|-----------------------------------------------------------------------------|-----------------|
| Any reference type                        | `null`          |
| Any built-in integral numeric type             | 0 (zero)        |
| Any built-in floating-point numeric type | 0 (zero)        |
| bool                                                             | `false`         |
| char                                                             | `'\0'` (U+0000) |
| enum                                                             | The value produced by the expression `(E)0`, where `E` is the enum identifier. |
| struct                                                         | The value produced by setting all value-type fields to their default values and all reference-type fields to `null`. |
| Any nullable value type                          | An instance for which the `System.Nullable`1.HasValue` property is `false` and the `System.Nullable`1.Value` property is undefined. That default value is also known as the *null* value of a nullable value type. |

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Default value expressions

Use the `default` operator to produce the default value of a type, as the following example shows:

```csharp
int a = default(int);
```

You can use the `default` literal to initialize a variable with the default value of its type:

```csharp
int a = default;
```

## Parameterless constructor of a value type

For a value type, the *implicit* parameterless constructor also produces the default value of the type, as the following example shows:

```csharp
var n = new System.Numerics.Complex();
Console.WriteLine(n);  // output: (0, 0)
```

At runtime, if the `System.Type` instance represents a value type, you can use the `System.Activator.CreateInstance(System.Type)` method to call the parameterless constructor and get the default value of the type.

> **Note:**
> A structure type (which is a value type) can have an explicit parameterless constructor that returns a non-default value of the type. To get the default value of a type, use the `default` operator or the `default` literal.

## C# language specification

For more information, see the following sections of the C# language specification:

- Default values
- Default constructors
- Parameterless struct constructors
- Auto default structs

## See also

- Constructors
