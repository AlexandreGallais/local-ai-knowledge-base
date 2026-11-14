---
title: "XElement class (part 8 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 8 of 12)

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator DateTime? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `DateTime`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `DateTime`.

Returns: A `Nullable<T>` of `DateTime` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `DateTime` value.

#### Remarks
The value space of an attribute or element that contains date and time content is closely related to the dates and times described in ISO 8601. When creating an attribute or element that contains date and time content, the attribute or element values are formatted per the W3C specification. See the W3C specification for more details.

The behavior is lax when casting to a `Nullable<T>` of `DateTime` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `Nullable<T>` of `DateTime`.

This conversion operator uses `CultureInfo.InvariantCulture` to convert from a `DateTime`.

#### Examples
The following example creates an element with a date and time as content. It then retrieves the value by casting to `Nullable<T>` of `DateTime`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", new DateTime(2006, 10, 6, 12, 30, 0))
);
DateTime? value = (DateTime?)root.Element("Value");
Console.WriteLine("Nullable DateTime: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
    <Root>
        <Value><%= New DateTime(2006, 10, 6, 12, 30, 0) %></Value>
    </Root>
Dim value As Nullable(Of DateTime) = CType(root.Element("Value"), Nullable(Of DateTime))
Console.WriteLine("Nullable DateTime: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable DateTime: value=10/6/2006 12:30:00 PM
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator DateTimeOffset? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `DateTimeOffset`.

Parameters:

- `element`: The `XElement` to cast to an `Nullable<T>` of `DateTimeOffset`.

Returns: A `Nullable<T>` of `DateTimeOffset` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `DateTimeOffset` value.

#### Remarks
This conversion operator uses the `XmlConvert` class to do the conversion.

#### Examples
The following example creates an element with date and time content. It then casts to `Nullable<T>` of `DateTimeOffset` to retrieve the value.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", new DateTimeOffset(new DateTime(2006, 10, 6, 12, 30, 0)))
);
Console.WriteLine(root);

DateTimeOffset? dt = (DateTimeOffset?)root.Element("Child");
Console.WriteLine("dt={0}", dt);
```

```vb
Dim root As XElement = _
    <Root>
        <Child><%= New DateTimeOffset(New DateTime(2006, 10, 6, 12, 30, 0)) %></Child>
    </Root>
Console.WriteLine(root)

Dim dt As Nullable(Of DateTimeOffset) = CType(root.<Child>(0), Nullable(Of DateTimeOffset))
Console.WriteLine("dt={0}", dt)
```

This example produces the following output:

```txt
<Root>
  <Child>2006-10-06T12:30:00-07:00</Child>
</Root>
dt=10/6/2006 12:30:00 PM -07:00
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator decimal? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Decimal`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Decimal`.

Returns: A `Nullable<T>` of `Decimal` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Decimal` value.

#### Examples
The following example creates an element with decimal content. It then retrieves the value by casting to `Nullable<T>` of `Decimal`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", "79228162514264337593543950335")
);
decimal? value = (decimal?)root.Element("Value");
Console.WriteLine("Nullable decimal: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
    <Root>
        <Value>79228162514264337593543950335</Value>
    </Root>
Dim value As Nullable(Of Decimal) = CType(root.Element("Value"), Nullable(Of Decimal))
Console.WriteLine("Nullable decimal: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable decimal: value=79228162514264337593543950335
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator double? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Double`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Double`.

Returns: A `Nullable<T>` of `Double` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Double` value.

#### Examples
The following example creates an element with double precision floating point content. It then retrieves the value by casting to `Nullable<T>` of `Double`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 1.79769313486231e308)
);
double? value = (double?)root.Element("Value");
Console.WriteLine("Nullable double: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>1.79769313486231e308</Value>
        </Root>

Dim value As Nullable(Of Double) = CType(root.Element("Value"), Nullable(Of Double))
Console.WriteLine("Nullable double: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable double: value=1.79769313486231E+308
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator Guid? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Guid`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Guid`.

Returns: A `Nullable<T>` of `Guid` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Guid` value.

#### Examples
The following example creates an element with guid content. It then retrieves the value by casting to `Nullable<T>` of `Guid`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", new Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730"))
);
Guid? value = (Guid?)root.Element("Value");
Console.WriteLine("Nullable Guid: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
    <Root>
        <Value><%= New Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730") %></Value>
    </Root>
Dim value As Nullable(Of Guid) = CType(root.Element("Value"), Nullable(Of Guid))
Console.WriteLine("Nullable Guid: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable Guid: value=3c1cc55b-baff-4b7a-9d17-077af3aa5730
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator int? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Int32`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Int32`.

Returns: A `Nullable<T>` of `Int32` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Int32` value.

#### Examples
The following example creates an element with unsigned integer content. It then retrieves the value by casting to `Nullable<T>` of `Int32`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 2147483647)
);
int? value = (int?)root.Element("Value");
Console.WriteLine("Nullable integer: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>2147483647</Value>
        </Root>
Dim value As Nullable(Of Integer) = CType(root.Element("Value"), Nullable(Of Integer))
Console.WriteLine("Nullable integer: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable integer: value=2147483647
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator long? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Int64`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Int64`.

Returns: A `Nullable<T>` of `Int64` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Int64` value.

#### Examples
The following example creates an element with long integer content. It then retrieves the value by casting to `Nullable<T>` of `Int64`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 9223372036854775807)
);
ulong? value = (ulong?)root.Element("Value");
Console.WriteLine("Nullable ulong: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>9223372036854775807</Value>
        </Root>
Dim value As Nullable(Of ULong) = CType(root.Element("Value"), Nullable(Of ULong))
Console.WriteLine("Nullable ulong: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable ulong: value=9223372036854775807
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator float? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Single`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Single`.

Returns: A `Nullable<T>` of `Single` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Single` value.

#### Examples
The following example creates an element with single precision floating point content. It then retrieves the value by casting to `Nullable<T>` of `Single`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 3.402823e38)
);
float? value = (float?)root.Element("Value");
Console.WriteLine("Nullable Single: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>3.402823e38</Value>
        </Root>
Dim value As Nullable(Of Single) = CType(root.Element("Value"), Nullable(Of Single))
Console.WriteLine("Nullable Single: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable Single: value=3.402823E+38
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator TimeSpan? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `TimeSpan`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `TimeSpan`.

Returns: A `Nullable<T>` of `TimeSpan` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `TimeSpan` value.

#### Remarks
The value space of an attribute or element that contains time span content is closely related to duration content as described in ISO 8601. When creating an attribute or element that contains time span content, the attribute or element values are formatted per the W3C specification. Please see the W3C specification for more details.

Behavior is lax when casting to a `Nullable<T>` of `TimeSpan` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `Nullable<T>` of `TimeSpan`.

#### Examples
The following example creates an element with time span content. It then retrieves the value by casting to `Nullable<T>` of `TimeSpan`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", new TimeSpan(1, 5, 30))
);
TimeSpan? value = (TimeSpan?)root.Element("Value");
Console.WriteLine("Nullable TimeSpan: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
    <Root>
        <Value><%= New TimeSpan(1, 5, 30) %></Value>
    </Root>
Dim value As Nullable(Of TimeSpan) = CType(root.Element("Value"), Nullable(Of TimeSpan))
Console.WriteLine("Nullable TimeSpan: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable TimeSpan: value=01:05:30
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator uint? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `UInt32`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `UInt32`.

Returns: A `Nullable<T>` of `UInt32` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `UInt32` value.

#### Examples
The following example creates an element with unsigned integer content. It then retrieves the value by casting to `Nullable<T>` of `UInt32`.

```csharp
XElement root = new XElement("Root",
    new XElement("Value", 4294967295)
);
uint? value = (uint?)root.Element("Value");
Console.WriteLine("Nullable uint: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = _
        <Root>
            <Value>4294967295</Value>
        </Root>
Dim value As Nullable(Of UInteger) = CType(root.Element("Value"), Nullable(Of UInteger))
Console.WriteLine("Nullable uint: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable uint: value=4294967295
```
