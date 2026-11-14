---
title: "XmlDeserializationEvents struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlDeserializationEvents.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDeserializationEvents struct

Namespace: `System.Xml.Serialization`

```csharp
public struct XmlDeserializationEvents
```

Contains fields that can be used to pass event delegates to a thread-safe `Deserialize` method of the `XmlSerializer`.

To be added.

## XmlDeserializationEvents.OnUnknownAttribute property

```csharp
public System.Xml.Serialization.XmlAttributeEventHandler? OnUnknownAttribute { get; set; }
```

Gets or sets an object that represents the method that handles the `XmlSerializer.UnknownAttribute` event.

Returns: An `XmlAttributeEventHandler` that points to the event handler.

To be added.

## XmlDeserializationEvents.OnUnknownElement property

```csharp
public System.Xml.Serialization.XmlElementEventHandler? OnUnknownElement { get; set; }
```

Gets or sets an object that represents the method that handles the `XmlSerializer.UnknownElement` event.

Returns: An `XmlElementEventHandler` that points to the event handler.

To be added.

## XmlDeserializationEvents.OnUnknownNode property

```csharp
public System.Xml.Serialization.XmlNodeEventHandler? OnUnknownNode { get; set; }
```

Gets or sets an object that represents the method that handles the `XmlSerializer.UnknownNode` event.

Returns: An `XmlNodeEventHandler` that points to the event handler.

To be added.

## XmlDeserializationEvents.OnUnreferencedObject property

```csharp
public System.Xml.Serialization.UnreferencedObjectEventHandler? OnUnreferencedObject { get; set; }
```

Gets or sets an object that represents the method that handles the `XmlSerializer.UnreferencedObject` event.

Returns: An `UnreferencedObjectEventHandler` that points to the event handler.

To be added.
