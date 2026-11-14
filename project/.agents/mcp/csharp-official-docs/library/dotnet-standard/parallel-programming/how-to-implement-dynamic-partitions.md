---
title: "How to: Implement Dynamic Partitions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-implement-dynamic-partitions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement Dynamic Partitions

The following example shows how to implement a custom `System.Collections.Concurrent.OrderablePartitioner`1` that implements dynamic partitioning and can be used from certain overloads `System.Threading.Tasks.Parallel.ForEach*` and from PLINQ.

## Example

Each time a partition calls `System.Collections.IEnumerator.MoveNext*` on the enumerator, the enumerator provides the partition with one list element. In the case of PLINQ and `System.Threading.Tasks.Parallel.ForEach*`, the partition is a `System.Threading.Tasks.Task` instance. Because requests are happening concurrently on multiple threads, access to the current index is synchronized.

```csharp
﻿namespace ProgramOrderableListPartitioner
{
    //
    // An orderable dynamic partitioner for lists
    //
    using System;
    using System.Collections;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using System.Numerics;

    class OrderableListPartitioner<TSource> : OrderablePartitioner<TSource>
    {
        private readonly IList<TSource> m_input;

        // Must override to return true.
        public override bool SupportsDynamicPartitions => true;

        public OrderableListPartitioner(IList<TSource> input) : base(true, false, true) =>
            m_input = input;

        public override IList<IEnumerator<KeyValuePair<long, TSource>>> GetOrderablePartitions(int partitionCount)
        {
            var dynamicPartitions = GetOrderableDynamicPartitions();
            var partitions =
                new IEnumerator<KeyValuePair<long, TSource>>[partitionCount];

            for (int i = 0; i < partitionCount; i++)
            {
                partitions[i] = dynamicPartitions.GetEnumerator();
            }
            return partitions;
        }

        public override IEnumerable<KeyValuePair<long, TSource>> GetOrderableDynamicPartitions() =>
            new ListDynamicPartitions(m_input);

        private class ListDynamicPartitions : IEnumerable<KeyValuePair<long, TSource>>
        {
            private IList<TSource> m_input;
            private int m_pos = 0;

            internal ListDynamicPartitions(IList<TSource> input) =>
                m_input = input;

            public IEnumerator<KeyValuePair<long, TSource>> GetEnumerator()
            {
                while (true)
                {
                    // Each task gets the next item in the list. The index is
                    // incremented in a thread-safe manner to avoid races.
                    int elemIndex = Interlocked.Increment(ref m_pos) - 1;

                    if (elemIndex >= m_input.Count)
                    {
                        yield break;
                    }

                    yield return new KeyValuePair<long, TSource>(
                        elemIndex, m_input[elemIndex]);
                }
            }

            IEnumerator IEnumerable.GetEnumerator() =>
                ((IEnumerable<KeyValuePair<long, TSource>>)this).GetEnumerator();
        }
    }

    class ConsumerClass
    {
        static void Main()
        {
            var nums = Enumerable.Range(0, 10000).ToArray();
            OrderableListPartitioner<int> partitioner = new OrderableListPartitioner<int>(nums);

            // Use with Parallel.ForEach
            Parallel.ForEach(partitioner, (i) => Console.WriteLine(i));

            // Use with PLINQ
            var query = from num in partitioner.AsParallel()
                        where num % 2 == 0
                        select num;

            foreach (var v in query)
                Console.WriteLine(v);
        }
    }
}
```

This is an example of chunk partitioning, with each chunk consisting of one element. By providing more elements at a time, you could reduce the contention over the lock and theoretically achieve faster performance. However, at some point, larger chunks might require additional load-balancing logic in order to keep all threads busy until all the work is done.

## See also

* Custom Partitioners for PLINQ and TPL
* How to: Implement a Partitioner for Static Partitioning
