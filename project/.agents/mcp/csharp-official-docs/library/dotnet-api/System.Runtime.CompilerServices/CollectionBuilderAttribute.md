---
title: "CollectionBuilderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CollectionBuilderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionBuilderAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CollectionBuilderAttribute : Attribute
```

To be added.

To be added.

## CollectionBuilderAttribute.CollectionBuilderAttribute(Type, String) constructor

```csharp
public CollectionBuilderAttribute (Type builderType, string methodName);
```

Initializes a new instance of `CollectionBuilderAttribute` that refers to the `methodName` method on the `builderType` type.

Parameters:

- `builderType`: The type of the builder to use to construct the collection.
- `methodName`: The name of the method on the builder to use to construct the collection.

`methodName` must refer to a static method that accepts a single parameter of type `ReadOnlySpan<T>` and returns an instance of the collection being built containing a copy of the data from that span.  In future releases of .NET, additional patterns may be supported.

## CollectionBuilderAttribute.BuilderType property

```csharp
public Type BuilderType { get; }
```

Gets the type of the builder to use to construct the collection.

Returns: To be added.

To be added.

## CollectionBuilderAttribute.MethodName property

```csharp
public string MethodName { get; }
```

Gets the name of the method on the builder to use to construct the collection.

Returns: To be added.

This should match the metadata name of the target method. For example, this might be ".ctor" if targeting the type's constructor.
