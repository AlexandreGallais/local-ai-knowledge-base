---
title: "CounterAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/CounterAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CounterAttribute class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public sealed class CounterAttribute : Attribute
```

Provides information to guide the production of a strongly typed 64 bit integer counter metric factory method and associated type.

This attribute is applied to a method that has the following constraints:
Must be a partial method.Must return `metricName` as the type. A class with that name will be generated.Must not be generic.Must have `System.Diagnostics.Metrics.Meter` as first parameter.Must have all the keys provided in `staticTagNames` as string type parameters.

```csharp

            static partial class Metric
            {
                [Counter("RequestName", "RequestStatusCode")]
                static partial RequestCounter CreateRequestCounter(Meter meter);
            }
            
```

## CounterAttribute.CounterAttribute(String[]) constructor

```csharp
public CounterAttribute (params string[] tagNames);
```

Initializes a new instance of the `CounterAttribute` class.

Parameters:

- `tagNames`: Dimension names.

To be added.

## CounterAttribute.CounterAttribute(Type) constructor

```csharp
public CounterAttribute (Type type);
```

Initializes a new instance of the `CounterAttribute` class.

Parameters:

- `type`: A type providing the metric tag names. The tag values are taken from the type's public fields and properties.

To be added.

## CounterAttribute.Description property

```csharp
public string? Description { get; set; }
```

Gets or sets the description of the metric.

Returns: To be added.

To be added.

## CounterAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the metric.

Returns: To be added.

In this example, the metric name is `SampleMetric`. When `Name` is not provided
the return type of the method is used as metric name. In this example, this would
be `RequestCounter` if `Name` wasn't provided.

In this example, the metric name is `SampleMetric`. When `Name` is not
provided, the return type of the method is used as the metric name. In this example,
the metric name would be `RequestCounter` if `Name` wasn't provided.

```csharp

            static partial class Metric
            {
                [Counter("RequestName", "RequestStatusCode", Name="SampleMetric")]
                static partial RequestCounter CreateRequestCounter(Meter meter);
            }
            
```

## CounterAttribute.TagNames property

```csharp
public string[]? TagNames { get; }
```

Gets the metric's tag names.

Returns: To be added.

To be added.

## CounterAttribute.Type property

```csharp
public Type? Type { get; }
```

Gets the type that supplies metric tag values.

Returns: To be added.

To be added.

## CounterAttribute.Unit property

```csharp
public string? Unit { get; set; }
```

Gets or sets the unit of measurement for the metric.

Returns: To be added.

To be added.
