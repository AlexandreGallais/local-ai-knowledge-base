---
title: "Resolving External Resources During XSLT Processing"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/resolving-external-resources-during-xslt-processing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolving External Resources During XSLT Processing

There are several times during an XSLT transformation when you may need to resolve external resources.

## Using the XmlResolver Class

 The `System.Xml.XmlResolver` class is used to resolve external resources. The following table describes when the `System.Xml.XmlResolver` becomes involved during XSLT processing.

|XSLT task|What the XmlResolver is used for|
|---------------|--------------------------------------|
|Compile the style sheet.|Resolve the URI of the style sheet. -and- Resolve URI references in any `xsl:import` or `xsl:include` elements.|
|Execute the style sheet.|Resolve the URI of the context document. -and- Resolve URI references in any XSLT `document()` functions.|

 The `System.Xml.Xsl.XslCompiledTransform.Load*` and `System.Xml.Xsl.XslCompiledTransform.Transform*` methods include overloads that take an `System.Xml.XmlResolver` object as one of its arguments. If an `System.Xml.XmlResolver` is not specified, a default `System.Xml.XmlUrlResolver` with no credentials is used.

 The following list describes when you may want to specify an `System.Xml.XmlResolver` object:

- If the XSLT process needs to access a network resource that requires authentication, you can use an `System.Xml.XmlResolver` with the necessary credentials.

- If you want to restrict the resources that the XSLT process can access, you can use an `System.Xml.XmlSecureResolver` with the correct permission set. Use the `System.Xml.XmlSecureResolver` class if you need to open a resource that you do not control, or that is untrusted.

- If you want to customize behavior, you can implement your own `System.Xml.XmlResolver` class and use it to resolve resources.

- If you want to ensure that no external resources are accessed, you can specify `null` for the `System.Xml.XmlResolver` argument.

## Example

 The following example compiles a style sheet that is stored on a network resource. An `System.Xml.XmlUrlResolver` object specifies the credentials <example-value> to access the style sheet.

 ```csharp
﻿using System;
using System.Text;
using System.IO;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;
using System.Net;

class XslCompiledTransformLoad {

  static void Main() {
  }

// Load with XPathDocument.
static void XslCompiledTransform_Load1() {
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load(new XPathDocument("http://serverName/data/xsl/sort.xsl"));
}

//==============================//
// Load URI with XmlResolver
static void XslCompiledTransform_Load2() {
// Create the XslCompiledTransform object.
XslCompiledTransform xslt = new XslCompiledTransform();

// Create a resolver and set the credentials to use.
XmlSecureResolver resolver = new XmlSecureResolver(new XmlUrlResolver(), "http://serverName/data/");
resolver.Credentials = CredentialCache.DefaultCredentials;

// Load the style sheet.
xslt.Load("http://serverName/data/xsl/sort.xsl", null, resolver);
}
//==============================//
// Load reader with resolver & settings
static void XslCompiledTransform_Load3() {
// Create the XslCompiledTransform object.
XslCompiledTransform xslt = new XslCompiledTransform();

// Create a resolver and set the credentials to use.
XmlSecureResolver resolver = new XmlSecureResolver(new XmlUrlResolver(), "http://serverName/data/");
resolver.Credentials = CredentialCache.DefaultCredentials;

XmlReader reader = XmlReader.Create("http://serverName/data/xsl/sort.xsl");

// Create the XsltSettings object with script enabled.
XsltSettings settings = new XsltSettings(false,true);

// Load the style sheet.
xslt.Load(reader, settings, resolver);
}

//==============================//
// Load with XPathDocument and credentials
static void XslCompiledTransform_Load4() {

	string UserName = "username";
	string SecurelyStoredPassword = "<example-value>";
	string Domain= "domain";

// Create a resolver and specify the necessary credentials.
XmlUrlResolver resolver = new XmlUrlResolver();
System.Net.NetworkCredential <example-value>;
myCred  = new System.Net.NetworkCredential(UserName,SecurelyStoredPassword,Domain);
resolver.Credentials = <example-value>;

// Load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load(new XPathDocument("http://serverName/data/xsl/sort.xsl"), XsltSettings.Default, resolver);
}

//==============================//
// Load with XmlReader
static void XslCompiledTransform_Load5() {
// Create a reader that contains the style sheet.
XmlReader reader = XmlReader.Create("titles.xsl");
reader.ReadToDescendant("xsl:stylesheet");

// Load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load(reader);
}

//==============================//
// Load with script enabled.
static void XslCompiledTransform_Load6() {
// Create the XsltSettings object with script enabled.
XsltSettings settings = new XsltSettings(false,true);

// Create the XslCompiledTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("sort.xsl", settings, new XmlUrlResolver());
}

//==============================//
// Load with default XSLT settings.
static void XslCompiledTransform_Load7() {
// Create the XslCompiledTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("sort.xsl", XsltSettings.Default, new XmlUrlResolver());
}

//==============================//
// Load with trusted XSLT settings.
static void XslCompiledTransform_Load8() {

	string UserName = "username";
	string SecurelyStoredPassword = "<example-value>";
	string Domain= "domain";

// Create a resolver and specify the necessary credentials.
XmlSecureResolver resolver = new XmlSecureResolver(new XmlUrlResolver(), "http://serverName/data/");
System.Net.NetworkCredential <example-value>;
myCred  = new System.Net.NetworkCredential(UserName,SecurelyStoredPassword,Domain);
resolver.Credentials = <example-value>;

// Create the XslCompiledTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("http://serverName/data/script.xsl", XsltSettings.TrustedXslt, resolver);
}

//==============================//
// Load with script enabled.
static void XslCompiledTransform_Load9() {
// Create the XsltSettings object with script enabled.
XsltSettings settings = new XsltSettings();
settings.EnableScript = true;

// Create a resolver that will be used to resolve the style sheet.
XmlSecureResolver resolver = new XmlSecureResolver(new XmlUrlResolver(), "http://serverName/data/");

// Create the XslCompiledTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("http://serverName/data/sort.xsl", settings, resolver);
    }
//==============================//
//
static void XslCompiledTransform_Debug() {
// Enable XSLT debugging.
XslCompiledTransform xslt = new XslCompiledTransform(true);

// Load the style sheet.
xslt.Load("output.xsl");

// Create the writer.
XmlWriterSettings settings = new XmlWriterSettings();
settings.Indent=true;
XmlWriter writer = XmlWriter.Create("output.xml", settings);

// Execute the transformation.
xslt.Transform("books.xml", writer);
writer.Close();
}

//==============================//
// Load w/ credential cache.
static void Cache() {

	string UserName = "username";
	string SecurelyStoredPassword = "<example-value>";
	string Domain= "domain";

// Create the credentials.
NetworkCredential <example-value> = new NetworkCredential(UserName,SecurelyStoredPassword,Domain);
CredentialCache myCache = new CredentialCache();
myCache.Add(new Uri("http://www.contoso.com/"), "Basic", myCred);
myCache.Add(new Uri("http://app.contoso.com/"), "Basic", myCred);

// Set the credentials on the XmlUrlResolver object.
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = <example-value>;

// Compile the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load("http://serverName/data/xsl/order.xsl",XsltSettings.Default, resolver);
}
}
```

## See also

- `System.Xml.Xsl.XslCompiledTransform`
- `System.Xml.Xsl.XsltSettings`
- XSLT Transformations
