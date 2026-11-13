---
title: "CorFileMapping Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corfilemapping-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorFileMapping Enumeration

Contains values that describe the type of file mapping that is returned from a call to the IMetaDataInfo::GetFileMapping method.

## Syntax

```cpp
typedef enum CorFileMapping {

    fmFlat                  =   0x0000,
    fmExecutableImage       =   0x0001

} CorFileMapping;
```

## Members

| Member | Description |
|------------|-----------------|
| `fmFlat` |The file is mapped as a data file. That is, the `SEC_IMAGE` flag was not passed to the Microsoft Win32 `CreateFileMapping` function.|
| `fmExecutableImage` | The file is mapped for execution, by using either the `LoadLibrary` function or the `CreateFileMapping` function with the `SEC_IMAGE` flag. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h

 **.NET versions:** Available since .NET Framework 4.0

## See also

- GetFileMapping Method
