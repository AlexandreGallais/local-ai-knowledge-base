---
title: "LIBRARY_PROVIDER_INDEX_TYPE Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/libraryproviderindextype-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LIBRARY_PROVIDER_INDEX_TYPE enumeration

The type of index information passed to the library provider is either the identity of the requested module or of the runtime (CoreCLR) module.

## Syntax

```cpp
typedef enum
{
    Unknown = 0,
    Identity = 1,
    Runtime = 2,
}  LIBRARY_PROVIDER_INDEX_TYPE;
```

## Members

| Member | Description |
|------------|-----------------|
| `Unknown` | Invalid index type. |
| `Identity` | The index information of the requested module. |
| `Runtime` | The runtime module's index information. |

## Remarks

The "index information" is the timestamp or file size on Windows, or the build ID on Linux and macOS.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET 6.0
