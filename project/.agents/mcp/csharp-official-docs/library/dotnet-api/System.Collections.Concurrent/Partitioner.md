---
title: "Partitioner class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/Partitioner.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Partitioner class

Namespace: `System.Collections.Concurrent`

```csharp
public static class Partitioner
```

Provides common partitioning strategies for arrays, lists, and enumerables.

#### Remarks
For more information, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create(Int32, Int32) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<Tuple<int,int>> Create (int fromInclusive, int toExclusive);
```

Creates a partitioner that chunks the user-specified range.

Parameters:

- `fromInclusive`: The lower, inclusive bound of the range.
- `toExclusive`: The upper, exclusive bound of the range.

Returns: A partitioner.

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` argument is less than or equal to the `fromInclusive` argument.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create(Int64, Int64) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<Tuple<long,long>> Create (long fromInclusive, long toExclusive);
```

Creates a partitioner that chunks the user-specified range.

Parameters:

- `fromInclusive`: The lower, inclusive bound of the range.
- `toExclusive`: The upper, exclusive bound of the range.

Returns: A partitioner.

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` argument is less than or equal to the `fromInclusive` argument.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create(Int32, Int32, Int32) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<Tuple<int,int>> Create (int fromInclusive, int toExclusive, int rangeSize);
```

Creates a partitioner that chunks the user-specified range.

Parameters:

- `fromInclusive`: The lower, inclusive bound of the range.
- `toExclusive`: The upper, exclusive bound of the range.
- `rangeSize`: The size of each subrange.

Returns: A partitioner.

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` argument is less than or equal to the `fromInclusive` argument.

-or-

The `rangeSize` argument is less than or equal to 0.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create(Int64, Int64, Int64) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<Tuple<long,long>> Create (long fromInclusive, long toExclusive, long rangeSize);
```

Creates a partitioner that chunks the user-specified range.

Parameters:

- `fromInclusive`: The lower, inclusive bound of the range.
- `toExclusive`: The upper, exclusive bound of the range.
- `rangeSize`: The size of each subrange.

Returns: A partitioner.

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` argument is less than or equal to the `fromInclusive` argument.

-or-

The `rangeSize` argument is less than or equal to 0.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<TSource> Create<TSource> (System.Collections.Generic.IEnumerable<TSource> source);
```

Creates an orderable partitioner from a `IEnumerable<T>` instance.

Parameters:

- `TSource`: Type of the elements in source enumerable.
- `source`: The enumerable to be partitioned.

Returns: An orderable partitioner based on the input array.

#### Remarks
The ordering used in the created partitioner is determined by the natural order of the elements as retrieved from the source enumerable. For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create<TSource>(IEnumerable<TSource>, EnumerablePartitionerOptions) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<TSource> Create<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Concurrent.EnumerablePartitionerOptions partitionerOptions);
```

Creates an orderable partitioner from a `IEnumerable<T>` instance.

Parameters:

- `TSource`: Type of the elements in source enumerable.
- `source`: The enumerable to be partitioned.
- `partitionerOptions`: Options to control the buffering behavior of the partitioner.

Returns: An orderable partitioner based on the input array.

Exceptions:

- `ArgumentOutOfRangeException`: The `partitionerOptions` argument specifies an invalid value for `EnumerablePartitionerOptions`.

#### Remarks
The ordering used in the created partitioner is determined by the natural order of the elements as retrieved from the source enumerable.

## Partitioner.Create<TSource>(IList<TSource>, Boolean) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<TSource> Create<TSource> (System.Collections.Generic.IList<TSource> list, bool loadBalance);
```

Creates an orderable partitioner from an `IList<T>` instance.

Parameters:

- `TSource`: Type of the elements in source list.
- `list`: The list to be partitioned.
- `loadBalance`: A Boolean value that indicates whether the created partitioner should dynamically load balance between partitions rather than statically partition.

Returns: An orderable partitioner based on the input list.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.

## Partitioner.Create<TSource>(TSource[], Boolean) method

```csharp
public static System.Collections.Concurrent.OrderablePartitioner<TSource> Create<TSource> (TSource[] array, bool loadBalance);
```

Creates an orderable partitioner from a `Array` instance.

Parameters:

- `TSource`: Type of the elements in source array.
- `array`: The array to be partitioned.
- `loadBalance`: A Boolean value that indicates whether the created partitioner should dynamically load balance between partitions rather than statically partition.

Returns: An orderable partitioner based on the input array.

#### Remarks
For more information and examples, see Custom Partitioners for PLINQ and TPL.
