---
title: "EventId struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/EventId.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventId struct

Namespace: `Microsoft.Extensions.Logging`

```csharp
public readonly struct EventId : IEquatable<Microsoft.Extensions.Logging.EventId>
```

Identifies a logging event. The primary identifier is the "Id" property, with the "Name" property providing a short description of this type of event.

To be added.

## EventId.EventId(Int32, String) constructor

```csharp
public EventId (int id, string? name = default);
```

Initializes an instance of the `EventId` struct.

Parameters:

- `id`: The numeric identifier for this event.
- `name`: The name of this event.

To be added.

## EventId.Id property

```csharp
public int Id { get; }
```

Gets the numeric identifier for this event.

Returns: To be added.

To be added.

## EventId.Name property

```csharp
public string? Name { get; }
```

Gets the name of this event.

Returns: To be added.

To be added.

## EventId.Equals(EventId) method

```csharp
public bool Equals (Microsoft.Extensions.Logging.EventId other);
```

Compares the current instance to another object of the same type. Two events are equal if they have the same ID.

Parameters:

- `other`: An object to compare with this object.

Returns: `true` if the current object is equal to `other`; otherwise, `false`.

To be added.

## EventId.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: ```csharp
true
```
if 
```csharp
obj
```
and this instance are the same type and represent the same value; otherwise,
```csharp
false
```
.

To be added.

## EventId.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer that is the hash code for this instance.

To be added.

## EventId.op_Equality(EventId, EventId) method

```csharp
public static bool operator == (Microsoft.Extensions.Logging.EventId left, Microsoft.Extensions.Logging.EventId right);
```

Checks if two specified `EventId` instances have the same value. They are equal if they have the same ID.

Parameters:

- `left`: The first `EventId`.
- `right`: The second `EventId`.

Returns: `true` if the objects are equal.

To be added.

## EventId.op_Implicit(Int32) method

```csharp
public static implicit operator Microsoft.Extensions.Logging.EventId (int i);
```

Implicitly creates an EventId from the given `Int32`.

Parameters:

- `i`: The `Int32` to convert to an EventId.

Returns: To be added.

To be added.

## EventId.op_Inequality(EventId, EventId) method

```csharp
public static bool operator != (Microsoft.Extensions.Logging.EventId left, Microsoft.Extensions.Logging.EventId right);
```

Checks if two specified `EventId` instances have different values.

Parameters:

- `left`: The first `EventId`.
- `right`: The second `EventId`.

Returns: `true` if the objects are not equal.

To be added.

## EventId.ToString() method

```csharp
public override string ToString ();
```

Returns the fully qualified type name of this instance.

Returns: The fully qualified type name.

To be added.
