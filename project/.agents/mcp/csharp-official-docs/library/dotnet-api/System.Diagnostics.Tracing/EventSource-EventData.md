---
title: "EventSource+EventData struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource+EventData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource+EventData struct

Namespace: `System.Diagnostics.Tracing`

```csharp
protected internal struct EventSource.EventData
```

Provides the event data for creating fast `WriteEvent` overloads by using the `EventSource.WriteEventCore` method.

#### Remarks
The following example shows how to use the `EventData` structure.

```csharp
  
[NonEvent]  
public unsafe void WriteEvent(int eventId, int arg1, int arg2, int arg3, int arg4) {  
    EventData* dataDesc = stackalloc EventSource.EventData[4];  
  
    dataDesc[0].DataPointer = (IntPtr)(&arg1);  
    dataDesc[0].Size = 4;  
    dataDesc[1].DataPointer = (IntPtr)(&arg2);  
    dataDesc[1].Size = 4;  
    dataDesc[2].DataPointer = (IntPtr)(&arg3);  
    dataDesc[2].Size = 4;  
    dataDesc[3].DataPointer = (IntPtr)(&arg4);  
    dataDesc[3].Size = 4;  
  
    WriteEventCore(eventId, 4, (IntPtr)dataDesc);  
}  
  
```

## EventSource+EventData.DataPointer property

```csharp
public IntPtr DataPointer { get; set; }
```

Gets or sets the pointer to the data for the new `WriteEvent` overload.

Returns: The pointer to the data.

To be added.

## EventSource+EventData.Size property

```csharp
public int Size { get; set; }
```

Gets or sets the number of payload items in the new `WriteEvent` overload.

Returns: The number of payload items in the new overload.

To be added.
