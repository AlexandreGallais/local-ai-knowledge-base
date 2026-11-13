---
title: "ICorDebugILCode2::GetLocalVarSigToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode2-getlocalvarsigtoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILCode2::GetLocalVarSigToken Method

Gets the metadata token for the local variable signature for the function that is represented by this instance.

## Syntax

```cpp
HRESULT GetLocalVarSigToken(
   [out] mdSignature *pmdSig
);
```

## Parameters

 `pmdSig`
 [out] A pointer to the `mdSignature` token for the local variable signature for this function, or `mdSignatureNil` if there is no signature (that is, if the function doesn't have any local variables).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILCode2 Interface
