---
title: "ContextBoundObject class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ContextBoundObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContextBoundObject class

Namespace: `System`

```csharp
public abstract class ContextBoundObject : MarshalByRefObject
```

Defines the base class for all context-bound classes.

#### Remarks
Objects that reside in a context and are bound to the context rules are called context-bound objects. A context is a set of properties or usage rules that define an environment where a collection of objects resides. The rules are enforced when the objects are entering or leaving a context. Objects that are not context-bound are called agile objects.

Contexts are created during object activation. A new object is placed into an existing context or into a new context created using the attributes included in the metadata of the type. Context-bound classes are marked with a `ContextAttribute` that provides the usage rules. The context properties that can be added include policies regarding synchronization and transactions.

## ContextBoundObject.ContextBoundObject() constructor

```csharp
protected ContextBoundObject ();
```

Instantiates an instance of the `ContextBoundObject` class.

To be added.
