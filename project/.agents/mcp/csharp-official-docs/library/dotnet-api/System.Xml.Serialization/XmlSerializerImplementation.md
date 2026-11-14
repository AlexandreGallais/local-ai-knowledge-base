---
title: "XmlSerializerImplementation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializerImplementation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializerImplementation class

Namespace: `System.Xml.Serialization`

```csharp
public abstract class XmlSerializerImplementation
```

Defines the reader, writer, and methods for pre-generated, typed serializers.

#### Remarks
To improve the performance of XML serialization, you can generate assemblies before serialization using the XML Serializer Generator Tool (Sgen.exe). When such an assembly is loaded, the `XmlSerializer` uses the properties of the `XmlSerializerImplementation` interface to query the contained serializer or serializers.

## XmlSerializerImplementation.XmlSerializerImplementation() constructor

```csharp
protected XmlSerializerImplementation ();
```

Initializes a new instance of the `XmlSerializerImplementation` class.

To be added.

## XmlSerializerImplementation.Reader property

```csharp
public virtual System.Xml.Serialization.XmlSerializationReader Reader { get; }
```

Gets the XML reader object that is used by the serializer.

Returns: An `XmlSerializationReader` that is used to read an XML document or data stream.

To be added.

## XmlSerializerImplementation.ReadMethods property

```csharp
public virtual System.Collections.Hashtable ReadMethods { get; }
```

Gets the collection of methods that is used to read a data stream.

Returns: A `Hashtable` that contains the methods.

To be added.

## XmlSerializerImplementation.TypedSerializers property

```csharp
public virtual System.Collections.Hashtable TypedSerializers { get; }
```

Gets the collection of typed serializers that is found in the assembly.

Returns: A `Hashtable` that contains the typed serializers.

To be added.

## XmlSerializerImplementation.WriteMethods property

```csharp
public virtual System.Collections.Hashtable WriteMethods { get; }
```

Gets the collection of methods that is used to write to a data stream.

Returns: A `Hashtable` that contains the methods.

To be added.

## XmlSerializerImplementation.Writer property

```csharp
public virtual System.Xml.Serialization.XmlSerializationWriter Writer { get; }
```

Gets the XML writer object for the serializer.

Returns: An `XmlSerializationWriter` that is used to write to an XML data stream or document.

To be added.

## XmlSerializerImplementation.CanSerialize(Type) method

```csharp
public virtual bool CanSerialize (Type type);
```

Gets a value that determines whether a type can be serialized.

Parameters:

- `type`: The type to be serialized.

Returns: `true` if the type can be serialized; otherwise, `false`.

To be added.

## XmlSerializerImplementation.GetSerializer(Type) method

```csharp
public virtual System.Xml.Serialization.XmlSerializer GetSerializer (Type type);
```

Returns a serializer for the specified type.

Parameters:

- `type`: The type to be serialized.

Returns: An instance of a type derived from the `XmlSerializer` class.

To be added.
