---
title: "ICorDebug::DebugActiveProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-debugactiveprocess-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::DebugActiveProcess Method

Attaches the debugger to an existing process.

## Syntax

```cpp
HRESULT DebugActiveProcess (
    [in]  DWORD               id,
    [in]  BOOL                win32Attach,
    [out] ICorDebugProcess    **ppProcess
);
```

## Parameters

 `id`
 [in] The ID of the process to which the debugger is to be attached.

 `win32Attach`
 [in] Boolean value that is set to `true` if the debugger should behave as the Win32 debugger for the process and dispatch the unmanaged callbacks; otherwise, `false`.

 `ppProcess`
 [out] A pointer to the address of an "ICorDebugProcess" object that represents the process to which the debugger has been attached.

## Remarks

Interop debugging is not supported on Win9x and non-x86 platforms, such as IA-64-based and AMD64-based platforms.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
