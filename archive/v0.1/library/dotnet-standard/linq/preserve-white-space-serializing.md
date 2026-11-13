---
title: "Preserve white space while serializing - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/preserve-white-space-serializing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Preserve white space while serializing (LINQ to XML)

This article describes how to control white space when serializing an XML tree.

A common scenario is to read indented XML, create an in-memory XML tree without any white space text nodes (that is, not preserving white space), do some operations on the XML, and then save the XML with indentation. When you serialize the XML with formatting, only significant white space in the XML tree is preserved. This is the default behavior for LINQ to XML.

Another common scenario is to read and modify XML that has already been intentionally indented. You might not want to change this indentation in any way. To do this in LINQ to XML, you preserve white space when you load or parse the XML and disable formatting when you serialize the XML.

## White-space behavior of methods that serialize XML trees

The following methods in the `System.Xml.Linq.XElement` and `System.Xml.Linq.XDocument` classes serialize an XML tree. You can serialize an XML tree to a file, a `System.IO.TextReader`, or an `System.Xml.XmlReader`. The `ToString` method serializes to a string.

- `System.Xml.Linq.XElement.Save*`
- `System.Xml.Linq.XDocument.Save*`
- XElement.ToString()
- XDocument.ToString()

If the method doesn't take `System.Xml.Linq.SaveOptions` as an argument, then the method will format (indent) the serialized XML. In this case, all insignificant white space in the XML tree is discarded.

If the method does take `System.Xml.Linq.SaveOptions` as an argument, then you can specify that the method not format (indent) the serialized XML. In this case, all white space in the XML tree is preserved.

## Roundtripping XML with carriage return entities

The whitespace preservation discussed in this article is different from XML roundtripping. When XML contains carriage return entities (`&#xD;`), LINQ to XML's standard serialization might not preserve them in a way that allows perfect roundtripping.

Consider the following example XML that contains carriage return entities:

```xml
<x xml:space="preserve">a&#xD;
b
c&#xD;</x>
```

When you parse this XML with `XDocument.Parse()`, the root element's value becomes `"a\r\nb\nc\r"`. However, if you reserialize it using LINQ to XML methods, the carriage returns are not entitized:

```csharp
using System;
using System.Linq;
using System.Xml.Linq;

class Program
{
    static void Main()
    {
        Console.WriteLine("XML Roundtripping Examples");
        Console.WriteLine("==========================");
        
        Console.WriteLine("\n1. Roundtripping Problem:");
        RoundtrippingProblem.Example();
        
        Console.WriteLine("\n2. Roundtripping Solution:");
        RoundtrippingSolution.Example();
    }
}

public static class RoundtrippingProblem
{
    public static void Example()
    {
        string xmlWithCR = """
            <x xml:space="preserve">a&#xD;
            b
            c&#xD;</x>
            """;

        XDocument doc = XDocument.Parse(xmlWithCR);
        Console.WriteLine($"Original parsed value: {string.Join("", doc.Root!.Value.Select(c => c == '\r' ? "\\r" : c == '\n' ? "\\n" : c.ToString()))}");
        // Output: a\r\nb\nc\r

        string reserialized = doc.ToString(SaveOptions.DisableFormatting);
        Console.WriteLine($"Reserialized XML: {reserialized}");
        // Output: <x xml:space="preserve">a
        // b
        // c</x>

        XDocument reparsed = XDocument.Parse(reserialized);
        Console.WriteLine($"Reparsed value: {string.Join("", reparsed.Root!.Value.Select(c => c == '\r' ? "\\r" : c == '\n' ? "\\n" : c.ToString()))}");
        // Output: a\nb\nc\n
    }
}
```
The values are different: the original was `"a\r\nb\nc\r"` but after roundtripping it becomes `"a\nb\nc\n"`.

### Solution: Use XmlWriter with NewLineHandling.Entitize

To achieve true XML roundtripping that preserves carriage return entities, use `System.Xml.XmlWriter` with `System.Xml.XmlWriterSettings.NewLineHandling` set to `System.Xml.NewLineHandling.Entitize`:

```csharp
using System;
using System.IO;
using System.Xml;
using System.Xml.Linq;

public static class RoundtrippingSolution
{
    public static void Example()
    {
        string xmlWithCR = """
            <x xml:space="preserve">a&#xD;
            b
            c&#xD;</x>
            """;

        XDocument doc = XDocument.Parse(xmlWithCR);

        // Create XmlWriter settings with NewLineHandling.Entitize
        XmlWriterSettings settings = new XmlWriterSettings
        {
            NewLineHandling = NewLineHandling.Entitize,
            OmitXmlDeclaration = true
        };

        // Serialize using XmlWriter
        using StringWriter stringWriter = new StringWriter();
        using (XmlWriter writer = XmlWriter.Create(stringWriter, settings))
        {
            doc.WriteTo(writer);
        }

        string roundtrippedXml = stringWriter.ToString();
        Console.WriteLine($"Roundtripped XML: {roundtrippedXml}");
        // Output: <x xml:space="preserve">a&#xD;
        // b
        // c&#xD;</x>

        // Verify roundtripping preserves the original value
        XDocument roundtrippedDoc = XDocument.Parse(roundtrippedXml);
        bool valuesMatch = doc.Root!.Value == roundtrippedDoc.Root!.Value;
        Console.WriteLine($"Values match after roundtripping: {valuesMatch}");
        // Output: True
    }
}
```
When you need to preserve carriage return entities for XML roundtripping, use `System.Xml.XmlWriter` with the appropriate `System.Xml.XmlWriterSettings` instead of LINQ to XML's built-in serialization methods.

For more information about `System.Xml.XmlWriter` and its settings, see `System.Xml.XmlWriter`.
