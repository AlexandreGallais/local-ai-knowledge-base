---
title: "RefreshEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RefreshEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RefreshEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class RefreshEventArgs : EventArgs
```

Provides data for the `TypeDescriptor.Refreshed` event.

#### Remarks
Typically, component information does not change for the life of a process. During design time, however, you can change the component's properties or events. As a result, the component's information in `TypeDescriptor` becomes out-of-date, and a `Refreshed` event is raised. A `Refreshed` event is also raised when a `Type` is changed during design time.

A `RefreshEventArgs` object specifies the data associated with the `Refreshed` event; that is, the component and the type of component that changed.

The `RefreshEventArgs` class provides `RefreshEventArgs.ComponentChanged` and `RefreshEventArgs.TypeChanged` properties to get the component or type that raised the event.

#### Examples
For an example of the `RefreshEventArgs` class, see the sample code in the `RefreshEventHandler` delegate.

## RefreshEventArgs.RefreshEventArgs(Object) constructor

```csharp
public RefreshEventArgs (object? componentChanged);
```

Initializes a new instance of the `RefreshEventArgs` class with the component that has changed.

Parameters:

- `componentChanged`: The component that changed.

To be added.

## RefreshEventArgs.RefreshEventArgs(Type) constructor

```csharp
public RefreshEventArgs (Type? typeChanged);
```

Initializes a new instance of the `RefreshEventArgs` class with the type of component that has changed.

Parameters:

- `typeChanged`: The `Type` that changed.

To be added.

## RefreshEventArgs.ComponentChanged property

```csharp
public object? ComponentChanged { get; }
```

Gets the component that changed its properties, events, or extenders.

Returns: The component that changed its properties, events, or extenders, or `null` if all components of the same type have changed.

To be added.

## RefreshEventArgs.TypeChanged property

```csharp
public Type? TypeChanged { get; }
```

Gets the `Type` that changed its properties or events.

Returns: The `Type` that changed its properties or events.

To be added.
