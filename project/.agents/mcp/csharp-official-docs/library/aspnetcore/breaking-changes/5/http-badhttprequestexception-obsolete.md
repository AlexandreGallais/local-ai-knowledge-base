---
title: "Breaking change: HTTP: Kestrel and IIS BadHttpRequestException types marked obsolete and replaced"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/http-badhttprequestexception-obsolete.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP: Kestrel and IIS BadHttpRequestException types marked obsolete and replaced

`Microsoft.AspNetCore.Server.Kestrel.BadHttpRequestException` and `Microsoft.AspNetCore.Server.IIS.BadHttpRequestException` have been marked obsolete and changed to derive from `Microsoft.AspNetCore.Http.BadHttpRequestException`. The Kestrel and IIS servers still throw their old exception types for backwards compatibility. The obsolete types will be removed in a future release.

For discussion, see dotnet/aspnetcore#20614.

## Version introduced

5.0 Preview 4

## Old behavior

`Microsoft.AspNetCore.Server.Kestrel.BadHttpRequestException` and `Microsoft.AspNetCore.Server.IIS.BadHttpRequestException` derived from `System.IO.IOException`.

## New behavior

`Microsoft.AspNetCore.Server.Kestrel.BadHttpRequestException` and `Microsoft.AspNetCore.Server.IIS.BadHttpRequestException` are obsolete. The types also derive from `Microsoft.AspNetCore.Http.BadHttpRequestException`, which derives from `System.IO.IOException`.

## Reason for change

The change was made to:

* Consolidate duplicate types.
* Unify behavior across server implementations.

An app can now catch the base exception `Microsoft.AspNetCore.Http.BadHttpRequestException` when using either Kestrel or IIS.

## Recommended action

Replace usages of `Microsoft.AspNetCore.Server.Kestrel.BadHttpRequestException` and `Microsoft.AspNetCore.Server.IIS.BadHttpRequestException` with `Microsoft.AspNetCore.Http.BadHttpRequestException`.

## Affected APIs

- Microsoft.AspNetCore.Server.IIS.BadHttpRequestException
- Microsoft.AspNetCore.Server.Kestrel.BadHttpRequestException
