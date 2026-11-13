---
title: "CorLinkerOptions Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corlinkeroptions-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorLinkerOptions Enumeration

Specifies flags to select options for the metadata linker.

## Syntax

```cpp
typedef enum CorLinkerOptions {
    MDAssembly          = 0x00000000,
    MDNetModule         = 0x00000001,
} CorLinkerOptions;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDAssembly` | The private types and global functions are not preserved. |
| `MDNetModule` | The private types and global functions are preserved. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
