---
title: "StringBuilder class (part 4 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 4 of 11)

## StringBuilder.Append(Char>) method

```csharp
public System.Text.StringBuilder Append (ReadOnlySpan<char> value);
```

Appends the string representation of a specified read-only character span to this instance.

Parameters:

- `value`: The read-only character span to append.

Returns: A reference to this instance after the append operation is completed.

To be added.

## StringBuilder.Append(SByte) method

```csharp
public System.Text.StringBuilder Append (sbyte value);
```

Appends the string representation of a specified 8-bit signed integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` method calls the `ToString` method  to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Single) method

```csharp
public System.Text.StringBuilder Append (float value);
```

Appends the string representation of a specified single-precision floating-point number to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` method calls the `Single.ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(String) method

```csharp
public System.Text.StringBuilder Append (string? value);
```

Appends a copy of the specified string to this instance.

Parameters:

- `value`: The string to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

If `value` is `null`, no changes are made.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Rune) method

```csharp
public System.Text.StringBuilder Append (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## StringBuilder.Append(StringBuilder) method

```csharp
public System.Text.StringBuilder Append (System.Text.StringBuilder? value);
```

Appends the string representation of a specified string builder to this instance.

Parameters:

- `value`: The string builder to append.

Returns: A reference to this instance after the append operation is completed.

To be added.

## StringBuilder.Append(StringBuilder+AppendInterpolatedStringHandler) method

```csharp
public System.Text.StringBuilder Append (ref System.Text.StringBuilder.AppendInterpolatedStringHandler handler);
```

Appends the specified interpolated string to this instance.

Parameters:

- `handler`: The interpolated string to append.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.Append(UInt16) method

```csharp
public System.Text.StringBuilder Append (ushort value);
```

Appends the string representation of a specified 16-bit unsigned integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` method calls the `ToString` method to get the string representation of `value`. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(UInt32) method

```csharp
public System.Text.StringBuilder Append (uint value);
```

Appends the string representation of a specified 32-bit unsigned integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` calls the `UInt32.ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(UInt64) method

```csharp
public System.Text.StringBuilder Append (ulong value);
```

Appends the string representation of a specified 64-bit unsigned integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` method calls the `ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Char, Int32) method

```csharp
public System.Text.StringBuilder Append (char value, int repeatCount);
```

Appends a specified number of copies of the string representation of a Unicode character to this instance.

Parameters:

- `value`: The character to append.
- `repeatCount`: The number of times to append `value`.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `repeatCount` is less than zero.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.
- `OutOfMemoryException`: Out of memory.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Char*, Int32) method

```csharp
public System.Text.StringBuilder Append (char* value, int valueCount);
```

Appends an array of Unicode characters starting at a specified address to this instance.

Parameters:

- `value`: A pointer to an array of characters.
- `valueCount`: The number of characters in the array.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `valueCount` is less than zero.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.
- `NullReferenceException`: `value` is a null pointer.

#### Remarks
This method appends `valueCount` characters starting at address `value` to the current instance.

The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(IFormatProvider, StringBuilder+AppendInterpolatedStringHandler) method

```csharp
public System.Text.StringBuilder Append (IFormatProvider? provider, ref System.Text.StringBuilder.AppendInterpolatedStringHandler handler);
```

Appends the specified interpolated string to this instance using the specified format.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `handler`: The interpolated string to append.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.Append(Char[], Int32, Int32) method

```csharp
public System.Text.StringBuilder Append (char[]? value, int startIndex, int charCount);
```

Appends the string representation of a specified subarray of Unicode characters to this instance.

Parameters:

- `value`: A character array.
- `startIndex`: The starting position in `value`.
- `charCount`: The number of characters to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `value` is `null`, and `startIndex` and `charCount` are not zero.
- `ArgumentOutOfRangeException`: `charCount` is less than zero.

-or-

`startIndex` is less than zero.

-or-

`startIndex` + `charCount` is greater than the length of `value`.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method appends the specified range of characters in `value` to the current instance. If `value` is `null` and `startIndex` and `count` are both zero, no changes are made.

The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(String, Int32, Int32) method

```csharp
public System.Text.StringBuilder Append (string? value, int startIndex, int count);
```

Appends a copy of a specified substring to this instance.

Parameters:

- `value`: The string that contains the substring to append.
- `startIndex`: The starting position of the substring within `value`.
- `count`: The number of characters in `value` to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `value` is `null`, and `startIndex` and `count` are not zero.
- `ArgumentOutOfRangeException`: `count` less than zero.

-or-

`startIndex` less than zero.

-or-

`startIndex` + `count` is greater than the length of `value`.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method appends the specified range of characters in `value` to the current instance. If `value` is `null` and `startIndex` and `count` are both zero, no changes are made.

The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(StringBuilder, Int32, Int32) method

```csharp
public System.Text.StringBuilder Append (System.Text.StringBuilder? value, int startIndex, int count);
```

Appends a copy of a substring within a specified string builder to this instance.

Parameters:

- `value`: The string builder that contains the substring to append.
- `startIndex`: The starting position of the substring within `value`.
- `count`: The number of characters in `value` to append.

Returns: A reference to this instance after the append operation has completed.

To be added.
