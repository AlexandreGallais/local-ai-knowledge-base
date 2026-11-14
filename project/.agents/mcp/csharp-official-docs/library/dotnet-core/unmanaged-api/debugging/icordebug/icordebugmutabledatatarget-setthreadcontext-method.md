---
title: "ICorDebugMutableDataTarget::SetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmutabledatatarget-setthreadcontext-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
