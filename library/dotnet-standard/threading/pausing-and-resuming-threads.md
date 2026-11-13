---
title: "Pausing and interrupting threads"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/pausing-and-resuming-threads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Pausing and interrupting threads

The most common ways to synchronize the activities of threads are to block and release threads, or to lock objects or regions of code. For more information on these locking and blocking mechanisms, see Overview of Synchronization Primitives.

 You can also have threads put themselves to sleep. When threads are blocked or sleeping, you can use a `System.Threading.ThreadInterruptedException` to break them out of their wait states.

## The Thread.Sleep method

 Calling the `System.Threading.Thread.Sleep*` method causes the current thread to immediately block for the number of milliseconds or the time interval you pass to the method, and yields the remainder of its time slice to another thread. Once that interval elapses, the sleeping thread resumes execution.

 One thread cannot call `System.Threading.Thread.Sleep*` on another thread.  `System.Threading.Thread.Sleep*` is a static method that always causes the current thread to sleep.

 Calling `System.Threading.Thread.Sleep*` with a value of `System.Threading.Timeout.Infinite` causes a thread to sleep until another thread calls the `System.Threading.Thread.Interrupt*` method on the sleeping thread. The following example illustrates interrupting a sleeping thread.

```csharp
using System;
using System.Threading;

public class Example
{
    public static void Main()
    {
        // Interrupt a sleeping thread.
        var sleepingThread = new Thread(SleepIndefinitely);
        sleepingThread.Name = "Sleeping";
        sleepingThread.Start();
        Thread.Sleep(2000);
        sleepingThread.Interrupt();
        sleepingThread.Join();
    }

    private static void SleepIndefinitely()
    {
        Console.WriteLine($"Thread '{Thread.CurrentThread.Name}' about to sleep indefinitely.");
        try
        {
            Thread.Sleep(Timeout.Infinite);
        }
        catch (ThreadInterruptedException)
        {
            Console.WriteLine($"Thread '{Thread.CurrentThread.Name}' awoken.");
        }
        finally
        {
            Console.WriteLine($"Thread '{Thread.CurrentThread.Name}' executing finally block.");
        }
        Console.WriteLine($"Thread '{Thread.CurrentThread.Name}' finishing normal execution.");
        Console.WriteLine();
    }
}
// The example displays the following output:
//       Thread 'Sleeping' about to sleep indefinitely.
//       Thread 'Sleeping' awoken.
//       Thread 'Sleeping' executing finally block.
//       Thread 'Sleeping' finishing normal execution.
```
```vb
Imports System.Threading

Module Example
    Public Sub Main()
        ' Interrupt a sleeping thread.
        Dim sleepingThread = New Thread(AddressOf SleepIndefinitely)
        sleepingThread.Name = "Sleeping"
        sleepingThread.Start()
        Thread.Sleep(2000)
        sleepingThread.Interrupt()
        sleepingThread.Join()
    End Sub

    Private Sub SleepIndefinitely()
        Console.WriteLine("Thread '{0}' about to sleep indefinitely.",
                          Thread.CurrentThread.Name)
        Try
            Thread.Sleep(Timeout.Infinite)
        Catch ex As ThreadInterruptedException
            Console.WriteLine("Thread '{0}' awoken.",
                              Thread.CurrentThread.Name)
        Finally
            Console.WriteLine("Thread '{0}' executing finally block.",
                              Thread.CurrentThread.Name)
        End Try
        Console.WriteLine("Thread '{0}' finishing normal execution.",
                          Thread.CurrentThread.Name)
        Console.WriteLine()
    End Sub
End Module
' The example displays the following output:
'       Thread 'Sleeping' about to sleep indefinitely.
'       Thread 'Sleeping' awoken.
'       Thread 'Sleeping' executing finally block.
'       Thread 'Sleeping' finishing normal execution.
```
The example calls `System.Threading.Thread.Join*` to block the calling thread until the interrupted thread finishes execution.

## Interrupting threads

 You can interrupt a waiting thread by calling the `System.Threading.Thread.Interrupt*` method on the blocked thread to throw a `System.Threading.ThreadInterruptedException`, which breaks the thread out of the blocking call. The thread should catch the `System.Threading.ThreadInterruptedException` and do whatever is appropriate to continue working. If the thread ignores the exception, the runtime catches the exception and stops the thread.

> **Note:**
> If the target thread is not blocked when `System.Threading.Thread.Interrupt*` is called, the thread is not interrupted until it blocks. If the thread never blocks, it could complete without ever being interrupted.

 If a wait is a managed wait, then `System.Threading.Thread.Interrupt*` wakes the thread immediately. If a wait is an unmanaged wait (for example, a platform invoke call to the Win32 WaitForSingleObject function), `System.Threading.Thread.Interrupt*` can't take control of the thread until it returns to or calls into managed code. In managed code, the behavior is as follows:

- `System.Threading.Thread.Interrupt*` wakes a thread out of any wait it might be in and causes a `System.Threading.ThreadInterruptedException` to be thrown in the destination thread.

- .NET Framework only: `System.Threading.Thread.Abort*` wakes a thread out of any wait it might be in and causes a `System.Threading.ThreadAbortException` to be thrown on the thread. For details, see Destroy threads and SYSLIB0006: Thread.Abort is not supported.

## See also

- `System.Threading.Thread`
- `System.Threading.ThreadInterruptedException`
- `System.Threading.ThreadAbortException`
- Threading
- Using Threads and Threading
- Overview of Synchronization Primitives
- Canceling threads cooperatively
