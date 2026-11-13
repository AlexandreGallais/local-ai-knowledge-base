---
title: "ICorDebugMergedAssemblyRecord::GetPublicKeyToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getpublickeytoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetPublicKeyToken Method

Gets the assembly's public key token.

## Syntax

```cpp
HRESULT GetPublicKeyToken(
   [in] ULONG32 cbPublicKeyToken,
   [out] ULONG32 *pcbPublicKeyToken,
   [out, size_is(cbPublicKeyToken), length_is(*pcbPublicKeyToken)] BYTE pbPublicKeyToken[]
);
```

## Parameters

 `cbPublicKeyToken`
 [in] The maximum number of bytes in the `pbPublicKeyToken` array.

 `pcbPublicKeyToken`
 [out] A pointer to the actual number of bytes written to the `pbPublicKeyToken` array.

 `pbPublicKeyToken`
 [out] A pointer to a byte array that contains the assembly's public key token.

## Remarks

An assembly's public key token is the last eight bytes of a SHA1 hash of its public key.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
