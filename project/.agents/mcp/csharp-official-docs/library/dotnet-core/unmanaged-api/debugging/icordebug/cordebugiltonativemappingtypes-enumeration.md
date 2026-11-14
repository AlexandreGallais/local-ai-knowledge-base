---
title: "CorDebugIlToNativeMappingTypes Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugiltonativemappingtypes-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugIlToNativeMappingTypes Enumeration

Indicates whether a particular range of native instructions, represented by an instance of the COR_DEBUG_IL_TO_NATIVE_MAP structure, corresponds to a special code region.

## Syntax

```cpp
typedef enum CorDebugIlToNativeMappingTypes {
    NO_MAPPING = -1,
    PROLOG     = -2,
    EPILOG     = -3
} CorDebugIlToNativeMappingTypes;
```

## Members

|Member|Description|
|------------|-----------------|
|`NO_MAPPING`|The range of native instructions does not correspond to any special code region.|
|`PROLOG`|The range of native instructions corresponds to the prolog.|
|`EPILOG`|The range of native instructions corresponds to the epilog.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- GetILToNativeMapping Method
