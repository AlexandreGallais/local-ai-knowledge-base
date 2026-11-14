---
title: "InstanceDataCollectionCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/InstanceDataCollectionCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstanceDataCollectionCollection class

Namespace: `System.Diagnostics`

```csharp
public class InstanceDataCollectionCollection : System.Collections.DictionaryBase
```

Provides a strongly typed collection of `InstanceDataCollection` objects.

#### Remarks
The `InstanceDataCollectionCollection` class represents the collection returned from the `PerformanceCounterCategory.ReadCategory` method. This collection contains all the counter and instance data. The collection contains an `InstanceDataCollection` object for each counter. Each `InstanceDataCollection` object contains the performance data for all counters for that instance. Thus, the data is indexed by counter name and then by instance name.

#### Examples
The following code example displays the instance data for a particular `PerformanceCounterCategory` on the local computer. It first displays a numbered list of `PerformanceCounterCategory` names. After the user enters the number of one of the categories, the example gets the `InstanceDataCollectionCollection` for that `PerformanceCounterCategory`. It then converts the collection returned by the `Values` property to an array of `InstanceDataCollection` objects. The example displays the instance data associated with each `InstanceData` of each `InstanceDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollectionCollection.InstanceDataCollectionCollection() constructor

```csharp
public InstanceDataCollectionCollection ();
```

Initializes a new instance of the `InstanceDataCollectionCollection` class.

To be added.

## InstanceDataCollectionCollection.Item property

```csharp
public System.Diagnostics.InstanceDataCollection this[string counterName] { get; }
```

Gets the instance data for the specified counter.

Parameters:

- `counterName`: The name of the performance counter.

Returns: An `InstanceDataCollection` item, by which the `InstanceDataCollectionCollection` object is indexed.

Exceptions:

- `ArgumentNullException`: The `counterName` parameter is `null`.

#### Remarks
The `counterName` parameter is case-insensitive.

Each `InstanceDataCollection` object in the collection contains the performance data for all counters for an instance. The data is indexed by counter name and then by instance name. The indexer uses the `counterName` parameter to step through the counters associated with this collection of instance data.

#### Examples
The following code example accepts a `PerformanceCounter` category name and counter name from the command line. It gets the `InstanceDataCollectionCollection` for the `PerformanceCounterCategory`. Then, if the `PerformanceCounter` exists, the example uses the `InstanceDataCollectionCollection.Item` property (referenced as an indexer) to obtain the associated `InstanceDataCollection` and displays the instance names from the collection.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollectionCollection/Contains/instdatacolcolitermcontains.cs._

## InstanceDataCollectionCollection.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets the object and counter registry keys for the objects associated with this instance data collection.

Returns: An `ICollection` that represents a set of object-specific registry keys.

#### Remarks
Each software component creates keys for its objects and counters when it is installed and writes counter data while it is executing. You can access this data as you would access any other registry data. However, although you use the registry to collect performance data, the data is not stored in the registry database. Instead, the system collects the data from the appropriate system object managers.

#### Examples
The following code example uses the `Keys` property of an `InstanceDataCollectionCollection` to return a collection of counter names, which it converts to an array of `String`. It generates an array of `InstanceDataCollection` objects using the `Values` property. For each element in the array of counter names, it displays the name and calls a function to process the associated `InstanceDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollectionCollection.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets the instance data values that comprise the collection of instances for the counter.

Returns: An `ICollection` that represents the counter's instances and their associated data values.

#### Examples
The following code example uses the `Values` property of an `InstanceDataCollectionCollection` to return a collection of `InstanceDataCollection` objects, which it converts to an array. It generates an array of counter names using the `Keys` property. For each element in the array of `InstanceDataCollection` objects, it displays the associated counter name and calls a function to process the `InstanceDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollectionCollection.Contains(String) method

```csharp
public bool Contains (string counterName);
```

Determines whether an instance data collection for the specified counter (identified by one of the indexed `InstanceDataCollection` objects) exists in the collection.

Parameters:

- `counterName`: The name of the performance counter.

Returns: `true` if an instance data collection containing the specified counter exists in the collection; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `counterName` parameter is `null`.

#### Remarks
The `counterName` parameter is case-insensitive.

Each `InstanceDataCollection` object in the collection contains the performance data for all counters for an instance. The data is indexed by counter name and then by instance name. `InstanceDataCollectionCollection.Contains` returns `true` if there is an `InstanceDataCollection` object whose associated counter has the name specified by the `counterName` parameter.

#### Examples
The following code example accepts a `PerformanceCounter` category name and counter name from the command line. It gets the `InstanceDataCollectionCollection` for the `PerformanceCounterCategory` and then uses the `InstanceDataCollectionCollection.Contains` method to determine if the specified counter exists. If the counter exists, the example gets the associated `InstanceDataCollection` and displays the instance names from the collection.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollectionCollection/Contains/instdatacolcolitermcontains.cs._

## InstanceDataCollectionCollection.CopyTo(InstanceDataCollection[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.InstanceDataCollection[] counters, int index);
```

Copies an array of `InstanceDataCollection` instances to the collection, at the specified index.

Parameters:

- `counters`: An array of `InstanceDataCollection` instances (identified by the counters they contain) to add to the collection.
- `index`: The location at which to add the new instances.

#### Examples
The following code example uses the `InstanceDataCollectionCollection.CopyTo` method to convert an `InstanceDataCollectionCollection` into an array of `InstanceDataCollection` objects. Each element of the `InstanceDataCollection` array is passed to a function for further processing.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._
