---
title: "Style Sheet Directives Embedded in a Document"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/style-sheet-directives-embedded-in-a-document.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Style Sheet Directives Embedded in a Document

Occasionally, existing XML contains the style sheet directive of `<?xml:stylesheet?>` (notice the use of a colon instead of a hyphen). When the XML data contains an `<?xml:stylesheet?>` directive, as shown in the following data, attempting to load this data into the XML Document Object Model (DOM) throws an exception.

```xml
<?xml version="1.0" ?>
<?xml:stylesheet type="text/xsl" href="test2.xsl"?>
<root>
    <test>Node 1</test>
    <test>Node 2</test>
</root>
```

This occurs because the `<?xml:stylesheet?>` is considered an invalid **ProcessingInstruction** to the DOM. Any **ProcessingInstruction**, according to the Namespaces in XML specification, can only be no-colon names (NCNames), as opposed to qualified names (QNames).

From Section 6 of the Namespaces in XML specification, the effect of having the **Load** and **LoadXml** methods conform to the specification is that in a document:

- All element types and attribute names contain either zero or one colon.

- No entity names, ProcessingInstruction targets, or notation names contain any colons.

With the `<?xml:stylesheet?>` containing a colon, you now violate the rule in the second bullet.

According to the World Wide Web Consortium (W3C) Associating Style Sheets with XML documents Version 1.0 Recommendation, the processing instruction to associate an XSLT style sheet with an XML document is `<?xml-stylesheet?>`, with a dash replacing the colon.

## See also

- XML Document Object Model (DOM)
