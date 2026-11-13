---
title: "ICorDebugThread2::GetConnectionID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-getconnectionid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread2::GetConnectionID Method

Gets the connection identifier for this ICorDebugThread2 object.

## Syntax

```cpp
HRESULT GetConnectionID (
    [out] CONNID *pdwConnectionId
);
```

## Parameters

 `pdwConnectionId`
 [out] A `CONNID` that represents the connection identifier.

## Remarks

The `GetConnectionID` method returns zero in the `pdwConnectionId` parameter, if this thread is not part of a connection.

If this thread is connected to an instance of Microsoft SQL Server 2005 Analysis Services (SSAS), the `CONNID` maps to a server process identifier (SPID).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
