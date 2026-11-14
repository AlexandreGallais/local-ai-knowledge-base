---
title: "CorThreadSafetyOptions Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corthreadsafetyoptions-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorThreadSafetyOptions Enumeration

Specifies flags to select options for thread safety.

## Syntax

```cpp
typedef enum CorThreadSafetyOptions {
    MDThreadSafetyDefault       = 0x00000000,
    MDThreadSafetyOff           = 0x00000000,
    MDThreadSafetyOn            = 0x00000001,
} CorThreadSafetyOptions;
```

## Members

| Member                  | Description                                        |
|-------------------------|----------------------------------------------------|
| `MDThreadSafetyDefault` | Default value. Same as `MDThreadSafetyOff`.        |
| `MDThreadSafetyOff`     | Indicates that a reader/writer lock cannot be set. |
| `MDThreadSafetyOn`      | Indicates that a reader/writer lock can be set.    |

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorHdr.h
