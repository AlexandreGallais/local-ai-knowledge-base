---
title: "Custom Partitioners for PLINQ and TPL (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/custom-partitioners-for-plinq-and-tpl.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom Partitioners for PLINQ and TPL (part 3 of 5)

### Configuring Load Balancing Partitioners for PLINQ

Some overloads of the `System.Collections.Concurrent.Partitioner.Create*` method let you create a partitioner for an array or `System.Collections.IList` source and specify whether it should attempt to balance the workload among the threads. When the partitioner is configured to load-balance, chunk partitioning is used, and the elements are handed off to each partition in small chunks as they are requested. This approach helps ensure that all partitions have elements to process until the entire loop or query is completed. An additional overload can be used to provide load-balancing partitioning of any `System.Collections.IEnumerable` source.

In general, load balancing requires the partitions to request elements relatively frequently from the partitioner. By contrast, a partitioner that does static partitioning can assign the elements to each partitioner all at once by using either range or chunk partitioning. This requires less overhead than load balancing, but it might take longer to execute if one thread ends up with significantly more work than the others. By default when it is passed an IList or an array, PLINQ always uses range partitioning without load balancing. To enable load balancing for PLINQ, use the `Partitioner.Create` method, as shown in the following example.
