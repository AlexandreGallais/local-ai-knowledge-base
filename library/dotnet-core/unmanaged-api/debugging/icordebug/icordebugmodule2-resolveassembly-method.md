---
title: "ICorDebugModule2::ResolveAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-resolveassembly-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
