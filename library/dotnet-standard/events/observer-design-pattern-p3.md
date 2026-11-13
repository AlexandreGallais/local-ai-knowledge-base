---
title: "Observer design pattern (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/events/observer-design-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Observer design pattern (part 3 of 3)

```csharp
﻿namespace Observables.Example;

public class ArrivalsMonitor : IObserver<BaggageInfo>
{
    private readonly string _name;
    private readonly Lock _lock = new();
    private readonly List<string> _flights = [];
    private readonly string _format = "{0,-20} {1,5}  {2, 3}";
    private IDisposable? _cancellation;

    public ArrivalsMonitor(string name)
    {
        ArgumentException.ThrowIfNullOrEmpty(name);
        _name = name;
    }

    public virtual void Subscribe(BaggageHandler provider) =>
        _cancellation = provider.Subscribe(this);

    public virtual void Unsubscribe()
    {
        Interlocked.Exchange(ref _cancellation, null)?.Dispose();

        lock (_lock)
        {
            _flights.Clear();
        }
    }

    public virtual void OnCompleted()
    {
        lock (_lock)
        {
            _flights.Clear();
        }
    }

    // No implementation needed: Method is not called by the BaggageHandler class.
    public virtual void OnError(Exception e)
    {
        // No implementation.
    }

    // Update information.
    public virtual void OnNext(BaggageInfo info)
    {
        bool updated = false;

        lock (_lock)
        {
            // Flight has unloaded its baggage; remove from the monitor.
            if (info.Carousel is 0)
            {
                string flightNumber = $"{info.FlightNumber,5}";
                for (int index = _flights.Count - 1; index >= 0; index--)
                {
                    string flightInfo = _flights[index];
                    if (flightInfo.Substring(21, 5).Equals(flightNumber))
                    {
                        updated = true;
                        _flights.RemoveAt(index);
                    }
                }
            }
            else
            {
                // Add flight if it doesn't exist in the collection.
                string flightInfo = string.Format(_format, info.From, info.FlightNumber, info.Carousel);
                if (_flights.Contains(flightInfo) is false)
                {
                    _flights.Add(flightInfo);
                    updated = true;
                }
            }

            if (updated)
            {
                _flights.Sort();
                Console.WriteLine($"Arrivals information from {_name}");
                foreach (string flightInfo in _flights)
                {
                    Console.WriteLine(flightInfo);
                }

                Console.WriteLine();
            }
        }
    }
}
```
```vb
Imports System.Threading

Namespace Example

    Public Class ArrivalsMonitor
        Implements IObserver(Of BaggageInfo)

        Private ReadOnly _name As String
        Private ReadOnly _lock As New Object()
        Private ReadOnly _flights As New List(Of String)()
        Private ReadOnly _format As String = "{0,-20} {1,5}  {2, 3}"
        Private _cancellation As IDisposable

        Public Sub New(name As String)
            If String.IsNullOrEmpty(name) Then
                Throw New ArgumentException("Value cannot be null or empty.", NameOf(name))
            End If
            _name = name
        End Sub

        Public Overridable Sub Subscribe(provider As BaggageHandler)
            _cancellation = provider.Subscribe(Me)
        End Sub

        Public Overridable Sub Unsubscribe()
            Dim previous = Interlocked.Exchange(_cancellation, Nothing)
            previous?.Dispose()

            SyncLock _lock
                _flights.Clear()
            End SyncLock
        End Sub

        Public Overridable Sub OnCompleted() Implements IObserver(Of BaggageInfo).OnCompleted
            SyncLock _lock
                _flights.Clear()
            End SyncLock
        End Sub

        ' No implementation needed: Method is not called by the BaggageHandler class.
        Public Overridable Sub OnError([error] As Exception) Implements IObserver(Of BaggageInfo).OnError
            ' No implementation.
        End Sub

        ' Update information.
        Public Overridable Sub OnNext(info As BaggageInfo) Implements IObserver(Of BaggageInfo).OnNext
            Dim updated As Boolean = False

            SyncLock _lock
                ' Flight has unloaded its baggage; remove from the monitor.
                If info.Carousel = 0 Then
                    Dim flightNumber As String = String.Format("{0,5}", info.FlightNumber)
                    For index As Integer = _flights.Count - 1 To 0 Step -1
                        Dim flightInfo As String = _flights(index)
                        If flightInfo.Substring(21, 5).Equals(flightNumber) Then
                            updated = True
                            _flights.RemoveAt(index)
                        End If
                    Next
                Else
                    ' Add flight if it doesn't exist in the collection.
                    Dim flightInfo As String = String.Format(_format, info.From, info.FlightNumber, info.Carousel)
                    If Not _flights.Contains(flightInfo) Then
                        _flights.Add(flightInfo)
                        updated = True
                    End If
                End If

                If updated Then
                    _flights.Sort()
                    Console.WriteLine($"Arrivals information from {_name}")
                    For Each flightInfo As String In _flights
                        Console.WriteLine(flightInfo)
                    Next

                    Console.WriteLine()
                End If
            End SyncLock
        End Sub
    End Class

End Namespace
```
The `ArrivalsMonitor` class includes the `Subscribe` and `Unsubscribe` methods. The `Subscribe` method enables the class to save the `System.IDisposable` implementation returned by the call to `System.IObservable`1.Subscribe*` to a private variable. The `Unsubscribe` method enables the class to unsubscribe from notifications by calling the provider's `System.IDisposable.Dispose*` implementation. `ArrivalsMonitor` also provides implementations of the `System.IObserver`1.OnNext*`, `System.IObserver`1.OnError*`, and `System.IObserver`1.OnCompleted*` methods. Only the `System.IObserver`1.OnNext*` implementation contains a significant amount of code. The method works with a private, sorted, generic `System.Collections.Generic.List`1` object that maintains information about the airports of origin for arriving flights and the carousels on which their baggage is available. If the `BaggageHandler` class reports a new flight arrival, the `System.IObserver`1.OnNext*` method implementation adds information about that flight to the list. If the `BaggageHandler` class reports that the flight's baggage has been unloaded, the `System.IObserver`1.OnNext*` method removes that flight from the list. Whenever a change is made, the list is sorted and displayed to the console.

The following example contains the application entry point that instantiates the `BaggageHandler` class and two instances of the `ArrivalsMonitor` class, and uses the `BaggageHandler.BaggageStatus` method to add and remove information about arriving flights. In each case, the observers receive updates and correctly display baggage claim information.

```csharp
﻿using Observables.Example;

BaggageHandler provider = new();
ArrivalsMonitor observer1 = new("BaggageClaimMonitor1");
ArrivalsMonitor observer2 = new("SecurityExit");

provider.BaggageStatus(712, "Detroit", 3);
observer1.Subscribe(provider);

provider.BaggageStatus(712, "Kalamazoo", 3);
provider.BaggageStatus(400, "New York-Kennedy", 1);
provider.BaggageStatus(712, "Detroit", 3);
observer2.Subscribe(provider);

provider.BaggageStatus(511, "San Francisco", 2);
provider.BaggageStatus(712);
observer2.Unsubscribe();

provider.BaggageStatus(400);
provider.LastBaggageClaimed();
```
```vb
Imports Observables.Example
Imports System.Threading

Module Program
    Sub Main(args As String())
        Dim provider As New BaggageHandler()
        Dim observer1 As New ArrivalsMonitor("BaggageClaimMonitor1")
        Dim observer2 As New ArrivalsMonitor("SecurityExit")

        provider.BaggageStatus(712, "Detroit", 3)
        observer1.Subscribe(provider)

        provider.BaggageStatus(712, "Kalamazoo", 3)
        provider.BaggageStatus(400, "New York-Kennedy", 1)
        provider.BaggageStatus(712, "Detroit", 3)
        observer2.Subscribe(provider)

        provider.BaggageStatus(511, "San Francisco", 2)
        provider.BaggageStatus(712)
        observer2.Unsubscribe()

        provider.BaggageStatus(400)
        provider.LastBaggageClaimed()
    End Sub
End Module
```
## Related content

- Observer design pattern best practices
- How to: Implement a provider
- How to: Implement an observer
