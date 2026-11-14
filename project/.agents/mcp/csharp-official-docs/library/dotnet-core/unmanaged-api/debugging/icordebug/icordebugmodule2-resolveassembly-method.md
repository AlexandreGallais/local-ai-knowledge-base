---
title: "ICorDebugModule2::ResolveAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-resolveassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule2::ResolveAssembly Method

Resolves the assembly referenced by the specified metadata token.

## Syntax

```cpp
HRESULT ResolveAssembly (
    [in]  mdToken             <example-value>,
    [out] ICorDebugAssembly   **ppAssembly
);
```

## Parameters

`tkAssemblyRef`\
[in] An `mdToken` value that references the assembly.

`ppAssembly`\
[out] A pointer to the address of an ICorDebugAssembly object that represents the assembly.

## Remarks

If the assembly is not already loaded when `ResolveAssembly` is called, an HRESULT value of CORDBG_E_CANNOT_RESOLVE_ASSEMBLY is returned.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 2.0
