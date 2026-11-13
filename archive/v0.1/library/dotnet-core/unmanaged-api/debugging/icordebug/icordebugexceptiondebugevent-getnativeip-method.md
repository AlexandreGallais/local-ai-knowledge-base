---
title: "ICorDebugExceptionDebugEvent::GetNativeIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptiondebugevent-getnativeip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionDebugEvent::GetNativeIP Method

Gets the native instruction pointer for this exception debug event.

## Syntax

```cpp
HRESULT GetNativeIP(
   [out]CORDB_ADDRESS *pIP
);
```

## Parameters

 `pIP`
 [out] A pointer to the instruction pointer for this exception debug event. See the Remarks section for more information.

## Remarks

The meaning of this instruction pointer depends on the event type, as shown in the following table.

|Event type|Meaning of `pStackPointer` value|
|----------------|--------------------------------------|
|MANAGED_EXCEPTION_FIRST_CHANCE|The address of the faulting instruction.|
|MANAGED_EXCEPTION_USER_FIRST_CHANCE|The code address in the frame indicated by the GetStackPointer method where execution would resume if no exception had been raised. The exception may or may not cause different code, such as the catch block of a `try/catch/finally` clause, to be executed in this frame.|
|MANAGED_EXCEPTION_CATCH_HANDLER_FOUND|The code address where `catch` handler execution will start in the frame indicated by the GetStackPointer method.|
|MANAGED_EXCEPTION_UNHANDLED|`pIP` is 0.|

The event type is available from the ICorDebugDebugEvent::GetEventKind method.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugExceptionDebugEvent Interface
