---
title: "ICorDebugRegisterSet::GetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-getthreadcontext-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet::GetThreadContext Method

Gets the context of the current thread.

## Syntax

```cpp
HRESULT GetThreadContext(
    [in] ULONG32 contextSize,
    [in, out, length_is(contextSize),
        size_is(contextSize)] BYTE context[]
);
```

## Parameters

 `contextSize`
 [in] The size, in bytes, of the `context` array.

 `context`
 [in, out] An array of bytes that compose the Win32 `CONTEXT` structure for the current platform.

## Remarks

The debugger should call this function instead of the Win32 `GetThreadContext` function, because the thread may be in a "hijacked" state where its context has been temporarily changed. The data returned is a Win32 `CONTEXT` structure for the current platform.

For non-leaf frames, clients should check which registers are valid by using ICorDebugRegisterSet::GetRegistersAvailable.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugRegisterSet Interface
- ICorDebugRegisterSet2 Interface
