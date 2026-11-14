---
title: "How to: Implement a Partitioner for Static Partitioning (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-implement-a-partitioner-for-static-partitioning.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Partitioner for Static Partitioning (part 4 of 4)

```csharp
            public static OrderablePartitioner<TSource> Create<TSource>(TSource[] source, bool loadBalance);

            // Always uses load-balanced partitioning
            public static OrderablePartitioner<TSource> Create<TSource>(IEnumerator<TSource> source);
            */
        }
    }
}
```

 The partitions in this example are based on the assumption of a linear increase in processing time for each element. In the real world, it might be difficult to predict processing times in this way. If you are using a static partitioner with a specific data source, you can optimize the partitioning formula for the source, add load-balancing logic, or use a chunk partitioning approach as demonstrated in How to: Implement Dynamic Partitions.

## See also

- Custom Partitioners for PLINQ and TPL
