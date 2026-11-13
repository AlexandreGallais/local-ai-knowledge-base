---
title: "How to: Serialize an Object as a SOAP-Encoded XML Stream"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/how-to-serialize-an-object-as-a-soap-encoded-xml-stream.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Serialize an Object as a SOAP-Encoded XML Stream

 Because a SOAP message is built using XML, the `System.Xml.Serialization.XmlSerializer` class can be used to serialize classes and generate encoded SOAP messages. The resulting XML conforms to section 5 of the World Wide Web Consortium document "Simple Object Access Protocol (SOAP) 1.1". When you are creating an XML Web service that communicates through SOAP messages, you can customize the XML stream by applying a set of special SOAP attributes to classes and members of classes. For a list of attributes, see Attributes That Control Encoded SOAP Serialization.

### To serialize an object as a SOAP-encoded XML stream

1. Create the class using the XML Schema Definition Tool (Xsd.exe).

2. Apply one or more of the special attributes found in `System.Xml.Serialization`. See the list in "Attributes That Control Encoded SOAP Serialization."

3. Create an `XmlTypeMapping` by creating a new `SoapReflectionImporter`, and invoking the `ImportTypeMapping` method with the type of the serialized class.

     The following code example calls the `ImportTypeMapping` method of the `SoapReflectionImporter` class to create an `XmlTypeMapping`.

    ```vb
    ' Serializes a class named Group as a SOAP message.  
    Dim myTypeMapping As XmlTypeMapping =
        New SoapReflectionImporter().ImportTypeMapping(GetType(Group))  
    ```  

    ```csharp
    // Serializes a class named Group as a SOAP message.  
    XmlTypeMapping myTypeMapping =
        new SoapReflectionImporter().ImportTypeMapping(typeof(Group));
    ```  

4. Create an instance of the `XmlSerializer` class by passing the `XmlTypeMapping` to the `System.Xml.Serialization.XmlSerializer.#ctor(System.Xml.Serialization.XmlTypeMapping)` constructor.

    ```vb
    Dim mySerializer As XmlSerializer = New XmlSerializer(myTypeMapping)  
    ```  

    ```csharp
    XmlSerializer mySerializer = new XmlSerializer(myTypeMapping);  
    ```  

5. Call the `Serialize` or `Deserialize` method.

## Example

```vb
' Serializes a class named Group as a SOAP message.  
Dim myTypeMapping As XmlTypeMapping =
    New SoapReflectionImporter().ImportTypeMapping(GetType(Group))
Dim mySerializer As XmlSerializer = New XmlSerializer(myTypeMapping)  
```  

```csharp
// Serializes a class named Group as a SOAP message.  
XmlTypeMapping myTypeMapping =
    new SoapReflectionImporter().ImportTypeMapping(typeof(Group));
XmlSerializer mySerializer = new XmlSerializer(myTypeMapping);  
```  

## See also

- XML and SOAP Serialization
- Attributes That Control Encoded SOAP Serialization
- XML Serialization with XML Web Services
- How to: Serialize an Object
- How to: Deserialize an Object
- How to: Override Encoded SOAP XML Serialization
