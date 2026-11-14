---
title: "The `event` keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/event.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The `event` keyword (C# reference)

An ***event*** is a member that enables an object to trigger notifications. Event users can attach executable code for events by supplying ***event handlers***. The `event` keyword declares an ***event***. The event is of a delegate type. While an object triggers an event, the event invokes all supplied event handlers. Event handlers are delegate instances added to the event and executed when the event is raised. Event users can add or remove their event handlers on an event.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to declare and raise an event that uses `System.EventHandler` as the underlying delegate type. For the complete code example, see How to publish events that conform to .NET Guidelines. That sample demonstrates the generic `System.EventHandler`1` delegate type, how to subscribe to an event, and create an event handler method.

```csharp
public class SampleEventArgs
{
    public SampleEventArgs(string text) { Text = text; }
    public string Text { get; } // readonly
}

public class Publisher
{
    // Declare the delegate (if using non-generic pattern).
    public delegate void SampleEventHandler(object sender, SampleEventArgs e);

    // Declare the event.
    public event SampleEventHandler SampleEvent;

    // Wrap the event in a protected virtual method
    // to enable derived classes to raise the event.
    protected virtual void RaiseSampleEvent()
    {
        // Raise the event in a thread-safe manner using the ?. operator.
        SampleEvent?.Invoke(this, new SampleEventArgs("Hello"));
    }
}
```
Events are multicast delegates that you can only invoke from within the class (or derived classes) or struct where you declare them (the publisher class). If other classes or structs subscribe to the event, their event handler methods are called when the publisher class raises the event. For more information and code examples, see Events and Delegates.

You can mark events as `public`, `private`, `protected`, `internal`, `protected internal`, or `private protected`. These access modifiers define how users of the class can access the event. For more information, see Access Modifiers.

Starting with C# 14, you can declare events as `partial`. Partial events have one defining declaration and one implementing declaration. The defining declaration must use the field-like syntax. The implementing declaration must declare the `add` and `remove` handlers.

## Keywords and events

The following keywords apply to events.

- `static`: Makes the event available to callers at any time, even if no instance of the class exists. For more information on static events, see Static Classes and Static Class Members.
- `virtual`: Allows derived classes to override the event behavior by using the override keyword. For more information on virtual events, see Inheritance.
- `sealed`: Specifies that for derived classes it's no longer virtual.
- `abstract`: The compiler doesn't generate the `add` and `remove` event accessor blocks and therefore derived classes must provide their own implementation.

Use the `static` keyword to declare an event as a static event. Static events are available to callers at any time, even if no instance of the class exists. For more information, see Static Classes and Static Class Members.

Use the `virtual` keyword to mark an event as a virtual event. Derived classes can override the event behavior by using the `override` keyword. For more information, see Inheritance. An event overriding a virtual event can also be `sealed`, which specifies that for derived classes it's no longer virtual. Lastly, an event can be declared `abstract`, which means that the compiler doesn't generate the `add` and `remove` event accessor blocks. Therefore, derived classes must provide their own implementation.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- add
- remove
- Modifiers
- How to combine delegates (Multicast Delegates)
