---
title: "XmlSerializer class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializer class (part 2 of 4)

## XmlSerializer.XmlSerializer(Type, Type[]) constructor

```csharp
public XmlSerializer (Type type, Type[]? extraTypes);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and deserialize XML documents into object of a specified type. If a property or field returns an array, the `extraTypes` parameter specifies objects that can be inserted into the array.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.
- `extraTypes`: A `Type` array of additional object types to serialize.

#### Remarks
By default, if a public property or field returns an object, or array of objects, the object types are automatically serialized. However, if a class contains a field or property that returns an array of type `Object`, any object can be inserted into that array. In that case, the `XmlSerializer` must be instructed to expect all the possible object types that are inserted into the `Object` array. To do this, use the `extraTypes` parameter to specify the extra object types to serialize or deserialize.

You can also use the `extraTypes` parameter to specify types derived from a base class. For example, suppose a base class named `Phone` exists, and a class named `InternationalPhone` derives from it. Use the `extraTypes` parameter to specify the derived type as well.

#### Examples
The following example serializes an instance of a class that contains a public field that returns an array of objects. The `extraTypes` parameter of the `XmlSerializer` constructor specifies the types of the objects that can be serialized in the array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source3.cs._

## XmlSerializer.XmlSerializer(Type, XmlAttributeOverrides) constructor

```csharp
public XmlSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and deserialize XML documents into objects of the specified type. Each object to be serialized can itself contain instances of classes, which this overload can override with other classes.

Parameters:

- `type`: The type of the object to serialize.
- `overrides`: An `XmlAttributeOverrides`.

#### Remarks
The `overrides` parameter can be used to control how fields and properties are encoded in XML. These settings override any attributes that already exist on the objects. This can be useful when the source code cannot be modified or multiple encodings are required for the same classes.

#### Examples
The following example serializes an instance of a class that is defined in a DLL and to do so, overrides the public members found in the DLL.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source4.cs._

## XmlSerializer.XmlSerializer(Type, XmlRootAttribute) constructor

```csharp
public XmlSerializer (Type type, System.Xml.Serialization.XmlRootAttribute? root);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and deserialize an XML document into object of the specified type. It also specifies the class to use as the XML root element.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.
- `root`: An `XmlRootAttribute` that represents the XML root element.

#### Remarks
The root element of an XML document encloses all the other elements. By default, the object specified by the `type` parameter is serialized as the root element. Properties, such as the XML element name of the root element, are taken from the `type` object. However, the `root` parameter allows you to replace the default object's information by specifying an `XmlRootAttribute`; the object allows you to set a different namespace, element name, and so on.

#### Examples
The following example constructs an `XmlSerializer` that uses an `XmlRootAttribute` that contains various properties of the XML root element, such as its namespace and element name.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source2.cs._

## XmlSerializer.XmlSerializer(Type, XmlAttributeOverrides, Type[], XmlRootAttribute, String) constructor

```csharp
public XmlSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides, Type[]? extraTypes, System.Xml.Serialization.XmlRootAttribute? root, string? defaultNamespace);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of type `Object` into XML document instances, and deserialize XML document instances into objects of type `Object`. Each object to be serialized can itself contain instances of classes, which this overload overrides with other classes. This overload also specifies the default namespace for all the XML elements and the class to use as the XML root element.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.
- `overrides`: An `XmlAttributeOverrides` that extends or overrides the behavior of the class specified in the `type` parameter.
- `extraTypes`: A `Type` array of additional object types to serialize.
- `root`: An `XmlRootAttribute` that defines the XML root element properties.
- `defaultNamespace`: The default namespace of all XML elements in the XML document.

#### Remarks
The `overrides` parameter allows for the creation of an `XmlSerializer` that serializes a class that extends or overrides the behavior of a base class. For example, given a DLL, it is possible to create a class that inherits or extends a class contained in the DLL. To serialize such a class, you must use an instance of the `XmlAttributeOverrides` class when constructing the `XmlSerializer`. For more details, see `XmlAttributeOverrides`.

By default, if a public property or field returns an object, or array of objects, the object types are automatically serialized. However, if a class contains a field or property that returns an array of type `Object`, any object can be inserted into that array. In that case, the `XmlSerializer` must be instructed to expect all the possible object types that are inserted into the `Object` array. To do this, use the `extraTypes` parameter to specify the extra object types to serialize or deserialize.

The root element of an XML document encloses all the other elements. By default, the object specified by the `type` parameter is serialized as the root element. Properties, such as the XML element name of the root element are taken from the `type` object. However, the `root` parameter allows you to replace the default object's information by specifying an `XmlRootAttribute`; the object allows you to set a different namespace, element name, and so on.

Use the `defaultName` parameter to specify the default namespace of all XML elements generated by the `XmlSerializer`.

#### Examples
The following example serializes an instance of a class that is defined in a DLL and to do so, overrides the public members found in the class. The example also specifies an array of extra types, the default namespace for all XML elements, and the class to use that provides the XML root element information. The example assumes that the code at the beginning has been compiled into a DLL named `HighSchool`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source.cs._

## XmlSerializer.XmlSerializer(Type, XmlAttributeOverrides, Type[], XmlRootAttribute, String, String) constructor

```csharp
public XmlSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides, Type[]? extraTypes, System.Xml.Serialization.XmlRootAttribute? root, string? defaultNamespace, string? location);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of type `Object` into XML document instances, and deserialize XML document instances into objects of type `Object`. Each object to be serialized can itself contain instances of classes, which this overload overrides with other classes. This overload also specifies the default namespace for all the XML elements and the class to use as the XML root element.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.
- `overrides`: An `XmlAttributeOverrides` that extends or overrides the behavior of the class specified in the `type` parameter.
- `extraTypes`: A `Type` array of additional object types to serialize.
- `root`: An `XmlRootAttribute` that defines the XML root element properties.
- `defaultNamespace`: The default namespace of all XML elements in the XML document.
- `location`: The location of the types.

To be added.

## XmlSerializer.CanDeserialize(XmlReader) method

```csharp
public virtual bool CanDeserialize (System.Xml.XmlReader xmlReader);
```

Gets a value that indicates whether this `XmlSerializer` can deserialize a specified XML document.

Parameters:

- `xmlReader`: An `XmlReader` that points to the document to deserialize.

Returns: `true` if this `XmlSerializer` can deserialize the object that the `XmlReader` points to; otherwise, `false`.

#### Examples
The following example calls the `XmlSerializer.CanDeserialize` method to check whether an XML document can be deserialized.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/CanDeserialize/source.cs._

## XmlSerializer.CreateReader() method

```csharp
protected virtual System.Xml.Serialization.XmlSerializationReader CreateReader ();
```

Returns an object used to read the XML document to be serialized.

Returns: An `XmlSerializationReader` used to read the XML document.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.

## XmlSerializer.CreateWriter() method

```csharp
protected virtual System.Xml.Serialization.XmlSerializationWriter CreateWriter ();
```

When overridden in a derived class, returns a writer used to serialize the object.

Returns: An instance that implements the `XmlSerializationWriter` class.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.

## XmlSerializer.Deserialize(Stream) method

```csharp
public object? Deserialize (System.IO.Stream stream);
```

Deserializes the XML document contained by the specified `Stream`.

Parameters:

- `stream`: The `Stream` that contains the XML document to deserialize.

Returns: The `Object` being deserialized.

#### Remarks
Deserialization is the process of reading an XML document and constructing an object that is strongly typed to the XML Schema (XSD) of the document.

Before deserializing, an `XmlSerializer` must be constructed using the type of the object that is being deserialized.

Use the `stream` parameter to specify an object that derives from the `Stream` class, which is designed to write to streams. Classes that derive from the `Stream` class include:

-   `BufferedStream`

-   `FileStream`

-   `MemoryStream`

-   `NetworkStream`

-   `CryptoStream`

> **Note:**
> The `XmlSerializer` cannot deserialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example deserializes an object using a `Stream` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Deserialize/source.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Deserialize Example/Common/simple.xml._
## XmlSerializer.Deserialize(TextReader) method

```csharp
public object? Deserialize (System.IO.TextReader textReader);
```

Deserializes the XML document contained by the specified `TextReader`.

Parameters:

- `textReader`: The `TextReader` that contains the XML document to deserialize.

Returns: The `Object` being deserialized.

Exceptions:

- `InvalidOperationException`: An error occurred during deserialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
Deserialization is the process of reading an instance of an XML document and constructing an object that is strongly typed to the XML Schema (XSD) of the document.

Before deserializing, an `XmlSerializer` must be constructed using the type of the object that is being deserialized.

Classes that inherit from `TextReader` include `StringReader` and `StreamReader`. If you are using a `StreamReader` to deserialize an object, you must construct the `StreamReader` with an appropriate `Encoding`. The encoding specified by the XML document is ignored.

> **Note:**
> To use the encoding specified by the XML document, use the `XmlSerializer.Deserialize` overload that takes an `XmlReader` instead. The `XmlReader` automatically detects and uses the encoding specified by the XML document.

> **Note:**
> The `XmlSerializer` cannot deserialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example deserializes an object using a `TextReader` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Deserialize/source1.cs._

## XmlSerializer.Deserialize(XmlSerializationReader) method

```csharp
protected virtual object Deserialize (System.Xml.Serialization.XmlSerializationReader reader);
```

Deserializes the XML document contained by the specified `XmlSerializationReader`.

Parameters:

- `reader`: The `XmlSerializationReader` that contains the XML document to deserialize.

Returns: The deserialized object.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.
