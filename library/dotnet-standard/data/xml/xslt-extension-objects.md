---
title: "XSLT Extension Objects"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xslt-extension-objects.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XSLT Extension Objects

Extension objects are used to extend the functionality of style sheets. Extension objects are maintained by the `System.Xml.Xsl.XsltArgumentList` class.

 The following are advantages to using an extension object rather than embedded script:

- Provides better encapsulation and reuse of classes.

- Allows style sheets to be smaller and more maintainable.

 XSLT extension objects are added to the `System.Xml.Xsl.XsltArgumentList` object using the `System.Xml.Xsl.XsltArgumentList.AddExtensionObject*` method. A qualified name and namespace URI are associated with the extension object at that time.

> **Note:**
> The FullTrust permission set is required to call the `System.Xml.Xsl.XsltArgumentList.AddExtensionObject*` method. For more information, see Code Access Security and Named Permission Sets.

 The data types returned from extension objects are one of the four basic XPath data types of `number`, `string`, `Boolean`, and `node set`.

 Any method that is defined with the `params` keyword, which allows an unspecified number of parameters to be passed, is not currently supported by the `System.Xml.Xsl.XslCompiledTransform` class. XSLT style sheets that utilize any method defined with the `params` keyword will not work correctly. For details, see params.

### To use an XSLT extension object

1. Create an `System.Xml.Xsl.XsltArgumentList` object and add the extension object using `System.Xml.Xsl.XsltArgumentList.AddExtensionObject*` method.

2. Call the extension object from the style sheet.

3. Pass the `System.Xml.Xsl.XsltArgumentList` object to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

## See also

- XSLT Transformations
- XSLT Security Considerations
