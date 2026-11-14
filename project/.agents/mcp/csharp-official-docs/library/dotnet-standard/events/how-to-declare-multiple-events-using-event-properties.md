---
title: "Declare multiple events using event properties (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/events/how-to-declare-multiple-events-using-event-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Declare multiple events using event properties

When a class defines many events using field-like event declarations, the compiler generates a backing field for each one. Every instance of that class allocates memory for all of those fields—even for events that are never subscribed. With many events, this per-instance overhead wastes memory.

To avoid this memory overhead, use event properties backed by a delegate collection. The collection must provide methods that set, access, and retrieve delegates by event key. `System.ComponentModel.EventHandlerList` is designed for this purpose, but you can also use a `System.Collections.Hashtable` or a class derived from `System.Collections.DictionaryBase`. Keep the collection's implementation details private.

Each event property defines an add accessor and a remove accessor. The add accessor adds the input delegate to the delegate collection, and the remove accessor removes it. Both accessors use a predefined key to add and remove instances from the collection.

## Prerequisites

Familiarize yourself with the concepts in the Events article.
