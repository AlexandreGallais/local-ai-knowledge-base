---
title: "DBNull class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DBNull.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DBNull class

Namespace: `System`

```csharp
public sealed class DBNull : IConvertible, System.Runtime.Serialization.ISerializable
```

Represents a nonexistent value. This class cannot be inherited.

#### Remarks
The `DBNull` class represents a nonexistent value. In a database, for example, a column in a row of a table might not contain any data whatsoever. That is, the column is considered to not exist at all instead of merely not having a value. A `DBNull` object represents the nonexistent column. Additionally, COM interop uses the `DBNull` class to distinguish between a VT_NULL variant, which indicates a nonexistent value, and a VT_EMPTY variant, which indicates an unspecified value.

The `DBNull` type is a singleton class, which means only one `DBNull` object exists. The `Value` member represents the sole `DBNull` object. `Value` can be used to explicitly assign a nonexistent value to a database field, although most ADO.NET data providers automatically assign values of `DBNull` when a field does not have a valid value. You can determine whether a value retrieved from a database field is a `DBNull` value by passing the value of that field to the `DBNull.Value.Equals` method. However, some languages and database objects supply methods that make it easier to determine whether the value of a database field is `Value`. These include the Visual Basic `IsDBNull` function, the `Convert.IsDBNull` method, the `DataTableReader.IsDBNull` method, and the `IDataRecord.IsDBNull` method.

Do not confuse the notion of `null` in an object-oriented programming language with a `DBNull` object. In an object-oriented programming language, `null` means the absence of a reference to an object. `DBNull` represents an uninitialized variant or nonexistent database column.

#### Examples
The following example calls the `DBNull.Value.Equals` method to determine whether a database field in a contacts database has a valid value. If it does, the field value is appended to the string output in a label.

_Code sample not included: ~/snippets/csharp/System/DBNull/Overview/DBNullExamples.cs._

## DBNull.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Implements the `ISerializable` interface and returns the data needed to serialize the `DBNull` object.

Parameters:

- `info`: A `SerializationInfo` object containing information required to serialize the `DBNull` object.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `DBNull` object.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## DBNull.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Gets the `TypeCode` value for `DBNull`.

Returns: The `TypeCode` value for `DBNull`, which is `TypeCode.DBNull`.

To be added.

## DBNull.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToByte(IFormatProvider) method

```csharp
byte IConvertible.ToByte (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToChar(IFormatProvider) method

```csharp
char IConvertible.ToChar (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToDateTime(IFormatProvider) method

```csharp
DateTime IConvertible.ToDateTime (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToDecimal(IFormatProvider) method

```csharp
decimal IConvertible.ToDecimal (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToDouble(IFormatProvider) method

```csharp
double IConvertible.ToDouble (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToInt16(IFormatProvider) method

```csharp
short IConvertible.ToInt16 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToInt32(IFormatProvider) method

```csharp
int IConvertible.ToInt32 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToInt64(IFormatProvider) method

```csharp
long IConvertible.ToInt64 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToSByte(IFormatProvider) method

```csharp
sbyte IConvertible.ToSByte (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToSingle(IFormatProvider) method

```csharp
float IConvertible.ToSingle (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToType(Type, IFormatProvider) method

```csharp
object IConvertible.ToType (Type type, IFormatProvider provider);
```

Converts the current `DBNull` object to the specified type.

Parameters:

- `type`: The type to convert the current `DBNull` object to.
- `provider`: An object that implements the `IFormatProvider` interface and is used to augment the conversion. If `null` is specified, format information is obtained from the current culture.

Returns: The boxed equivalent of the current `DBNull` object, if that conversion is supported; otherwise, an exception is thrown and no value is returned.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.
- `ArgumentNullException`: `type` is `null`.

#### Remarks
Three conversions are supported: If the `type` parameter specifies `Object` or `DBNull`, the return value is the current `DBNull` object itself. If the `type` parameter specifies `String`, the return value is the string returned by the `DBNull.ToString` method.

## DBNull.System.IConvertible.ToUInt16(IFormatProvider) method

```csharp
ushort IConvertible.ToUInt16 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToUInt32(IFormatProvider) method

```csharp
uint IConvertible.ToUInt32 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.System.IConvertible.ToUInt64(IFormatProvider) method

```csharp
ulong IConvertible.ToUInt64 (IFormatProvider provider);
```

This conversion is not supported. Attempting to make this conversion throws an `InvalidCastException`.

Parameters:

- `provider`: An object that implements the `IFormatProvider` interface. (This parameter is not used; specify `null`.)

Returns: None. The return value for this member is not used.

Exceptions:

- `InvalidCastException`: This conversion is not supported for the `DBNull` type.

To be added.

## DBNull.ToString() method

```csharp
public override string ToString ();
```

Returns an empty string (`String.Empty`).

Returns: An empty string (`String.Empty`).

To be added.

## DBNull.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Returns an empty string using the specified `IFormatProvider`.

Parameters:

- `provider`: The `IFormatProvider` to be used to format the return value.

-or-

`null` to obtain the format information from the current locale setting of the operating system.

Returns: An empty string (`String.Empty`).

To be added.

## DBNull.Value field

```csharp
public static readonly DBNull Value;
```

Represents the sole instance of the `DBNull` class.

#### Remarks
`DBNull` is a singleton class, which means only this instance of this class can exist.

If a database field has missing data, you can use the `Value` property to explicitly assign a `DBNull` object value to the field. However, most data providers do this automatically.

To evaluate database fields to determine whether their values are `DBNull`, you can pass the field value to the `DBNull.Value.Equals` method. However, this method is rarely used because there are a number of other ways to evaluate a database field for missing data. These include the Visual Basic `IsDBNull` function, the `Convert.IsDBNull` method, the `DataTableReader.IsDBNull` method, the `IDataRecord.IsDBNull` method, and several other methods.

#### Examples
The following example calls the `DBNull.Value.Equals` method to determine whether a database field in a contacts database has a valid value. If it does, the field value is appended to the string output in a label.

_Code sample not included: ~/snippets/csharp/System/DBNull/Overview/DBNullExamples.cs._
