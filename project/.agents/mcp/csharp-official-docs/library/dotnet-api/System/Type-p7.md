---
title: "Type class (part 7 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 7 of 33)

## Type.IsSZArray property

```csharp
public virtual bool IsSZArray { get; }
```

Gets a value that indicates whether the type is an array type that can represent only a single-dimensional array with a zero lower bound.

Returns: `true` if the current `Type` is an array type that can represent only a single-dimensional array with a zero lower bound; otherwise, `false`.

To be added.

## Type.IsTypeDefinition property

```csharp
public virtual bool IsTypeDefinition { get; }
```

Gets a value that indicates whether the type is a type definition.

Returns: `true` if the current `Type` is a type definition; otherwise, `false`.

#### Remarks
A `Type` instance is a type definition if it represents the type directly defined in assembly, in contrast to types that are constructed on demand based on other types. For example, a primitive type, class, structure, or generic type definition is a type definition, but an array, reference, pointer, or instantiated generic type isn't.

## Type.IsUnicodeClass property

```csharp
public bool IsUnicodeClass { get; }
```

Gets a value indicating whether the string format attribute `UnicodeClass` is selected for the `Type`.

Returns: `true` if the string format attribute `UnicodeClass` is selected for the `Type`; otherwise, `false`.

#### Remarks
The `StringFormatMask` is used to select the string format attributes. The string format attributes enhance interoperability by defining how strings should be interpreted.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

## Type.IsUnmanagedFunctionPointer property

```csharp
public virtual bool IsUnmanagedFunctionPointer { get; }
```

Gets a value that indicates whether the current `Type` is an unmanaged function pointer.

Returns: `true` if the current `Type` is an unmanaged function pointer; otherwise, `false`.

To be added.

## Type.IsValueType property

```csharp
public bool IsValueType { get; }
```

Gets a value indicating whether the `Type` is a value type.

Returns: `true` if the `Type` is a value type; otherwise, `false`.

#### Remarks
Value types are types that are represented as sequences of bits; value types are not classes or interfaces. Value types are referred to as "structs" in some programming languages. Enums are a special case of value types.

This property returns `false` for the `ValueType` class, because `ValueType` is not a value type itself. it's the base class for all value types, and therefore any value type can be assigned to it. This would not be possible if `ValueType` itself was a value type. Value types are boxed when they are assigned to a field of type `ValueType`.

This property returns `true` for enumerations, but not for the `Enum` type itself. For an example that demonstrates this behavior, see `Type.IsEnum`.

This property is read-only.

#### Examples
The following example creates a variable of type `MyEnum`, checks for the `IsValueType` property, and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsValueType/type_isvaluetype.cs._

## Type.IsVariableBoundArray property

```csharp
public virtual bool IsVariableBoundArray { get; }
```

Gets a value that indicates whether the type is an array type that can represent a multi-dimensional array or an array with an arbitrary lower bound.

Returns: `true` if the current `Type` is an array type that can represent a multi-dimensional array or an array with an arbitrary lower bound; otherwise, `false`.

#### Remarks
If the value of this property is `true` for an array type, it can be used to create single-dimensional or multi-dimensional array instances with arbitrary lower bounds. Otherwise, the array type can only be used to create instances of single-dimensional arrays with a zero lower bound.

## Type.IsVisible property

```csharp
public bool IsVisible { get; }
```

Gets a value indicating whether the `Type` can be accessed by code outside the assembly.

Returns: `true` if the current `Type` is a public type or a public nested type such that all the enclosing types are public; otherwise, `false`.

#### Remarks
Use this property to determine whether a type is part of the public interface of a component assembly.

#### Examples
The following code example tests two classes, only one of which is visible outside the assembly.

_Code sample not included: ~/snippets/csharp/System/Type/IsVisible/source.cs._

## Type.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is a type or a nested type.

Returns: A `MemberTypes` value indicating that this member is a type or a nested type.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `NestedType` when a given member is a nested type.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `TypeInfo`.

#### Examples
The following code example shows the `MemberType` field as a parameter to the `GetMember` method:

_Code sample not included: ~/snippets/csharp/System/Type/MemberType/source.cs._

## Type.Module property

```csharp
public abstract System.Reflection.Module Module { get; }
```

Gets the module (the DLL) in which the current `Type` is defined.

Returns: The module in which the current `Type` is defined.

#### Remarks
If the current `Type` represents a constructed generic type, this property returns the module in which the generic type definition was defined. For example, if you create an instance of `MyGenericStack<int>`, the `Module` property for the constructed type returns the module in which `MyGenericStack<T>` is defined.

Similarly, if the current `Type` represents a generic parameter `T`, this property returns the assembly that contains the generic type that defines `T`.

#### Examples
This following example demonstrates a use of the `Type.Namespace` and `Module` properties and the `Type.ToString` method of `Type`.

_Code sample not included: ~/snippets/csharp/System/Type/Module/type_tostring.cs._

## Type.Namespace property

```csharp
public abstract string? Namespace { get; }
```

Gets the namespace of the `Type`.

Returns: The namespace of the `Type`; `null` if the current instance has no namespace or represents a generic parameter.

#### Remarks
A namespace is a logical design-time naming convenience, used mainly to define scope in an application and organize classes and other types in a single hierarchical structure. From the viewpoint of the runtime, there are no namespaces.

If the current `Type` represents a constructed generic type, this property returns the namespace that contains the generic type definition. Similarly, if the current `Type` represents a generic parameter `T`, this property returns the namespace that contains the generic type definition that defines `T`.

If the current `Type` object represents a generic parameter and a generic type definition is not available, such as for a signature type returned by `Type.MakeGenericMethodParameter`, this property returns `null`.

#### Examples
This following example demonstrates a use of the `Namespace` and `Type.Module` properties and the `Type.ToString` method of `Type`.

_Code sample not included: ~/snippets/csharp/System/Type/Module/type_tostring.cs._

## Type.ReflectedType property

```csharp
public override Type? ReflectedType { get; }
```

Gets the class object that was used to obtain this member.

Returns: The `Type` object through which this `Type` object was obtained.

#### Remarks
For `Type` objects, the value of this property is always the same as the value of the `DeclaringType` property.

#### Examples
This example displays the reflected type of a nested class.

_Code sample not included: ~/snippets/csharp/System/Type/ReflectedType/source.cs._

## Type.StructLayoutAttribute property

```csharp
public virtual System.Runtime.InteropServices.StructLayoutAttribute? StructLayoutAttribute { get; }
```

Gets a `StructLayoutAttribute` that describes the layout of the current type.

Returns: Gets a `StructLayoutAttribute` that describes the gross layout features of the current type.

Exceptions:

- `NotSupportedException`: The invoked method is not supported in the base class.

#### Remarks
`StructLayoutAttribute` is not returned by the `MemberInfo.GetCustomAttributes` method. Instead, use this property to get it.

#### Examples
The following code example first defines a class, a structure, and a structure with special layout attributes (the structures are nested within the class). The example then uses the `StructLayoutAttribute` property to obtain a `StructLayoutAttribute` for each type, and displays the properties of the attributes.

_Code sample not included: ~/snippets/csharp/System/Type/StructLayoutAttribute/source.cs._

## Type.TypeHandle property

```csharp
public virtual RuntimeTypeHandle TypeHandle { get; }
```

Gets the handle for the current `Type`.

Returns: The handle for the current `Type`.

#### Remarks

`TypeHandle` encapsulates a pointer to an internal data structure that represents the type. This handle is unique during the process lifetime.

#### Examples
The following example returns the handle of the corresponding type and passes the handle to a method that gets the type from the handle and displays it.

_Code sample not included: ~/snippets/csharp/System/Type/TypeHandle/type_typehandle.cs._

## Type.TypeInitializer property

```csharp
public System.Reflection.ConstructorInfo? TypeInitializer { get; }
```

Gets the initializer for the type.

Returns: An object that contains the name of the class constructor for the `Type`.

#### Remarks
Class initializers are also available through the `Type.FindMembers` method, or through overloads of the `Type.GetMember`, `Type.GetMembers`, `Type.GetConstructor`, and `Type.GetConstructors` methods that take `BindingFlags` as a parameter.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property returns `null`.

## Type.UnderlyingSystemType property

```csharp
public abstract Type UnderlyingSystemType { get; }
```

Indicates the type provided by the common language runtime that represents this type.

Returns: The underlying system type for the `Type`.

To be added.

## Type.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines if the underlying system type of the current `Type` object is the same as the underlying system type of the specified `Object`.

Parameters:

- `o`: The object whose underlying system type is to be compared with the underlying system type of the current `Type`. For the comparison to succeed, `o` must be able to be cast or converted to an object of type   `Type`.

Returns: `true` if the underlying system type of `o` is the same as the underlying system type of the current `Type`; otherwise, `false`. This method also returns `false` if:

-   `o` is `null`.

-   `o` cannot be cast or converted to a `Type` object.

#### Remarks
This method overrides `Object.Equals`. It casts `o` to an object of type `Type` and calls the `Equals` method.

#### Examples
The following example uses `Equals` to compare various `Type` object instances with various `Object` instances.

_Code sample not included: ~/snippets/csharp/System/Type/Equals/EqualsEx1.cs._

Two things are particularly worth noting about the example:

- The comparison of a `Type` object that represents an integer with a `TypeInfo` object that represents an integer return `true` because `TypeInfo` is derived from `Type`.

- The comparison of a  `Type` object that represents a `IList<T>` object (an open generic type) with a `List(Of String)` object (a closed generic type) returns `false`.

## Type.Equals(Type) method

```csharp
public virtual bool Equals (Type? o);
```

Determines if the underlying system type of the current `Type` is the same as the underlying system type of the specified `Type`.

Parameters:

- `o`: The object whose underlying system type is to be compared with the underlying system type of the current `Type`.

Returns: `true` if the underlying system type of `o` is the same as the underlying system type of the current `Type`; otherwise, `false`.

#### Examples
The following example uses `Equals` to compare two types.

_Code sample not included: ~/snippets/csharp/System/Type/Equals/source.cs._
