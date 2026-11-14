---
title: "XmlQualifiedName class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlQualifiedName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlQualifiedName class

Namespace: `System.Xml`

```csharp
public class XmlQualifiedName
```

Represents an XML qualified name.

#### Remarks
An XML qualified name is a namespace qualified local name in the format of `namespace:localname`.

Because prefixes are only required when XML is persisted or read, they are irrelevant for `XmlQualifiedName` objects. This class assumes that prefixes are irrelevant. It is the responsibility of the user to ensure the local name does not contain a ":".

#### Examples
For an example using the `XmlQualifiedName` class, see `XmlSchemaAll`.

## XmlQualifiedName.XmlQualifiedName() constructor

```csharp
public XmlQualifiedName ();
```

Initializes a new instance of the `XmlQualifiedName` class.

#### Remarks
The object created has no name or namespace defined.

## XmlQualifiedName.XmlQualifiedName(String) constructor

```csharp
public XmlQualifiedName (string? name);
```

Initializes a new instance of the `XmlQualifiedName` class with the specified name.

Parameters:

- `name`: The local name to use as the name of the `XmlQualifiedName` object.

#### Remarks
The object created does not have a namespace defined.

## XmlQualifiedName.XmlQualifiedName(String, String) constructor

```csharp
public XmlQualifiedName (string? name, string? ns);
```

Initializes a new instance of the `XmlQualifiedName` class with the specified name and namespace.

Parameters:

- `name`: The local name to use as the name of the `XmlQualifiedName` object.
- `ns`: The namespace for the `XmlQualifiedName` object.

To be added.

## XmlQualifiedName.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value indicating whether the `XmlQualifiedName` is empty.

Returns: `true` if name and namespace are empty strings; otherwise, `false`.

To be added.

## XmlQualifiedName.Name property

```csharp
public string Name { get; }
```

Gets a string representation of the qualified name of the `XmlQualifiedName`.

Returns: A string representation of the qualified name or String.Empty if a name is not defined for the object.

To be added.

## XmlQualifiedName.Namespace property

```csharp
public string Namespace { get; }
```

Gets a string representation of the namespace of the `XmlQualifiedName`.

Returns: A string representation of the namespace or String.Empty if a namespace is not defined for the object.

To be added.

## XmlQualifiedName.Equals(Object) method

```csharp
public override bool Equals (object? other);
```

Determines whether the specified `XmlQualifiedName` object is equal to the current `XmlQualifiedName` object.

Parameters:

- `other`: The `XmlQualifiedName` to compare.

Returns: `true` if the two are the same instance object; otherwise, `false`.

To be added.

## XmlQualifiedName.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the `XmlQualifiedName`.

Returns: A hash code for this object.

To be added.

## XmlQualifiedName.op_Equality(XmlQualifiedName, XmlQualifiedName) method

```csharp
public static bool operator == (System.Xml.XmlQualifiedName? a, System.Xml.XmlQualifiedName? b);
```

Compares two `XmlQualifiedName` objects.

Parameters:

- `a`: An `XmlQualifiedName` to compare.
- `b`: An `XmlQualifiedName` to compare.

Returns: `true` if the two objects have the same name and namespace values; otherwise, `false`.

The equivalent method for this operator is `Equals`

## XmlQualifiedName.op_Inequality(XmlQualifiedName, XmlQualifiedName) method

```csharp
public static bool operator != (System.Xml.XmlQualifiedName? a, System.Xml.XmlQualifiedName? b);
```

Compares two `XmlQualifiedName` objects.

Parameters:

- `a`: An `XmlQualifiedName` to compare.
- `b`: An `XmlQualifiedName` to compare.

Returns: `true` if the name and namespace values for the two objects differ; otherwise, `false`.

The equivalent method for this operator is `Equals`

## XmlQualifiedName.ToString() method

```csharp
public override string ToString ();
```

Returns the string value of the `XmlQualifiedName`.

Returns: The string value of the `XmlQualifiedName` in the format of `namespace:localname`. If the object does not have a namespace defined, this method returns just the local name.

To be added.

## XmlQualifiedName.ToString(String, String) method

```csharp
public static string ToString (string name, string? ns);
```

Returns the string value of the `XmlQualifiedName`.

Parameters:

- `name`: The name of the object.
- `ns`: The namespace of the object.

Returns: The string value of the `XmlQualifiedName` in the format of `namespace:localname`. If the object does not have a namespace defined, this method returns just the local name.

To be added.

## XmlQualifiedName.Empty field

```csharp
public static readonly System.Xml.XmlQualifiedName Empty;
```

Provides an empty `XmlQualifiedName`.

To be added.
