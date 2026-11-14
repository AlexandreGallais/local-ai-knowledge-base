---
title: "XmlSerializerFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializerFactory class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSerializerFactory
```

Creates typed versions of the `XmlSerializer` for more efficient serialization.

To be added.

## XmlSerializerFactory.XmlSerializerFactory() constructor

```csharp
public XmlSerializerFactory ();
```

Initializes a new instance of the `XmlSerializerFactory` class.

To be added.

## XmlSerializerFactory.CreateSerializer(Type) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type);
```

Returns a derivation of the `XmlSerializer` class that is used to serialize the specified type.

Parameters:

- `type`: The `Type` to serialize.

Returns: A derivation of the `XmlSerializer` class that is specifically created to serialize the specified type.

To be added.

## XmlSerializerFactory.CreateSerializer(XmlTypeMapping) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (System.Xml.Serialization.XmlTypeMapping xmlTypeMapping);
```

Returns a derivation of the `XmlSerializer` class using an object that maps one type to another.

Parameters:

- `xmlTypeMapping`: An `XmlTypeMapping` that maps one type to another.

Returns: A derivation of the `XmlSerializer` class that is specifically created to serialize the mapped type.

To be added.

## XmlSerializerFactory.CreateSerializer(Type, String) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, string? defaultNamespace);
```

Returns a derivation of the `XmlSerializer` class that is used to serialize the specified type and namespace.

Parameters:

- `type`: The `Type` to serialize.
- `defaultNamespace`: The default namespace to use for all the XML elements.

Returns: A derivation of the `XmlSerializer` class that is specifically created to serialize the specified type.

To be added.

## XmlSerializerFactory.CreateSerializer(Type, Type[]) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, Type[]? extraTypes);
```

Returns a derivation of the `XmlSerializer` class that is used to serialize the specified type. If a property or field returns an array, the `extraTypes` parameter specifies objects that can be inserted into the array.

Parameters:

- `type`: The `Type` to serialize.
- `extraTypes`: A `Type` array of additional object types to serialize.

Returns: A derivation of the `XmlSerializer`.

#### Remarks
Calling this overload is similar to calling the `%23ctor` to create an instance of the `XmlSerializer` class.

## XmlSerializerFactory.CreateSerializer(Type, XmlAttributeOverrides) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides);
```

Returns a derivation of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and vice versa. Each object to be serialized can itself contain instances of classes, which this overload can override with other classes.

Parameters:

- `type`: The `Type` to serialize.
- `overrides`: An `XmlAttributeOverrides` that contains fields that override the default serialization behavior.

Returns: A derivation of the `XmlSerializer`.

#### Remarks
Calling this overload is similar to calling the `%23ctor` to create an instance of the `XmlSerializer` class.

## XmlSerializerFactory.CreateSerializer(Type, XmlRootAttribute) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, System.Xml.Serialization.XmlRootAttribute? root);
```

Returns a derivation of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and vice versa. Specifies the object that represents the XML root element.

Parameters:

- `type`: The `Type` to serialize.
- `root`: An `XmlRootAttribute` that represents the XML root element.

Returns: A derivation of the `XmlSerializer`.

#### Remarks
Calling this overload is similar to calling the `%23ctor` to create an instance of the `XmlSerializer` class.

## XmlSerializerFactory.CreateSerializer(Type, XmlAttributeOverrides, Type[], XmlRootAttribute, String) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides, Type[]? extraTypes, System.Xml.Serialization.XmlRootAttribute? root, string? defaultNamespace);
```

Returns a derivation of the `XmlSerializer` class that can serialize objects of the specified type into XML document instances, and vice versa. Each object to be serialized can itself contain instances of classes, which this overload can override with other classes. This overload also specifies the default namespace for all the XML elements, and the class to use as the XML root element.

Parameters:

- `type`: The `Type` to serialize.
- `overrides`: An `XmlAttributeOverrides` that contains fields that override the default serialization behavior.
- `extraTypes`: A `Type` array of additional object types to serialize.
- `root`: An `XmlRootAttribute` that represents the XML root element.
- `defaultNamespace`: The default namespace of all XML elements in the XML document.

Returns: A derivation of the `XmlSerializer`.

#### Remarks
Calling this overload is similar to calling the `%23ctor` to create an instance of the `XmlSerializer` class.

## XmlSerializerFactory.CreateSerializer(Type, XmlAttributeOverrides, Type[], XmlRootAttribute, String, String) method

```csharp
public System.Xml.Serialization.XmlSerializer CreateSerializer (Type type, System.Xml.Serialization.XmlAttributeOverrides? overrides, Type[]? extraTypes, System.Xml.Serialization.XmlRootAttribute? root, string? defaultNamespace, string? location);
```

Returns a derivation of the `XmlSerializer` class that can serialize objects of the specified type into XML document instances, and vice versa. Each object to be serialized can itself contain instances of classes, which this overload can override with other classes. This overload also specifies the default namespace for all the XML elements, and the class to use as the XML root element.

Parameters:

- `type`: The `Type` of the object that this `XmlSerializer` can serialize.
- `overrides`: An `XmlAttributeOverrides` that extends or overrides the behavior of the class specified in the type parameter.
- `extraTypes`: A `Type` array of additional object types to serialize.
- `root`: An `XmlRootAttribute` that defines the XML root element properties.
- `defaultNamespace`: The default namespace of all XML elements in the XML document.
- `location`: The path that specifies the location of the types.

Returns: A derivation of the `XmlSerializer`.

To be added.
