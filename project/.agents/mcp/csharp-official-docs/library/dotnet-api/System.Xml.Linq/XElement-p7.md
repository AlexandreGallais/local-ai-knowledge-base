---
title: "XElement class (part 7 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 7 of 12)

## XElement.LoadAsync(XmlReader, LoadOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XElement> LoadAsync (System.Xml.XmlReader reader, System.Xml.Linq.LoadOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously creates a new `XElement` and initializes its underlying XML tree using the specified XML reader, optionally preserving white space.

Parameters:

- `reader`: A reader containing the XML to be read.
- `options`: A bitwise combination of the enumeration values that specify the load options to parse the XML.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A new `XElement` containing the contents of the specified reader.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XElement.Load`.

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator bool (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `Boolean`.

Parameters:

- `element`: The `XElement` to cast to `Boolean`.

Returns: A `Boolean` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Boolean` value.
- `ArgumentNullException`: The `element` parameter is `null`.

#### Remarks
When converting to `Boolean` from an attribute or element, allowed values are "0", "1", and any string that produces "true" or "false" after trimming and conversion to lower case.

#### Examples
The following example creates some elements with boolean values. It then casts them to `Boolean`.

```csharp
XElement root = new XElement("Root",
    new XElement("BoolValue1", true),
    new XElement("BoolValue2", false)
);
bool bool1 = (bool)root.Element("BoolValue1");
bool bool2 = (bool)root.Element("BoolValue2");
Console.WriteLine("(bool)BoolValue1={0}", bool1);
Console.WriteLine("(bool)BoolValue2={0}", bool2);
```

```vb
Dim root As XElement = _
        <Root>
            <BoolValue1>true</BoolValue1>
            <BoolValue2>false</BoolValue2>
        </Root>
Dim bool1 As Boolean = CBool(root.Element("BoolValue1"))
Dim bool2 As Boolean = CBool(root.Element("BoolValue2"))
Console.WriteLine("(bool)BoolValue1={0}", bool1)
Console.WriteLine("(bool)BoolValue2={0}", bool2)
```

This example produces the following output:

```txt
(bool)BoolValue1=True
(bool)BoolValue2=False
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator DateTime (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `DateTime`.

Parameters:

- `element`: The `XElement` to cast to `DateTime`.

Returns: A `DateTime` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `DateTime` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Remarks
The value space of an attribute or element that contains date and time content is closely related to the dates and times described in ISO 8601. When creating an attribute or element that contains date and time content, the attribute or element values are formatted per the W3C specification. See the W3C specification for more details.

Behavior is lax when casting to a `DateTime` from an attribute or element. Even if the attribute or element value is not formatted exactly per the W3C specification, the value is appropriately converted to a `DateTime`.

This conversion operator uses `CultureInfo.InvariantCulture` to convert from a `DateTime`.

#### Examples
The following example creates an element with date and time content. It then casts it to `DateTime` to retrieve the value.

```csharp
// Behavior is strict when formatting an XML element or attribute from a DateTime,
// but behavior is lax when casting to a DateTime from an element or attribute.
XElement root = new XElement("Root", new DateTime(2006, 10, 6, 12, 30, 0));
Console.WriteLine(root);

// Cast from a strictly formatted XML element.
DateTime dt = (DateTime)root;
Console.WriteLine("dt={0}", dt);
Console.WriteLine("-----");

// If root is formatted in some different way:
XElement dtElement = new XElement("OrderDate", "October 6, 2006");
Console.WriteLine(dtElement);
DateTime orderDate = (DateTime)dtElement;
Console.WriteLine("orderDate={0:d}", orderDate);
```

```vb
' Behavior is strict when formatting an XML element or attribute from a DateTime,
' but behavior is lax when casting to a DateTime from an element or attribute.
Dim root As XElement = <Root><%= New DateTime(2006, 10, 6, 12, 30, 0) %></Root>
Console.WriteLine(root)

' Cast from a strictly formatted XML element.
Dim dt As DateTime = CType(root, DateTime)
Console.WriteLine("dt={0}", dt)
Console.WriteLine("-----")

' If root is formatted in some different way:
Dim dtElement As XElement = <OrderDate>October 6, 2006</OrderDate>
Console.WriteLine(dtElement)
Dim orderDate As DateTime = CType(dtElement, DateTime)
Console.WriteLine("orderDate={0:d}", orderDate)
```

This example produces the following output:

```txt
<Root>2006-10-06T12:30:00</Root>
dt=10/6/2006 12:30:00 PM
-----
<OrderDate>October 6, 2006</OrderDate>
orderDate=10/6/2006
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator DateTimeOffset (System.Xml.Linq.XElement element);
```

Cast the value of this `XAttribute` to a `DateTimeOffset`.

Parameters:

- `element`: The `XElement` to cast to `DateTimeOffset`.

Returns: A `DateTimeOffset` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `DateTimeOffset` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Remarks
This conversion operator uses the `XmlConvert` class to do the conversion.

#### Examples
The following example creates an element with date and time content. It then casts to `DateTimeOffset` to retrieve the value.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", new DateTimeOffset(new DateTime(2006, 10, 6, 12, 30, 0)))
);
Console.WriteLine(root);

DateTimeOffset dt = (DateTimeOffset)root.Element("Child");
Console.WriteLine("dt={0}", dt);
```

```vb
Dim root As XElement = _
    <Root>
        <Child><%= New DateTimeOffset(New DateTime(2006, 10, 6, 12, 30, 0)) %></Child>
    </Root>
Console.WriteLine(root)

Dim dt As DateTimeOffset = CType(root.<Child>(0), DateTimeOffset)
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
public static explicit operator decimal (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `Decimal`.

Parameters:

- `element`: The `XElement` to cast to `Decimal`.

Returns: A `Decimal` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Decimal` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an element with a decimal value. It then retrieves the value of the attribute by casting to `Decimal`.

```csharp
XElement root = new XElement("Root", "79228162514264337593543950335");
decimal value = (decimal)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>79228162514264337593543950335</Root>
Dim value As Decimal = CDec(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=79228162514264337593543950335
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator double (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `Double`.

Parameters:

- `element`: The `XElement` to cast to `Double`.

Returns: A `Double` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Double` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an attribute with `double` content. It then retrieves the value by casting to `Double`.

```csharp
XElement root = new XElement("Root", 1.79769313486231e308);
double value = (double)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>1.79769313486231E+308</Root>
Dim value As Double = CDbl(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=1.79769313486231E+308
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator Guid (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to a `Guid`.

Parameters:

- `element`: The `XElement` to cast to `Guid`.

Returns: A `Guid` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Guid` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an element with a guid as content. It then retrieves the value by casting to `Guid`.

```csharp
XElement root = new XElement("Root", new Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730"));
Guid value = (Guid)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root><%= New Guid("3c1cc55b-baff-4b7a-9d17-077af3aa5730") %></Root>
Dim value As Guid = CType(root, Guid)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=3c1cc55b-baff-4b7a-9d17-077af3aa5730
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator int (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to an `Int32`.

Parameters:

- `element`: The `XElement` to cast to `Int32`.

Returns: A `Int32` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Int32` value.
- `ArgumentNullException`: The `element` parameter is `null`.

#### Examples
The following example creates an element with an integer as content. It then retrieves the value by casting to `Int32`.

```csharp
XElement root = new XElement("Root", 2147483647);
int value = (int)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>2147483647</Root>
Dim value As Integer = CInt(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=2147483647
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator long (System.Xml.Linq.XElement element);
```

Cast the value of this `XElement` to an `Int64`.

Parameters:

- `element`: The `XElement` to cast to `Int64`.

Returns: A `Int64` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element does not contain a valid `Int64` value.
- `ArgumentNullException`: The `element` parameter is `null`.
- `InvalidOperationException`: `element` is `null`.

#### Examples
The following example creates an element with a long integer as content. It then retrieves the value of the element by casting to `Int64`.

```csharp
XElement root = new XElement("Root", 9223372036854775807);
long value = (long)root;
Console.WriteLine("value={0}", value);
```

```vb
Dim root As XElement = <Root>9223372036854775807</Root>
Dim value As Long = CLng(root)
Console.WriteLine("value={0}", value)
```

This example produces the following output:

```txt
value=9223372036854775807
```

## XElement.op_Explicit(XElement) method

```csharp
public static explicit operator bool? (System.Xml.Linq.XElement? element);
```

Cast the value of this `XElement` to a `Nullable<T>` of `Boolean`.

Parameters:

- `element`: The `XElement` to cast to `Nullable<T>` of `Boolean`.

Returns: A `Nullable<T>` of `Boolean` that contains the content of this `XElement`.

Exceptions:

- `FormatException`: The element is not `null` and does not contain a valid `Boolean` value.

#### Remarks
When converting to `Nullable<T>` of `Boolean` from an attribute or element, allowed values are "0", "1", and any string that produces "true" or "false" after trimming and conversion to lower case.

#### Examples
The following example creates an element with boolean content. It then retrieves the value by casting to `Nullable<T>` of `Boolean`.

```csharp
XElement root = new XElement("Root",
    new XElement("BoolValue1", true),
    new XElement("BoolValue2", false));
bool? bool1 = (bool?)root.Element("BoolValue1");
bool? bool2 = (bool?)root.Element("BoolValue2");
Console.WriteLine("Nullable Boolean: value1={0}", bool1);
Console.WriteLine("Nullable Boolean: value2={0}", bool2);
```

```vb
Dim root As XElement = _
        <Root>
            <BoolValue1>true</BoolValue1>
            <BoolValue2>false</BoolValue2>
        </Root>

Dim value1 As Nullable(Of Boolean) = CType(root.Element("BoolValue1"), Nullable(Of Boolean))
Dim value2 As Nullable(Of Boolean) = CType(root.Element("BoolValue2"), Nullable(Of Boolean))
Console.WriteLine("Nullable Boolean: value1={0}", IIf(value1.HasValue, value1.ToString(), "null"))
Console.WriteLine("Nullable Boolean: value2={0}", IIf(value2.HasValue, value2.ToString(), "null"))
```

This example produces the following output:

```txt
Nullable Boolean: value1=True
Nullable Boolean: value2=False
```
