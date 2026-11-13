---
title: "ICorDebugModule3::CreateReaderForInMemorySymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule3-createreaderforinmemorysymbols-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule3::CreateReaderForInMemorySymbols Method

Creates a debug symbol reader for a dynamic module.

## Syntax

```cpp
HRESULT CreateReaderForInMemorySymbols (
      [in] REFIID riid,
      [out][iid_is(riid)] void **    ppObj
```

## Parameters

`riid`\
[in] The IID of the COM interface to return. Typically, this is an ISymUnmanagedReader Interface.

`ppObj`\
[out] Pointer to a pointer to the returned interface.

## Return Value

`S_OK`\
Successfully created the reader.

`CORDBG_E_MODULE_LOADED_FROM_DISK`\
The module is not an in-memory or dynamic module.

`CORDBG_E_SYMBOLS_NOT_AVAILABLE`\
Symbols have not been supplied by the application or are not yet available.

`E_FAIL` (or other `E_` return codes)\
Unable to create the reader.

## Remarks

This method can also be used to create a symbol reader object for in-memory (non-dynamic) modules, but only after the symbols are first available (indicated by the UpdateModuleSymbols Method callback).

This method returns a new reader instance every time it is called (like CComPtrBase::CoCreateInstance). Therefore, the debugger should cache the result and request a new instance only when the underlying data may have changed (that is, when a LoadClass Method callback is received).

Dynamic modules do not have any symbols available until the first type has been loaded (as indicated by the LoadClass Method callback).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
