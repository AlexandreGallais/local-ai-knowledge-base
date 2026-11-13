---
title: "Breaking change: FileConfigurationSource.OnLoadException callback is called for IO errors"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/11/fileconfigurationsource-onloadexception-io-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# FileConfigurationSource.OnLoadException callback is called for IO errors

`Microsoft.Extensions.Configuration.FileConfigurationProvider` and its derived types (used by <Microsoft.Extensions.Configuration.JsonConfigurationExtensions.AddJsonFile*>, <Microsoft.Extensions.Configuration.XmlConfigurationExtensions.AddXmlFile*>, and <Microsoft.Extensions.Configuration.IniConfigurationExtensions.AddIniFile*>) now forward IO errors to the `Microsoft.Extensions.Configuration.FileConfigurationSource.OnLoadException` callback in addition to parsing errors.

## Version introduced

.NET 11

## Previous behavior

Previously, IO errors that occurred when a configuration file was opened (for example, from `AddJsonFile`, `AddXmlFile`, `AddIniFile`, or a reload triggered when an already-loaded file changed on disk) weren't forwarded to the `Microsoft.Extensions.Configuration.FileLoadExceptionContext` passed to the `Microsoft.Extensions.Configuration.FileConfigurationSource.OnLoadException` callback. Only parsing errors were forwarded to that callback. IO errors were unobservable using `OnLoadException`; instead, they were observable using `System.Threading.Tasks.TaskScheduler.UnobservedTaskException`.

As a consequence, the `Exception` property on `FileLoadExceptionContext` passed to `OnLoadException` was always an `System.IO.InvalidDataException` or `System.IO.FileNotFoundException`. Code that unconditionally cast the exception to one of those types worked correctly.

## New behavior

Starting in .NET 11, IO errors are forwarded to the `FileLoadExceptionContext` passed to the `OnLoadException` callback. IO errors are no longer observable using `TaskScheduler.UnobservedTaskException`, except when no `OnLoadException` callback is registered.

As a consequence, the `Exception` property on `FileLoadExceptionContext` can now be an exception of any type—most commonly `System.IO.IOException`, but potentially any exception thrown by the configured `Microsoft.Extensions.FileProviders.IFileProvider` (including custom providers). Code that unconditionally casts the exception to `InvalidDataException` or `FileNotFoundException` can now throw an `System.InvalidCastException` or silently mishandle these new exception types.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change is a bug fix. Configuration file IO errors are meaningful load failures, and code that registers an `OnLoadException` callback expects to observe all failures that occur while a configuration file is loaded, not just parsing errors. For more information, see dotnet/runtime#113964.

## Recommended action

- If you detected IO exceptions from `FileConfigurationProvider` or a derived type using `TaskScheduler.UnobservedTaskException`, move that logic to the `OnLoadException` callback.
- Verify that any callback registered in `OnLoadException` can handle exceptions of any type, not just `InvalidDataException` or `FileNotFoundException`. Avoid unconditional casts, and use pattern matching or type checks instead.

## Affected APIs

- `Microsoft.Extensions.Configuration.FileConfigurationSource.OnLoadException`
