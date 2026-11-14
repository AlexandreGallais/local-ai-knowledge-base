---
title: "IRaiseItemChangedEvents interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IRaiseItemChangedEvents.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IRaiseItemChangedEvents interface

Namespace: `System.ComponentModel`

```csharp
public interface IRaiseItemChangedEvents
```

Indicates whether a class converts property change events to `IBindingList.ListChanged` events.

#### Remarks
The `IRaiseItemChangedEvents` interface is typically implemented together with the `IBindingList` interface and indicates that the list converts property change events to `ListChanged` events.

You rarely need to implement the `IRaiseItemChangedEvents` interface. However, for performance purposes, your data source should implement `IRaiseItemChangedEvents` if it provides the functionality described previously, and your data source is interacting with the `BindingSource` component, because this functionality is built into the `BindingSource`.

## IRaiseItemChangedEvents.RaisesItemChangedEvents property

```csharp
public bool RaisesItemChangedEvents { get; }
```

Gets a value indicating whether the `IRaiseItemChangedEvents` object raises `IBindingList.ListChanged` events.

Returns: `true` if the `IRaiseItemChangedEvents` object raises `IBindingList.ListChanged` events when one of its property values changes; otherwise, `false`.

To be added.
