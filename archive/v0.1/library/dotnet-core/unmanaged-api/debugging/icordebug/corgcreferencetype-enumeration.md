---
title: "CorGCReferenceType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/corgcreferencetype-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorGCReferenceType Enumeration

Identifies the source of an object to be garbage-collected.

## Syntax

```cpp
typedef enum {
    CorHandleStrong = 1,
    CorHandleStrongPinning = 2,
    CorHandleWeakShort = 4,
    CorHandleWeakRefCount = 8,
    CorHandleStrongRefCount = 32,
    CorHandleStrongDependent = 64,
    CorHandleStrongAsyncPinned = 128,
    CorHandleStrongSizedByref = 256,
    CorHandleWeakWinRT = 512,

    CorReferenceStack = 0x80000001,
    CorReferenceFinalizer = 80000002,  // Note the constant is decimal, not hexadecimal

    CorHandleStrongOnly = 0x1E3,
    CorHandleWeakOnly = 0xC,
    CorHandleAll = 0x7FFFFFFF
} CorGCReferenceType;
```

## Members

| Member name                  | Description                                                               |
|------------------------------|---------------------------------------------------------------------------|
| `CorHandleStrong`            | A handle to a strong reference from the object handle table.              |
| `CorHandleStrongPinning`     | A handle to a pinned strong reference from the object handle table.       |
| `CorHandleWeakShort`         | A handle to a weak reference from the object handle table.                |
| `CorHandleWeakRefCount`      | A handle to a weak reference-counted object from the object handle table. |
| `CorHandleStrongRefCount`    | A handle to a reference-counted object from the object handle table.      |
| `CorHandleStrongDependent`   | A handle to a dependent object from the object handle table.              |
| `CorHandleStrongAsyncPinned` | An asynchronous pinned object from the object handle table.               |
|`CorHandleStrongSizedByref`|A strong handle that keeps an approximate size of the collective closure of all objects and object roots at garbage collection time.|
|`CorHandleWeakWinRT`|A weak handle to a RCW (Runtime Callable Wrapper). An RCW is a managed object that proxies calls to an underlying COM object.|
|`CorReferenceStack`|A reference from the managed stack.|
|`CorReferenceFinalizer`|A reference from the finalizer queue.|
|CorHandleStrongOnly|Return only strong references from the handle table. This value is used by the ICorDebugProcess5::EnumerateHandles method only.|
|`CorHandleWeakOnly`|Return only weak references from the handle table. This value is used by the ICorDebugProcess5::EnumerateHandles method only.|
|`CorHandleAll`|Return all references from the handle table. This value is used by the ICorDebugProcess5::EnumerateHandles method only.|

## Remarks

 The `CorGCReferenceType` enumeration is used as follows:

- As the value of the `type` field of the COR_GC_REFERENCE structure, it indicates the source of a reference or handle.
- As the `types` argument to the ICorDebugProcess5::EnumerateHandles method, it specifies the types of handles to include in the enumeration.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
