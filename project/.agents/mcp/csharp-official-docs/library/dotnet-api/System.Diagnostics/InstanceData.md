---
title: "InstanceData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/InstanceData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstanceData class

Namespace: `System.Diagnostics`

```csharp
public class InstanceData
```

Holds instance data associated with a performance counter sample.

#### Examples
The following code example displays the contents of the `InstanceData` objects that exist in a particular `PerformanceCounterCategory` on the local computer. It first displays a numbered list of `PerformanceCounter` categories. After the user enters the number of one of the categories, the sample displays, for each `PerformanceCounter` in the `PerformanceCounterCategory`, the instance data associated with each instance of the `PerformanceCounter`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._

## InstanceData.InstanceData(String, CounterSample) constructor

```csharp
public InstanceData (string instanceName, System.Diagnostics.CounterSample sample);
```

Initializes a new instance of the InstanceData class, using the specified sample and performance counter instance.

Parameters:

- `instanceName`: The name of an instance associated with the performance counter.
- `sample`: A `CounterSample` taken from the instance specified by the `instanceName` parameter.

#### Examples
The following code example creates an `InstanceData` and displays the values of some of its fields.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._

## InstanceData.InstanceName property

```csharp
public string InstanceName { get; }
```

Gets the instance name associated with this instance data.

Returns: The name of an instance associated with the performance counter.

#### Examples
The following code example creates an `InstanceData` and displays the value of its `InstanceName` property and other properties.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._

## InstanceData.RawValue property

```csharp
public long RawValue { get; }
```

Gets the raw data value associated with the performance counter sample.

Returns: The raw value read by the performance counter sample associated with the `InstanceData.Sample` property.

#### Examples
The following code example creates an `InstanceData` and displays the value of its `RawValue` property and other properties.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._

## InstanceData.Sample property

```csharp
public System.Diagnostics.CounterSample Sample { get; }
```

Gets the performance counter sample that generated this data.

Returns: A `CounterSample` taken from the instance specified by the `InstanceData.InstanceName` property.

#### Examples
The following code example creates an `InstanceData` and gets the value of its `Sample` property, which is a reference to a `CounterSample`. The example then displays the fields of the `CounterSample`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._
