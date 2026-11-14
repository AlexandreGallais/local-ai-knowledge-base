---
title: "ICorDebugProcess4 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess4-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess4 Interface

Provides support for out of process execution control.

## Methods

| Method                                                                 | Description |
|------------------------------------------------------------------------|-------------|
| ProcessStateChanged | Notifies the ICorDebug pipeline that the out of process debugger is continuing the debugee's execution. |

## Remarks

This interface lives inside the runtime and isn't exposed through any headers or library files. However, it's a COM interface that derives from `IUnknown` with GUID `E930C679-78AF-4953-8AB7-B0AABF0F9F80` that can be obtained through the usual COM mechanisms.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** None

**Library:** None

**.NET versions:** Available since .NET Framework 4.5
