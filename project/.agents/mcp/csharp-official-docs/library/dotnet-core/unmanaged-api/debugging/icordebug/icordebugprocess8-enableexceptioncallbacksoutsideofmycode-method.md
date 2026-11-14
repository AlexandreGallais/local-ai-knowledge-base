---
title: "ICorDebugProcess8::EnableExceptionCallbacksOutsideOfMyCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess8-enableexceptioncallbacksoutsideofmycode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess8::EnableExceptionCallbacksOutsideOfMyCode Method

Enables or disables certain types of ICorDebugManagedCallback2 exception callbacks.

## Syntax

```cpp
HRESULT EnableExceptionCallbacksOutsideOfMyCode(
   [in] BOOL enableExceptionsOutsideOfJMC
);
```

## Parameters

 `enableExceptionsOutsideOfJMC`
 [in]

## Remarks

If the value of `enableExceptionsOutsideOfJMC` is `false`:

- A DEBUG_EXCEPTION_FIRST_CHANCE exception will not result in a callback to the debugger.

- A DEBUG_EXCEPTION_CATCH_HANDLER_FOUND exception will not result in a callback to the debugger if the exception never escapes into user code (that is, the path from an exception origin to an exception handler has no methods marked as JustMyCode, or JMC).

The default value of `enableExceptionsOutsideOfJMC` is `true`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess8 Interface
