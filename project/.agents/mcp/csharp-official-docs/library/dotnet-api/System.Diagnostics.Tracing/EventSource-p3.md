---
title: "EventSource class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource class (part 3 of 5)

## EventSource.WriteEvent(Int32) method

```csharp
protected void WriteEvent (int eventId);
```

Writes an event by using the provided event identifier.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(string arg1)
{
    base.WriteEvent(2, arg1);
}
```

#### Examples

The following example shows how to use this method overload to write an event. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventSource.WriteEvent(Int32, Byte[]) method

```csharp
protected void WriteEvent (int eventId, byte[]? arg1);
```

Writes an event by using the provided event identifier and byte array argument.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A byte array argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(byte[] arg1)
{
    base.WriteEvent(2, arg1);
}
```

## EventSource.WriteEvent(Int32, EventSource+EventSourcePrimitive[]) method

```csharp
protected void WriteEvent (int eventId, params System.Diagnostics.Tracing.EventSource.EventSourcePrimitive[] args);
```

Writes an event by using the provided event identifier and a variable number of event source primitives.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `args`: The event source primitives.

This is a varargs helper for writing an event. It does create an array and box all the arguments so it is relatively inefficient and should only be used for relatively rare events (for example, less than 100 per second). If your rates are faster than that, use `EventSource.WriteEventCore` to create fast helpers for your particular method signature. Even if you use this for rare events, this call should be guarded by an `EventSource.IsEnabled` check so that the varargs call is not made when the EventSource isn't active.

## EventSource.WriteEvent(Int32, Int32) method

```csharp
protected void WriteEvent (int eventId, int arg1);
```

Writes an event by using the provided event identifier and 32-bit integer argument.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: An integer argument.

`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(int  arg1)
{
    base.WriteEvent(2, arg1);
}
```

#### Examples

The following example shows how to use this method overload to write an event. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventSource.WriteEvent(Int32, Int64) method

```csharp
protected void WriteEvent (int eventId, long arg1);
```

Writes an event by using the provided event identifier and 64-bit integer argument.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 64 bit integer argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(string arg1)
{
    base.WriteEvent(2, arg1);
}
```

## EventSource.WriteEvent(Int32, Object[]) method

```csharp
protected void WriteEvent (int eventId, params object?[] args);
```

Writes an event by using the provided event identifier and array of arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `args`: An array of objects.

#### Remarks
By default, the compiler calls this overload if the parameters for the call do not match one of the other method overloads. This overload is much slower than the other overloads, because it does the following:

1. It allocates an array to hold the variable argument.

2. It casts each parameter to an object (which causes allocations for primitive types).

3. It assigns these objects to the array.

4. It calls the function, which then determines the type of each argument so it can be serialized for ETW.

The high overhead for this overload is not significant when tracing low-volume events, because the method is used only when the provider is enabled. However, for high-volume events, the performance overhead can be significant. You can avoid using `EventSource.WriteEvent` for high-volume payloads by creating a new, faster  overload with the `EventSource.WriteEventCore` method.

`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(string arg1)
{
    base.WriteEvent(2, arg1);
}
```

## EventSource.WriteEvent(Int32, String) method

```csharp
protected void WriteEvent (int eventId, string? arg1);
```

Writes an event by using the provided event identifier and string argument.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(string arg1)
{
    base.WriteEvent(2, arg1);
}
```

#### Examples

The following example shows how to use this method overload to write an event. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventSource.WriteEvent(Int32, Int32, Int32) method

```csharp
protected void WriteEvent (int eventId, int arg1, int arg2);
```

Writes an event by using the provided event identifier and 32-bit integer arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: An integer argument.
- `arg2`: An integer argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(int arg1, int arg2, int arg3)
{
    base.WriteEvent(2, arg1);
}
```

## EventSource.WriteEvent(Int32, Int32, String) method

```csharp
protected void WriteEvent (int eventId, int arg1, string? arg2);
```

Writes an event by using the provided event identifier and 32-bit integer and string arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 32-bit integer argument.
- `arg2`: A string argument.

To be added.

## EventSource.WriteEvent(Int32, Int64, Byte[]) method

```csharp
protected void WriteEvent (int eventId, long arg1, byte[]? arg2);
```

Writes the event data using the specified identifier and 64-bit integer and byte array arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 64-bit integer argument.
- `arg2`: A byte array argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(Int64 arg1, Byte[] arg2)
{
    base.WriteEvent(2, arg1, arg2);
}
```

## EventSource.WriteEvent(Int32, Int64, Int64) method

```csharp
protected void WriteEvent (int eventId, long arg1, long arg2);
```

Writes an event by using the provided event identifier and 64-bit arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 64 bit integer argument.
- `arg2`: A 64 bit integer argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that is identified as an ETW event in an `EventSource`-derived class. You must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(string arg1)
{
    base.WriteEvent(2, arg1);
}
```

## EventSource.WriteEvent(Int32, Int64, String) method

```csharp
protected void WriteEvent (int eventId, long arg1, string? arg2);
```

Writes an event by using the provided event identifier and 64-bit integer, and string arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 64-bit integer argument.
- `arg2`: A string argument.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

When you implement a method that's identified as an ETW event in an `EventSource`-derived class, you must call the base class `EventSource.WriteEvent` method passing the `EventAttribute.EventId` and the same arguments as the implemented method similar to the following example.

```csharp
[Event(2, Level = EventLevel.Informational)]
public void Info1(Int64 arg1, string arg2)
{
    base.WriteEvent(2, arg1, arg2);
}
```
