---
title: "CorAssemblyFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corassemblyflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorAssemblyFlags Enumeration

Contains values that describe the metadata applied to an assembly compilation.

## Syntax

```cpp
typedef enum CorAssemblyFlags {

    afPublicKey             =   0x0001,
    afPA_None               =   0x0000,
    afPA_MSIL               =   0x0010,
    afPA_x86                =   0x0020,
    afPA_IA64               =   0x0030,
    afPA_AMD64              =   0x0040,
    afPA_ARM                =   0x0050,
    afPA_ARM64              =   0x0060,
    afPA_NoPlatform         =   0x0070,
    afPA_Specified          =   0x0080,
    afPA_Mask               =   0x0070,
    afPA_FullMask           =   0x00F0,
    afPA_Shift              =   0x0004,

    afEnableJITcompileTracking  =   0x8000,
    afDisableJITcompileOptimizer=   0x4000,

    afRetargetable          =   0x0100,
    afContentType_Default        =   0x0000,
    afContentType_WindowsRuntime =   0x0200,
    afContentType_Mask           =   0x0E00,

} CorAssemblyFlags;
```

## Members

| Member        | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| `afPublicKey` | Indicates that the assembly reference holds the full, unhashed public key. |
| `afPA_None`   | Indicates that the processor architecture is unspecified.                  |
| `afPA_MSIL`   | Indicates that the processor architecture is neutral (PE32).               |
| `afPA_x86`    | Indicates that the processor architecture is x86 (PE32).                   |
| `afPA_IA64`   | Indicates that the processor architecture is Itanium (PE32+).              |
| `afPA_AMD64`  | Indicates that the processor architecture is x86-64 (PE32+).               |
| `afPA_ARM`    | Indicates that the processor architecture is ARM (PE32).                   |
| `afPA_ARM64`  | Indicates that the processor architecture is ARM64 (PE32+).                |
| `afPA_NoPlatform` |Indicates that the assembly is a reference assembly; that is, it applies to any architecture but cannot run on any architecture. Thus, the flag is the same as `afPA_Mask`.|
| `afPA_Specified` | Indicates that the processor architecture flags should be propagated to the `AssemblyRef` record. |
| `afPA_Mask` | A mask that describes the processor architecture. |
| `afPA_FullMask` | Specifies that the processor architecture description is included. |
| `afPA_Shift` | Indicates a shift count in the processor architecture flags to and from the index. |
| `afEnableJITcompileTracking` |Indicates the corresponding value from the `System.Diagnostics.DebuggableAttribute.DebuggingModes` of the `System.Diagnostics.DebuggableAttribute`.|
| `afDisableJITcompileOptimizer` |Indicates the corresponding value from the `System.Diagnostics.DebuggableAttribute.DebuggingModes` of the `System.Diagnostics.DebuggableAttribute`.|
| `afRetargetable` | Indicates that the assembly can be retargeted at runtime to an assembly from a different publisher. |
| `afContentType_Mask` | A mask that describes the content type. |
| `afContentType_Default` | Indicates the default content type. |
| `afContentType_WindowsRuntime` | Indicates the Windows Runtime content type. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
