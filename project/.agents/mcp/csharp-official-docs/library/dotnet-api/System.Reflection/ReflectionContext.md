---
title: "ReflectionContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ReflectionContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReflectionContext class

Namespace: `System.Reflection`

```csharp
public abstract class ReflectionContext
```

Represents a context that can provide reflection objects.

#### Remarks
The purpose of this class is to provide a way for reflection code to be made aware when reflection objects originate in a context other than the default reflection context, so that operations on those objects can use that context. For example, reflection objects that originate with a `CustomReflectionContext` object should be compared only with reflection objects that have the same origin. For more information, see the `CustomReflectionContext` reference page.

## ReflectionContext.ReflectionContext() constructor

```csharp
protected ReflectionContext ();
```

Initializes a new instance of the `ReflectionContext` class.

To be added.

## ReflectionContext.GetTypeForObject(Object) method

```csharp
public virtual System.Reflection.TypeInfo GetTypeForObject (object value);
```

Gets the representation of the type of the specified object in this reflection context.

Parameters:

- `value`: The object to represent.

Returns: An object that represents the type of the specified object.

To be added.

## ReflectionContext.MapAssembly(Assembly) method

```csharp
public abstract System.Reflection.Assembly MapAssembly (System.Reflection.Assembly assembly);
```

Gets the representation, in this reflection context, of an assembly that is represented by an object from another reflection context.

Parameters:

- `assembly`: The external representation of the assembly to represent in this context.

Returns: The representation of the assembly in this reflection context.

To be added.

## ReflectionContext.MapType(TypeInfo) method

```csharp
public abstract System.Reflection.TypeInfo MapType (System.Reflection.TypeInfo type);
```

Gets the representation, in this reflection context, of a type represented by an object from another reflection context.

Parameters:

- `type`: The external representation of the type to represent in this context.

Returns: The representation of the type in this reflection context.

To be added.
