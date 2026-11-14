---
title: "Identifying Functions in DLLs"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/identifying-functions-in-dlls.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Identifying Functions in DLLs

The identity of a DLL function consists of the following elements:

- Function name or ordinal

- Name of the DLL file in which the implementation can be found

 For example, specifying the `MessageBox` function in the User32.dll identifies the function (**MessageBox**) and its location (User32.dll, User32, or user32). The Microsoft Windows application programming interface (Windows API) can contain two versions of each function that handles characters and strings: a 1-byte character ANSI version and a 2-byte character Unicode version. When unspecified, the character set, represented by the `System.Runtime.InteropServices.DllImportAttribute.CharSet` field, defaults to ANSI. Some functions can have more than two versions.

 `MessageBoxA` is the ANSI entry point for the `MessageBox` function; `MessageBoxW` is the Unicode version. You can list function names for a specific DLL, such as user32.dll, by running a variety of command-line tools. For example, you can use `dumpbin /exports user32.dll` or `link /dump /exports user32.dll` to obtain function names.

 You can rename an unmanaged function to whatever you like within your code as long as you map the new name to the original entry point in the DLL. For instructions on renaming an unmanaged DLL function in managed source code, see the Specifying an Entry Point.

 Platform invoke enables you to control a significant portion of the operating system by calling functions in the Windows API and other DLLs. In addition to the Windows API, there are numerous other APIs and DLLs available to you through platform invoke.

 The following table describes several commonly used DLLs in the Windows API.

|DLL|Description of Contents|
|---------|-----------------------------|
|GDI32.dll|Graphics Device Interface (GDI) functions for device output, such as those for drawing and font management.|
|Kernel32.dll|Low-level operating system functions for memory management and resource handling.|
|User32.dll|Windows management functions for message handling, timers, menus, and communications.|

 For complete documentation on the Windows API, see the Platform SDK. For examples that demonstrate how to construct .NET-based declarations to be used with platform invoke, see Marshalling Data with Platform Invoke.

## See also

- Consuming Unmanaged DLL Functions
- Specifying an Entry Point
- Creating a Class to Hold DLL Functions
- Creating Prototypes in Managed Code
- Calling a DLL Function
