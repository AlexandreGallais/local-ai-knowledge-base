---
title: "ICorDebugProcess6::MarkDebuggerAttached Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-markdebuggerattached-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess6::MarkDebuggerAttached Method

Changes the internal state of the debugee so that the `System.Diagnostics.Debugger.IsAttached*` method returns `true`.

## Syntax

```cpp
HRESULT MarkDebuggerAttached(
    BOOL fIsAttached
);
```

## Parameters

 `fIsAttached`
 `true` if the `System.Diagnostics.Debugger.IsAttached*` method should indicate that a debugger is attached; `false` otherwise.

## Return Value

The method can return the values listed in the following table.

|Return value|Description|
|------------------|-----------------|
|`S_OK`|The debuggee was successfully updated.|
|`CORDBG_E_MODULE_NOT_LOADED`|The assembly that contains the `System.Diagnostics.Debugger.IsAttached*` method is not loaded, or some other error, such as missing metadata, is preventing it from being recognized. This error is common and benign. You should call the method again when additional assemblies load.|
|Other failing `HRESULT` values.|Other values likely indicate misbehaving debugger or compiler components.|

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess6 Interface
