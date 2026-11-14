---
title: "Custom Partitioners for PLINQ and TPL (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/custom-partitioners-for-plinq-and-tpl.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom Partitioners for PLINQ and TPL (part 5 of 5)

```csharp
            public static OrderablePartitioner<TSource> Create<TSource>(TSource[] source, bool loadBalance);

            // Always uses load-balanced partitioning
            public static OrderablePartitioner<TSource> Create<TSource>(IEnumerator<TSource> source);
            */
        }
    }
}
```

The best way to determine whether to use load balancing in any given scenario is to experiment and measure how long it takes operations to complete under representative loads and computer configurations. For example, static partitioning might provide significant speedup on a multi-core computer that has only a few cores, but it might result in slowdowns on computers that have relatively many cores.

The following table lists the available overloads of the `System.Collections.Concurrent.Partitioner.Create*` method. These partitioners are not limited to use only with PLINQ or `System.Threading.Tasks.Task`. They can also be used with any custom parallel construct.

|Overload|Uses load balancing|
|--------------|-------------------------|
|`System.Collections.Concurrent.Partitioner.Create``1(System.Collections.Generic.IEnumerable{``0})`|Always|
|`System.Collections.Concurrent.Partitioner.Create``1(``0[],System.Boolean)`|When the Boolean argument is specified as true|
|`System.Collections.Concurrent.Partitioner.Create``1(System.Collections.Generic.IList{``0},System.Boolean)`|When the Boolean argument is specified as true|
|`System.Collections.Concurrent.Partitioner.Create(System.Int32,System.Int32)`|Never|
|`System.Collections.Concurrent.Partitioner.Create(System.Int32,System.Int32,System.Int32)`|Never|
|`System.Collections.Concurrent.Partitioner.Create(System.Int64,System.Int64)`|Never|
|`System.Collections.Concurrent.Partitioner.Create(System.Int64,System.Int64,System.Int64)`|Never|

### Configuring Static Range Partitioners for Parallel.ForEach

In a `System.Threading.Tasks.Parallel.For*` loop, the body of the loop is provided to the method as a delegate. The cost of invoking that delegate is about the same as a virtual method call. In some scenarios, the body of a parallel loop might be small enough that the cost of the delegate invocation on each loop iteration becomes significant. In such situations, you can use one of the `System.Collections.Concurrent.Partitioner.Create*` overloads to create an `System.Collections.Generic.IEnumerable`1` of range partitions over the source elements. Then, you can pass this collection of ranges to a `System.Threading.Tasks.Parallel.ForEach*` method whose body consists of a regular `for` loop. The benefit of this approach is that the delegate invocation cost is incurred only once per range, rather than once per element. The following example demonstrates the basic pattern.

```csharp
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {

        // Source must be array or IList.
        var source = Enumerable.Range(0, 100000).ToArray();

        // Partition the entire source array.
        var rangePartitioner = Partitioner.Create(0, source.Length);

        double[] results = new double[source.Length];

        // Loop over the partitions in parallel.
        Parallel.ForEach(rangePartitioner, (range, loopState) =>
        {
            // Loop over each range element without a delegate invocation.
            for (int i = range.Item1; i < range.Item2; i++)
            {
                results[i] = source[i] * Math.PI;
            }
        });

        Console.WriteLine("Operation complete. Print results? y/n");
        char input = Console.ReadKey().KeyChar;
        if (input == 'y' || input == 'Y')
        {
            foreach(double d in results)
            {
                Console.Write("{0} ", d);
            }
        }
    }
}
```

Every thread in the loop receives its own `System.Tuple`2` that contains the starting and ending index values in the specified sub-range. The inner `for` loop uses the `fromInclusive` and `toExclusive` values to loop over the array or the `System.Collections.IList` directly.

One of the `System.Collections.Concurrent.Partitioner.Create*` overloads lets you specify the size of the partitions, and the number of partitions. This overload can be used in scenarios where the work per element is so low that even one virtual method call per element has a noticeable impact on performance.

## Custom Partitioners

In some scenarios, it might be worthwhile or even required to implement your own partitioner. For example, you might have a custom collection class that you can partition more efficiently than the default partitioners can, based on your knowledge of the internal structure of the class. Or, you may want to create range partitions of varying sizes based on your knowledge of how long it will take to process elements at different locations in the source collection.

To create a basic <example-value> partitioner, derive a class from `System.Collections.Concurrent.Partitioner`1` and override the virtual methods, as described in the following table.

|Method|Description|
|-|-|
|`System.Collections.Concurrent.Partitioner`1.GetPartitions*`|This method is called once by the main thread and returns an IList(IEnumerator(TSource)). Each worker thread in the loop or query can call `GetEnumerator` on the list to retrieve a `System.Collections.Generic.IEnumerator`1` over a distinct partition.|
|`System.Collections.Concurrent.Partitioner`1.SupportsDynamicPartitions*`|Return `true` if you implement `System.Collections.Concurrent.Partitioner`1.GetDynamicPartitions*`, otherwise, `false`.|
|`System.Collections.Concurrent.Partitioner`1.GetDynamicPartitions*`|If `System.Collections.Concurrent.Partitioner`1.SupportsDynamicPartitions*` is `true`, this method can optionally be called instead of `System.Collections.Concurrent.Partitioner`1.GetPartitions*`.|

If the results must be sortable or you require indexed access into the elements, then derive from `System.Collections.Concurrent.OrderablePartitioner`1` and override its virtual methods as described in the following table.

|Method|Description|
|-|-|
|`System.Collections.Concurrent.OrderablePartitioner`1.GetPartitions*`|This method is called once by the main thread and returns an `IList(IEnumerator(TSource))`. Each worker thread in the loop or query can call `GetEnumerator` on the list to retrieve a `System.Collections.Generic.IEnumerator`1` over a distinct partition.|
|`System.Collections.Concurrent.Partitioner`1.SupportsDynamicPartitions*`|Return `true` if you implement `System.Collections.Concurrent.OrderablePartitioner`1.GetDynamicPartitions*`; otherwise, false.|
|`System.Collections.Concurrent.OrderablePartitioner`1.GetDynamicPartitions*`|Typically, this just calls `System.Collections.Concurrent.OrderablePartitioner`1.GetOrderableDynamicPartitions*`.|
|`System.Collections.Concurrent.OrderablePartitioner`1.GetOrderableDynamicPartitions*`|If `System.Collections.Concurrent.Partitioner`1.SupportsDynamicPartitions*` is `true`, this method can optionally be called instead of `System.Collections.Concurrent.Partitioner`1.GetPartitions*`.|

The following table provides additional details about how the three kinds of load-balancing partitioners implement the `System.Collections.Concurrent.OrderablePartitioner`1` class.

|Method/Property|IList / Array without Load Balancing|IList / Array with Load Balancing|IEnumerable|
|----------------------|-------------------------------------------|----------------------------------------|-----------------|
|`System.Collections.Concurrent.OrderablePartitioner`1.GetOrderablePartitions*`|Uses range partitioning|Uses chunk partitioning optimized for Lists for the partitionCount specified|Uses chunk partitioning by creating a static number of partitions.|
|`System.Collections.Concurrent.OrderablePartitioner`1.GetOrderableDynamicPartitions*`|Throws not-supported exception|Uses chunk partitioning optimized for Lists and dynamic partitions|Uses chunk partitioning by creating a dynamic number of partitions.|
|`System.Collections.Concurrent.OrderablePartitioner`1.KeysOrderedInEachPartition*`|Returns `true`|Returns `true`|Returns `true`|
|`System.Collections.Concurrent.OrderablePartitioner`1.KeysOrderedAcrossPartitions*`|Returns `true`|Returns `false`|Returns `false`|
|`System.Collections.Concurrent.OrderablePartitioner`1.KeysNormalized*`|Returns `true`|Returns `true`|Returns `true`|
|`System.Collections.Concurrent.Partitioner`1.SupportsDynamicPartitions*`|Returns `false`|Returns `true`|Returns `true`|

### Dynamic Partitions

If you intend the partitioner to be used in a `System.Threading.Tasks.Parallel.ForEach*` method, you must be able to return a dynamic number of partitions. This means that the partitioner can supply an enumerator for a new partition on-demand at any time during loop execution. Basically, whenever the loop adds a new parallel task, it requests a new partition for that task. If you require the data to be orderable, then derive from `System.Collections.Concurrent.OrderablePartitioner`1` so that each item in each partition is assigned a unique index.

For more information, and an example, see How to: Implement Dynamic Partitions.

### Contract for Partitioners

When you implement a custom partitioner, follow these guidelines to help ensure correct interaction with PLINQ and `System.Threading.Tasks.Parallel.ForEach*` in the TPL:

- If `System.Collections.Concurrent.Partitioner`1.GetPartitions*` is called with an argument of zero or less for `partitionsCount`, throw `System.ArgumentOutOfRangeException`. Although PLINQ and TPL will never pass in a `partitionCount` equal to 0, we nevertheless recommend that you guard against the possibility.

- `System.Collections.Concurrent.Partitioner`1.GetPartitions*` and `System.Collections.Concurrent.OrderablePartitioner`1.GetOrderablePartitions*` should always return `partitionsCount` number of partitions. If the partitioner runs out of data and cannot create as many partitions as requested, then the method should return an empty enumerator for each of the remaining partitions. Otherwise, both PLINQ and TPL will throw an `System.InvalidOperationException`.

- `System.Collections.Concurrent.Partitioner`1.GetPartitions*`, `System.Collections.Concurrent.OrderablePartitioner`1.GetOrderablePartitions*`, `System.Collections.Concurrent.Partitioner`1.GetDynamicPartitions*`, and `System.Collections.Concurrent.OrderablePartitioner`1.GetOrderableDynamicPartitions*` should never return `null` (`Nothing` in Visual Basic). If they do, PLINQ / TPL will throw an `System.InvalidOperationException`.

- Methods that return partitions should always return partitions that can fully and uniquely enumerate the data source. There should be no duplication in the data source or skipped items unless specifically required by the design of the partitioner. If this rule is not followed, then the output order may be scrambled.

- The following Boolean getters must always accurately return the following values so that the output order is not scrambled:

  - `KeysOrderedInEachPartition`: Each partition returns elements with increasing key indices.

  - `KeysOrderedAcrossPartitions`: For all partitions that are returned, the key <example-value> in partition *i* are higher than the key <example-value> in partition *i*-1.

  - `KeysNormalized`: All key <example-value> are monotonically increasing without gaps, starting from zero.

- All indices must be unique. There may not be duplicate indices. If this rule is not followed, then the output order may be scrambled.

- All indices must be nonnegative. If this rule is not followed, then PLINQ/TPL may throw exceptions.

## See also

- Parallel Programming
- How to: Implement Dynamic Partitions
- How to: Implement a Partitioner for Static Partitioning
