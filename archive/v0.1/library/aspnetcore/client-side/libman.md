---
title: "Client-side library acquisition in ASP.NET Core with LibMan"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/libman/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Client-side library acquisition in ASP.NET Core with LibMan

By Scott Addie

Library Manager (LibMan) is a lightweight, client-side library acquisition tool. LibMan downloads popular libraries and frameworks from the file system or from a content delivery network (CDN). The supported CDNs include CDNJS, jsDelivr, and unpkg. The selected library files are fetched and placed in the appropriate location within the ASP.NET Core project.

## LibMan use cases

LibMan offers the following benefits:

* Only the library files you need are downloaded.
* Additional tooling, such as Node.js, npm, and WebPack, isn't necessary to acquire a subset of files in a library.
* Files can be placed in a specific location without resorting to build tasks or manual file copying.

LibMan isn't a package management system. If you're already using a package manager, such as npm or yarn, continue doing so. LibMan wasn't developed to replace those tools.

## Related content

* Use LibMan with ASP.NET Core in Visual Studio
* Use the LibMan CLI with ASP.NET Core
* LibMan GitHub repository
