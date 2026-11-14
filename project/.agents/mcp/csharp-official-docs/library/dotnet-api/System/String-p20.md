---
title: "String class (part 20 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 20 of 26)

## String.Split(Char[]) method

```csharp
public string[] Split (params char[]? separator);
```

Splits a string into substrings based on specified delimiting characters.

Parameters:

- `separator`: An array of delimiting characters, an empty array that contains no delimiters, or `null`.

Returns: An array whose elements contain the substrings from this instance that are delimited by one or more characters in `separator`. For more information, see the Remarks section.

#### Remarks

When a string is delimited by a known set of characters, you can use the `Split` method to separate it into substrings.

Delimiter characters are not included in the elements of the returned array. For example, if the separator array includes the character "-" and the value of the current string instance is "aa-bb-cc", the method returns an array that contains three elements: "aa", "bb", and "cc".

If this instance does not contain any of the characters in `separator`, the returned array consists of a single element that contains this instance.

Each element of `separator` defines a separate delimiter character. If two delimiters are adjacent, or a delimiter is found at the beginning or end of this instance, the corresponding element in the returned array contains `Empty`.

The following table shows some examples.

| Language     | String value             | Separator              | Returned array                 |
|--------------|--------------------------|------------------------|--------------------------------|
| C#           | "42, 12, 19"             | new Char[] {',', ' '}  | {"42", "", "12", "", "19"}     |
| Visual Basic | "42, 12, 19"             | Char() = {","c, " "c}) | {"42", "", "12", "", "19"}     |
| C#           | "42..12..19."            | new Char[] {'.'}       | {"42", "", "12", "", "19", ""} |
| Visual Basic | "42..12..19."            | Char() = {"."c}        | {"42", "", "12", "", "19", ""} |
| C#           | "Banana"                 | new Char[] {'.'}       | {"Banana"}                     |
| Visual Basic | "Banana"                 | Char() = {"."c}        | {"Banana"}                     |
| C#           | "Darb\nSmarba"           | new Char[] {}          | {"Darb", "Smarba"}             |
| Visual Basic | "Darb" & vbLf & "Smarba" | Char() = {}            | {"Darb", "Smarba"}             |
| C#           | "Darb\nSmarba"           | null                   | {"Darb", "Smarba"}             |
| Visual Basic | "Darb" & vbLf & "Smarba" | Nothing                | {"Darb", "Smarba"}             |

#### The separator array

Each element of separator defines a separate delimiter that consists of a single character.

If the `separator` argument is `null` or contains no characters, the method treats white-space characters as the delimiters. White-space characters are defined by the Unicode standard, and the `Char.IsWhiteSpace` method returns `true` if a white-space character is passed to it.

#### String.Split(Char[]) and compiler overload resolution

Although the single parameter for this overload of `String.Split` is a character array, you can call it with a single character, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/String/Split/compiler-resolution.cs._

Because the `separator` parameter is decorated  with the `ParamArrayAttribute` attribute, compilers will interpret a single character as a single-element character array. This is not the case for other `String.Split` overloads that include a `separator` parameter; you must explicitly pass these overloads a character array as the `separator` argument.

#### Comparison details

The `Split` method extracts the substrings in this string that are delimited by one or more of the characters in the `separator` array, and returns those substrings as elements of an array.

The `Split` method looks for delimiters by performing comparisons using case-sensitive ordinal sort rules. For more information about word, string, and ordinal sorts, see the `CompareOptions` enumeration.

#### Performance considerations

The `String.Split` methods allocate memory for the returned array object and a `String` object for each array element. If your application requires optimal performance or if managing memory allocation is critical in your application, consider using the `String.IndexOf` or `String.IndexOfAny` method. You also have the option of using the `String.Compare` method to locate a substring within a string.

To split a string at a separator character, use the `String.IndexOf` or `String.IndexOfAny` method to locate a separator character in the string. To split a string at a separator string, use the `String.IndexOf` or `String.IndexOfAny` method to locate the first character of the separator string. Then use the `String.Compare` method to determine whether the characters after that first character are equal to the remaining characters of the separator string.

In addition, if the same set of characters is used to split strings in multiple `String.Split` method calls, consider creating a single array and referencing it in each method call. This significantly reduces the additional overhead of each method call.

#### Examples

The following example demonstrates how to extract individual words from a block of text by treating the space character (` `) and tab character (`\t`) as delimiters. The string being split includes both of these characters.

_Code sample not included: ~/snippets/csharp/System/String/Split/basic.cs._

## String.Split(Char>) method

```csharp
public string[] Split (scoped ReadOnlySpan<char> separator);
```

Splits a string into substrings based on specified delimiting characters.

Parameters:

- `separator`: A span of delimiting characters, or an empty span that contains no delimiters.

Returns: An array whose elements contain the substrings from this instance that are delimited by one or more characters in `separator`.

To be added.

## String.Split(Char, StringSplitOptions) method

```csharp
public string[] Split (char separator, StringSplitOptions options = System.StringSplitOptions.None);
```

Splits a string into substrings based on a specified delimiting character and, optionally, options.

Parameters:

- `separator`: A character that delimits the substrings in this string.
- `options`: A bitwise combination of the enumeration values that specifies whether to trim substrings and include empty substrings.

Returns: An array whose elements contain the substrings from this instance that are delimited by `separator`.

To be added.

## String.Split(Char[], Int32) method

```csharp
public string[] Split (char[]? separator, int count);
```

Splits a string into a maximum number of substrings based on specified delimiting characters.

Parameters:

- `separator`: An array of characters that delimit the substrings in this string, an empty array that contains no delimiters, or `null`.
- `count`: The maximum number of substrings to return.

Returns: An array whose elements contain the substrings in this instance that are delimited by one or more characters in `separator`. For more information, see the Remarks section.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is negative.

#### Remarks
Delimiter characters are not included in the elements of the returned array.

If this instance does not contain any of the characters in `separator`, the returned array consists of a single element that contains this instance. If `count` is zero, an empty array is returned.

If the `separator` parameter is `null` or contains no characters, white-space characters are assumed to be the delimiters. White-space characters are defined by the Unicode standard and the `Char.IsWhiteSpace` method returns `true` if they are passed to it.

Each element of `separator` defines a separate delimiter character. If two delimiters are adjacent, or a delimiter is found at the beginning or end of this instance, the corresponding array element contains `Empty`.

If there are more than `count` substrings in this instance, the first `count - 1` substrings are returned in the first `count - 1` elements of the return value, and the remaining characters in this instance are returned in the last element of the return value.

If `count` is greater than the number of substrings, the available substrings are returned and no exception is thrown.

The following table shows some examples.

| Language     | String value             | Separator              | Returned array                 |
|--------------|--------------------------|------------------------|--------------------------------|
| C#           | "42, 12, 19"             | new Char[] {',', ' '}  | {"42", "", "12", "", "19"}     |
| Visual Basic | "42, 12, 19"             | Char() = {","c, " "c}) | {"42", "", "12", "", "19"}     |
| C#           | "42..12..19."            | new Char[] {'.'}       | {"42", "", "12", "", "19", ""} |
| Visual Basic | "42..12..19."            | Char() = {"."c}        | {"42", "", "12", "", "19", ""} |
| C#           | "Banana"                 | new Char[] {'.'}       | {"Banana"}                     |
| Visual Basic | "Banana"                 | Char() = {"."c}        | {"Banana"}                     |
| C#           | "Darb\nSmarba"           | new Char[] {}          | {"Darb", "Smarba"}             |
| Visual Basic | "Darb" & vbLf & "Smarba" | Char() = {}            | {"Darb", "Smarba"}             |
| C#           | "Darb\nSmarba"           | null                   | {"Darb", "Smarba"}             |
| Visual Basic | "Darb" & vbLf & "Smarba" | Nothing                | {"Darb", "Smarba"}             |

#### Performance considerations
The `String.Split` methods allocate memory for the returned array object and a `String` object for each array element. If your application requires optimal performance or if managing memory allocation is critical in your application, consider using the `String.IndexOf` or `String.IndexOfAny` method, and optionally the `String.Compare` method, to locate a substring within a string.

If you are splitting a string at a separator character, use the `String.IndexOf` or `String.IndexOfAny` method to locate a separator character in the string. If you are splitting a string at a separator string, use the `String.IndexOf` or `String.IndexOfAny` method to locate the first character of the separator string. Then use the `String.Compare` method to determine whether the characters after that first character are equal to the remaining characters of the separator string.

In addition, if the same set of characters is used to split strings in multiple `String.Split` method calls, consider creating a single array and referencing it in each method call. This significantly reduces the additional overhead of each method call.

#### Examples
The following example demonstrates how `count` can be used to limit the number of strings returned by `String.Split`.

_Code sample not included: ~/snippets/csharp/System/String/Split/limit.cs._
