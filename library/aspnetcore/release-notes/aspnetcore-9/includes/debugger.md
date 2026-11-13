---
title: "debugger"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/debugger.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# debugger

### Dictionary debugging improvements

The debugging display of dictionaries and other key-value collections has an improved layout. The key is displayed in the debugger's key <example-value> instead of being concatenated with the value. The following images show the old and new display of a dictionary in the debugger.

Before:

After:

ASP.NET Core has many key-value collections. This improved debugging experience applies to:

* HTTP headers
* Query strings
* Forms
* Cookies
* View data
* Route data
* Features
