---
title: "Breaking change: ActivitySource.CreateActivity and ActivitySource.StartActivity behavior changes"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/activity-sampling.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ActivitySource.CreateActivity and ActivitySource.StartActivity behavior change

The `System.Diagnostics.ActivitySource.CreateActivity*` and `System.Diagnostics.ActivitySource.StartActivity*` APIs only return an `System.Diagnostics.Activity` when there's a registered listener that decides the instance should be created. This is generally known as sampling.

The `System.Diagnostics.ActivitySamplingResult` enum defines the possible sampling decisions.

When creating an `Activity` without a parent, `ActivitySamplingResult` drives whether the `Activity` is created and then how the `Recorded` and `IsAllDataRequested` properties are set:

| ActivitySamplingResult | Activity created | Activity.Recorded | Activity.IsAllDataRequested |
|------------------------|------------------|-------------------|-----------------------------|
| None                   | No               |                   |                             |
| PropagationData        | Yes              | False             | False                       |
| AllData                | Yes              | False             | True                        |
| AllDataAndRecorded     | Yes              | True              | True                        |

It's also possible to create an `Activity` with a parent. The parent could be in the same process, or it could be a remote parent propagated to the current process.

## Previous behavior

Previously, when creating an `Activity` as `PropagationData` with a parent marked as `Recorded`, the `Recorded` and `IsAllDataRequested` properties were set as follows:

| ActivitySamplingResult | Activity created | Activity.Recorded | Activity.IsAllDataRequested |
|------------------------|------------------|-------------------|-----------------------------|
| PropagationData        | Yes              | True              | False                       |

## New behavior

Starting in .NET 10, when you create an `Activity` as `PropagationData` with a parent marked as `Recorded`, the `Recorded` and `IsAllDataRequested` properties are set as follows:

| ActivitySamplingResult | Activity created | Activity.Recorded | Activity.IsAllDataRequested |
|------------------------|------------------|-------------------|-----------------------------|
| PropagationData        | Yes              | False             | False                       |

## Version introduced

.NET 10

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior did not follow the OpenTelemetry specification.

## Recommended action

If you've implemented `ActivityListener.Sample` directly AND use `ActivitySamplingResult.PropagationData`, verify that you're not reliant on the flawed behavior. To restore the previous behavior, you can set `Activity.ActivityTraceFlags` to `Recorded` after the `CreateActivity` or `StartActivity` call.

If you use OpenTelemetry .NET and have customized the sampler, verify your sampler configuration. The default OpenTelemetry .NET configuration uses a parent-based algorithm that isn't impacted.

## Affected APIs

- `System.Diagnostics.ActivitySource.CreateActivity*`
- `System.Diagnostics.ActivitySource.StartActivity*`
