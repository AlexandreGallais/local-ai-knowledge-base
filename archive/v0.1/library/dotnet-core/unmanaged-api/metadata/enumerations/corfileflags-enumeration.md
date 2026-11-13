---
title: "CorFileFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corfileflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorFileFlags Enumeration

Contains values that describe the type of file defined in a call to IMetaDataAssemblyEmit::DefineFile.

## Syntax

```cpp
typedef enum CorFileFlags {

    ffContainsMetaData      =   0x0000,
    ffContainsNoMetaData    =   0x0001

} CorFileFlags;
```

## Members

| Member | Description |
|------------|-----------------|
| `ffContainsMetaData` | Indicates that the file is not a resource file. |
| `ffContainsNoMetaData` | Indicates that the file, possibly a resource file, does not contain metadata. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
