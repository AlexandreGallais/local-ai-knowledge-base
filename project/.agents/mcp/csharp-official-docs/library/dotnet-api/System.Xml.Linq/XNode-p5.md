---
title: "XNode class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNode class (part 5 of 5)

## XNode.ToString(SaveOptions) method

```csharp
public string ToString (System.Xml.Linq.SaveOptions options);
```

Returns the XML for this node, optionally disabling formatting.

Parameters:

- `options`: A `SaveOptions` that specifies formatting behavior.

Returns: A `String` containing the XML.

#### Examples
The following example uses this method to retrieve unformatted and formatted XML.

```csharp
XElement root = XElement.Parse("<Root></Root>");
Console.WriteLine(root.ToString(SaveOptions.DisableFormatting));
Console.WriteLine("---");
Console.WriteLine(root.ToString(SaveOptions.None));
```

```vb
Dim root As XElement = <Root>
                           
                       </Root>
Console.WriteLine(root.ToString(SaveOptions.DisableFormatting))
Console.WriteLine("---")
Console.WriteLine(root.ToString(SaveOptions.None))
```

This example produces the following output:

```
<Root></Root>
---
<Root>
  
</Root>
```

## XNode.WriteTo(XmlWriter) method

```csharp
public abstract void WriteTo (System.Xml.XmlWriter writer);
```

Writes this node to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Remarks
You can use this method to write code that does a streaming transform of a very large document. For more information, see How to perform streaming transform of large XML documents.

#### Examples
The following example creates an `XmlWriter` that writes to a `StringBuilder`. It then uses this method to write two XML trees to the writer.

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
    Dim child1 As XElement = <Child>
                                 <GrandChild>some content</GrandChild>
                             </Child>
    child1.WriteTo(xw)
    Dim child2 As XElement = <AnotherChild>
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

## XNode.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes the current node to an `XmlWriter`.

Parameters:

- `writer`: The writer to write the current node into.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XNode.WriteTo`.
