---
title: "EventHandlerList class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EventHandlerList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventHandlerList class

Namespace: `System.ComponentModel`

```csharp
public sealed class EventHandlerList : IDisposable
```

Provides a simple list of delegates. This class cannot be inherited.

#### Remarks
This class uses a linear search algorithm to find entries in the list of delegates. A linear search algorithm is inefficient when working with a large number of entries. Therefore, when you have a large list, finding entries is slow.

#### Examples
For an example of using an `EventHandlerList`, see How to: Handle Multiple Events Using Event Properties.

## EventHandlerList.EventHandlerList() constructor

```csharp
public EventHandlerList ();
```

Initializes a new instance of the `EventHandlerList` class.

To be added.

## EventHandlerList.Item property

```csharp
public Delegate? this[object key] { get; set; }
```

Gets or sets the delegate for the specified object.

Parameters:

- `key`: An object to find in the list.

Returns: The delegate for the specified key, or `null` if a delegate does not exist.

#### Remarks
When the key is not found in the list and you provide a delegate to set the value of the key, then the key is added to the top of the list and assigned to the delegate as its value.

## EventHandlerList.AddHandler(Object, Delegate) method

```csharp
public void AddHandler (object key, Delegate? value);
```

Adds a delegate to the list.

Parameters:

- `key`: The object that owns the event.
- `value`: The delegate to add to the list.

To be added.

## EventHandlerList.AddHandlers(EventHandlerList) method

```csharp
public void AddHandlers (System.ComponentModel.EventHandlerList listToAddFrom);
```

Adds a list of delegates to the current list.

Parameters:

- `listToAddFrom`: The list to add.

To be added.

## EventHandlerList.Dispose() method

```csharp
public void Dispose ();
```

Disposes the delegate list.

#### Remarks
Call `EventHandlerList.Dispose` when you are finished using the `EventHandlerList`. The `EventHandlerList.Dispose` method leaves the `EventHandlerList` in an unusable state. After calling `EventHandlerList.Dispose`, you must release all references to the `EventHandlerList` so the memory it was occupying can be reclaimed by garbage collection.

> **Note:**
>  Always call `EventHandlerList.Dispose` before you release your last reference to the `EventHandlerList`. Otherwise, the resources the `EventHandlerList` is using will not be freed until garbage collection calls the `EventHandlerList` object's destructor.

## EventHandlerList.RemoveHandler(Object, Delegate) method

```csharp
public void RemoveHandler (object key, Delegate? value);
```

Removes a delegate from the list.

Parameters:

- `key`: The object that owns the event.
- `value`: The delegate to remove from the list.

To be added.
