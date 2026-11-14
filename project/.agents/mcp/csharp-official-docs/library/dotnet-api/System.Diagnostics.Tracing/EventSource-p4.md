---
title: "EventSource class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource class (part 4 of 5)

## EventSource.WriteEvent(Int32, String, Int32) method

```csharp
protected void WriteEvent (int eventId, string? arg1, int arg2);
```

Writes an event by using the provided event identifier and arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.
- `arg2`: A 32 bit integer argument.

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

## EventSource.WriteEvent(Int32, String, Int64) method

```csharp
protected void WriteEvent (int eventId, string? arg1, long arg2);
```

Writes an event by using the provided event identifier and arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.
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

## EventSource.WriteEvent(Int32, String, String) method

```csharp
protected void WriteEvent (int eventId, string? arg1, string? arg2);
```

Writes an event by using the provided event identifier and string arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.
- `arg2`: A string argument.

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

## EventSource.WriteEvent(Int32, Int32, Int32, Int32) method

```csharp
protected void WriteEvent (int eventId, int arg1, int arg2, int arg3);
```

Writes an event by using the provided event identifier and 32-bit integer arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: An integer argument.
- `arg2`: An integer argument.
- `arg3`: An integer argument.

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

## EventSource.WriteEvent(Int32, Int64, Int64, Int64) method

```csharp
protected void WriteEvent (int eventId, long arg1, long arg2, long arg3);
```

Writes an event by using the provided event identifier and 64-bit arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A 64 bit integer argument.
- `arg2`: A 64 bit integer argument.
- `arg3`: A 64 bit integer argument.

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

## EventSource.WriteEvent(Int32, String, Int32, Int32) method

```csharp
protected void WriteEvent (int eventId, string? arg1, int arg2, int arg3);
```

Writes an event by using the provided event identifier and arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.
- `arg2`: A 32 bit integer argument.
- `arg3`: A 32 bit integer argument.

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

## EventSource.WriteEvent(Int32, String, String, String) method

```csharp
protected void WriteEvent (int eventId, string? arg1, string? arg2, string? arg3);
```

Writes an event by using the provided event identifier and string arguments.

Parameters:

- `eventId`: The event identifier. This value should be between 0 and 65535.
- `arg1`: A string argument.
- `arg2`: A string argument.
- `arg3`: A string argument.

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

## EventSource.WriteEventCore(Int32, Int32, EventSource+EventData*) method

```csharp
protected void WriteEventCore (int eventId, int eventDataCount, System.Diagnostics.Tracing.EventSource.EventData* data);
```

Creates a new `WriteEvent` overload by using the provided event identifier and event data.

Parameters:

- `eventId`: The event identifier.
- `eventDataCount`: The number of event data items.
- `data`: The structure that contains the event data.

#### Remarks
`eventid` should be greater than 0 or less than 65535 or errors can occur in the operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

This protected method enables users to define new `EventSource.WriteEvent` overloads that are faster than the provided overloads. Creating a new overload involves unsafe code. The basic <example-value> is to stack-allocate an array of event data descriptors that matches the number of payload items. For each payload item, set the correct size and value in the event data array.Call `EventSource.WriteEventCore` with the initialized array.

The following example shows how to add a `EventSource.WriteEvent` overload that accepts four arguments. An example would be if you have a logging event that logs a string and 3 integers.

```csharp
[Event(1)]
public void LogTime(string tag, int hour, int minute, int second)
{
    WriteEvent(1, tag, hour, minute, second);
}
```

You could do this without calling `EventSource.WriteEventCore`, but it would be slower than it needs to be. That is because it uses arrays and reflection to figure out what to do. If you log these at a high rate (> 1000 / sec), it can be worth making a fast helper, as shown in the following example. The method shadows the existing `EventSource.WriteEvent`. Thus the original caller code (LogTime) does not actually change, but the C# compiler will use the more specialized version which will be faster.

To compile unsafe code, you must specify the /unsafe (C# Compiler Options) compiler option.

```csharp
class AnotherEventSource : EventSource {

    [NonEvent]
    public unsafe void WriteEvent(int eventId, string arg1, int arg2, int arg3, int arg4)
    {

        fixed (char* arg1Ptr = arg1)
        {
            EventData* dataDesc = stackalloc EventData[4];

            dataDesc[0].DataPointer = (IntPtr)arg1Ptr;
            dataDesc[0].Size = (arg1.Length + 1) * 2; // Size in bytes, including a null terminator.
            dataDesc[1].DataPointer = (IntPtr)(&arg2);
            dataDesc[1].Size = 4;
            dataDesc[2].DataPointer = (IntPtr)(&arg3);
            dataDesc[2].Size = 4;
            dataDesc[3].DataPointer = (IntPtr)(&arg4);
            dataDesc[3].Size = 4;

            WriteEventCore(eventId, 4, dataDesc);
        }
    }
}
```

These are the expected sizes and data encodings for standard serializable types:

```csharp
// bool arg
int temp = arg ? 1 : 0;
desc.DataPointer = (IntPtr)(&temp);
desc.Size = 4;

// byte arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 1;

// sbyte arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 1;

// char arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 2;

// short arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 2;

// ushort arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 2;

// int arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 4;

// uint arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 4;

// long arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 8;

// ulong arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 8;

// float arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 4;

// double arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 8;

// decimal arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 16;

// Guid arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = 16;

// IntPtr arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = IntPtr.Size;

// UIntPtr arg
desc.DataPointer = (IntPtr)(&arg);
desc.Size = UIntPtr.Size;

// DateTime arg
long fileTime = arg.ToUniversalTime() > new DateTime(1601, 1, 1) ? arg.ToFileTimeUtc() : 0;
desc.DataPointer = (IntPtr)(&fileTime);
desc.Size = 8;

// string arg
fixed(char* ptr = arg)
{
    desc.DataPointer = (IntPtr)ptr;
    // strings use 2 byte per char UTF16 encoding and a null terminator at the end
    // only strings without embedded null characters are supported
    desc.Size = (arg.Length + 1) * 2;
}

// byte[] arg
// This one is encoded using two adjacent EventData elements.
fixed(byte* ptr = arg)
{
    int length = arg.Length;
    desc[i].DataPointer = (IntPtr)(&length);
    desc[i].Size = 4;
    desc[i + 1].DataPointer = (IntPtr)ptr;
    desc[i + 1].Size = arg.Length;
}

// enums should be converted to their underlying type and then serialized
// as byte, short, or int.

```
