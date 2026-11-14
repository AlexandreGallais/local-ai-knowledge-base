---
title: "XmlSerializer class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializer class (part 3 of 4)

## XmlSerializer.Deserialize(XmlReader) method

```csharp
public object? Deserialize (System.Xml.XmlReader xmlReader);
```

Deserializes the XML document contained by the specified `XmlReader`.

Parameters:

- `xmlReader`: The `XmlReader` that contains the XML document to deserialize.

Returns: The `Object` being deserialized.

Exceptions:

- `InvalidOperationException`: An error occurred during deserialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
Deserialization is the process of reading an instance of an XML document and constructing an object that is strongly typed to the XML Schema (XSD) of the document.

Before deserializing, an `XmlSerializer` must be constructed using the type of the object that is being deserialized.

The `XmlReader` automatically detects and uses the encoding specified by the XML document.

> **Note:**
> The `XmlSerializer` cannot deserialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example deserializes an object using an `XmlReader`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Deserialize/source2.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Deserialize2 Example/Common/simple.xml._
## XmlSerializer.Deserialize(XmlReader, String) method

```csharp
public object? Deserialize (System.Xml.XmlReader xmlReader, string? encodingStyle);
```

Deserializes the XML document contained by the specified `XmlReader` and encoding style.

Parameters:

- `xmlReader`: The `XmlReader` that contains the XML document to deserialize.
- `encodingStyle`: The encoding style of the serialized XML.

Returns: The deserialized object.

Exceptions:

- `InvalidOperationException`: An error occurred during deserialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
Deserialization is the process of reading an instance of an XML document and constructing an object that is strongly typed to the XML Schema (XSD) of the document.

Before deserializing, an `XmlSerializer` must be constructed using the type of the object that is being deserialized.

Set the `encodingStyle` parameter to "" for SOAP version 1.1 encoding; otherwise, set it to "<http://www.w3.org/2001/12/soap-encoding>" for SOAP version 1.2 encoding.

**Note** The `XmlSerializer` cannot deserialize the following: arrays of `ArrayList` and arrays of `List<T>`.

## XmlSerializer.Deserialize(XmlReader, XmlDeserializationEvents) method

```csharp
public object? Deserialize (System.Xml.XmlReader xmlReader, System.Xml.Serialization.XmlDeserializationEvents events);
```

Deserializes an XML document contained by the specified `XmlReader` and allows the overriding of events that occur during deserialization.

Parameters:

- `xmlReader`: The `XmlReader` that contains the document to deserialize.
- `events`: An instance of the `XmlDeserializationEvents` class.

Returns: The `Object` being deserialized.

#### Remarks
The object being deserialized.

## XmlSerializer.Deserialize(XmlReader, String, XmlDeserializationEvents) method

```csharp
public object? Deserialize (System.Xml.XmlReader xmlReader, string? encodingStyle, System.Xml.Serialization.XmlDeserializationEvents events);
```

Deserializes the object using the data contained by the specified `XmlReader`.

Parameters:

- `xmlReader`: An instance of the `XmlReader` class used to read the document.
- `encodingStyle`: The encoding used.
- `events`: An instance of the `XmlDeserializationEvents` class.

Returns: The object being deserialized.

#### Remarks
This method is required for deserialization of unknown headers for Web Service scenarios only. This method allows you to avoid event synchronization in Web Service methods.

## XmlSerializer.FromMappings(XmlMapping[]) method

```csharp
public static System.Xml.Serialization.XmlSerializer?[] FromMappings (System.Xml.Serialization.XmlMapping[]? mappings);
```

Returns an array of `XmlSerializer` objects created from an array of `XmlTypeMapping` objects.

Parameters:

- `mappings`: An array of `XmlTypeMapping` that maps one type to another.

Returns: An array of `XmlSerializer` objects.

It is recommended for callers to cache the returned serializer when there are repeated calls to this method.

## XmlSerializer.FromMappings(XmlMapping[], Type) method

```csharp
public static System.Xml.Serialization.XmlSerializer?[] FromMappings (System.Xml.Serialization.XmlMapping[]? mappings, Type? type);
```

Returns an instance of the `XmlSerializer` class from the specified mappings.

Parameters:

- `mappings`: An array of `XmlMapping` objects.
- `type`: The `Type` of the deserialized object.

Returns: An instance of the `XmlSerializer` class.

To be added.

## XmlSerializer.FromTypes(Type[]) method

```csharp
public static System.Xml.Serialization.XmlSerializer?[] FromTypes (Type[]? types);
```

Returns an array of `XmlSerializer` objects created from an array of types.

Parameters:

- `types`: An array of `Type` objects.

Returns: An array of `XmlSerializer` objects.

#### Remarks

The `XmlSerializer.FromTypes` method allows you to efficiently create an array of `XmlSerializer` objects for processing an array of `Type` objects. However, it's recommended for callers to cache the returned serializers when there are repeated calls to this method.

#### Examples

The following example uses the `XmlSerializer.FromTypes` method to return an array of `XmlSerializer` objects. The code includes three class definitions that are each used to create an array of `Type` objects.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/FromTypes/source.cs._

## XmlSerializer.GetXmlSerializerAssemblyName(Type) method

```csharp
public static string GetXmlSerializerAssemblyName (Type type);
```

Returns the name of the assembly that contains one or more versions of the `XmlSerializer` especially created to serialize or deserialize the specified type.

Parameters:

- `type`: The `Type` you are deserializing.

Returns: The name of the assembly that contains an `XmlSerializer` for the type.

#### Remarks
The XML Serializer Generator Tool (Sgen.exe) creates an XML serialization assembly for types in a specified assembly to improve the run-time performance of an `XmlSerializer` when it serializes or deserializes objects of the specified types. Use the `XmlSerializer.GetXmlSerializerAssemblyName` to return the name of such an assembly.

If you are distributing such an assembly as part of a client application that calls a Web service, you can apply the `XmlSerializerAssemblyAttribute` to the client type to specify the location and name of the assembly.

## XmlSerializer.GetXmlSerializerAssemblyName(Type, String) method

```csharp
public static string GetXmlSerializerAssemblyName (Type type, string? defaultNamespace);
```

Returns the name of the assembly that contains the serializer for the specified type in the specified namespace.

Parameters:

- `type`: The `Type` you are interested in.
- `defaultNamespace`: The namespace of the type.

Returns: The name of the assembly that contains specially built serializers.

#### Remarks
The XML Serializer Generator Tool (Sgen.exe) creates an XML serialization assembly for types in a specified assembly to improve the run-time performance of an `XmlSerializer` when it serializes or deserializes objects of the specified types. Use the `XmlSerializer.GetXmlSerializerAssemblyName` to return the name of such an assembly.

If you are distributing such an assembly as part of a client application that calls a Web service, you can apply the `XmlSerializerAssemblyAttribute` to the client type to specify the location and name of the assembly.

## XmlSerializer.Serialize(Stream, Object) method

```csharp
public void Serialize (System.IO.Stream stream, object? o);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `Stream`.

Parameters:

- `stream`: The `Stream` used to write the XML document.
- `o`: The `Object` to serialize.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
The `XmlSerializer.Serialize` method converts the public fields and read/write properties of an object into XML. It does not convert methods, indexers, private fields, or read-only properties.

In the `stream` parameter, specify an object that derives from the abstract `Stream` class. Classes that derive from `Stream` include:

-   `BufferedStream`
-   `FileStream`
-   `MemoryStream`
-   `NetworkStream`
-   `CryptoStream`

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object using a `Stream` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source2.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Serialize2 Example/Common/simple.xml._
## XmlSerializer.Serialize(TextWriter, Object) method

```csharp
public void Serialize (System.IO.TextWriter textWriter, object? o);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `TextWriter`.

Parameters:

- `textWriter`: The `TextWriter` used to write the XML document.
- `o`: The `Object` to serialize.

#### Remarks
The `XmlSerializer.Serialize` method converts the public fields and read/write properties of an object into XML. It does not convert methods, indexers, private fields, or read-only properties.

In the `textWriter` parameter, specify an object that derives from the abstract `TextWriter` class. Classes that derive from `TextWriter` include:

-   `StreamWriter`

-   `StringWriter`

-   `IndentedTextWriter`

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object using a `TextWriter`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Serialize Example/Common/simple.xml._
## XmlSerializer.Serialize(Object, XmlSerializationWriter) method

```csharp
protected virtual void Serialize (object? o, System.Xml.Serialization.XmlSerializationWriter writer);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `XmlSerializationWriter`.

Parameters:

- `o`: The `Object` to serialize.
- `writer`: The `XmlSerializationWriter` used to write the XML document.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.

## XmlSerializer.Serialize(XmlWriter, Object) method

```csharp
public void Serialize (System.Xml.XmlWriter xmlWriter, object? o);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `XmlWriter`.

Parameters:

- `xmlWriter`: The `XmlWriter` used to write the XML document.
- `o`: The `Object` to serialize.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
The `XmlSerializer.Serialize` method converts the public fields and read/write properties of an object into XML. It does not convert methods, indexers, private fields, or read-only properties.

In the `xmlWriter` parameter, specify an object that derives from the abstract `XmlWriter` class. The `XmlTextWriter` derives from the `XmlWriter`.

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object using an `XmlWriter`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source4.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Serialize4 Example/Common/simple.xml._
## XmlSerializer.Serialize(Stream, Object, XmlSerializerNamespaces) method

```csharp
public void Serialize (System.IO.Stream stream, object? o, System.Xml.Serialization.XmlSerializerNamespaces? namespaces);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `Stream` that references the specified namespaces.

Parameters:

- `stream`: The `Stream` used to write the XML document.
- `o`: The `Object` to serialize.
- `namespaces`: The `XmlSerializerNamespaces` referenced by the object.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
When the `XmlSerializer.Serialize` method is invoked, the public fields and read/write properties of an object are converted into XML. Methods, indexers, private fields, and read-only properties are not serialized.

Use the `stream` parameter to specify an object that derives from the abstract `Stream` class, which is designed to write to streams. Classes that derive from the `Stream` class include:

-   `BufferedStream`

-   `FileStream`

-   `MemoryStream`

-   `NetworkStream`

-   `CryptoStream`

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object with a `Stream` object. The example also creates an `XmlSerializerNamespaces` and adds two namespaces to the object. The class that defines the serialized object is also attributed with `XmlElementAttribute` attributes to specify the namespace for each element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source3.cs._
