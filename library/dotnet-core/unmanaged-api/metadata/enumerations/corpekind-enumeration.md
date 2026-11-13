---
title: "CorPEKind Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corpekind-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorPEKind Enumeration

Contains values that describe a portable executable (PE) file, as returned from a call to IMetaDataImport2::GetPEKind.

## Syntax

```cpp
typedef enum CorPEKind {

    peNot           = 0x00000000,
    peILonly        = 0x00000001,
    pe32BitRequired = 0x00000002,
    pe32Plus        = 0x00000004,
    pe32Unmanaged   = 0x00000008,
    pe32BitPreferred= 0x00000010

} CorPEKind;
```

## Members

| Member | Description |
|------------|-----------------|
| `peNot` | Indicates that this is not a PE file. |
| `peILOnly` | Indicates that this PE file contains only managed code. |
|`pe32BitRequired`|Indicates that this PE file makes Win32 calls.|
|`pe32Plus`|Indicates that this PE file runs on a 64-bit platform.|
|`pe32Unmanaged`| Indicates that this PE file is native code. |
|pe32BitPreferred|Indicates that this PE file is platform-neutral and prefers to be loaded in a 32-bit environment.|

## Remarks

 These values can be used in bitwise combinations.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h

 **.NET versions:** Available since .NET Framework 2.0
