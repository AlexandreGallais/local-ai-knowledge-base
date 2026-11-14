---
title: "Indexers in Interfaces"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/indexers/indexers-in-interfaces.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Indexers in Interfaces (C# Programming Guide)

Indexers can be declared on an interface. Accessors of interface indexers differ from the accessors of class indexers in the following ways:

- Interface accessors don't use modifiers.
- An interface accessor typically doesn't have a body.

The purpose of the accessor is to indicate whether the indexer is read-write, read-only, or write-only. You can provide an implementation for an indexer defined in an interface, but this is rare. Indexers typically define an API to access data fields, and data fields can't be defined in an interface.

The following is an example of an interface indexer accessor:

_Code sample not included: ~/samples/snippets/csharp/interfaces/indexers.cs._

The signature of an indexer must differ from the signatures of all other indexers declared in the same interface.

## Example

The following example shows how to implement interface indexers.

_Code sample not included: ~/samples/snippets/csharp/interfaces/indexers.cs._

_Code sample not included: ~/samples/snippets/csharp/interfaces/indexers.cs._

In the preceding example, you could use the explicit interface member implementation by using the fully qualified name of the interface member. For example

```csharp
string IIndexInterface.this[int index]
{
}
```

However, the fully qualified name is only needed to avoid ambiguity when the class is implementing more than one interface with the same indexer signature. For example, if an `Employee` class is implementing two interfaces, `ICitizen` and `IEmployee`, and both interfaces have the same indexer signature, the explicit interface member implementation is necessary. That is, the following indexer declaration:

```csharp
string IEmployee.this[int index]
{
}
```

Implements the indexer on the `IEmployee` interface, while the following declaration:

```csharp
string ICitizen.this[int index]
{
}
```

Implements the indexer on the `ICitizen` interface.

## See also

- Indexers
- Properties
- Interfaces
