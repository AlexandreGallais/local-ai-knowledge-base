---
title: "DynamicDependencyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/DynamicDependencyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicDependencyAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class DynamicDependencyAttribute : Attribute
```

States a dependency that one member has on another.

#### Remarks

This attribute can be used to inform tooling of a dependency that is otherwise not evident purely from metadata and IL, for example, a member relied on via reflection.

## DynamicDependencyAttribute.DynamicDependencyAttribute(String) constructor

```csharp
public DynamicDependencyAttribute (string memberSignature);
```

Initializes a new instance of the `DynamicDependencyAttribute` class with the specified signature of a member on the same type as the consumer.

Parameters:

- `memberSignature`: The signature of the member depended on.

To be added.

## DynamicDependencyAttribute.DynamicDependencyAttribute(DynamicallyAccessedMemberTypes, Type) constructor

```csharp
public DynamicDependencyAttribute (System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes, Type type);
```

Initializes a new instance of the `DynamicDependencyAttribute` class with the specified types of members on a `Type`.

Parameters:

- `memberTypes`: The types of members depended on.
- `type`: The type that contains the specified members.

To be added.

## DynamicDependencyAttribute.DynamicDependencyAttribute(String, Type) constructor

```csharp
public DynamicDependencyAttribute (string memberSignature, Type type);
```

Initializes a new instance of the `DynamicDependencyAttribute` class with the specified signature of a member on a `Type`.

Parameters:

- `memberSignature`: The signature of the member depended on.
- `type`: The type that contains `memberSignature`.

To be added.

## DynamicDependencyAttribute.DynamicDependencyAttribute(DynamicallyAccessedMemberTypes, String, String) constructor

```csharp
public DynamicDependencyAttribute (System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes, string typeName, string assemblyName);
```

Initializes a new instance of the `DynamicDependencyAttribute` class with the specified types of members on a type in an assembly.

Parameters:

- `memberTypes`: The types of members depended on.
- `typeName`: The full name of the type containing the specified members.
- `assemblyName`: The assembly name of the type containing the specified members.

To be added.

## DynamicDependencyAttribute.DynamicDependencyAttribute(String, String, String) constructor

```csharp
public DynamicDependencyAttribute (string memberSignature, string typeName, string assemblyName);
```

Initializes a new instance of the `DynamicDependencyAttribute` class with the specified signature of a member on a type in an assembly.

Parameters:

- `memberSignature`: The signature of the member depended on.
- `typeName`: The full name of the type containing the specified member.
- `assemblyName`: The assembly name of the type containing the specified member.

To be added.

## DynamicDependencyAttribute.AssemblyName property

```csharp
public string? AssemblyName { get; }
```

Gets the assembly name of the specified type.

Returns: To be added.

#### Remarks

`AssemblyName` is only valid when `TypeName` is specified.

## DynamicDependencyAttribute.Condition property

```csharp
public string? Condition { get; set; }
```

Gets or sets the condition in which the dependency is applicable.

Returns: To be added.

To be added.

## DynamicDependencyAttribute.MemberSignature property

```csharp
public string? MemberSignature { get; }
```

Gets the signature of the member depended on.

Returns: To be added.

#### Remarks

Either `MemberSignature` must be a valid string or `MemberTypes` must not equal `None`, but not both.

## DynamicDependencyAttribute.MemberTypes property

```csharp
public System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes MemberTypes { get; }
```

Gets the types of the members that are depended on, for example, fields and properties.

Returns: To be added.

#### Remarks

Either `MemberSignature` must be a valid string or `MemberTypes` must not equal `None`, but not both.

## DynamicDependencyAttribute.Type property

```csharp
public Type? Type { get; }
```

Gets the `Type` containing the specified member.

Returns: To be added.

#### Remarks

If `Type` and `TypeName` aren't specified, the type of the consumer is assumed.

## DynamicDependencyAttribute.TypeName property

```csharp
public string? TypeName { get; }
```

Gets the full name of the type containing the specified member.

Returns: To be added.

#### Remarks

If `Type` and `TypeName` aren't specified, the type of the consumer is assumed.
