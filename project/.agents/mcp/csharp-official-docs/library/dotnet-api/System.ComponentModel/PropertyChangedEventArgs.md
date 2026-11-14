---
title: "PropertyChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyChangedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class PropertyChangedEventArgs : EventArgs
```

Provides data for the `INotifyPropertyChanged.PropertyChanged` event.

#### Remarks
A `PropertyChanged` event is raised when a property is changed on a component. A `PropertyChangedEventArgs` object specifies the name of the property that changed.

`PropertyChangedEventArgs` provides the `PropertyName` property to get the name of the property that changed.

## PropertyChangedEventArgs.PropertyChangedEventArgs(String) constructor

```csharp
public PropertyChangedEventArgs (string? propertyName);
```

Initializes a new instance of the `PropertyChangedEventArgs` class.

Parameters:

- `propertyName`: The name of the property that changed.

#### Remarks
An `Empty` value or `null` for the `propertyName` parameter indicates that all of the properties have changed.

## PropertyChangedEventArgs.PropertyName property

```csharp
public virtual string? PropertyName { get; }
```

Gets the name of the property that changed.

Returns: The name of the property that changed.

#### Remarks
An `Empty` value or `null` for the `propertyName` parameter indicates that all of the properties have changed.
