---
title: "TaskExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskExtensions class

Namespace: `System.Threading.Tasks`

```csharp
public static class TaskExtensions
```

Provides a set of static methods for `Task`.

To be added.

## TaskExtensions.Unwrap(Task>) method

```csharp
public static System.Threading.Tasks.Task Unwrap (this System.Threading.Tasks.Task<System.Threading.Tasks.Task> task);
```

Creates a proxy `Task` that represents the asynchronous operation of a `Task<Task>` (C#) or `Task (Of Task)` (Visual Basic).

Parameters:

- `task`: The `Task<Task>` (C#) or `Task (Of Task)` (Visual Basic) to unwrap.

Returns: A Task that represents the asynchronous operation of the provided `System.Threading.Tasks.Task(Of Task)`.

Exceptions:

- `ArgumentNullException`: The exception that is thrown if the `task` argument is null.

#### Remarks
It is often useful to be able to return a Task from a `Task<T>`, where the inner Task represents work done as part of the outer `Task<T>`. However, doing so results in a `Task<Task>` (C#) or `Task (Of Task)` (Visual Basic), which, if not dealt with carefully, could produce unexpected behavior. Unwrap solves this problem by creating a proxy Task that represents the entire asynchronous operation of such a task.

#### Examples
The following example shows how to unwrap a task:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskExtensions/Unwrap/unwrap.cs._

## TaskExtensions.Unwrap<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<TResult> Unwrap<TResult> (this System.Threading.Tasks.Task<System.Threading.Tasks.Task<TResult>> task);
```

Creates a proxy `Task` that represents the asynchronous operation of a `Task<Task<T>>` (C#) or `Task (Of Task(Of T))` (Visual Basic).

Parameters:

- `TResult`: The type of the task's result.
- `task`: The `Task<Task<T>>` (C#) or `Task (Of Task(Of T))` (Visual Basic) to unwrap.

Returns: A `Task` that represents the asynchronous operation of the provided `Task<Task<T>>` (C#) or `Task (Of Task(Of T))` (Visual Basic).

Exceptions:

- `ArgumentNullException`: The exception that is thrown if the `task` argument is null.

#### Remarks
It is often useful to be able to return a `Task` from a `Task`, where the inner `Task` represents work done as part of the outer `Task`. However, doing so results in a `Task<Task<T>>` (C#) or `Task (Of Task(Of T))` (Visual Basic), which, if not dealt with carefully, could produce unexpected behavior. Unwrap solves this problem by creating a proxy `Task<T>` that represents the entire asynchronous operation of such a `Task<Task<T>>` (C#) or `Task (Of Task(Of T))` (Visual Basic).
