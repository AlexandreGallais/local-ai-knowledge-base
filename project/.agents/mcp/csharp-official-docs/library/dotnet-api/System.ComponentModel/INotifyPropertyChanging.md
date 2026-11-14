---
title: "INotifyPropertyChanging interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/INotifyPropertyChanging.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INotifyPropertyChanging interface

Namespace: `System.ComponentModel`

```csharp
public interface INotifyPropertyChanging
```

Notifies clients that a property value is changing.

#### Remarks

The `INotifyPropertyChanging` interface is used to notify clients, typically binding clients, that a property value is changing.

## INotifyPropertyChanging.PropertyChanging event

```csharp
event System.ComponentModel.PropertyChangingEventHandler? PropertyChanging;
```

Occurs when a property value is changing.

To be added.
