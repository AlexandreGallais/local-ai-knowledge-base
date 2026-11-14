---
title: "ICloneable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ICloneable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICloneable interface

Namespace: `System`

```csharp
public interface ICloneable
```

Supports cloning, which creates a new instance of a class with the same value as an existing instance.

#### Remarks
The `ICloneable` interface enables you to provide a customized implementation that creates a copy of an existing object. The `ICloneable` interface contains one member, the `ICloneable.Clone` method, which is intended to provide cloning support beyond that supplied by `Object.MemberwiseClone`.  For more information about cloning, deep versus shallow copies, and examples, see the `Object.MemberwiseClone` method.

## ICloneable.Clone() method

```csharp
public object Clone ();
```

Creates a new object that is a copy of the current instance.

Returns: A new object that is a copy of this instance.

#### Remarks
The resulting clone must be of the same type as, or compatible with, the original instance.

An implementation of `ICloneable.Clone` can perform either a deep copy or a shallow copy. In a deep copy, all objects are duplicated; in a shallow copy, only the top-level objects are duplicated and the lower levels contain references. Because callers of `ICloneable.Clone` cannot depend on the method performing a predictable cloning operation, we recommend that `ICloneable` not be implemented in public APIs.

See `Object.MemberwiseClone` for more information on cloning, deep versus shallow copies, and examples.
