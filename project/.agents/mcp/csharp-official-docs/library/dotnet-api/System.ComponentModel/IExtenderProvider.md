---
title: "IExtenderProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IExtenderProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IExtenderProvider interface

Namespace: `System.ComponentModel`

```csharp
public interface IExtenderProvider
```

Defines the interface for extending properties to other components in a container.

#### Remarks
An extender provider is a component that provides properties to other components. For example, the `ToolTip` control is an extender provider. When you add a `ToolTip` control to a `Form`, all other controls on the form have a `ToolTip` property added to their list of properties.

Any component that provides extender properties must implement `IExtenderProvider`. A visual designer can then call `IExtenderProvider.CanExtend` to determine which objects in a container should receive the extender properties.

#### Examples
The following code example demonstrates how to implement the `IExtenderProvider` interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IExtenderProvider/Overview/HelpLabel.cs._

## IExtenderProvider.CanExtend(Object) method

```csharp
public bool CanExtend (object extendee);
```

Specifies whether this object can provide its extender properties to the specified object.

Parameters:

- `extendee`: The `Object` to receive the extender properties.

Returns: `true` if this object can provide extender properties to the specified object; otherwise, `false`.

#### Examples
The following code example demonstrates how to implement the `IExtenderProvider.CanExtend` property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IExtenderProvider/Overview/HelpLabel.cs._
