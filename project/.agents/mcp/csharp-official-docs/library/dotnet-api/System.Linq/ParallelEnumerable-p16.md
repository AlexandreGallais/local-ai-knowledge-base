---
title: "ParallelEnumerable class (part 16 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 16 of 16)

## ParallelEnumerable.Zip<TFirst,TSecond,TResult>(ParallelQuery<TFirst>, ParallelQuery<TSecond>, Func<TFirst,TSecond,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Zip<TFirst,TSecond,TResult> (this System.Linq.ParallelQuery<TFirst> first, System.Linq.ParallelQuery<TSecond> second, Func<TFirst,TSecond,TResult> resultSelector);
```

Merges in parallel two sequences by using the specified predicate function.

Parameters:

- `TFirst`: The type of the elements of the first sequence.
- `TSecond`: The type of the elements of the second sequence.
- `TResult`: The type of the return elements.
- `first`: The first sequence to zip.
- `second`: The second sequence to zip.
- `resultSelector`: A function to create a result element from two matching elements.

Returns: A sequence that has elements of type `TResult` that are obtained by performing `resultSelector` pairwise on two sequences. If the sequence lengths are unequal, this truncates to the length of the shorter sequence.

Exceptions:

- `ArgumentNullException`: `first` or `second` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.
