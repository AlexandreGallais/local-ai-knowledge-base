---
title: "Generic Collections in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/generics/collections.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generic collections in .NET

 The .NET class library provides a number of generic collection classes in the `System.Collections.Generic` and `System.Collections.ObjectModel` namespaces. For more detailed information about these classes, see Commonly Used Collection Types.

## System.Collections.Generic

 Many of the generic collection types are direct analogs of nongeneric types. `System.Collections.Generic.Dictionary`2` is a generic version of `System.Collections.Hashtable`; it uses the generic structure `System.Collections.Generic.KeyValuePair`2` for enumeration instead of `System.Collections.DictionaryEntry`.

 `System.Collections.Generic.List`1` is a generic version of `System.Collections.ArrayList`. There are generic `System.Collections.Generic.Queue`1` and `System.Collections.Generic.Stack`1` classes that correspond to the nongeneric versions.

 There are generic and nongeneric versions of `System.Collections.Generic.SortedList`2`. Both versions are hybrids of a dictionary and a list. The `System.Collections.Generic.SortedDictionary`2` generic class is a pure dictionary and has no nongeneric counterpart.

 The `System.Collections.Generic.LinkedList`1` generic class is a true linked list. It has no nongeneric counterpart.

## System.Collections.ObjectModel

 The `System.Collections.ObjectModel.Collection`1` generic class provides a base class for deriving your own generic collection types. The `System.Collections.ObjectModel.ReadOnlyCollection`1` class provides an easy way to produce a read-only collection from any type that implements the `System.Collections.Generic.IList`1` generic interface. The `System.Collections.ObjectModel.KeyedCollection`2` generic class provides a way to store objects that contain their own keys.

## Other generic types

 The `System.Nullable`1` generic structure allows you to use value types as if they could be assigned `null`. This can be useful when working with database queries, where fields that contain value types can be missing. The generic type parameter can be any value type.

> **Note:**
> In C# and Visual Basic, it is not necessary to use `System.Nullable`1` explicitly because the language has syntax for nullable types. See Nullable value types (C# reference) and Nullable value types (Visual Basic).

 The `System.ArraySegment`1` generic structure provides a way to delimit a range of elements within a one-dimensional, zero-based array of any type. The generic type parameter is the type of the array's elements.

 The `System.EventHandler`1` generic delegate eliminates the need to declare a delegate type to handle events, if your event follows the event-handling pattern used by .NET. For example, suppose you have created a `MyEventArgs` class, derived from `System.EventArgs`, to hold the data for your event. You can then declare the event as follows:
 ```csharp
using System;

public class MyEventArgs : EventArgs
{
    private string msg;

    public MyEventArgs(string messageArg)
    {
        msg = messageArg;
    }

    public string Message
    {
        get {return msg;}
    }
}

class Dummy
{
    public event EventHandler<MyEventArgs> MyEvent;

    public static void Main()
    {
        Dummy dummo = new Dummy();

        dummo.DoEvent();
    }

    public void DoEvent()
    {
        MyEventArgs eArgs = new MyEventArgs("My Event Message");

        // MyEvent += new EventHandler<MyEventArgs>(MyEventHandler);
        //    or ...
        MyEvent += MyEventHandler;
        MyEvent(this, eArgs);
    }

    private void MyEventHandler(object sender, MyEventArgs eArgs)
    {
        Console.WriteLine(eArgs.Message);
    }
}
```

## See also

- `System.Collections.Generic`
- `System.Collections.ObjectModel`
- Generics
- Generic Delegates for Manipulating Arrays and Lists
- Generic Interfaces
