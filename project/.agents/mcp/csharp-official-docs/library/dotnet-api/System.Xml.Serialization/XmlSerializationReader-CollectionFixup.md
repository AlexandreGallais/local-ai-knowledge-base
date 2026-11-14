---
title: "XmlSerializationReader+CollectionFixup class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader+CollectionFixup.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader+CollectionFixup class

Namespace: `System.Xml.Serialization`

```csharp
protected class XmlSerializationReader.CollectionFixup
```

Holds an `XmlSerializationCollectionFixupCallback` delegate instance, plus the method's inputs; also supplies the method's parameters.

#### Remarks
During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization derived from the `XmlSerializationReader` class. During this process, the infrastructure generates methods that implement the `XmlSerializationCollectionFixupCallback` delegate. Additionally, it instantiates `CollectionFixup` class objects to store the fix-up methods along with their inputs. The infrastructure does so for SOAP-encoded arrays or SOAP-encoded, multireferenced elements whose data types, in either case, map to .NET collections or enumerations. Then, as necessary, the methods are invoked during deserialization to fill in array items or multireferenced objects.

Do not directly instantiate `XmlSerializationCollectionFixupCallback` or `CollectionFixup`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader+CollectionFixup.XmlSerializationReader+CollectionFixup(Object, XmlSerializationCollectionFixupCallback, Object) constructor

```csharp
public CollectionFixup (object? collection, System.Xml.Serialization.XmlSerializationCollectionFixupCallback callback, object collectionItems);
```

Initializes a new instance of the `CollectionFixup` class with parameters for a callback method.

Parameters:

- `collection`: A collection into which the callback method copies the collection items array.
- `callback`: A method that instantiates the `XmlSerializationCollectionFixupCallback` delegate.
- `collectionItems`: An array into which the callback method copies a collection.

#### Remarks
Do not directly create and instance of the `CollectionFixup` class or the `XmlSerializationCollectionFixupCallback` delegate.

## XmlSerializationReader+CollectionFixup.Callback property

```csharp
public System.Xml.Serialization.XmlSerializationCollectionFixupCallback Callback { get; }
```

Gets the callback method that instantiates the `XmlSerializationCollectionFixupCallback` delegate.

Returns: The `XmlSerializationCollectionFixupCallback` delegate that points to the callback method.

To be added.

## XmlSerializationReader+CollectionFixup.Collection property

```csharp
public object? Collection { get; }
```

Gets the object collection for the callback method.

Returns: The collection that is used for the fixup.

#### Remarks
The `Collection` property gets the collection into which the method that implements the `XmlSerializationCollectionFixupCallback` delegate copies the array that is obtained through the `CollectionItems` property.

## XmlSerializationReader+CollectionFixup.CollectionItems property

```csharp
public object CollectionItems { get; }
```

Gets the array into which the callback method copies a collection.

Returns: The array into which the callback method copies a collection.

#### Remarks
The `CollectionItems` property gets the array that the method that implements the `XmlSerializationCollectionFixupCallback` delegate copies into the collection object that is obtained through the `Collection` property.
