---
title: "ActivityKind enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityKind.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityKind enum

Namespace: `System.Diagnostics`

```csharp
public enum ActivityKind
```

Describes the relationship between the activity, its parents and its children in a trace.

To be added.

## ActivityKind.Client field

```csharp
Client
```

Outgoing request to the external component.

## ActivityKind.Consumer field

```csharp
Consumer
```

Output received from an external component.

## ActivityKind.Internal field

```csharp
Internal
```

Internal operation within an application, as opposed to operations with remote parents or children. This is the default value.

## ActivityKind.Producer field

```csharp
Producer
```

Output provided to external components.

## ActivityKind.Server field

```csharp
Server
```

Requests incoming from external component.
