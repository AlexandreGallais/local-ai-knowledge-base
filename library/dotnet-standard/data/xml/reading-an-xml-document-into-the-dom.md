---
title: "Reading an XML Document into the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/reading-an-xml-document-into-the-dom.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Reading an XML Document into the DOM

XML information is read into memory from different formats. It can be read from a string, stream, URL, text reader, or a class derived from the `System.Xml.XmlReader`.

 The `System.Xml.XmlDocument.Load*` method brings the document into memory and has overloaded methods available to take data from each of the different formats. There is also a `System.Xml.XmlDocument.LoadXml*` method that reads XML from a string.

 Different `System.Xml.XmlDocument.Load*` methods affect which nodes are created when the XML Document Object Model (DOM) is loaded. The following table lists the differences between some of the `System.Xml.XmlDocument.Load*` methods and topics that address them.

|Subject|Topic|
|-------------|-----------|
|Creation of white space nodes|The object used to load the DOM has an affect on the white space and significant white space nodes generated in the DOM. For more information, see White Space and Significant White Space Handling when Loading the DOM.|
|Loading XML starting from a specific node or loading the entire XML document|Using the `System.Xml.XmlDocument.Load*` method data can be loaded from a specific node into the DOM. For more information, see Load Data from a Reader.|
|Validating the XML as it is loaded|The XML data loaded into the DOM can be validated as it is loaded. This is accomplished using a validating `System.Xml.XmlReader`. For more information about validating XML as it is loaded, see Validating an XML Document in the DOM.|

 The following example shows XML being loaded with the `System.Xml.XmlDocument.LoadXml*` method and the data subsequently saved to a text file called `data.xml`.

```vb
Imports System
Imports System.IO
Imports System.Xml

Public Class Sample

    Public Shared Sub Main()
        ' Create the XmlDocument.
        Dim doc As New XmlDocument()
        doc.LoadXml(("<book genre='novel' ISBN='1-861001-57-5'>" & _
                    "<title>Pride And Prejudice</title>" & _
                    "</book>"))
        ' Save the document to a file.
        doc.Save("data.xml")
    End Sub 'Main
End Class 'Sample
```

```csharp
using System;
using System.IO;
using System.Xml;

public class Sample
{
    public static void Main()
    {
        // Create the XmlDocument.
        XmlDocument doc = new XmlDocument();
        doc.LoadXml("<book genre='novel' ISBN='1-861001-57-5'>" +
                    "<title>Pride And Prejudice</title>" +
                    "</book>");

        // Save the document to a file.
        doc.Save("data.xml");
    }
}
```

## See also

- XML Document Object Model (DOM)
