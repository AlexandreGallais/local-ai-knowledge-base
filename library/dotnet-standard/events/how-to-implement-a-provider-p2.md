---
title: "How to implement a provider (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/events/how-to-implement-a-provider.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to implement a provider (part 2 of 2)

## Example

The following example contains the complete source code for an `System.IObservable`1` implementation for a temperature monitoring application. It includes the `Temperature` structure, which is the data the provider sends to observers, and the `TemperatureMonitor` class, which is the `System.IObservable`1` implementation.

```csharp
namespace TemperatureSample;

public sealed class TemperatureMonitor : IObservable<Temperature>
{
    private readonly List<IObserver<Temperature>> _observers = [];
    private readonly Lock _sync = new();

    private sealed class Unsubscriber(
        List<IObserver<Temperature>> observers,
        IObserver<Temperature> observer,
        Lock sync) : IDisposable
    {
        public void Dispose()
        {
            lock (sync)
            {
                observers.Remove(observer);
            }
        }
    }

    public IDisposable Subscribe(IObserver<Temperature> observer)
    {
        ArgumentNullException.ThrowIfNull(observer);

        lock (_sync)
        {
            if (!_observers.Contains(observer))
                _observers.Add(observer);
        }

        return new Unsubscriber(_observers, observer, _sync);
    }

    public async Task GetTemperatureAsync(CancellationToken cancellationToken = default)
    {
        // Sample data that mimics a temperature device. A null value signals the end of transmission.
        decimal?[] temps =
        [
            14.6m, 14.65m, 14.7m, 14.9m, 14.9m, 15.2m,
            15.25m, 15.2m, 15.4m, 15.45m, null
        ];

        decimal? previous = null;

        foreach (decimal? temp in temps)
        {
            await Task.Delay(TimeSpan.FromSeconds(2.5), cancellationToken);

            if (temp is decimal value)
            {
                // Notify only after at least a 0.1° change.
                if (previous is null || Math.Abs(value - previous.Value) >= 0.1m)
                {
                    NotifyAll(new Temperature(value, DateTime.Now));
                    previous = value;
                }
            }
            else
            {
                CompleteAll();
                break;
            }
        }
    }

    private void NotifyAll(Temperature data)
    {
        IObserver<Temperature>[] snapshot;
        lock (_sync)
        {
            snapshot = [.. _observers];
        }

        foreach (IObserver<Temperature> observer in snapshot)
            observer.OnNext(data);
    }

    private void CompleteAll()
    {
        IObserver<Temperature>[] snapshot;
        lock (_sync)
        {
            snapshot = [.. _observers];
            _observers.Clear();
        }

        foreach (IObserver<Temperature> observer in snapshot)
            observer.OnCompleted();
    }
}
```
```vb
Imports System.Threading
Imports System.Threading.Tasks

Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureMonitor
        Implements IObservable(Of Temperature)

        Private ReadOnly _observers As New List(Of IObserver(Of Temperature))()
        Private ReadOnly _sync As New Object()

        Private NotInheritable Class Unsubscriber
            Implements IDisposable

            Private ReadOnly _observers As List(Of IObserver(Of Temperature))
            Private ReadOnly _observer As IObserver(Of Temperature)
            Private ReadOnly _sync As Object

            Public Sub New(observers As List(Of IObserver(Of Temperature)),
                           observer As IObserver(Of Temperature),
                           sync As Object)
                _observers = observers
                _observer = observer
                _sync = sync
            End Sub

            Public Sub Dispose() Implements IDisposable.Dispose
                SyncLock _sync
                    _observers.Remove(_observer)
                End SyncLock
            End Sub
        End Class

        Public Function Subscribe(observer As IObserver(Of Temperature)) As IDisposable _
            Implements IObservable(Of Temperature).Subscribe

            ArgumentNullException.ThrowIfNull(observer)

            SyncLock _sync
                If Not _observers.Contains(observer) Then
                    _observers.Add(observer)
                End If
            End SyncLock

            Return New Unsubscriber(_observers, observer, _sync)
        End Function

        Public Async Function GetTemperatureAsync(Optional cancellationToken As CancellationToken = Nothing) As Task
            ' Sample data that mimics a temperature device. A Nothing value signals the end of transmission.
            Dim temps As Decimal?() = {
                14.6D, 14.65D, 14.7D, 14.9D, 14.9D, 15.2D,
                15.25D, 15.2D, 15.4D, 15.45D, Nothing
            }

            Dim previous As Decimal? = Nothing

            For Each temp As Decimal? In temps
                Await Task.Delay(TimeSpan.FromSeconds(2.5), cancellationToken)

                If temp.HasValue Then
                    ' Notify only after at least a 0.1° change.
                    If Not previous.HasValue OrElse Math.Abs(temp.Value - previous.Value) >= 0.1D Then
                        NotifyAll(New Temperature(temp.Value, Date.Now))
                        previous = temp
                    End If
                Else
                    CompleteAll()
                    Exit For
                End If
            Next
        End Function

        Private Sub NotifyAll(data As Temperature)
            Dim snapshot As IObserver(Of Temperature)()
            SyncLock _sync
                snapshot = _observers.ToArray()
            End SyncLock

            For Each observer In snapshot
                observer.OnNext(data)
            Next
        End Sub

        Private Sub CompleteAll()
            Dim snapshot As IObserver(Of Temperature)()
            SyncLock _sync
                snapshot = _observers.ToArray()
                _observers.Clear()
            End SyncLock

            For Each observer In snapshot
                observer.OnCompleted()
            Next
        End Sub
    End Class

End Namespace
```
## Related content

- `System.IObservable`1`
- Observer design pattern
- How to implement an observer
- Best practices for the observer design pattern
