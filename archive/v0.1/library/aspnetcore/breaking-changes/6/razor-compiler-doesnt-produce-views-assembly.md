---
title: "Breaking change: Razor: Compiler now produces a single assembly"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/razor-compiler-doesnt-produce-views-assembly.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Razor: Compiler no longer produces a Views assembly

The Razor compiler no longer produces a separate *Views.dll* file that contains the CSHTML views defined in an application.

## Version introduced

ASP.NET Core 6.0

## Old behavior

In previous versions, the Razor compiler utilizes a two-step compilation process that produces two files:

- A main *AppName.dll* assembly that contains application types.
- An *AppName.Views.dll* assembly that contains the generated views that are defined in the app. Generated view types are `public` and under the `AspNetCore` namespace.

## New behavior

Both views and application types are included in a single *AppName.dll* assembly. View types have the accessibility modifiers `internal` and `sealed` and are included under the `AspNetCoreGeneratedDocument` namespace.

## Reason for change

Removing the two-step compilation process:

* Improves build performance for applications that use Razor views.
* Allows Razor views to participate in the "hot reload" experience for Visual Studio.

## Recommended action

None.

## Affected APIs

None.
