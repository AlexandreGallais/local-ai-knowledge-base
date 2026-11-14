---
title: "HistogramAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/HistogramAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HistogramAttribute class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class HistogramAttribute : Attribute
```

Provides information to guide the production of a strongly typed histogram metric factory method and associated type.

This attribute is applied to a method that has the following constraints:
Must be a partial method.Must return `metricName` as the type. A class with that name will be generated.Must not be generic.Must have `System.Diagnostics.Metrics.Meter` as first parameter.Must have all the keys provided in `staticTags` as string type parameters.

```csharp

            static partial class Metric
            {
                [Histogram("RequestName", "RequestStatusCode")]
                static partial RequestLatency CreateRequestLatency(Meter meter);
            }
            
```

## HistogramAttribute.HistogramAttribute(String[]) constructor

```csharp
public HistogramAttribute (params string[] tagNames);
```

Initializes a new instance of the `HistogramAttribute` class.

Parameters:

- `tagNames`: variable array of tag names.

To be added.

## HistogramAttribute.HistogramAttribute(Type) constructor

```csharp
public HistogramAttribute (Type type);
```

Initializes a new instance of the `HistogramAttribute` class.

Parameters:

- `type`: A type providing the metric tag names. The tag values are taken from the type's public fields and properties.

To be added.

## HistogramAttribute.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the metric.

Returns: To be added.

To be added.

## HistogramAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the metric.

Returns: To be added.

In this example the metric name is `SampleMetric`. When `Name` is not provided
the return type of the method is used as metric name. In this example, this would
be `RequestLatency` if `Name` wasn't provided.

In this example, the metric name is `SampleMetric`. When `Name` is not provided, the return type of the method is used as the metric name. In this example,
the metric name would be `RequestLatency` if `Name` wasn't provided.

```csharp

            static partial class Metric
            {
                [Histogram("RequestName", "RequestStatusCode", Name="SampleMetric")]
                static partial RequestLatency CreateRequestLatency(Meter meter);
            }
            
```

## HistogramAttribute.TagNames property

```csharp
public string[]? TagNames { get; }
```

Gets the metric's tags.

Returns: To be added.

To be added.

## HistogramAttribute.Type property

```csharp
public Type? Type { get; }
```

Gets the type that supplies metric tag values.

Returns: To be added.

To be added.

## HistogramAttribute.Unit property

```csharp
public string? Unit { get; set; }
```

Gets or sets the unit of measurement for the metric.

Returns: To be added.

To be added.
