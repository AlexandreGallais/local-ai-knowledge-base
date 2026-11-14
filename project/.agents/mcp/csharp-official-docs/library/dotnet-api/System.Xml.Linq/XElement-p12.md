---
title: "XElement class (part 12 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 12 of 12)

## XElement.SetValue(Object) method

```csharp
public void SetValue (object value);
```

Sets the value of this element.

Parameters:

- `value`: The value to assign to this element. The value is converted to its string representation and assigned to the `XElement.Value` property.

Exceptions:

- `ArgumentNullException`: The `value` is `null`.
- `ArgumentException`: The `value` is an `XObject`.

#### Remarks
This method will raise the `Changed` and the `Changing` events.

It is invalid to pass an instance of a class that derives from `XObject`, such as `XElement`.

#### Examples
The following example creates an element that contains a child element. It then sets the value of the element using this method.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", "child content")
);
root.SetValue("new content");
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
        <Root>
            <Child>child content</Child>
        </Root>

root.SetValue("new content")
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>new content</Root>
```

## XElement.System.Xml.Serialization.IXmlSerializable.GetSchema() method

```csharp
System.Xml.Schema.XmlSchema IXmlSerializable.GetSchema ();
```

Gets an XML schema definition that describes the XML representation of this object.

Returns: An `XmlSchema` that describes the XML representation of the object that is produced by the `IXmlSerializable.WriteXml` method and consumed by the `IXmlSerializable.ReadXml` method.

#### Remarks
This method is part of implementation of the `IXmlSerializable` interface.

This method is used internally for serializing object graphs that contain LINQ to XML objects. For an example of serializing an object graph that contains LINQ to XML objects, see Serialize object graphs that contain XElement objects.

## XElement.System.Xml.Serialization.IXmlSerializable.ReadXml(XmlReader) method

```csharp
void IXmlSerializable.ReadXml (System.Xml.XmlReader reader);
```

Generates an object from its XML representation.

Parameters:

- `reader`: The `XmlReader` from which the object is deserialized.

#### Remarks
This method is part of implementation of the `IXmlSerializable` interface.

This method is used internally for serializing object graphs that contain LINQ to XML objects. For an example of serializing an object graph that contains LINQ to XML objects, see Serialize object graphs that contain XElement objects.

## XElement.System.Xml.Serialization.IXmlSerializable.WriteXml(XmlWriter) method

```csharp
void IXmlSerializable.WriteXml (System.Xml.XmlWriter writer);
```

Converts an object into its XML representation.

Parameters:

- `writer`: The `XmlWriter` to which this object is serialized.

#### Remarks
This method is used internally for marshaling object graphs that contain LINQ to XML objects. For an example of serializing an object graph that contains LINQ to XML objects, see Serialize object graphs that contain XElement objects.

## XElement.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Write this element to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Examples
The following example shows how to write an `XElement` to an `XmlWriter`. Note that the example did not write an XML declaration.

```csharp
StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
xws.Indent = true;

using (XmlWriter xw = XmlWriter.Create(sb, xws)) {
    xw.WriteStartElement("Root");

    XElement child1 = new XElement("Child",
        new XElement("GrandChild", "some content")
    );
    child1.WriteTo(xw);

    XElement child2 = new XElement("AnotherChild",
        new XElement("GrandChild", "different content")
    );
    child2.WriteTo(xw);

    xw.WriteEndElement();
}

Console.WriteLine(sb.ToString());
```

```vb
Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True
xws.Indent = True

Using xw = XmlWriter.Create(sb, xws)
    xw.WriteStartElement("Root")
    Dim child1 As XElement = _
        <Child>
            <GrandChild>some content</GrandChild>
        </Child>
    child1.WriteTo(xw)
    Dim child2 As XElement = _
        <AnotherChild>
            <GrandChild>different content</GrandChild>
        </AnotherChild>
    child2.WriteTo(xw)
    xw.WriteEndElement()
End Using

Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<Root>
  <Child>
    <GrandChild>some content</GrandChild>
  </Child>
  <AnotherChild>
    <GrandChild>different content</GrandChild>
  </AnotherChild>
</Root>
```

## XElement.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes this `XElement` to the specified writer.

Parameters:

- `writer`: The writer to write this `XElement` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XElement.WriteTo`.
