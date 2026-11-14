---
title: "DebuggerHiddenAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerHiddenAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerHiddenAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerHiddenAttribute : Attribute
```

Specifies the `DebuggerHiddenAttribute`. This class cannot be inherited.

#### Remarks
The common language runtime attaches no semantics to this attribute. It is provided for use by source code debuggers. For example, the Visual Studio 2005 debugger does not stop in a method marked with this attribute and does not allow a breakpoint to be set in the method. Other debugger attributes recognized by the Visual Studio 2005 debugger are the `DebuggerNonUserCodeAttribute` and the `DebuggerStepThroughAttribute`.

For more information about using attributes, see Attributes.

## DebuggerHiddenAttribute.DebuggerHiddenAttribute() constructor

```csharp
public DebuggerHiddenAttribute ();
```

Initializes a new instance of the `DebuggerHiddenAttribute` class.

To be added.
