---
title: "GaugeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/GaugeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GaugeAttribute class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class GaugeAttribute : Attribute
```

Provides information to guide the production of a strongly typed gauge metric factory method and associated type.

This attribute is applied to a method that has the following constraints:
Must be a partial method.Must return `metricName` as the type. A class with that name will be generated.Must not be generic.Must have `System.Diagnostics.Metrics.Meter` as first parameter.Must have all the keys provided in `staticTags` as string type parameters.

```csharp

            static partial class Metric
            {
                [Gauge]
                static partial MemoryUsage CreateMemoryUsage(Meter meter);
            }
            
```

## GaugeAttribute.GaugeAttribute(String[]) constructor

```csharp
public GaugeAttribute (params string[] tagNames);
```

Initializes a new instance of the `GaugeAttribute` class.

Parameters:

- `tagNames`: Variable array of tag names.

To be added.

## GaugeAttribute.GaugeAttribute(Type) constructor

```csharp
public GaugeAttribute (Type type);
```

Initializes a new instance of the `GaugeAttribute` class.

Parameters:

- `type`: A type providing the metric tag names. The tag values are taken from the type's public fields and properties.

To be added.

## GaugeAttribute.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the metric.

Returns: To be added.

To be added.

## GaugeAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the metric.

Returns: To be added.

In this example the metric name is `SampleMetric`. When `Name` is not provided
the return type of the method is used as metric name. In this example, this would
be `MemoryUsage` if `Name` wasn't provided.

In this example, the metric name is `SampleMetric`. When `Name` is not provided, the return type of the method is used as metric name. In this example,
the metric name would be `MemoryUsage` if `Name` wasn't provided.

```csharp

            static partial class Metric
            {
                [Gauge(Name="SampleMetric")]
                static partial MemoryUsage CreateMemoryUsage(Meter meter);
            }
            
```

## GaugeAttribute.TagNames property

```csharp
public string[]? TagNames { get; }
```

Gets the metric's tag names.

Returns: To be added.

To be added.

## GaugeAttribute.Type property

```csharp
public Type? Type { get; }
```

Gets the type that supplies metric tag values.

Returns: To be added.

To be added.

## GaugeAttribute.Unit property

```csharp
public string? Unit { get; set; }
```

Gets or sets the unit of measurement for the metric.

Returns: To be added.

To be added.
