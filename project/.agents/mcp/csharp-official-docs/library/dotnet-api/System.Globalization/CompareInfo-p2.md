---
title: "CompareInfo class (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CompareInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareInfo class (part 2 of 9)

## CompareInfo.Compare(String, Int32, String, Int32, CompareOptions) method

```csharp
public int Compare (string? string1, int offset1, string? string2, int offset2, System.Globalization.CompareOptions options);
```

Compares the end section of a string with the end section of another string using the specified `CompareOptions` value.

Parameters:

- `string1`: The first string to compare.
- `offset1`: The zero-based index of the character in `string1` at which to start comparing.
- `string2`: The second string to compare.
- `offset2`: The zero-based index of the character in `string2` at which to start comparing.
- `options`: A value that defines how `string1` and `string2` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, `CompareOptions.IgnoreKanaType`, `CompareOptions.NumericOrdering`, and `CompareOptions.StringSort`.

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
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares portions of two strings using different `CompareOptions` settings.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrintstrintopt.cs._

## CompareInfo.Compare(String, Int32, Int32, String, Int32, Int32) method

```csharp
public int Compare (string? string1, int offset1, int length1, string? string2, int offset2, int length2);
```

Compares a section of one string with a section of another string.

Parameters:

- `string1`: The first string to compare.
- `offset1`: The zero-based index of the character in `string1` at which to start comparing.
- `length1`: The number of consecutive characters in `string1` to compare.
- `string2`: The second string to compare.
- `offset2`: The zero-based index of the character in `string2` at which to start comparing.
- `length2`: The number of consecutive characters in `string2` to compare.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  zero

:  The two strings are equal.

-  less than zero

:  The specified section of `string1` is less than the specified section of `string2`.

-  greater than zero

:  The specified section of `string1` is greater than the specified section of `string2`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset1` or `length1` or `offset2` or `length2` is less than zero.

-or-

`offset1` is greater than or equal to the number of characters in `string1`.

-or-

`offset2` is greater than or equal to the number of characters in `string2`.

-or-

`length1` is greater than the number of characters from `offset1` to the end of `string1`.

-or-

`length2` is greater than the number of characters from `offset2` to the end of `string2`.

#### Remarks
If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
>  When possible, you should use string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares portions of two strings using the different `CompareInfo` objects:

-   `CompareInfo` object associated with the Spanish (Spain) culture with international sort

-   `CompareInfo` object associated with the Spanish (Spain) culture with traditional sort

-   `CompareInfo` object associated with the `CultureInfo.InvariantCulture`

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrintintstrintint.cs._

## CompareInfo.Compare(String, Int32, Int32, String, Int32, Int32, CompareOptions) method

```csharp
public int Compare (string? string1, int offset1, int length1, string? string2, int offset2, int length2, System.Globalization.CompareOptions options);
```

Compares a section of one string with a section of another string using the specified `CompareOptions` value.

Parameters:

- `string1`: The first string to compare.
- `offset1`: The zero-based index of the character in `string1` at which to start comparing.
- `length1`: The number of consecutive characters in `string1` to compare.
- `string2`: The second string to compare.
- `offset2`: The zero-based index of the character in `string2` at which to start comparing.
- `length2`: The number of consecutive characters in `string2` to compare.
- `options`: A value that defines how `string1` and `string2` should be compared. `options` is either the enumeration value `CompareOptions.Ordinal`, or a bitwise combination of one or more of the following values: `CompareOptions.IgnoreCase`, `CompareOptions.IgnoreSymbols`, `CompareOptions.IgnoreNonSpace`, `CompareOptions.IgnoreWidth`, `CompareOptions.IgnoreKanaType`, `CompareOptions.NumericOrdering`, and `CompareOptions.StringSort`.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  zero

:  The two strings are equal.

-  less than zero

:  The specified section of `string1` is less than the specified section of `string2`.

-  greater than zero

:  The specified section of `string1` is greater than the specified section of `string2`.

Exceptions:

- `ArgumentOutOfRangeException`: `offset1` or `length1` or `offset2` or `length2` is less than zero.

-or-

`offset1` is greater than or equal to the number of characters in `string1`.

-or-

`offset2` is greater than or equal to the number of characters in `string2`.

-or-

`length1` is greater than the number of characters from `offset1` to the end of `string1`.

-or-

`length2` is greater than the number of characters from `offset2` to the end of `string2`.
- `ArgumentException`: `options` contains an invalid `CompareOptions` value.

#### Remarks
If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

> **Note:**
>  When possible, you should call string comparison methods that have a parameter of type `CompareOptions` to specify the kind of comparison expected. As a general rule, use linguistic options (using the current culture) for comparing strings displayed in the user interface and specify `Ordinal` or `OrdinalIgnoreCase` for security comparisons.

#### Examples
The following example compares portions of two strings using different `CompareOptions` settings.

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrintintstrintintopt.cs._

## CompareInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified object is equal to the current `CompareInfo` object.

Parameters:

- `value`: The object to compare with the current `CompareInfo`.

Returns: `true` if the specified object is equal to the current `CompareInfo`; otherwise, `false`.

#### Remarks
Two `CompareInfo` objects are equal if their `CompareInfo.LCID` and `CompareInfo.Name` properties are equal.

This method overrides `Object.Equals`.

If a security decision depends on a string comparison or a case change, you should use the `InvariantCulture` property to ensure that the behavior is consistent regardless of the culture settings of the operating system.

## CompareInfo.GetCompareInfo(Int32) method

```csharp
public static System.Globalization.CompareInfo GetCompareInfo (int culture);
```

Initializes a new `CompareInfo` object that is associated with the culture with the specified identifier.

Parameters:

- `culture`: An integer representing the culture identifier.

Returns: A new `CompareInfo` object associated with the culture with the specified identifier and using string comparison methods in the current `Assembly`.

#### Examples
The following example compares portions of two strings using the different `CompareInfo` objects:

-   `CompareInfo` object associated with the Spanish (Spain) culture with international sort

-   `CompareInfo` object associated with the Spanish (Spain) culture with traditional sort

-   `CompareInfo` object associated with the `CultureInfo.InvariantCulture`

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrstr.cs._

## CompareInfo.GetCompareInfo(String) method

```csharp
public static System.Globalization.CompareInfo GetCompareInfo (string name);
```

Initializes a new `CompareInfo` object that is associated with the culture with the specified name.

Parameters:

- `name`: A string representing the culture name.

Returns: A new `CompareInfo` object associated with the culture with the specified identifier and using string comparison methods in the current `Assembly`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is an invalid culture name.

#### Examples
The following example compares portions of two strings using the different `CompareInfo` objects:

-   `CompareInfo` object associated with the Spanish (Spain) culture with international sort

-   `CompareInfo` object associated with the Spanish (Spain) culture with traditional sort

-   `CompareInfo` object associated with the `CultureInfo.InvariantCulture`

_Code sample not included: ~/snippets/csharp/System.Globalization/CompareInfo/Compare/comparestrstr.cs._

## CompareInfo.GetCompareInfo(Int32, Assembly) method

```csharp
public static System.Globalization.CompareInfo GetCompareInfo (int culture, System.Reflection.Assembly assembly);
```

Initializes a new `CompareInfo` object that is associated with the specified culture and that uses string comparison methods in the specified `Assembly`.

Parameters:

- `culture`: An integer representing the culture identifier.
- `assembly`: An `Assembly` that contains the string comparison methods to use.

Returns: A new `CompareInfo` object associated with the culture with the specified identifier and using string comparison methods in the current `Assembly`.

Exceptions:

- `ArgumentNullException`: `assembly` is `null`.
- `ArgumentException`: `assembly` is of an invalid type.

#### Remarks

> **Note:**
>  The behavior of this method is unpredictable. It is recommended for your application to use a version of this method that does not take an assembly input.

The `assembly` parameter must be of the same type as `Module.Assembly`.

## CompareInfo.GetCompareInfo(String, Assembly) method

```csharp
public static System.Globalization.CompareInfo GetCompareInfo (string name, System.Reflection.Assembly assembly);
```

Initializes a new `CompareInfo` object that is associated with the specified culture and that uses string comparison methods in the specified `Assembly`.

Parameters:

- `name`: A string representing the culture name.
- `assembly`: An `Assembly` that contains the string comparison methods to use.

Returns: A new `CompareInfo` object associated with the culture with the specified identifier and using string comparison methods in the current `Assembly`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`assembly` is `null`.
- `ArgumentException`: `name` is an invalid culture name.

-or-

`assembly` is of an invalid type.

#### Remarks

> **Note:**
>  The behavior of this method is unpredictable. We recommend that you use a version of this method that does not take an assembly input.

The `assembly` parameter must be of the same type as `Module.Assembly`.

## CompareInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `CompareInfo` for hashing algorithms and data structures, such as a hash table.

Returns: A hash code for the current `CompareInfo`.

#### Remarks
This method overrides `Object.GetHashCode`.

This method generates the same hash code for two objects that are equal according to the `CompareInfo.Equals` method.

## CompareInfo.GetHashCode(Char>, CompareOptions) method

```csharp
public int GetHashCode (ReadOnlySpan<char> source, System.Globalization.CompareOptions options);
```

Gets the hash code for a character span based on specified comparison options.

Parameters:

- `source`: The character span whose hash code is to be returned.
- `options`: A value that determines how strings are compared.

Returns: A 32-bit signed integer hash code.

#### Remarks
The behavior of this overload is dependent on its implementation, which might change from one version of the common language runtime to another, or from one .NET implementation to another.

> **Important:**
> If two character spans are equal, this overload returns identical values. However, there is not a unique hash code value for each unique character span value. Different character spans can return the same hash code.
>
> The hash code itself is not guaranteed to be stable. Hash codes for identical character spans can differ across versions of the .NET implementations and across platforms (such as 32-bit and 64-bit) for a single version of .NET.
>
> As a result, hash codes should not be treated as unique identifiers, they should not be persisted, and they should not be used outside the current process.
