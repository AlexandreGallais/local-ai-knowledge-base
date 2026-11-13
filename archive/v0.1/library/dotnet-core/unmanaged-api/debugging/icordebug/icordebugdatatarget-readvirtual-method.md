---
title: "ICorDebugDataTarget::ReadVirtual Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget-readvirtual-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget::ReadVirtual Method

Gets a block of contiguous memory starting at the specified address, and returns it in the supplied buffer.

## Syntax

```cpp
HRESULT ReadVirtual(
    [in] CORDB_ADDRESS   address,
    [out, size_is(bytesRequested), length_is(*pBytesRead)]
          BYTE *     pBuffer,
    [in]  ULONG32    bytesRequested,
    [out] ULONG32 *  pBytesRead);
```

## Parameters

 `address`
 [in] The start address of requested memory.

 `pbuffer`
 [out] The buffer where the memory will be stored.

 `bytesRequested`
 [in] The number of bytes to get from the target address.

 `pBytesRead`
 [out] The number of bytes actually read from the target address. This can be fewer than `bytesRequested`.

## Remarks

If the first byte (at the specified start address) can be read, the call should return success (to support efficient reading of data structures with self-describing length, like null-terminated strings).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugDataTarget Interface
