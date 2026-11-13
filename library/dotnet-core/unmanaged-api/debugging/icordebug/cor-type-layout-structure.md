---
title: "COR_TYPE_LAYOUT Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-type-layout-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_TYPE_LAYOUT Structure

Provides information about the layout of an object in memory.

## Syntax

```cpp
typedef struct COR_TYPE_LAYOUT {
    COR_TYPEID parentID;
    ULONG32 objectSize;
    ULONG32 numFields;
    ULONG32 boxOffset;
    CorElementType type;
} COR_TYPE_LAYOUT;
```

## Members

|Member|Description|
|------------|-----------------|
|`parentID`|The identifier of the parent type to this type. This will be the NULL type id (token1= 0, token2 = 0) if the type id corresponds to `System.Object`.|
|`objectSize`|The base size of an object of this type. This is the total size for non-variable sized objects.|
|`numFields`|The number of fields included in objects of this type.|
|`boxOffset`|If this type is boxed, the beginning offset of an object's fields. This field is valid only for value types such as primitives and structures.|
|`type`|The CorElementType to which this type belongs.|

## Remarks

 If `numFields` is greater than zero, you can call the ICorDebugProcess5::GetTypeFields method to obtain information about the fields in this type. If `type` is `ELEMENT_TYPE_STRING`, `ELEMENT_TYPE_ARRAY`, or `ELEMENT_TYPE_SZARRAY`, the size of objects of this type is variable, and you can pass the COR_TYPEID structure to the ICorDebugProcess5::GetArrayLayout method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
