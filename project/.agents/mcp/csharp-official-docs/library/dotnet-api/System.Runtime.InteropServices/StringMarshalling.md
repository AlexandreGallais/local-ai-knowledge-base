---
title: "StringMarshalling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/StringMarshalling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringMarshalling enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum StringMarshalling
```

Specifies how strings should be marshalled for generated p/invokes

To be added.

## StringMarshalling.Custom field

```csharp
Custom
```

Indicates a specific marshaller is supplied in `LibraryImportAttribute.StringMarshallingCustomType`.

## StringMarshalling.Utf16 field

```csharp
Utf16
```

Use the platform-provided UTF-16 marshaller.

## StringMarshalling.Utf8 field

```csharp
Utf8
```

Use the platform-provided UTF-8 marshaller.
