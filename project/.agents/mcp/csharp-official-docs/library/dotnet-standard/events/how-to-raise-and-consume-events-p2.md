---
title: "Raise and consume events (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/how-to-raise-and-consume-events.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Raise and consume events (part 2 of 2)

## Declare a custom delegate for an event

Declare a custom delegate only in rare scenarios, such as making your class available to legacy code that can't use generics. For most cases, use `System.EventHandler`1` as shown in the previous section.

1. Declare the custom delegate type.

   The delegate signature must match the event handler signature—two parameters: the event source (`object`; in Visual Basic, `Object`) and the event data class:

```csharp
public delegate void ThresholdReachedEventHandler(object sender, ThresholdReachedEventArgs e);
```
```vb
Delegate Sub ThresholdReachedEventHandler(sender As Object, e As ThresholdReachedEventArgs)
```
1. Declare the event using your custom delegate type instead of `System.EventHandler`1`:

```csharp
public event ThresholdReachedEventHandler? ThresholdReached;
```
```vb
Public Event ThresholdReached As ThresholdReachedEventHandler
```
1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

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
    ThresholdReachedEventArgs args = new();
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

   The handler signature must match the custom delegate—`object` for the sender and your event data class for the second parameter:

```csharp
static void c_ThresholdReached(object sender, ThresholdReachedEventArgs e)
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
class EventWithDelegate
{
    static void Main()
    {
        CounterWithDelegate c = new(new Random().Next(10));
        c.ThresholdReached += c_ThresholdReached;

        Console.WriteLine("press 'a' key to increase total");
        while (Console.ReadKey(true).KeyChar == 'a')
        {
            Console.WriteLine("adding one");
            c.Add(1);
        }
    }

    static void c_ThresholdReached(object sender, ThresholdReachedEventArgs e)
    {
        Console.WriteLine($"The threshold of {e.Threshold} was reached at {e.TimeReached}.");
        Environment.Exit(0);
    }
}

class CounterWithDelegate(int passedThreshold)
{
    private readonly int _threshold = passedThreshold;
    private int _total;

    public void Add(int x)
    {
        _total += x;
        if (_total >= _threshold)
        {
            ThresholdReachedEventArgs args = new();
            args.Threshold = _threshold;
            args.TimeReached = DateTime.Now;
            OnThresholdReached(args);
        }
    }

    protected virtual void OnThresholdReached(ThresholdReachedEventArgs e)
    {
        ThresholdReached?.Invoke(this, e);
    }

    public event ThresholdReachedEventHandler? ThresholdReached;
}

public delegate void ThresholdReachedEventHandler(object sender, ThresholdReachedEventArgs e);
```
```vb
Module EventWithDelegate

    Sub Main()
        Dim c As New CounterWithDelegate(New Random().Next(10))
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

Class CounterWithDelegate
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

    Public Event ThresholdReached As ThresholdReachedEventHandler
End Class

Delegate Sub ThresholdReachedEventHandler(sender As Object, e As ThresholdReachedEventArgs)
```
## Related content

- Events
