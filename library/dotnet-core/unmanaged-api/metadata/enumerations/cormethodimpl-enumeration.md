---
title: "CorMethodImpl Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/cormethodimpl-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorMethodImpl Enumeration

Contains values that describe method implementation features.

## Syntax

```cpp
typedef enum CorMethodImpl {

    miCodeTypeMask      =   0x0003,
    miIL                =   0x0000,
    miNative            =   0x0001,
    miOPTIL             =   0x0002,
    miRuntime           =   0x0003,

    miManagedMask       =   0x0004,
    miUnmanaged         =   0x0004,
    miManaged           =   0x0000,

    miForwardRef        =   0x0010,
    miPreserveSig       =   0x0080,

    miInternalCall      =   0x1000,
    miSynchronized      =   0x0020,
    miNoInlining        =   0x0008,
    miAggressiveInlining =  0x0100,
    miNoOptimization     =  0x0040,
    miMaxMethodImplVal  =   0xffff

} CorMethodImpl;
```

## Members

| Member | Description |
|------------|-----------------|
| `miCodeTypeMask` | Flags that describe code type. |
| `miIL` | Specifies that the method implementation is common intermediate language (CIL). |
| `miNative` | Specifies that the method implementation is native. |
| `miOPTIL` | Specifies that the method implementation is OPTIL. |
| `miRuntime` | Specifies that the method implementation is provided by the common language runtime. |
| `miManagedMask` | Flags that indicate whether the code is managed or unmanaged. |
| `miUnmanaged` | Specifies that the method implementation is unmanaged. |
| `miManaged` | Specifies that the method implementation is managed. |
| `miForwardRef` | Specifies that the method is defined. This flag is used primarily in merge scenarios. |
| `miPreserveSig` | Specifies that the method signature cannot be mangled for an HRESULT conversion. |
| `miInternalCall` | Reserved for internal use by the common language runtime. |
| `miSynchronized` |Specifies that the method is single-threaded through its body.|
| `miNoInlining` | Specifies that the method cannot be inlined. |
| `miAggressiveInlining` | Specifies that the method should be inlined if possible. |
| `miNoOptimization` | Specifies that the method should not be optimized. |
| `miMaxMethodImplVal` | The maximum valid value for a `CorMethodImpl`. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
