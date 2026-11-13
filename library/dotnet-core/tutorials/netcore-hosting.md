---
title: "Write a custom .NET runtime host"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tutorials/netcore-hosting.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Write a custom .NET host to control the .NET runtime from your native code

Like all managed code, .NET applications are executed by a host. The host is responsible for starting the runtime (including components like the JIT and garbage collector) and invoking managed entry points.

Hosting the .NET runtime is an advanced scenario and, in most cases, .NET developers don't need to worry about hosting because .NET build processes provide a default host to run .NET applications. In some specialized circumstances, though, it can be useful to explicitly host the .NET runtime, either as a means of invoking managed code in a native process or to gain more control over how the runtime works.

This article gives an overview of the steps necessary to start the .NET runtime from native code and execute managed code in it.

## Prerequisites

Because hosts are native applications, this tutorial covers constructing a C++ application to host .NET. You need a C++ development environment (such as that provided by Visual Studio).

You also need to build a .NET component to test the host with, so you should install the latest .NET SDK. It includes the necessary headers and libraries to link with.

## Hosting APIs

Hosting the .NET runtime is done with the `nethost` and `hostfxr` libraries' APIs. These entry points handle the complexity of finding and setting up the runtime for initialization and allow both launching a managed application and calling into a static managed method.

> **Important:**
> The `nethost` and `hostfxr` hosting APIs only support framework-dependent deployments. Self-contained deployments should be treated as stand-alone executables. If you're evaluating deployment models for your application, use a framework-dependent deployment to ensure compatibility with these native hosting APIs.

## Create a host using `nethost.h` and `hostfxr.h`

A sample host demonstrating the steps outlined in the tutorial below is available in the dotnet/samples GitHub repository. Comments in the sample clearly associate the numbered steps from this tutorial with where they're performed in the sample. For download instructions, see Samples and Tutorials.

Keep in mind that the sample host is meant to be used for learning purposes, so it is light on error checking and designed to emphasize readability over efficiency.

The following steps detail how to use the `nethost` and `hostfxr` libraries to start the .NET runtime in a native application and call into a managed static method. The sample uses the `nethost` headers and library and the `coreclr_delegates.h` and `hostfxr.h` headers installed with the .NET SDK.

### Step 1 - Load `hostfxr` and get exported hosting functions

The `nethost` library provides the `get_hostfxr_path` function for locating the `hostfxr` library. The `hostfxr` library exposes functions for hosting the .NET runtime. The full list of functions can be found in `hostfxr.h` and the native hosting design document. The sample and this tutorial use the following:

* `hostfxr_initialize_for_runtime_config`: Initializes a host context and prepares for initialization of the .NET runtime using the specified runtime configuration.
* `hostfxr_get_runtime_delegate`: Gets a delegate for runtime functionality.
* `hostfxr_close`: Closes a host context.

The `hostfxr` library is found using `get_hostfxr_path` API from `nethost` library. It is then loaded and its exports are retrieved.

The sample uses the following includes:

```cpp
#include <nethost.h>
#include <coreclr_delegates.h>
#include <hostfxr.h>
```

These files can be found at the following locations:

- <https://github.com/dotnet/runtime/blob/main/src/native/corehost/nethost/nethost.h>
- <https://github.com/dotnet/runtime/blob/main/src/native/corehost/coreclr_delegates.h>
- <https://github.com/dotnet/runtime/blob/main/src/native/corehost/hostfxr.h>

### Step 2 - Initialize and start the .NET runtime

The `hostfxr_initialize_for_runtime_config` and `hostfxr_get_runtime_delegate` functions initialize and start the .NET runtime using the runtime configuration for the managed component that will be loaded. The `hostfxr_get_runtime_delegate` function is used to get a runtime delegate that allows loading a managed assembly and getting a function pointer to a static method in that assembly.

### Step 3 - Load managed assembly and get function pointer to a managed method

The runtime delegate is called to load the managed assembly and get a function pointer to a managed method. The delegate requires the assembly path, assembly-qualified type name, and method name as inputs and returns a function pointer that can be used to invoke the managed method.

By passing `nullptr` as the delegate type name when calling the runtime delegate, the sample uses a default signature for the managed method:

```csharp
public delegate int ComponentEntryPoint(IntPtr args, int sizeBytes);
```

A different signature can be used by specifying an assembly-qualified delegate type name when calling the runtime delegate.

### Step 4 - Run managed code!

The native host can now call the managed method and pass it the desired parameters.

## Limitations

Only one runtime can be loaded inside a single process. If the `hostfxr_initialize_for_runtime_config` API is called when a runtime is already loaded, it will check if the existing runtime is compatible with the specified initialization parameters. If compatible, the existing runtime will be used and if not compatible, the API will return a failure.
