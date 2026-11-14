---
title: "EventManifestOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventManifestOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventManifestOptions enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventManifestOptions
```

Specifies how the ETW manifest for the event source is generated.

#### Remarks
A bitwise combination of these values will determine how the manifest is written for the event source. For example you can specify whether resource files are generated and how strict the manifest validation is.

## EventManifestOptions.AllCultures field

```csharp
AllCultures
```

Generates a resources node under the localization folder for every satellite assembly provided.

## EventManifestOptions.AllowEventSourceOverride field

```csharp
AllowEventSourceOverride
```

Overrides the default behavior that the current `EventSource` must be the base class of the user-defined type passed to the write method. This enables the validation of .NET event sources.

## EventManifestOptions.None field

```csharp
None
```

No options are specified.

## EventManifestOptions.OnlyIfNeededForRegistration field

```csharp
OnlyIfNeededForRegistration
```

A manifest is generated only the event source must be registered on the host computer.

## EventManifestOptions.Strict field

```csharp
Strict
```

Causes an exception to be raised if any inconsistencies occur when writing the manifest file.
