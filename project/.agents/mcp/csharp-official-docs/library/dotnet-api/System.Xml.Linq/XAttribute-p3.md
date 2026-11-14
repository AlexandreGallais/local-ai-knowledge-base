---
title: "XAttribute class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XAttribute class (part 3 of 4)

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator int (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to an `Int32`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Int32`.

Returns: A `Int32` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Int32` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with an integer as content. It then retrieves the value by casting to `Int32`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 2147483647)
);
int value = (int)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As Integer = CInt(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=2147483647
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator long (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to an `Int64`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Int64`.

Returns: A `Int64` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Int64` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with a long integer as content. It then retrieves the value of the attribute by casting to `Int64`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 9223372036854775807)
);
long value = (long)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As Long = CLng(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=9223372036854775807
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator bool? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Boolean`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Nullable<T>` of `Boolean`.

Returns: A `Nullable<T>` of `Boolean` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Boolean` value.

#### Remarks
When converting to `Boolean` from an attribute or element, allowed values are "0", "1", and any string that produces "true" or "false" after trimming and conversion to lower case.

#### Examples
The following example creates an attribute with Boolean content. It then retrieves the value by casting to `Nullable<T>` of `Boolean`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("BoolValue1", true),
    new XAttribute("BoolValue2", false)
);
bool? bool1 = (bool?)root.Attribute("BoolValue1");
bool? bool2 = (bool?)root.Attribute("BoolValue2");
Console.WriteLine("Nullable boolean: BoolValue1={0}", bool1);
Console.WriteLine("Nullable boolean: BoolValue2={0}", bool2);
```

```vb
Dim root As XElement = 
Dim bool1 As Nullable(Of Boolean) = CType(root.Attribute("BoolValue1"), Nullable(Of Boolean))
Dim bool2 As Nullable(Of Boolean) = CType(root.Attribute("BoolValue2"), Nullable(Of Boolean))
Console.WriteLine("Nullable boolean: BoolValue1={0}", bool1)
Console.WriteLine("Nullable boolean: BoolValue2={0}", bool2)
```

This example produces the following output:

```txt
Nullable boolean: BoolValue1=True
Nullable boolean: BoolValue2=False
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator DateTime? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `DateTime`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `DateTime`.

Returns: A `Nullable<T>` of `DateTime` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `DateTime` value.

#### Remarks
The value space of an attribute or element that contains date and time content is closely related to the dates and times described in ISO 8601. When creating an attribute or element that contains date and time content, the attribute or element values are formatted per the W3C specification. See the W3C specification for more details.

Behavior is lax when casting to a `Nullable<T>` of `DateTime` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `Nullable<T>` of `DateTime`.

This conversion operator uses `CultureInfo.InvariantCulture` to convert from a `DateTime`.

#### Examples
The following example creates an attribute with a date and time as content. It then retrieves the value by casting to `Nullable<T>` of `DateTime`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new DateTime(2006, 10, 6, 12, 30, 0))
);
DateTime? value = (DateTime?)root.Attribute("Att");
Console.WriteLine("Nullable DateTime: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = <Root Att=<%= New DateTime(2006, 10, 6, 12, 30, 0) %>/>
Dim value As Nullable(Of DateTime) = CType(root.Attribute("Att"), Nullable(Of DateTime))
Console.WriteLine("Nullable DateTime: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable DateTime: value=10/6/2006 12:30:00 PM
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator DateTimeOffset? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `DateTimeOffset`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `DateTimeOffset`.

Returns: A `Nullable<T>` of `DateTimeOffset` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `DateTimeOffset` value.

#### Remarks
This conversion operator uses the `XmlConvert` class to do the conversion.

#### Examples
The following example creates an attribute with a date and time as content. It then retrieves the value by casting to `Nullable<T>` of `DateTimeOffset`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new DateTimeOffset(new DateTime(2006, 10, 6, 12, 30, 0)))
);
DateTimeOffset? value = (DateTimeOffset?)root.Attribute("Att");
Console.WriteLine("Nullable DateTimeOffset: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
    <Root
        Att=<%= New DateTimeOffset(New DateTime(2006, 10, 6, 12, 30, 0)) %>/>
Dim value As Nullable(Of DateTimeOffset) = CType(root.Attribute("Att"), Nullable(Of DateTimeOffset))
Console.WriteLine("Nullable DateTimeOffset: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable DateTimeOffset: value=10/6/2006 12:30:00 PM -07:00
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator decimal? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Decimal`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Nullable<T>` of `Decimal`.

Returns: A `Nullable<T>` of `Decimal` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Decimal` value.

#### Examples
The following example creates an attribute with decimal content. It then retrieves the value by casting to `Nullable<T>` of `Decimal`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", "79228162514264337593543950335")
);
decimal? value = (decimal?)root.Attribute("Att");
Console.WriteLine("Nullable decimal: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of Decimal) = CType(root.Attribute("Att"), Nullable(Of Decimal))
Console.WriteLine("Nullable decimal: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable decimal: value=79228162514264337593543950335
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator double? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Double`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Nullable<T>` of `Double`.

Returns: A `Nullable<T>` of `Double` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Double` value.

#### Examples
The following example creates an attribute with double precision floating point content. It then retrieves the value by casting to `Nullable<T>` of `Double`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 1.79769313486231e308)
);
double? value = (double?)root.Attribute("Att");
Console.WriteLine("Nullable double: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of Double) = CType(root.Attribute("Att"), Nullable(Of Double))
Console.WriteLine("Nullable double: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable double: value=1.79769313486231E+308
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator Guid? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Guid`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `Guid`.

Returns: A `Nullable<T>` of `Guid` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Guid` value.

#### Examples
The following example creates an attribute with guid content. It then retrieves the value by casting to `Nullable<T>` of `Guid`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730"))
);
Guid? value = (Guid?)root.Attribute("Att");
Console.WriteLine("Nullable Guid: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = <Root Att=<%= New Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730") %>/>
Dim value As Nullable(Of Guid) = CType(root.Attribute("Att"), Nullable(Of Guid))
Console.WriteLine("Nullable Guid: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable Guid: value=3c1cc55b-baff-4b7a-9d17-077af3aa5730
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator int? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Int32`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `Int32`.

Returns: A `Nullable<T>` of `Int32` that contains the content of this `XAttribute`.

#### Examples
The following example creates an attribute with integer content. It then retrieves the value by casting to `Nullable<T>` of `Int32`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 2147483647)
);
int? value = (int?)root.Attribute("Att");
Console.WriteLine("Nullable int: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of Integer) = CType(root.Attribute("Att"), Nullable(Of Integer))
Console.WriteLine("Nullable int: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable int: value=2147483647
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator long? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Int64`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `Int64`.

Returns: A `Nullable<T>` of `Int64` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Int64` value.

#### Examples
The following example creates an attribute with long integer content. It then retrieves the value by casting to `Nullable<T>` of `Int64`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 9223372036854775807)
);
long? value = (long?)root.Attribute("Att");
Console.WriteLine("Nullable long: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of Long) = CType(root.Attribute("Att"), Nullable(Of Long))
Console.WriteLine("Nullable long: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable long: value=9223372036854775807
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator float? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `Single`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Nullable<T>` of `Single`.

Returns: A `Nullable<T>` of `Single` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Single` value.

#### Examples
The following example creates an attribute with single precision floating point content. It then retrieves the value by casting to `Nullable<T>` of `Single`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 3.402823e38)
);
float? value = (float?)root.Attribute("Att");
Console.WriteLine("Nullable Single: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of Single) = CType(root.Attribute("Att"), Nullable(Of Single))
Console.WriteLine("Nullable Single: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable Single: value=3.402823E+38
```
