---
title: "The `add` keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/add.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The `add` contextual keyword (C# Reference)

Use the `add` contextual keyword to define a custom event accessor that's invoked when client code subscribes to your event. If you supply a custom `add` accessor, you must also supply a remove accessor.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows an event that has custom `add` and remove accessors. For the full example, see How to implement interface events.

```csharp
class Events : IDrawingObject
{
    event EventHandler PreDrawEvent;

    event EventHandler IDrawingObject.OnDraw
    {
        add => PreDrawEvent += value;
        remove => PreDrawEvent -= value;
    }
}
```
You don't typically need to provide your own custom event accessors. The automatically generated accessors when you declare an event are sufficient for most scenarios. Starting with C# 14, you can declare `partial` events. The implementing declaration of a partial event must declare the `add` and `remove` handlers.

## See also

- Events
