---
title: "ICorDebugDataTarget::GetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget-getthreadcontext-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget::GetThreadContext Method

Returns the current thread context for the specified thread.

## Syntax

```cpp
HRESULT GetThreadContext(
       [in] DWORD dwThreadID,
       [in] ULONG32 contextFlags,
       [in] ULONG32 contextSize,
       [out, size_is(contextSize)] BYTE * pContext);
```

## Parameters

 `dwThreadID`
 [in] The identifier of the thread whose context is to be retrieved. The identifier is defined by the operating system.

 `contextFlags`
 [in] A bitwise combination of platform-dependent flags that indicate which portions of the context should be read.

 `contextSize`
 [in] The size of `pContext`.

 `pContext`
 [out] The buffer where the thread context will be stored.

## Remarks

On Windows platforms, `pContext` must be a `CONTEXT` structure (defined in WinNT.h) that is appropriate for the machine type specified by the ICorDebugDataTarget::GetPlatform method. `contextFlags` must have the same values as the `ContextFlags` field of the `CONTEXT` structure. The `CONTEXT` structure is processor-specific; refer to the WinNT.h file for details.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugDataTarget Interface
