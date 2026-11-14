---
title: "ICorDebugProcess7::SetWriteableMetadataUpdateMode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess7-setwriteablemetadataupdatemode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess7::SetWriteableMetadataUpdateMode Method

Configures how the debugger handles in-memory updates to metadata within the target process.

## Syntax

```cpp
HRESULT SetWriteableMetadataUpdateMode(
   WriteableMetadataUpdateMode flags
);
```

## Parameters

 `flags`\
A WriteableMetadataUpdateMode enumeration value that specifies whether in-memory updates to metadata in the target process are visible (`WriteableMetadataUpdateMode::AlwaysShowUpdates`) or not visible (`WriteableMetadataUpdateMode::LegacyCompatPolicy`) to the debugger.

## Remarks

Updates to the metadata of the target process can come from Edit and Continue, a profiler, or `System.Reflection.Emit`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugProcess7 Interface
