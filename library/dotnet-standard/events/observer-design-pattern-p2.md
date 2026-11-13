---
title: "Observer design pattern (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/events/observer-design-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Observer design pattern (part 2 of 3)

## Implement the pattern

The following example uses the observer design pattern to implement an airport baggage claim information system. A `BaggageInfo` class provides information about arriving flights and the carousels where baggage from each flight is available for pickup. It's shown in the following example.

```csharp
﻿namespace Observables.Example;

public readonly record struct BaggageInfo(
    int FlightNumber,
    string From,
    int Carousel);
```
```vb
Namespace Example

    Public Structure BaggageInfo
        Implements IEquatable(Of BaggageInfo)

        Public ReadOnly Property FlightNumber As Integer
        Public ReadOnly Property From As String
        Public ReadOnly Property Carousel As Integer

        Public Sub New(flightNumber As Integer, from As String, carousel As Integer)
            Me.FlightNumber = flightNumber
            Me.From = from
            Me.Carousel = carousel
        End Sub

        Public Overloads Function Equals(other As BaggageInfo) As Boolean Implements IEquatable(Of BaggageInfo).Equals
            Return FlightNumber = other.FlightNumber AndAlso
                   From = other.From AndAlso
                   Carousel = other.Carousel
        End Function

        Public Overrides Function Equals(obj As Object) As Boolean
            If TypeOf obj Is BaggageInfo Then
                Return Equals(DirectCast(obj, BaggageInfo))
            End If
            Return False
        End Function

        Public Overrides Function GetHashCode() As Integer
            Return HashCode.Combine(FlightNumber, From, Carousel)
        End Function

        Public Shared Operator =(left As BaggageInfo, right As BaggageInfo) As Boolean
            Return left.Equals(right)
        End Operator

        Public Shared Operator <>(left As BaggageInfo, right As BaggageInfo) As Boolean
            Return Not left.Equals(right)
        End Operator
    End Structure

End Namespace
```
A `BaggageHandler` class is responsible for receiving information about arriving flights and baggage claim carousels. Internally, it maintains two collections:

- `_observers`: A collection of clients that observe updated information.
- `_flights`: A collection of flights and their assigned carousels.

The source code for the `BaggageHandler` class is shown in the following example.

```csharp
﻿namespace Observables.Example;

public sealed class BaggageHandler : IObservable<BaggageInfo>
{
    private readonly Lock _lock = new();
    private readonly HashSet<IObserver<BaggageInfo>> _observers = [];
    private readonly HashSet<BaggageInfo> _flights = [];

    public IDisposable Subscribe(IObserver<BaggageInfo> observer)
    {
        BaggageInfo[] snapshot;

        lock (_lock)
        {
            // Check whether observer is already registered. If not, add it.
            if (!_observers.Add(observer))
            {
                return new Unsubscriber<BaggageInfo>(_lock, _observers, observer);
            }

            // Snapshot existing data while holding the lock.
            snapshot = [.. _flights];
        }

        // Provide observer with existing data outside the lock.
        foreach (BaggageInfo item in snapshot)
        {
            observer.OnNext(item);
        }

        return new Unsubscriber<BaggageInfo>(_lock, _observers, observer);
    }

    // Called to indicate all baggage is now unloaded.
    public void BaggageStatus(int flightNumber) =>
        BaggageStatus(flightNumber, string.Empty, 0);

    public void BaggageStatus(int flightNumber, string from, int carousel)
    {
        var info = new BaggageInfo(flightNumber, from, carousel);
        IObserver<BaggageInfo>[] snapshot;

        // Carousel is assigned, so add new info object to list.
        if (carousel > 0)
        {
            lock (_lock)
            {
                if (!_flights.Add(info))
                {
                    return;
                }

                snapshot = [.. _observers];
            }

            foreach (IObserver<BaggageInfo> observer in snapshot)
            {
                observer.OnNext(info);
            }
        }
        else if (carousel is 0)
        {
            // Baggage claim for flight is done.
            lock (_lock)
            {
                if (_flights.RemoveWhere(
                    flight => flight.FlightNumber == info.FlightNumber) == 0)
                {
                    return;
                }

                snapshot = [.. _observers];
            }

            foreach (IObserver<BaggageInfo> observer in snapshot)
            {
                observer.OnNext(info);
            }
        }
    }

    public void LastBaggageClaimed()
    {
        IObserver<BaggageInfo>[] snapshot;

        lock (_lock)
        {
            snapshot = [.. _observers];
            _observers.Clear();
        }

        foreach (IObserver<BaggageInfo> observer in snapshot)
        {
            observer.OnCompleted();
        }
    }
}
```
```vb
Namespace Example

    Public NotInheritable Class BaggageHandler
        Implements IObservable(Of BaggageInfo)

        Private ReadOnly _lock As New Object()
        Private ReadOnly _observers As New HashSet(Of IObserver(Of BaggageInfo))()
        Private ReadOnly _flights As New HashSet(Of BaggageInfo)()

        Public Function Subscribe(observer As IObserver(Of BaggageInfo)) As IDisposable Implements IObservable(Of BaggageInfo).Subscribe
            Dim snapshot As BaggageInfo()

            SyncLock _lock
                ' Check whether observer is already registered. If not, add it.
                If Not _observers.Add(observer) Then
                    Return New Unsubscriber(Of BaggageInfo)(_lock, _observers, observer)
                End If

                ' Snapshot existing data while holding the lock.
                snapshot = _flights.ToArray()
            End SyncLock

            ' Provide observer with existing data outside the lock.
            For Each item As BaggageInfo In snapshot
                observer.OnNext(item)
            Next

            Return New Unsubscriber(Of BaggageInfo)(_lock, _observers, observer)
        End Function

        ' Called to indicate all baggage is now unloaded.
        Public Sub BaggageStatus(flightNumber As Integer)
            BaggageStatus(flightNumber, String.Empty, 0)
        End Sub

        Public Sub BaggageStatus(flightNumber As Integer, from As String, carousel As Integer)
            Dim info As New BaggageInfo(flightNumber, from, carousel)
            Dim snapshot As IObserver(Of BaggageInfo)()

            ' Carousel is assigned, so add new info object to list.
            If carousel > 0 Then
                SyncLock _lock
                    If Not _flights.Add(info) Then
                        Return
                    End If

                    snapshot = _observers.ToArray()
                End SyncLock

                For Each observer As IObserver(Of BaggageInfo) In snapshot
                    observer.OnNext(info)
                Next
            ElseIf carousel = 0 Then
                ' Baggage claim for flight is done.
                SyncLock _lock
                    If _flights.RemoveWhere(
                        Function(flight) flight.FlightNumber = info.FlightNumber) = 0 Then
                        Return
                    End If

                    snapshot = _observers.ToArray()
                End SyncLock

                For Each observer As IObserver(Of BaggageInfo) In snapshot
                    observer.OnNext(info)
                Next
            End If
        End Sub

        Public Sub LastBaggageClaimed()
            Dim snapshot As IObserver(Of BaggageInfo)()

            SyncLock _lock
                snapshot = _observers.ToArray()
                _observers.Clear()
            End SyncLock

            For Each observer As IObserver(Of BaggageInfo) In snapshot
                observer.OnCompleted()
            Next
        End Sub
    End Class

End Namespace
```
Clients that wish to receive updated information call the `BaggageHandler.Subscribe` method. If the client hasn't previously subscribed to notifications, a reference to the client's `System.IObserver`1` implementation is added to the `_observers` collection.

The overloaded `BaggageHandler.BaggageStatus` method can be called to indicate that baggage from a flight either is being unloaded or is no longer being unloaded. In the first case, the method is passed a flight number, the airport from which the flight originated, and the carousel where baggage is being unloaded. In the second case, the method is passed only a flight number. For baggage that is being unloaded, the method checks whether the `BaggageInfo` information passed to the method exists in the `_flights` collection. If it doesn't, the method adds the information and calls each observer's `OnNext` method. For flights whose baggage is no longer being unloaded, the method checks whether information on that flight is stored in the `_flights` collection. If it is, the method calls each observer's `OnNext` method and removes the `BaggageInfo` object from the `_flights` collection.

When the last flight of the day has landed and its baggage has been processed, the `BaggageHandler.LastBaggageClaimed` method is called. This method calls each observer's `OnCompleted` method to indicate that all notifications have completed, and then clears the `_observers` collection.

The provider's `System.IObservable`1.Subscribe*` method returns an `System.IDisposable` implementation that enables observers to stop receiving notifications before the `System.IObserver`1.OnCompleted*` method is called. The source code for this `Unsubscriber` class is shown in the following example. When the class is instantiated in the `BaggageHandler.Subscribe` method, it's passed a reference to the `_lock` object, the `_observers` collection, and a reference to the observer that is added to the collection. These references are assigned to local variables. When the object's `Dispose` method is called, it removes the observer from the `_observers` collection within a lock.

```csharp
﻿namespace Observables.Example;

internal sealed class Unsubscriber<T> : IDisposable
{
    private readonly Lock _lock;
    private readonly ISet<IObserver<T>> _observers;
    private readonly IObserver<T> _observer;

    internal Unsubscriber(
        Lock @lock,
        ISet<IObserver<T>> observers,
        IObserver<T> observer) => (_lock, _observers, _observer) = (@lock, observers, observer);

    public void Dispose()
    {
        lock (_lock)
        {
            _observers.Remove(_observer);
        }
    }
}
```
```vb
Namespace Example

    Friend NotInheritable Class Unsubscriber(Of T)
        Implements IDisposable

        Private ReadOnly _lock As Object
        Private ReadOnly _observers As ISet(Of IObserver(Of T))
        Private ReadOnly _observer As IObserver(Of T)

        Friend Sub New(lock As Object, observers As ISet(Of IObserver(Of T)), observer As IObserver(Of T))
            _lock = lock
            _observers = observers
            _observer = observer
        End Sub

        Public Sub Dispose() Implements IDisposable.Dispose
            SyncLock _lock
                _observers.Remove(_observer)
            End SyncLock
        End Sub
    End Class

End Namespace
```
The following example provides an `System.IObserver`1` implementation named `ArrivalsMonitor`, which is a base class that displays baggage claim information. The information is displayed alphabetically, by the name of the originating city. The methods of `ArrivalsMonitor` are marked as `overridable` (in Visual Basic) or `virtual` (in C#), so they can be overridden in a derived class.
