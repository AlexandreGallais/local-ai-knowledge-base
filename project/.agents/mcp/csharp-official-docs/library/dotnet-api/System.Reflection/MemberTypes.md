---
title: "MemberTypes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MemberTypes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberTypes enum

Namespace: `System.Reflection`

```csharp
public enum MemberTypes
```

Marks each type of member that is defined as a derived class of `MemberInfo`.

#### Remarks
These enumeration values are returned by the following properties:

-   `Type.MemberType`.

-   `MemberInfo.MemberType`.

-   `ConstructorInfo`.

-   `EventInfo`.

-   `FieldInfo`.

-   `MethodInfo`.

-   `PropertyInfo`.

To obtain the `MemberTypes` value for a type:

1.  Get a `Type` object that represents that type.

2.  Retrieve the value of the `MemberType` property.

To get the `MemberTypes` values for the members of a type.:

1.  Get a `Type` object that represents that type.

2.  Retrieve the `MemberInfo` array that represents the members of that type by calling the `Type.GetMembers` method.

3.  Retrieve the value of the From the `MemberType` property for each member in the array.  A `switch` statement in C# or `Select Case` statement in Visual Basic is typically used to process member types.

`MemberTypes` matches CorTypeAttr as defined in the corhdr.h file.

#### Examples
The following example displays the names of the members of the `ReflectionTypeLoadException` class and their associated member types.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberTypes/Overview/source.cs._

## MemberTypes.All field

```csharp
All
```

Specifies all member types.

## MemberTypes.Constructor field

```csharp
Constructor
```

Specifies that the member is a constructor.

## MemberTypes.Custom field

```csharp
Custom
```

Specifies that the member is a custom member type.

## MemberTypes.Event field

```csharp
Event
```

Specifies that the member is an event.

## MemberTypes.Field field

```csharp
Field
```

Specifies that the member is a field.

## MemberTypes.Method field

```csharp
Method
```

Specifies that the member is a method.

## MemberTypes.NestedType field

```csharp
NestedType
```

Specifies that the member is a nested type.

## MemberTypes.Property field

```csharp
Property
```

Specifies that the member is a property.

## MemberTypes.TypeInfo field

```csharp
TypeInfo
```

Specifies that the member is a type.
