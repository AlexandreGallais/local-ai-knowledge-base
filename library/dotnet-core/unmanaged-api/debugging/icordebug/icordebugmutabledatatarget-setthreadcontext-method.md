---
title: "ICorDebugMutableDataTarget::SetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmutabledatatarget-setthreadcontext-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMutableDataTarget::SetThreadContext Method

Sets the context (register values) for a thread.

## Syntax

```cpp
HRESULT SetThreadContext(
   [in] DWORD dwThreadID,
   [in] ULONG32 contextSize,   [in, size_is(contextSize)] const BYTE * pContext);
```

## Parameters

 `dwThreadID`
 [in] The operating system-defined thread identifier.

 `contextSize`
 [in] The size of the `pContext` buffer to be written.

 `pContext`
 [in] A pointer to the bytes to be written.

## Remarks

The `SetThreadContext` method updates the current context for the thread specified by the operating system-defined `dwThreadID` argument. The format of the context record is determined by the platform indicated by the ICorDebugDataTarget::GetPlatform method. On Windows, this is a CONTEXT structure.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMutableDataTarget Interface
