---
title: "LoggerRedactionOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerRedactionOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerRedactionOptions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class LoggerRedactionOptions
```

Options to control redaction.

To be added.

## LoggerRedactionOptions.LoggerRedactionOptions() constructor

```csharp
public LoggerRedactionOptions ();
```

To be added.

To be added.

## LoggerRedactionOptions.ApplyDiscriminator property

```csharp
public bool ApplyDiscriminator { get; set; }
```

Gets or sets a value indicating whether a discriminator value is applied to each redacted value.

Returns: Defaults to `true`.

The discriminator is used to constrain the ability to correlate data between pieces of state. When this property is `true`,
the tag name of each value is included as part of the redacted text, generally making it impossible to correlate data between
tags of different names.
