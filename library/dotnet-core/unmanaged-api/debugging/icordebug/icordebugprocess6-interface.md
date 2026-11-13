---
title: "ICorDebugProcess6 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess6 Interface

Logically extends the ICorDebugProcess interface to enable features such as decoding managed debug events that are encoded in native exception debug events and virtual module splitting.

## Methods

|Method|Description|
|------------|-----------------|
|DecodeEvent Method|Decodes managed debug events that have been encapsulated in the payload of specially crafted native exception debug events.|
|EnableVirtualModuleSplitting Method|Enables or disables virtual module splitting.|
|GetCode Method|Gets information about the managed code at a particular code address.|
|GetExportStepInfo Method|Provides information on runtime exported functions to help step through managed code.|
|MarkDebuggerAttached Method|Changes the internal state of the debugee so that the `System.Diagnostics.Debugger.IsAttached*` method returns `true`.|
|ProcessStateChanged Method|Notifies ICorDebug that the process is running.|

## Remarks

> **Note:**
> The interface is available with .NET Native only. Attempting to call `QueryInterface` to retrieve an interface pointer returns `E_NOINTERFACE` for ICorDebug scenarios outside of .NET Native.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
