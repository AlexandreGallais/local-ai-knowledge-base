---
title: "How to: Serialize an Object"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/how-to-serialize-an-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Serialize an Object

To serialize an object, first create the object that is to be serialized and set its public properties and fields. To do this, you must determine the transport format in which the XML stream is to be stored, either as a stream or as a file. For example, if the XML stream must be saved in a permanent form, create a `System.IO.FileStream` object.

> **Note:**
> For more examples of XML serialization, see Examples of XML Serialization.

### To serialize an object

1. Create the object and set its public fields and properties.

2. Construct a `System.Xml.Serialization.XmlSerializer` using the type of the object. For more information, see the `System.Xml.Serialization.XmlSerializer` class constructors.

3. Call the `System.Xml.Serialization.XmlSerializer.Serialize*` method to generate either an XML stream or a file representation of the object's public properties and fields. The following example creates a file.

    ```vb
    Dim myObject As MySerializableClass = New MySerializableClass()
    ' Insert code to set properties and fields of the object.
    Dim mySerializer As XmlSerializer = New XmlSerializer(GetType(MySerializableClass))
    ' To write to a file, create a StreamWriter object.
    Dim myWriter As StreamWriter = New StreamWriter("myFileName.xml")
    mySerializer.Serialize(myWriter, myObject)
    myWriter.Close()
    ```

    ```csharp
    MySerializableClass myObject = new MySerializableClass();
    // Insert code to set properties and fields of the object.
    XmlSerializer mySerializer = new
    XmlSerializer(typeof(MySerializableClass));
    // To write to a file, create a StreamWriter object.
    StreamWriter myWriter = new StreamWriter("myFileName.xml");
    mySerializer.Serialize(myWriter, myObject);
    myWriter.Close();
    ```

## See also

- Introducing XML Serialization
- How to: Deserialize an Object
