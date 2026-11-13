---
title: "Migrating From the XslTransform Class (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/migrating-from-the-xsltransform-class.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migrating From the XslTransform Class (part 2 of 2)

## Behavioral Differences

### Transforming to an XmlReader

The `System.Xml.Xsl.XslTransform` class has several Transform overloads that return transformation results as an `System.Xml.XmlReader` object. These overloads can be used to load the transformation results into an in-memory representation (such as `System.Xml.XmlDocument` or `System.Xml.XPath.XPathDocument`) without incurring the overhead of serialization and deserialization of the resulting XML tree. The following C# code shows how to load the transformation results into an `System.Xml.XmlDocument` object.

```csharp
// Load the style sheet
XslTransform xslt = new XslTransform();
xslt.Load("MyStylesheet.xsl");

// Transform input document to XmlDocument for additional processing
XmlDocument doc = new XmlDocument();
doc.Load(xslt.Transform(input, (XsltArgumentList)null));
```

The `System.Xml.Xsl.XslCompiledTransform` class does not support transforming to an `System.Xml.XmlReader` object. However, you can do something similar by using the `System.Xml.XPath.XPathNavigator.CreateNavigator*` method to load the resulting XML tree directly from an `System.Xml.XmlWriter`. The following C# code shows how to accomplish the same task using `System.Xml.Xsl.XslCompiledTransform`.

```csharp
// Transform input document to XmlDocument for additional processing
XmlDocument doc = new XmlDocument();
using (XmlWriter writer = doc.CreateNavigator().AppendChild()) {
    xslt.Transform(input, (XsltArgumentList)null, writer);
}
```

### Discretionary Behavior

The W3C XSL Transformations (XSLT) Version 1.0 Recommendation includes areas in which the implementation provider may decide how to handle a situation. These areas are considered to be discretionary behavior. There are several areas where the `System.Xml.Xsl.XslCompiledTransform` behaves differently than the `System.Xml.Xsl.XslTransform` class. For more information, see Recoverable XSLT Errors.

### Extension Objects and Script Functions

`System.Xml.Xsl.XslCompiledTransform` introduces two new restrictions on the use of script functions:

- Only public methods may be called from XPath expressions.

- Overloads are distinguishable from each other based on the number of arguments. If more than one overload has the same number of arguments, an exception will be raised.

In `System.Xml.Xsl.XslCompiledTransform`, a binding (method name lookup) to script functions occurs at compile time, and style sheets that worked with XslTransform may cause an exception when they are loaded with `System.Xml.Xsl.XslCompiledTransform`.

`System.Xml.Xsl.XslCompiledTransform` supports having `msxsl:using` and `msxsl:assembly` child elements within the `msxsl:script` element. The `msxsl:using` and `msxsl:assembly` elements are used to declare additional namespaces and assemblies for use in the script block. See Script Blocks Using msxsl:script for more information.

`System.Xml.Xsl.XslCompiledTransform` prohibits extension objects that have multiple overloads with the same number of arguments.

### MSXML Functions

Support for additional MSXML functions have been added to the `System.Xml.Xsl.XslCompiledTransform` class. The following list describes new or improved functionality:

- msxsl:node-set: `System.Xml.Xsl.XslTransform` required the argument of the node-set Function function to be a result tree fragment. The `System.Xml.Xsl.XslCompiledTransform` class does not have this requirement.

- msxsl:version: This function is supported in `System.Xml.Xsl.XslCompiledTransform`.

- XPath extension functions: The ms:string-compare Function, ms:utc Function, ms:namespace-uri Function, ms:local-name Function, ms:number Function, ms:format-date Function, and ms:format-time Function functions are now supported.

- Schema-related XPath extension functions: These functions are not supported natively by `System.Xml.Xsl.XslCompiledTransform`. However, they can be implemented as extension functions.

## See also

- XSLT Transformations
- Using the XslCompiledTransform Class
