---
title: "Breaking change: Blazor: Updated browser support"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/blazor-browser-support-updated.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Blazor: Updated browser support

ASP.NET Core 5.0 introduces new Blazor features, some of which are incompatible with older browsers. The list of browsers supported by Blazor in ASP.NET Core 5.0 has been updated accordingly.

For discussion, see GitHub issue dotnet/aspnetcore#26475.

## Version introduced

5.0

## Old behavior

Blazor Server supports Microsoft Internet Explorer 11 with sufficient polyfills. Blazor Server and Blazor WebAssembly are also functional in Microsoft Edge Legacy.

## New behavior

Blazor Server in ASP.NET Core 5.0 isn't supported with Microsoft Internet Explorer 11. Blazor Server and Blazor WebAssembly aren't fully functional in Microsoft Edge Legacy.

## Reason for change

New Blazor features in ASP.NET Core 5.0 are incompatible with these older browsers, and use of these older browsers is diminishing. For more information, see the following resources:

* Windows support for Microsoft Edge Legacy is also ending on March 9, 2021
* Microsoft 365 apps and services will end support for Microsoft Internet Explorer 11 by August 17, 2021

## Recommended action

Upgrade from these older browsers to the new, Chromium-based Microsoft Edge. For Blazor apps that need to support these older browsers, use ASP.NET Core 3.1. The supported browsers list for Blazor in ASP.NET Core 3.1 hasn't changed and is documented at Supported platforms.

## Affected APIs

None
