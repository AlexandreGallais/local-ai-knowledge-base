---
title: "CorDebugIlToNativeMappingTypes Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugiltonativemappingtypes-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
