---
title: "SampleActivity<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SampleActivity`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SampleActivity<T> delegate

Namespace: `System.Diagnostics`

```csharp
public delegate System.Diagnostics.ActivitySamplingResult SampleActivity<T>(ref ActivityCreationOptions<T> options);
```

A delegate that defines the signature of the `ActivityListener` callbacks used in the sampling process.

Parameters:

- `T`: The type of the requested parent to create the Activity object with. Should be either a string or an `ActivityContext` instance.
- `options`: The Activity creation options used by `ActivityListener` callbacks to decide creating the Activity object or not.

Returns: An object containing the sampling results, which indicate the amount of data to collect for the related `Activity`.

To be added.
