---
title: "LibraryImportAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/LibraryImportAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LibraryImportAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class LibraryImportAttribute : Attribute
```

Indicates that a source generator should create a function for marshalling arguments instead of relying on the runtime to generate an equivalent marshalling function at run time.

#### Remarks

This attribute is meaningless if the source generator associated with it is not enabled.

The current built-in source generator only supports C# and only supplies an implementation when applied to static, partial, non-generic methods.

## LibraryImportAttribute.LibraryImportAttribute(String) constructor

```csharp
public LibraryImportAttribute (string libraryName);
```

Initializes a new instance of the `LibraryImportAttribute`.

Parameters:

- `libraryName`: Name of the library containing the import.

To be added.

## LibraryImportAttribute.EntryPoint property

```csharp
public string? EntryPoint { get; set; }
```

Gets or sets the name of the entry point to be called.

Returns: To be added.

To be added.

## LibraryImportAttribute.LibraryName property

```csharp
public string LibraryName { get; }
```

Gets the name of the library containing the import.

Returns: To be added.

To be added.

## LibraryImportAttribute.SetLastError property

```csharp
public bool SetLastError { get; set; }
```

Gets or sets a value that specifies whether the callee sets an error (`SetLastError` on Windows or `errno` on other platforms) before returning from the attributed method.

Returns: To be added.

To be added.

## LibraryImportAttribute.StringMarshalling property

```csharp
public System.Runtime.InteropServices.StringMarshalling StringMarshalling { get; set; }
```

Gets or sets an object that specifies how to marshal string arguments to the method.

Returns: To be added.

#### Remarks

If this field is set to a value other than `Custom`, `StringMarshallingCustomType` must not be specified.

## LibraryImportAttribute.StringMarshallingCustomType property

```csharp
public Type? StringMarshallingCustomType { get; set; }
```

Gets or sets the `Type` used to control how string arguments to the method are marshalled.

Returns: To be added.

#### Remarks

If this field is specified, `StringMarshalling` must not be specified or must be set to `Custom`.
