---
title: "Thread class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 2 of 7)

## Thread.Thread(ThreadStart, Int32) constructor

```csharp
public Thread (System.Threading.ThreadStart start, int maxStackSize);
```

Initializes a new instance of the `Thread` class, specifying the maximum stack size for the thread.

Parameters:

- `start`: A `ThreadStart` delegate that represents the methods to be invoked when this thread begins executing.
- `maxStackSize`: The maximum stack size, in bytes, to be used by the thread, or 0 to use the default maximum stack size specified in the header for the executable.

Exceptions:

- `ArgumentNullException`: `start` is `null`.
- `ArgumentOutOfRangeException`: `maxStackSize` is less than zero.

#### Remarks
Avoid using this constructor overload. The default stack size used by the `%23ctor` constructor overload is the recommended stack size for threads. If a thread has memory problems, the most likely cause is programming error, such as infinite recursion.

If `maxStackSize` is less than the minimum stack size, the minimum stack size is used. If `maxStackSize` is not a multiple of the page size, it is rounded to the next larger multiple of the page size.

## Thread.ApartmentState property

```csharp
public System.Threading.ApartmentState ApartmentState { get; set; }
```

Gets or sets the apartment state of this thread.

Returns: One of the `ApartmentState` values. The initial value is `Unknown`.

Exceptions:

- `ArgumentException`: An attempt is made to set this property to a state that is not a valid apartment state (a state other than single-threaded apartment (`STA`) or multithreaded apartment (`MTA`)).

To be added.

## Thread.CurrentCulture property

```csharp
public System.Globalization.CultureInfo CurrentCulture { get; set; }
```

Gets or sets the culture for the current thread.

Returns: An object that represents the culture for the current thread.

Exceptions:

- `ArgumentNullException`: The property is set to `null`.
- `InvalidOperationException`: Reading or writing the culture of a thread from another thread is not supported.

#### Remarks
The `CultureInfo` object that is returned by this property, together with its associated objects, determine the default format for dates, times, numbers, currency values, the sorting order of text, casing conventions, and string comparisons. See the `CultureInfo` class to learn about culture names and identifiers, the differences between invariant, neutral, and specific cultures, and the way culture information affects threads. See the `CurrentCulture` property to learn how a thread's default culture is determined, and how users set culture information for their computers.

> **Important:**
> The `CurrentCulture` property doesn't work reliably when used with any thread other than the current thread. An `InvalidOperationException` is thrown if a thread attempts to read or write the `CurrentCulture` property on a different thread. We recommend that you use the `CurrentCulture` property to retrieve and set the current culture.

You can set the `CurrentCulture` property to a neutral culture. When the `CultureInfo` class represents a neutral culture, its property values (in particular, the `CultureInfo.Calendar`, `CultureInfo.CompareInfo`, `CultureInfo.DateTimeFormat`, `CultureInfo.NumberFormat`, and `CultureInfo.TextInfo` properties) reflect the specific culture that's associated with the neutral culture.

#### Examples
The following example shows the threading statement that allows the user interface of a Windows Forms application to display in the culture that is set in Control Panel. Additional code is needed.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/CurrentCulture/source.cs._

## Thread.CurrentPrincipal property

```csharp
public static System.Security.Principal.IPrincipal? CurrentPrincipal { get; set; }
```

Gets or sets the thread's current principal (for role-based security).

Returns: An `IPrincipal` value representing the security context.

Exceptions:

- `SecurityException`: The caller does not have the permission required to set the principal.

#### Examples
The following code example shows how to set and retrieve the principal of a thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/CurrentPrincipal/source.cs._

## Thread.CurrentThread property

```csharp
public static System.Threading.Thread CurrentThread { get; }
```

Gets the currently running thread.

Returns: A `Thread` that is the representation of the currently running thread.

#### Examples
The following example creates a task that in turn creates 20 child tasks. The application itself, as well as each task, calls the `ShowThreadInformation` method, which uses the `CurrentThread` property  to display information about the thread on which it is running.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/CurrentThread/currentthread2.cs._

Each child task generates 1 million random numbers between 1 and 1 million and returns their mean. The parent task calls the `Task.WaitAll` method to ensure that the child tasks have completed before displaying the mean returned by each task and calculating the mean of means.

Note that while the application runs on a foreground thread, each task runs on a thread pool thread.

## Thread.CurrentUICulture property

```csharp
public System.Globalization.CultureInfo CurrentUICulture { get; set; }
```

Gets or sets the current culture used by the Resource Manager to look up culture-specific resources at run time.

Returns: An object that represents the current culture.

Exceptions:

- `ArgumentNullException`: The property is set to `null`.
- `ArgumentException`: The property is set to a culture name that cannot be used to locate a resource file. Resource filenames must include only letters, numbers, hyphens or underscores.
- `InvalidOperationException`: Reading or writing the culture of a thread from another thread is not supported.

#### Remarks
The UI culture specifies the resources an application needs to support user input and output, and by default is the same as the operating system culture. See the `CultureInfo` class to learn about culture names and identifiers, the differences between invariant, neutral, and specific cultures, and the way culture information affects threads. See the `CurrentUICulture` property to learn how a thread's default UI culture is determined.

> **Important:**
> The `CurrentUICulture` property doesn't work reliably when used with any thread other than the current thread. An `InvalidOperationException` is thrown if a thread attempts to read or write the `CurrentUICulture` property on a different thread.
> We recommend that you use the `CurrentUICulture` property to retrieve and set the current culture.

The `CultureInfo` returned by this property can be a neutral culture. Neutral cultures should not be used with formatting methods such as `Format`, `ToString`, and `ToString`. Use the `CultureInfo.CreateSpecificCulture` method to get a specific culture, or use the `CurrentCulture` property.

#### Examples
The following example determines whether the language of the current thread's UI culture is French. If it is not, it sets the UI culture of the current thread to English (United States).

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/CurrentUICulture/CurrentUICulture1.cs._

The following code example shows the threading statement that allows the user interface of a Windows Forms to display in the culture that is set in Control Panel. Additional code is needed.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/CurrentCulture/source.cs._

## Thread.ExecutionContext property

```csharp
public System.Threading.ExecutionContext? ExecutionContext { get; }
```

Gets an `ExecutionContext` object that contains information about the various contexts of the current thread.

Returns: An `ExecutionContext` object that consolidates context information for the current thread.

#### Remarks
The `ExecutionContext` class provides a single container for all information relevant to a logical thread of execution. This includes security context, call context, synchronization context, localization context, and transaction context.

## Thread.IsAlive property

```csharp
public bool IsAlive { get; }
```

Gets a value indicating the execution status of the current thread.

Returns: `true` if this thread has been started and has not terminated normally or aborted; otherwise, `false`.

To be added.

## Thread.IsBackground property

```csharp
public bool IsBackground { get; set; }
```

Gets or sets a value indicating whether or not a thread is a background thread.

Returns: `true` if this thread is or is to become a background thread; otherwise, `false`.

Exceptions:

- `ThreadStateException`: The thread is dead.

#### Remarks
A thread is either a background thread or a foreground thread. Background threads are identical to foreground threads, except that background threads do not prevent a process from terminating. Once all foreground threads belonging to a process have terminated, the common language runtime ends the process. Any remaining background threads are stopped and do not complete.

By default, the following threads execute in the foreground (that is, their `IsBackground` property returns `false`):

- The primary thread (or main application thread).

- All threads created by calling a `Thread` class constructor.

By default, the following threads execute in the background  (that is, their `IsBackground` property returns `true`):

- Thread pool threads, which are a pool of worker threads maintained by the runtime. You can configure the thread pool and schedule work on thread pool threads by using the `ThreadPool` class.

> **Note:**
> Task-based asynchronous operations automatically execute on thread pool threads.

- All threads that enter the managed execution environment from unmanaged code.

#### Examples
The following example contrasts the behavior of foreground and background threads. It creates a foreground thread and a background thread. The foreground thread keeps the process running until completes its `for` loop and terminates. However, as the output from the example shows, because the foreground thread has finished execution, the process is terminated before the background thread has completed execution.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/IsBackground/source.cs._

## Thread.IsThreadPoolThread property

```csharp
public bool IsThreadPoolThread { get; }
```

Gets a value indicating whether or not a thread belongs to the managed thread pool.

Returns: `true` if this thread belongs to the managed thread pool; otherwise, `false`.

#### Remarks
For more information see The managed thread pool.

#### Examples
The following code example shows how to determine whether a thread is from the thread pool.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/IsThreadPoolThread/source.cs._

## Thread.ManagedThreadId property

```csharp
public int ManagedThreadId { get; }
```

Gets a unique identifier for the current managed thread.

Returns: An integer that represents a unique identifier for this managed thread.

#### Remarks
A thread's `ManagedThreadId` property value serves to uniquely identify that thread within its process.

The value of the `ManagedThreadId` property does not vary over time, even if unmanaged code that hosts the common language runtime implements the thread as a fiber.

## Thread.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the thread.

Returns: A string containing the name of the thread, or `null` if no name was set.

#### Remarks

The string assigned to the `Name` property can include any Unicode character.

## Thread.Priority property

```csharp
public System.Threading.ThreadPriority Priority { get; set; }
```

Gets or sets a value indicating the scheduling priority of a thread.

Returns: One of the `ThreadPriority` values. The default value is `ThreadPriority.Normal`.

Exceptions:

- `ThreadStateException`: The thread has reached a final state, such as `ThreadState.Aborted`.
- `ArgumentException`: The value specified for a set operation is not a valid `ThreadPriority` value.

#### Remarks
A thread can be assigned any one of the following priority `ThreadPriority` values:

-   `Highest`

-   `AboveNormal`

-   `Normal`

-   `BelowNormal`

-   `Lowest`

Operating systems are not required to honor the priority of a thread.

#### Examples
The following example shows the result of changing the priority of a thread. Three threads are created, the priority of one thread is set to `BelowNormal`, and the priority of a second is set to `AboveNormal`. Each thread increments a variable in a `while` loop and runs for a set time.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Priority/Example1.cs._

## Thread.ThreadState property

```csharp
public System.Threading.ThreadState ThreadState { get; }
```

Gets a value containing the states of the current thread.

Returns: One of the `ThreadState` values indicating the state of the current thread. The initial value is `ThreadState.Unstarted`.

#### Remarks
The `ThreadState` property provides more specific information than the `IsAlive` property.

> **Important:**
> Thread state is only of interest in debugging scenarios. Your code should never use thread state to synchronize the activities of threads.

#### Examples
The following code example demonstrates accessing the `ThreadState` of a thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/ThreadState/source.cs._

## Thread.Abort() method

```csharp
public void Abort ();
```

Raises a `ThreadAbortException` in the thread on which it is invoked, to begin the process of terminating the thread. Calling this method usually terminates the thread.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Thread.Abort(Object) method

```csharp
public void Abort (object? stateInfo);
```

Raises a `ThreadAbortException` in the thread on which it is invoked, to begin the process of terminating the thread while also providing exception information about the thread termination. Calling this method usually terminates the thread.

Parameters:

- `stateInfo`: An object that contains application-specific information, such as state, which can be used by the thread being aborted.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.
