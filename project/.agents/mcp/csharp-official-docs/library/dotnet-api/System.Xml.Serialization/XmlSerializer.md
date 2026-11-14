---
title: "XmlSerializer class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializer class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSerializer
```

Serializes and deserializes objects into and from XML documents. The `XmlSerializer` enables you to control how objects are encoded into XML.

XML serialization is the process of converting an object's public properties and fields to a serial format (in this case, XML) for storage or transport. Deserialization re-creates the object in its original state from the XML output. You can think of serialization as a way of saving the state of an object into a stream or buffer. For example, ASP.NET uses the `XmlSerializer` class to encode XML Web service messages.

The data in your objects is described using programming language constructs like classes, fields, properties, primitive types, arrays, and even embedded XML in the form of `XmlElement` or `XmlAttribute` objects. You have the option of creating your own classes, annotated with attributes, or using the XML Schema Definition Tool (Xsd.exe) to generate the classes based on an existing XML Schema definition (XSD) document. If you have an XML Schema, you can run the Xsd.exe to produce a set of classes that are strongly typed to the schema and annotated with attributes to adhere to the schema when serialized.

To transfer data between objects and XML requires a mapping from the programming language constructs to XML schema and from the XML schema to the programming language constructs. The `XmlSerializer` and related tools like Xsd.exe provide the bridge between these two technologies at both design time and runtime. At design time, use the Xsd.exe to produce an XML schema document (.xsd) from your custom classes or to produce classes from a given schema. In either case, the classes are annotated with custom attributes to instruct the `XmlSerializer` how to map between the XML schema system and the common language runtime. At runtime, instances of the classes can be serialized into XML documents that follow the given schema. Likewise, these XML documents can be deserialized into runtime objects. Note that the XML schema is optional, and not required at design time or runtime.

#### Control generated XML

To control the generated XML, you can apply special attributes to classes and members. For example, to specify a different XML element name, apply an `XmlElementAttribute` to a public field or property, and set the `ElementName` property. For a complete list of similar attributes, see Attributes That Control XML Serialization. You can also implement the `IXmlSerializable` interface to control the XML output.

If the XML generated must conform to section 5 of the World Wide Consortium document, Simple Object Access Protocol (SOAP) 1.1, you must construct the `XmlSerializer` with an `XmlTypeMapping`. To further control the encoded SOAP XML, use the attributes listed in Attributes That Control Encoded SOAP Serialization.

With the `XmlSerializer` you can take advantage of working with strongly typed classes and still have the flexibility of XML. Using fields or properties of type `XmlElement`, `XmlAttribute` or `XmlNode` in your strongly typed classes, you can read parts of the XML document directly into XML objects.

If you work with extensible XML schemas, you can also use the `XmlAnyElementAttribute` and `XmlAnyAttributeAttribute` attributes to serialize and deserialize elements or attributes that are not found in the original schema. To use the objects, apply an `XmlAnyElementAttribute` to a field that returns an array of `XmlElement` objects, or apply an `XmlAnyAttributeAttribute` to a field that returns an array of `XmlAttribute` objects.

If a property or field returns a complex object (such as an array or a class instance), the `XmlSerializer` converts it to an element nested within the main XML document. For example, the first class in the following code returns an instance of the second class.

```vb
Public Class MyClass
    Public MyObjectProperty As MyObject
End Class

Public Class MyObject
    Public ObjectName As String
End Class
```

```csharp
public class MyClass
{
    public MyObject MyObjectProperty;
}
public class MyObject
{
    public string ObjectName;
}
```

The serialized, XML output looks like this:

```xml
<MyClass>
  <MyObjectProperty>
  <ObjectName>My String</ObjectName>
  </MyObjectProperty>
</MyClass>
```

If a schema includes an element that is optional (minOccurs = '0'), or if the schema includes a default value, you have two options. One option is to use `DefaultValueAttribute` to specify the default value, as shown in the following code.

```vb
Public Class PurchaseOrder
    <System.ComponentModel.DefaultValueAttribute ("2002")> _
    Public Year As String
End Class
```

```csharp
public class PurchaseOrder
{
    [System.ComponentModel.DefaultValueAttribute ("2002")]
    public string Year;
}
```

Another option is to use a special pattern to create a Boolean field recognized by the `XmlSerializer`, and to apply the `XmlIgnoreAttribute` to the field. The pattern is created in the form of `propertyNameSpecified`. For example, if there is a field named "MyFirstName" you would also create a field named "MyFirstNameSpecified" that instructs the `XmlSerializer` whether to generate the XML element named "MyFirstName". This is shown in the following example.

```vb
Public Class OptionalOrder
    ' This field's value should not be serialized
    ' if it is uninitialized.
    Public FirstOrder As String

    ' Use the XmlIgnoreAttribute to ignore the
    ' special field named "FirstOrderSpecified".
    <System.Xml.Serialization.XmlIgnoreAttribute> _
    Public FirstOrderSpecified As Boolean
End Class
```

```csharp
public class OptionalOrder
{
    // This field should not be serialized
    // if it is uninitialized.
    public string FirstOrder;

    // Use the XmlIgnoreAttribute to ignore the
    // special field named "FirstOrderSpecified".
    [System.Xml.Serialization.XmlIgnoreAttribute]
    public bool FirstOrderSpecified;
}
```

#### Override default serialization

You can also override the serialization of any set of objects and their fields and properties by creating one of the appropriate attributes, and adding it to an instance of the `XmlAttributes` class. Overriding serialization in this way has two uses: first, you can control and augment the serialization of objects found in a DLL, even if you do not have access to the source; second, you can create one set of serializable classes, but serialize the objects in multiple ways. For more details, see the `XmlAttributeOverrides` class and How to: Control Serialization of Derived Classes.

To serialize an object, call the `XmlSerializer.Serialize` method. To deserialize an object, call the `XmlSerializer.Deserialize` method.

To add XML namespaces to an XML document, see `XmlSerializerNamespaces`.

> **Note:**
> The `XmlSerializer` gives special treatment to classes that implement `IEnumerable` or `ICollection`. A class that implements `IEnumerable` must implement a public `Add` method that takes a single parameter. The `Add` method's parameter must be of the same type as is returned from the `Current` property on the value returned from `GetEnumerator`, or one of that type's bases. A class that implements `ICollection` (such as `CollectionBase`) in addition to `IEnumerable` must have a public `Item` indexed property (indexer in C#) that takes an integer, and it must have a public `Count` property of type integer. The parameter to the `Add` method must be the same type as is returned from the `Item` property, or one of that type's bases. For classes that implement `ICollection`, values to be serialized are retrieved from the indexed `Item` property, not by calling `GetEnumerator`.

You must have permission to write to the temporary directory (as defined by the TEMP environment variable) to deserialize an object.

#### Dynamically generated assemblies

To increase performance, the XML serialization infrastructure dynamically generates assemblies to serialize and deserialize specified types. The infrastructure finds and reuses those assemblies. This behavior occurs only when using the following constructors:

`%23ctor`

`%23ctor`

If you use any of the other constructors, multiple versions of the same assembly are generated and never unloaded, which results in a memory leak and poor performance. The easiest solution is to use one of the previously mentioned two constructors. Otherwise, you must cache the assemblies in a `Hashtable`, as shown in the following example.

```csharp
Hashtable serializers = new Hashtable();

// Use the constructor that takes a type and XmlRootAttribute.
XmlSerializer s = new XmlSerializer(typeof(MyClass), myRoot);

// Implement a method named GenerateKey that creates unique keys
// for each instance of the XmlSerializer. The code should take
// into account all parameters passed to the XmlSerializer
// constructor.
object key = GenerateKey(typeof(MyClass), myRoot);

// Check the local cache for a matching serializer.
XmlSerializer ser = (XmlSerializer)serializers[key];
if (ser == null)
{
    ser = new XmlSerializer(typeof(MyClass), myRoot);
    // Cache the serializer.
    serializers[key] = ser;
}

// Use the serializer to serialize or deserialize.
```

```vb
Dim serializers As New Hashtable()

' Use the constructor that takes a type and XmlRootAttribute.
Dim s As New XmlSerializer(GetType([MyClass]), myRoot)

' Implement a method named GenerateKey that creates unique keys
' for each instance of the XmlSerializer. The code should take
' into account all parameters passed to the XmlSerializer
' constructor.
Dim key As Object = GenerateKey(GetType([MyClass]), myRoot)

' Check the local cache for a matching serializer.
Dim ser As XmlSerializer = CType(serializers(key), XmlSerializer)

If ser Is Nothing Then
    ser = New XmlSerializer(GetType([MyClass]), myRoot)
    ' Cache the serializer.
    serializers(key) = ser
End If

' Use the serializer to serialize or deserialize.
```

#### Serialization of ArrayList and generic list

The `XmlSerializer` cannot serialize or deserialize the following:

- Arrays of `ArrayList`
- Arrays of `List<T>`

#### Serialization of enumerations of unsigned Long

The `XmlSerializer` cannot be instantiated to serialize an enumeration if the following conditions are true: The enumeration is of type unsigned long (`ulong` in C#) and the enumeration contains any member with a value larger than 9,223,372,036,854,775,807. For example, the following cannot be serialized.

```csharp
public enum LargeNumbers: ulong
{
    a = 9223372036854775808
}
// At runtime, the following code will fail.
xmlSerializer mySerializer=new XmlSerializer(typeof(LargeNumbers));
```

#### Obsolete types

The `XmlSerializer` class does not serialize objects that are marked as `[Obsolete]`.

The following example contains two main classes: `PurchaseOrder` and `Test`. The `PurchaseOrder` class contains information about a single purchase. The `Test` class contains the methods that create the purchase order, and that read the created purchase order.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Overview/source.cs._

## XmlSerializer.XmlSerializer() constructor

```csharp
protected XmlSerializer ();
```

Initializes a new instance of the `XmlSerializer` class.

To be added.

## XmlSerializer.XmlSerializer(Type) constructor

```csharp
public XmlSerializer (Type type);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and deserialize XML documents into objects of the specified type.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.

#### Remarks
Commonly, an application defines several classes that the `XmlSerializer` converts into a single XML-instance document. However, the `XmlSerializer` must know only one type--the type of the class that represents the XML root element. The `XmlSerializer` automatically serializes all subordinate class instances. Similarly, only the type of the XML root element is required for deserialization.

#### Examples
The following example constructs an `XmlSerializer` that serializes an object named `Widget`. The example sets various properties of the object before calling the `XmlSerializer.Serialize` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source5.cs._

## XmlSerializer.XmlSerializer(XmlTypeMapping) constructor

```csharp
public XmlSerializer (System.Xml.Serialization.XmlTypeMapping xmlTypeMapping);
```

Initializes an instance of the `XmlSerializer` class using an object that maps one type to another.

Parameters:

- `xmlTypeMapping`: An `XmlTypeMapping` that maps one type to another.

#### Remarks
This constructor is used to create an `XmlSerializer` when you serialize an object into a SOAP message. To control the SOAP messages generated, use the special attributes (beginning with the word "Soap") found in the `Serialization` namespace.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName`, `IgnoreThis` fields, and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` object is created, and for each overridden member or enumeration, a `SoapAttributes` object is created with the appropriate property set and added to the `SoapAttributeOverrides` object. An `XmlMapping` object is created using the `SoapAttributeOverrides` object, and that `XmlMapping` object is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## XmlSerializer.XmlSerializer(Type, String) constructor

```csharp
public XmlSerializer (Type type, string? defaultNamespace);
```

Initializes a new instance of the `XmlSerializer` class that can serialize objects of the specified type into XML documents, and deserialize XML documents into objects of the specified type. Specifies the default namespace for all the XML elements.

Parameters:

- `type`: The type of the object that this `XmlSerializer` can serialize.
- `defaultNamespace`: The default namespace to use for all the XML elements.

#### Examples
The following example constructs an `XmlSerializer` that serializes an object named `Widget`. The example sets various properties of the object before calling the `XmlSerializer.Serialize` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/.ctor/source1.cs._
