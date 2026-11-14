---
title: "COR_GC_REFERENCE Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cor-gc-reference-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_GC_REFERENCE Structure

Contains information about an object that is to be garbage-collected.

## Syntax

```cpp
typedef struct _COR_GC_REFERENCE {
    ICorDebugAppDomain *domain;
    ICorDebugValue *location;
    CorGCReferenceType type;
    UINT64 extraData;
} COR_GC_REFERENCE;
```

## Members

| Member | Description |
|--------|-------------|
| `domain` | A pointer to the application domain to which the handle or object belongs. Its value may be `null`. |
|`location`|Either an ICorDebugValue or an ICorDebugReferenceValue interface that corresponds to the object to be garbage-collected.|
|`type`|A CorGCReferenceType enumeration value that indicates where the root came from. For more information, see the Remarks section.|
|`extraData`|Additional data about the object to be garbage-collected. This information depends on the source of the object, as indicated by the `type` field. For more information, see the Remarks section.|

## Remarks

The `type` field is a CorGCReferenceType enumeration value that indicates where the reference came from. A particular `COR_GC_REFERENCE` value can reflect any of the following kinds of managed objects:

- Objects from all managed stacks (`CorGCReferenceType.CorReferenceStack`). This includes live references in managed code, as well as objects created by the common language runtime.
- Objects from the handle table (`CorGCReferenceType.CorHandle*`). This includes strong references (`HNDTYPE_STRONG` and `HNDTYPE_REFCOUNT`) and static variables in a module.
- Objects from the finalizer queue (`CorGCReferenceType.CorReferenceFinalizer`). The finalizer queue roots objects until the finalizer has run.

The `extraData` field contains extra data depending on the source (or type) of the reference. Possible values are:

- `DependentSource`. If the `type` is `CorGCReferenceType.CorHandleStrongDependent`, this field is the object that, if alive, roots the object to be garbage-collected at `COR_GC_REFERENCE.Location`.
- `RefCount`. If the `type` is `CorGCReferenceType.CorHandleStrongRefCount`, this field is the reference count of the handle.
- `Size`. If the `type` is `CorGCReferenceType.CorHandleStrongSizedByref`, this field is the last size of the object tree for which the garbage collector calculated the object roots. Note that this calculation is not necessarily up to date.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
