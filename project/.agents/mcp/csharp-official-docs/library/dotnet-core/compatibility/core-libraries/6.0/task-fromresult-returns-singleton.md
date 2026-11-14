---
title: "Breaking change: Task.FromResult may return singleton"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/6.0/task-fromresult-returns-singleton.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task.FromResult may return singleton

`System.Threading.Tasks.Task.FromResult``1(``0)` may now return a cached `System.Threading.Tasks.Task`1` instance rather than always creating a new instance.

## Old behavior

In previous versions, `System.Threading.Tasks.Task.FromResult``1(``0)` would always allocate a new `System.Threading.Tasks.Task`1`, regardless of the type of `T` or the result value.

## New behavior

For some `T` types and some result values, `System.Threading.Tasks.Task.FromResult``1(``0)` may return a cached singleton object rather than allocating a new object. For example, it is likely that every call to `Task.FromResult(true)` will return the same already-completed `Task<bool>` object.

## Version introduced

.NET 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Many developers expected `System.Threading.Tasks.Task.FromResult``1(``0)` to behave similarly to asynchronous methods, which already performed such caching. Developers that knew about the allocation behavior often maintained their own cache to avoid the performance cost of always allocating for these commonly used values. For example:

```csharp
private static readonly Task<bool> s_trueTask = Task.FromResult(true);
```

Now, such custom caches are no longer required for values such as `System.Boolean` and small `System.Int32` values.

## Recommended action

Unless you're using reference equality to check whether one `Task` instance is the same as another `Task` instance, you should not be impacted by this change. If you are using such reference equality and need to continue this checking, use the following code to be guaranteed to always get back a unique `System.Threading.Tasks.Task`1` instance:

```csharp
private static Task<T> NewInstanceFromResult<T>(T result)
{
    var tcs = new TaskCompletionSource<T>();
    tcs.TrySetResult(result);
    return tcs.Task;
}
```

> **Note:**
> This pattern is much less efficient than just using `Task.FromResult(result)`, and should be avoided unless you really need it.

## Affected APIs

- `System.Threading.Tasks.Task.FromResult``1(``0)`
