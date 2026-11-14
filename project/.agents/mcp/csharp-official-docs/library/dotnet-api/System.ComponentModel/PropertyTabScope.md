---
title: "PropertyTabScope enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyTabScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyTabScope enum

Namespace: `System.ComponentModel`

```csharp
public enum PropertyTabScope
```

Defines identifiers that indicate the persistence scope of a tab in the Properties window.

#### Remarks

`PropertyTabScope` indicates the persistence scope of a tab that is displayed in the Properties window when a component of a design document has an associated `PropertyTabAttribute`.

#### Examples
The following code example demonstrates how to use `PropertyTabScope` to specify the scope of a property tab.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyTabAttribute/Overview/class1.cs._
## PropertyTabScope.Component field

```csharp
Component
```

This tab is specific to the current component. This tab is added to the Properties window for the current component only and is removed when the component is no longer selected.

## PropertyTabScope.Document field

```csharp
Document
```

This tab is specific to the current document. This tab is added to the Properties window and is removed when the currently selected document changes.

## PropertyTabScope.Global field

```csharp
Global
```

This tab is added to the Properties window and can only be removed explicitly by a parent component.

## PropertyTabScope.Static field

```csharp
Static
```

This tab is added to the Properties window and cannot be removed.
