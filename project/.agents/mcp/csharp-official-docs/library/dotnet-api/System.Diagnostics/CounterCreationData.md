---
title: "CounterCreationData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/CounterCreationData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CounterCreationData class

Namespace: `System.Diagnostics`

```csharp
public class CounterCreationData
```

Defines the counter type, name, and Help string for a custom counter.

#### Examples
The following code example demonstrates how to use the `CounterCreationData` class to define custom counters. This example creates counters that display how many items are processed in an operation. The example initializes the counters, collects information from them, and then calculates and displays the results to the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterCreationData.CounterCreationData() constructor

```csharp
public CounterCreationData ();
```

Initializes a new instance of the `CounterCreationData` class, to a counter of type `NumberOfItems32`, and with empty name and help strings.

#### Examples
The following code example shows how to create an empty instance of the `CounterCreationData` class. Because the example does not pass in any parameters, the `CounterCreationData.CounterHelp`, `CounterCreationData.CounterName`, and `CounterCreationData.CounterType` properties are not specified and must be defined later.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/.ctor/diagnostics_countercreationdata.cs._

## CounterCreationData.CounterCreationData(String, String, PerformanceCounterType) constructor

```csharp
public CounterCreationData (string counterName, string counterHelp, System.Diagnostics.PerformanceCounterType counterType);
```

Initializes a new instance of the `CounterCreationData` class, to a counter of the specified type, using the specified counter name and Help strings.

Parameters:

- `counterName`: The name of the counter, which must be unique within its category.
- `counterHelp`: The text that describes the counter's behavior.
- `counterType`: A `PerformanceCounterType` that identifies the counter's behavior.

Exceptions:

- `InvalidEnumArgumentException`: You have specified a value for `counterType` that is not a member of the `PerformanceCounterType` enumeration.
- `ArgumentNullException`: `counterHelp` is `null`.

#### Examples
The following code example shows how to create an instance of the `CounterCreationData` class, and pass in parameters to set the `CounterCreationData.CounterHelp`, `CounterCreationData.CounterName` and `CounterCreationData.CounterType` properties of the object when it is initialized.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/.ctor/diagnostics_countercreationdata.cs._

## CounterCreationData.CounterHelp property

```csharp
public string CounterHelp { get; set; }
```

Gets or sets the custom counter's description.

Returns: The text that describes the counter's behavior.

Exceptions:

- `ArgumentNullException`: The specified value is `null`.

#### Examples
The following code example demonstrates how to get and set the `CounterHelp` property. This example creates two counters and sets their `CounterHelp` property by using different techniques. When the first counter is initialized, the `CounterCreationData.CounterHelp` data is passed to the constructor, whereas the second counter sets the property explicitly.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/.ctor/diagnostics_countercreationdata.cs._

## CounterCreationData.CounterName property

```csharp
public string CounterName { get; set; }
```

Gets or sets the name of the custom counter.

Returns: A name for the counter, which is unique in its category.

Exceptions:

- `ArgumentNullException`: The specified value is `null`.
- `ArgumentException`: The specified value is not between 1 and 80 characters long or contains double quotes, control characters or leading or trailing spaces.

#### Examples
The following code example demonstrates how to get and set the `CounterName` property. This example creates two counters and sets their `CounterName` property by using different techniques. When the first counter is initialized, the `CounterCreationData.CounterName` data is passed to the constructor, whereas the second counter sets the property explicitly.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/.ctor/diagnostics_countercreationdata.cs._

## CounterCreationData.CounterType property

```csharp
public System.Diagnostics.PerformanceCounterType CounterType { get; set; }
```

Gets or sets the performance counter type of the custom counter.

Returns: A `PerformanceCounterType` that defines the behavior of the performance counter.

Exceptions:

- `InvalidEnumArgumentException`: You have specified a type that is not a member of the `PerformanceCounterType` enumeration.

#### Examples
The following code example demonstrates how to get and set the `CounterType` property. This example creates two counters and sets their `CounterType` property by using different techniques. When the first counter is initialized, the `CounterCreationData.CounterType` data is passed to the constructor, whereas the second counter sets the property explicitly.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/.ctor/diagnostics_countercreationdata.cs._
