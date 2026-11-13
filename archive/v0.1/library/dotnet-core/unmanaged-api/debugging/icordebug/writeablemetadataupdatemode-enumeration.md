---
title: "WriteableMetadataUpdateMode Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/writeablemetadataupdatemode-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# WriteableMetadataUpdateMode Enumeration

Provides values that specify whether in-memory updates to metadata are visible to a debugger.

## Syntax

```cpp
typedef enum WriteableMetadataUpdateMode {
   LegacyCompatPolicy,
   AlwaysShowUpdates
} WriteableMetadataUpdateMode;
```

## Members

| Member name          | Description                                                 |
|----------------------|-------------------------------------------------------------|
| `LegacyCompatPolicy` | Maintain compatibility with older versions of .NET Framework when making in-memory updates to metadata visible. |
| `AlwaysShowUpdates`  | Make in-memory updates to metadata visible to the debugger. |

## Remarks

A member of the `WriteableMetadataUpdateMode` enumeration can be passed to the SetWriteableMetadataUpdateMode method to control whether in-memory updates to metadata in the target process are visible to the debugger.

The `LegacyCompatPolicy` option enforces the same behavior as in versions of .NET Framework prior to 4.5.2. This often means that metadata from updates is not visible. However, calls to a number of debugging methods implicitly coerce the debugger to make updates visible. For example, if the debugger passes ICorDebugILFrame::GetLocalVariable the index of a variable not found in the method's original metadata, all metadata for the module is updated to a snapshot matching the current state of the process. In other words, with the `LegacyCompatPolicy` option, the debugger might see none, some, or all of the available metadata updates, depending on how it uses other parts of the unmanaged debugging API.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- SetWriteableMetadataUpdateMode Method
