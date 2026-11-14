---
title: "CreateDebuggingInterfaceFromVersion2 Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/createdebugginginterfacefromversion2-function.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CreateDebuggingInterfaceFromVersion2 function

Accepts a common language runtime (CLR) version string that is returned from the CreateVersionStringFromModule function, and returns a corresponding debugger interface (typically, ICorDebug).

## Syntax

```cpp
HRESULT CreateDebuggingInterfaceFromVersion2 (
    [in] int iDebuggerVersion,
    [in] LPCWSTR szDebuggeeVersion,
    [in] LPCWSTR szApplicationGroupId,
    [out] IUnknown** ppCordb,
);
```

## Parameters

 `iDebuggerVersion`\
 [in] The version of interface the debugger expects.

 `szDebuggeeVersion`\
 [in] Version string of the CLR in the target debuggee, which is returned by the CreateVersionStringFromModule function.

 `szApplicationGroupId`\
 [in] A string representing the application group ID of a sandboxed process running in macOS. Pass NULL if the process is not running in a sandbox on macOS or on other platforms.

 `ppCordb`\
 [out] Pointer to a pointer to a COM object (`IUnknown`). This object will be cast to an ICorDebug object before it is returned.

## Return value

 `S_OK`\
 `ppCordb` references a valid object that implements the ICorDebug interface interface.

 `E_INVALIDARG`\
 Either `szDebuggeeVersion` or `ppCordb` is null.

 `CORDBG_E_DEBUG_COMPONENT_MISSING`\
 A component that is necessary for CLR debugging cannot be located. Either _mscordbi.dll_ or _mscordaccore.dll_ was not found in the same directory as the target CoreCLR.dll.

 `CORDBG_E_INCOMPATIBLE_PROTOCOL`\
 Either mscordbi.dll or mscordaccore.dll is not the same version as the target CoreCLR.dll.

 `E_FAIL` (or other `E_` return codes)\
 Unable to return an ICorDebug interface.

## Remarks

 The interface that is returned provides the facilities for attaching to a CLR in a target process and debugging the managed code that the CLR is running.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 3.1
