---
title: "NETSDK1137: Don't use the Microsoft.NET.Sdk.WindowsDesktop SDK"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1137.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1137: Don't use the Microsoft.NET.Sdk.WindowsDesktop SDK

NETSDK1137 indicates that your project specifies an outdated project SDK. The full error message is similar to the following example:

> It is no longer necessary to use the Microsoft.NET.Sdk.WindowsDesktop SDK. Consider changing the Sdk attribute of the root Project element to 'Microsoft.NET.Sdk'.

To resolve this error, modify your project file to have `<Project Sdk="Microsoft.NET.Sdk">` instead of the `WindowsDesktop` SDK.
