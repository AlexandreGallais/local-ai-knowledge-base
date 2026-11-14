---
title: "TypedReference struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypedReference.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypedReference struct

Namespace: `System`

```csharp
public ref struct TypedReference
```

Describes objects that contain both a managed pointer to a location and a runtime representation of the type that may be stored at that location.

#### Remarks
A typed reference is a type/value combination used for varargs and other support. `TypedReference` is a built-in value type that can be used for parameters and local variables.

Arrays of `TypedReference` objects cannot be created. For example, the following call is invalid:

_Code sample not included: ~/snippets/csharp/System/TypedReference/Overview/source.cs._

## TypedReference.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Checks if this object is equal to the specified object.

Parameters:

- `o`: The object with which to compare the current object.

Returns: `true` if this object is equal to the specified object; otherwise, `false`.

Exceptions:

- `NotSupportedException`: This method is not implemented.

To be added.

## TypedReference.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code of this object.

Returns: The hash code of this object.

To be added.

## TypedReference.GetTargetType(TypedReference) method

```csharp
public static Type GetTargetType (TypedReference value);
```

Returns the type of the target of the specified `TypedReference`.

Parameters:

- `value`: The value whose target's type is to be returned.

Returns: The type of the target of the specified `TypedReference`.

To be added.

## TypedReference.MakeTypedReference(Object, FieldInfo[]) method

```csharp
public static TypedReference MakeTypedReference (object target, System.Reflection.FieldInfo[] flds);
```

Makes a `TypedReference` for a field identified by a specified object and list of field descriptions.

Parameters:

- `target`: An object that contains the field described by the first element of `flds`.
- `flds`: A list of field descriptions where each element describes a field that contains the field described by the succeeding element. Each described field must be a value type. The field descriptions must be `RuntimeFieldInfo` objects supplied by the type system.

Returns: A `TypedReference` for the field described by the last element of `flds`.

Exceptions:

- `ArgumentNullException`: `target` or `flds` is `null`.

-or-

An element of `flds` is `null`.
- `ArgumentException`: The `flds` array has no elements.

-or-

An element of `flds` is not a `RuntimeFieldInfo` object.

-or-

The `FieldInfo.IsInitOnly` or `FieldInfo.IsStatic` property of an element of `flds` is `true`.
- `MissingMemberException`: Parameter `target` does not contain the field described by the first element of `flds`, or an element of `flds` describes a field that is not contained in the field described by the succeeding element of `flds`.

-or-

The field described by an element of `flds` is not a value type.

#### Remarks
The `TypedReference.MakeTypedReference` method returns a typed reference to some terminal field, where the `target` parameter contains the field described by the first element of `flds`, the field described by the first element of `flds` contains the field described by the second element of `flds`, and so on until the terminal field is reached.

## TypedReference.SetTypedReference(TypedReference, Object) method

```csharp
public static void SetTypedReference (TypedReference target, object? value);
```

Converts the specified value to a `TypedReference`. This method is not supported.

Parameters:

- `target`: The target of the conversion.
- `value`: The value to be converted.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks
This method always throws `NotSupportedException`.

## TypedReference.TargetTypeToken(TypedReference) method

```csharp
public static RuntimeTypeHandle TargetTypeToken (TypedReference value);
```

Returns the internal metadata type handle for the specified `TypedReference`.

Parameters:

- `value`: The `TypedReference` for which the type handle is requested.

Returns: The internal metadata type handle for the specified `TypedReference`.

To be added.

## TypedReference.ToObject(TypedReference) method

```csharp
public static object ToObject (TypedReference value);
```

Converts the specified `TypedReference` to an `Object`.

Parameters:

- `value`: The `TypedReference` to be converted.

Returns: An `Object` converted from a `TypedReference`.

#### Remarks
This might be a boxing operation.
