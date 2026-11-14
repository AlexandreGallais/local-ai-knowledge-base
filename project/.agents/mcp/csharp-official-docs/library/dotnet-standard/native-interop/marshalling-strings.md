---
title: "Marshalling Strings"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/marshalling-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Marshalling Strings

Platform invoke copies string parameters, converting them from the .NET string format (Unicode) to the unmanaged format (ANSI), if needed. Because managed strings are immutable, platform invoke does not copy them back from unmanaged memory to managed memory when the function returns.

 The following table lists marshalling options for strings, describes their usage, and provides a link to the corresponding .NET sample.

|String|Description|Sample|
|------------|-----------------|------------|
|By value.|Passes strings as In parameters.|MsgBox|
|As result.|Returns strings from unmanaged code.|Strings|
|By reference.|Passes strings as In/Out parameters using `System.Text.StringBuilder`.|Buffers|
|In a structure by value.|Passes strings in a structure that is an In parameter.|Structs|
|In a structure by reference **(char\*)**.|Passes strings in a structure that is an In/Out parameter. The unmanaged function expects a pointer to a character buffer and the buffer size is a member of the structure.|Strings|
|In a structure by reference **(char[])**.|Passes strings in a structure that is an In/Out parameter. The unmanaged function expects an embedded character buffer.|OSInfo|
|In a class by value **(char\*)**.|Passes strings in a class (a class is an In/Out parameter). The unmanaged function expects a pointer to a character buffer.|OpenFileDlg|
|In a class by value **(char[])**.|Passes strings in a class (a class is an In/Out parameter). The unmanaged function expects an embedded character buffer.|OSInfo|
|As an array of strings by value.|Creates an array of strings that is passed by value.|Arrays|
|As an array of structures that contain strings by value.|Creates an array of structures that contain strings and the array is passed by value.|Arrays|

## See also

- Default Marshalling for Strings
- Marshalling Data with Platform Invoke
- Marshalling Classes, Structures, and Unions
- Marshalling Different Types of Arrays
- Miscellaneous Marshalling Samples
