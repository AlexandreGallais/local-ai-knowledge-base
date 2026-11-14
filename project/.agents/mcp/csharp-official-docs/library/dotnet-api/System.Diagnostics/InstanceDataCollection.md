---
title: "InstanceDataCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/InstanceDataCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstanceDataCollection class

Namespace: `System.Diagnostics`

```csharp
public class InstanceDataCollection : System.Collections.DictionaryBase
```

Provides a strongly typed collection of `InstanceData` objects.

#### Remarks
The `InstanceDataCollection` class represents a collection containing all the instance data for a counter. This collection is contained in the `InstanceDataCollectionCollection` when using the `PerformanceCounterCategory.ReadCategory` method.

#### Examples
The following code example displays the instance data for a particular `PerformanceCounterCategory` on the local computer. It first displays a numbered list of `PerformanceCounterCategory` names. After the user enters the number of one of the categories, the example gets the `InstanceDataCollectionCollection` for that `PerformanceCounterCategory`. It then converts the collection returned by `InstanceDataCollectionCollection.Values` to an array of `InstanceDataCollection` objects. The example also displays the instance data associated with each `InstanceData` of each `InstanceDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollection.InstanceDataCollection(String) constructor

```csharp
public InstanceDataCollection (string counterName);
```

Initializes a new instance of the `InstanceDataCollection` class, using the specified performance counter (which defines a performance instance).

Parameters:

- `counterName`: The name of the counter, which often describes the quantity that is being counted.

Exceptions:

- `ArgumentNullException`: The `counterName` parameter is `null`.

To be added.

## InstanceDataCollection.CounterName property

```csharp
public string CounterName { get; }
```

Gets the name of the performance counter whose instance data you want to get.

Returns: The performance counter name.

#### Examples
The following code example displays the `CounterName` property of an `InstanceDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._

## InstanceDataCollection.Item property

```csharp
public System.Diagnostics.InstanceData this[string instanceName] { get; }
```

Gets the instance data associated with this counter. This is typically a set of raw counter values.

Parameters:

- `instanceName`: The name of the performance counter category instance, or an empty string ("") if the category contains a single instance.

Returns: An `InstanceData` item, by which the `InstanceDataCollection` object is indexed.

Exceptions:

- `ArgumentNullException`: The `instanceName` parameter is `null`.

#### Remarks
The `instanceName` parameter is case-insensitive.

#### Examples
The following code example accepts a `PerformanceCounter` category name, counter name, and instance name from the command line. It gets the `InstanceDataCollectionCollection` for the category, which is a collection of `InstanceDataCollection` objects. From that it gets the particular `InstanceDataCollection` for the specified counter. Then, if the instance exists, the example uses the `InstanceDataCollection.Item` property (referenced as an indexer) to obtain the associated `InstanceData` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Contains/instdatacolitemcontains.cs._

## InstanceDataCollection.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets the object and counter registry keys for the objects associated with this instance data.

Returns: An `ICollection` that represents a set of object-specific registry keys.

#### Remarks
Each software component creates keys for its objects and counters when it is installed and writes counter data while it is executing. You can access this data as you would access any other registry data. However, although you use the registry to collect performance data, the data is not stored in the registry database. Instead, the system collects the data from the appropriate system object managers.

#### Examples
The following code example uses the `Keys` property of an `InstanceDataCollection` to return a collection of instance names, which it converts to an array of `String`. It generates an array of `InstanceData` objects using the `Values` property. For each element in the array of instance names, it displays the name and calls a function to process the associated `InstanceData` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollection.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets the raw counter values that comprise the instance data for the counter.

Returns: An `ICollection` that represents the counter's raw data values.

#### Examples
The following code example uses the `Values` property of an `InstanceDataCollection` to return a collection of `InstanceData` objects, which it converts to an array. It generates an array of instance names using the `Keys` property. For each element in the array of `InstanceData` objects, it displays the associated instance name and calls a function to process the `InstanceData` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Overview/instdatakeysvalues.cs._

## InstanceDataCollection.Contains(String) method

```csharp
public bool Contains (string instanceName);
```

Determines whether a performance instance with a specified name (identified by one of the indexed `InstanceData` objects) exists in the collection.

Parameters:

- `instanceName`: The name of the instance to find in this collection.

Returns: `true` if the instance exists in the collection; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `instanceName` parameter is `null`.

#### Remarks
The `instanceName` parameter is case-insensitive.

#### Examples
The following code example accepts a `PerformanceCounter` category name, counter name, and instance name from the command line. It gets the `InstanceDataCollectionCollection` for the category, which is a collection of `InstanceDataCollection` objects. From that it gets the particular `InstanceDataCollection` for the specified counter. It then uses the `InstanceDataCollection.Contains` method to determine if the specified instance exists, using the default single-instance name if none is entered.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceDataCollection/Contains/instdatacolitemcontains.cs._

## InstanceDataCollection.CopyTo(InstanceData[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.InstanceData[] instances, int index);
```

Copies the items in the collection to the specified one-dimensional array at the specified index.

Parameters:

- `instances`: The one-dimensional `Array` that is the destination of the values copied from the collection.
- `index`: The zero-based index value at which to add the new instances.

#### Examples
The following code example uses the `InstanceDataCollection.CopyTo` method to convert an `InstanceDataCollection` into an array of `InstanceData` objects. The values of the `InstanceData.InstanceName` and `InstanceData.Sample` properties of each element of the array are passed to a function for further processing.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._
