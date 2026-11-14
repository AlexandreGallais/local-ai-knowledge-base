---
title: "ASP.NET Core Request Delegate Generator (RDG) diagnostics"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/aot/request-delegate-generator/rdg-ids.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Request Delegate Generator (RDG) diagnostics

-->

The ASP.NET Core Request Delegate Generator (RDG) is a tool that generates request delegates for ASP.NET Core apps. The RDG is used by the native ahead-of-time (AOT) compiler to generate request delegates for the app's `Map` methods.

> **Note:**
> Not all ASP.NET Core features are compatible with Native AOT.

The following list contains the  RDG diagnostics for ASP.NET Core:

* RDG002: Unable to resolve endpoint handler

* RDG004: Unable to resolve anonymous type
* RDG005: Invalid abstract type
* RDG006: Invalid constructor parameters
* RDG007: No valid constructor found
* RDG008: Multiple public constructors
* RDG009: Invalid nested AsParameters
* RDG010:  InvalidAsParameters Nullable
* RDG011: Type parameters not supported
* RDG012: Unable to resolve inaccessible type
* RDG013: Invalid source attributes
