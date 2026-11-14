---
title: "Breaking changes can affect porting your app"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/breaking-changes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Breaking changes might occur when porting code

Changes that affect compatibility, otherwise known as breaking changes, sometimes occur between versions of .NET. Changes are impactful when porting from .NET Framework to .NET because of certain technologies not being available. Also, you might come across breaking changes simply because .NET is a cross-platform technology and .NET Framework isn't.

Microsoft strives to maintain a high level of compatibility between .NET versions, so while breaking changes do occur, they're carefully considered.

Before upgrading major versions, check the breaking changes documentation for changes that might affect you.

## Changes that affect compatibility

There are several types of changes that library authors can make that affect compatibility, including:

- Modifications to the public contract
- Behavioral changes
- Platform support
- Internal implementation changes
- Code changes

For more information about what kind of changes are allowed or disallowed, see Change rules for compatibility.

## Types of compatibility

Compatibility refers to the ability to compile or run code on a .NET implementation other than the one with which the code was originally developed.

There are six different ways a change can affect compatibility:

- Behavioral changes
- Binary compatibility
- Source compatibility
- Design-time compatibility
- Backwards compatibility
- Forward compatibility

For more information, see How code changes can affect compatibility.

## Find breaking changes

Changes that affect compatibility are documented. Review these changes before you port your code from .NET Framework to .NET or upgrade it to a newer version of .NET. For a list of these breaking changes, see Breaking changes for migration from .NET Framework to .NET.
