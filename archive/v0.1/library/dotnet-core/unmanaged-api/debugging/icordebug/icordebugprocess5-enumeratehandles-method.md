---
title: "ICorDebugProcess5::EnumerateHandles Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-enumeratehandles-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::EnumerateHandles Method

Gets an enumerator for object handles in a process.

## Syntax

```cpp
HRESULT EnumerateHandles(     [in] CorGCReferenceType types,
    [out] ICorDebugGCReferenceEnum **ppEnum);
```

## Parameters

 `types`
 [in] A bitwise combination of CorGCReferenceType values that specifies the type of handles to include in the collection.

 `ppENum`
 [out] A pointer to the address of an ICorDebugGCReferenceEnum that is an enumerator for the objects to be garbage-collected.

## Remarks

 `EnumerateHandles` is a helper function that supports inspection of the handle table. It is similar to the ICorDebugProcess5::EnumerateGCReferences method, except that rather than populating an ICorDebugGCReferenceEnum collection with all objects to be garbage-collected, it includes only objects that have handles from the handle table.

The `types` parameter specifies the handle types to include in the collection. `types` can be any of the following three members of the CorGCReferenceType enumeration:

- `CorHandleStrongOnly` (handles to strong references only).

- `CorHandleWeakOnly` (handles to weak references only).

- `CorHandleAll` (all handles).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
