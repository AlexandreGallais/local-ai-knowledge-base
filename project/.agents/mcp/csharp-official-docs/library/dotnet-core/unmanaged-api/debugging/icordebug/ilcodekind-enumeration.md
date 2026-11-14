---
title: "ILCodeKind Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/ilcodekind-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ILCodeKind Enumeration

 Provides values that specify whether the debugger is able to access local variables or code added in profiler ReJIT instrumentation.

## Syntax

```cpp
typedef enum ILCodeKind {
   ILCODE_ORIGINAL_IL = 0x1,
   ILCODE_REJIT_IL = 0x2,
} ILCodeKind;
```

## Members

|Member name|Description|
|-----------------|-----------------|
|`ILCODE_ORIGINAL_IL`|The debugger does not have access to information from ReJIT instrumentation.|
|`ILCODE_REJIT_IL`|The debugger has access to information from ReJIT instrumentation.|

## Remarks

 A member of the `ILCodeKind` enumeration can be passed to the EnumerateLocalVariablesEx and GetLocalVariableEx methods to determine whether the debugger can access variables added in profiler ReJIT instrumentation, and to the GetCodeEx method to determine whether the debugger can access instrumented IL.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILFrame4 Interface
- ReJIT: A How-To Guide
