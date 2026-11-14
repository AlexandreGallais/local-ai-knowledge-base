---
title: "Boolean struct (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Boolean.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Boolean struct (part 2 of 3)

## Boolean.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the type code for the `Boolean` value type.

Returns: The enumerated constant `TypeCode.Boolean`.

To be added.

## Boolean.Parse(Char>) method

```csharp
public static bool Parse (ReadOnlySpan<char> value);
```

Converts the specified span representation of a logical value to its `Boolean` equivalent.

Parameters:

- `value`: A span containing the characters representing the value to convert.

Returns: `true` if `value` is equivalent to `Boolean.TrueString`; `false` if `value` is equivalent to `Boolean.FalseString`.

To be added.

## Boolean.Parse(String) method

```csharp
public static bool Parse (string value);
```

Converts the specified string representation of a logical value to its `Boolean` equivalent.

Parameters:

- `value`: A string containing the value to convert.

Returns: `true` if `value` is equivalent to `Boolean.TrueString`; `false` if `value` is equivalent to `Boolean.FalseString`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: `value` is not equivalent to `Boolean.TrueString` or `Boolean.FalseString`.

#### Remarks

The `value` parameter, optionally preceded or trailed by white space, must contain either `TrueString` or `FalseString`; otherwise, an exception is thrown. The comparison is case-insensitive.

#### Examples

The following code example illustrates the use of `Boolean.Parse` method.

_Code sample not included: ~/snippets/csharp/System/Boolean/Parse/booleanmembers.cs._

## Boolean.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` or `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface.

## Boolean.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if the value of this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ToByte` method.

## Boolean.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: You attempt to convert a `Boolean` value to a `Char` value. This conversion is not supported.

To be added.

## Boolean.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

This conversion is not supported. Attempting to use this method throws an `InvalidCastException`.

Parameters:

- `provider`: This parameter is ignored.

Returns: This conversion is not supported. No value is returned.

Exceptions:

- `InvalidCastException`: You attempt to convert a `Boolean` value to a `DateTime` value. This conversion is not supported.

To be added.

## Boolean.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDecimal`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ToDecimal` method.

## Boolean.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToDouble`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ToDouble` method.

## Boolean.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ToInt16` method.

## Boolean.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ToInt32` method.

## Boolean.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToInt64` method.

## Boolean.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSByte`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSByte` method.

## Boolean.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToSingle`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToSingle` method.

## Boolean.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToType`.

Parameters:

- `type`: The desired type.
- `provider`: An `IFormatProvider` implementation that supplies culture-specific information about the format of the returned value.

Returns: An object of the specified type, with a value that is equivalent to the value of this `Boolean` object.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `InvalidCastException`: The requested type conversion is not supported.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `Convert.ChangeType` method.

## Boolean.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt16`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt16` method.

## Boolean.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt32`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt32` method.

## Boolean.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToUInt64`.

Parameters:

- `provider`: This parameter is ignored.

Returns: 1 if this instance is `true`; otherwise, 0.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Boolean` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToUInt64` method.

## Boolean.System.IParsable<System.Boolean>.Parse(String, IFormatProvider) method

```csharp
static bool IParsable<bool>.Parse (string s, IFormatProvider provider);
```

Parses a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Boolean.System.IParsable<System.Boolean>.TryParse(String, IFormatProvider, Boolean) method

```csharp
static bool IParsable<bool>.TryParse (string s, IFormatProvider provider, out bool result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Boolean.System.ISpanParsable<System.Boolean>.Parse(Char>, IFormatProvider) method

```csharp
static bool ISpanParsable<bool>.Parse (ReadOnlySpan<char> s, IFormatProvider provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## Boolean.System.ISpanParsable<System.Boolean>.TryParse(Char>, IFormatProvider, Boolean) method

```csharp
static bool ISpanParsable<bool>.TryParse (ReadOnlySpan<char> s, IFormatProvider provider, out bool result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Boolean.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to its equivalent string representation (either "True" or "False").

Returns: "True" (the value of the `Boolean.TrueString` property) if the value of this instance is `true`, or "False" (the value of the `Boolean.FalseString` property) if the value of this instance is `false`.

#### Remarks

This method returns the constants "True" or "False".

Note that XML is case-sensitive, and that the XML specification recognizes "true" and "false" as the valid set of Boolean values. If the string returned by the `ToString` method is to be written to an XML file, its `String.ToLowerInvariant` method should be called first to convert it to lowercase.

#### Examples

The following example illustrates the `Boolean.ToString` method.

_Code sample not included: ~/snippets/csharp/System/Boolean/Parse/booleanmembers.cs._

## Boolean.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of this instance to its equivalent string representation (either "True" or "False").

Parameters:

- `provider`: (Reserved) An `IFormatProvider` object.

Returns: `Boolean.TrueString` if the value of this instance is `true`, or `Boolean.FalseString` if the value of this instance is `false`.

#### Remarks

The `provider` parameter is reserved. It does not participate in the execution of this method. This means that the `ToString` method, unlike most methods with a `provider` parameter, does not reflect culture-specific settings.

This method returns the constants "True" or "False". Note that XML is case-sensitive, and that the XML specification recognizes "true" and "false" as the valid set of Boolean values. If the `String` object returned by the `ToString` method is to be written to an XML file, its `String.ToLowerInvariant` method should be called first to convert it to lowercase.

## Boolean.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

Tries to format the value of the current boolean instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.
