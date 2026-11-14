---
title: "ICorDebugILCode2::GetLocalVarSigToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode2-getlocalvarsigtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILCode2::GetLocalVarSigToken <example-value>

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
