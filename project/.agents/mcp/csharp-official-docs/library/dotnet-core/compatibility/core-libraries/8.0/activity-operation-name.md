---
title: ".NET 8 breaking change: Activity operation name when null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/activity-operation-name.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Activity operation name when null

Starting in .NET 8, if you create an `Activity` object using `null` for the operation name, the operation name will be stored as an empty string (`""`) instead of `null`.

## Previous behavior

Previously, if you created an `System.Diagnostics.Activity` object using a `null` operation name, the operation name inside the activity was stored as `null`.

```csharp
new Activity(operationName: null).OperationName // Value is null.
```

## New behavior

Starting in .NET 8, if you create an `System.Diagnostics.Activity` object using a `null` operation name, the operation name is stored as an empty string.

```csharp
new Activity(operationName: null).OperationName // Value is "".
```

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

A `null` operation name in an `System.Diagnostics.Activity` object can have an undesirable effect on backend trace collectors, which usually assume non-null operation names.
To avoid crashes, trace collectors have to special case `null` operation names inside an `System.Diagnostics.Activity` object. This change removes the special case requirement.

## Recommended action

This change is unlikely to cause breaks as using `null` when creating `Activity` objects is rare. If for any reason your code depended on the `null` value for the operation name, adjust the code to either not use `null` or expect that the operation name will be stored as an empty string when you specify `null`.

## Affected APIs

- `System.Diagnostics.Activity.#ctor*` constructor
- `System.Diagnostics.Activity.OperationName`
- `System.Diagnostics.ActivitySource.CreateActivity*`
- `System.Diagnostics.ActivitySource.StartActivity*`
