---
title: "StringBuilder class (part 8 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 8 of 11)

## StringBuilder.AppendFormat<TArg0,TArg1>(IFormatProvider, CompositeFormat, TArg0, TArg1) method

```csharp
public System.Text.StringBuilder AppendFormat<TArg0,TArg1> (IFormatProvider? provider, System.Text.CompositeFormat format, TArg0 arg0, TArg1 arg1);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of any of the arguments using a specified format provider.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `arg0`: The first object to format.
- `arg1`: The second object to format.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## StringBuilder.AppendFormat<TArg0,TArg1,TArg2>(IFormatProvider, CompositeFormat, TArg0, TArg1, TArg2) method

```csharp
public System.Text.StringBuilder AppendFormat<TArg0,TArg1,TArg2> (IFormatProvider? provider, System.Text.CompositeFormat format, TArg0 arg0, TArg1 arg1, TArg2 arg2);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of any of the arguments using a specified format provider.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `TArg2`: The type of the third object to format.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `arg0`: The first object to format.
- `arg1`: The second object to format.
- `arg2`: The third object to format.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## StringBuilder.AppendJoin(Char, Object[]) method

```csharp
public System.Text.StringBuilder AppendJoin (char separator, params object?[] values);
```

Concatenates the string representations of the elements in the provided array of objects, using the specified char separator between each member, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: An array that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(Char, Object>) method

```csharp
public System.Text.StringBuilder AppendJoin (char separator, scoped ReadOnlySpan<object?> values);
```

Concatenates the string representations of the elements in the provided span of objects, using the specified char separator between each member, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: A span that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(Char, String>) method

```csharp
public System.Text.StringBuilder AppendJoin (char separator, scoped ReadOnlySpan<string?> values);
```

Concatenates the strings of the provided span, using the specified char separator between each string, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: A span that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(Char, String[]) method

```csharp
public System.Text.StringBuilder AppendJoin (char separator, params string?[] values);
```

Concatenates the strings of the provided array, using the specified char separator between each string, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The character to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: An array that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(String, Object[]) method

```csharp
public System.Text.StringBuilder AppendJoin (string? separator, params object?[] values);
```

Concatenates the string representations of the elements in the provided array of objects, using the specified separator between each member, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: An array that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(String, Object>) method

```csharp
public System.Text.StringBuilder AppendJoin (string? separator, scoped ReadOnlySpan<object?> values);
```

Concatenates the string representations of the elements in the provided span of objects, using the specified separator between each member, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: A span that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(String, String>) method

```csharp
public System.Text.StringBuilder AppendJoin (string? separator, scoped ReadOnlySpan<string?> values);
```

Concatenates the strings of the provided span, using the specified separator between each string, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: A span that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin(String, String[]) method

```csharp
public System.Text.StringBuilder AppendJoin (string? separator, params string?[] values);
```

Concatenates the strings of the provided array, using the specified separator between each string, then appends the result to the current instance of the string builder.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the joined strings only if `values` has more than one element.
- `values`: An array that contains the strings to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin<T>(Char, IEnumerable<T>) method

```csharp
public System.Text.StringBuilder AppendJoin<T> (char separator, System.Collections.Generic.IEnumerable<T> values);
```

Concatenates and appends the members of a collection, using the specified char separator between each member.

Parameters:

- `T`: The type of the members of `values`.
- `separator`: The character to use as a separator. `separator` is included in the concatenated and appended strings only if `values` has more than one element.
- `values`: A collection that contains the objects to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendJoin<T>(String, IEnumerable<T>) method

```csharp
public System.Text.StringBuilder AppendJoin<T> (string? separator, System.Collections.Generic.IEnumerable<T> values);
```

Concatenates and appends the members of a collection, using the specified separator between each member.

Parameters:

- `T`: The type of the members of `values`.
- `separator`: The string to use as a separator. `separator` is included in the concatenated and appended strings only if `values` has more than one element.
- `values`: A collection that contains the objects to concatenate and append to the current instance of the string builder.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendLine() method

```csharp
public System.Text.StringBuilder AppendLine ();
```

Appends the default line terminator to the end of the current `StringBuilder` object.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The default line terminator is the current value of the `NewLine` property.

The capacity of this instance is adjusted as needed.

#### Examples
The following example demonstrates the `StringBuilder.AppendLine` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendLine/al.cs._

## StringBuilder.AppendLine(String) method

```csharp
public System.Text.StringBuilder AppendLine (string? value);
```

Appends a copy of the specified string followed by the default line terminator to the end of the current `StringBuilder` object.

Parameters:

- `value`: The string to append.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentOutOfRangeException`: Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
The default line terminator is the current value of the `NewLine` property.

The capacity of this instance is adjusted as needed.

## StringBuilder.AppendLine(StringBuilder+AppendInterpolatedStringHandler) method

```csharp
public System.Text.StringBuilder AppendLine (ref System.Text.StringBuilder.AppendInterpolatedStringHandler handler);
```

Appends the specified interpolated string followed by the default line terminator to the end of the current StringBuilder object.

Parameters:

- `handler`: The interpolated string to append.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.AppendLine(IFormatProvider, StringBuilder+AppendInterpolatedStringHandler) method

```csharp
public System.Text.StringBuilder AppendLine (IFormatProvider? provider, ref System.Text.StringBuilder.AppendInterpolatedStringHandler handler);
```

Appends the specified interpolated string using the specified format, followed by the default line terminator, to the end of the current StringBuilder object.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `handler`: The interpolated string to append.

Returns: A reference to this instance after the append operation has completed.

To be added.

## StringBuilder.Clear() method

```csharp
public System.Text.StringBuilder Clear ();
```

Removes all characters from the current `StringBuilder` instance.

Returns: An object whose `StringBuilder.Length` is 0 (zero).

#### Remarks

`StringBuilder.Clear` is a convenience method that is equivalent to setting the `Length` property of the current instance to 0 (zero).

#### Examples

The following example instantiates a `StringBuilder` object with a string, calls the `StringBuilder.Clear` method, and then appends a new string.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Clear/clear1.cs._

## StringBuilder.CopyTo(Int32, Char>, Int32) method

```csharp
public void CopyTo (int sourceIndex, Span<char> destination, int count);
```

Copies the characters from a specified segment of this instance to a destination `Char` span.

Parameters:

- `sourceIndex`: The starting position in this instance where characters will be copied from. The index is zero-based.
- `destination`: The writable span where characters will be copied.
- `count`: The number of characters to be copied.

#### Remarks
The `StringBuilder.CopyTo` method is intended to be used in the rare situation when you need to efficiently copy successive sections of a `StringBuilder` object to an span.

For example, your code could populate a `StringBuilder` object with a large number of characters then use the `StringBuilder.CopyTo` method to copy small, successive pieces of the `StringBuilder` object to an span where the pieces are processed. When all the data in the `StringBuilder` object is processed, the size of the `StringBuilder` object is set to zero and the cycle is repeated.
