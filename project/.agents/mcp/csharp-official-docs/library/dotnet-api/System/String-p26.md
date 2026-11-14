---
title: "String class (part 26 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 26 of 26)

## String.Trim(Char) method

```csharp
public string Trim (char trimChar);
```

Removes all leading and trailing instances of a character from the current string.

Parameters:

- `trimChar`: A Unicode character to remove.

Returns: The string that remains after all instances of the `trimChar` character are removed from the start and end of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `Trim(System.Char)` method removes from the current string all leading and trailing instances of the `trimChar` character. Each leading and trailing trim operation stops when a character different from `trimChar` is encountered. For example, if `trimChar` is `-` and the current string is "---abc---xyz----", the `Trim(System.Char)` method returns "abc---xyz". To remove characters between words in a string, use .NET Regular Expressions.

> **Note:**
> If the `Trim(System.Char)` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading and trailing `trimChar` characters found in the current instance are removed.

If the current string equals `Empty` or all the characters in the current instance consist of `trimChar` characters, the method returns `Empty`.

## String.Trim(Char[]) method

```csharp
public string Trim (params char[]? trimChars);
```

Removes all leading and trailing occurrences of a set of characters specified in an array from the current string.

Parameters:

- `trimChars`: An array of Unicode characters to remove, or `null`.

Returns: The string that remains after all occurrences of the characters in the `trimChars` parameter are removed from the start and end of the current string. If `trimChars` is `null` or an empty array, white-space characters are removed instead. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `Trim(System.Char[])` method removes from the current string all leading and trailing characters that are in the `trimChars` parameter. Each leading and trailing trim operation stops when a character that is not in `trimChars` is encountered. For example, if the current string is "123abc456xyz789" and `trimChars` contains the digits from "1" through "9", the `Trim(System.Char[])` method returns "abc456xyz".

> **Note:**
> If the `Trim(System.Char[])` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading and trailing `trimChars` characters found in the current instance are removed.

If the current string equals `Empty` or all the characters in the current instance consist of characters in the `trimChars` array, the method returns `Empty`.

If `trimChars` is `null` or an empty array, this method removes any leading or trailing characters that result in the method returning `true` when they are passed to the `Char.IsWhiteSpace` method.

#### Examples

The following example uses the `Trim(System.Char[])` method to remove space, asterisk (*), and apostrophe (') characters from a string.

_Code sample not included: ~/snippets/csharp/System/String/Trim/Trim1.cs._

## String.Trim(Rune) method

```csharp
public string Trim (System.Text.Rune trimRune);
```

To be added.

Parameters:

- `trimRune`: To be added.

Returns: To be added.

To be added.

## String.TrimEnd() method

```csharp
public string TrimEnd ();
```

Removes all the trailing white-space characters from the current string.

Returns: The string that remains after all white-space characters are removed from the end of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimEnd` method removes from the current string all trailing white-space characters. The trim operation stops when the first non white-space character is encountered at the end of the string. For example, if the current string is "   abc   xyz    ", the `TrimEnd` method returns "   abc   xyz".

> **Note:**
> If the `TrimEnd` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all trailing white-space characters are removed from the current string.

## String.TrimEnd(Char) method

```csharp
public string TrimEnd (char trimChar);
```

Removes all the trailing occurrences of a character from the current string.

Parameters:

- `trimChar`: A Unicode character to remove.

Returns: The string that remains after all occurrences of the `trimChar` character are removed from the end of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimEnd(System.Char)` method removes from the current string all trailing `trimChar` characters. The trim operation stops when the first character that is not `trimChar` is encountered at the end of the string. For example, if `trimChar` is `-` and the current string is "---abc---xyz----", the `TrimEnd(System.Char)` method returns "---abc---xyz".

> **Note:**
> If the `TrimEnd(System.Char)` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all trailing `trimChar` characters are removed from the current string.

## String.TrimEnd(Char[]) method

```csharp
public string TrimEnd (params char[]? trimChars);
```

Removes all the trailing occurrences of a set of characters specified in an array from the current string.

Parameters:

- `trimChars`: An array of Unicode characters to remove, or `null`.

Returns: The string that remains after all occurrences of the characters in the `trimChars` parameter are removed from the end of the current string. If `trimChars` is `null` or an empty array, Unicode white-space characters are removed instead. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimEnd(System.Char[])` method removes from the current string all trailing characters that are in the `trimChars` parameter. The trim operation stops when the first character that is not in `trimChars` is encountered at the end of the string. For example, if the current string is "123abc456xyz789" and `trimChars` contains the digits from "1" through "9", the `TrimEnd(System.Char[])` method returns "123abc456xyz".

> **Note:**
> If the `TrimEnd(System.Char[])` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all trailing characters found in `trimChars` are removed from the current string.

#### Examples

The following example demonstrates how you can use the `TrimEnd(System.Char[])` method to trim white space or punctuation marks from the end of a string.

_Code sample not included: ~/snippets/csharp/System/String/TrimEnd/sample2.cs._

## String.TrimEnd(Rune) method

```csharp
public string TrimEnd (System.Text.Rune trimRune);
```

To be added.

Parameters:

- `trimRune`: To be added.

Returns: To be added.

To be added.

## String.TrimStart() method

```csharp
public string TrimStart ();
```

Removes all the leading white-space characters from the current string.

Returns: The string that remains after all white-space characters are removed from the start of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimStart` method removes from the current string all leading white-space characters. The trim operation stops when a non white-space character is encountered. For example, if the current string is "   abc   xyz    ", the `TrimStart` method returns "abc   xyz    ".

> **Note:**
> If the `TrimStart` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading white space characters found in the current instance are removed.

## String.TrimStart(Char) method

```csharp
public string TrimStart (char trimChar);
```

Removes all the leading occurrences of a specified character from the current string.

Parameters:

- `trimChar`: The Unicode character to remove.

Returns: The string that remains after all occurrences of the `trimChar` character are removed from the start of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimStart(System.Char)` method removes from the current string all leading `trimChar` characters. The trim operation stops when a character that is not `trimChar` is encountered. For example, if `trimChar` is `-` and the current string is "---abc---xyz----", the `TrimStart(System.Char)` method returns "abc---xyz----".

> **Note:**
> If the `TrimStart(System.Char)` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading `trimChar` characters found in the current instance are removed.

## String.TrimStart(Char[]) method

```csharp
public string TrimStart (params char[]? trimChars);
```

Removes all the leading occurrences of a set of characters specified in an array from the current string.

Parameters:

- `trimChars`: An array of Unicode characters to remove, or `null`.

Returns: The string that remains after all occurrences of characters in the `trimChars` parameter are removed from the start of the current string. If `trimChars` is `null` or an empty array, white-space characters are removed instead. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `TrimStart(System.Char[])` method removes from the current string all leading characters that are in the `trimChars` parameter. The trim operation stops when a character that is not in `trimChars` is encountered. For example, if the current string is "123abc456xyz789" and `trimChars` contains the digits from "1" through "9", the `TrimStart(System.Char[])` method returns "abc456xyz789".

> **Note:**
> If the `TrimStart(System.Char[])` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading characters that are in the `trimChars` parameter found in the current instance are removed.

#### Examples

The following example demonstrates the basic <example-value> of the `String.TrimStart` method:

_Code sample not included: ~/snippets/csharp/System/String/TrimStart/sample.cs._

The following example uses the `String.TrimStart` method to trim white space and comment characters from lines of source code. The `StripComments` method wraps a call to `String.TrimStart` and passes it a character array that contains a space and the comment character, which is an apostrophe ( ' ) in Visual Basic and a slash ( / ) in C# or F#. The `String.TrimStart` method is also called to remove leading white space when evaluating whether a string is a comment.

_Code sample not included: ~/snippets/csharp/System/String/TrimStart/sample.cs._

The following example then illustrates a call to the `StripComments` method.

_Code sample not included: ~/snippets/csharp/System/String/TrimStart/sample.cs._

## String.TrimStart(Rune) method

```csharp
public string TrimStart (System.Text.Rune trimRune);
```

To be added.

Parameters:

- `trimRune`: To be added.

Returns: To be added.

To be added.

## String.TryCopyTo(Char>) method

```csharp
public bool TryCopyTo (Span<char> destination);
```

Copies the contents of this string into the destination span.

Parameters:

- `destination`: The span into which to copy this string's contents.

Returns: `true` if the data was copied; `false` if the destination was too short to fit the contents of the string.

To be added.

## String.Empty field

```csharp
public static readonly string Empty;
```

Represents the empty string. This field is read-only.

#### Remarks
The value of this field is the zero-length string, "".

In application code, this field is most commonly used in assignments to initialize a string variable to an empty string. To test whether the value of a string is either `null` or `Empty`, use the `String.IsNullOrEmpty` method.
