---
title: "ComEventsHelper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComEventsHelper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComEventsHelper class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class ComEventsHelper
```

Provides methods that enable .NET delegates that handle events to be added and removed from COM objects.

To be added.

## ComEventsHelper.Combine(Object, Guid, Int32, Delegate) method

```csharp
public static void Combine (object rcw, Guid iid, int dispid, Delegate d);
```

Adds a delegate to the invocation list of events originating from a COM object.

Parameters:

- `rcw`: The COM object that triggers the events the caller would like to respond to.
- `iid`: The identifier of the source interface used by the COM object to trigger events.
- `dispid`: The dispatch identifier of the method on the source interface.
- `d`: The delegate to invoke when the COM event is fired.

To be added.

## ComEventsHelper.Remove(Object, Guid, Int32, Delegate) method

```csharp
public static Delegate? Remove (object rcw, Guid iid, int dispid, Delegate d);
```

Removes a delegate from the invocation list of events originating from a COM object.

Parameters:

- `rcw`: The COM object the delegate is attached to.
- `iid`: The identifier of the source interface used by the COM object to trigger events.
- `dispid`: The dispatch identifier of the method on the source interface.
- `d`: The delegate to remove from the invocation list.

Returns: The delegate that was removed from the invocation list.

To be added.
