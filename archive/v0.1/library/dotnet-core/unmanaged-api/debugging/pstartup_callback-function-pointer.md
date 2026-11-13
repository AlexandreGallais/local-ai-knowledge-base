---
title: "PSTARTUP_CALLBACK Function Pointer"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/pstartup_callback-function-pointer.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# PSTARTUP_CALLBACK function Pointer

Points to a function that's called when the .NET runtime has started for the RegisterForRuntimeStartup API.

## Syntax

```cpp
typedef VOID (*PSTARTUP_CALLBACK)(
    IUnknown *pCordb,
    PVOID parameter,
    HRESULT hr);
```

## Parameters

`pCordb`\
[in] Pointer to a pointer to a COM object (`IUnknown`). This object will be cast to an ICorDebug object before it's returned.

`parameter`\
[in] The `parameter` value passed to RegisterForRuntimeStartup.

`hr`\
[in] The result of the operation. The values are:

- `S_OK`: `pCordb` references a valid object that implements the ICorDebug interface interface.

- `CORDBG_E_DEBUG_COMPONENT_MISSING`: A component that is necessary for CLR debugging cannot be located. Either _mscordbi.dll_ or _mscordaccore.dll_ was not found in the same directory as the target CoreCLR.dll.

- `CORDBG_E_INCOMPATIBLE_PROTOCOL`: Either _mscordbi.dll_ or _mscordaccore.dll_ is not the same version as the target CoreCLR.dll.

- `E_FAIL` (or other `E_` return codes): Unable to return an ICorDebug interface.

## Remarks

The interface that's provided has the facilities for attaching to a CLR in a target process and debugging the managed code that the CLR is running.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
