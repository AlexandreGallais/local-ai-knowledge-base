---
title: "Raise and consume events (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/how-to-raise-and-consume-events.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Raise and consume events

This article shows how to work with events in .NET using the `System.EventHandler` delegate, the `System.EventHandler`1` delegate, and a custom delegate, with examples for events with and without data.

## Prerequisites

Familiarize yourself with the concepts in the Events article.

## Raise an event without data

These steps create a `Counter` class that fires a `ThresholdReached` event when a running total reaches or exceeds a threshold.

1. Declare the event using the `System.EventHandler` delegate.

   Use `EventHandler` when your event doesn't pass data to the handler:

```csharp
public event EventHandler? ThresholdReached;
```
```vb
Public Event ThresholdReached As EventHandler
```
1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   This pattern lets derived classes override the event-raising behavior without directly invoking the delegate. In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

```csharp
protected virtual void OnThresholdReached(EventArgs e)
{
    ThresholdReached?.Invoke(this, e);
}
```
```vb
Protected Overridable Sub OnThresholdReached(e As EventArgs)
    RaiseEvent ThresholdReached(Me, e)
End Sub
```
1. Call the raise method when the condition is met.

   Pass `System.EventArgs.Empty` because this event carries no data:

```csharp
if (_total >= _threshold)
{
    OnThresholdReached(EventArgs.Empty);
}
```
```vb
If (_total >= _threshold) Then
    OnThresholdReached(EventArgs.Empty)
End If
```
1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

```csharp
c.ThresholdReached += c_ThresholdReached;
```
```vb
AddHandler c.ThresholdReached, AddressOf c_ThresholdReached
```
1. Define the event handler method.

   Its signature must match the `System.EventHandler` delegate—the first parameter is the event source and the second is `System.EventArgs`:

```csharp
static void c_ThresholdReached(object? sender, EventArgs e)
{
    Console.WriteLine("The threshold was reached.");
    Environment.Exit(0);
}
```
```vb
Sub c_ThresholdReached(sender As Object, e As EventArgs)
    Console.WriteLine("The threshold was reached.")
    Environment.Exit(0)
End Sub
```
The following example shows the complete implementation:

```csharp
class EventNoData
{
    static void Main()
    {
        Counter c = new(new Random().Next(10));
        c.ThresholdReached += c_ThresholdReached;

        Console.WriteLine("press 'a' key to increase total");
        while (Console.ReadKey(true).KeyChar == 'a')
        {
            Console.WriteLine("adding one");
            c.Add(1);
        }
    }

    static void c_ThresholdReached(object? sender, EventArgs e)
    {
        Console.WriteLine("The threshold was reached.");
        Environment.Exit(0);
    }
}

class Counter(int passedThreshold)
{
    private readonly int _threshold = passedThreshold;
    private int _total;

    public void Add(int x)
    {
        _total += x;
        if (_total >= _threshold)
        {
            OnThresholdReached(EventArgs.Empty);
        }
    }

    protected virtual void OnThresholdReached(EventArgs e)
    {
        ThresholdReached?.Invoke(this, e);
    }

    public event EventHandler? ThresholdReached;
}
```
```vb
Module EventNoData

    Sub Main()
        Dim c As New Counter(New Random().Next(10))
        AddHandler c.ThresholdReached, AddressOf c_ThresholdReached

        Console.WriteLine("press 'a' key to increase total")
        While Console.ReadKey(True).KeyChar = "a"
            Console.WriteLine("adding one")
            c.Add(1)
        End While
    End Sub

    Sub c_ThresholdReached(sender As Object, e As EventArgs)
        Console.WriteLine("The threshold was reached.")
        Environment.Exit(0)
    End Sub
End Module

Class Counter
    Private ReadOnly _threshold As Integer
    Private _total As Integer

    Public Sub New(passedThreshold As Integer)
        _threshold = passedThreshold
    End Sub

    Public Sub Add(x As Integer)
        _total += x
        If (_total >= _threshold) Then
            OnThresholdReached(EventArgs.Empty)
        End If
    End Sub

    Protected Overridable Sub OnThresholdReached(e As EventArgs)
        RaiseEvent ThresholdReached(Me, e)
    End Sub

    Public Event ThresholdReached As EventHandler
End Class
```
## Raise an event with data

These steps extend the previous `Counter` example to raise an event that includes data—the threshold value and the time it was reached.

1. Define an event data class that inherits from `System.EventArgs`.

   Add properties for each piece of data you want to pass to the handler:

```csharp
public class ThresholdReachedEventArgs : EventArgs
{
    public int Threshold { get; set; }
    public DateTime TimeReached { get; set; }
}
```
```vb
Class ThresholdReachedEventArgs
    Inherits EventArgs

    Public Property Threshold As Integer
    Public Property TimeReached As Date
End Class
```
1. Declare the event using the `System.EventHandler`1` delegate, passing your event data class as the type argument:

```csharp
public event EventHandler<ThresholdReachedEventArgs>? ThresholdReached;
```
```vb
Public Event ThresholdReached As EventHandler(Of ThresholdReachedEventArgs)
```
1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   This pattern lets derived classes override the event-raising behavior without directly invoking the delegate. In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

```csharp
protected virtual void OnThresholdReached(ThresholdReachedEventArgs e)
{
    ThresholdReached?.Invoke(this, e);
}
```
```vb
Protected Overridable Sub OnThresholdReached(e As ThresholdReachedEventArgs)
    RaiseEvent ThresholdReached(Me, e)
End Sub
```
1. Populate the event data object and call the raise method when the condition is met:

```csharp
if (_total >= _threshold)
{
    ThresholdReachedEventArgs args = new ThresholdReachedEventArgs();
    args.Threshold = _threshold;
    args.TimeReached = DateTime.Now;
    OnThresholdReached(args);
}
```
```vb
If (_total >= _threshold) Then
    Dim args As New ThresholdReachedEventArgs With {
        .Threshold = _threshold,
        .TimeReached = Date.Now
    }
    OnThresholdReached(args)
End If
```
1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

```csharp
c.ThresholdReached += c_ThresholdReached;
```
```vb
AddHandler c.ThresholdReached, AddressOf c_ThresholdReached
```
1. Define the event handler.

   The second parameter type is `ThresholdReachedEventArgs` instead of `System.EventArgs`, which lets the handler read the event data:

```csharp
static void c_ThresholdReached(object? sender, ThresholdReachedEventArgs e)
{
    Console.WriteLine($"The threshold of {e.Threshold} was reached at {e.TimeReached}.");
    Environment.Exit(0);
}
```
```vb
Sub c_ThresholdReached(sender As Object, e As ThresholdReachedEventArgs)
    Console.WriteLine("The threshold of {0} was reached at {1}.", e.Threshold, e.TimeReached)
    Environment.Exit(0)
End Sub
```
The following example shows the complete implementation:

```csharp
class EventWithData
{
    static void Main()
    {
        CounterWithData c = new(new Random().Next(10));
        c.ThresholdReached += c_ThresholdReached;

        Console.WriteLine("press 'a' key to increase total");
        while (Console.ReadKey(true).KeyChar == 'a')
        {
            Console.WriteLine("adding one");
            c.Add(1);
        }
    }

    static void c_ThresholdReached(object? sender, ThresholdReachedEventArgs e)
    {
        Console.WriteLine($"The threshold of {e.Threshold} was reached at {e.TimeReached}.");
        Environment.Exit(0);
    }
}

class CounterWithData(int passedThreshold)
{
    private readonly int _threshold = passedThreshold;
    private int _total;

    public void Add(int x)
    {
        _total += x;
        if (_total >= _threshold)
        {
            ThresholdReachedEventArgs args = new ThresholdReachedEventArgs();
            args.Threshold = _threshold;
            args.TimeReached = DateTime.Now;
            OnThresholdReached(args);
        }
    }

    protected virtual void OnThresholdReached(ThresholdReachedEventArgs e)
    {
        ThresholdReached?.Invoke(this, e);
    }

    public event EventHandler<ThresholdReachedEventArgs>? ThresholdReached;
}

public class ThresholdReachedEventArgs : EventArgs
{
    public int Threshold { get; set; }
    public DateTime TimeReached { get; set; }
}
```
```vb
Module EventWithData

    Sub Main()
        Dim c As New CounterWithData(New Random().Next(10))
        AddHandler c.ThresholdReached, AddressOf c_ThresholdReached

        Console.WriteLine("press 'a' key to increase total")
        While Console.ReadKey(True).KeyChar = "a"
            Console.WriteLine("adding one")
            c.Add(1)
        End While
    End Sub

    Sub c_ThresholdReached(sender As Object, e As ThresholdReachedEventArgs)
        Console.WriteLine("The threshold of {0} was reached at {1}.", e.Threshold, e.TimeReached)
        Environment.Exit(0)
    End Sub
End Module

Class CounterWithData
    Private ReadOnly _threshold As Integer
    Private _total As Integer

    Public Sub New(passedThreshold As Integer)
        _threshold = passedThreshold
    End Sub

    Public Sub Add(x As Integer)
        _total += x
        If (_total >= _threshold) Then
            Dim args As New ThresholdReachedEventArgs With {
                .Threshold = _threshold,
                .TimeReached = Date.Now
            }
            OnThresholdReached(args)
        End If
    End Sub

    Protected Overridable Sub OnThresholdReached(e As ThresholdReachedEventArgs)
        RaiseEvent ThresholdReached(Me, e)
    End Sub

    Public Event ThresholdReached As EventHandler(Of ThresholdReachedEventArgs)
End Class

Class ThresholdReachedEventArgs
    Inherits EventArgs

    Public Property Threshold As Integer
    Public Property TimeReached As Date
End Class
```
