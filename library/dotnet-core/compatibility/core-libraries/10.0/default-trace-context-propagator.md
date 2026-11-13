---
title: "Breaking change - Default trace context propagator updated to W3C standard"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/default-trace-context-propagator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default trace context propagator updated to W3C standard

The default trace context propagator has been switched from the legacy propagator to the W3C propagator. The new propagator uses the `baggage` header instead of `Correlation-Context`, enforces W3C-compliant encoding, and supports only W3C-formatted trace parent IDs.

## Version introduced

.NET 10

## Previous behavior

Previously, the `System.Diagnostics.DistributedContextPropagator.CreateDefaultPropagator` method returned an instance of the legacy propagator. By default, `System.Diagnostics.DistributedContextPropagator.Current` was set to this legacy instance.

## New behavior

Starting in .NET 10, the `System.Diagnostics.DistributedContextPropagator.CreateDefaultPropagator` method returns an instance of the W3C propagator. By default, `System.Diagnostics.DistributedContextPropagator.Current` is set to this W3C instance.

Example of setting the default propagator to the legacy propagator:

```csharp
DistributedContextPropagator.Current = DistributedContextPropagator.CreatePreW3CPropagator();
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change ensures full compliance with the W3C Trace Context and Baggage specifications. The W3C propagator enforces strict formatting for trace parent, trace state, and baggage keys and values, aligning with the W3C standards. The legacy propagator was more lenient and used the non-standard `Correlation-Context` header for baggage propagation.

For more details, see the following GitHub issues:

- Pull Request #114583
- Issue #114584

## Recommended action

If you need to retain the legacy behavior, use the `DistributedContextPropagator.CreatePreW3CPropagator()` method to retrieve the legacy propagator instance. Set it as the current propagator as shown below:

```csharp
DistributedContextPropagator.Current = DistributedContextPropagator.CreatePreW3CPropagator();
```

## Affected APIs

- `System.Diagnostics.DistributedContextPropagator.Current`
- `System.Diagnostics.DistributedContextPropagator.CreateDefaultPropagator`
