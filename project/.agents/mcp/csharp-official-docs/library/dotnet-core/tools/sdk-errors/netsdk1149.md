---
title: "NETSDK1149: Built-in WinRT support not provided in .NET 5 and later"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1149.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1149: Built-in WinRT support not provided in .NET 5 and later

NETSDK1149 indicates that you're trying to reference a component that requires WinRT in an application that targets .NET 5 or a later version. These .NET versions don't have built-in support for WinRT. The full error message is similar to the following example:

> *\<Component name>* cannot be referenced because it uses built-in support for WinRT, which is no longer supported in .NET 5 and higher.  An updated version of the component supporting .NET 5 is needed.

If your application calls Windows Runtime APIs, resolve this error by changing the application's Target Framework Moniker (TFM) to a value that targets Windows 10. For more information, see Call Windows Runtime APIs in desktop apps.

If your application calls a 3rd party WinRT component, get an updated version of the component that supports .NET 5. You can generate an updated version by using C#/WinRT.

For more information, see Built-in support for WinRT is removed from .NET.
