---
title: "ParallelOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ParallelOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelOptions class

Namespace: `System.Threading.Tasks`

```csharp
public class ParallelOptions
```

Stores options that configure the operation of methods on the `Parallel` class.

#### Remarks

By default, methods on the `Parallel` class attempt to use all available processors, are non-cancelable, and target the default `TaskScheduler` (`Default`). `ParallelOptions` enables overriding these defaults.

## ParallelOptions.ParallelOptions() constructor

```csharp
public ParallelOptions ();
```

Initializes a new instance of the `ParallelOptions` class.

#### Remarks
This constructor initializes the instance with default values. `ParallelOptions.MaxDegreeOfParallelism` is initialized to -1, signifying that there is no upper bound set on how much parallelism should be employed. `ParallelOptions.CancellationToken` is initialized to a non-cancelable token, and `ParallelOptions.TaskScheduler` is initialized to the default scheduler (TaskScheduler.Default).

All of these defaults may be overwritten using the property set accessors on the instance.

## ParallelOptions.CancellationToken <example-value>

```csharp
public System.Threading.CancellationToken <example-value> { get; set; }
```

Gets or sets the `CancellationToken` associated with this `ParallelOptions` instance.

Returns: The token that is associated with this instance.

#### Remarks
Providing a `CancellationToken` to a `Parallel` method enables the operation to be exited early. Code external to the operation may cancel the token, and if the operation observes the token being set, it may exit early by throwing an `OperationCanceledException`.

## ParallelOptions.MaxDegreeOfParallelism property

```csharp
public int MaxDegreeOfParallelism { get; set; }
```

Gets or sets the maximum number of concurrent tasks enabled by this `ParallelOptions` instance.

Returns: An integer that represents the maximum degree of parallelism.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to zero or to a value that is less than -1.

#### Remarks
The `MaxDegreeOfParallelism` property affects the number of concurrent operations run by `Parallel` method calls that are passed this `ParallelOptions` instance. A positive property value limits the number of concurrent operations to the set value. If it is -1,  there is no limit on the number of concurrently running operations (with the exception of the `Parallel.ForEachAsync` method, where -1 means `Environment.ProcessorCount`).

By default, `Parallel.For` and `Parallel.ForEach` will utilize however many threads the underlying scheduler provides, so changing `ParallelOptions.MaxDegreeOfParallelism` from the default only limits how many concurrent tasks will be used.

Generally, you do not need to modify this setting. However, you may choose to set it explicitly in advanced usage scenarios such as these:

- When you know that a particular algorithm you're using won't scale beyond a certain number of cores. You can set the property to avoid wasting cycles on additional cores.

- When you're running multiple algorithms concurrently and want to manually define how much of the system each algorithm can utilize. You can set a `ParallelOptions.MaxDegreeOfParallelism` value for each.

- When the thread pool's heuristics is unable to determine the right number of threads to use and could end up injecting too many threads. For example, in long-running loop body iterations, the thread pool might not be able to tell the difference between reasonable progress or livelock or deadlock, and might not be able to reclaim threads that were added to improve performance. In this case, you can set the property to ensure that you don't use more than a reasonable number of threads.

## ParallelOptions.TaskScheduler property

```csharp
public System.Threading.Tasks.TaskScheduler? TaskScheduler { get; set; }
```

Gets or sets the `TaskScheduler` associated with this `ParallelOptions` instance. Setting this property to null indicates that the current scheduler should be used.

Returns: The task scheduler that is associated with this instance.

To be added.
