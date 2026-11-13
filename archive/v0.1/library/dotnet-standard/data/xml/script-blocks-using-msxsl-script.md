---
title: "Script Blocks Using msxsl:script"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/script-blocks-using-msxsl-script.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Script blocks Using msxsl:script

> **Note:**
> Script blocks are supported only in .NET Framework. They are _not_ supported on .NET Core or .NET 5 or later.

The `System.Xml.Xsl.XslCompiledTransform` class supports embedded scripts using the `msxsl:script` element. When the style sheet is loaded, any defined functions are compiled to common intermediate language (CIL) by the Code Document Object Model (CodeDOM) and are executed during runtime. The assembly generated from the embedded script block is separate than the assembly generated for the style sheet.

## Enable XSLT script

Support for embedded scripts is an optional XSLT setting on the `System.Xml.Xsl.XslCompiledTransform` class. Script support is disabled by default. To enable script support, create an `System.Xml.Xsl.XsltSettings` object with the `System.Xml.Xsl.XsltSettings.EnableScript` property set to `true` and pass the object to the `System.Xml.Xsl.XslCompiledTransform.Load*` method.

> **Warning:**
> Starting in .NET 10, the `System.Xml.Xsl.XsltSettings.EnableScript` property is marked as obsolete and generates warning SYSLIB0062. Since script blocks aren't supported on .NET Core or .NET 5+, this property has no effect and setting it to `true` throws a `System.PlatformNotSupportedException` at runtime.

> **Note:**
> XSLT scripting should be enabled only if you require script support and you are working in a fully trusted environment.

## msxsl:script element definition

 The `msxsl:script` element is a Microsoft extension to the XSLT 1.0 recommendation and has the following definition:

```xml
<msxsl:script language = "language-name" implements-prefix = "prefix of user namespace"> </msxsl:script>
```

 The `msxsl` prefix is bound to the `urn:schemas-microsoft-com:xslt` namespace URI. The style sheet must include the `xmlns:msxsl=urn:schemas-microsoft-com:xslt` namespace declaration.

 The `language` attribute is optional. Its value is the code language of the embedded code block. The language is mapped to the appropriate CodeDOM compiler using the `System.CodeDom.Compiler.CodeDomProvider.CreateProvider*` method. The `System.Xml.Xsl.XslCompiledTransform` class can support any Microsoft .NET language, assuming the appropriate provider is installed on the machine and is registered in the system.codedom section of the machine.config file. If a `language` attribute is not specified, the language defaults to JScript. The language name is not case-sensitive so 'JavaScript' and 'javascript' are equivalent.

 The `implements-prefix` attribute is mandatory. This attribute is used to declare a namespace and associate it with the script block. The value of this attribute is the prefix that represents the namespace. This prefix can be defined somewhere in a style sheet.

> **Note:**
> When using the `msxsl:script` element, we strongly recommend that the script, regardless of language, be placed inside a CDATA section. Because the script can contain operators, identifiers, or delimiters for a given language, if it is not contained within a CDATA section, it has the potential of being misinterpreted as XML. The following XML shows a template of the CDATA section where code can be placed.

```xml
<msxsl:script implements-prefix='your-prefix' language='CSharp'>
<![CDATA[
// Code block.
]]>
</msxsl:script>
```

## Script functions

 Functions can be declared within the `msxsl:script` element. When a function is declared, it is contained in a script block. Style sheets can contain multiple script blocks, each operating independent of the other. That means that if you are executing inside a script block, you cannot call a function that you defined in another script block unless it is declared to have the same namespace and the same scripting language. Because each script block can be in its own language, and the block is parsed according to the grammar rules of that language parser we recommend that you use the correct syntax for the language in use. For example, if you are in a Microsoft C# script block, use the C# comment syntax.

 The supplied arguments and return values to the function can be of any type. Because the W3C XPath types are a subset of the common language runtime (CLR) types, type conversion takes place on types that are not considered to be an XPath type. The following table shows the corresponding W3C types and the equivalent CLR type.

| W3C type               | CLR type                                  |
|------------------------|-------------------------------------------|
| `String`               | `System.String`                      |
| `Boolean`              | `System.Boolean`                     |
| `Number`               | `System.Double`                      |
| `Result Tree Fragment` | `System.Xml.XPath.XPathNavigator`    |
| `Node Set`             | `System.Xml.XPath.XPathNodeIterator` |

 CLR numeric types are converted to `System.Double`. The `System.DateTime` type is converted to `System.String`. `System.Xml.XPath.IXPathNavigable` types are converted to `System.Xml.XPath.XPathNavigator`. **XPathNavigator[]** is converted to `System.Xml.XPath.XPathNodeIterator`.

 All other types throw an error.

### Import namespaces and assemblies

 The `System.Xml.Xsl.XslCompiledTransform` class predefines a set of assemblies and namespaces that are supported by default by the `msxsl:script` element. However, you can use classes and members belonging to a namespace that is not on the predefined list by importing the assembly and namespace in `msxsl:script` block.

#### Assemblies

 The following two assemblies are referenced by default:

- System.dll
- System.Xml.dll
- Microsoft.VisualBasic.dll (when the script language is VB)

 You can import the additional assemblies using the `msxsl:assembly` element. This includes the assembly when the style sheet is compiled. The `msxsl:assembly` element has the following definition:

```xml
<msxsl:script>
  <msxsl:assembly name="system.assemblyName" />
  <msxsl:assembly href="path-name" />
    <![CDATA[
    // User code
    ]]>
</msxsl:script>
```

 The `name` attribute contains the name of the assembly and the `href` attribute contains the path to the assembly. The assembly name can be a full name, such as "<example-value>", or a short name, such as "<example-value>".

#### Namespaces

 The following namespaces are included by default:

- System
- System.Collection
- System.Text
- System.Text.RegularExpressions
- System.Xml
- System.Xml.Xsl
- System.Xml.XPath
- Microsoft.VisualBasic (when the script language is VB)

 You can add support for additional namespaces using the `namespace` attribute. The attribute value is the name of the namespace.

```xml
<msxsl:script>
  <msxsl:using namespace="system.namespaceName" />
    <![CDATA[
    // User code
    ]]>
</msxsl:script>
```

## Example

 The following example uses an embedded script to calculate the circumference of a circle given its radius.

 ```csharp
using System;
using System.IO;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

public class Sample {

  private const String filename = "number.xml";
  private const String stylesheet = "calc.xsl";

  public static void Main() {

    // Compile the style sheet.
    XsltSettings xslt_settings = new XsltSettings();
    xslt_settings.EnableScript = true;
    XslCompiledTransform xslt = new XslCompiledTransform();
    xslt.Load(stylesheet, xslt_settings, new XmlUrlResolver());

    // Load the XML source file.
    XPathDocument doc = new XPathDocument(filename);

    // Create an XmlWriter.
    XmlWriterSettings settings = new XmlWriterSettings();
    settings.OmitXmlDeclaration = true;
    settings.Indent = true;
    XmlWriter writer = XmlWriter.Create("output.xml", settings);

    // Execute the transformation.
    xslt.Transform(doc, writer);
    writer.Close();
  }
}
```

#### number.xml

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Script/XML/number.xml._

#### calc.xsl

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Script/XML/calc.xsl._

### Output

```xml
<circles xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:user="urn:my-scripts">
  <circle>
    <radius>12</radius>
    <circumference>75.36</circumference>
  </circle>
  <circle>
    <radius>37.5</radius>
    <circumference>235.5</circumference>
  </circle>
</circles>
```

## See also

- XSLT Transformations
- Dynamic Source Code Generation and Compilation
