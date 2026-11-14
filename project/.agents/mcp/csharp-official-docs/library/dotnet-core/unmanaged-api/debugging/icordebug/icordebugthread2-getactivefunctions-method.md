---
title: "ICorDebugThread2::GetActiveFunctions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-getactivefunctions-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread2::GetActiveFunctions Method

Gets information about the active function in each of this thread's frames.

## Syntax

```cpp
HRESULT GetActiveFunctions (
    [in]   ULONG32             cFunctions,
    [out]  ULONG32             *pcFunctions,
    [in, out, size_is(cFunctions), length_is(*pcFunctions)]
        COR_ACTIVE_FUNCTION    pFunctions[]
);
```

## Parameters

 `cFunctions`
 [in] The size of the `pFunctions` array.

 `pcFunctions`
 [out] A pointer to the number of objects returned in the `pFunctions` array. The number of objects returned will be equal to the number of managed frames on the stack.

 `pFunctions`
 [in, out] An array of COR_ACTIVE_FUNCTION objects, each of which contains information about the active functions in this thread's frames.

The first element will be used for the leaf frame, and so on back to the root of the stack.

## Remarks

If `pFunctions` is null on input, `GetActiveFunctions` returns only the number of functions that are on the stack. That is, If `pFunctions` is null on input, `GetActiveFunctions` returns a value only in `pcFunctions`.

The `GetActiveFunctions` method is intended as an optimization over getting the same information from frames in a stack trace, and includes only frames that would have had an ICorDebugILFrame object for them in the full stack trace.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
