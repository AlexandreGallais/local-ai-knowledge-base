---
title: "CompareInfo class (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class

Namespace: `System.Globalization`

```csharp
public sealed class CompareInfo : System.Runtime.Serialization.IDeserializationCallback
```

Implements a set of methods for culture-sensitive string comparisons.

## Remarks

Conventions for comparing and sorting data vary from culture to culture. For example, sort order may be based on phonetics or on the visual representation of characters. In East Asian languages, characters are sorted by the stroke and radical of ideographs. Sorting also depends on the order languages and cultures use for the alphabet. For example, the Danish language has an "Æ" character that it sorts after "Z" in the alphabet. In addition, comparisons may be case-sensitive or case-insensitive, and casing rules may also differ by culture. The `CompareInfo` class is responsible for maintaining this culture-sensitive string comparison data and for performing culture-sensitive string operations.

Typically, you do not have to instantiate a `CompareInfo` object directly, because one is used implicitly by all non-ordinal string comparison operations, including calls to the `String.Compare` method. However, if you do want to retrieve a `CompareInfo` object, you can do it in one of these ways:

- By retrieving the value of the `CompareInfo` property for a particular culture.

- By calling the static `CompareInfo.GetCompareInfo` method with a culture name. This allows for late-bound access to a `CompareInfo` object.

#### Ignored search values

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. Comparison methods such as `CompareInfo.IndexOf` and `CompareInfo.LastIndexOf` do not consider such characters when they perform a culture-sensitive comparison. Ignorable characters include:

- `Empty`. Culture-sensitive comparison methods will always find an empty string at the beginning (index zero) of the string being searched.

- A character or string consisting of characters with code points that are not considered in the operation because of comparison options, In particular, the  `IgnoreNonSpace` and `IgnoreSymbols` options produce searches in which symbols and nonspacing combining characters are ignored.

- A string with code points that have no linguistic significance. For example, a soft hyphen (U+00AD) is always ignored in a culture-sensitive string comparison.

#### Security considerations

If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent, regardless of the culture settings of the operating system.

> **Note:**
> When possible, you should use string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.
#### Example

The following example shows how the `CompareInfo` object associated with a `CultureInfo` object affects string comparison.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Overview/CompareInfo.cs._

## CompareInfo.LCID property

```csharp
public int LCID { get; }
```

Gets the properly formed culture identifier for the current `CompareInfo`.

Returns: The properly formed culture identifier for the current `CompareInfo`.

#### Examples
The following example demonstrates the `LCID` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Overview/CompareInfo.cs._

## CompareInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the culture used for sorting operations by this `CompareInfo` object.

Returns: The name of a culture.

#### Remarks
The `CompareInfo.Name` and `Name` properties can have different values. For example, an `LCID` property value of hexadecimal 0x10407 identifies an alternate sort culture that sorts names as they might appear in a German telephone book. The `Name` property has a value of "de-de_phoneb", whereas the `Name` property of the associated German (Germany) culture has a value of "de-DE".

#### Examples
The following example compares three strings using the fr-FR and ja-JP cultures. The `Name` property is used to display the name of each culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Overview/CompareInfo.cs._

## CompareInfo.Version property

```csharp
public System.Globalization.SortVersion Version { get; }
```

Gets information about the version of Unicode used for comparing and sorting strings.

Returns: An object that contains information about the Unicode version used for comparing and sorting strings.

#### Remarks
The weight of individual characters, and therefore the way in which particular strings are compared or ordered, depends on the version of the Unicode specification that a particular version of .NET implements and the host operating system.

The `SortVersion` object returned by the `Version` property doesn't identify the precise Unicode version used to compare strings. It is useful only when comparing two `SortVersion` objects to determine whether they use the same Unicode version and culture to compare strings. For more information and an example, see the `SortVersion` reference page.

## CompareInfo.Compare(String, String) method

```csharp
public int Compare (string? string1, string? string2);
```

Compares two strings.

Parameters:

- `string1`: The first string to compare.
- `string2`: The second string to compare.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  zero

:  The two strings are equal.

-  less than zero

: `string1` is less than `string2`.

-  greater than zero

: `string1` is greater than `string2`.

#### Remarks
By default, the comparison is performed by using `None`. If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
> When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares portions of two strings using the different `CompareInfo` objects:

- `CompareInfo` object associated with the Spanish (Spain) culture with international sort
- `CompareInfo` object associated with the Spanish (Spain) culture with traditional sort
- `CompareInfo` object associated with the `CultureInfo.InvariantCulture`

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrstr.cs._

The following example demonstrates calling the `CompareInfo.Compare` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Overview/CompareInfo.cs._

## CompareInfo.Compare(Char>, Char>, CompareOptions) method

```csharp
public int Compare (ReadOnlySpan<char> string1, ReadOnlySpan<char> string2, System.Globalization.CompareOptions options = System.Globalization.CompareOptions.None);
```

Compares two read-only spans of characters.

Parameters:

- `string1`: The first read-only span of characters to compare.
- `string2`: The second read-only span of characters to compare.
- `options`: An optional combination of `CompareOptions` enumeration values to use during the comparison. The default value is `CompareOptions.None`.

Returns: Zero if `string1` and `string2` are equal; or a negative value if `string1` sorts before `string2`; or a positive value if `string1` sorts after `string2`.

Exceptions:

- `ArgumentException`: `options` contains an unsupported combination of flags.

To be added.

## CompareInfo.Compare(String, String, CompareOptions) method

```csharp
public int Compare (string? string1, string? string2, System.Globalization.CompareOptions options);
```

Compares two strings using the specified `CompareOptions` value.

Parameters:

- `string1`: The first string to compare.
- `string2`: The second string to compare.
- `options`: A value that defines how `string1` and `string2` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, `CompareOptions.IgnoreKanaType`, `CompareOptions.NumericOrdering`, and `CompareOptions.StringSort`.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  zero

:  The two strings are equal.

-  less than zero

: `string1` is less than `string2`.

-  greater than zero

: `string1` is greater than `string2`.

Exceptions:

- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares two strings using different `CompareOptions` settings.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrstropt.cs._

The following example demonstrates calling the `CompareInfo.Compare` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Overview/CompareInfo.cs._

## CompareInfo.Compare(String, Int32, String, Int32) method

```csharp
public int Compare (string? string1, int offset1, string? string2, int offset2);
```

Compares the end section of a string with the end section of another string.

Parameters:

- `string1`: The first string to compare.
- `offset1`: The zero-based index of the character in `string1` at which to start comparing.
- `string2`: The second string to compare.
- `offset2`: The zero-based index of the character in `string2` at which to start comparing.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  zero

:  The two strings are equal.

-  less than zero

:  The specified section of `string1` is less than the specified section of `string2`.

-  greater than zero

:  The specified section of `string1` is greater than the specified section of `string2`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset1` or `offset2` is less than zero.

-or-

`offset1` is greater than or equal to the number of characters in `string1`.

-or-

`offset2` is greater than or equal to the number of characters in `string2`.

#### Remarks
If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares portions of two strings using the different `CompareInfo` objects:

-   `CompareInfo` object associated with the Spanish (Spain) culture with international sort

-   `CompareInfo` object associated with the Spanish (Spain) culture with traditional sort

-   `CompareInfo` object associated with the `CultureInfo.InvariantCulture`

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrintstrint.cs._
