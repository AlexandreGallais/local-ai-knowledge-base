---
title: "GaugeAttribute<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/GaugeAttribute`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GaugeAttribute<T> class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class GaugeAttribute<T> : Attribute where T : struct
```

Provides information to guide the production of a strongly typed gauge metric factory method and associated type.

Parameters:

- `T`: The type of value the gauge will hold, which is limited to `Byte`, `Int16`, `Int32`, `Int64`,
`Single`, `Double`, or `Decimal`.

This attribute is applied to a method that has the following constraints:

- Must be a partial method.
- Must return `metricName` as the type. A class with that name will be generated.
- Must not be generic.
- Must have `System.Diagnostics.Metrics.Meter` as first parameter.
- Must have all the keys provided in `staticTags` as string type parameters.

```csharp

            static partial class Metric
            {
                [Gauge<double>("MemoryUsage", "Region")]
                static partial MemoryGauge CreateMemoryGauge(Meter meter);
            }
            
```

## GaugeAttribute<T>.GaugeAttribute(String[]) constructor

```csharp
public GaugeAttribute (params string[] tagNames);
```

Initializes a new instance of the `GaugeAttribute<T>` class.

Parameters:

- `tagNames`: Variable array of tag names.

To be added.

## GaugeAttribute<T>.GaugeAttribute(Type) constructor

```csharp
public GaugeAttribute (Type type);
```

Initializes a new instance of the `GaugeAttribute<T>` class.

Parameters:

- `type`: A type providing the metric tag names. The tag values are taken from the type's public fields and properties.

To be added.

## GaugeAttribute<T>.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the metric.

Returns: To be added.

To be added.

## GaugeAttribute<T>.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the metric.

Returns: To be added.

To be added.

In this example, the metric name is `SampleMetric`. When `Name` is not provided, the return type of the method is used as the metric name. In this example,
the metric name would be `MemoryGauge` if `Name` wasn't provided.

```csharp

            static partial class Metric
            {
                [Gauge<double>("Region", Name="SampleMetric")]
                static partial MemoryGauge CreateMemoryGauge(Meter meter);
            }
            
```

## GaugeAttribute<T>.TagNames property

```csharp
public string[]? TagNames { get; }
```

Gets the metric's tag names.

Returns: To be added.

To be added.

## GaugeAttribute<T>.Type property

```csharp
public Type? Type { get; }
```

Gets the type that supplies metric tag values.

Returns: To be added.

To be added.

## GaugeAttribute<T>.Unit property

```csharp
public string? Unit { get; set; }
```

Gets or sets the unit of measurement for the metric.

Returns: To be added.

To be added.
