---
title: "XAttribute class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XAttribute class (part 2 of 4)

## XAttribute.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the value of this attribute.

Returns: A `String` containing the value of this attribute.

Exceptions:

- `ArgumentNullException`: When setting, the `value` is `null`.

#### Remarks
You can use this property to get or set the value of an attribute.

Setting this property raises the `Changed` and the `Changing` events.

If you're getting the value and the attribute might not exist, it is more convenient to use the explicit conversion operators, and assign the attribute to a nullable type such as `string` or `Nullable<T>` of `Int32`. If the attribute does not exist, then the nullable type is set to `null`. Before using this property, you must make sure that the `XElement.Attribute` method does not return `null`.

#### Examples
The following example creates an element with an attribute. It then retrieves the value of the attribute, and then sets it.

Note that the Visual Basic <example-value> uses the XML attribute property.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", "content")
);
XAttribute att = root.FirstAttribute;
Console.WriteLine(att.Value);
att.Value = "new text";
Console.WriteLine(att.Value);
```

```vb
Dim root As XElement = 
Console.WriteLine(root.@Att)
root.@Att = "new text"
Console.WriteLine(root.@Att)
```

This example produces the following output:

```txt
content
new text
```

The following example shows the benefit of using the explicit conversion operators to get the value of an attribute that might not exist:

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", "attribute 1 content"),
    new XAttribute("Att2", "2")
);

// The following assignments demonstrate why it is easier to use
// casting when the attribute might or might not exist.

string c1 = (string)root.Attribute("Att1");
Console.WriteLine("c1:{0}", c1 == null ? "attribute does not exist" : c1);

int? c2 = (int?)root.Attribute("Att2");
Console.WriteLine("c2:{0}", c2 == null ? "attribute does not exist" : c2.ToString());

string c3 = (string)root.Attribute("Att3");
Console.WriteLine("c3:{0}", c3 == null ? "attribute does not exist" : c3);

int? c4 = (int?)root.Attribute("Att4");
Console.WriteLine("c4:{0}", c4 == null ? "attribute does not exist" : c4.ToString());

Console.WriteLine();

// The following assignments show the necessary code when using
// the value property when the attribute might or might not exist.

XAttribute att1 = root.Attribute("Att1");
string v1;
if (att1 == null)
    v1 = null;
else
    v1 = att1.Value;
Console.WriteLine("v1:{0}", v1 == null ? "attribute does not exist" : v1);

XAttribute att2 = root.Attribute("Att2");
int? v2;
if (att2 == null)
    v2 = null;
else
    v2 = Int32.Parse(att2.Value);
Console.WriteLine("v2:{0}", v2 == null ? "attribute does not exist" : v2.ToString());

XAttribute att3 = root.Attribute("Att3");
string v3;
if (att3 == null)
    v3 = null;
else
    v3 = att3.Value;
Console.WriteLine("v3:{0}", v3 == null ? "attribute does not exist" : v3);

XAttribute att4 = root.Attribute("Att4");
int? v4;
if (att4 == null)
    v4 = null;
else
    v4 = Int32.Parse(att4.Value);
Console.WriteLine("v4:{0}", v4 == null ? "attribute does not exist" : v4.ToString());
```

```vb
Dim root As XElement = 

' The following assignments demonstrate why it is easier to use
' casting when the attribute might or might not exist.

Dim c1 As String = CStr(root.Attribute("Att1"))
Console.WriteLine("c1:{0}", IIf(c1 Is Nothing, "attribute does not exist", c1))

Dim c2 As Nullable(Of Integer) = CType(root.Attribute("Att2"), Nullable(Of Integer))
Console.WriteLine("c2:{0}", IIf(c2.HasValue, c2, "attribute does not exist"))

Dim c3 As String = CStr(root.Attribute("Att3"))
Console.WriteLine("c3:{0}", IIf(c3 Is Nothing, "attribute does not exist", c3))

Dim c4 As Nullable(Of Integer) = CType(root.Attribute("Att4"), Nullable(Of Integer))
Console.WriteLine("c4:{0}", IIf(c4.HasValue, c4, "attribute does not exist"))

Console.WriteLine()

' The following assignments show the necessary code when using
' the value property when the attribute might or might not exist.

Dim att1 As XAttribute = root.Attribute("Att1")
Dim v1 As String
If att1 Is Nothing Then
    v1 = Nothing
Else
    v1 = att1.Value
End If

Console.WriteLine("v1:{0}", IIf(v1 Is Nothing, "attribute does not exist", v1))

Dim att2 As XAttribute = root.Attribute("Att2")
Dim v2 As Nullable(Of Integer)
If att2 Is Nothing Then
    v2 = Nothing
Else
    v2 = Int32.Parse(att2.Value)
End If

Console.WriteLine("v2:{0}", IIf(v2.HasValue, v2, "attribute does not exist"))

Dim att3 As XAttribute = root.Attribute("Att3")
Dim v3 As String
If att3 Is Nothing Then
    v3 = Nothing
Else
    v3 = att3.Value
End If

Console.WriteLine("v3:{0}", IIf(v3 Is Nothing, "attribute does not exist", v3))

Dim att4 As XAttribute = root.Attribute("Att4")
Dim v4 As Nullable(Of Integer)
If att4 Is Nothing Then
    v4 = Nothing
Else
    v4 = Int32.Parse(att4.Value)
End If

Console.WriteLine("v4:{0}", IIf(v4.HasValue, v4, "attribute does not exist"))
```

This example produces the following output:

```txt
c1:attribute 1 content
c2:2
c3:attribute does not exist
c4:attribute does not exist

v1:attribute 1 content
v2:2
v3:attribute does not exist
v4:attribute does not exist
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator bool (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `Boolean`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Boolean`.

Returns: A `Boolean` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Boolean` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Remarks
When converting to `Boolean` from an attribute or element, allowed values are "0", "1", and any string that produces "true" or "false" after trimming and conversion to lower case.

#### Examples
The following example creates an attribute with a `Boolean` value, then casts it to `Boolean`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("BoolValue", true)
);
bool bv = (bool)root.Attribute("BoolValue");
Console.WriteLine("(bool)BoolValue={0}", bv);
```

```vb
Dim root As XElement = 
Dim bv As Boolean = CBool(root.Attribute("BoolValue"))
Console.WriteLine("(bool)BoolValue={0}", bv)
```

This example produces the following output:

```txt
(bool)BoolValue=True
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator DateTime (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `DateTime`.

Parameters:

- `attribute`: The `XAttribute` to cast to `DateTime`.

Returns: A `DateTime` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `DateTime` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Remarks
The value space of an attribute or element that contains date and time content is closely related to the dates and times described in ISO 8601. When creating an attribute or element that contains date and time content, the attribute or element values are formatted per the W3C specification. See the W3C specification for more details.

Behavior is lax when casting to a `DateTime` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `DateTime`.

This conversion operator uses `CultureInfo.InvariantCulture` to convert from a `DateTime`.

#### Examples
The following example creates an attribute with date and time content. It then casts it to `DateTime` to retrieve the value.

```csharp
// Behavior is strict when formatting an XML element or attribute from a DateTime,
// but behavior is lax when casting to a DateTime from an element or attribute.

XElement root = new XElement("Root",
    new XAttribute("Att", new DateTime(2006, 10, 6, 12, 30, 0))
);
Console.WriteLine(root);

// casting from a strictly formatted XML attribute
DateTime dt = (DateTime)root.Attribute("Att");
Console.WriteLine("dt={0}", dt);
Console.WriteLine("-----");

// if root is formatted in some different way than the standard ISO 8601, if at all possible,
// the value is appropriately converted to DateTime

XAttribute dtAtt = new XAttribute("OrderDate", "October 6, 2006");
Console.WriteLine(dtAtt);
DateTime orderDate = (DateTime)dtAtt;
Console.WriteLine("OrderDate={0:d}", orderDate);
```

```vb
' Behavior is strict when formatting an XML element or attribute from a DateTime,
' but behavior is lax when casting to a DateTime from an element or attribute.
Dim root As XElement = <Root Att=<%= New DateTime(2006, 10, 6, 12, 30, 0) %>/>

Console.WriteLine(root)

' casting from a strictly formatted XML attribute
Dim dt As DateTime = CType(root.Attribute("Att"), DateTime)
Console.WriteLine("dt={0}", dt)
Console.WriteLine("-----")

' if root is formatted in some different way than the standard ISO 8601, if at all possible,
' the value is appropriately converted to DateTime
Dim dtAtt As XAttribute = New XAttribute("OrderDate", "October 6, 2006")
Console.WriteLine(dtAtt)
Dim orderDate As DateTime = CType(dtAtt, DateTime)
Console.WriteLine("OrderDate={0:d}", orderDate)
```

This example produces the following output:

```txt

dt=10/6/2006 12:30:00 PM
-----
OrderDate="October 6, 2006"
OrderDate=10/6/2006
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator DateTimeOffset (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `DateTimeOffset`.

Parameters:

- `attribute`: The `XAttribute` to cast to `DateTimeOffset`.

Returns: A `DateTimeOffset` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `DateTimeOffset` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Remarks
This conversion operator uses the `XmlConvert` class to do the conversion.

#### Examples
The following example creates an attribute with date and time content. It then casts it to `DateTimeOffset` to retrieve the value.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new DateTimeOffset(new DateTime(2006, 10, 6, 12, 30, 0)))
);
Console.WriteLine(root);

// casting from a strictly formatted XML attribute
DateTimeOffset dt = (DateTimeOffset)root.Attribute("Att");
Console.WriteLine("dt={0}", dt);
```

```vb
Dim root As XElement = _
    <Root
        Att=<%= New DateTimeOffset(New DateTime(2006, 10, 6, 12, 30, 0)) %>/>
Console.WriteLine(root)

' casting from a strictly formatted XML attribute
Dim dt As DateTimeOffset = CType(root.Attribute("Att"), DateTimeOffset)
Console.WriteLine("dt={0}", dt)
```

This example produces the following output:

```txt

dt=10/6/2006 12:30:00 PM -07:00
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator decimal (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `Decimal`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Decimal`.

Returns: A `Decimal` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Decimal` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with a decimal value. It then retrieves the value of the attribute by casting to `Decimal`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", "79228162514264337593543950335")
);
decimal value = (decimal)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As Decimal = CDec(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=79228162514264337593543950335
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator double (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `Double`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Double`.

Returns: A `Double` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Double` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with `Double` content. It then retrieves the value by casting to `Double`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", 1.79769313486231e308)
);
double value = (double)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = 
Dim value As Double = CDbl(root.Attribute("Att"))
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=1.79769313486231E+308
```

## XAttribute.op_Explicit(XAttribute) method

```csharp
public static explicit operator Guid (System.Xml.Linq.XAttribute attribute);
```

Cast the value of this `XAttribute` to a `Guid`.

Parameters:

- `attribute`: The `XAttribute` to cast to `Guid`.

Returns: A `Guid` that contains the content of this `XAttribute`.

Exceptions:

- `FormatException`: The attribute does not contain a valid `Guid` value.
- `ArgumentNullException`: The `attribute` parameter is `null`.

#### Examples
The following example creates an attribute with a GUID as content. It then retrieves the value by casting to `Guid`.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att", new Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730"))
);
Guid value = (Guid)root.Attribute("Att");
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root Att=<%= New Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730") %>/>
Dim value As Guid = CType(root.Attribute("Att"), Guid)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=3c1cc55b-baff-4b7a-9d17-077af3aa5730
```
