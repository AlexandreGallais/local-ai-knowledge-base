---
title: "ICorDebugExceptionDebugEvent::GetStackPointer Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptiondebugevent-getstackpointer-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionDebugEvent::GetStackPointer Method

Gets the stack pointer for this exception debug event.

## Syntax

```cpp
HRESULT GetStackPointer(
   [out]CORDB_ADDRESS *pStackPointer
);
```

## Parameters

 `pStackPointer`
 [out] A pointer to the address of the stack pointer for this exception debug event. See the Remarks section for more information.

## Remarks

The meaning of this stack pointer depends on the event type, as shown in the following table.

|Event type|Meaning of `pStackPointer` value|
|----------------|--------------------------------------|
|MANAGED_EXCEPTION_FIRST_CHANCE|The stack pointer for the frame that threw the exception.|
|MANAGED_EXCEPTION_USER_FIRST_CHANCE|The stack pointer for the user-code frame closest to the point of the thrown exception.|
|MANAGED_EXCEPTION_CATCH_HANDLER_FOUND|The stack pointer for the frame that contains the catch handler.|
|MANAGED_EXCEPTION_UNHANDLED|`pStackPointer` is **null**.|

> **Note:**
> This method is available with .NET Native only.

The event type is available from the ICorDebugDebugEvent::GetEventKind method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugExceptionDebugEvent Interface
