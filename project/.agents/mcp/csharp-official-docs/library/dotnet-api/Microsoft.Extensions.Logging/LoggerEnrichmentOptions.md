---
title: "LoggerEnrichmentOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerEnrichmentOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerEnrichmentOptions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class LoggerEnrichmentOptions
```

Options for logging enrichment features.

To be added.

## LoggerEnrichmentOptions.LoggerEnrichmentOptions() constructor

```csharp
public LoggerEnrichmentOptions ();
```

To be added.

To be added.

## LoggerEnrichmentOptions.CaptureStackTraces property

```csharp
public bool CaptureStackTraces { get; set; }
```

Gets or sets a value indicating whether to include stack traces when an exception is logged.

Returns: The default value is `false`.

When set to `true` and exceptions are logged, the logger will add exception stack trace
with inner exception as a separate key-value pair with key 'stackTrace'. The maximum length of the column
defaults to 4096 characters and can be modified by setting the `LoggerEnrichmentOptions.MaxStackTraceLength` property.
The stack trace beyond the current limit will be truncated.

## LoggerEnrichmentOptions.IncludeExceptionMessage property

```csharp
public bool IncludeExceptionMessage { get; set; }
```

Gets or sets a value indicating whether to include the exception message when an exception is logged.

Returns: This defaults to `false`.

When both `LoggerEnrichmentOptions.IncludeExceptionMessage` and `LoggerEnrichmentOptions.CaptureStackTraces` are set to
`true` exception messages are also included in stack traces.

## LoggerEnrichmentOptions.MaxStackTraceLength property

```csharp
public int MaxStackTraceLength { get; set; }
```

Gets or sets the maximum stack trace length to emit for a given log record.

Returns: The default value is 4096.

When set to a value less than 2 KB or greater than 32 KB, an exception will be thrown.

This property has no effect if `LoggerEnrichmentOptions.CaptureStackTraces` is `false`.

## LoggerEnrichmentOptions.UseFileInfoForStackTraces property

```csharp
public bool UseFileInfoForStackTraces { get; set; }
```

Gets or sets a value indicating whether to consult debugging files (PDB files) when producing stack traces.

Returns: The default value is `false`.

Reading available debugging files produces richer stack traces, but can cost a substantial amount of time
to generate. As a result, this option should only be turned on in development scenarios, not for production use.

This property has no effect if `LoggerEnrichmentOptions.CaptureStackTraces` is `false`.

This defaults to `false`.
