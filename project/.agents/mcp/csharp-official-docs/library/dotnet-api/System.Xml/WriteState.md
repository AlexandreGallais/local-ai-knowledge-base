---
title: "WriteState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/WriteState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WriteState enum

Namespace: `System.Xml`

```csharp
public enum WriteState
```

Specifies the state of the `XmlWriter`.

To be added.

## WriteState.Attribute field

```csharp
Attribute
```

Indicates that an attribute value is being written.

## WriteState.Closed field

```csharp
Closed
```

Indicates that the `XmlWriter.Close` method has been called.

## WriteState.Content field

```csharp
Content
```

Indicates that element content is being written.

## WriteState.Element field

```csharp
Element
```

Indicates that an element start tag is being written.

## WriteState.Error field

```csharp
Error
```

An exception has been thrown, which has left the `XmlWriter` in an invalid state. You can call the `XmlWriter.Close` method to put the `XmlWriter` in the `WriteState.Closed` state. Any other `XmlWriter` method calls results in an `InvalidOperationException`.

## WriteState.Prolog field

```csharp
Prolog
```

Indicates that the prolog is being written.

## WriteState.Start field

```csharp
Start
```

Indicates that a Write method has not yet been called.
