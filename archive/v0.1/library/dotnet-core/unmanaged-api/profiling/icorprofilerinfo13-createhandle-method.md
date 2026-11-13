---
title: "ICorProfilerInfo13::CreateHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo13-createhandle-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo13::CreateHandle method

Creates a handle that wraps a specified object.

## Syntax

```cpp
    HRESULT CreateHandle(
                [in] ObjectID            object,
                [in] COR_PRF_HANDLE_TYPE type,
                [out] ObjectHandleID*    pHandle);
```

## Parameters

`object`\
[in] The object reference to wrap with a handle.

`type`\
[in] The type of handle to create.

`pHandle`\
[out] A caller-provided pointer that will point to the handle created to wrap the specified `object`.

## Remarks

Following are the expected usages depending on the specified `COR_PRF_HANDLE_TYPE` value:

- `COR_PRF_HANDLE_TYPE_WEAK`: Monitors if an object stays in memory over time. If the wrapped object has been collected, ICorProfilerInfo13::GetObjectIDFromHandle returns a null `ObjectID`.
- `COR_PRF_HANDLE_TYPE_STRONG`: Enforces that an object survives garbage collections even if no other object references it.
- `COR_PRF_HANDLE_TYPE_PINNED`: Same as a strong handle but also ensures that the object stays at the same address in memory during garbage collections.

To ensure that the `object` reference is valid, this method has to be called from a `ICorProfilerCallback` method such as ICorProfilerCallback::ObjectAllocated. You cannot call `CreateHandle` from an EventPipe asynchronous listener. The object received via an event payload might have been disposed or moved in memory if a garbage collection occurred between the time the event was emitted and when it was received.

Do not forget to call ICorProfilerInfo13::DestroyHandle once a created handle is no longer needed.
It is recommended to have less than 4096 handles allocated at the same time to avoid impacting the performance of the garbage collector.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 7.0

## See also

- ICorProfilerInfo13 Interface
- COR_PRF_HANDLE_TYPE Enumeration
- DestroyHandle Method
