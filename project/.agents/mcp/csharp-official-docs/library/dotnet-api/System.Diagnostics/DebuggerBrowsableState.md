---
title: "DebuggerBrowsableState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerBrowsableState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerBrowsableState enum

Namespace: `System.Diagnostics`

```csharp
public enum DebuggerBrowsableState
```

Provides display instructions for the debugger.

#### Remarks
`DebuggerBrowsableState` is used to simplify the view in the debug window. Use of the `DebuggerDisplayAttribute` attribute using this enumeration can result in a much simpler and more pleasing view in the debug window. See the `DebuggerBrowsableAttribute` class for information on the use of this enumeration.

#### Examples
The following code example shows the use of the `DebuggerBrowsableState` enumeration to instruct the debugger to not display the root (property name) of the `Keys` property, but to display the elements of the array that `Keys` gets. This code example is part of a larger example provided for the `DebuggerDisplayAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DebuggerBrowsableAttribute/.ctor/program.cs._

## DebuggerBrowsableState.Collapsed field

```csharp
Collapsed
```

Show the element as collapsed.

## DebuggerBrowsableState.Never field

```csharp
Never
```

Never show the element.

## DebuggerBrowsableState.RootHidden field

```csharp
RootHidden
```

Do not display the root element; display the child elements if the element is a collection or array of items.
