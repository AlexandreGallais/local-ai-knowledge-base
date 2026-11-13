---
title: "ICorDebugRemoteTarget::GetHostName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugremotetarget-gethostname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRemoteTarget::GetHostName Method

Returns the fully qualified domain name or IPv4 address of the remote debugging target machine. IPV6 is not supported at this time.

## Syntax

```cpp
HRESULT GetHostName (
    [in] ULONG32      cchHostName,
    [out] ULONG32*    pcchHostName,
    [out, size_is(cchHostName), length_is(*pcchHostName)]
            WCHAR szHostName[]
```

## Parameters

 `cchHostName`
 [in] The size, in characters, of the `szHostName` buffer. If this parameter is 0 (zero), `szHostName` must be null.

 `pcchHostName`
 [out] The number of characters, including a null terminator, in the host name or IP address. This parameter can be null.

 `szHostName`
 [out] Buffer that contains the host name or IP address.

## Return Value

S_OK
The host name or IP address was successfully returned.

E_FAIL (or other E_ return codes)
Unable to return the host name or IP address.

## Remarks

This method is implemented by the debugger writer. It must follow the multiple call paradigm: On the first call, the caller passes null to both `cchHostName` and `szHostName`, and `pcchHostName` returns the size of the required buffer. On the second call, the size that was previously returned is passed in `cchHostName`, and an appropriately sized buffer is passed in `szHostName`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** 3.5 SP1

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
