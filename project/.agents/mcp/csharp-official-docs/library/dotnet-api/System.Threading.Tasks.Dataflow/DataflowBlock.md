---
title: "DataflowBlock class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowBlock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowBlock class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public static class DataflowBlock
```

Provides a set of static (Shared in Visual Basic) methods for working with dataflow blocks.

To be added.

## DataflowBlock.AsObservable<TOutput>(ISourceBlock<TOutput>) method

```csharp
public static IObservable<TOutput> AsObservable<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source);
```

Creates a new `IObservable<T>` abstraction over the `ISourceBlock<T>`.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source to wrap.

Returns: An `IObservable<T>` that enables observers to be subscribed to the source.

Exceptions:

- `ArgumentNullException`: The `source` is `null`.

To be added.

## DataflowBlock.AsObserver<TInput>(ITargetBlock<TInput>) method

```csharp
public static IObserver<TInput> AsObserver<TInput> (this System.Threading.Tasks.Dataflow.ITargetBlock<TInput> target);
```

Creates a new `IObserver<T>` abstraction over the  `ITargetBlock<T>`.

Parameters:

- `TInput`: Specifies the type of input accepted by the target block.
- `target`: The target to wrap.

Returns: An observer that wraps the target block.

To be added.

## DataflowBlock.Choose<T1,T2>(ISourceBlock<T1>, Action<T1>, ISourceBlock<T2>, Action<T2>) method

```csharp
public static System.Threading.Tasks.Task<int> Choose<T1,T2> (System.Threading.Tasks.Dataflow.ISourceBlock<T1> source1, Action<T1> action1, System.Threading.Tasks.Dataflow.ISourceBlock<T2> source2, Action<T2> action2);
```

Monitors two dataflow sources, invoking the provided handler for whichever source makes data available first.

Parameters:

- `T1`: Specifies type of data contained in the first source.
- `T2`: Specifies type of data contained in the second source.
- `source1`: The first source.
- `action1`: The handler to execute on data from the first source.
- `source2`: The second source.
- `action2`: The handler to execute on data from the second source.

Returns: A  `Task<T>` that represents the asynchronous choice. If both sources are completed prior to the choice completing, the resulting task will be canceled. When one of the sources has data available and successfully propagates it to the choice, the resulting task will complete when the handler completes; if the handler throws an exception, the task will end in the `TaskStatus.Faulted` state and will contain the unhandled exception. Otherwise, the task will end with its `Task<T>.Result` set to either 0 or 1 to represent the first or second source, respectively.

This method will only consume an element from one of the two data sources, never both.

Exceptions:

- `ArgumentNullException`: The `source1` is `null`.

-or-

The  `action1` is `null`.

-or-

The `source2` is `null`.

-or-

The `action2` is `null`.

To be added.

## DataflowBlock.Choose<T1,T2>(ISourceBlock<T1>, Action<T1>, ISourceBlock<T2>, Action<T2>, DataflowBlockOptions) method

```csharp
public static System.Threading.Tasks.Task<int> Choose<T1,T2> (System.Threading.Tasks.Dataflow.ISourceBlock<T1> source1, Action<T1> action1, System.Threading.Tasks.Dataflow.ISourceBlock<T2> source2, Action<T2> action2, System.Threading.Tasks.Dataflow.DataflowBlockOptions dataflowBlockOptions);
```

Monitors two dataflow sources, invoking the provided handler for whichever source makes data available first.

Parameters:

- `T1`: Specifies type of data contained in the first source.
- `T2`: Specifies type of data contained in the second source.
- `source1`: The first source.
- `action1`: The handler to execute on data from the first source.
- `source2`: The second source.
- `action2`: The handler to execute on data from the second source.
- `dataflowBlockOptions`: The options with which to configure this choice.

Returns: A  `Task<T>` that represents the asynchronous choice. If both sources are completed prior to the choice completing, or if the `CancellationToken` provided as part of `dataflowBlockOptions` is canceled prior to the choice completing, the resulting task will be canceled. When one of the sources has data available and successfully propagates it to the choice, the resulting task will complete when the handler completes; if the handler throws an exception, the task will end in the `TaskStatus.Faulted` state and will contain the unhandled exception. Otherwise, the task will end with its `Task<T>.Result` set to either 0 or 1 to represent the first or second source, respectively.

Exceptions:

- `ArgumentNullException`: The `source1` is `null`.

-or-

The `action1` is `null`.

-or-

The `source2` is `null`.

-or-

The `action2` is `null`.

-or-

The `dataflowBlockOptions` is `null`.

To be added.

## DataflowBlock.Choose<T1,T2,T3>(ISourceBlock<T1>, Action<T1>, ISourceBlock<T2>, Action<T2>, ISourceBlock<T3>, Action<T3>) method

```csharp
public static System.Threading.Tasks.Task<int> Choose<T1,T2,T3> (System.Threading.Tasks.Dataflow.ISourceBlock<T1> source1, Action<T1> action1, System.Threading.Tasks.Dataflow.ISourceBlock<T2> source2, Action<T2> action2, System.Threading.Tasks.Dataflow.ISourceBlock<T3> source3, Action<T3> action3);
```

Monitors three dataflow sources, invoking the provided handler for whichever source makes data available first.

Parameters:

- `T1`: Specifies type of data contained in the first source.
- `T2`: Specifies type of data contained in the second source.
- `T3`: Specifies type of data contained in the third source.
- `source1`: The first source.
- `action1`: The handler to execute on data from the first source.
- `source2`: The second source.
- `action2`: The handler to execute on data from the second source.
- `source3`: The third source.
- `action3`: The handler to execute on data from the third source.

Returns: A  `Task<T>` that represents the asynchronous choice. If all sources are completed prior to the choice completing, the resulting task will be canceled. When one of the sources has data available and successfully propagates it to the choice, the resulting task will complete when the handler completes; if the handler throws an exception, the task will end in the `TaskStatus.Faulted` state and will contain the unhandled exception. Otherwise, the task will end with its `Task<T>.Result` set to the 0-based index of the source.

This method will only consume an element from one of the data sources, never more than one.

Exceptions:

- `ArgumentNullException`: The `source1` is `null`.

-or-

The `action1` is `null`.

-or-

The `source2` is `null`.

-or-

The `action2` is `null`.

-or-

The `source3` is `null`.

-or-

The `action3` is `null`.

To be added.

## DataflowBlock.Choose<T1,T2,T3>(ISourceBlock<T1>, Action<T1>, ISourceBlock<T2>, Action<T2>, ISourceBlock<T3>, Action<T3>, DataflowBlockOptions) method

```csharp
public static System.Threading.Tasks.Task<int> Choose<T1,T2,T3> (System.Threading.Tasks.Dataflow.ISourceBlock<T1> source1, Action<T1> action1, System.Threading.Tasks.Dataflow.ISourceBlock<T2> source2, Action<T2> action2, System.Threading.Tasks.Dataflow.ISourceBlock<T3> source3, Action<T3> action3, System.Threading.Tasks.Dataflow.DataflowBlockOptions dataflowBlockOptions);
```

Monitors three dataflow sources, invoking the provided handler for whichever source makes data available first.

Parameters:

- `T1`: Specifies type of data contained in the first source.
- `T2`: Specifies type of data contained in the second source.
- `T3`: Specifies type of data contained in the third source.
- `source1`: The first source.
- `action1`: The handler to execute on data from the first source.
- `source2`: The second source.
- `action2`: The handler to execute on data from the second source.
- `source3`: The third source.
- `action3`: The handler to execute on data from the third source.
- `dataflowBlockOptions`: The options with which to configure this choice.

Returns: A  `Task<T>` that represents the asynchronous choice. If all sources are completed prior to the choice completing, or if the `CancellationToken` provided as part of `dataflowBlockOptions` is canceled prior to the choice completing, the resulting task will be canceled. When one of the sources has data available and successfully propagates it to the choice, the resulting task will complete when the handler completes; if the handler throws an exception, the task will end in the `TaskStatus.Faulted` state and will contain the unhandled exception. Otherwise, the task will end with its `Task<T>.Result` set to the 0-based index of the source.

This method will only consume an element from one of the data sources, never more than one. If cancellation is requested after an element has been received, the cancellation request will be ignored, and the relevant handler will be allowed to execute.

Exceptions:

- `ArgumentNullException`: The `source1` is `null`.

-or-

The `action1` is `null`.

-or-

The `source2` is `null`.

-or-

The `action2` is `null`.

-or-

The `source3` is `null`.

-or-

The `action3` is `null`.

-or-

The `dataflowBlockOptions` is `null`.

To be added.

## DataflowBlock.Encapsulate<TInput,TOutput>(ITargetBlock<TInput>, ISourceBlock<TOutput>) method

```csharp
public static System.Threading.Tasks.Dataflow.IPropagatorBlock<TInput,TOutput> Encapsulate<TInput,TOutput> (System.Threading.Tasks.Dataflow.ITargetBlock<TInput> target, System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source);
```

Encapsulates a target and a source into a single propagator.

Parameters:

- `TInput`: Specifies the type of input expected by the target.
- `TOutput`: Specifies the type of output produced by the source.
- `target`: The target to encapsulate.
- `source`: The source to encapsulate.

Returns: The encapsulated target and source.

#### Remarks
The `DataflowBlock.Encapsulate` method requires two existing blocks: a target block (an instance of a class that implements `ITargetBlock<T>`) and a source block (an instance of a class that implements `ISourceBlock<T>`). `DataflowBlock.Encapsulate` creates a new instance of an internal class that connects the `ITargetBlock<T>` interface members to the `target` parameter and the `ISourceBlock<T>` interface members to the `source` parameter.  Both `ITargetBlock<T>` and `ISourceBlock<T>` derive from `IDataflowBlock`. Block completion is explicitly passed from sources to targets. Therefore, the `IDataflowBlock.Complete` and `IDataflowBlock.Fault` methods are connected to the target while the `Completion` property is connected to the source.  You must ensure that when the target half  completes, the source half gets completed in the most appropriate manner; for example:

`target.Completion.ContinueWith(completion => source.Complete());`

Or, if you want to propagate the completion type, you can use this more sophisticated code:

```
target.Completion.ContinueWith(completion => { if (completion.IsFaulted)

((IDataflowBlock)batchBlock).Fault(completion.Exception);
else
batchBlock.Complete();
});

```

You must also explicitly provide the message propagation from target to source. The benefit of this explicit connection is that it gives you the freedom to perform any unconstrained processing between the two encapsulated blocks. You may do that either by encoding the necessary processing into the blocks' delegates (if the blocks take delegates), or by embedding a sub-network of blocks between them. The easier way is to use a block that takes delegates; for example, use `ActionBlock<T>`, `TransformBlock<T1,T2>`, `TransformManyBlock<T1,T2>` (if applicable), or a custom block.

## DataflowBlock.LinkTo<TOutput>(ISourceBlock<TOutput>, ITargetBlock<TOutput>) method

```csharp
public static IDisposable LinkTo<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target);
```

Links the `ISourceBlock<T>` to the specified  `ITargetBlock<T>`.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to link.
- `target`: The `ITargetBlock<T>` to which to connect the source.

Returns: An `IDisposable` that, upon calling `Dispose`, will unlink the source from the target.

Exceptions:

- `ArgumentNullException`: The `source` is `null`.

-or-

The `target` is `null`.

To be added.

## DataflowBlock.LinkTo<TOutput>(ISourceBlock<TOutput>, ITargetBlock<TOutput>, Predicate<TOutput>) method

```csharp
public static IDisposable LinkTo<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target, Predicate<TOutput> predicate);
```

Links the `ISourceBlock<T>` to the specified  `ITargetBlock<T>` using the specified filter.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to link.
- `target`: The  `ITargetBlock<T>` to which to connect the source.
- `predicate`: The filter a message must pass in order for it to propagate from the source to the target.

Returns: An `IDisposable` that, upon calling `Dispose`, will unlink the source from the target.

Exceptions:

- `ArgumentNullException`: The `source` is `null`.

-or-

The `target` is `null`.

-or-

The `predicate` is `null`.

To be added.

## DataflowBlock.LinkTo<TOutput>(ISourceBlock<TOutput>, ITargetBlock<TOutput>, DataflowLinkOptions, Predicate<TOutput>) method

```csharp
public static IDisposable LinkTo<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target, System.Threading.Tasks.Dataflow.DataflowLinkOptions linkOptions, Predicate<TOutput> predicate);
```

Links the  `ISourceBlock<T>` to the specified  `ITargetBlock<T>` using the specified filter.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to link.
- `target`: The  `ITargetBlock<T>` to which to connect the source.
- `linkOptions`: One of the enumeration values that specifies how to configure a link between dataflow blocks.
- `predicate`: The filter a message must pass in order for it to propagate from the source to the target.

Returns: An `IDisposable` that, upon calling `Dispose`, will unlink the source from the target.

Exceptions:

- `ArgumentNullException`: The  `source` is null (Nothing in Visual Basic).

-or-

The  `target` is null (Nothing in Visual Basic).

-or-

The  `linkOptions` is null (Nothing in Visual Basic).

-or-

The  `predicate` is null (Nothing in Visual Basic).

To be added.

## DataflowBlock.NullTarget<TInput>() method

```csharp
public static System.Threading.Tasks.Dataflow.ITargetBlock<TInput> NullTarget<TInput> ();
```

Gets a target block that synchronously accepts all messages offered to it and drops them.

Parameters:

- `TInput`: The type of the messages this block can accept.

Returns: A `ITargetBlock<T>` that accepts and subsequently drops all offered messages.

To be added.
