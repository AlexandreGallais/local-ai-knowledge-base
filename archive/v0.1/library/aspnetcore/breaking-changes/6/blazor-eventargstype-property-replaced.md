---
title: "Breaking change: Blazor: WebEventDescriptor.EventArgsType property replaced"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/blazor-eventargstype-property-replaced.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Blazor: :::no-loc text="WebEventDescriptor.EventArgsType"::: property replaced

The `Microsoft.AspNetCore.Components.RenderTree.WebEventDescriptor` class is part of Blazor's internal protocol for communicating events from JavaScript into .NET. This class isn't typically used by app code, but rather by platform authors.

Starting in ASP.NET Core 6.0, the `Microsoft.AspNetCore.Components.RenderTree.WebEventDescriptor.EventArgsType` property on `WebEventDescriptor` is being replaced by a new `EventName` property. This change is unlikely to affect any app code, as it's a low-level platform implementation detail.

## Version introduced

ASP.NET Core 6.0

## Old behavior

In ASP.NET Core 5.0 and earlier, the property `EventArgsType` describes a nonstandard, Blazor-specific category name for groups of DOM event types. For example, the `click` and `mousedown` events were both mapped to an `EventArgsType` value of `mouse`. Similarly, `cut`, `copy`, and `paste` events are mapped to an `EventArgsType` value of `clipboard`. These category names are used to determine the .NET type to use for deserializing the incoming event arguments data.

## New behavior

Starting in ASP.NET Core 6.0, the new property `EventName` only specifies the original event's name. For example, `click`, `mousedown`, `cut`, `copy`, or `paste`. There's no longer a need to supply a Blazor-specific category name. For that reason, the old property `EventArgsType` is removed.

## Reason for change

In pull request dotnet/aspnetcore#29993, support for custom event arguments classes was introduced. As part of this support, the framework no longer relies on all events fitting into a predefined set of categories. The framework now only needs to know the original event name.

## Recommended action

App code should be unaffected and doesn't need to change.

If building a custom Blazor rendering platform, you may need to update the mechanism for dispatching events into the `Renderer`. Replace any hardcoded rules about event categories with simpler logic that supplies the original, raw event name.

## Affected APIs

`Microsoft.AspNetCore.Components.RenderTree.WebEventDescriptor.EventArgsType`
