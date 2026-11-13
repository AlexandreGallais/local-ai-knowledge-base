---
title: "Breaking change: AddProvider validates provider isn't null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/6.0/addprovider-null-check.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# AddProvider checks for non-null provider

`Microsoft.Extensions.Logging.LoggerFactory` implements `Microsoft.Extensions.Logging.ILoggerFactory` with an `AddProvider(ILoggerProvider)` method. `null` providers aren't accepted and will cause an `System.ArgumentNullException` to be thrown.

## Version introduced

6.0 RC 1

## Previous behavior

Previously, `Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)` did not perform any validation of the `provider` argument. As such, the method considered `null` to be a "valid" provider and added it to the collection of providers.

## New behavior

Starting in .NET 6, `null` providers aren't accepted, and `Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)` throws an `System.ArgumentNullException` if the logging provider argument is `null`. For example, the following code throws an `System.ArgumentNullException`:

```csharp
var factory = new LoggerFactory();
((ILoggerFactory)factory).AddProvider(null));
```

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The previous behavior caused some operations inside the class to unnecessarily throw `System.NullReferenceException` exceptions. For example, the `Microsoft.Extensions.Logging.LoggerFactory.Dispose` method will capture the exception and do nothing.

## Recommended action

Ensure you're not passing a `null` provider to `Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)`.

## Affected APIs

- `Microsoft.Extensions.Logging.LoggerFactory.AddProvider(Microsoft.Extensions.Logging.ILoggerProvider)`
