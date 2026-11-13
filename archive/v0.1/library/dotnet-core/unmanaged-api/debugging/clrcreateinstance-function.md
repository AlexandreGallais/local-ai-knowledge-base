---
title: "CLRCreateInstance Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/clrcreateinstance-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CLRCreateInstance function

Provides the ICLRDebugging interface.

## Syntax

```cpp
HRESULT CLRCreateInstance (
    [in]  REFCLSID  clsid,
    [in]  REFIID     riid,
    [out] LPVOID  * ppInterface
);
```

## Parameters

 `clsid`\
 [in] Supports only the CLSID_CLRDebugging class identifier.

 `riid`\
 [in] Supports only the IID_ICLRDebugging interface identifiers.

 `ppInterface`\
 [out] A ICLRDebugging instance.

## Return value

 This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

| HRESULT     | Description                        |
|-------------|------------------------------------|
| `S_OK`      | The method completed successfully. |
| `E_POINTER` | `ppInterface` is null.             |

## Remarks

 The following table shows the supported combinations for `clsid` and `riid`.

| `clsid`            | `riid`            |
|--------------------|-------------------|
| CLSID_CLRDebugging | IID_ICLRDebugging |

 The following code shows how to use `CLRCreateInstance` to get to get the interface:

```cpp
#include <metahost.h>
#pragma comment(lib, "mscoree.lib")

ICLRDebugging      *pCLRDebugging   = NULL;
HRESULT hr;
hr = CLRCreateInstance (CLSID_CLRDebugging, IID_ICLRDebugging,
                    (LPVOID*)&pCLRDebugging);
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1
