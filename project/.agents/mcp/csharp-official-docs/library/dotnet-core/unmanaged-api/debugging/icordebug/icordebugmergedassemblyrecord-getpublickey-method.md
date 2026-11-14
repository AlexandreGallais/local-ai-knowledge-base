---
title: "ICorDebugMergedAssemblyRecord::GetPublicKey Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getpublickey-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetPublicKey <example-value>

Gets the assembly's public key.

## Syntax

```cpp
HRESULT GetPublicKey(
   [in] ULONG32 cbPublicKey,
   [out] ULONG32 *pcbPublicKey,
   [out, size_is(cbPublicKey), length_is(*pcbPublicKey)] BYTE pbPublicKey[]);
```

## Parameters

 `cbPublicKey`
 [in] The maximum number of bytes in the `pbPublicKey` array.

 `pcbPublicKey`
 [out] A pointer to the actual number of bytes written to the `pbPublicKey` array.

 `pbPublicKey`
 [out] A pointer to a byte array that contains the assembly's public key.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
