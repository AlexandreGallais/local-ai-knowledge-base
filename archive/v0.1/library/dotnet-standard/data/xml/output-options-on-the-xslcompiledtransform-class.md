---
title: "Output Options on the XslCompiledTransform Class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/output-options-on-the-xslcompiledtransform-class.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Output Options on the XslCompiledTransform Class

This article discusses the available XSLT output options. You can specify output options in the style sheet, or on the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

## xsl:output Element

 The `xsl:output` element specifies options for the output. The output type specified by the `System.Xml.Xsl.XslCompiledTransform.Transform*` method determines the behavior of the `xsl:output` options.

 The following table describes the behavior for each of the attributes available on the `xsl:output` element when the output type is a stream or a `System.IO.TextWriter`.

|Attribute name|Behavior|
|--------------------|--------------|
|method|Supported.|
|version|Ignored. The version is always 1.0 for XML and 4.0 for HTML.|
|encoding|Ignored when outputting to a `System.IO.TextWriter`. The `System.IO.TextWriter.Encoding` property is used instead.|
|omit-xml-declaration|Supported.|
|standalone|Supported.|
|doctype-public|Supported.|
|doctype-system|Supported.|
|cdata-section-elements|Supported.|
|indent|Supported.|
|media-type|Supported.|

### Sending Output to an XmlWriter

 If your style sheet uses the `xsl:output` element and the output type is an `System.Xml.XmlWriter` object, you should use the `System.Xml.Xsl.XslCompiledTransform.OutputSettings` property when you create the `System.Xml.XmlWriter` object. The `System.Xml.Xsl.XslCompiledTransform.OutputSettings` property returns an `System.Xml.XmlWriterSettings` object that contains information derived from the `xsl:output` element of a compiled style sheet. This `System.Xml.XmlWriterSettings` object can be passed to the `System.Xml.XmlWriter.Create*` method to create an `System.Xml.XmlWriter` object with the correct settings.

## Output Types

 The following list describes the output types available on the `System.Xml.Xsl.XslCompiledTransform.Transform*` command.

### XmlWriter

 The `System.Xml.XmlWriter` class writes out XML streams or files. You can specify the features to support on the `System.Xml.XmlWriter` object, including output options, by using the `System.Xml.XmlWriterSettings` class. The `System.Xml.XmlWriter` class is an integral part of the `System.Xml` framework. Use this output type to pipeline the output results into another XML process.

### String

 Use this output type to specify the URI of the output file.

### Stream

 A stream is an abstraction of a sequence of bytes, such as a file, an input/output device, an inter-process communication pipe, or a TCP/IP socket. The `System.IO.Stream` class and its derived classes provide a generic view of these different types of input and output, isolating the programmer from the specific details of the operating system and the underlying devices.

 Use this output type to send data to a `System.IO.FileStream`, `System.IO.MemoryStream`, or an output stream (`Response.OutputStream`).

### TextWriter

 The `System.IO.TextWriter` writes sequential characters. It is implemented in the `System.IO.StringWriter` and `System.IO.StreamWriter` classes, which write characters to strings or streams, respectively. Use this output type when you want to output to a string.

## Notes

When writing out empty tags, a space is written between the last character of the element name and the backslash, `<myElement />` for example. This lets older browsers display the generated HTML pages correctly.

## See also

- XSLT Transformations
