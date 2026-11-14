---
title: "StringBuilder class (part 9 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 9 of 11)

## StringBuilder.CopyTo(Int32, Char[], Int32, Int32) method

```csharp
public void CopyTo (int sourceIndex, char[] destination, int destinationIndex, int count);
```

Copies the characters from a specified segment of this instance to a specified segment of a destination `Char` array.

Parameters:

- `sourceIndex`: The starting position in this instance where characters will be copied from. The index is zero-based.
- `destination`: The array where characters will be copied.
- `destinationIndex`: The starting position in `destination` where characters will be copied. The index is zero-based.
- `count`: The number of characters to be copied.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `sourceIndex`, `destinationIndex`, or `count`, is less than zero.

-or-

`sourceIndex` is greater than the length of this instance.
- `ArgumentException`: `sourceIndex` + `count` is greater than the length of this instance.

-or-

`destinationIndex` + `count` is greater than the length of `destination`.

#### Remarks
The `StringBuilder.CopyTo` method is intended to be used in the rare situation when you need to efficiently copy successive sections of a `StringBuilder` object to an array. The array should be a fixed size, preallocated, reusable, and possibly globally accessible.

For example, your code could populate a `StringBuilder` object with a large number of characters then use the `StringBuilder.CopyTo` method to copy small, successive pieces of the `StringBuilder` object to an array where the pieces are processed. When all the data in the `StringBuilder` object is processed, the size of the `StringBuilder` object is set to zero and the cycle is repeated.

#### Examples
The following example demonstrates the `StringBuilder.CopyTo` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/CopyTo/ct2.cs._

## StringBuilder.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the capacity of this instance of `StringBuilder` is at least the specified value.

Parameters:

- `capacity`: The minimum capacity to ensure.

Returns: The new capacity of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
If the current capacity is less than the `capacity` parameter, memory for this instance is reallocated to hold at least `capacity` number of characters; otherwise, no memory is changed.

#### Examples
The following example demonstrates the `StringBuilder.EnsureCapacity` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Capacity/cap.cs._

## StringBuilder.EnumerateRunes() method

```csharp
public System.Text.StringBuilderRuneEnumerator EnumerateRunes ();
```

To be added.

Returns: To be added.

To be added.

## StringBuilder.Equals(Char>) method

```csharp
public bool Equals (ReadOnlySpan<char> span);
```

Returns a value indicating whether the characters in this instance are equal to the characters in a specified read-only character span.

Parameters:

- `span`: The character span to compare with the current instance.

Returns: `true` if the characters in this instance and `span` are the same; otherwise, `false`.

#### Remarks

The `Equals` method performs an ordinal comparison to determine whether the characters in the current instance and `span` are equal.

## StringBuilder.Equals(StringBuilder) method

```csharp
public bool Equals (System.Text.StringBuilder? sb);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `sb`: An object to compare with this instance, or `null`.

Returns: `true` if the characters in this instance and `sb` are equal; otherwise, `false`.

#### Remarks

The current instance and `sb` are equal if the strings assigned to both `StringBuilder` objects are the same.  To determine equality, the `Equals` method uses ordinal comparison. The `Capacity` and `MaxCapacity` property values are not used in the comparison.

#### Examples
The following code uses the `StringBuilder.Equals` method to check whether two `StringBuilder` objects are equal. The method is called repeatedly after small changes are made to each object, and the results are displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Capacity/cap.cs._

## StringBuilder.GetChunks() method

```csharp
public System.Text.StringBuilder.ChunkEnumerator GetChunks ();
```

Returns an object that can be used to iterate through the chunks of characters represented in a `ReadOnlyMemory<Char>` created from this `StringBuilder` instance.

Returns: An enumerator for the chunks in the `ReadOnlyMemory<Char>`.

#### Remarks

You can iterate the chunks in the memory range with code like the following:

```csharp
foreach (ReadOnlyMemory<char> chunk in sb.GetChunks())
    foreach(char ch in chunk.Span)
        { /* operations on ch */ }
```

The purpose of this method is to efficiently extract the data of a *constant* `StringBuilder`. If the `StringBuilder` is modified while the chunk enumeration is incomplete, the result is undefined. `StringBuilder` is also not thread-safe, so operating on it with concurrent threads is illegal.

The `ReadOnlyMemory<T>` chunks returned are not guaranteed to remain unchanged if the `StringBuilder` is modified, so do not cache them for later use.

Creating a `ReadOnlySpan<T>` from a `ReadOnlyMemory<T>` (as the `Span` method does in the previous example) is expensive, so create a local variable for the span if you need to use it in a nested `for` statement. For example:

```csharp
foreach (ReadOnlyMemory<char> chunk in sb.GetChunks())
{
    var span = chunk.Span;
    for(int i = 0; i < span.Length; i++)
    {
        /* operations on span[i] */
    }
}
```

## StringBuilder.GetRuneAt(Int32) method

```csharp
public System.Text.Rune GetRuneAt (int index);
```

To be added.

Parameters:

- `index`: To be added.

Returns: To be added.

To be added.

## StringBuilder.Insert(Int32, Boolean) method

```csharp
public System.Text.StringBuilder Insert (int index, bool value);
```

Inserts the string representation of a Boolean value into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

`Boolean.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity is adjusted as needed.

## StringBuilder.Insert(Int32, Byte) method

```csharp
public System.Text.StringBuilder Insert (int index, byte value);
```

Inserts the string representation of a specified 8-bit unsigned integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Byte.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Char) method

```csharp
public System.Text.StringBuilder Insert (int index, char value);
```

Inserts the string representation of a specified Unicode character into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Char.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Char[]) method

```csharp
public System.Text.StringBuilder Insert (int index, char[]? value);
```

Inserts the string representation of a specified array of Unicode characters into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The character array to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

If `value` is `null`, the `StringBuilder` is not changed.

## StringBuilder.Insert(Int32, Decimal) method

```csharp
public System.Text.StringBuilder Insert (int index, decimal value);
```

Inserts the string representation of a decimal number into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Decimal.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Double) method

```csharp
public System.Text.StringBuilder Insert (int index, double value);
```

Inserts the string representation of a double-precision floating-point number into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Double.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Int16) method

```csharp
public System.Text.StringBuilder Insert (int index, short value);
```

Inserts the string representation of a specified 16-bit signed integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Int16.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Int32) method

```csharp
public System.Text.StringBuilder Insert (int index, int value);
```

Inserts the string representation of a specified 32-bit signed integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Int32.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Int64) method

```csharp
public System.Text.StringBuilder Insert (int index, long value);
```

Inserts the string representation of a 64-bit signed integer into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The value to insert.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Int64.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

## StringBuilder.Insert(Int32, Object) method

```csharp
public System.Text.StringBuilder Insert (int index, object? value);
```

Inserts the string representation of an object into this instance at the specified character position.

Parameters:

- `index`: The position in this instance where insertion begins.
- `value`: The object to insert, or `null`.

Returns: A reference to this instance after the insert operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the length of this instance.
- `OutOfMemoryException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
`Object.ToString` is used to get a string representation of `value`. Existing characters are shifted to make room for the new text. The capacity of this instance is adjusted as needed.

If `value` is `null`, the value of this instance is unchanged.
