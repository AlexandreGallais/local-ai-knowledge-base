---
title: "CorErrorIfEmitOutOfOrder Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corerrorifemitoutoforder-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorErrorIfEmitOutOfOrder Enumeration

Contains flag values that indicate the conditions under which an error message should be generated when metadata is emitted out of order.

## Syntax

```cpp
typedef enum CorErrorIfEmitOutOfOrder {

    MDErrorOutOfOrderDefault    = 0x00000000,
    MDErrorOutOfOrderNone       = 0x00000000,
    MDErrorOutOfOrderAll        = 0xffffffff,
    MDMethodOutOfOrder          = 0x00000001,
    MDFieldOutOfOrder           = 0x00000002,
    MDParamOutOfOrder           = 0x00000004,
    MDPropertyOutOfOrder        = 0x00000008,
    MDEventOutOfOrder           = 0x00000010

} CorErrorIfEmitOutOfOrder;
```

## Members

| Member | Description |
|------------|-----------------|
| `MDErrorOutOfOrderDefault` | Indicates the default behavior, which does not generate error messages. |
| `MDErrorOutOfOrderNone` | Indicates that the compiler should not generate error messages. |
| `MDErrorOutOfOrderAll` | Indicates that the compiler should generate an error message when a field, property, event, method, or parameter is emitted out of order. |
| `MDMethodOutOfOrder` | Indicates that the compiler should generate an error message when a method is emitted out of order. |
| `MDFieldOutOfOrder` | Indicates that the compiler should generate an error message when a field is emitted out of order. |
| `MDParamOutOfOrder` | Indicates that the compiler should generate an error message when a parameter is emitted out of order. |
| `MDPropertyOutOfOrder` | Indicates that the compiler should generate an error message when a property is emitted out of order. |
| `MDEventOutOfOrder` | Indicates that the compiler should generate an error message when an event is emitted out of order. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorHdr.h
