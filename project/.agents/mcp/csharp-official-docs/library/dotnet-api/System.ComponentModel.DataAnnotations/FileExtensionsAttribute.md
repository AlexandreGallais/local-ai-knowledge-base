---
title: "FileExtensionsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/FileExtensionsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileExtensionsAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class FileExtensionsAttribute : System.ComponentModel.DataAnnotations.DataTypeAttribute
```

Validates file name extensions.

To be added.

## FileExtensionsAttribute.FileExtensionsAttribute() constructor

```csharp
public FileExtensionsAttribute ();
```

Initializes a new instance of the `FileExtensionsAttribute` class.

To be added.

## FileExtensionsAttribute.Extensions property

```csharp
public string Extensions { get; set; }
```

Gets or sets the file name extensions.

Returns: The file name extensions, or the default file extensions (".png", ".jpg", ".jpeg", and ".gif") if the property is not set.

To be added.

## FileExtensionsAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to an error message, based on the data field where the error occurred.

Parameters:

- `name`: The name of the field that caused the validation failure.

Returns: The formatted error message.

To be added.

## FileExtensionsAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## FileExtensionsAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks that the specified file name extension or extensions is valid.

Parameters:

- `value`: A comma delimited list of valid file extensions.

Returns: `true` if the file name extension is valid; otherwise, `false`.

To be added.
