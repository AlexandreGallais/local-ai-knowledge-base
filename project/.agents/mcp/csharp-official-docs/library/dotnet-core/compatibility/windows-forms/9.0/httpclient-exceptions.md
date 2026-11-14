---
title: "Breaking change: PictureBox raises HttpClient exceptions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/9.0/httpclient-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# PictureBox raises HttpClient exceptions

When `System.Windows.Forms.PictureBox` loads an image from a URL and a network error occurs, it now raises `System.Net.Http.HttpClient` exceptions, such as `System.Net.Http.HttpRequestException` and `System.Threading.Tasks.TaskCanceledException`, instead of `System.Net.WebException`.

## Version introduced

.NET 9 Preview 6

## Previous behavior

Previously, when `System.Windows.Forms.PictureBox` failed to load an image from a URL due to a network error, a `System.Net.WebException` was thrown.

## New behavior

Starting in .NET 9, when `System.Windows.Forms.PictureBox` fails to load an image from a URL due to a network error, `System.Net.Http.HttpRequestException` or `System.Threading.Tasks.TaskCanceledException` is thrown.

## Change category

This change is a *behavioral change*.

## Reason for change

`System.Net.WebClient` is obsolete.

## Recommended action

Update your code to catch `System.Net.Http.HttpRequestException` and `System.Threading.Tasks.TaskCanceledException` instead of `System.Net.WebException`.

## Affected APIs

- `System.Windows.Forms.PictureBox` control
