---
title: "ICorDebugMutableDataTarget::WriteVirtual Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmutabledatatarget-writevirtual-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMutableDataTarget::WriteVirtual Method

Writes memory into the target process address space.

## Syntax

```cpp
HRESULT WriteVirtual(
   [in] CORDB_ADDRESS address,
   [in, size_is(bytesRequested)] const BYTE * pBuffer,
   [in] ULONG32 bytesRequested);
```

## Parameters

 `address`
 [in] The address at which to write the contents of `pBuffer`.

 `pBuffer`
 [in] A pointer to a byte array that contains the bytes to be written.

 `address`
 [in] The number of bytes in `pBuffer`.

## Return Value

 `S_OK` on success, or any other `HRESULT` on failure.

## Remarks

If any bytes cannot be written, the method call fails without changing any bytes in the target address space. (Otherwise, the target would be in an inconsistent state that makes further debugging unreliable.)

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMutableDataTarget Interface
