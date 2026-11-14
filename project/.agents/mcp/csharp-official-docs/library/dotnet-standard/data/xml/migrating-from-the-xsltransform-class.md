---
title: "Migrating From the XslTransform Class (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/migrating-from-the-xsltransform-class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Migrating From the XslTransform Class

The XSLT architecture was redesigned in the Visual Studio 2005 release. The `System.Xml.Xsl.XslTransform` class was replaced by the `System.Xml.Xsl.XslCompiledTransform` class.

The following sections describe some of the main differences between the `System.Xml.Xsl.XslCompiledTransform` and the `System.Xml.Xsl.XslTransform` classes.

## Performance

The `System.Xml.Xsl.XslCompiledTransform` class includes many performance improvements. The new XSLT processor compiles the XSLT style sheet down to a common intermediate format, similar to what the common language runtime (CLR) does for other programming languages. Once the style sheet is compiled, it can be cached and reused.

The `System.Xml.Xsl.XslCompiledTransform` class also includes other optimizations that make it much faster than the `System.Xml.Xsl.XslTransform` class.

> **Note:**
> Although the overall performance of the `System.Xml.Xsl.XslCompiledTransform` class is better than the `System.Xml.Xsl.XslTransform` class, the `System.Xml.Xsl.XslCompiledTransform.Load*` method of the `System.Xml.Xsl.XslCompiledTransform` class might perform more slowly than the `System.Xml.Xsl.XslTransform.Load*` method of the `System.Xml.Xsl.XslTransform` class the first time it is called on a transformation. This is because the XSLT file must be compiled before it is loaded. For more information, see the following blog post: XslCompiledTransform Slower than XslTransform?

## Security

By default, the `System.Xml.Xsl.XslCompiledTransform` class disables support for the XSLT `document()` function and embedded scripting. These features can be enabled by creating an `System.Xml.Xsl.XsltSettings` object that has the features enabled and passing it to the `System.Xml.Xsl.XslCompiledTransform.Load*` method. The following example shows how to enable scripting and perform an XSLT transformation.

> **Note:**
> Script blocks are supported only in .NET Framework. They are _not_ supported on .NET Core or .NET 5 or later.

```csharp
using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.Schema;
using System.Xml.XPath;
using System.Net;

class XML_Migration_Samples {

  static void Main() {
  }

public void XmlReader_Creation_Old() {
// Supply the credentials <example-value> to access the Web server.
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;

// Create the XmlTextReader.
XmlTextReader reader = new XmlTextReader("http://serverName/data/books.xml");
reader.WhitespaceHandling = WhitespaceHandling.None;
reader.XmlResolver = resolver;
}

//==============================
//
static void XmlReader_Creation_New() {
// Supply the credentials <example-value> to access the Web server.
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;

// Create the XmlReader.
XmlReaderSettings settings = new XmlReaderSettings();
settings.IgnoreWhitespace = true;
settings.XmlResolver = resolver;
XmlReader reader = XmlReader.Create("http://serverName/data/books.xml", settings);
}
//==============================
//
static void XML_Validation_Old() {
XmlValidatingReader reader = new XmlValidatingReader(new XmlTextReader("books.xml"));
reader.ValidationType = ValidationType.Schema;
reader.Schemas.Add("urn:books", "books.xsd");
reader.ValidationEventHandler += new ValidationEventHandler (ValidationCallBack);
while (reader.Read());
}
private static void ValidationCallBack(object sender, ValidationEventArgs e) {
    Console.WriteLine($"Validation Error: {e.Message}");
}

//==============================
//
static void XML_Validation_New() {
XmlReaderSettings settings = new XmlReaderSettings();
settings. ValidationType = ValidationType.Schema;
settings.Schemas.Add("urn:books", "books.xsd");
settings.ValidationEventHandler += new ValidationEventHandler (ValidationCallBack);
XmlReader reader = XmlReader.Create("books.xml",settings);
while (reader.Read());
}
private static void ValidationCallBack1(object sender, ValidationEventArgs e) {
    Console.WriteLine($"Validation Error: {e.Message}");
}

//==============================
//
static void XmlWriter_Creation_Old() {
XmlTextWriter writer = new XmlTextWriter("books.xml", Encoding.Unicode);
writer.Formatting = Formatting.Indented;
}

//==============================
//
static void XmlWriter_Creation_New() {
XmlWriterSettings settings = new XmlWriterSettings();
settings.Indent = true;
settings.Encoding = Encoding.Unicode;
XmlWriter writer = XmlWriter.Create("books.xml", settings);
}

//==============================
//
static void XSLT_Old() {
string filename = "books.xml";
// Create the XslTransform.
XslTransform xslt = new XslTransform();

// Create a resolver and set the credentials to use.
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;

// Load the style sheet.
xslt.Load("http://serverName/data/xsl/sort.xsl", resolver);

// Transform the file.
XPathDocument doc = new XPathDocument(filename);
XmlTextWriter writer = new XmlTextWriter("output.xml", null);
xslt.Transform(doc, null, writer, null);
}

//==============================
//
static void XSLT_New() {
// Create the XslCompiledTransform object.
XslCompiledTransform xslt = new XslCompiledTransform();

// Create a resolver and set the credentials to use.
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;

// Load the style sheet.
xslt.Load("http://serverName/data/xsl/sort.xsl", XsltSettings.Default, resolver);

// Transform the file.
XmlWriter writer = XmlWriter.Create("output.xml");
xslt.Transform("books.xml", writer);
}

//==============================
//
static void XSLT_URI_Old() {
XslTransform xslt = new XslTransform();
xslt.Load("output.xsl");
xslt.Transform("books.xml", "books.html");
}

//==============================
//
static void XSLT_URI_New() {
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("output.xsl");
xslt.Transform("books.xml", "books.html");
}

//==============================
//
static void Stylesheet_Credentials_Old() {
XslTransform xslt = new XslTransform();
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;
xslt.Load("sort.xsl", resolver);
}

//==============================
//
static void Stylesheet_Credentials_New() {
XslCompiledTransform xslt = new XslCompiledTransform();
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = CredentialCache.DefaultCredentials;
xslt.Load("sort.xsl", XsltSettings.Default, resolver);
}

//==============================
//
static void XSLT_Param_Old() {
string filename = "books.xml";
XslTransform xslt = new XslTransform();
xslt.Load("order.xsl");

//Create the XsltArgumentList.
XsltArgumentList argList = new XsltArgumentList();

//Create a parameter which represents the current date and time.
DateTime d = DateTime.Now;
argList.AddParam("date", "", d.ToString());

//Create the XmlTextWriter.
XmlTextWriter writer = new XmlTextWriter("output.xml", null);

//Transform the file.
xslt.Transform(new XPathDocument(filename), argList, writer, null);
}

//==============================
//
static void XSLT_Param_New() {
string filename = "books.xml";
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("order.xsl");

// Create the XsltArgumentList.
XsltArgumentList argList = new XsltArgumentList();

// Create a parameter which represents the current date and time.
DateTime d = DateTime.Now;
argList.AddParam("date", "", d.ToString());

// Create the XmlWriter.
XmlWriter writer = XmlWriter.Create("output.xml", null);

// Transform the file.
xslt.Transform(new XPathDocument(filename), argList, writer);
}

//==============================
//
static void XSLT_Script_Old() {
XslTransform xslt = new XslTransform();
xslt.Load("output.xsl");
xslt.Transform("books.xml", "books.html");
}

//==============================
//
static void XSLT_Script_New() {
// Create the XsltSettings object with script enabled.
XsltSettings settings = new XsltSettings(false,true);

// Execute the transform.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("calc.xsl", settings, new XmlUrlResolver());
xslt.Transform("books.xml", "books.html");
}

//==============================
//
static void XSLT_Roundtrip_Old() {
// Execute the transformation.
XslTransform xslt = new XslTransform();
xslt.Load("output.xsl");
XmlReader reader = xslt.Transform(new XPathDocument("books.xml"), null, new XmlUrlResolver());

// Load the results into an XPathDocument object.
XPathDocument doc = new XPathDocument(reader);
}

//==============================
//
static void XSLT_Roundtrip_New() {
// Execute the transformation.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("output.xsl");
MemoryStream ms = new MemoryStream();
xslt.Transform(new XPathDocument("books.xml"), null, ms);

// Load the results into an XPathDocument object.
ms.Seek(0, SeekOrigin.Begin);
XPathDocument doc = new XPathDocument(ms);
}

//==============================
//
static void XSLT_DOM_Old() {
// Execute the transformation.
XslTransform xslt = new XslTransform();
xslt.Load("output.xsl");
XmlReader reader = xslt.Transform(new XPathDocument("books.xml"), null, new XmlUrlResolver());

// Load the results into a DOM object.
XmlDocument doc = new XmlDocument();
doc.Load(reader);
}

//==============================
//
static void XSLT_DOM_New() {
// Execute the transformation.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("output.xsl");
xslt.Transform("books.xml", "output.xml");

// Load the results into a DOM object.
XmlDocument doc = new XmlDocument();
doc.Load("output.xml");
}
}
```

For more information, see XSLT Security Considerations.

## New Features

### Temporary Files

Temporary files are sometimes generated during XSLT processing. If a style sheet contains script blocks, or if it is compiled with the debug setting set to true, temporary files may be created in the %TEMP% folder. There may be instances when some temporary files are not deleted due to timing issues. For example, if the files are in use by the current AppDomain or by the debugger, the finalizer of the `System.CodeDom.Compiler.TempFileCollection` object will not be able to remove them.

The `System.Xml.Xsl.XslCompiledTransform.TemporaryFiles` property can be used for additional cleanup to make sure that all temporary files are removed from the client.

### Support for the xsl:output Element and XmlWriter

The `System.Xml.Xsl.XslTransform` class ignored `xsl:output` settings when the transform output was sent to an `System.Xml.XmlWriter` object. The `System.Xml.Xsl.XslCompiledTransform` class has an `System.Xml.Xsl.XslCompiledTransform.OutputSettings` property that returns an `System.Xml.XmlWriterSettings` object containing the output information derived from the `xsl:output` element of the style sheet. The `System.Xml.XmlWriterSettings` object is used to create an `System.Xml.XmlWriter` object with the correct settings that can be passed to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method. The following C# code illustrates this behavior:

```csharp
// Create the XslTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load(stylesheet);

// Load the file to transform.
XPathDocument doc = new XPathDocument(filename);

// Create the writer.
XmlWriter writer = XmlWriter.Create(Console.Out, xslt.OutputSettings);

// Transform the file and send the output to the console.
xslt.Transform(doc, writer);
writer.Close();
```

### Debug Option

The `System.Xml.Xsl.XslCompiledTransform` class can generate debug information, which enables you to debug the style sheet with the Microsoft Visual Studio Debugger. See `System.Xml.Xsl.XslCompiledTransform.#ctor(System.Boolean)` for more information.
