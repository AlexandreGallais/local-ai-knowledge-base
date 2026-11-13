---
title: "ICorDebugRemote Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugremote-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRemote Interface

Provides the ability to launch or attach a managed debugger to a remote target process.

## Syntax

```cpp
interface ICorDebugRemote : IUnknown
{
    HRESULT CreateProcessEx
      (
      [in] ICorDebugRemoteTarget *     pRemoteTarget,
      [in] LPCWSTR                     lpApplicationName,
      [in] LPWSTR                      lpCommandLine,
      [in] LPSECURITY_ATTRIBUTES       lpProcessAttributes,
      [in] LPSECURITY_ATTRIBUTES       lpThreadAttributes,
      [in] BOOL                        bInheritHandles,
      [in] DWORD                       dwCreationFlags,
      [in] PVOID                       lpEnvironment,
      [in] LPCWSTR                     lpCurrentDirectory,
      [in] LPSTARTUPINFOW              lpStartupInfo,
      [in] LPPROCESS_INFORMATION       lpProcessInformation,
      [in] CorDebugCreateProcessFlags  debuggingFlags,
      [out] ICorDebugProcess **        ppProcess
      );

    HRESULT DebugActiveProcessEx
      (
      [in] ICorDebugRemoteTarget *   pRemoteTarget,
      [in] DWORD                     dwProcessId,
      [in] BOOL                      fWin32Attach,
      [out] ICorDebugProcess **      ppProcess
      );
};
```

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugRemote::CreateProcessEx Method|Creates a process on a remote machine for managed debugging.|
|ICorDebugRemote::DebugActiveProcessEx Method|Launches a process on a remote machine under the debugger.|

## Remarks

Currently, this functionality is supported only for debugging a Silverlight-based application target that is running on a remote Macintosh machine.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemoteTarget Interface
- ICorDebug Interface
