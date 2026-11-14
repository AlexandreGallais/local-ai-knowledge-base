---
title: "XmlSerializationReader+Fixup class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader+Fixup.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader+Fixup class

Namespace: `System.Xml.Serialization`

```csharp
protected class XmlSerializationReader.Fixup
```

Holds an `XmlSerializationFixupCallback` delegate instance, plus the method's inputs; also serves as the parameter for the method.

#### Remarks
While deserializing XML documents into .NET objects, the .NET XML serialization infrastructure dynamically instantiates fix-up methods that implement the `XmlSerializationFixupCallback` delegate; plus, it instantiates `Fixup` class objects to store the fix-up methods along with their inputs. The infrastructure does so for SOAP-encoded arrays whose data types map to .NET reference types. Then, as necessary, a fix-up method is called to fill in the objects in the array.

In addition, during initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization derived from the `XmlSerializationReader` class. During this process, the infrastructure generates `XmlSerializationFixupCallback` properties plus `Fixup` class objects for SOAP-encoded, multireferenced XML data. The methods are then invoked during deserialization.

Do not directly create an instance of the `XmlSerializationFixupCallback` or `Fixup` class.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader+Fixup.XmlSerializationReader+Fixup(Object, XmlSerializationFixupCallback, Int32) constructor

```csharp
public Fixup (object? o, System.Xml.Serialization.XmlSerializationFixupCallback callback, int count);
```

Initializes a new instance of the `Fixup` class.

Parameters:

- `o`: The object that contains other objects whose values get filled in by the callback implementation.
- `callback`: A method that instantiates the `XmlSerializationFixupCallback` delegate.
- `count`: The size of the string array obtained through the `Fixup.Ids` property.

#### Remarks
Do not directly create an instance of the `Fixup` class or the `XmlSerializationFixupCallback` delegate.

## XmlSerializationReader+Fixup.XmlSerializationReader+Fixup(Object, XmlSerializationFixupCallback, String[]) constructor

```csharp
public Fixup (object? o, System.Xml.Serialization.XmlSerializationFixupCallback callback, string?[]? ids);
```

Initializes a new instance of the `Fixup` class.

Parameters:

- `o`: The object that contains other objects whose values get filled in by the callback implementation.
- `callback`: A method that instantiates the `XmlSerializationFixupCallback` delegate.
- `ids`: The string array obtained through the `Fixup.Ids` property.

#### Remarks
Do not directly instantiate the `Fixup` class or the `XmlSerializationFixupCallback` delegate.

## XmlSerializationReader+Fixup.Callback property

```csharp
public System.Xml.Serialization.XmlSerializationFixupCallback Callback { get; }
```

Gets the callback method that creates an instance of the `XmlSerializationFixupCallback` delegate.

Returns: The callback method that creates an instance of the `XmlSerializationFixupCallback` delegate.

To be added.

## XmlSerializationReader+Fixup.Ids property

```csharp
public string?[]? Ids { get; }
```

Gets or sets an array of keys for the objects that belong to the `Fixup.Source` property whose values get filled in by the callback implementation.

Returns: The array of keys.

#### Remarks
The objects can be a SOAP-encoded array or items that belong to a Web service method that maps to a SOAP-encoded message.

## XmlSerializationReader+Fixup.Source property

```csharp
public object? Source { get; set; }
```

Gets or sets the object that contains other objects whose values get filled in by the callback implementation.

Returns: The source containing objects with values to fill.

#### Remarks
The object to fix can be one of the following:

- An array whose items the `XmlSerializationFixupCallback` delegate implementation fills in.

- A mapping between a Web service method and a SOAP message that can be defined in a Web Services Description Language (WSDL) document. The members of the mapping, such as method parameters, get filled in by the callback method.
