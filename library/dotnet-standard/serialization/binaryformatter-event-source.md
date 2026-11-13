---
title: "BinaryFormatter event source"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-event-source.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter event source

Starting with .NET 5, `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` includes a built-in `System.Diagnostics.Tracing.EventSource` that gives you visibility into when an object serialization or deserialization is occurring. Apps can use `System.Diagnostics.Tracing.EventListener`-derived types to listen for these notifications and log them.

This functionality is not a substitute for a `System.Runtime.Serialization.SerializationBinder` or an `System.Runtime.Serialization.ISerializationSurrogate` and can't be used to modify the data being serialized or deserialized. Rather, this eventing system is intended to provide insight into the types being serialized or deserialized. It can also be used to detect unintended calls into the `BinaryFormatter` infrastructure, such as calls originating from third-party library code.

## Description of events

The `BinaryFormatter` event source has the well-known name `System.Runtime.Serialization.Formatters.Binary.BinaryFormatterEventSource`. Listeners can subscribe to six events.

### SerializationStart event (id = `10`)

Raised when `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*` has been called and has started the serialization process. This event is paired with the `SerializationEnd` event. The `SerializationStart` event can be called recursively if an object calls `BinaryFormatter.Serialize` within its own serialization routine.

This event doesn't contain a payload.

### SerializationEnd event (id = `11`)

Raised when `BinaryFormatter.Serialize` has completed its work. Each occurrence of `SerializationEnd` denotes the completion of the last unpaired `SerializationStart` event.

This event doesn't contain a payload.

### SerializingObject event (id = `12`)

Raised when `BinaryFormatter.Serialize` is in the process of serializing a non-primitive type. The `BinaryFormatter` infrastructure special-cases certain types (such as `string` and `int`) and doesn't raise this event when these types are encountered. This event is raised for user-defined types and other types that `BinaryFormatter` doesn't natively understand.

This event may be raised zero or more times between `SerializationStart` and `SerializationEnd` events.

This event contains a payload with one argument:

* `typeName` (`string`): The assembly-qualified name (see `System.Type.AssemblyQualifiedName`) of the type being serialized.

### DeserializationStart event (id = `20`)

Raised when `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*` has been called and has started the deserialization process. This event is paired with the `DeserializationEnd` event. The `DeserializationStart` event can be called recursively if an object calls `BinaryFormatter.Deserialize` within its own deserialization routine.

This event doesn't contain a payload.

### DeserializationEnd event (id = `21`)

Raised when `BinaryFormatter.Deserialize` has completed its work. Each occurrence of `DeserializationEnd` denotes the completion of the last unpaired `DeserializationStart` event.

This event doesn't contain a payload.

### DeserializingObject event (id = `22`)

Raised when `BinaryFormatter.Deserialize` is in the process of deserializing a non-primitive type. The `BinaryFormatter` infrastructure special-cases certain types (such as `string` and `int`) and doesn't raise this event when these types are encountered. This event is raised for user-defined types and other types that `BinaryFormatter` doesn't natively understand.

This event may be raised zero or more times between `DeserializationStart` and `DeserializationEnd` events.

This event contains a payload with one argument.

* `typeName` (`string`): The assembly-qualified name (see `System.Type.AssemblyQualifiedName`) of the type being deserialized.

### \[Advanced\] Subscribe to a subset of notifications

Listeners that want to subscribe to only a subset of notifications can choose which keywords to enable.

* `Serialization` = `(EventKeywords)1`: Raises the `SerializationStart`, `SerializationEnd`, and `SerializingObject` events.
* `Deserialization` = `(EventKeywords)2`: Raises the `DeserializationStart`, `DeserializationEnd`, and `DeserializingObject` events.

If no keyword filters are provided during `EventListener` registration, all events are raised.

For more information, see `System.Diagnostics.Tracing.EventKeywords`.

## Sample code

The following code:

* Creates an `EventListener`-derived type that writes to `System.Console`.
* Subscribes that listener to `BinaryFormatter`-produced notifications.
* Serializes and deserializes a simple object graph using `BinaryFormatter`.
* Analyzes the events that have been raised.

```csharp
﻿using System;
using System.Diagnostics.Tracing;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace BinaryFormatterEventSample
{
    class Program
    {
        static EventListener? _globalListener = null;

        static void Main(string[] args)
        {
            // First, set up the event listener.
            // Note: We assign it to a static field so that it doesn't get GCed.
            // We also provide a callback that subscribes this listener to all
            // events produced by the well-known BinaryFormatter source.

            _globalListener = new ConsoleEventListener();
            _globalListener.EventSourceCreated += (sender, args) =>
            {
                if (args.EventSource?.Name ==
                    "System.Runtime.Serialization.Formatters.Binary.BinaryFormatterEventSource")
                {
                    ((EventListener?)sender)?
                        .EnableEvents(args.EventSource, EventLevel.LogAlways);
                }
            };

            // Next, create the Person object and serialize it.

            Person originalPerson = new Person()
            {
                FirstName = "Logan",
                LastName = "Edwards",
                FavoriteBook = new Book()
                {
                    Title = "A Tale of Two Cities",
                    Author = "Charles Dickens",
                    Price = 10.25m
                }
            };

            byte[] serializedPerson = SerializePerson(originalPerson);

            // Finally, deserialize the Person object.

            Person rehydratedPerson = DeserializePerson(serializedPerson);

            Console.WriteLine
                ($"Rehydrated person {rehydratedPerson.FirstName} {rehydratedPerson.LastName}");
            Console.Write
                ($"Favorite book: {rehydratedPerson.FavoriteBook?.Title} ");
            Console.Write
                ($"by {rehydratedPerson.FavoriteBook?.Author}, ");
            Console.WriteLine
                ($"list price {rehydratedPerson.FavoriteBook?.Price}");
        }

        private static byte[] SerializePerson(Person p)
        {
            MemoryStream memStream = new MemoryStream();
#pragma warning disable SYSLIB0011 // BinaryFormatter is obsolete
            BinaryFormatter formatter = new BinaryFormatter();
            formatter.Serialize(memStream, p);
#pragma warning restore SYSLIB0011

            return memStream.ToArray();
        }

        private static Person DeserializePerson(byte[] serializedData)
        {
            MemoryStream memStream = new MemoryStream(serializedData);
#pragma warning disable SYSLIB0011 // BinaryFormatter is obsolete
            BinaryFormatter formatter = new BinaryFormatter();

            return (Person)formatter.Deserialize(memStream);
#pragma warning restore SYSLIB0011
        }
    }

    [Serializable]
    public class Person
    {
        public string? FirstName;
        public string? LastName;
        public Book? FavoriteBook;
    }

    [Serializable]
    public class Book
    {
        public string? Title;
        public string? Author;
        public decimal? Price;
    }

    // A sample EventListener that writes data to System.Console.
    public class ConsoleEventListener : EventListener
    {
        protected override void OnEventWritten(EventWrittenEventArgs eventData)
        {
            base.OnEventWritten(eventData);

            Console.WriteLine($"Event {eventData.EventName} (id={eventData.EventId}) received.");
            if (eventData.PayloadNames != null)
            {
                for (int i = 0; i < eventData.PayloadNames.Count; i++)
                {
                    Console.WriteLine($"{eventData.PayloadNames[i]} = {eventData.Payload?[i]}");
                }
            }
        }
    }
}
```
The preceding code produces output similar to the following example:

```output
Event SerializationStart (id=10) received.
Event SerializingObject (id=12) received.
typeName = BinaryFormatterEventSample.Person, BinaryFormatterEventSample, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
Event SerializingObject (id=12) received.
typeName = BinaryFormatterEventSample.Book, BinaryFormatterEventSample, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
Event SerializationStop (id=11) received.
Event DeserializationStart (id=20) received.
Event DeserializingObject (id=22) received.
typeName = BinaryFormatterEventSample.Person, BinaryFormatterEventSample, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
Event DeserializingObject (id=22) received.
typeName = BinaryFormatterEventSample.Book, BinaryFormatterEventSample, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
Event DeserializationStop (id=21) received.
Rehydrated person Logan Edwards
Favorite book: A Tale of Two Cities by Charles Dickens, list price 10.25
```

In this sample, the console-based `EventListener` logs that serialization starts, instances of `Person` and `Book` are serialized, and then serialization completes. Similarly, once deserialization has started, instances of `Person` and `Book` are deserialized, and then deserialization completes.

The app then prints the values contained in the deserialized `Person` to demonstrate that the object did in fact serialize and deserialize properly.

## See also

For more information on using `EventListener` to receive `EventSource`-based notifications, see the `EventListener` class.
