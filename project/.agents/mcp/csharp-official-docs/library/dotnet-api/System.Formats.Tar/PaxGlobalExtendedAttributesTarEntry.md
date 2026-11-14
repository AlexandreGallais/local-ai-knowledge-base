---
title: "PaxGlobalExtendedAttributesTarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/PaxGlobalExtendedAttributesTarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PaxGlobalExtendedAttributesTarEntry class

Namespace: `System.Formats.Tar`

```csharp
public sealed class PaxGlobalExtendedAttributesTarEntry : System.Formats.Tar.PosixTarEntry
```

Represents a global extended attributes tar entry of the PAX format.

To be added.

## PaxGlobalExtendedAttributesTarEntry.PaxGlobalExtendedAttributesTarEntry(String>>) constructor

```csharp
public PaxGlobalExtendedAttributesTarEntry (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string>> globalExtendedAttributes);
```

Initializes a new `PaxGlobalExtendedAttributesTarEntry` instance with the specified global extended attributes enumeration.

Parameters:

- `globalExtendedAttributes`: An enumeration of string key-value pairs that represents the metadata to include as global extended attributes.

Exceptions:

- `ArgumentNullException`: `globalExtendedAttributes` is `null`.

To be added.

## PaxGlobalExtendedAttributesTarEntry.GlobalExtendedAttributes property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,string> GlobalExtendedAttributes { get; }
```

Returns the global extended attributes stored in this entry.

Returns: To be added.

To be added.
