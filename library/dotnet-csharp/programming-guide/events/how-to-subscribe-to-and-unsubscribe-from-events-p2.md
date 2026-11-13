---
title: "How to subscribe to and unsubscribe from events (part 2 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/events/how-to-subscribe-to-and-unsubscribe-from-events.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to subscribe to and unsubscribe from events (part 2 of 4)

### To subscribe to events by using the Visual Studio IDE

1. If you cannot see the **Properties** window, in **Design** view, right-click the form or control for which you want to create an event handler, and select **Properties**.

2. On top of the **Properties** window, click the **Events** icon.

3. Double-click the event that you want to create, for example the `Load` event.

     Visual C# creates an empty event handler method and adds it to your code. Alternatively you can add the code manually in **Code** view. For example, the following lines of code declare an event handler method that will be called when the `Form` class raises the `Load` event.
