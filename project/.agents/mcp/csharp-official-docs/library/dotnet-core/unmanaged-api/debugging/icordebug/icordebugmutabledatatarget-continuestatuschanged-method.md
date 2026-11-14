---
title: "ICorDebugMutableDataTarget::ContinueStatusChanged Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmutabledatatarget-continuestatuschanged-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMutableDataTarget::ContinueStatusChanged Method

Changes the continuation status for the outstanding debug event on the specified thread.

## Syntax

```cpp
HRESULT ContinueStatusChanged(
   [in] DWORD dwThreadId,
   [in] CORDB_CONTINUE_STATUS continueStatus);
```

## Parameters

 `dwThreadId`
The operating system-defined thread identifier.

 `continueStatus`
A COREDB_CONTINUE_STATUS value that represents the new requested continuation status.

## Remarks

The debugger calls the `ContinueStatusChanged` method when it calls an ICorDebug method that requires the current debug event to be handled in a way that is potentially different from the way in which it normally would be handled. For example, if there is an outstanding exception, and the debugger requests an operation that would cancel the exception (such as ICorDebugILFrame::SetIP or `FuncEval`), this API is used to request that the exception be cancelled.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMutableDataTarget Interface
