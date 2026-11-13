---
title: "ICorDebugAssembly3::EnumerateContainedAssemblies Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly3-enumeratecontainedassemblies-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly3::EnumerateContainedAssemblies Method

Gets an enumerator for the assemblies contained in this assembly.

## Syntax

```cpp
HRESULT EnumerateContainedAssemblies(
    ICorDebugAssemblyEnum **ppAssemblies
);
```

## Parameters

 `ppAssemblies`
 [out] A pointer to the address of an ICorDebugAssemblyEnum interface object that is the enumerator.

## Return Value

 `S_OK` if this `ICorDebugAssembly3` object is a container; otherwise, `S_FALSE`, and the enumeration is empty.

## Remarks

Symbols are needed to enumerate the contained assemblies. If they aren't present, the method returns `S_FALSE`, and no valid enumerator is provided.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugAssembly3 Interface
