---
title: "ICorDebugType2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugType2 Interface

Extends the ICorDebugType interface to retrieve the type identifier  of a base type or complex (user-defined) type.

## Methods

| Method                                                 | Description                                                 |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| GetTypeID Method | Gets a COR_TYPEID for this type. |

## Remarks

This interface is a logical extension of the ICorDebugType interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Example

The following code fragment illustrates the use of the ICorDebugType2::GetTypeID method.

```cpp
// (error checking omitted for brevity)
// given an ICorDebugType *pType

ICorDebugType2 *pType2 = NULL;
pType->QueryInterface(IID_ICorDebugType2, &pType);

COR_TYPEID id;
pType2->GetTypeID(&id);

// now we can use existing APIs to get information about this COR_TYPEID
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2
