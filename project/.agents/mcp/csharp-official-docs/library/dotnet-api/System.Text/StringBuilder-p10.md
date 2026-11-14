---
title: "StringBuilder class (part 10 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 10 of 11)

## StringBuilder.Insert(Int32, Char>) method

```csharp
public System.Text.StringBuilder Insert (int index, ReadOnlySpan<char> value);
```

Inserts the sequence of characters into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The character span to insert.

Returns: A reference to this instance after the insert operation has completed.

#### Remarks

The existing characters are shifted to make room for the character sequence in the `value` to insert it. The capacity is adjusted as needed.

## StringBuilder.Insert(Int32, SByte) method

```csharp
public System.Text.StringBuilder Insert (int index, sbyte value);
```

Inserts the string representation of a specified 8-bit signed integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`SByte.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity is adjusted as needed.

## StringBuilder.Insert(Int32, Single) method

```csharp
public System.Text.StringBuilder Insert (int index, float value);
```

Inserts the string representation of a single-precision floating point number into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Single.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, String) method

```csharp
public System.Text.StringBuilder Insert (int index, string? value);
```

Inserts a string into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The string to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the current length of this instance.

-or-

The current length of this `StringBuilder` object plus the length of `value` exceeds `StringBuilder.MaxCapacity`.

#### Remarks
Existing characters are shifted to make room for the new text. The capacity is adjusted as needed.

This instance of `StringBuilder` is not changed if `value` is `null`, or `value` is not `null` but its length is zero.

## StringBuilder.Insert(Int32, Rune) method

```csharp
public System.Text.StringBuilder Insert (int index, System.Text.Rune value);
```

To be added.

Parameters:

- `index`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## StringBuilder.Insert(Int32, UInt16) method

```csharp
public System.Text.StringBuilder Insert (int index, ushort value);
```

Inserts the string representation of a 16-bit unsigned integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`UInt16.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, UInt32) method

```csharp
public System.Text.StringBuilder Insert (int index, uint value);
```

Inserts the string representation of a 32-bit unsigned integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`UInt32.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, UInt64) method

```csharp
public System.Text.StringBuilder Insert (int index, ulong value);
```

Inserts the string representation of a 64-bit unsigned integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`UInt64.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, String, Int32) method

```csharp
public System.Text.StringBuilder Insert (int index, string? value, int count);
```

Inserts one or more copies of a specified string into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The string to insert.
- `count`: The number of times to insert `value`.

Returns: A reference to this instance after insertion has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the current length of this instance.

-or-

`count` is less than zero.
- `OutOfMemoryException`: The current length of this `StringBuilder` object plus the length of `value` times `count` exceeds `StringBuilder.MaxCapacity`.

#### Remarks
Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

This `StringBuilder` object is not changed if `value` is `null`, `value` is not `null` but its length is zero, or `count` is zero.

## StringBuilder.Insert(Int32, Char[], Int32, Int32) method

```csharp
public System.Text.StringBuilder Insert (int index, char[]? value, int startIndex, int charCount);
```

Inserts the string representation of a specified subarray of Unicode characters into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: A character array.
- `startIndex`: The starting index within `value`.
- `charCount`: The number of characters to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentNullException`: `value` is `null`, and `startIndex` and `charCount` are not zero.
- `ArgumentOutOfRangeException`: `index`, `startIndex`, or `charCount` is less than zero.

-or-

`index` is greater than the length of this instance.

-or-

`startIndex` plus `charCount` is not a position within `value`.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.MoveChunks(StringBuilder) method

```csharp
public static System.Text.StringBuilder MoveChunks (System.Text.StringBuilder source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## StringBuilder.Remove(Int32, Int32) method

```csharp
public System.Text.StringBuilder Remove (int startIndex, int length);
```

Removes the specified range of characters from this instance.

Parameters:

- `startIndex`: The zero-based position in this instance where removal begins.
- `length`: The number of characters to remove.

Returns: A reference to this instance after the excise operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: If `startIndex` or `length` is less than zero, or `startIndex` + `length` is greater than the length of this instance.

#### Remarks
The current method removes the specified range of characters from the current instance. The characters at (`startIndex` + `length`) are moved to `startIndex`, and the string value of the current instance is shortened by `length`. The capacity of the current instance is unaffected.

> **Note:**
>  The `StringBuilder.Remove` method modifies the value of the current `StringBuilder` instance and returns that instance. It does not create and return a new `StringBuilder` object.

#### Examples
The following example demonstrates the `StringBuilder.Remove` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Remove/remove.cs._

## StringBuilder.Replace(Char, Char) method

```csharp
public System.Text.StringBuilder Replace (char oldChar, char newChar);
```

Replaces all occurrences of a specified character in this instance with another specified character.

Parameters:

- `oldChar`: The character to replace.
- `newChar`: The character that replaces `oldChar`.

Returns: A reference to this instance with `oldChar` replaced by `newChar`.

#### Remarks
This method performs an ordinal, case-sensitive comparison to identify occurrences of `oldChar` in the current instance. The size of the current `StringBuilder` instance is unchanged after the replacement.

## StringBuilder.Replace(Char>, Char>) method

```csharp
public System.Text.StringBuilder Replace (ReadOnlySpan<char> oldValue, ReadOnlySpan<char> newValue);
```

Replaces all instances of one read-only character span with another in this builder.

Parameters:

- `oldValue`: The read-only character span to replace.
- `newValue`: The read-only character span to replace `oldValue` with.

Returns: A reference to this instance with `oldValue` replaced by `newValue`.

If `newValue` is empty, instances of `oldValue` are removed from this builder.

## StringBuilder.Replace(String, String) method

```csharp
public System.Text.StringBuilder Replace (string oldValue, string? newValue);
```

Replaces all occurrences of a specified string in this instance with another specified string.

Parameters:

- `oldValue`: The string to replace.
- `newValue`: The string that replaces `oldValue`, or `null`.

Returns: A reference to this instance with all instances of `oldValue` replaced by `newValue`.

Exceptions:

- `ArgumentNullException`: `oldValue` is `null`.
- `ArgumentException`: The length of `oldValue` is zero.
- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method performs an ordinal, case-sensitive comparison to identify occurrences of `oldValue` in the current instance. If `newValue` is `null` or `Empty`, all occurrences of `oldValue` are removed.

## StringBuilder.Replace(Rune, Rune) method

```csharp
public System.Text.StringBuilder Replace (System.Text.Rune oldRune, System.Text.Rune newRune);
```

To be added.

Parameters:

- `oldRune`: To be added.
- `newRune`: To be added.

Returns: To be added.

To be added.

## StringBuilder.Replace(Char, Char, Int32, Int32) method

```csharp
public System.Text.StringBuilder Replace (char oldChar, char newChar, int startIndex, int count);
```

Replaces, within a substring of this instance, all occurrences of a specified character with another specified character.

Parameters:

- `oldChar`: The character to replace.
- `newChar`: The character that replaces `oldChar`.
- `startIndex`: The position in this instance where the substring begins.
- `count`: The length of the substring.

Returns: A reference to this instance with `oldChar` replaced by `newChar` in the range from `startIndex` to `startIndex` + `count` -1.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` + `count` is greater than the length of the value of this instance.

-or-

`startIndex` or `count` is less than zero.

#### Remarks
This method performs an ordinal, case-sensitive comparison to identify occurrences of `oldChar` in the current instance. The size of the current `StringBuilder` object is unchanged after the replacement.

## StringBuilder.Replace(Char>, Char>, Int32, Int32) method

```csharp
public System.Text.StringBuilder Replace (ReadOnlySpan<char> oldValue, ReadOnlySpan<char> newValue, int startIndex, int count);
```

Replaces all instances of one read-only character span with another in part of this builder.

Parameters:

- `oldValue`: The read-only character span to replace.
- `newValue`: The read-only character span to replace `oldValue` with.
- `startIndex`: The index to start in this builder.
- `count`: The number of characters to read in this builder.

Returns: A reference to this instance with `oldValue` replaced by `newValue`.

If `newValue` is empty, instances of `oldValue` are removed from this builder.
