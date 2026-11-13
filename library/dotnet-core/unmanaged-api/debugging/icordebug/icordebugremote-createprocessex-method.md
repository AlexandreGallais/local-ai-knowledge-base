---
title: "ICorDebugRemote::CreateProcessEx Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugremote-createprocessex-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRemote::CreateProcessEx Method

Launches a process on a remote machine under the debugger.

## Syntax

```cpp
HRESULT CreateProcessEx (
    [in]  ICorDebugRemoteTarget*      pRemoteTarget,
    [in]  LPCWSTR                     lpApplicationName,
    [in]  LPWSTR                      lpCommandLine,
    [in]  LPSECURITY_ATTRIBUTES       lpProcessAttributes,
    [in]  LPSECURITY_ATTRIBUTES       lpThreadAttributes,
    [in]  BOOL                        bInheritHandles,
    [in]  DWORD                       dwCreationFlags,
    [in]  PVOID                       lpEnvironment,
    [in]  LPCWSTR                     lpCurrentDirectory,
    [in]  LPSTARTUPINFOW              lpStartupInfo,
    [in]  LPPROCESS_INFORMATION       lpProcessInformation,
    [in]  CorDebugCreateProcessFlags  debuggingFlags,
    [out] ICorDebugProcess**          ppProcess
);
```

## Parameters

 `pRemoteTarget`
 [in] Pointer to an ICorDebugRemoteTarget Interface. Used to determine the remote machine on which the process will be launched.

 `lpApplicationName`
 [in] Pointer to a null-terminated string that specifies the module to be executed by the launched process. The module is executed in the security context of the calling process.

 `lpCommandLine`
 [in] Pointer to a null-terminated string that specifies the command line to be executed by the launched process.

 `lpProcessAttributes`
 [in] Unused for remote debugging.

 `lpThreadAttributes`
 [in] Unused for remote debugging.

 `bInheritHandles`
 [in] Unused for remote debugging.

 `dwCreationFlags`
 [in] Unused for remote debugging.

 `lpEnvironment`
 [in] Pointer to an environment block for the new process.

 `lpCurrentDirectory`
 [in] Pointer to a null-terminated string that specifies the full path to the current directory for the process. If this parameter is null, the new process will have the same current drive and directory as the calling process.

 `lpStartupInfo`
 [in] Unused for remote debugging.

 `lpProcessInformation`
 [in] Unused for remote debugging.

 `debuggingFlags`
 [in] Unused for remote debugging.

 `ppProcess`
 [out] A pointer to the address of a"ICorDebugProcess Interface" object that represents the process.

## Return Value

S_OK
Successfully launched the process on the remote machine and returned an "ICorDebugProcess Interface" for debugging.

E_FAIL (or other E_ return codes)
Unable to launch the process on the remote machine and return an "ICorDebugProcess Interface" for debugging.

## Remarks

Mixed-mode debugging is not supported in Silverlight.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemote Interface
- ICorDebug Interface
