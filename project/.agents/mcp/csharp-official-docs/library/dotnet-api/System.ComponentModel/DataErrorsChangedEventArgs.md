---
title: "DataErrorsChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DataErrorsChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataErrorsChangedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class DataErrorsChangedEventArgs : EventArgs
```

Provides data for the `INotifyDataErrorInfo.ErrorsChanged` event.

To be added.

## DataErrorsChangedEventArgs.DataErrorsChangedEventArgs(String) constructor

```csharp
public DataErrorsChangedEventArgs (string? propertyName);
```

Initializes a new instance of the `DataErrorsChangedEventArgs` class.

Parameters:

- `propertyName`: The name of the property that has an error.  `null` or `String.Empty` if the error is object-level.

To be added.

## DataErrorsChangedEventArgs.PropertyName property

```csharp
public virtual string? PropertyName { get; }
```

Gets the name of the property that has an error.

Returns: The name of the property that has an error. `null` or `String.Empty` if the error is object-level.

To be added.
