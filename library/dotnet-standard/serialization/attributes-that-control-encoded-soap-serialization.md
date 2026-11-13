---
title: "Attributes That Control Encoded SOAP Serialization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/attributes-that-control-encoded-soap-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributes That Control Encoded SOAP Serialization

The World Wide Web Consortium (W3C) document named Simple Object Access Protocol (SOAP) 1.1 contains an optional section (section 5) that describes how SOAP parameters can be encoded. To conform to section 5 of the specification, you must use a special set of attributes found in the `System.Xml.Serialization` namespace. Apply those attributes as appropriate to classes and members of classes, and then use the `System.Xml.Serialization.XmlSerializer` to serialize instances of the class or classes.

The following table shows the attributes, where they can be applied, and what they do. For more information about using these attributes to control XML serialization, see How to: Serialize an Object as a SOAP-Encoded XML Stream and How to: Override Encoded SOAP XML Serialization.

For more information about attributes, see Attributes.

|Attribute|Applies to|Specifies|
|---------------|----------------|---------------|
|`System.Xml.Serialization.SoapAttributeAttribute`|Public field, property, parameter, or return value.|The class member will be serialized as an XML attribute.|
|`System.Xml.Serialization.SoapElementAttribute`|Public field, property, parameter, or return value.|The class will be serialized as an XML element.|
|`System.Xml.Serialization.SoapEnumAttribute`|Public field that is an enumeration identifier.|The element name of an enumeration member.|
|`System.Xml.Serialization.SoapIgnoreAttribute`|Public properties and fields.|The property or field should be ignored when the containing class is serialized.|
|`System.Xml.Serialization.SoapIncludeAttribute`|Public-derived class declarations and public methods for Web Services Description Language (WSDL) documents.|The type should be included when generating schemas (to be recognized when serialized).|
|`System.Xml.Serialization.SoapTypeAttribute`|Public class declarations.|The class should be serialized as an XML type.|

## See also

- XML and SOAP Serialization
- How to: Serialize an Object as a SOAP-Encoded XML Stream
- How to: Override Encoded SOAP XML Serialization
- Attributes
- `System.Xml.Serialization.XmlSerializer`
- How to: Serialize an Object
- How to: Deserialize an Object
