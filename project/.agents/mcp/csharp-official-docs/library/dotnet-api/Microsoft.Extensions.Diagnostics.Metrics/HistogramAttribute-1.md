---
title: "HistogramAttribute<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/HistogramAttribute`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HistogramAttribute<T> class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class HistogramAttribute<T> : Attribute where T : struct
```

Provides information to guide the production of a strongly typed histogram metric factory method and associated type.

Parameters:

- `T`: The type of value the histogram will hold, which is limited to `Byte`, `Int16`, `Int32`, `Int64`,
`Single`, `Double`, or `Decimal`.

This attribute is applied to a method that has the following constraints:
Must be a partial method.Must return `metricName` as the type. A class with that name will be generated.Must not be generic.Must have `System.Diagnostics.Metrics.Meter` as first parameter.Must have all the keys provided in `staticTags` as string type parameters.

```csharp

            static partial class Metric
            {
                [Histogram<int>("RequestName", "RequestStatusCode")]
                static partial RequestLatency CreateRequestLatency(Meter meter);
            }
            
```

## HistogramAttribute<T>.HistogramAttribute(String[]) constructor

```csharp
public HistogramAttribute (params string[] tagNames);
```

Initializes a new instance of the `HistogramAttribute<T>` class.

Parameters:

- `tagNames`: A variable array of tag names.

To be added.

## HistogramAttribute<T>.HistogramAttribute(Type) constructor

```csharp
public HistogramAttribute (Type type);
```

Initializes a new instance of the `HistogramAttribute<T>` class.

Parameters:

- `type`: A type providing the metric tag names. The tag values are taken from the type's public fields and properties.

To be added.

## HistogramAttribute<T>.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the metric.

Returns: To be added.

To be added.

## HistogramAttribute<T>.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the metric.

Returns: To be added.

In this example the metric name is `SampleMetric`. When `Name` is not provided
the return type of the method is used as metric name. In this example, this would
be `RequestLatency` if `Name` wasn't provided.

In this example metric name is `SampleMetric`.
If `Name` wasn't passed, the metric name would be `RequestLatency`.

```csharp

            static partial class Metric
            {
                [Histogram<int>("RequestName", "RequestStatusCode", Name = "SampleMetric")]
                static partial RequestLatency CreateRequestLatency(Meter meter);
            }
            
```

## HistogramAttribute<T>.TagNames property

```csharp
public string[]? TagNames { get; }
```

Gets the metric's tag names.

Returns: To be added.

To be added.

## HistogramAttribute<T>.Type property

```csharp
public Type? Type { get; }
```

Gets the type that supplies metric tag values.

Returns: To be added.

To be added.

## HistogramAttribute<T>.Unit property

```csharp
public string? Unit { get; set; }
```

Gets or sets the unit of measurement for the metric.

Returns: To be added.

To be added.
