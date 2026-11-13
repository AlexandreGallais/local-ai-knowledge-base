---
title: "CorDebugRecordFormat Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugrecordformat-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugRecordFormat Enumeration

Describes the format of the data in a byte array that contains information about a native exception debug event.

## Syntax

```cpp
typedef enum CorDebugRecordFormat {
    FORMAT_WINDOWS_EXCEPTIONRECORD32 = 1,
    FORMAT_WINDOWS_EXCEPTIONRECORD64 = 2,
} CorDebugRecordFormat;
```

## Members

|Member|Description|
|------------|-----------------|
|`FORMAT_WINDOWS_EXCEPTIONRECORD32`|The data is a 32-bit Windows exception record.|
|`FORMAT_WINDOWS_EXCEPTIONRECORD64`|The data is a 64-bit Windows exception record.|

## Remarks

 A member of the `CorDebugRecordFormat` enumeration is passed to the DecodeEvent method to indicate the format of the byte array in its `pRecord` argument.

> **Note:**
> This enumeration is intended for use in .NET Native debugging scenarios only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
