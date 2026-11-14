---
title: "ProgIdAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ProgIdAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProgIdAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ProgIdAttribute : Attribute
```

Allows the user to specify the ProgID of a class.

#### Remarks
You can apply this attribute to classes.

ProgIDs are automatically generated for a class by combining the namespace with the type name. This can produce an invalid ProgID however, as ProgIDs are limited to 39 characters and can contain no punctuation other than a period. In such case, a ProgID can be manually assigned to the class using `ProgIdAttribute`.

#### Examples
The following example demonstrates how to apply `ProgIdAttribute` on a class. The application then gets all attributes of `MyClass`, and prints the `Value` property of `ProgIdAttribute`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ProgIdAttribute/Overview/progidattribute_value.cs._

## ProgIdAttribute.ProgIdAttribute(String) constructor

```csharp
public ProgIdAttribute (string progId);
```

Initializes a new instance of the `ProgIdAttribute` with the specified ProgID.

Parameters:

- `progId`: The ProgID to be assigned to the class.

To be added.

## ProgIdAttribute.Value property

```csharp
public string Value { get; }
```

Gets the ProgID of the class.

Returns: The ProgID of the class.

To be added.
