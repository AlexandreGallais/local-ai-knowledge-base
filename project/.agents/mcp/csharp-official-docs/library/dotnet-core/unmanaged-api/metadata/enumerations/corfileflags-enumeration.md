---
title: "CorFileFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corfileflags-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
