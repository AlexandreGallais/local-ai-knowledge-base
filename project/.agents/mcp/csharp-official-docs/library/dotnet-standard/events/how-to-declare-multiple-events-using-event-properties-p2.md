---
title: "Declare multiple events using event properties (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/how-to-declare-multiple-events-using-event-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Declare multiple events using event properties (part 2 of 3)

## Define multiple events using event properties

These steps create a `Sensor` class that exposes 10 event properties, all backed by a single `EventHandlerList`.

1. Define an event data class that inherits from `System.EventArgs`.

   Add properties for each piece of data you want to pass to the handler:

```csharp
public class SensorEventArgs(string sensorId, double value) : EventArgs
{
    public string SensorId { get; } = sensorId;
    public double Value { get; } = value;
}
```
```vb
Public Class SensorEventArgs
    Inherits EventArgs

    Public ReadOnly Property SensorId As String
    Public ReadOnly Property Value As Double

    Public Sub New(sensorId As String, value As Double)
        Me.SensorId = sensorId
        Me.Value = value
    End Sub
End Class
```
1. Declare an `System.ComponentModel.EventHandlerList` field to store the delegates:

```csharp
protected EventHandlerList listEventDelegates = new();
```
```vb
Protected listEventDelegates As New EventHandlerList()
```
1. Declare a unique key for each event.

   `EventHandlerList` stores delegates by key. Use a `static readonly` object (`Shared ReadOnly` in Visual Basic) for each key—object identity ensures each key is truly unique:

```csharp
static readonly object temperatureChangedKey = new();
static readonly object humidityChangedKey = new();
static readonly object pressureChangedKey = new();
static readonly object batteryLowKey = new();
static readonly object signalLostKey = new();
static readonly object signalRestoredKey = new();
static readonly object thresholdExceededKey = new();
static readonly object calibrationRequiredKey = new();
static readonly object dataReceivedKey = new();
static readonly object errorDetectedKey = new();
```
```vb
Shared ReadOnly temperatureChangedKey  As New Object()
Shared ReadOnly humidityChangedKey     As New Object()
Shared ReadOnly pressureChangedKey     As New Object()
Shared ReadOnly batteryLowKey          As New Object()
Shared ReadOnly signalLostKey          As New Object()
Shared ReadOnly signalRestoredKey      As New Object()
Shared ReadOnly thresholdExceededKey   As New Object()
Shared ReadOnly calibrationRequiredKey As New Object()
Shared ReadOnly dataReceivedKey        As New Object()
Shared ReadOnly errorDetectedKey       As New Object()
```
1. Define each event as an event property with custom add and remove accessors.

   Each accessor calls `AddHandler` or `RemoveHandler` on the list using that event's key. In C#, also add a `protected virtual` raise method that retrieves the delegate from the list by key and invokes it. In Visual Basic, the `Custom Event` declaration already includes a `RaiseEvent` block that does this:

```csharp
public event EventHandler<SensorEventArgs> TemperatureChanged
{
    add    { listEventDelegates.AddHandler(temperatureChangedKey, value); }
    remove { listEventDelegates.RemoveHandler(temperatureChangedKey, value); }
}
protected virtual void OnTemperatureChanged(SensorEventArgs e) =>
    ((EventHandler<SensorEventArgs>?)listEventDelegates[temperatureChangedKey])?.Invoke(this, e);
```
```vb
Public Custom Event TemperatureChanged As EventHandler(Of SensorEventArgs)
    AddHandler(Value As EventHandler(Of SensorEventArgs))
        listEventDelegates.AddHandler(temperatureChangedKey, Value)
    End AddHandler
    RemoveHandler(Value As EventHandler(Of SensorEventArgs))
        listEventDelegates.RemoveHandler(temperatureChangedKey, Value)
    End RemoveHandler
    RaiseEvent(sender As Object, e As SensorEventArgs)
        CType(listEventDelegates(temperatureChangedKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
    End RaiseEvent
End Event
```
   Repeat this pattern for each event, using its corresponding key.

1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

```csharp
sensor.TemperatureChanged += Sensor_TemperatureChanged;
```
```vb
AddHandler sensor.TemperatureChanged, AddressOf Sensor_TemperatureChanged
```
1. Define the event handler.

   The signature must match the `System.EventHandler`1` delegate—an `object` sender and your event data class as the second parameter:

```csharp
static void Sensor_TemperatureChanged(object? sender, SensorEventArgs e) =>
    Console.WriteLine($"Sensor {e.SensorId}: temperature changed to {e.Value}.");
```
```vb
Sub Sensor_TemperatureChanged(sender As Object, e As SensorEventArgs)
    Console.WriteLine("Sensor {0}: temperature changed to {1}.", e.SensorId, e.Value)
End Sub
```
The following example shows the complete `Sensor` class implementation:
