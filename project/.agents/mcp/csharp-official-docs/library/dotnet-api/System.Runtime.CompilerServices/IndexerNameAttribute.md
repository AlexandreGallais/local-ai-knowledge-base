---
title: "IndexerNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IndexerNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IndexerNameAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class IndexerNameAttribute : Attribute
```

Indicates the name by which an indexer is known in programming languages that do not support indexers directly.

#### Remarks
You can apply this attribute to properties.

This attribute is directly processed by the compiler, and cannot be accessed after compilation through Reflection.

The classes in `CompilerServices` are for compiler writers use only.

## IndexerNameAttribute.IndexerNameAttribute(String) constructor

```csharp
public IndexerNameAttribute (string indexerName);
```

Initializes a new instance of the `IndexerNameAttribute` class.

Parameters:

- `indexerName`: The name of the indexer, as shown to other languages.

To be added.
