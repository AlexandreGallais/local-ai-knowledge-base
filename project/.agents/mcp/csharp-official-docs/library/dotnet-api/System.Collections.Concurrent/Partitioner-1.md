---
title: "Partitioner<TSource> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/Partitioner`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Partitioner<TSource> class

Namespace: `System.Collections.Concurrent`

```csharp
public abstract class Partitioner<TSource>
```

Represents a particular manner of splitting a data source into multiple partitions.

Parameters:

- `TSource`: Type of the elements in the collection.

#### Remarks
For more information, see Custom Partitioners for PLINQ and TPL.

#### Examples
The following example shows how to implement a partitioner that returns a single element at a time:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/PartitionerTSource/Overview/partitioner.cs._

## Partitioner<TSource>.Partitioner() constructor

```csharp
protected Partitioner ();
```

Creates a new partitioner instance.

To be added.

## Partitioner<TSource>.SupportsDynamicPartitions property

```csharp
public virtual bool SupportsDynamicPartitions { get; }
```

Gets whether additional partitions can be created dynamically.

Returns: `true` if the `Partitioner<T>` can create partitions dynamically as they are requested; `false` if the `Partitioner<T>` can only allocate partitions statically.

#### Remarks
If a derived class does not override and implement `Partitioner<T>.GetDynamicPartitions`, `Partitioner<T>.SupportsDynamicPartitions` should return false. The value of `Partitioner<T>.SupportsDynamicPartitions` should not vary over the lifetime of this instance. For more information, see Custom Partitioners for PLINQ and TPL.

## Partitioner<TSource>.GetDynamicPartitions() method

```csharp
public virtual System.Collections.Generic.IEnumerable<TSource> GetDynamicPartitions ();
```

Creates an object that can partition the underlying collection into a variable number of partitions.

Returns: An object that can create partitions over the underlying data source.

Exceptions:

- `NotSupportedException`: Dynamic partitioning is not supported by the base class. You must implement it in a derived class.

#### Remarks
The returned object implements the `IEnumerable<T>` interface. Calling `IEnumerable<T>.GetEnumerator` on the object creates another partition over the sequence.

The `Partitioner<T>.GetDynamicPartitions` method is only supported if the `SupportsDynamicPartitions` property returns true. For more information, see Custom Partitioners for PLINQ and TPL.

## Partitioner<TSource>.GetPartitions(Int32) method

```csharp
public abstract System.Collections.Generic.IList<System.Collections.Generic.IEnumerator<TSource>> GetPartitions (int partitionCount);
```

Partitions the underlying collection into the given number of partitions.

Parameters:

- `partitionCount`: The number of partitions to create.

Returns: A list containing `partitionCount` enumerators.

#### Remarks
A class that implements this method is expected to return exactly the number of partitions that are specified in `partitionCount`. If a partition contains no elements, then return an empty enumerator rather than null (Nothing in Visual Basic). For more information, see Custom Partitioners for PLINQ and TPL.
