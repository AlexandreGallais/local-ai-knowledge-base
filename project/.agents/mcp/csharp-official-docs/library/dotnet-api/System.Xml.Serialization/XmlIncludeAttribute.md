---
title: "XmlIncludeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlIncludeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlIncludeAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlIncludeAttribute : Attribute
```

Allows the `XmlSerializer` to recognize a type when it serializes or deserializes an object.

#### Remarks
Use the `XmlIncludeAttribute` when you call the `XmlSerializer.Serialize` or `XmlSerializer.Deserialize` method of the `XmlSerializer` class.

When applying the `XmlIncludeAttribute`, specify the `Type` of the derived class. When the `XmlSerializer` serializes objects that include both the base and the derived class, it can then recognize both object types.

You can use the `XmlIncludeAttribute` to include derived classes in service description documents that are written in the Web Services Description Language (WSDL). For example, if a method returns an `Object`, apply the `XmlIncludeAttribute` to the method and specify the actual types to return.

For more information on the WSDL, see Web Services Description Language (WSDL) 1.1.

#### Examples
The following example shows three classes, two of which inherit from the third. The example applies the `XmlIncludeAttribute` to a method that returns an instance of one of the derived classes.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlIncludeAttribute/Overview/sourcecs.asmx._
## XmlIncludeAttribute.XmlIncludeAttribute(Type) constructor

```csharp
public XmlIncludeAttribute (Type? type);
```

Initializes a new instance of the `XmlIncludeAttribute` class.

Parameters:

- `type`: The `Type` of the object to include.

#### Examples
The following example shows three classes, two of which inherit from the third. The example applies the `XmlIncludeAttribute` to a method that returns an instance of one of the two derived classes. The example sets the `Type` property to the type of the returned object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlIncludeAttribute/.ctor/source.cs._

## XmlIncludeAttribute.Type property

```csharp
public Type? Type { get; set; }
```

Gets or sets the type of the object to include.

Returns: The `Type` of the object to include.

#### Examples
The following example defines a class named `Group`, which contains a field named `Employees` that returns an array of `Employee` objects. The example derives the `Manager` class from the `Employee` class, and applies the `XmlIncludeAttribute` to the `Employee` class. When the example creates a `Group` object, it inserts a `Manager` object into the `Employee` array. Lastly, the example serializes the `Group` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlIncludeAttribute/Type/source.cs._
