---
title: "ICorDebugComObjectValue::GetCachedInterfacePointers Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcomobjectvalue-getcachedinterfacepointers-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugComObjectValue::GetCachedInterfacePointers Method

Gets the raw interface pointers cached on the current runtime callable wrapper (RCW).

## Syntax

```cpp
HRESULT GetCachedInterfacePointers(
    [in] BOOL bIInspectableOnly,
    [in] ULONG32 celt,
    [out] ULONG32 *pceltFetched,
    [out, size_is(celt), length_is(*pceltFetched) CORDB_ADDRESS *ptrs);
```

## Parameters

 `bIInspectableOnly`
 [in] A value that indicates whether the method will return only Windows Runtime interfaces (`IInspectable` interfaces) or all COM interfaces that are cached by the runtime callable wrapper (RCW).

 `celt`
 [in] The number of objects whose addresses are to be retrieved.

 `pceltFetched`
 [out] A pointer to the number of `CORDB_ADDRESS` values actually returned in `ptrs`.

 `ptrs`
A pointer to the starting address of an array of `CORDB_ADDRESS` values that contain the addresses of cached interface objects.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugComObjectValue Interface
