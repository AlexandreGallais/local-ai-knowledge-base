---
title: "Missing class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Missing.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Missing class

Namespace: `System.Reflection`

```csharp
public sealed class Missing : System.Runtime.Serialization.ISerializable
```

Represents a missing `Object`. This class cannot be inherited.

#### Remarks
The              `Missing` class is used to invoke a method with a default argument, typically when using reflection.

Only one instance of `Missing`, which is returned by the `Value` field,  ever exists.

#### Examples
The following example shows how to use the `Missing` object to invoke a method with a default argument by using reflection.

_Code sample not included: ~/snippets/csharp/System.Reflection/Missing/Overview/Missing1.cs._

## Missing.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets a `SerializationInfo` object with the logical context information needed to recreate the sole instance of the `Missing` object.

Parameters:

- `info`: The `SerializationInfo` object to be populated with serialization information.
- `context`: The `StreamingContext` object representing the destination context of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Missing.Value field

```csharp
public static readonly System.Reflection.Missing Value;
```

Represents the sole instance of the `Missing` class.

#### Remarks
Use this instance of the `Missing` class to represent missing values, for example, when you invoke methods that have default parameter values. For a code example, see the `Missing` class.
