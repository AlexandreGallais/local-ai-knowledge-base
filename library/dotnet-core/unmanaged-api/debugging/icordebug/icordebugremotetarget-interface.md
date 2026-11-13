---
title: "ICorDebugRemoteTarget Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugremotetarget-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRemoteTarget Interface

Provides methods that enable developers to debug Silverlight-based applications in the common language runtime (CLR) environment.

## Syntax

```cpp
interface ICorDebugRemoteTarget  : IUnknown
{
    HRESULT GetHostName (
        [in]  ULONG32                    cchHostName,
        [out] ULONG32*                   pcchHostName,
        [out, size_is(cchHostName),
              length_is(*pcchHostName)]
                  WCHAR szHostName[]
        );
};
```

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugRemoteTarget::GetHostName Method|Returns the host name or the IP address of a remote machine.|

## Remarks

Mixed-mode (that is, managed and native code) debugging is not supported on non-x86 platforms (such as IA-64 and AMD64).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** : CorGuids.lib

 **.NET versions:** 3.5 SP1

## See also

- ICorDebugRemote Interface
- ICorDebug Interface
