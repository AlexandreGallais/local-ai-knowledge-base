---
title: "ICorDebugStackWalk::SetContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstackwalk-setcontext-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStackWalk::SetContext Method

Sets the ICorDebugStackWalk object’s current context to a valid context for the thread.

## Syntax

```cpp
HRESULT SetContext([in] CorDebugSetContextFlag flag,
                   [in] ULONG32 contextSize,
                   [in, size_is(contextSize)] BYTE context[]);
```

## Parameters

 `flag`
 [in] A CorDebugSetContextFlag flag that indicates whether the context is from the active frame on the stack, or a context obtained by unwinding the stack.

 `contextSize`
 [in] The allocated size of the `CONTEXT` buffer.

 `context`
 [in] The `CONTEXT` buffer.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The `ICorDebugStackWalk` object's context was successfully set.|
|E_FAIL|The `ICorDebugStackWalk` object's context was not set.|
|E_INVALIDARG|The context is null.|
|HRESULT_FROM_WIN32(ERROR_INSUFFICIENT_BUFFER)|The context buffer is too small.|

## Remarks

This method does not alter the current context of the thread.

Setting the current context to an invalid context may cause unpredictable results from the stack walker.

You can retrieve an exact bitwise copy of this context by immediately calling the ICorDebugStackWalk::GetContext method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
