---
title: "ICorDebugController::Terminate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-terminate-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugController::Terminate Method

Terminates the process with the specified exit code.

> **Note:**
> This method is a wrapper for the Win32 `TerminateProcess` function. Thus, `Terminate` uses the exit code in the same way that the Win32 `TerminateProcess` function uses it.

## Syntax

```cpp
HRESULT Terminate (
    [in] UINT exitCode
);
```

## Parameters

 `exitCode`
 [in] A numeric value that is the exit code. The valid numeric values are defined in Winbase.h.

## Remarks

If the process is stopped when `Terminate` is called, the process should be continued by using the ICorDebugController::Continue method so that the debugger receives confirmation of the termination through the ICorDebugManagedCallback::ExitProcess or ICorDebugManagedCallback::ExitAppDomain callback.

> **Note:**
> This method is not implemented by an application domain. That is, it is not implemented at the `System.AppDomain` level.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
