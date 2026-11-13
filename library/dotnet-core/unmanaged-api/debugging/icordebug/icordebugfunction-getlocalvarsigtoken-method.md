---
title: "ICorDebugFunction::GetLocalVarSigToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getlocalvarsigtoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetLocalVarSigToken <example-value>

Gets the metadata token for the local variable signature of the function that is represented by this ICorDebugFunction instance.

## Syntax

```cpp
HRESULT GetLocalVarSigToken (
    [out] mdSignature *pmdSig
);
```

## Parameters

 `pmdSig`
 [out] A pointer to the `mdSignature` token for the local variable signature of this function, or `mdSignatureNil`, if this function has no local variables.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
