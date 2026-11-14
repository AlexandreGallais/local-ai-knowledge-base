---
title: "StringBuilder class (part 3 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 3 of 11)

## StringBuilder.Chars property

```csharp
public char this[int index] { get; set; }
```

Gets or sets the character at the specified character position in this instance.

Parameters:

- `index`: The position of the character.

Returns: The Unicode character at position `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the bounds of this instance while setting a character.
- `IndexOutOfRangeException`: `index` is outside the bounds of this instance while getting a character.

The `index` parameter is the position of a character within the `StringBuilder`. The first character in the string is at index 0. The length of a string is the number of characters it contains. The last accessible character of a `StringBuilder` instance is at index `StringBuilder.Length` - 1.

`Chars` is the default property of the `StringBuilder` class. In C#, it is an indexer. This means that individual characters can be retrieved from the `Chars` property as shown in the following example, which counts the number of alphabetic, white-space, and punctuation characters in a string.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Chars/chars1.cs._

## StringBuilder.Length property

```csharp
public int Length { get; set; }
```

Gets or sets the length of the current `StringBuilder` object.

Returns: The length of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is less than zero or greater than `StringBuilder.MaxCapacity`.

#### Remarks
The length of a `StringBuilder` object is defined by its number of `Char` objects.

Like the `Length` property, the `Length` property indicates the length of the current string object. Unlike the `Length` property, which is read-only, the `Length` property allows you to modify the length of the string stored to the `StringBuilder` object.

If the specified length is less than the current length, the current `StringBuilder` object is truncated to the specified length. If the specified length is greater than the current length, the end of the string value of the current `StringBuilder` object is padded with the Unicode NULL character (U+0000).

If the specified length is greater than the current capacity, `StringBuilder.Capacity` increases so that it is greater than or equal to the specified length.

#### Examples
The following example demonstrates the `Length` property.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Capacity/cap.cs._

## StringBuilder.MaxCapacity property

```csharp
public int MaxCapacity { get; }
```

Gets the maximum capacity of this instance.

Returns: The maximum number of characters this instance can hold.

#### Remarks
The maximum capacity for this implementation is `MaxValue`. However, this value is implementation-specific and might be different in other or later implementations. You can explicitly set the maximum capacity of a `StringBuilder` object by calling the `%23ctor` constructor.

When you instantiate the `StringBuilder` object by calling the `%23ctor` constructor, both the length and the capacity of the `StringBuilder` instance can grow beyond the value of its `MaxCapacity` property. This can occur particularly when you call the `Append` and `AppendFormat` methods to append small strings.

## StringBuilder.Append(Boolean) method

```csharp
public System.Text.StringBuilder Append (bool value);
```

Appends the string representation of a specified Boolean value to this instance.

Parameters:

- `value`: The Boolean value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The `Append` method calls the `ToString` method to get the string representation of `value`. The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Byte) method

```csharp
public System.Text.StringBuilder Append (byte value);
```

Appends the string representation of a specified 8-bit unsigned integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The `Append` method calls the `ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Char) method

```csharp
public System.Text.StringBuilder Append (char value);
```

Appends the string representation of a specified `Char` object to this instance.

Parameters:

- `value`: The UTF-16-encoded code unit to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Char[]) method

```csharp
public System.Text.StringBuilder Append (char[]? value);
```

Appends the string representation of the Unicode characters in a specified array to this instance.

Parameters:

- `value`: The array of characters to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method appends all the characters in the specified array to the current instance in the same order as they appear in `value`. If `value` is `null`, no changes are made.

The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Decimal) method

```csharp
public System.Text.StringBuilder Append (decimal value);
```

Appends the string representation of a specified decimal number to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The `Append` method calls the `ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Double) method

```csharp
public System.Text.StringBuilder Append (double value);
```

Appends the string representation of a specified double-precision floating-point number to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append2.cs._

The `Append` method calls the `ToString` method to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Int16) method

```csharp
public System.Text.StringBuilder Append (short value);
```

Appends the string representation of a specified 16-bit signed integer to this instance.

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

## StringBuilder.Append(Int32) method

```csharp
public System.Text.StringBuilder Append (int value);
```

Appends the string representation of a specified 32-bit signed integer to this instance.

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

## StringBuilder.Append(Int64) method

```csharp
public System.Text.StringBuilder Append (long value);
```

Appends the string representation of a specified 64-bit signed integer to this instance.

Parameters:

- `value`: The value to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append3.cs._

The `Append` method calls the `ToString` to get the string representation of `value` for the current culture. To control the formatting of `value`, call the `StringBuilder.AppendFormat` method.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Object) method

```csharp
public System.Text.StringBuilder Append (object? value);
```

Appends the string representation of a specified object to this instance.

Parameters:

- `value`: The object to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The `Append` method modifies the existing instance of this class; it does not return a new class instance. Because of this, you can call a method or property on the existing reference and you do not have to assign the return value to a `StringBuilder` object, as the following example illustrates. It defines a `Dog` class, creates a `Dog` object, and makes three calls to the `StringBuilder.Append` method to create a string that contains the dog's name and breed.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Append/append4.cs._

The `Append` method calls the `Object.ToString` method to get the string representation of `value`. If `value` is `null`, no changes are made to the `StringBuilder` object.

The capacity of this instance is adjusted as needed.

## StringBuilder.Append(Char>) method

```csharp
public System.Text.StringBuilder Append (ReadOnlyMemory<char> value);
```

Appends the string representation of a specified read-only character memory region to this instance.

Parameters:

- `value`: The read-only character memory region to append.

Returns: A reference to this instance after the append operation is completed.

To be added.
