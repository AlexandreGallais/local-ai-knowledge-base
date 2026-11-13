---
title: "CorThreadSafetyOptions Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/corthreadsafetyoptions-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
