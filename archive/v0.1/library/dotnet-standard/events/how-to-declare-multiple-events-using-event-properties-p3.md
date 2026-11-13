---
title: "Declare multiple events using event properties (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/events/how-to-declare-multiple-events-using-event-properties.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Declare multiple events using event properties (part 3 of 3)

```csharp
using System.ComponentModel;

public class SensorEventArgs(string sensorId, double value) : EventArgs
{
    public string SensorId { get; } = sensorId;
    public double Value { get; } = value;
}

// Sensor defines 10 event properties backed by a single EventHandlerList.
// EventHandlerList is memory-efficient for classes with many events: it only
// allocates storage for events that have active subscribers.
class Sensor
{
    protected EventHandlerList listEventDelegates = new();

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

    public event EventHandler<SensorEventArgs> TemperatureChanged
    {
        add    { listEventDelegates.AddHandler(temperatureChangedKey, value); }
        remove { listEventDelegates.RemoveHandler(temperatureChangedKey, value); }
    }
    protected virtual void OnTemperatureChanged(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[temperatureChangedKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> HumidityChanged
    {
        add    { listEventDelegates.AddHandler(humidityChangedKey, value); }
        remove { listEventDelegates.RemoveHandler(humidityChangedKey, value); }
    }
    protected virtual void OnHumidityChanged(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[humidityChangedKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> PressureChanged
    {
        add    { listEventDelegates.AddHandler(pressureChangedKey, value); }
        remove { listEventDelegates.RemoveHandler(pressureChangedKey, value); }
    }
    protected virtual void OnPressureChanged(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[pressureChangedKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> BatteryLow
    {
        add    { listEventDelegates.AddHandler(batteryLowKey, value); }
        remove { listEventDelegates.RemoveHandler(batteryLowKey, value); }
    }
    protected virtual void OnBatteryLow(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[batteryLowKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> SignalLost
    {
        add    { listEventDelegates.AddHandler(signalLostKey, value); }
        remove { listEventDelegates.RemoveHandler(signalLostKey, value); }
    }
    protected virtual void OnSignalLost(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[signalLostKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> SignalRestored
    {
        add    { listEventDelegates.AddHandler(signalRestoredKey, value); }
        remove { listEventDelegates.RemoveHandler(signalRestoredKey, value); }
    }
    protected virtual void OnSignalRestored(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[signalRestoredKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> ThresholdExceeded
    {
        add    { listEventDelegates.AddHandler(thresholdExceededKey, value); }
        remove { listEventDelegates.RemoveHandler(thresholdExceededKey, value); }
    }
    protected virtual void OnThresholdExceeded(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[thresholdExceededKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> CalibrationRequired
    {
        add    { listEventDelegates.AddHandler(calibrationRequiredKey, value); }
        remove { listEventDelegates.RemoveHandler(calibrationRequiredKey, value); }
    }
    protected virtual void OnCalibrationRequired(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[calibrationRequiredKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> DataReceived
    {
        add    { listEventDelegates.AddHandler(dataReceivedKey, value); }
        remove { listEventDelegates.RemoveHandler(dataReceivedKey, value); }
    }
    protected virtual void OnDataReceived(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[dataReceivedKey])?.Invoke(this, e);

    public event EventHandler<SensorEventArgs> ErrorDetected
    {
        add    { listEventDelegates.AddHandler(errorDetectedKey, value); }
        remove { listEventDelegates.RemoveHandler(errorDetectedKey, value); }
    }
    protected virtual void OnErrorDetected(SensorEventArgs e) =>
        ((EventHandler<SensorEventArgs>?)listEventDelegates[errorDetectedKey])?.Invoke(this, e);
}
```
```vb
Imports System.ComponentModel

Public Class SensorEventArgs
    Inherits EventArgs

    Public ReadOnly Property SensorId As String
    Public ReadOnly Property Value As Double

    Public Sub New(sensorId As String, value As Double)
        Me.SensorId = sensorId
        Me.Value = value
    End Sub
End Class

' Sensor defines 10 event properties backed by a single EventHandlerList.
' EventHandlerList is memory-efficient for classes with many events: it only
' allocates storage for events that have active subscribers.
Class Sensor

    Protected listEventDelegates As New EventHandlerList()

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

    Public Custom Event HumidityChanged As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(humidityChangedKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(humidityChangedKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(humidityChangedKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event PressureChanged As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(pressureChangedKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(pressureChangedKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(pressureChangedKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event BatteryLow As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(batteryLowKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(batteryLowKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(batteryLowKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event SignalLost As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(signalLostKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(signalLostKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(signalLostKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event SignalRestored As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(signalRestoredKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(signalRestoredKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(signalRestoredKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event ThresholdExceeded As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(thresholdExceededKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(thresholdExceededKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(thresholdExceededKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event CalibrationRequired As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(calibrationRequiredKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(calibrationRequiredKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(calibrationRequiredKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event DataReceived As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(dataReceivedKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(dataReceivedKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(dataReceivedKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

    Public Custom Event ErrorDetected As EventHandler(Of SensorEventArgs)
        AddHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.AddHandler(errorDetectedKey, Value)
        End AddHandler
        RemoveHandler(Value As EventHandler(Of SensorEventArgs))
            listEventDelegates.RemoveHandler(errorDetectedKey, Value)
        End RemoveHandler
        RaiseEvent(sender As Object, e As SensorEventArgs)
            CType(listEventDelegates(errorDetectedKey), EventHandler(Of SensorEventArgs))?.Invoke(sender, e)
        End RaiseEvent
    End Event

End Class
```
## Related content

- `System.ComponentModel.EventHandlerList`
- Events
