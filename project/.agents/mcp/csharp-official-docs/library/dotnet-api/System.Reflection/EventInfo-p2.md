---
title: "EventInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/EventInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventInfo class (part 2 of 2)

## EventInfo.GetRaiseMethod(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo? GetRaiseMethod (bool nonPublic);
```

When overridden in a derived class, returns the method that is called when the event is raised, specifying whether to return non-public methods.

Parameters:

- `nonPublic`: `true` if non-public methods can be returned; otherwise, `false`.

Returns: A `MethodInfo` object that was called when the event was raised.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true`, the method used to add an event handler delegate is non-public, and the caller does not have permission to reflect on non-public methods.

#### Remarks
This method usually returns `null` for events declared with the C# `event` keyword or the Visual Basic `Event` keyword. This is because the C# and Visual Basic <example-value> do not generate such a method by default.

## EventInfo.GetRemoveMethod() method

```csharp
public System.Reflection.MethodInfo? GetRemoveMethod ();
```

Returns the method used to remove an event handler delegate from the event source.

Returns: A `MethodInfo` object representing the method used to remove an event handler delegate from the event source.

#### Examples
Typically, the method has the following signature:

```csharp
remove_<EventName>(<EventHandlerType> handler)
```

## EventInfo.GetRemoveMethod(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo? GetRemoveMethod (bool nonPublic);
```

When overridden in a derived class, retrieves the `MethodInfo` object for removing a method of the event, specifying whether to return non-public methods.

Parameters:

- `nonPublic`: `true` if non-public methods can be returned; otherwise, `false`.

Returns: A `MethodInfo` object representing the method used to remove an event handler delegate from the event source.

Exceptions:

- `MethodAccessException`: `nonPublic` is `true`, the method used to add an event handler delegate is non-public, and the caller does not have permission to reflect on non-public methods.

#### Examples
Typically, the method has the following signature:

```csharp
remove_<EventName>(<EventHandlerType> handler)
```

## EventInfo.op_Equality(EventInfo, EventInfo) method

```csharp
public static bool operator == (System.Reflection.EventInfo? left, System.Reflection.EventInfo? right);
```

Indicates whether two `EventInfo` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## EventInfo.op_Inequality(EventInfo, EventInfo) method

```csharp
public static bool operator != (System.Reflection.EventInfo? left, System.Reflection.EventInfo? right);
```

Indicates whether two `EventInfo` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## EventInfo.RemoveEventHandler(Object, Delegate) method

```csharp
public virtual void RemoveEventHandler (object? target, Delegate? handler);
```

Removes an event handler from an event source.

Parameters:

- `target`: The event source.
- `handler`: The delegate to be disassociated from the events raised by target.

Exceptions:

- `InvalidOperationException`: The event does not have a public `remove` accessor.
- `ArgumentException`: The handler that was passed in cannot be used.
- `TargetException`: The `target` parameter is `null` and the event is not static.

-or-

The `EventInfo` is not declared on the target.
- `MethodAccessException`: The caller does not have access permission to the member.

#### Remarks
This method attempts to remove the delegate that may synchronize this event on the target object.

When an event is raised by target, the method or methods encapsulated by `handler` will no longer be invoked.
