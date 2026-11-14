---
title: "How to: Transform a Node Fragment"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/how-to-transform-a-node-fragment.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Transform a Node Fragment

When you transform data contained in an `System.Xml.XmlDocument` or `System.Xml.XPath.XPathDocument` object the XSLT transformations apply to a document as a whole. In other words, if you pass in a node other than the document root node, this does not prevent the transformation process from accessing all nodes in the loaded document. To transform a node fragment, you must create a separate object containing just the node fragment, and pass that object to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

## Procedures

#### To transform a node fragment

1. Create an object containing the source document.

2. Locate the node fragment you wish to transform.

3. Create separate object with just the node fragment.

4. Pass the node fragment to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

## Example

 The following example transforms a node fragment and outputs the results to the console.

 ```csharp
﻿using System;
using System.IO;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

public class Sample
{

   public static void Main()
   {
// Load an XPathDocument.
XPathDocument doc = new XPathDocument("books.xml");

// Locate the node fragment.
XPathNavigator nav = doc.CreateNavigator();
XPathNavigator myBook = nav.SelectSingleNode("descendant::book[@ISBN = '0-201-63361-2']");

// Create a new object with just the node fragment.
XmlReader reader = myBook.ReadSubtree();
reader.MoveToContent();

// Load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("single.xsl");

// Transform the node fragment.
xslt.Transform(reader, XmlWriter.Create(Console.Out, xslt.OutputSettings));
  }
}
```

### Input

##### books.xml

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/books.xml._

##### single.xsl

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_NodeFrag/XML/single.xsl._

### Output

 Book title is The Confidence Man.

## See also

- Using the XslCompiledTransform Class
