---
title: "ICorDebugProcess6::DecodeEvent Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-decodeevent-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess6::DecodeEvent Method

Decodes managed debug events that have been encapsulated in the payload of specially crafted native exception debug events.

## Syntax

```cpp
HRESULT DecodeEvent(
        [in, length_is(countBytes), size_is(countBytes)]  const BYTE pRecord[],
        [in] DWORD countBytes,
        [in] CorDebugRecordFormat format,
        [in] DWORD dwFlags,
        [in] DWORD dwThreadId,
        [out] ICorDebugDebugEvent **ppEvent
);
```

## Parameters

 `pRecord`
 [in] A pointer to a byte array from a native exception debug event that includes information about a managed debug event.

 `countBytes`
 [in] The number of elements in the `pRecord` byte array.

 `format`
 [in] A CorDebugRecordFormat enumeration member that specifies the format of the unmanaged debug event.

 `dwFlags`
 [in] A bit field that depends on the target architecture and that specifies additional information about the debug event. For Windows systems, it can be a member of the CorDebugDecodeEventFlagsWindows enumeration.

 `dwThreadId`
 [in] The operating system identifier of the thread on which the exception was thrown.

 `ppEvent`
 [out] A pointer to the address of an ICorDebugDebugEvent object that represents a decoded managed debug event.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess6 Interface
