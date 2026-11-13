---
title: "Mapping XML Data Types to CLR Types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/mapping-xml-data-types-to-clr-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Mapping XML Data Types to CLR Types

The following table describes the default mapping between the XML data types and the common language runtime (CLR) types.

> **Note:**
> The `xs` and the `xdt` prefixes are mapped to the <https://www.w3.org/2001/XMLSchema> and the <https://www.w3.org/2003/05/xpath-datatypes> namespace URIs respectively.

|XML Type|CLR Type|
|--------------|--------------|
|`xs:anyURI`|`System.Uri`|
|`xs:base64Binary`|`Byte[]`|
|`xs:boolean`|`System.Boolean`|
|`xs:byte`|`System.SByte`|
|`xs:date`|`System.DateTime`|
|`xs:dateTime`|`System.DateTime`|
|`xs:decimal`|`System.Decimal`|
|`xs:double`|`System.Double`|
|`xs:duration`|`System.TimeSpan`|
|`xs:ENTITIES`|`String[]`|
|`xs:ENTITY`|`System.String`|
|`xs:float`|`System.Single`|
|`xs:gDay`|`System.DateTime`|
|`xs:gMonthDay`|`System.DateTime`|
|`xs:gYear`|`System.DateTime`|
|`xs:gYearMonth`|`System.DateTime`|
|`xs:hexBinary`|`Byte[]`|
|`xs:ID`|`System.String`|
|`xs:IDREF`|`System.String`|
|`xs:IDREFS`|`String[]`|
|`xs:int`|`System.Int32`|
|`xs:integer`|`System.Decimal`|
|`xs:language`|`System.String`|
|`xs:long`|`System.Int64`|
|`xs:gMonth`|`System.DateTime`|
|`xs:Name`|`System.String`|
|`xs:NCName`|`System.String`|
|`xs:negativeInteger`|`System.Decimal`|
|`xs:NMTOKEN`|`System.String`|
|`xs:NMTOKENS`|`String[]`|
|`xs:nonNegativeInteger`|`System.Decimal`|
|`xs:nonPositiveInteger`|`System.Decimal`|
|`xs:normalizedString`|`System.String`|
|`xs:NOTATION`|`System.Xml.XmlQualifiedName`|
|`xs:positiveInteger`|`System.Decimal`|
|`xs:QName`|`System.Xml.XmlQualifiedName`|
|`xs:short`|`System.Int16`|
|`xs:string`|`System.String`|
|`xs:time`|`System.DateTime`|
|`xs:token`|`System.String`|
|`xs:unsignedByte`|`System.Byte`|
|`xs:unsignedInt`|`System.UInt32`|
|`xs:unsignedLong`|`System.UInt64`|
|`xs:unsignedShort`|`System.UInt16`|
|`xdt:dayTimeDuration`|`System.TimeSpan`|
|`xdt:yearMonthDuration`|`System.TimeSpan`|
|`xdt:untypedAtomic`|`System.String`|
|`xdt:anyAtomicType`|`System.Object`|
|`xs:anySimpleType`|`System.String`|
|Document node|`System.Xml.XPath.XPathNavigator`|
|Element node|`System.Xml.XPath.XPathNavigator`|
|Attribute node|`System.Xml.XPath.XPathNavigator`|
|Namespace node|`System.Xml.XPath.XPathNavigator`|
|Text node|`System.Xml.XPath.XPathNavigator`|
|Comment node|`System.Xml.XPath.XPathNavigator`|
|Processing instruction node|`System.Xml.XPath.XPathNavigator`|

## See also

- Type Support in the System.Xml Classes
