---
title: "IDataErrorInfo interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IDataErrorInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDataErrorInfo interface

Namespace: `System.ComponentModel`

```csharp
public interface IDataErrorInfo
```

Provides the functionality to offer custom error information that a user interface can bind to.

To be added.

## IDataErrorInfo.Error property

```csharp
public string Error { get; }
```

Gets an error message indicating what is wrong with this object.

Returns: An error message indicating what is wrong with this object. The default is an empty string ("").

To be added.

## IDataErrorInfo.Item property

```csharp
public string this[string columnName] { get; }
```

Gets the error message for the property with the given name.

Parameters:

- `columnName`: The name of the property whose error message to get.

Returns: The error message for the property. The default is an empty string ("").

To be added.
