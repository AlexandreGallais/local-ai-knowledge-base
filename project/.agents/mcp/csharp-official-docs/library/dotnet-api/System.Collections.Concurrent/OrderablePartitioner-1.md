---
title: "OrderablePartitioner<TSource> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/OrderablePartitioner`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OrderablePartitioner<TSource> class

Namespace: `System.Collections.Concurrent`

```csharp
public abstract class OrderablePartitioner<TSource> : System.Collections.Concurrent.Partitioner<TSource>
```

Represents a particular manner of splitting an orderable data source into multiple partitions.

Parameters:

- `TSource`: Type of the elements in the collection.

#### Remarks
The implementation of the derived class is responsible for ordering the elements into key-value pairs in whatever manner is appropriate. For more information, see Custom Partitioners for PLINQ and TPL.

#### Examples
The following example shows how to implement an orderable partitioner that returns one element at a time:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/OrderablePartitionerTSource/Overview/orderablepartitioner.cs._

## OrderablePartitioner<TSource>.OrderablePartitioner(Boolean, Boolean, Boolean) constructor

```csharp
protected OrderablePartitioner (bool keysOrderedInEachPartition, bool keysOrderedAcrossPartitions, bool keysNormalized);
```

Called from constructors in derived classes to initialize the `OrderablePartitioner<T>` class with the specified constraints on the index keys.

Parameters:

- `keysOrderedInEachPartition`: Indicates whether the elements in each partition are yielded in the order of increasing keys.
- `keysOrderedAcrossPartitions`: Indicates whether elements in an earlier partition always come before elements in a later partition. If true, each element in partition 0 has a smaller order key than any element in partition 1, each element in partition 1 has a smaller order key than any element in partition 2, and so on.
- `keysNormalized`: Indicates whether keys are normalized. If true, all order keys are distinct integers in the range [0 .. numberOfElements-1]. If false, order keys must still be distinct, but only their relative order is considered, not their absolute values.

#### Remarks
For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.KeysNormalized property

```csharp
public bool KeysNormalized { get; }
```

Gets whether order keys are normalized.

Returns: `true` if the keys are normalized; otherwise, `false`.

#### Remarks
If `OrderablePartitioner<T>.KeysNormalized` returns true, all order keys are distinct integers in the range [0 .. numberOfElements-1]. If the property returns false, order keys must still be distinct, but only their relative order is considered, not their absolute values.

For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.KeysOrderedAcrossPartitions property

```csharp
public bool KeysOrderedAcrossPartitions { get; }
```

Gets whether elements in an earlier partition always come before elements in a later partition.

Returns: `true` if the elements in an earlier partition always come before elements in a later partition; otherwise, `false`.

#### Remarks
If `OrderablePartitioner<T>.KeysOrderedAcrossPartitions` returns true, each element in partition 0 has a smaller order key than any element in partition 1, each element in partition 1 has a smaller order key than any element in partition 2, and so on.

For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.KeysOrderedInEachPartition property

```csharp
public bool KeysOrderedInEachPartition { get; }
```

Gets whether elements in each partition are yielded in the order of increasing keys.

Returns: `true` if the elements in each partition are yielded in the order of increasing keys; otherwise, `false`.

#### Remarks
For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.GetDynamicPartitions() method

```csharp
public override System.Collections.Generic.IEnumerable<TSource> GetDynamicPartitions ();
```

Creates an object that can partition the underlying collection into a variable number of partitions.

Returns: An object that can create partitions over the underlying data source.

Exceptions:

- `NotSupportedException`: Dynamic partitioning is not supported by the base class. It must be implemented in derived classes.

#### Remarks
The returned object implements the `IEnumerable<T>` interface. Calling `IEnumerable<T>.GetEnumerator` on the object creates another partition over the sequence.

The default implementation provides the same behavior as `OrderablePartitioner<T>.GetOrderableDynamicPartitions` except that the returned set of partitions does not provide the keys for the elements.

The `OrderablePartitioner<T>.GetDynamicPartitions` method is only supported if the `SupportsDynamicPartitions` property returns true.

For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.GetOrderableDynamicPartitions() method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<long,TSource>> GetOrderableDynamicPartitions ();
```

Creates an object that can partition the underlying collection into a variable number of partitions.

Returns: An object that can create partitions over the underlying data source.

Exceptions:

- `NotSupportedException`: Dynamic partitioning is not supported by this partitioner.

#### Remarks
The returned object implements the `IEnumerable<T>` interface. Calling `IEnumerable<T>.GetEnumerator` on the object creates another partition over the sequence.

Each partition is represented as an enumerator over key-value pairs. The value in the pair is the element itself, and the key is an integer which determines the relative ordering of this element against other elements.

The `OrderablePartitioner<T>.GetOrderableDynamicPartitions` method is only supported if the `SupportsDynamicPartitions` property returns true.

For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.GetOrderablePartitions(Int32) method

```csharp
public abstract System.Collections.Generic.IList<System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<long,TSource>>> GetOrderablePartitions (int partitionCount);
```

Partitions the underlying collection into the specified number of orderable partitions.

Parameters:

- `partitionCount`: The number of partitions to create.

Returns: A list containing `partitionCount` enumerators.

#### Remarks
Each partition is represented as an enumerator over key-value pairs.

The value of the pair is the element itself, and the key is an integer which determines the relative ordering of this element against other elements in the data source.

For more information, see Custom Partitioners for PLINQ and TPL.

## OrderablePartitioner<TSource>.GetPartitions(Int32) method

```csharp
public override System.Collections.Generic.IList<System.Collections.Generic.IEnumerator<TSource>> GetPartitions (int partitionCount);
```

Partitions the underlying collection into the given number of ordered partitions.

Parameters:

- `partitionCount`: The number of partitions to create.

Returns: A list containing `partitionCount` enumerators.

#### Remarks
The default implementation provides the same behavior as `OrderablePartitioner<T>.GetOrderablePartitions` except that the returned set of partitions does not provide the keys for the elements.

For more information, see Custom Partitioners for PLINQ and TPL.
