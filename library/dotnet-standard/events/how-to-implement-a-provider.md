---
title: "How to implement a provider (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/events/how-to-implement-a-provider.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to implement a provider

The observer design pattern requires a division between a provider, which monitors data and sends notifications, and one or more observers, which receive notifications (callbacks) from the provider. This article shows how to create a provider. For information about creating an observer, see How to implement an observer.

## Define the data type

Define the data that the provider sends to observers. Although the provider and the data it sends to observers can be a single type, a different type typically represents each. For example, in a temperature monitoring application, the `Temperature` structure defines the data that the `TemperatureMonitor` class (defined in the next section) monitors and to which observers subscribe.

```csharp
namespace TemperatureSample;

public readonly record struct Temperature(decimal Degrees, DateTime Date);
```
```vb
Namespace Global.TemperatureSample

    Public Structure Temperature
        Public ReadOnly Property Degrees As Decimal
        Public ReadOnly Property [Date] As Date

        Public Sub New(degrees As Decimal, [date] As Date)
            Me.Degrees = degrees
            Me.Date = [date]
        End Sub
    End Structure

End Namespace
```
## Create a provider

The data provider is a type that implements the `System.IObservable`1` interface. The provider's generic type argument is the type it sends to observers.

1. Define the provider class. The following example defines a `TemperatureMonitor` class, which is a constructed `System.IObservable`1` implementation with a generic type argument of `Temperature`.

```csharp
namespace TemperatureSample;

public sealed class TemperatureMonitor : IObservable<Temperature>
{
```
```vb
Imports System.Threading
Imports System.Threading.Tasks

Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureMonitor
        Implements IObservable(Of Temperature)
```
1. Add a field to store observer references.

   The provider needs to track each registered observer so it can send notifications later. Typically, use a collection object such as a generic `System.Collections.Generic.List`1` object. The following example defines a private `System.Collections.Generic.List`1` object instantiated in the `TemperatureMonitor` class constructor.

```csharp
namespace TemperatureSample;

public sealed class TemperatureMonitor : IObservable<Temperature>
{
    private readonly List<IObserver<Temperature>> _observers = [];
    private readonly Lock _sync = new();
```
```vb
Imports System.Threading
Imports System.Threading.Tasks

Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureMonitor
        Implements IObservable(Of Temperature)

        Private ReadOnly _observers As New List(Of IObserver(Of Temperature))()
        Private ReadOnly _sync As New Object()
```
1. Define an `System.IDisposable` implementation for unsubscribing.

   The provider returns this implementation to subscribers so they can stop receiving notifications at any time. The following example defines a nested `Unsubscriber` class that receives a reference to the subscribers collection and to the subscriber when instantiated. The `Unsubscriber` class enables the subscriber to call the object's `System.IDisposable.Dispose*` implementation to remove itself from the subscribers collection.

```csharp
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
```
```vb
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
```
1. Implement the `System.IObservable`1.Subscribe*` method.

   The method receives a reference to the `System.IObserver`1` interface. Store that reference in the observer collection from the previous step, then return the `System.IDisposable` unsubscriber implementation. The following example shows the `Subscribe` implementation in the `TemperatureMonitor` class.

```csharp
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
```
```vb
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
```
1. Implement the notification logic by calling observers' `System.IObserver`1.OnNext*`, `System.IObserver`1.OnError*`, and `System.IObserver`1.OnCompleted*` methods.

   In some cases, a provider might not call `System.IObserver`1.OnError*` when an error occurs. The following `GetTemperature` method simulates a monitor that reads temperature data every five seconds and notifies observers if the temperature has changed by at least .1 degree since the previous reading. If the device doesn't report a temperature (that is, if its value is null), the provider notifies observers that the transmission is complete by calling each observer's `System.IObserver`1.OnCompleted*` method and clears the `System.Collections.Generic.List`1` collection. In this example, the provider never calls `System.IObserver`1.OnError*`.

```csharp
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
```
```vb
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
```
