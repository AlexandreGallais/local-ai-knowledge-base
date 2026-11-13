---
title: "ICorDebugMergedAssemblyRecord::GetPublicKey Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getpublickey-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetPublicKey Method

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
