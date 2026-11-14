---
title: "Creating threads and passing data at start time"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/creating-threads-and-passing-data-at-start-time.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create threads and pass data at start time

When an operating-system process is created, the operating system injects a thread to execute code in that process, including any original application domain. From that point on, application domains can be created and destroyed without any operating system threads necessarily being created or destroyed. If the code being executed is managed code, then a `System.Threading.Thread` object for the thread executing in the current application domain can be obtained by retrieving the static `System.Threading.Thread.CurrentThread` property of type `System.Threading.Thread`. This topic describes thread creation and discusses alternatives for passing data to the thread procedure.

## Creating a thread

 Creating a new `System.Threading.Thread` object creates a new managed thread. The `System.Threading.Thread` class has constructors that take a `System.Threading.ThreadStart` delegate or a `System.Threading.ParameterizedThreadStart` delegate; the delegate wraps the method that is invoked by the new thread when you call the `System.Threading.Thread.Start*` method. Calling `System.Threading.Thread.Start*` more than once causes a `System.Threading.ThreadStateException` to be thrown.

 The `System.Threading.Thread.Start*` method returns immediately, often before the new thread has actually started. You can use the `System.Threading.Thread.ThreadState*` and `System.Threading.Thread.IsAlive` properties to determine the state of the thread at any one moment, but these properties should never be used for synchronizing the activities of threads.

> **Note:**
> Once a thread is started, it is not necessary to retain a reference to the `System.Threading.Thread` object. The thread continues to execute until the thread procedure ends.

 The following code example creates two new threads to call instance and static methods on another object.
 ```csharp
using System;
using System.Threading;

public class ServerClass
{
    // The method that will be called when the thread is started.
    public void InstanceMethod()
    {
        Console.WriteLine(
            "ServerClass.InstanceMethod is running on another thread.");

        // Pause for a moment to provide a delay to make
        // threads more apparent.
        Thread.Sleep(3000);
        Console.WriteLine(
            "The instance method called by the worker thread has ended.");
    }

    public static void StaticMethod()
    {
        Console.WriteLine(
            "ServerClass.StaticMethod is running on another thread.");

        // Pause for a moment to provide a delay to make
        // threads more apparent.
        Thread.Sleep(5000);
        Console.WriteLine(
            "The static method called by the worker thread has ended.");
    }
}

public class Simple
{
    public static void Main()
    {
        ServerClass serverObject = new ServerClass();

        // Create the thread object, passing in the
        // serverObject.InstanceMethod method using a
        // ThreadStart delegate.
        Thread InstanceCaller = new(new ThreadStart(serverObject.InstanceMethod));

        // Start the thread.
        InstanceCaller.Start();

        Console.WriteLine("The Main() thread calls this after "
            + "starting the new InstanceCaller thread.");

        // Create the thread object, passing in the
        // ServerClass.StaticMethod method using a
        // ThreadStart delegate.
        Thread StaticCaller = new(new ThreadStart(ServerClass.StaticMethod));

        // Start the thread.
        StaticCaller.Start();

        Console.WriteLine("The Main() thread calls this after "
            + "starting the new StaticCaller thread.");
    }
}
// The example displays the output like the following:
//    The Main() thread calls this after starting the new InstanceCaller thread.
//    The Main() thread calls this after starting the new StaticCaller thread.
//    ServerClass.StaticMethod is running on another thread.
//    ServerClass.InstanceMethod is running on another thread.
//    The instance method called by the worker thread has ended.
//    The static method called by the worker thread has ended.
```

## Passing data to threads

The `System.Threading.ParameterizedThreadStart` delegate provides an easy way to pass an object containing data to a thread when you call `System.Threading.Thread.Start(System.Object)`. See `System.Threading.ParameterizedThreadStart` for a code example.

 Using the `System.Threading.ParameterizedThreadStart` delegate is not a type-safe way to pass data, because the `System.Threading.Thread.Start(System.Object)` method accepts any object. An alternative is to encapsulate the thread procedure and the data in a helper class and use the `System.Threading.ThreadStart` delegate to execute the thread procedure. The following example demonstrates this technique:
 ```csharp
using System;
using System.Threading;

// The ThreadWithState class contains the information needed for
// a task, and the method that executes the task.
//
public class ThreadWithState
{
    // State information used in the task.
    private string _boilerplate;
    private int _numberValue;

    // The constructor obtains the state information.
    public ThreadWithState(string text, int number)
    {
        _boilerplate = text;
        _numberValue = number;
    }

    // The thread procedure performs the task, such as formatting
    // and printing a document.
    public void ThreadProc()
    {
        Console.WriteLine(_boilerplate, _numberValue);
    }
}

// Entry point for the example.
public class Example
{
    public static void Main()
    {
        // Supply the state information required by the task.
        ThreadWithState tws = new("This report displays the number {0}.", 42);

        // Create a thread to execute the task, and then
        // start the thread.
        Thread t = new(new ThreadStart(tws.ThreadProc));
        t.Start();
        Console.WriteLine("Main thread does some work, then waits.");
        t.Join();
        Console.WriteLine(
            "Independent task has completed; main thread ends.");
    }
}

// The example displays the following output:
//       Main thread does some work, then waits.
//       This report displays the number 42.
//       Independent task has completed; main thread ends.
```

Neither `System.Threading.ThreadStart` nor `System.Threading.ParameterizedThreadStart` delegate has a return value, because there is no place to return the data from an asynchronous call. To retrieve the results of a thread method, you can use a callback method, as shown in the next section.

## Retrieving data from threads with callback methods

 The following example demonstrates a callback method that retrieves data from a thread. The constructor for the class that contains the data and the thread method also accepts a delegate representing the callback method; before the thread method ends, it invokes the callback delegate.
 ```csharp
using System;
using System.Threading;

// The ThreadWithState2 class contains the information needed for
// a task, the method that executes the task, and a delegate
// to call when the task is complete.
public class ThreadWithState2
{
    // State information used in the task.
    private string _boilerplate;
    private int _numberValue;

    // Delegate used to execute the callback method when the
    // task is complete.
    private ExampleCallback _callback;

    // The constructor obtains the state information and the
    // callback delegate.
    public ThreadWithState2(string text, int number,
        ExampleCallback callbackDelegate)
    {
        _boilerplate = text;
        _numberValue = number;
        _callback = callbackDelegate;
    }

    // The thread procedure performs the task, such as
    // formatting and printing a document, and then invokes
    // the callback delegate with the number of lines printed.
    public void ThreadProc()
    {
        Console.WriteLine(_boilerplate, _numberValue);
        _callback?.Invoke(1);
    }
}

// Delegate that defines the signature for the callback method.
public delegate void ExampleCallback(int lineCount);

// Entry point for the example.
public class Example2
{
    public static void Main()
    {
        // Supply the state information required by the task.
        ThreadWithState2 tws = new(
            "This report displays the number {0}.",
            42,
            new ExampleCallback(ResultCallback)
        );

        Thread t = new(new ThreadStart(tws.ThreadProc));
        t.Start();
        Console.WriteLine("Main thread does some work, then waits.");
        t.Join();
        Console.WriteLine(
            "Independent task has completed; main thread ends.");
    }

    // The callback method must match the signature of the
    // callback delegate.
    public static void ResultCallback(int lineCount)
    {
        Console.WriteLine($"Independent task printed {lineCount} lines.");
    }
}

// The example displays the following output:
//       Main thread does some work, then waits.
//       This report displays the number 42.
//       Independent task printed 1 lines.
//       Independent task has completed; main thread ends.
```

## See also

- `System.Threading.Thread`
- `System.Threading.ThreadStart`
- `System.Threading.ParameterizedThreadStart`
- `System.Threading.Thread.Start*`
- Threading
- Using Threads and Threading
