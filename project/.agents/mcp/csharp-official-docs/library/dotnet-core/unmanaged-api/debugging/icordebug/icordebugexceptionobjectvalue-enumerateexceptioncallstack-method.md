---
title: "ICorDebugExceptionObjectValue::EnumerateExceptionCallStack Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectvalue-enumerateexceptioncallstack-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugExceptionObjectValue::EnumerateExceptionCallStack Method

Gets an enumerator to the call stack embedded in an exception object.

## Syntax

```cpp
HRESULT EnumerateExceptionCallStack(
    [out] ICorDebugExceptionObjectCallStackEnum **ppCallStackEnum
);
```

## Parameters

ppCallStackEnum
 [out] A pointer to the address of an ICorDebugExceptionObjectCallStackEnum interface object that is a stack trace enumerator for a managed exception object.

## Remarks

If no call stack information is available, the method returns `S_OK`, and ICorDebugExceptionObjectCallStackEnum is a valid enumerator with a length of 0. If the method is unable to retrieve stack trace information, the return value is `E_FAIL` and no enumerator is returned.

The ICorDebugExceptionObjectCallStackEnum object is responsible for decoding the stack trace data from the `_stackTrace` field of the exception object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugExceptionObjectValue Interface
