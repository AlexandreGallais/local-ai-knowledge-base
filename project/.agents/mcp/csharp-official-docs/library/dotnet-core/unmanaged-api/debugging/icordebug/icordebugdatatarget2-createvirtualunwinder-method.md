---
title: "ICorDebugDataTarget2::CreateVirtualUnwinder Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-createvirtualunwinder-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2::CreateVirtualUnwinder Method

Creates a new stack unwinder that starts unwinding from an initial context (which isn't necessarily the leaf of a thread).

## Syntax

```cpp
HRESULT CreateVirtualUnwinder(
    [in] DWORD nativeThreadID,
    [in] ULONG32 contextFlags,
    [in] ULONG32 cbContext,
    [in, size_is(cbContext)] BYTE initialContext[],
    [out] ICorDebugVirtualUnwinder ** ppUnwinder);
};
```

## Parameters

nativeThreadID
 [in] The native thread ID of the thread whose stack is to be unwound.

contextFlags
 [in] Flags that specify which parts of the context are defined in `initialContext`.

cbContext
 [in] The size of `initialContext`.

initialContext
 [in] The data in the context.

ppUnwinder
 [out] A pointer to the address of an ICorDebugVirtualUnwinder interface object.

## Return Value

 `S_OK` if successful. Any other `HRESULT` indicates failure. Any failing `HRESULT` received by mscordbi is considered fatal and causes ICorDebug methods to return `CORDBG_E_DATA_TARGET_ERROR`.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget2 Interface
