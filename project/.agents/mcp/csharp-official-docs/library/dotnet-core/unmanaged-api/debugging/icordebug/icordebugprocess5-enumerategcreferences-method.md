---
title: "ICorDebugProcess5::EnumerateGCReferences Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-enumerategcreferences-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::EnumerateGCReferences Method

Gets an enumerator for all objects that are to be garbage-collected in a process.

## Syntax

```cpp
HRESULT EnumerateGCReferences(
    [in] Bool enumerateWeakReferences,
    [out] ICorDebugGCReferenceEnum **ppEnum
);
```

## Parameters

 `enumerateWeakReferences`
 [in] A Boolean value that indicates whether weak references are also to be enumerated. If `enumerateWeakReferences` is `true`, the `ppEnum` enumerator includes both strong references and weak references. If `enumerateWeakReferences` is `false`, the enumerator includes only strong references.

 `ppEnum`
 [out] A pointer to the address of an ICorDebugGCReferenceEnum that is an enumerator for the objects to be garbage-collected.

## Remarks

This method provides a way to determine the full rooting chain for any managed object in a process and can be used to determine why an object is still alive.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
