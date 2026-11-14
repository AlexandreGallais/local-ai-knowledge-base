---
title: "BinaryData class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BinaryData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryData class (part 2 of 2)

## BinaryData.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to a string using UTF-8.

Returns: A string representation of the value of this instance.

#### Remarks

No special treatment is given to the contents of the data. It is merely decoded as a UTF-8 string.
For a JPEG or other binary file format, the string will largely be nonsense with many embedded NUL characters.
UTF-8 JSON values will look like their file or network representation,
including starting and stopping quotes on a string.

## BinaryData.WithMediaType(String) method

```csharp
public BinaryData WithMediaType (string? mediaType);
```

Creates a `BinaryData` instance by wrapping the same data and changing the `BinaryData.MediaType` to `mediaType`.

Parameters:

- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

Returns: A wrapper over the same data with specified `BinaryData.MediaType`.

To be added.
