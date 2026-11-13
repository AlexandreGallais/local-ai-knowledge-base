---
title: "How to deserialize an object using XmlSerializer"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/how-to-deserialize-an-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to deserialize an object using XmlSerializer

When you deserialize an object, the transport format determines whether you will create a stream or file object. After the transport format is determined, you can call the `System.Xml.Serialization.XmlSerializer.Serialize*` or `System.Xml.Serialization.XmlSerializer.Deserialize*` methods, as required.

## To deserialize an object

1. Construct a `System.Xml.Serialization.XmlSerializer` using the type of the object to deserialize.

1. Call the `System.Xml.Serialization.XmlSerializer.Deserialize*` method to produce a replica of the object. When deserializing, you must cast the returned object to the type of the original, as shown in the following example, which deserializes the object from a file (although it could also be deserialized from a stream).

    ```vb
    ' Construct an instance of the XmlSerializer with the type
    ' of object that is being deserialized.
    Dim mySerializer As New XmlSerializer(GetType(MySerializableClass))
    ' To read the file, create a FileStream.
    Using myFileStream As New FileStream("myFileName.xml", FileMode.Open)
        ' Call the Deserialize method and cast to the object type.
        Dim myObject = CType( _
             mySerializer.Deserialize(myFileStream), MySerializableClass)
     End Using
    ```

    ```csharp
    // Construct an instance of the XmlSerializer with the type
    // of object that is being deserialized.
    var mySerializer = new XmlSerializer(typeof(MySerializableClass));
    // To read the file, create a FileStream.
    using var myFileStream = new FileStream("myFileName.xml", FileMode.Open);
    // Call the Deserialize method and cast to the object type.
    var myObject = (MySerializableClass)mySerializer.Deserialize(myFileStream);
    ```

## See also

- Introducing XML Serialization
- How to: Serialize an Object
