---
title: "ICorDebugFunction::GetLocalVarSigToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getlocalvarsigtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
