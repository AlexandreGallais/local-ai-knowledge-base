---
title: "Breaking change: Conditional string evaluation in Debug methods"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/debug-assert-conditional-evaluation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Conditional string evaluation in Debug methods

It's common to use interpolated strings as assert messages, for example:

```csharp
Debug.Assert(result != x, $"Unexpected result {result}");
```

However, in previous versions, this causes a string to be created for the message, including formatting result, on every call, even if the condition is `true`. And the typical use for asserts is that they're about a condition that should always be true.

C# 10 adds support for better string interpolation, including the ability to target custom "handlers" in addition to strings. In .NET 6, the `System.Diagnostics.Debug` class has new overloads of `System.Diagnostics.Debug.Assert*`, `System.Diagnostics.Debug.WriteIf*`, and `System.Diagnostics.Debug.WriteLineIf*` that utilize this functionality to conditionally evaluate the interpolated string formatting items only if the message is required. The C# compiler will prefer these new overloads. If the formatting items were mutating state and the program was relying on those mutations to be visible even if the assert didn't fire, you could observe a difference in behavior.

## Previous behavior

In the following code, `r.ToString()` would always be invoked.

```csharp
Debug.Assert(true, $"{r.ToString()}");
```

## New behavior

In the following code, `r.ToString()` will never be invoked, because the message is only needed if the condition is `false`.

```csharp
Debug.Assert(true, $"{r.ToString()}");
```

## Version introduced

6.0 RC 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change was introduced to improve performance.

## Recommended action

Interpolated strings used with `System.Diagnostics.Debug` methods should not mutate shared state. (These methods are also conditional on the `DEBUG` compilation constant.) If, for some reason, it's critical to maintain the old behavior, add a `(string)` cast before the interpolated string. This cast forces the compiler to bind to the existing overload and ensures that the string is always materialized.

## Affected APIs

- `System.Diagnostics.Debug.Assert(System.Boolean,System.String)`
- `System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String)`
- `System.Diagnostics.Debug.Assert(System.Boolean,System.String,System.String,System.Object[])`
- `System.Diagnostics.Debug.WriteIf(System.Boolean,System.String)`
- `System.Diagnostics.Debug.WriteIf(System.Boolean,System.String,System.String)`
- `System.Diagnostics.Debug.WriteIf(System.Boolean,System.Object,System.String)`
- `System.Diagnostics.Debug.WriteLineIf(System.Boolean,System.String)`
- `System.Diagnostics.Debug.WriteLineIf(System.Boolean,System.String,System.String)`
- `System.Diagnostics.Debug.WriteLineIf(System.Boolean,System.Object,System.String)`
