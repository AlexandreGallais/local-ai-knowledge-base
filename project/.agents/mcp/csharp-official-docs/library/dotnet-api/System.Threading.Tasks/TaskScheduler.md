---
title: "TaskScheduler class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskScheduler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskScheduler class

Namespace: `System.Threading.Tasks`

```csharp
public abstract class TaskScheduler
```

Represents an object that handles the low-level work of queuing tasks onto threads.

The `TaskScheduler` class represents a task scheduler. A task scheduler ensures that the work of a task is eventually executed.

The default task scheduler provides work-stealing for load-balancing, thread injection/retirement for maximum throughput, and overall good performance. It should be sufficient for most scenarios.

The `TaskScheduler` class also serves as the extension point for all customizable scheduling logic. This includes mechanisms such as how to schedule a task for execution, and how scheduled tasks should be exposed to debuggers. If you require special functionality, you can create a custom scheduler and enable it for specific tasks or queries.

#### The default task scheduler and the thread pool

The default scheduler for the Task Parallel Library and PLINQ uses the .NET thread pool, which is represented by the `ThreadPool` class, to queue and execute work. The thread pool uses the information that is provided by the `Task` type to efficiently support the fine-grained parallelism (short-lived units of work) that parallel tasks and queries often represent.

#### The global queue vs. local queues

The thread pool maintains a global FIFO (first-in, first-out) work queue for threads in each application domain. Whenever a program calls the `ThreadPool.QueueUserWorkItem` (or `ThreadPool.UnsafeQueueUserWorkItem`) method, the work is put on this shared queue and eventually de-queued onto the next thread that becomes available. Starting with .NET Framework 4, this queue uses a lock-free algorithm that resembles the `ConcurrentQueue<T>` class. By using this lock-free implementation, the thread pool spends less time when it queues and de-queues work items. This performance benefit is available to all programs that use the thread pool.

Top-level tasks, which are tasks that are not created in the context of another task, are put on the global queue just like any other work item. However, nested or child tasks, which are created in the context of another task, are handled quite differently. A child or nested task is put on a local queue that is specific to the thread on which the parent task is executing. The parent task may be a top-level task or it also may be the child of another task. When this thread is ready for more work, it first looks in the local queue. If work items are waiting there, they can be accessed quickly. The local queues are accessed in last-in, first-out order (LIFO) to preserve cache locality and reduce contention. For more information about child tasks and nested tasks, see Attached and Detached Child Tasks.

The use of local queues not only reduces pressure on the global queue, but also takes advantage of data locality. Work items in the local queue frequently reference data structures that are physically near one another in memory. In these cases, the data is already in the cache after the first task has run and can be accessed quickly. Both Parallel LINQ (PLINQ) and the `Parallel` class use nested tasks and child tasks extensively, and achieve significant speedups by using the local work queues.

#### Work stealing

Starting with .NET Framework 4, the thread pool also features a work-stealing algorithm to help make sure that no threads are sitting idle while others still have work in their queues. When a thread-pool thread is ready for more work, it first looks at the head of its local queue, then in the global queue, and then in the local queues of other threads. If it finds a work item in the local queue of another thread, it first applies heuristics to make sure that it can run the work efficiently. If it can, it de-queues the work item from the tail (in FIFO order). This reduces contention on each local queue and preserves data locality. This architecture helps the thread pool load-balance work more efficiently than past versions did.

#### Long-running tasks

You may want to explicitly prevent a task from being put on a local queue. For example, you may know that a particular work item will run for a relatively long time and is likely to block all other work items on the local queue. In this case, you can specify the `TaskCreationOptions` option, which provides a hint to the scheduler that an additional thread might be required for the task so that it does not block the forward progress of other threads or work items on the local queue. By using this option you avoid the thread pool completely, including the global and local queues.

#### Task inlining

In some cases when a `Task` is waited on, it may be executed synchronously on the thread that is performing the wait operation. This enhances performance by preventing the need for an additional thread and instead using the existing thread, which would have blocked otherwise. To prevent errors due to reentrancy, task inlining only occurs when the wait target is found in the relevant thread's local queue.

#### Specify a synchronization context

You can use the `TaskScheduler.FromCurrentSynchronizationContext` method to specify that a task should be scheduled to run on a particular thread. This is useful in frameworks such as Windows Forms and Windows Presentation Foundation where access to user interface objects is often restricted to code that is running on the same thread on which the UI object was created.

The following example uses the `TaskScheduler.FromCurrentSynchronizationContext` method in a Windows Presentation Foundation (WPF) app to schedule a task on the same thread that the user interface (UI) control was created on. The example creates a mosaic of images that are randomly selected from a specified directory. The WPF objects are used to load and resize the images. The raw pixels are then passed to a task that uses a `Parallel.For` loop to write the pixel data into a large single-byte array. No synchronization is required because no two tiles occupy the same array elements. The tiles can also be written in any order because their position is calculated independently of any other tile. The large array is then passed to a task that runs on the UI thread, where the pixel data is loaded into an Image control.

The example moves data off the UI thread, modifies it by using parallel loops and `Task` objects, and then passes it back to a task that runs on the UI thread. This approach is useful when you have to use the Task Parallel Library to perform operations that either are not supported by the WPF API, or are not sufficiently fast. Another way to create an image mosaic in WPF is to use a `WrapPanel` control and add images to it. The `WrapPanel` handles the work of positioning the tiles. However, this work can only be performed on the UI thread.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskScheduler/FromCurrentSynchronizationContext/mainwindow.xaml.cs._
To create the example, create a WPF application project in Visual Studio and name it WPF_CS1 (for a C# WPF project) or WPF_VB1 (for a Visual Basic WPF project). Then do the following:

1. In design view, drag an `Image` control from the **Toolbox** onto the upper left corner of the design surface. In the **Name** textbox of the **Properties** window, name the control "image".

2. Drag a `Button` control from the **Toolbox** to the lower left part of the application window. In XAML view, specify the `Content` property of the button as "Make a mosaic", and specify its `Width` property as "100". Connect the `Click` event with the `button_Click` event handler defined in the example's code by adding `Click="button_Click"` to the `` element. In the **Name** textbox of the **Properties** window, name the control "button".

3. Replace the entire contents of the MainWindow.xaml.cs or MainWindow.xaml.vb file with the code from this example. For a C# WPF project, make sure that the name of the workspace matches the project name.

4. The example reads JPEG images from a directory named *C:\Users\Public\Pictures\Sample Pictures*. Either create the directory and place some images in it, or change the path to refer to some other directory that contains images.

This example has some limitations. For example, only 32-bits-per-pixel images are supported; images in other formats are corrupted by the `BitmapImage` object during the resizing operation. Also, the source images must all be larger than the tile size. As a further exercise, you can add functionality to handle multiple pixel formats and file sizes.

The following example creates a custom task scheduler that limits the number of threads used by the app. It then launches two sets of tasks and displays information about the task and the thread on which the task is executing.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskScheduler/Overview/limitex1.cs._
## TaskScheduler.TaskScheduler() constructor

```csharp
protected TaskScheduler ();
```

Initializes the `TaskScheduler`.

To be added.

## TaskScheduler.Current property

```csharp
public static System.Threading.Tasks.TaskScheduler Current { get; }
```

Gets the `TaskScheduler` associated with the currently executing task.

Returns: Returns the `TaskScheduler` associated with the currently executing task.

#### Remarks
When not called from within a task, `TaskScheduler.Current` will return the `TaskScheduler.Default` scheduler.

For more information, see `TaskScheduler`.

## TaskScheduler.Default property

```csharp
public static System.Threading.Tasks.TaskScheduler Default { get; }
```

Gets the default `TaskScheduler` instance that is provided by .NET.

Returns: Returns the default `TaskScheduler` instance.

#### Remarks
For more information, see `TaskScheduler`.

## TaskScheduler.Id property

```csharp
public int Id { get; }
```

Gets the unique ID for this `TaskScheduler`.

Returns: Returns the unique ID for this `TaskScheduler`.

#### Remarks
For more information, see `TaskScheduler`.

## TaskScheduler.MaximumConcurrencyLevel property

```csharp
public virtual int MaximumConcurrencyLevel { get; }
```

Indicates the maximum concurrency level this `TaskScheduler` is able to support.

Returns: Returns an integer that represents the maximum concurrency level. The default scheduler returns <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
For more information, see `TaskScheduler`.

## TaskScheduler.FromCurrentSynchronizationContext() method

```csharp
public static System.Threading.Tasks.TaskScheduler FromCurrentSynchronizationContext ();
```

Creates a `TaskScheduler` associated with the current `SynchronizationContext`.

Returns: A `TaskScheduler` associated with the current `SynchronizationContext`, as determined by `SynchronizationContext.Current`.

Exceptions:

- `InvalidOperationException`: The current SynchronizationContext may not be used as a TaskScheduler.

#### Remarks
All `Task` instances queued to the returned scheduler will be executed through a call to the `SynchronizationContext.Post` method on that context.

For more information, see `TaskScheduler`.

## TaskScheduler.GetScheduledTasks() method

```csharp
protected abstract System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task>? GetScheduledTasks ();
```

For debugger support only, generates an enumerable of `Task` instances currently queued to the scheduler waiting to be executed.

Returns: An enumerable that allows a debugger to traverse the tasks currently queued to this scheduler.

Exceptions:

- `NotSupportedException`: This scheduler is unable to generate a list of queued tasks at this time.

#### Remarks
A class derived from `TaskScheduler` implements this method in order to support integration with debuggers. This method will only be invoked when the debugger requests access to the data. The enumerable returned will be traversed by debugging utilities to access the tasks currently queued to this scheduler, enabling the debugger to provide a representation of this information in the user interface.

It is important to note that, when this method is called, all other threads in the process will be frozen. Therefore, it's important to avoid synchronization with other threads that may lead to blocking. If synchronization is necessary, and you are unable to acquire the lock in this method, then you should throw an exception so that the debugger does not block. The following example shows one possible approach in C#:

```csharp
protected override IEnumerable<Task> GetScheduledTasks()
{
    bool lockTaken = false;
    try
    {
        Monitor.TryEnter(_syncObj, ref lockTaken);
        if (lockTaken)
        {
            return _tasks.ToArray();
        }
        else throw new NotSupportedException();
    }
    finally
    {
    if (lockTaken) Monitor.Exit(_syncObj);
    }}
```

Additionally, this method and the enumerable returned must not modify any globally visible state.

The returned enumerable should never be null. If there are currently no queued tasks, an empty enumerable should be returned instead.

Developers who are implementing custom debuggers shouldn't call this method directly, but should use the internal wrapper method `GetScheduledTasksForDebugger` instead: `internal Task[] GetScheduledTasksForDebugger()`. This wrapper method returns an array of tasks instead of an enumerable. To retrieve a list of active schedulers, use the internal method `internal static TaskScheduler[] GetTaskSchedulersForDebugger()`. This static method returns an array of all active `TaskScheduler` instances. You can then use `GetScheduledTasksForDebugger` on each scheduler instance to retrieve its list of scheduled tasks.

## TaskScheduler.QueueTask(Task) method

```csharp
protected internal abstract void QueueTask (System.Threading.Tasks.Task task);
```

Queues a `Task` to the scheduler.

Parameters:

- `task`: The `Task` to be queued.

Exceptions:

- `ArgumentNullException`: The `task` argument is null.

#### Remarks
A class derived from `TaskScheduler` implements this method to accept tasks being scheduled on the scheduler.

A typical implementation would store the task in an internal data structure, which would be serviced by threads that would execute those tasks at some time in the future.

This method is only meant to be called by the .NET runtime and should not be called directly by the derived class. This is necessary for maintaining the consistency of the system.
