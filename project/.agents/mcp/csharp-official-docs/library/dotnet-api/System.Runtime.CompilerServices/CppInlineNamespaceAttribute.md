---
title: "CppInlineNamespaceAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CppInlineNamespaceAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CppInlineNamespaceAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CppInlineNamespaceAttribute : Attribute
```

Defines the inline namespace in C++/CLI.

#### Remarks
This attribute is used to implement C++ 11 inline namespaces in C++/CLI. The contents of the inline namespace are implicitly available in the enclosing namespace. Microsoft C++ compiler emits an assembly-level `CppInlineNamespaceAttribute` for every inline namespace in a C++/CLI assembly. For more information, see Inline namespaces (C++ 11).

## CppInlineNamespaceAttribute.CppInlineNamespaceAttribute(String) constructor

```csharp
public CppInlineNamespaceAttribute (string dottedName);
```

Initializes a new instance of the `CppInlineNamespaceAttribute` class with the specified dotted namespace name.

Parameters:

- `dottedName`: The dotted name of the defined namespace.

To be added.
