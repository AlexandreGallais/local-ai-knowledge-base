---
title: "ICorDebugDataTarget2::EnumerateThreadIDs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-enumeratethreadids-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2::EnumerateThreadIDs Method

Returns a list of active thread IDs.

## Syntax

```cpp
HRESULT EnumerateThreadIDs(
    [in] ULONG32 cThreadIds,
    [out] ULONG32 *pcThreadIds,
    [out, size_is(cThreadIds), length_is(*pcThreadIds)] ULONG32 pThreadIds[]
);
```

## Parameters

cThreadIDs
 [in] The maximum number of threads whose IDs can be returned.

pcThreadIds
 [out] A pointer to a `ULONG32` that indicates the actual number of thread IDs written to the `pThreadIds` array.

pThreadIDs
An array of thread identifiers.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.**Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget2 Interface
