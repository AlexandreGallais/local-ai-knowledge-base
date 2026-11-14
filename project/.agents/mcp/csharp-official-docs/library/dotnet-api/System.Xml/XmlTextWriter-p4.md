---
title: "XmlTextWriter class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextWriter class (part 4 of 4)

## XmlTextWriter.WriteWhitespace(String) method

```csharp
public override void WriteWhitespace (string? ws);
```

Writes out the given white space.

Parameters:

- `ws`: The string of white space characters.

Exceptions:

- `ArgumentException`: The string contains non-white space characters.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method is used to manually format your document. Use the `Formatting` property to have the writer format the output automatically.

#### Examples
The following example uses the `WriteWhitespace` method to control how the file is formatted.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteWhitespace/source.cs._
