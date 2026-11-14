---
title: "Serialize with an XML declaration - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/serialize-xml-declaration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Serialize with an XML declaration (LINQ to XML)

This article describes how to control whether an XML declaration is generated when you serialize XML in C# or Visual Basic.

Serializing to a `System.IO.File` or a `System.IO.TextWriter` using the `System.Xml.Linq.XElement.Save*` method or the `System.Xml.Linq.XDocument.Save*` method generates an XML declaration. When you serialize to an `System.Xml.XmlWriter`, the writer settings (specified in an `System.Xml.XmlWriterSettings` object) determine whether an XML declaration is generated.

If you're serializing to a string using the `ToString` method, the resulting XML won't include an XML declaration.

## Example: Serialize with an XML declaration

The following example creates an `System.Xml.Linq.XElement`, saves the document to a file, and then prints the file to the console:

```csharp
XElement root = new XElement("Root",
    new XElement("Child", "child content")
);
root.Save("Root.xml");
string str = File.ReadAllText("Root.xml");
Console.WriteLine(str);
```

```vb
Dim root As XElement = <Root>
                           <Child>child content</Child>
                       </Root>
root.Save("Root.xml")
Dim str As String = File.ReadAllText("Root.xml")
Console.WriteLine(str)
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Child>child content</Child>
</Root>
```

## Example: Serialize without an XML declaration

The following example shows how to save an `System.Xml.Linq.XElement` to an `System.Xml.XmlWriter`.

```csharp
StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;

using (XmlWriter xw = XmlWriter.Create(sb, xws)) {
    XElement root = new XElement("Root",
        new XElement("Child", "child content")
    );
    root.Save(xw);
}
Console.WriteLine(sb.ToString());
```

```vb
Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True

Using xw As XmlWriter = XmlWriter.Create(sb, xws)
    Dim root = <Root>
                   <Child>child content</Child>
               </Root>
    root.Save(xw)
End Using
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<Root><Child>child content</Child></Root>
```
