---
title: "Breaking change: NotifyIcon.Text maximum text length increased"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/windows-forms/6.0/notifyicon-text-max-text-length-increased.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NotifyIcon.Text maximum text length increased

The maximum text length allowed for the `System.Windows.Forms.NotifyIcon.Text` property increased from 63 to 127.

## Change description

In previous .NET versions, the maximum text length allowed for the `System.Windows.Forms.NotifyIcon.Text` property is 63 characters. Starting in .NET 6, the maximum allowed text length is 127 characters. In any version, an `System.ArgumentException` is thrown when you attempt to set a value that's longer than the limit.

## Change category

This change affects binary compatibility.

## Reason for change

The maximum allowed text length was increased to be in line with the underlying Windows API. The Windows API was updated in Windows 2000, but due to compatibility reasons, the size limit for this property wasn't updated in .NET Framework.

## Version introduced

.NET 6

## Recommended action

Review your code and relax any existing guard conditions, if necessary.

## Affected APIs

`System.Windows.Forms.NotifyIcon.Text`
