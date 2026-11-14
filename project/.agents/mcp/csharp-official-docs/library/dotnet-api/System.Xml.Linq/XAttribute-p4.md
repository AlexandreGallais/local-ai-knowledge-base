---
title: "XAttribute class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XAttribute class (part 4 of 4)

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator TimeSpan? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `TimeSpan`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `TimeSpan`.

Returns: A `Nullable<T>` of `TimeSpan` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `TimeSpan` value.

#### Remarks
The value space of an attribute or element that contains time span content is closely related to duration content as described in ISO 8601. When creating an attribute or element that contains time span content, the attribute or element values are formatted per the W3C specification. Please see the W3C specification for more details.

Behavior is lax when casting to a `Nullable<T>` of `TimeSpan` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `Nullable<T>` of `TimeSpan`.

#### Examples
The following example creates an attribute with time span content. It then retrieves the value by casting to `Nullable<T>` of `TimeSpan`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new TimeSpan(1, 5, 30))
);
TimeSpan? value = (TimeSpan?)root.Attribute("Att");
Console.WriteLine("Nullable TimeSpan: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = <Root Att=<%= New TimeSpan(1, 5, 30) %>/>
Dim value As Nullable(Of TimeSpan) = CType(root.Attribute("Att"), Nullable(Of TimeSpan))
Console.WriteLine("Nullable TimeSpan: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable TimeSpan: value=01:05:30
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator uint? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `UInt32`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `UInt32`.

Returns: A `Nullable<T>` of `UInt32` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `UInt32` value.

#### Examples
The following example creates an attribute with unsigned integer content. It then retrieves the value by casting to `Nullable<T>` of `UInt32`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 4294967295)
);
uint? value = (uint?)root.Attribute("Att");
Console.WriteLine("Nullable uint: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of UInteger) = CType(root.Attribute("Att"), Nullable(Of UInteger))
Console.WriteLine("Nullable uint: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable uint: value=4294967295
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator ulong? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `Nullable<T>` of `UInt64`.

Parameters:

- `attribute`: The `XAttribute` to cast to a `Nullable<T>` of `UInt64`.

Returns: A `Nullable<T>` of `UInt64` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `UInt64` value.

#### Examples
The following example creates an attribute with unsigned long integer content. It then retrieves the value by casting to `Nullable<T>` of `UInt64`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 9223372036854775807)
);
ulong? value = (ulong?)root.Attribute("Att");
Console.WriteLine("Nullable ulong: value={0}", value == null ? "null" : value.ToString());
```

```vb
Dim root As XElement = 
Dim value As Nullable(Of ULong) = CType(root.Attribute("Att"), Nullable(Of ULong))
Console.WriteLine("Nullable ulong: value={0}", IIf(value.HasValue, value.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable ulong: value=9223372036854775807
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator float (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `Single`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Single`.

Returns: A `Single` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Single` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with single precision floating point content. It then retrieves the value by casting to `Single`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 3.402823e38)
);
float value = (float)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As Single = CSng(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=3.402823E+38
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator string? (System.Xml.Linq.XAttribute? attribute);
```

Cast the value of this `XAttribute` to a `String`.

Parameters:

- `attribute`: The `XAttribute` to cast to `String`.

Returns: A `String` that contains the content of this `XAttribute`.

#### Examples
The following example creates an attribute with string content. It then retrieves the value by casting to `String`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", "attribute content")
);
XAttribute att = root.Attribute("Att");
string str = (string)att;
Console.WriteLine("(string)att={0}", str);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.Attribute("Att")
Dim str As String = CStr(att)
Console.WriteLine("(string)att={0}", str)
```

This example produces the following output:

```txt
(string)att=attribute content
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator TimeSpan (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `TimeSpan`.

Parameters:

- `attribute`: The `XAttribute` to cast to `TimeSpan`.

Returns: A `TimeSpan` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `TimeSpan` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Remarks
The value space of an attribute or element that contains time span content is closely related to duration content as described in ISO 8601. When creating an attribute or element that contains time span content, the attribute or element values are formatted per the W3C specification. Please see the W3C specification for more details.

Behavior is lax when casting to a `TimeSpan` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `TimeSpan`.

#### Examples
The following example creates an attribute with time span content. It then retrieves the value by casting to `TimeSpan`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new TimeSpan(1, 5, 30))
);
TimeSpan value = (TimeSpan)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root Att=<%= New TimeSpan(1, 5, 30) %>/>
Dim value As TimeSpan = CType(root.Attribute("Att"), TimeSpan)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=01:05:30
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator uint (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `UInt32`.

Parameters:

- `attribute`: The `XAttribute` to cast to `UInt32`.

Returns: A `UInt32` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `UInt32` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with unsigned integer content. It then retrieves the value by casting to `UInt32`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 4294967295)
);
uint value = (uint)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As UInteger = CUInt(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=4294967295
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator ulong (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `UInt64`.

Parameters:

- `attribute`: The `XAttribute` to cast to `UInt64`.

Returns: A `UInt64` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `UInt64` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with unsigned long integer content. It then retrieves the value by casting to `UInt64`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 1844674407370955161)
);
ulong value = (ulong)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As ULong = CULng(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=1844674407370955161
```

## XAttribute.Remove() method

```csharp
public void Remove ();
```

Removes this attribute from its parent element.

Exceptions:

- `InvalidOperationException`: The parent element is `null`.

#### Remarks
You can use this method to modify an XML tree. This method will cause events to occur.

There are many scenarios in which you might want to remove a set of attributes. In LINQ to XML programming, you should not manipulate or modify a set of nodes while you are querying for nodes in that set. In practical terms, this means that you should not iterate over a set of attributes and remove them. Instead, you should materialize them into a `List<T>` using the `Enumerable.ToList` extension method. Then you can iterate over the list, removing the attributes. For more information, see Mixed Declarative Code/Imperative Code Bugs (LINQ to XML).

Alternatively, if you want to remove a set of attributes, it is recommended that you use the `Extensions.Remove` method. This method copies the attributes to a list, then iterates over the list, removing the attributes.

#### Examples
The following example creates an element with three attributes. It then removes one of the attributes.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2"),
    new XAttribute("Att3", "content3")
);
XAttribute att = root.Attribute("Att2");
att.Remove();
Console.WriteLine(root);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.Attribute("Att2")
att.Remove()
Console.WriteLine(root)
```

This example produces the following output:

```xml

```

## XAttribute.SetValue(Object) method

```csharp
public void SetValue (object value);
```

Sets the value of this attribute.

Parameters:

- `value`: The value to assign to this attribute.

Exceptions:

- `ArgumentNullException`: The `value` parameter is `null`.
- `ArgumentException`: The `value` is an `XObject`.

#### Remarks
The value is converted to its string representation and assigned to the `Value` property.

It is invalid to pass an instance of a class that derives from `XObject`, such as `XElement` or `XAttribute`.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an element with several attributes. It then changes the contents of one of the attributes.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2"),
    new XAttribute("Att3", "content3")
);
XAttribute att = root.Attribute("Att2");
att.SetValue("new content");
Console.WriteLine(root);
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.Attribute("Att2")
att.SetValue("new content")
Console.WriteLine(root)
```

This example produces the following output:

```xml

```

## XAttribute.ToString() method

```csharp
public override string ToString ();
```

Converts the current `XAttribute` object to a string representation.

Returns: A `String` containing the XML text representation of an attribute and its value.

#### Remarks
This method returns a string in the form of `AttributeName="content"`.

> **Warning:**
> When this method is called and `XAttribute` contains control character, an exception is thrown with a message like: hexadecimal value 0x0B, is an invalid character.

#### Examples
The following example creates an element with several attributes. It then gets an attribute and displays it and its content by calling this method.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", "content1"),
    new XAttribute("Att2", "content2"),
    new XAttribute("Att3", "content3")
);
XAttribute att = root.Attribute("Att2");
Console.WriteLine(att.ToString());
```

```vb
Dim root As XElement = 
Dim att As XAttribute = root.Attribute("Att2")
Console.WriteLine(att.ToString())
```

This example produces the following output:

```txt
Att2="content2"
```
