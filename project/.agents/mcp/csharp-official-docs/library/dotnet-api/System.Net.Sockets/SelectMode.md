---
title: "SelectMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SelectMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SelectMode enum

Namespace: `System.Net.Sockets`

```csharp
public enum SelectMode
```

Defines the polling modes for the `Socket.Poll` method.

#### Remarks
The `SelectMode` enumeration defines the polling modes that can be passed to the `Socket.Poll` method. Use the SelectRead value to determine if a listening `Socket` has incoming connection requests. Use the SelectWrite value to determine if a `Socket` is writeable. Use the SelectError value to determine if there is an error condition present on the `Socket`. For explanations of writeability, readability, and the presence of error conditions, see the `Socket.Poll` method.

#### Examples
The following example checks the status of a `Socket` using all three `SelectMode` enumeration values. A call to `Socket.Poll` using the SelectWrite enumerated value should return `true`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SelectMode/Overview/source.cs._

## SelectMode.SelectError field

```csharp
SelectError
```

Error status mode.

## SelectMode.SelectRead field

```csharp
SelectRead
```

Read status mode.

## SelectMode.SelectWrite field

```csharp
SelectWrite
```

Write status mode.
