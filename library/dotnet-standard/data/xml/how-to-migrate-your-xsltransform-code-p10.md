---
title: "How to: Migrate Your XslTransform Code (part 10 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/how-to-migrate-your-xsltransform-code.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Migrate Your XslTransform Code (part 10 of 13)

## To load the results into a DOM object

- Code using the `System.Xml.Xsl.XslTransform` class.

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

- Code using the `System.Xml.Xsl.XslCompiledTransform` class.

    > **Note:**
    > The `System.Xml.Xsl.XslCompiledTransform` class does not have a method that returns the XSLT transformation results as an `System.Xml.XmlReader` object. However, you can output to an XML file and load the XML file into another object.
