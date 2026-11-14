---
title: "XmlImplementation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlImplementation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlImplementation class

Namespace: `System.Xml`

```csharp
public class XmlImplementation
```

Defines the context for a set of `XmlDocument` objects.

#### Remarks
`XmlDocument` objects that are created from the same implementation share the same `XmlNameTable`. This enables users to compare attribute and element names between the objects more efficiently.

Although the `XmlDocument` objects share the same implementation, to move nodes from one document to another, you must use the `XmlDocument.ImportNode` method.

## XmlImplementation.XmlImplementation() constructor

```csharp
public XmlImplementation ();
```

Initializes a new instance of the `XmlImplementation` class.

To be added.

## XmlImplementation.XmlImplementation(XmlNameTable) constructor

```csharp
public XmlImplementation (System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlImplementation` class with the `XmlNameTable` specified.

Parameters:

- `nt`: An `XmlNameTable` object.

To be added.

## XmlImplementation.CreateDocument() method

```csharp
public virtual System.Xml.XmlDocument CreateDocument ();
```

Creates a new `XmlDocument`.

Returns: The new `XmlDocument` object.

#### Remarks
`XmlDocument` objects created from the same implementation share the same name table. This enables users to compare attribute and element names between the objects more efficiently.

Although the `XmlDocument` objects share the same implementation, to move nodes from one document to another, you must use the `XmlDocument.ImportNode` method.

#### Examples
The following example creates two `XmlDocument` objects from the same implementation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlImplementation/CreateDocument/source.cs._

## XmlImplementation.HasFeature(String, String) method

```csharp
public bool HasFeature (string strFeature, string strVersion);
```

Tests if the Document Object Model (DOM) implementation implements a specific feature.

Parameters:

- `strFeature`: The package name of the feature to test. This name is not case-sensitive.
- `strVersion`: This is the version number of the package name to test. If the version is not specified (`null`), supporting any version of the feature causes the method to return `true`.

Returns: `true` if the feature is implemented in the specified version; otherwise, `false`.

The following table shows the combinations that cause `HasFeature` to return `true`.

-  XML

:  1.0

-  XML

:  2.0

To be added.
