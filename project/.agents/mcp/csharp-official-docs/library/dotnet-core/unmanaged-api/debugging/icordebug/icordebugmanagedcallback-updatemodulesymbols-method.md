---
title: "ICorDebugManagedCallback::UpdateModuleSymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-updatemodulesymbols-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::UpdateModuleSymbols Method

Notifies the debugger that the symbols for a common language runtime module have changed.

## Syntax

```cpp
HRESULT UpdateModuleSymbols (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugModule    *pModule,
    [in] IStream            *pSymbolStream
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the module in which the symbols have changed.

 `pModule`
 [in] A pointer to an ICorDebugModule object that represents the module in which the symbols have changed.

 `pSymbolStream`
 [in] A pointer to a Win32 COM `IStream` object that contains the modified symbols.

## Remarks

This method provides an opportunity to update the debugger's view of a module's symbols by calling ISymUnmanagedReader::UpdateSymbolStore or ISymUnmanagedReader::ReplaceSymbolStore.

This callback can occur multiple times for the same module.

A debugger should try to bind unbound source-level breakpoints.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
