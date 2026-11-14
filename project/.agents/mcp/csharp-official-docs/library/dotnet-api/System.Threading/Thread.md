---
title: "Thread class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class

Namespace: `System.Threading`

```csharp
public sealed class Thread : System.Runtime.ConstrainedExecution.CriticalFinalizerObject
```

Creates and controls a thread, sets its priority, and gets its status.

The `Thread` class creates and controls a thread, sets its priority, and gets its status.

When a process starts, the common language runtime automatically creates a single foreground thread to execute application code. Along with this main foreground thread, a process can create one or more threads to execute a portion of the program code associated with the process. These threads can execute either in the foreground or in the background. In addition, you can use the `ThreadPool` class to execute code on worker threads that are managed by the common language runtime.

#### Start a thread

You start a thread by supplying a delegate that represents the method the thread is to execute in its class constructor. You then call the `Thread.Start` method to begin execution.

The `Thread` constructors can take either of two delegate types, depending on whether you can pass an argument to the method to be executed:

- If the method has no arguments, you pass a `ThreadStart` delegate to the constructor. It has the signature:

```csharp
    public delegate void ThreadStart()
```

```vb
    Public Delegate Sub ThreadStart()
```

The following example creates and starts a thread that executes the `ExecuteInForeground` method. The method displays information about some thread properties, then executes a loop in which it pauses for half a second and displays the elapsed number of seconds. When the thread has executed for at least five seconds, the loop ends and the thread terminates execution.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Overview/ThreadStart1.cs._

- If the method has an argument, you pass a `ParameterizedThreadStart` delegate to the constructor. It has the signature:

```csharp
    public delegate void ParameterizedThreadStart(object obj)
```

```vb
    Public Delegate Sub ParameterizedThreadStart(obj As Object)
```

The method executed by the delegate can then cast (in C#) or convert (in Visual Basic) the parameter to the appropriate type.

The following example is identical to the previous one, except that it calls the `%23ctor` constructor. This version of the `ExecuteInForeground` method has a single parameter that represents the approximate number of milliseconds the loop is to execute.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Overview/ThreadStart2.cs._

It isn't necessary to retain a reference to a `Thread` object once you've started the thread. The thread continues to execute until the thread procedure is complete.

#### Retrieve Thread objects

You can use the static (`Shared` in Visual Basic) `CurrentThread` property to retrieve a reference to the currently executing thread from the code that the thread is executing. The following example uses the `CurrentThread` property to display information about the main application thread, another foreground thread, a background thread, and a thread pool thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Overview/Instance1.cs._

#### Foreground and background threads

Instances of the `Thread` class represent either foreground threads or background threads. Background threads are identical to foreground threads with one exception: a background thread does not keep a process running if all foreground threads have terminated. Once all foreground threads have been stopped, the runtime stops all background threads and shuts down.

By default, the following threads execute in the foreground:

- The main application thread.

- All threads created by calling a `Thread` class constructor.

The following threads execute in the background by default:

- Thread pool threads, which come from a pool of worker threads maintained by the runtime. You can configure the thread pool and schedule work on thread pool threads by using the `ThreadPool` class.

> **Note:**
> Task-based asynchronous operations automatically execute on thread pool threads. Task-based asynchronous operations use the `Task` and `Task<T>` classes to implement the task-based asynchronous pattern.

- All threads that enter the managed execution environment from unmanaged code.

You can change a thread to execute in the background by setting the `IsBackground` property at any time. Background threads are useful for any operation that should continue as long as an application is running but should not prevent the application from terminating, such as monitoring file system changes or incoming socket connections.

The following example illustrates the difference between foreground and background threads. It's like the first example in the Start a thread section, except that it sets the thread to execute in the background before starting it. As the output shows, the loop is interrupted before it executes for five seconds.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Overview/BackgroundEx1.cs._

#### Culture and threads

Each thread has a culture, represented by the `CurrentCulture` property, and a UI culture, represented by the `CurrentUICulture` property. The current culture supports culture-sensitive operations, such as parsing and formatting, string comparison, and sorting, and also controls the writing system and calendar used by a thread. The current UI culture provides for culture-sensitive retrieval of resources in resource files.

> **Important:**
> The `CurrentCulture` and `CurrentUICulture` properties don't work reliably when used with any thread other than the current thread. An `InvalidOperationException` is thrown if a thread attempts to read or write these properties on a different thread.
> We recommend that you use the `CurrentCulture` and `CurrentUICulture` properties to retrieve and set the current culture.

When a new thread is instantiated, its culture and UI culture are defined by the current system culture and UI culture, and not by the culture and UI culture of the thread from which the new thread is created. This means, for example, that if the current system culture is English (United States) and the current culture of the primary application thread is French (France), the culture of a new thread created by calling the `%23ctor` constructor from the primary thread is English (United States), and not French (France). For more information, see the "Culture and threads" section of the `CultureInfo` class topic.

> **Important:**
> This is not true of threads that execute asynchronous operations for apps that target .NET Framework 4.6 and later versions. In this case, the culture and UI culture is part of an asynchronous operation's context; the thread on which an asynchronous operation executes by default inherits the culture and UI culture of the thread from which the asynchronous operation was launched. For more information, see the "Culture and task-based asynchronous operations" section of the `CultureInfo` class remarks.

You can do either of the following to ensure that all of the threads executing in an application share the same culture and UI culture:

- You can pass a `CultureInfo` object that represents that culture to the `ParameterizedThreadStart` delegate or the `QueueUserWorkItem` method.

- For apps running on .NET Framework 4.5 and later versions, you can define the culture and UI culture that is to be assigned to all threads created in an application domain by setting the value of the `DefaultThreadCurrentCulture` and `DefaultThreadCurrentUICulture` properties. Note that this is a per-application domain setting.

For more information and examples, see the "Culture and threads" section of the `CultureInfo` class remarks.

#### Get information about and control threads

You can retrieve a number of property values that provide information about a thread. In some cases, you can also set these property values to control the operation of the thread. These thread properties include:

- A name. `Name` is a write-once property that you can use to identify a thread. Its default value is `null`.

- A hash code, which you can retrieve by calling the `Thread.GetHashCode` method. The hash code can be used to uniquely identify a thread; for the lifetime of your thread, its hash code will not collide with the value from any other thread, regardless of the application domain from which you obtain the value.

- A thread ID. The value of the read-only `ManagedThreadId` property is assigned by the runtime and uniquely identifies a thread within its process.

> **Note:**
> An operating-system ThreadId has no fixed relationship to a managed thread, because an unmanaged host can control the relationship between managed and unmanaged threads. Specifically, a sophisticated host can use the CLR Hosting API to schedule many managed threads against the same operating system thread, or to move a managed thread between different operating system threads.

- The thread's current state. For the duration of its existence, a thread is always in one or more of the states defined by the `ThreadState` property.

- A scheduling priority level, which is defined by the `ThreadPriority` property. Although you can set this value to request a thread's priority, it is not guaranteed to be honored by the operating system.

- The read-only `IsThreadPoolThread` property, which indicates whether a thread is a thread-pool thread.

- The `IsBackground` property. For more information, see the Foreground and background threads section.

#### Examples

The following example demonstrates simple threading functionality.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Overview/source.cs._

This code produces output similar to the following:

```output
[VB, C++, C#]
Main thread: Start a second thread.
Main thread: Do some work.
ThreadProc: 0
Main thread: Do some work.
ThreadProc: 1
Main thread: Do some work.
ThreadProc: 2
Main thread: Do some work.
ThreadProc: 3
Main thread: Call Join(), to wait until ThreadProc ends.
ThreadProc: 4
ThreadProc: 5
ThreadProc: 6
ThreadProc: 7
ThreadProc: 8
ThreadProc: 9
Main thread: ThreadProc.Join has returned. Press Enter to end program.
```

## Thread.Thread(ParameterizedThreadStart) constructor

```csharp
public Thread (System.Threading.ParameterizedThreadStart start);
```

Initializes a new instance of the `Thread` class, specifying a delegate that allows an object to be passed to the thread when the thread is started.

Parameters:

- `start`: A delegate that represents the methods to be invoked when this thread begins executing.

Exceptions:

- `ArgumentNullException`: `start` is `null`.

#### Remarks
A thread does not begin executing when it is created. To schedule the thread for execution, call the `Thread.Start` method. To pass a data object to the thread, use the `Start` method overload.

> **Note:**
> Visual Basic users can omit the `ThreadStart` constructor when creating a thread. Use the `AddressOf` operator when passing your method, for example, `Dim t As New Thread(AddressOf ThreadProc)`. Visual Basic <example-value> calls the `ThreadStart` constructor.

#### Examples
The following example shows the syntax for creating and using a `ParameterizedThreadStart` delegate with a static method and an instance method.

_Code sample not included: ~/snippets/csharp/System.Threading/ParameterizedThreadStart/Overview/source.cs._

## Thread.Thread(ThreadStart) constructor

```csharp
public Thread (System.Threading.ThreadStart start);
```

Initializes a new instance of the `Thread` class.

Parameters:

- `start`: A `ThreadStart` delegate that represents the methods to be invoked when this thread begins executing.

Exceptions:

- `ArgumentNullException`: The `start` parameter is `null`.

#### Remarks
A thread does not begin executing when it is created. To schedule the thread for execution, call the `Thread.Start` method.

> **Note:**
> Visual Basic users can omit the `ThreadStart` constructor when creating a thread. Use the `AddressOf` operator when passing your method, for example, `Dim t As New Thread(AddressOf ThreadProc)`. Visual Basic <example-value> calls the `ThreadStart` constructor.

#### Examples
The following code example shows how to create a thread that executes a static method.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/.ctor/source.cs._

The following code example shows how to create a thread that executes an instance method.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/.ctor/source1.cs._

## Thread.Thread(ParameterizedThreadStart, Int32) constructor

```csharp
public Thread (System.Threading.ParameterizedThreadStart start, int maxStackSize);
```

Initializes a new instance of the `Thread` class, specifying a delegate that allows an object to be passed to the thread when the thread is started and specifying the maximum stack size for the thread.

Parameters:

- `start`: A `ParameterizedThreadStart` delegate that represents the methods to be invoked when this thread begins executing.
- `maxStackSize`: The maximum stack size, in bytes, to be used by the thread, or 0 to use the default maximum stack size specified in the header for the executable.

Exceptions:

- `ArgumentNullException`: `start` is `null`.
- `ArgumentOutOfRangeException`: `maxStackSize` is less than zero.

#### Remarks
Avoid using this constructor overload. The default stack size used by the `%23ctor` constructor overload is the recommended stack size for threads. If a thread has memory problems, the most likely cause is programming error, such as infinite recursion.

If `maxStackSize` is less than the minimum stack size, the minimum stack size is used. If `maxStackSize` is not a multiple of the page size, it is rounded to the next larger multiple of the page size.
