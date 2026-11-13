---
title: "Build async coordination primitives (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/async-coordination-primitives.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build async coordination primitives (part 2 of 2)

## Async barrier

A barrier coordinates a fixed set of participants across multiple rounds. Each participant signals when it finishes its work for the current round and then waits for all other participants to finish. When the last participant signals, all participants resume, and the barrier resets for the next round. The synchronous equivalent is `System.Threading.Barrier`. The .NET runtime provides `System.Threading.Tasks.Task.WhenAll*` for multi-round async synchronization. Combine it with a loop, one `WhenAll` call per round.

```csharp
// Educational only — use Task.WhenAll() in a loop instead of this sample implementation, one call per round.
public class AsyncBarrier
{
    private readonly int _participantCount;
    private int _remainingParticipants;
    private TaskCompletionSource _tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);

    public AsyncBarrier(int participantCount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(participantCount, nameof(participantCount));
        _remainingParticipants = _participantCount = participantCount;
    }

    public Task SignalAndWait()
    {
        TaskCompletionSource tcs = _tcs;

        if (Interlocked.Decrement(ref _remainingParticipants) == 0)
        {
            _remainingParticipants = _participantCount;
            _tcs = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
            tcs.SetResult();
        }

        return tcs.Task;
    }
}
```
```vb
' Educational only — use Task.WhenAll() in a loop instead of this sample implementation, one call per round.
Public Class AsyncBarrier
    Private ReadOnly _participantCount As Integer
    Private _remainingParticipants As Integer
    Private _tcs As TaskCompletionSource = New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously)

    Public Sub New(participantCount As Integer)
        If participantCount <= 0 Then Throw New ArgumentOutOfRangeException(NameOf(participantCount))
        _participantCount = participantCount
        _remainingParticipants = participantCount
    End Sub

    Public Function SignalAndWait() As Task
        Dim tcs As TaskCompletionSource = _tcs

        If Interlocked.Decrement(_remainingParticipants) = 0 Then
            _remainingParticipants = _participantCount
            _tcs = New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously)
            tcs.SetResult()
        End If

        Return tcs.Task
    End Function
End Class
```
Key <example-value> details:

- Before completing the shared `TaskCompletionSource`, the method resets the count and swaps in a new `TaskCompletionSource` for the next round. This ordering ensures that when waiters resume, the barrier is already ready for the next round.
- All participants share the same `Task`. Because the sample creates the `TaskCompletionSource` with `RunContinuationsAsynchronously`, continuations resume asynchronously instead of running inline on the thread that completes the barrier.

The following example runs three participants through two rounds of a barrier:

```csharp
public static class AsyncBarrierDemo
{
    public static async Task RunAsync()
    {
        var barrier = new AsyncBarrier(3);
        int rounds = 2;

        Task[] participants = Enumerable.Range(1, 3).Select(id => Task.Run(async () =>
        {
            for (int round = 1; round <= rounds; round++)
            {
                Console.WriteLine($"Participant {id}: working on round {round}");
                await Task.Delay(id * 20);
                Console.WriteLine($"Participant {id}: finished round {round}, waiting at barrier");
                await barrier.SignalAndWait();
            }
        })).ToArray();

        await Task.WhenAll(participants);
        Console.WriteLine("All rounds complete.");
    }
}
```
```vb
Public Module AsyncBarrierDemo
    Public Async Function RunAsync() As Task
        Dim barrier As New AsyncBarrier(3)
        Dim rounds As Integer = 2

        Dim participants As Task() = Enumerable.Range(1, 3).Select(
            Function(id) Task.Run(Async Function()
                For round As Integer = 1 To rounds
                    Console.WriteLine($"Participant {id}: working on round {round}")
                    Await Task.Delay(id * 20)
                    Console.WriteLine($"Participant {id}: finished round {round}, waiting at barrier")
                    Await barrier.SignalAndWait()
                Next
            End Function)).ToArray()

        Await Task.WhenAll(participants)
        Console.WriteLine("All rounds complete.")
    End Function
End Module
```
## See also

- Async semaphores, locks, and reader/writer coordination
- Task-based asynchronous pattern (TAP)
- Complete your tasks
- Keep async methods alive
