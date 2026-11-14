---
title: "Inputs to the XslCompiledTransform Class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/inputs-to-the-xslcompiledtransform-class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Inputs to the XslCompiledTransform Class

The `System.Xml.Xsl.XslCompiledTransform.Transform*` method accepts three input types for the source document: an object that implements the `System.Xml.XPath.IXPathNavigable` interface, an `System.Xml.XmlReader` object that reads the source document, or a string URI.

> **Note:**
> The `System.Xml.Xsl.XslCompiledTransform` class preserves white space by default. This is in accordance with section 3.4 of the W3C XSLT 1.0 recommendation.

## IXPathNavigable Interface

 The `System.Xml.XPath.IXPathNavigable` interface is implemented in the `System.Xml.XmlNode` and `System.Xml.XPath.XPathDocument` classes. These classes represent an in-memory cache of XML data.

- The `System.Xml.XmlNode` class is based on the W3C Document Object Model (DOM) and includes editing capabilities.

- The `System.Xml.XPath.XPathDocument` class is a read-only data store based on the XPath data model. `System.Xml.XPath.XPathDocument` is the recommended class for XSLT processing. It provides faster performance when compared to the `System.Xml.XmlNode` class.

> **Note:**
> Transformations apply to the document as a whole. In other words, if you pass in a node other than the document root node, this does not prevent the transformation process from accessing all nodes in the loaded document. To transform a node fragment, you must create an object containing just the node fragment, and pass that object to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method. For more information, see How to: Transform a Node Fragment.

 The following example uses the `System.Xml.Xsl.XslCompiledTransform.Transform*` method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: How to: Perform an XSLT Transformation by Using an Assembly.

 ```csharp
﻿using System;
using System.Text;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;

namespace Transform
{
    class Program
    {
        static void Main(string[] args)
        {
            //Three();
        }

        public static void One()
        {
            // Open books.xml as an XPathDocument.
            XPathDocument doc = new XPathDocument("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(doc, writer);
        }

        public static void Two()
        {
            // Create a reader to read books.xml
            XmlReader reader = XmlReader.Create("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(reader, writer);
        }

        public static void Three()
        {
            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform("books.xml", "books.html");
        }
    }
}
```

## XmlReader Object

 The `System.Xml.Xsl.XslCompiledTransform.Transform*` method loads from the current node of the `System.Xml.XmlReader` through all its children. This enables you to use a portion of a document as the context document. After the `System.Xml.Xsl.XslCompiledTransform.Transform*` method returns, the `System.Xml.XmlReader` is positioned on the next node after the end of the context document. If the end of the document is reached, the `System.Xml.XmlReader` is positioned at the end of file (EOF).

 The following example uses the `System.Xml.Xsl.XslCompiledTransform.Transform*` method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: How to: Perform an XSLT Transformation by Using an Assembly.

 ```csharp
﻿using System;
using System.Text;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;

namespace Transform
{
    class Program
    {
        static void Main(string[] args)
        {
            //Three();
        }

        public static void One()
        {
            // Open books.xml as an XPathDocument.
            XPathDocument doc = new XPathDocument("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(doc, writer);
        }

        public static void Two()
        {
            // Create a reader to read books.xml
            XmlReader reader = XmlReader.Create("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(reader, writer);
        }

        public static void Three()
        {
            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform("books.xml", "books.html");
        }
    }
}
```

## String URI

 You can also specify the source document URI as your XSLT input. An `System.Xml.XmlResolver` is used to resolve the URI. You can specify the `System.Xml.XmlResolver` to use by passing it to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method. If an `System.Xml.XmlResolver` is not specified, the `System.Xml.Xsl.XslCompiledTransform.Transform*` method uses a default `System.Xml.XmlUrlResolver` with no credentials.

 The following example uses the `System.Xml.Xsl.XslCompiledTransform.Transform*` method to transform the books.xml file to the books.html file using the transform.xsl style sheet. The books.xml and transform.xsl files can be found in this topic: How to: Perform an XSLT Transformation by Using an Assembly.

 ```csharp
﻿using System;
using System.Text;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;

namespace Transform
{
    class Program
    {
        static void Main(string[] args)
        {
            //Three();
        }

        public static void One()
        {
            // Open books.xml as an XPathDocument.
            XPathDocument doc = new XPathDocument("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(doc, writer);
        }

        public static void Two()
        {
            // Create a reader to read books.xml
            XmlReader reader = XmlReader.Create("books.xml");

            // Create a writer for writing the transformed file.
            XmlWriter writer = XmlWriter.Create("books.html");

            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform(reader, writer);
        }

        public static void Three()
        {
            // Create and load the transform with script execution enabled.
            XslCompiledTransform transform = new XslCompiledTransform();
            XsltSettings settings = new XsltSettings();
            settings.EnableScript = true;
            transform.Load("transform.xsl", settings, null);

            // Execute the transformation.
            transform.Transform("books.xml", "books.html");
        }
    }
}
```

 For more information, see Resolving External Resources During XSLT Processing.

## See also

- XSLT Transformations
