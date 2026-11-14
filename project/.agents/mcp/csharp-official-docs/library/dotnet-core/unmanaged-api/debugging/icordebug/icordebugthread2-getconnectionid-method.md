---
title: "ICorDebugThread2::GetConnectionID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-getconnectionid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
