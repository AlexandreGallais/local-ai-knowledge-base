---
title: "How to implement an Observer"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/how-to-implement-an-observer.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to implement an observer

The observer design pattern requires a division between an observer, which registers for notifications, and a provider, which monitors data and sends notifications to one or more observers. This article discusses how to create an observer. A related article, How to implement a provider, discusses how to create a provider.

## Create an observer

To create an observer, implement the `System.IObserver`1` interface. The following steps describe each member you need to define.

1. Define the observer type that implements the `System.IObserver`1` interface.

   The following code defines a type named `TemperatureReporter` that is a constructed `System.IObserver`1` implementation with a generic type argument of `Temperature`.

```csharp
namespace TemperatureSample;

public sealed class TemperatureReporter : IObserver<Temperature>
```
```vb
Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureReporter
        Implements IObserver(Of Temperature)
```
1. If the observer needs to unsubscribe before the provider calls `System.IObserver`1.OnCompleted*`, define a private variable to hold the `System.IDisposable` returned by `System.IObservable`1.Subscribe*`, and define a subscription method.

   The private variable `unsubscriber` stores the `System.IDisposable` object. The `Subscribe` method calls the provider's `System.IObservable`1.Subscribe*` method and assigns the returned object to `unsubscriber`.

```csharp
namespace TemperatureSample;

public sealed class TemperatureReporter : IObserver<Temperature>
{
    private IDisposable? _unsubscriber;
    private Temperature? _last;

    public void Subscribe(IObservable<Temperature> provider)
    {
        ArgumentNullException.ThrowIfNull(provider);
        _unsubscriber = provider.Subscribe(this);
    }
```
```vb
Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureReporter
        Implements IObserver(Of Temperature)

        Private _unsubscriber As IDisposable
        Private _last As Temperature?

        Public Sub Subscribe(provider As IObservable(Of Temperature))
            ArgumentNullException.ThrowIfNull(provider)
            _unsubscriber = provider.Subscribe(Me)
        End Sub
```
1. Define an `Unsubscribe` method that lets the observer stop receiving notifications before the provider calls `System.IObserver`1.OnCompleted*`.

```csharp
public void Unsubscribe() => _unsubscriber?.Dispose();
```
```vb
Public Sub Unsubscribe()
    _unsubscriber?.Dispose()
End Sub
```
1. Implement the three methods defined by `System.IObserver`1`: `System.IObserver`1.OnNext*`, `System.IObserver`1.OnError*`, and `System.IObserver`1.OnCompleted*`.

   The `System.IObserver`1.OnError*` and `System.IObserver`1.OnCompleted*` methods can be stub implementations. The `System.IObserver`1.OnError*` method shouldn't handle the passed `System.Exception` as an exception, and `System.IObserver`1.OnCompleted*` can call the provider's `System.IDisposable.Dispose*` implementation.

```csharp
public void OnCompleted() =>
    Console.WriteLine("Additional temperature data won't be transmitted.");

// OnError is informational; observers shouldn't treat it as an exception to handle.
public void OnError(Exception error) { }

public void OnNext(Temperature value)
{
    Console.WriteLine($"The temperature is {value.Degrees}°C at {value.Date:g}");

    if (_last is Temperature previous)
    {
        TimeSpan elapsed = value.Date.ToUniversalTime() - previous.Date.ToUniversalTime();
        Console.WriteLine($"   Change: {value.Degrees - previous.Degrees}° in {elapsed:g}");
    }

    _last = value;
}
```
```vb
Public Sub OnCompleted() Implements IObserver(Of Temperature).OnCompleted
    Console.WriteLine("Additional temperature data won't be transmitted.")
End Sub

' OnError is informational; observers shouldn't treat it as an exception to handle.
Public Sub OnError(error_ As Exception) Implements IObserver(Of Temperature).OnError
End Sub

Public Sub OnNext(value As Temperature) Implements IObserver(Of Temperature).OnNext
    Console.WriteLine($"The temperature is {value.Degrees}°C at {value.Date:g}")

    If _last.HasValue Then
        Dim previous = _last.Value
        Dim elapsed = value.Date.ToUniversalTime() - previous.Date.ToUniversalTime()
        Console.WriteLine($"   Change: {value.Degrees - previous.Degrees}° in {elapsed:g}")
    End If

    _last = value
End Sub
```
## Complete example

 The following example shows the complete source code for the `TemperatureReporter` class, which provides the `System.IObserver`1` implementation for a temperature monitoring application.

```csharp
namespace TemperatureSample;

public sealed class TemperatureReporter : IObserver<Temperature>
{
    private IDisposable? _unsubscriber;
    private Temperature? _last;

    public void Subscribe(IObservable<Temperature> provider)
    {
        ArgumentNullException.ThrowIfNull(provider);
        _unsubscriber = provider.Subscribe(this);
    }

    public void Unsubscribe() => _unsubscriber?.Dispose();

    public void OnCompleted() =>
        Console.WriteLine("Additional temperature data won't be transmitted.");

    // OnError is informational; observers shouldn't treat it as an exception to handle.
    public void OnError(Exception error) { }

    public void OnNext(Temperature value)
    {
        Console.WriteLine($"The temperature is {value.Degrees}°C at {value.Date:g}");

        if (_last is Temperature previous)
        {
            TimeSpan elapsed = value.Date.ToUniversalTime() - previous.Date.ToUniversalTime();
            Console.WriteLine($"   Change: {value.Degrees - previous.Degrees}° in {elapsed:g}");
        }

        _last = value;
    }
}
```
```vb
Namespace Global.TemperatureSample

    Public NotInheritable Class TemperatureReporter
        Implements IObserver(Of Temperature)

        Private _unsubscriber As IDisposable
        Private _last As Temperature?

        Public Sub Subscribe(provider As IObservable(Of Temperature))
            ArgumentNullException.ThrowIfNull(provider)
            _unsubscriber = provider.Subscribe(Me)
        End Sub

        Public Sub Unsubscribe()
            _unsubscriber?.Dispose()
        End Sub

        Public Sub OnCompleted() Implements IObserver(Of Temperature).OnCompleted
            Console.WriteLine("Additional temperature data won't be transmitted.")
        End Sub

        ' OnError is informational; observers shouldn't treat it as an exception to handle.
        Public Sub OnError(error_ As Exception) Implements IObserver(Of Temperature).OnError
        End Sub

        Public Sub OnNext(value As Temperature) Implements IObserver(Of Temperature).OnNext
            Console.WriteLine($"The temperature is {value.Degrees}°C at {value.Date:g}")

            If _last.HasValue Then
                Dim previous = _last.Value
                Dim elapsed = value.Date.ToUniversalTime() - previous.Date.ToUniversalTime()
                Console.WriteLine($"   Change: {value.Degrees - previous.Degrees}° in {elapsed:g}")
            End If

            _last = value
        End Sub
    End Class

End Namespace
```
## Related content

- `System.IObserver`1`
- Observer design pattern
- How to implement a provider
- Best practices for the observer design pattern
