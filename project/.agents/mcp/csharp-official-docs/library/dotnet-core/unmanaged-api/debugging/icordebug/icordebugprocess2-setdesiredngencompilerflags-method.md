---
title: "ICorDebugProcess2::SetDesiredNGENCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-setdesiredngencompilerflags-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::SetDesiredNGENCompilerFlags Method

Sets the flags that must be embedded in a precompiled image in order for the runtime to load that image into the current process.

## Syntax

```cpp
HRESULT SetDesiredNGENCompilerFlags (
    [in] DWORD    pdwFlags
);
```

## Parameters

 `pdwFlags`
 [in] A value of the CorDebugJITCompilerFlags enumeration that specifies the compiler flags used to select the correct pre-compiled image.

## Remarks

The `SetDesiredNGENCompilerFlags` method specifies the flags that must be embedded in a precompiled image so that the runtime will load that image into this process. The flags set by this method are used only to select the correct precompiled image. If no such image exists, the runtime will load the common intermediate language (CIL) image and the just-in-time (JIT) compiler instead. In that case, the debugger must still use the ICorDebugModule2::SetJITCompilerFlags method to set the flags as desired for the JIT compilation.

If an image is loaded, but some JIT compiling must take place for that image (which will be the case if the image contains generics), the compiler flags specified by the `SetDesiredNGENCompilerFlags` method will apply to the extra JIT compilation.

The `SetDesiredNGENCompilerFlags` method must be called during the ICorDebugManagedCallback::CreateProcess callback. Attempts to call the `SetDesiredNGENCompilerFlags` method afterwards will fail. Also, attempts to set flags that are either not defined in the `CorDebugJITCompilerFlags` enumeration or are not legal for the given process will fail.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebug Interface
- ICorDebugManagedCallback Interface
