---
title: "Breaking change: Blazor: Parameter name changed in RequestImageFileAsync method"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/blazor-parameter-name-changed-in-method.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Blazor: Parameter name changed in RequestImageFileAsync method

The `RequestImageFileAsync` method's `maxWith` parameter was renamed from `maxWith` to `maxWidth`.

## Version introduced

ASP.NET Core 6.0

## Old behavior

The parameter name is spelled `maxWith`.

## New behavior

The parameter name is spelled `maxWidth`.

## Reason for change

The original parameter name was a typographical error.

## Recommended action

If you're using named parameters in the `RequestImageFile` API, update the `maxWith` parameter name to `maxWidth`. Otherwise, no change is necessary.

## Affected APIs

`Microsoft.AspNetCore.Components.Forms.BrowserFileExtensions.RequestImageFileAsync*`
