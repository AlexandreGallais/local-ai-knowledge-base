---
title: "Async semaphores, locks, and reader/writer coordination (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/async-coordination-primitives-advanced.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Async semaphores, locks, and reader/writer coordination (part 2 of 2)

## Async reader/writer coordination

A reader/writer lock allows multiple concurrent readers but only one exclusive writer. .NET provides `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair`, which offers reader/writer scheduling for tasks through two `System.Threading.Tasks.TaskScheduler` instances:

- `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ConcurrentScheduler` — runs tasks concurrently (like readers), as long as no exclusive task is active.
- `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair.ExclusiveScheduler` — runs tasks exclusively (like writers), with no other tasks running.

```csharp
public static class ConcurrentExclusiveDemo
{
    public static async Task RunAsync()
    {
        var pair = new ConcurrentExclusiveSchedulerPair();
        var factory = new TaskFactory(pair.ExclusiveScheduler);

        int sharedValue = 0;

        Task writerTask = factory.StartNew(() =>
        {
            sharedValue = 42;
            Console.WriteLine($"Writer: set value to {sharedValue}");
        });

        var readerFactory = new TaskFactory(pair.ConcurrentScheduler);

        Task[] readerTasks = Enumerable.Range(1, 3).Select(id =>
            readerFactory.StartNew(() =>
            {
                Console.WriteLine($"Reader {id}: value = {sharedValue}");
            })).ToArray();

        await writerTask;
        await Task.WhenAll(readerTasks);
    }
}
```
```vb
Public Module ConcurrentExclusiveDemo
    Public Async Function RunAsync() As Task
        Dim pair As New ConcurrentExclusiveSchedulerPair()
        Dim exclusiveFactory As New TaskFactory(pair.ExclusiveScheduler)

        Dim sharedValue As Integer = 0

        Dim writerTask As Task = exclusiveFactory.StartNew(Sub()
            sharedValue = 42
            Console.WriteLine($"Writer: set value to {sharedValue}")
        End Sub)

        Dim readerFactory As New TaskFactory(pair.ConcurrentScheduler)

        Dim readerTasks As Task() = Enumerable.Range(1, 3).Select(
            Function(id) readerFactory.StartNew(Sub()
                Console.WriteLine($"Reader {id}: value = {sharedValue}")
            End Sub)).ToArray()

        Await writerTask
        Await Task.WhenAll(readerTasks)
    End Function
End Module
```
> **Important:**
> `ConcurrentExclusiveSchedulerPair` protects at the task level, not across `await` boundaries. If a task queued to the `ExclusiveScheduler` contains an `await` on an incomplete operation, the exclusive lock releases when the `await` yields and reacquires when the continuation runs. Another exclusive or concurrent task can run during that gap. This behavior works well when you protect in-memory data structures and ensure no `await` interrupts the critical section. For scenarios that require holding the lock across awaits, use a custom `AsyncReaderWriterLock` like the one shown in the following section.

### Custom async reader/writer lock

The following implementation gives writers priority over readers. When a writer is waiting, new readers queue behind it. When a writer finishes and no other writers are waiting, all queued readers run together:

```csharp
public class AsyncReaderWriterLock
{
    private readonly Queue<TaskCompletionSource<Releaser>> _waitingWriters = new();
    private TaskCompletionSource<Releaser> _waitingReader =
        new(TaskCreationOptions.RunContinuationsAsynchronously);
    private int _readersWaiting;
    private int _status; // 0 = free, -1 = writer active, >0 = reader count

    private readonly Task<Releaser> _readerReleaser;
    private readonly Task<Releaser> _writerReleaser;

    public AsyncReaderWriterLock()
    {
        _readerReleaser = Task.FromResult(new Releaser(this, isWriter: false));
        _writerReleaser = Task.FromResult(new Releaser(this, isWriter: true));
    }

    public Task<Releaser> ReaderLockAsync()
    {
        lock (_waitingWriters)
        {
            if (_status >= 0 && _waitingWriters.Count == 0)
            {
                _status++;
                return _readerReleaser;
            }
            else
            {
                _readersWaiting++;
                return _waitingReader.Task;
            }
        }
    }

    public Task<Releaser> WriterLockAsync()
    {
        lock (_waitingWriters)
        {
            if (_status == 0)
            {
                _status = -1;
                return _writerReleaser;
            }
            else
            {
                var waiter = new TaskCompletionSource<Releaser>(TaskCreationOptions.RunContinuationsAsynchronously);
                _waitingWriters.Enqueue(waiter);
                return waiter.Task;
            }
        }
    }

    private void ReaderRelease()
    {
        TaskCompletionSource<Releaser>? toWake = null;

        lock (_waitingWriters)
        {
            _status--;
            if (_status == 0 && _waitingWriters.Count > 0)
            {
                _status = -1;
                toWake = _waitingWriters.Dequeue();
            }
        }

        toWake?.SetResult(new Releaser(this, isWriter: true));
    }

    private void WriterRelease()
    {
        TaskCompletionSource<Releaser>? toWake = null;
        bool toWakeIsWriter = false;

        lock (_waitingWriters)
        {
            if (_waitingWriters.Count > 0)
            {
                toWake = _waitingWriters.Dequeue();
                toWakeIsWriter = true;
            }
            else if (_readersWaiting > 0)
            {
                toWake = _waitingReader;
                _status = _readersWaiting;
                _readersWaiting = 0;
                _waitingReader = new TaskCompletionSource<Releaser>(TaskCreationOptions.RunContinuationsAsynchronously);
            }
            else
            {
                _status = 0;
            }
        }

        toWake?.SetResult(new Releaser(this, toWakeIsWriter));
    }

    public struct Releaser : IDisposable
    {
        private readonly AsyncReaderWriterLock? _lock;
        private readonly bool _isWriter;

        internal Releaser(AsyncReaderWriterLock lockObj, bool isWriter)
        {
            _lock = lockObj;
            _isWriter = isWriter;
        }

        public void Dispose()
        {
            if (_lock is not null)
            {
                if (_isWriter) _lock.WriterRelease();
                else _lock.ReaderRelease();
            }
        }
    }
}
```
```vb
Public Class AsyncReaderWriterLock
    Private ReadOnly _waitingWriters As New Queue(Of TaskCompletionSource(Of Releaser))()
    Private _waitingReader As New TaskCompletionSource(Of Releaser)(TaskCreationOptions.RunContinuationsAsynchronously)
    Private _readersWaiting As Integer
    Private _status As Integer ' 0 = free, -1 = writer active, >0 = reader count

    Private ReadOnly _readerReleaser As Task(Of Releaser)
    Private ReadOnly _writerReleaser As Task(Of Releaser)

    Public Sub New()
        _readerReleaser = Task.FromResult(New Releaser(Me, isWriter:=False))
        _writerReleaser = Task.FromResult(New Releaser(Me, isWriter:=True))
    End Sub

    Public Function ReaderLockAsync() As Task(Of Releaser)
        SyncLock _waitingWriters
            If _status >= 0 AndAlso _waitingWriters.Count = 0 Then
                _status += 1
                Return _readerReleaser
            Else
                _readersWaiting += 1
                Return _waitingReader.Task
            End If
        End SyncLock
    End Function

    Public Function WriterLockAsync() As Task(Of Releaser)
        SyncLock _waitingWriters
            If _status = 0 Then
                _status = -1
                Return _writerReleaser
            Else
                Dim waiter As New TaskCompletionSource(Of Releaser)(
                    System.Threading.Tasks.TaskCreationOptions.RunContinuationsAsynchronously)
                _waitingWriters.Enqueue(waiter)
                Return waiter.Task
            End If
        End SyncLock
    End Function

    Private Sub ReaderRelease()
        Dim toWake As TaskCompletionSource(Of Releaser) = Nothing

        SyncLock _waitingWriters
            _status -= 1
            If _status = 0 AndAlso _waitingWriters.Count > 0 Then
                _status = -1
                toWake = _waitingWriters.Dequeue()
            End If
        End SyncLock

        toWake?.SetResult(New Releaser(Me, isWriter:=True))
    End Sub

    Private Sub WriterRelease()
        Dim toWake As TaskCompletionSource(Of Releaser) = Nothing
        Dim toWakeIsWriter As Boolean = False

        SyncLock _waitingWriters
            If _waitingWriters.Count > 0 Then
                toWake = _waitingWriters.Dequeue()
                toWakeIsWriter = True
            ElseIf _readersWaiting > 0 Then
                toWake = _waitingReader
                _status = _readersWaiting
                _readersWaiting = 0
                _waitingReader = New TaskCompletionSource(Of Releaser)(TaskCreationOptions.RunContinuationsAsynchronously)
            Else
                _status = 0
            End If
        End SyncLock

        toWake?.SetResult(New Releaser(Me, toWakeIsWriter))
    End Sub

    Public Structure Releaser
        Implements IDisposable

        Private ReadOnly _lock As AsyncReaderWriterLock
        Private ReadOnly _isWriter As Boolean

        Friend Sub New(lockObj As AsyncReaderWriterLock, isWriter As Boolean)
            _lock = lockObj
            _isWriter = isWriter
        End Sub

        Public Sub Dispose() Implements IDisposable.Dispose
            If _lock IsNot Nothing Then
                If _isWriter Then
                    _lock.WriterRelease()
                Else
                    _lock.ReaderRelease()
                End If
            End If
        End Sub
    End Structure
End Class
```
Usage follows the same disposable-releaser pattern as `AsyncLock`:

```csharp
public static class AsyncReaderWriterLockDemo
{
    private static readonly AsyncReaderWriterLock s_rwLock = new();
    private static string s_data = "initial";

    public static async Task RunAsync()
    {
        Task writer = Task.Run(async () =>
        {
            using (await s_rwLock.WriterLockAsync())
            {
                Console.WriteLine("Writer: acquired exclusive lock");
                await Task.Delay(50);
                s_data = "updated";
                Console.WriteLine("Writer: data updated");
            }
        });

        Task[] readers = Enumerable.Range(1, 3).Select(id => Task.Run(async () =>
        {
            await Task.Delay(10);
            using (await s_rwLock.ReaderLockAsync())
            {
                Console.WriteLine($"Reader {id}: data = {s_data}");
            }
        })).ToArray();

        await writer;
        await Task.WhenAll(readers);
    }
}
```
```vb
Public Module AsyncReaderWriterLockDemo
    Private ReadOnly s_rwLock As New AsyncReaderWriterLock()
    Private s_data As String = "initial"

    Public Async Function RunAsync() As Task
        Dim writer As Task = Task.Run(Async Function()
            Using Await s_rwLock.WriterLockAsync()
                Console.WriteLine("Writer: acquired exclusive lock")
                Await Task.Delay(50)
                s_data = "updated"
                Console.WriteLine("Writer: data updated")
            End Using
        End Function)

        Dim readers As Task() = Enumerable.Range(1, 3).Select(
            Function(id) Task.Run(Async Function()
                Await Task.Delay(10)
                Using Await s_rwLock.ReaderLockAsync()
                    Console.WriteLine($"Reader {id}: data = {s_data}")
                End Using
            End Function)).ToArray()

        Await writer
        Await Task.WhenAll(readers)
    End Function
End Module
```
> **Tip:**
> A production reader/writer lock requires thorough testing for edge cases: reentrancy, error paths, cancellation, and fairness policies. Consider established libraries (such as Nito.AsyncEx) before building your own.

## Channels as an alternative coordination pattern

`System.Threading.Channels.Channel`1` provides a thread-safe producer-consumer queue that supports `async` reads and writes. Bounded channels (`System.Threading.Channels.Channel.CreateBounded*`) provide natural back-pressure, replacing some scenarios where you'd otherwise use a semaphore for throttling.

For more information, see System.Threading.Channels.

## See also

- Build async coordination primitives
- Keep async methods alive
- Complete your tasks
- Consuming the Task-based Asynchronous Pattern
