---
title: "ICorDebugMergedAssemblyRecord::GetPublicKeyToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getpublickeytoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetPublicKeyToken <example-value>

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
