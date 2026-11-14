---
title: "RefreshProperties enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RefreshProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RefreshProperties enum

Namespace: `System.ComponentModel`

```csharp
public enum RefreshProperties
```

Defines identifiers that indicate the type of a refresh of the Properties window.

#### Remarks
`RefreshProperties` defines identifiers for types of refresh methods that can be used when refreshing the view of the Properties window.

#### Examples
The following example uses the `RefreshPropertiesAttribute` class to specify the refresh mode for a `DataSource` property. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## RefreshProperties.All field

```csharp
All
```

The properties should be requeried and the view should be refreshed.

## RefreshProperties.None field

```csharp
None
```

No refresh is necessary.

## RefreshProperties.Repaint field

```csharp
Repaint
```

The view should be refreshed.

To be added.
