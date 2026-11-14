---
title: "ValidateOptionsResult class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateOptionsResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateOptionsResult class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ValidateOptionsResult
```

Represents the result of an options validation.

To be added.

## ValidateOptionsResult.ValidateOptionsResult() constructor

```csharp
public ValidateOptionsResult ();
```

Initializes an instance of the `ValidateOptionsResult` class.

To be added.

## ValidateOptionsResult.Failed property

```csharp
public bool Failed { get; protected set; }
```

Gets a value that indicates whether validation failed.

Returns: `true` if validation failed; otherwise, `false`.

To be added.

## ValidateOptionsResult.FailureMessage property

```csharp
public string? FailureMessage { get; protected set; }
```

Gets the description of why validation failed.

Returns: To be added.

To be added.

## ValidateOptionsResult.Failures property

```csharp
public System.Collections.Generic.IEnumerable<string>? Failures { get; protected set; }
```

Gets the full list of failures (can be multiple).

Returns: To be added.

To be added.

## ValidateOptionsResult.Skipped property

```csharp
public bool Skipped { get; protected set; }
```

Gets a value that indicates whether validation was run.

Returns: `true` if validation was skipped; `false` if validation was run.

To be added.

## ValidateOptionsResult.Succeeded property

```csharp
public bool Succeeded { get; protected set; }
```

Gets a value that indicates whether validation was successful.

Returns: To be added.

To be added.

## ValidateOptionsResult.Fail(String>) method

```csharp
public static Microsoft.Extensions.Options.ValidateOptionsResult Fail (System.Collections.Generic.IEnumerable<string> failures);
```

Returns a failure result.

Parameters:

- `failures`: The reasons for the failure.

Returns: The failure result.

To be added.

## ValidateOptionsResult.Fail(String) method

```csharp
public static Microsoft.Extensions.Options.ValidateOptionsResult Fail (string failureMessage);
```

Returns a failure result.

Parameters:

- `failureMessage`: The reason for the failure.

Returns: The failure result.

To be added.

## ValidateOptionsResult.Skip field

```csharp
public static readonly Microsoft.Extensions.Options.ValidateOptionsResult Skip;
```

The result when validation was skipped due to name not matching.

To be added.

## ValidateOptionsResult.Success field

```csharp
public static readonly Microsoft.Extensions.Options.ValidateOptionsResult Success;
```

The result when validation was successful.

To be added.
