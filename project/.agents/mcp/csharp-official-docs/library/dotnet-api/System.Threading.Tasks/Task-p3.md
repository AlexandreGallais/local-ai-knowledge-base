---
title: "Task class (part 3 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 3 of 11)

## Task.ContinueWith(Task>) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task> continuationAction);
```

Creates a continuation that executes asynchronously when the target `Task` completes.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be passed the completed task as an argument.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

#### Examples
The following example defines a task that populates an array with 100 random date and time values. It uses the `ContinueWith` method to select the earliest and the latest date values once the array is fully populated.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/ContinueWith/continuewith1.cs._

Because a console application may terminate before the continuation task executes, the `Wait` method is called to ensure that the continuation finishes executing before the example ends.

For an additional example, see Chaining Tasks by Using Continuation Tasks.

## Task.ContinueWith(Object>, Object) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task,object?> continuationAction, object? state);
```

Creates a continuation that receives caller-supplied state information and executes when the target `Task` completes.

Parameters:

- `continuationAction`: An action to run when the task completes. When run, the delegate is passed the completed task and a caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.

Returns: A new continuation task.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting early due to cancellation.

## Task.ContinueWith(Task>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task> continuationAction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that receives a cancellation token and executes asynchronously when the target `Task` completes.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `TaskFactory.CancellationToken` that will be assigned to the new continuation task.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created the token has already been disposed.
- `ArgumentNullException`: The `continuationAction` argument is null.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith(Task>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task> continuationAction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes when the target task completes according to the specified `TaskContinuationOptions`.

Parameters:

- `continuationAction`: An action to run according to the specified `continuationOptions`. When run, the delegate will be passed the completed task as an argument.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is null.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

#### Examples
The following example demonstrates using `TaskContinuationOptions` to specify that a continuation task should run synchronously when the antecedent task completes. (If the specified task has already completed by the time `Task.ContinueWith` is called, the synchronous continuation will run on the thread calling `Task.ContinueWith`.)

```csharp
public class TaskCounter
{
   private volatile int _count;

   public void Track(Task t)
   {
      if (t == null) throw new ArgumentNullException("t");
      Interlocked.Increment(ref _count);
      t.ContinueWith(ct => Interlocked.Decrement(ref _count), TaskContinuationOptions.ExecuteSynchronously);
   }

   public int NumberOfActiveTasks { get { return _count; } }
}
```

```vb
Public Class TaskCounter
   Private _count as Integer

   Public Sub Track(ByVal t as Task)
      If t is Nothing Then Throw New ArgumentNullException("t")
      Interlocked.Increment(_count)
      t.ContinueWith(Sub(ct)
                        Interlocked.Decrement(_count)
                     End Sub,
                     TaskContinuationOptions.ExecuteSynchronously)
   End Sub

   Public ReadOnly Property NumberOfActiveTasks As Integer
      Get
         Return _count
      End Get
   End Property
End Class
```

## Task.ContinueWith(Task>, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task> continuationAction, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes asynchronously when the target `Task` completes. The continuation uses a specified scheduler.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be passed the completed task as an argument.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.

-or-

The `scheduler` argument is null.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith(Object>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task,object?> continuationAction, object? state, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that receives caller-supplied state information and a cancellation token and that executes asynchronously when the target `Task` completes.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith(Object>, Object, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task,object?> continuationAction, object? state, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that receives caller-supplied state information and executes when the target `Task` completes. The continuation executes based on a set of specified conditions.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

## Task.ContinueWith(Object>, Object, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task,object?> continuationAction, object? state, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that receives caller-supplied state information and executes asynchronously when the target `Task` completes. The continuation uses a specified scheduler.

Parameters:

- `continuationAction`: An action to run when the `Task` completes.  When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith(Task>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task> continuationAction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes when the target task competes according to the specified `TaskContinuationOptions`. The continuation receives a cancellation token and uses a specified scheduler.

Parameters:

- `continuationAction`: An action to run according to the specified `continuationOptions`. When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `TaskFactory.CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created the token has already been disposed.
- `ArgumentNullException`: The `continuationAction` argument is null.

-or-

The `scheduler` argument is null.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

#### Examples
The following is an example of using ContinueWith to run work both in the background and on the user interface threads.

```csharp
private void Button1_Click(object sender, EventArgs e)
{
   var backgroundScheduler = TaskScheduler.Default;
   var uiScheduler = TaskScheduler.FromCurrentSynchronizationContext();
   Task.Factory.StartNew(delegate { DoBackgroundComputation(); },
                         backgroundScheduler).
   ContinueWith(delegate { UpdateUI(); }, uiScheduler).
                ContinueWith(delegate { DoAnotherBackgroundComputation(); },
                             backgroundScheduler).
                ContinueWith(delegate { UpdateUIAgain(); }, uiScheduler);
}
```

```vb
Private Sub Button1_Click(ByVal sender As System.Object,
                          ByVal e As System.EventArgs) Handles Button1.Click
   Dim backgroundScheduler = TaskScheduler.Default
   Dim uiScheduler = TaskScheduler.FromCurrentSynchronizationContext()

   Task.Factory.StartNew(Sub()
                           DoBackgroundComputation()
                         End Sub, backgroundScheduler).ContinueWith(Sub(t)
                            UpdateUI()
                         End Sub, uiScheduler).ContinueWith(Sub(t)
                            DoAnotherBackgroundComputation()
                         End Sub, backgroundScheduler).ContinueWith(Sub(t)
                            UpdateUIAgain()
                         End Sub, uiScheduler)
End Sub
```
