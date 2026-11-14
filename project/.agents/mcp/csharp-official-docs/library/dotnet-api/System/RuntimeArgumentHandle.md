---
title: "RuntimeArgumentHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/RuntimeArgumentHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeArgumentHandle struct

Namespace: `System`

```csharp
public ref struct RuntimeArgumentHandle
```

References a variable-length argument list.

#### Remarks
This structure has no members other than those that it inherits from the `Object` and `ValueType` classes. It exists only to support C/C++ programming language functions that take a variable number of parameters. An instance of the structure is passed to the `ArgIterator` constructor.
