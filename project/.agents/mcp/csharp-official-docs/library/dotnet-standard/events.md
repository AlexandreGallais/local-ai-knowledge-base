---
title: "Handling and raising events"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Handle and raise events

Events in .NET are based on the delegate model. The delegate model follows the observer design pattern, which enables a subscriber to register with and receive notifications from a provider. An event sender pushes a notification when an event occurs. An event receiver defines the response. This article describes the major components of the delegate model, how to consume events in applications, and how to implement events in your code.

## Raise events with an event sender

An event is a message sent by an object to signal the occurrence of an action. The action might be user interaction, such as a button press, or it might result from other program logic, such as a property value change. The object that raises the event is called the *event sender*. The event sender doesn't know the object or method that receives (handles) the events it raises. The event is typically a member of the event sender. For example, the `System.Timers.Timer.Elapsed` event is a member of the `System.Timers.Timer` class, and the `System.ComponentModel.INotifyPropertyChanged.PropertyChanged` event is a member of the class that implements the `System.ComponentModel.INotifyPropertyChanged` interface.

To define an event, you use the C# event or the Visual Basic Event keyword in the signature of your event class, and specify the type of delegate for the event. Delegates are described in the next section.

To raise an event, invoke the delegate associated with the event. The event sender typically wraps the invocation in a `protected virtual` method (`Protected Overridable` in Visual Basic) named `On<EventName>`—for example, `OnDataReceived`. The method takes one parameter: an event data object of type `System.EventArgs` or a derived type. Wrapping the invocation this way lets derived classes override the raise logic. A derived class that overrides this method must call the base class implementation to ensure registered delegates receive the event.

The following example shows how to declare an event named `ThresholdReached`. The event is associated with the `System.EventHandler` delegate and is raised in a method named `OnThresholdReached`:

```csharp
class Counter
{
    public event EventHandler? ThresholdReached;

    protected virtual void OnThresholdReached(EventArgs e)
    {
        ThresholdReached?.Invoke(this, e);
    }

    // Provide remaining implementation for the class...
}
```
```vb
Public Class Counter
    Public Event ThresholdReached As EventHandler

    Protected Overridable Sub OnThresholdReached(e As EventArgs)
        RaiseEvent ThresholdReached(Me, e)
    End Sub

    ' Provide remaining implementation for the class...
End Class
```
## Declare delegate signatures for event handlers

A delegate is a type that holds a reference to a method. A delegate is declared with a signature that shows the return type and parameters for the methods it references. It can hold references only to methods that match its signature. A delegate is equivalent to a type-safe function pointer or a callback. A delegate declaration is sufficient to define a delegate class.

Delegates have many uses in .NET. In the context of events, a delegate is an intermediary (or pointer-like mechanism) between the event source and the code that handles the event. You associate a delegate with an event by including the delegate type in the event declaration, as shown in the example in the previous section. For more information about delegates, see the `System.Delegate` class.

.NET provides the `System.EventHandler` and `System.EventHandler`1` delegates to support most event scenarios. Use the `System.EventHandler` delegate for all events that don't include event data. Use the `System.EventHandler`1` delegate for events that include data about the event. These delegates have no return type value and take two parameters (an object for the source of the event and an object for event data).

Delegates are multicast class objects, which means they can hold references to more than one event-handling method. For more information, see the `System.Delegate` reference page. Delegates provide flexibility and fine-grained control in event handling. A delegate acts as an event dispatcher for the class that raises the event by maintaining a list of registered event handlers for the event.

Use the `System.EventHandler` and `System.EventHandler`1` delegate types to define the needed delegate. You mark a delegate with the `delegate` type in C# or the `Delegate` type in Visual Basic in the declaration. The following example shows how to declare a delegate named `ThresholdReachedEventHandler`:

```csharp
public delegate void ThresholdReachedEventHandler(object sender, ThresholdReachedEventArgs e);
```
```vb
Public Delegate Sub ThresholdReachedEventHandler(sender As Object, e As ThresholdReachedEventArgs)
```
## Work with event data classes

Data associated with an event can be provided through an event data class. .NET provides many event data classes that you can use in your applications. For example, the `System.IO.Ports.SerialDataReceivedEventArgs` class is the event data class for the `System.IO.Ports.SerialPort.DataReceived` event. .NET follows a naming pattern where all event data classes end with the `EventArgs` suffix. You determine which event data class is associated with an event by looking at the delegate for the event. For example, the `System.IO.Ports.SerialDataReceivedEventHandler` delegate includes the `System.IO.Ports.SerialDataReceivedEventArgs` class as a parameter.

The `System.EventArgs` class is typically the base type for event data classes. You also use this class if an event doesn't have any data associated with it. When you create an event that notifies subscribers that something happened without any additional data, include the `System.EventArgs` class as the second parameter in the delegate. You can pass the `System.EventArgs.Empty` value when no data is provided. The `System.EventHandler` delegate includes the `System.EventArgs` class as a parameter.

You can create a class that derives from the `System.EventArgs` class to provide any members needed to pass data related to the event. Typically, you should use the same naming pattern as .NET and end your event data class name with the `EventArgs` suffix.

The following example shows an event data class named `ThresholdReachedEventArgs` that contains properties that are specific to the event being raised:

```csharp
public class ThresholdReachedEventArgs : EventArgs
{
    public int Threshold { get; set; }
    public DateTime TimeReached { get; set; }
}
```
```vb
Public Class ThresholdReachedEventArgs
    Inherits EventArgs

    Public Property Threshold As Integer
    Public Property TimeReached As Date
End Class
```
## Respond to events with handlers

To respond to an event, you define an event handler method in the event receiver. This method must match the signature of the delegate for the event you're handling. In the event handler, you perform the actions that are required when the event is raised, such as collecting user input after the user presses a button. To receive notifications when the event occurs, your event handler method must subscribe to the event.

The following example shows an event handler method named `c_ThresholdReached` that matches the signature for the `System.EventHandler` delegate. The method subscribes to the `ThresholdReached` event:

```csharp
class Program
{
    static void Main()
    {
        var c = new Counter();
        c.ThresholdReached += c_ThresholdReached;

        // Provide remaining implementation for the class...
    }

    static void c_ThresholdReached(object? sender, EventArgs e)
    {
        Console.WriteLine("The threshold was reached.");
    }
}
```
```vb
Module Program
    Sub Main()
        Dim c As New Counter()
        AddHandler c.ThresholdReached, AddressOf c_ThresholdReached

        ' Provide remaining implementation for the class...
    End Sub

    Sub c_ThresholdReached(sender As Object, e As EventArgs)
        Console.WriteLine("The threshold was reached.")
    End Sub
End Module
```
## Use static and dynamic event handlers

.NET allows subscribers to register for event notifications either statically or dynamically. Static event handlers are in effect for the entire life of the class whose events they handle. Dynamic event handlers are explicitly activated and deactivated during program execution, usually in response to some conditional program logic. You can use dynamic handlers when event notifications are needed only under certain conditions, or when runtime conditions determine the specific handler to call. The example in the previous section shows how to dynamically add an event handler. For more information, see Events (in Visual Basic) and Events (in C#).

## Raise multiple events

If your class raises multiple events, the compiler generates one field per event delegate instance. If the number of events is large, the storage cost of one field per delegate might not be acceptable. For these scenarios, .NET provides event properties that you can use with another data structure of your choice to store event delegates.

Event properties consist of event declarations accompanied by event accessors. Event accessors are methods that you define to add or remove event delegate instances from the storage data structure.

> **Note:**
> The event properties are slower than the event fields because each event delegate must be retrieved before it can be invoked.

The trade-off is between memory and speed. If your class defines many events that are infrequently raised, you should implement event properties. For more information, see Declare multiple events using event properties.

## Explore related tasks

The following resources describe other tasks and concepts related to working with events:

- Raise and consume events: Find examples for raising and consuming events.
- Declare multiple events using event properties: Discover how to use event properties to declare multiple events.
- Explore the observer design pattern: Review a design pattern that enables a subscriber to register with and receive notifications from a provider.

## Review specification reference

Specification reference documentation is available for the APIs that support event handling:

| API name | API type | Reference |
| --- | --- | --- |
| EventHandler | Delegate | `System.EventHandler` |
| EventHandler\<TEventArgs> | Delegate | `System.EventHandler`1` |
| EventArgs | Class |`System.EventArgs` |
| Delegate  | Class | `System.Delegate` |

## Related content

- Events (Visual Basic)
- Events (C# Programming Guide)
- How to: Raise and consume events
- How to: Declare Multiple Events Using Event Properties
