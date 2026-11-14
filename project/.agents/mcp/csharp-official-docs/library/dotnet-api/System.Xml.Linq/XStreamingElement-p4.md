---
title: "XStreamingElement class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XStreamingElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XStreamingElement class (part 4 of 4)

## XStreamingElement.ToString(SaveOptions) method

```csharp
public string ToString (System.Xml.Linq.SaveOptions options);
```

Returns the XML for this streaming element, optionally disabling formatting.

Parameters:

- `options`: A `SaveOptions` that specifies formatting behavior.

Returns: A `String` containing the XML.

#### Remarks
Note that when debugging a program that uses `XStreamingElement`, displaying the value of an object causes its `XStreamingElement.ToString` method to be called. This causes the XML to be serialized. If the semantics of your streaming element query are such that the streaming element can only be streamed once, this may cause undesirable behavior in your debugging experience.

#### Examples
The following example shows two uses of `XStreamingElement.ToString`. The first use preserves white space. The second one serializes the `XStreamingElement` with formatting.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el == 3
                        select new XElement("DifferentChild", (int)el)
                    );

Console.WriteLine(dstTree.ToString(SaveOptions.DisableFormatting));
Console.WriteLine("------");
Console.WriteLine(dstTree.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value = 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

Console.WriteLine(dstTree.ToString(SaveOptions.DisableFormatting))
Console.WriteLine("------")
Console.WriteLine(dstTree.ToString())
```

This example produces the following output:

```txt
<NewRoot><DifferentChild>3</DifferentChild></NewRoot>
------
<NewRoot>
  <DifferentChild>3</DifferentChild>
</NewRoot>
```

## XStreamingElement.WriteTo(XmlWriter) method

```csharp
public void WriteTo (System.Xml.XmlWriter writer);
```

Writes this streaming element to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Examples
The following example creates an XML tree using `XStreamingElement`. It then writes the streaming element to an `XmlWriter`.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el == 3
                        select new XElement("DifferentChild", (int)el)
                    );

StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
xws.Indent = true;

using (XmlWriter xw = XmlWriter.Create(sb, xws))
{
    dstTree.WriteTo(xw);
}
Console.WriteLine(sb.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = _
    New XStreamingElement("NewRoot", _
        From el In srcTree.Elements() _
        Where el.Value = 3 _
        Select <DifferentChild><%= el.Value %></DifferentChild> )

Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True
xws.Indent = True

Using xw As XmlWriter = XmlWriter.Create(sb, xws)
    dstTree.WriteTo(xw)
End Using
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<NewRoot>
  <DifferentChild>3</DifferentChild>
</NewRoot>
```
