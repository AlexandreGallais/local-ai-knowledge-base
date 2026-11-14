---
title: "GenericParameterAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/GenericParameterAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GenericParameterAttributes enum

Namespace: `System.Reflection`

```csharp
public enum GenericParameterAttributes
```

Describes the constraints on a generic type parameter of a generic type or method.

#### Remarks
The members of the `GenericParameterAttributes` enumeration are divided into two groups, the variance group and the special constraints group. To test a `GenericParameterAttributes` value for variance flags, first perform a bitwise AND operation with VarianceMask. If the result is None, there are no variance flags. Similarly, use SpecialConstraintMask to test for constraint flags.

#### Examples
The following code example defines a generic type `Test` with two type parameters. The second type parameter has a base class constraint and a reference type constraint. When the program executes, the constraints are examined using the `GenericParameterAttributes` property and the `Type.GetGenericParameterConstraints` method.

_Code sample not included: ~/snippets/csharp/System/Type/GenericParameterAttributes/source.cs._

## GenericParameterAttributes.AllowByRefLike field

```csharp
AllowByRefLike
```

The generic type parameter can be `ByRefLike`.

## GenericParameterAttributes.Contravariant field

```csharp
Contravariant
```

The generic type parameter is contravariant. A contravariant type parameter can appear as a parameter type in method signatures.

## GenericParameterAttributes.Covariant field

```csharp
Covariant
```

The generic type parameter is covariant. A covariant type parameter can appear as the result type of a method, the type of a read-only field, a declared base type, or an implemented interface.

## GenericParameterAttributes.DefaultConstructorConstraint field

```csharp
DefaultConstructorConstraint
```

A type can be substituted for the generic type parameter only if it has a parameterless constructor.

## GenericParameterAttributes.None field

```csharp
None
```

There are no special flags.

## GenericParameterAttributes.NotNullableValueTypeConstraint field

```csharp
NotNullableValueTypeConstraint
```

A type can be substituted for the generic type parameter only if it is a value type and is not nullable.

## GenericParameterAttributes.ReferenceTypeConstraint field

```csharp
ReferenceTypeConstraint
```

A type can be substituted for the generic type parameter only if it is a reference type.

## GenericParameterAttributes.SpecialConstraintMask field

```csharp
SpecialConstraintMask
```

Selects the combination of all special constraint flags. This value is the result of using logical OR to combine the following flags: `GenericParameterAttributes.DefaultConstructorConstraint`, `GenericParameterAttributes.ReferenceTypeConstraint`, and `GenericParameterAttributes.NotNullableValueTypeConstraint`.

## GenericParameterAttributes.VarianceMask field

```csharp
VarianceMask
```

Selects the combination of all variance flags. This value is the result of using logical OR to combine the following flags: `GenericParameterAttributes.Contravariant` and `GenericParameterAttributes.Covariant`.
