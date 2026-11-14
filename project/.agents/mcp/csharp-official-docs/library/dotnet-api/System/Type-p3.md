---
title: "Type class (part 3 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 3 of 33)

## Type.GenericParameterAttributes property

```csharp
public virtual System.Reflection.GenericParameterAttributes GenericParameterAttributes { get; }
```

Gets a combination of `GenericParameterAttributes` flags that describe the covariance and special constraints of the current generic type parameter.

Returns: A bitwise combination of `GenericParameterAttributes` values that describes the covariance and special constraints of the current generic type parameter.

Exceptions:

- `InvalidOperationException`: The current `Type` object is not a generic type parameter. That is, the `Type.IsGenericParameter` property returns `false`.
- `NotSupportedException`: The invoked method is not supported in the base class.

#### Remarks
The value of this property contains flags that describe whether the current generic type parameter is covariant, and flags that describe any special constraints. Use the `VarianceMask` value to select the covariance flags, and use the `SpecialConstraintMask` value to select the constraint flags.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following code example defines a generic type `Test` with two type parameters that have different constraints. When the program executes, the constraints are examined using the `GenericParameterAttributes` property and the `Type.GetGenericParameterConstraints` method.

_Code sample not included: ~/snippets/csharp/System/Type/GenericParameterAttributes/source.cs._

## Type.GenericParameterPosition property

```csharp
public virtual int GenericParameterPosition { get; }
```

Gets the position of the type parameter in the type parameter list of the generic type or method that declared the parameter, when the `Type` object represents a type parameter of a generic type or a generic method.

Returns: The position of a type parameter in the type parameter list of the generic type or method that defines the parameter. Position numbers begin at 0.

Exceptions:

- `InvalidOperationException`: The current type does not represent a type parameter. That is, `Type.IsGenericParameter` returns `false`.

#### Remarks
The `GenericParameterPosition` property returns the position of a type parameter in the parameter list of the generic type definition or generic method definition where the type parameter was originally defined. The `Type.DeclaringType` and `Type.DeclaringMethod` properties identify the generic type or method definition:

- If the `DeclaringMethod` property returns a `MethodInfo`, that `MethodInfo` represents a generic method definition, and the current `Type` object represents a type parameter of that generic method definition.

- If the `DeclaringMethod` property returns `null`, then the `DeclaringType` property always returns a `Type` object representing a generic type definition, and the current `Type` object represents a type parameter of that generic type definition.

To provide the correct context for the value of the `GenericParameterPosition` property, it's necessary to identify the generic type or method a type parameter belongs to. For example, consider the return value of the generic method `GetSomething` in the following code:

_Code sample not included: ~/snippets/csharp/System/Type/GenericParameterPosition/remarks.cs._

The type returned by `GetSomething` depends on the type arguments supplied to class `A` and to `GetSomething` itself. You can obtain a `MethodInfo` for `GetSomething`, and from that you can obtain the return type. When you examine the type parameters of the return type, `Type.GenericParameterPosition` returns 0 for both. The position of `V` is 0 because `V` is the first type parameter in the type parameter list for class `A`. The position of `X` is 0 because `X` is the first type parameter in the type parameter list for `GetSomething`.

> **Note:**
> Calling the `GenericParameterPosition` property causes an exception if the current `Type` does not represent a type parameter. When you examine the type arguments of an open constructed type, use the `IsGenericParameter` property to tell which are type parameters and which are types. The `IsGenericParameter` property returns `true` for a type parameter; you can then use the `Type.GenericParameterPosition` method to obtain its position and use the `Type.DeclaringMethod` and `Type.DeclaringType` properties to determine the generic method or type definition that defines it.

#### Examples
The following example defines a generic class with two type parameters and defines a second generic class that derives from the first class. The derived class's base class has two type arguments: the first is `Int32`, and the second is a type parameter of the derived type. The example displays information about these generic classes, including the positions reported by the `GenericParameterPosition` property.

_Code sample not included: ~/snippets/csharp/System/Type/ContainsGenericParameters/source.cs._

## Type.GenericTypeArguments property

```csharp
public virtual Type[] GenericTypeArguments { get; }
```

Gets an array of the generic type arguments for this type.

Returns: An array of the generic type arguments for this type.

#### Remarks
This property gets only the generic type arguments; that is, the types that have been specified for the generic type parameters of the current type. If the current type is a generic type definition, this property returns an empty array.

> **Note:**
> If a generic type is used in a generic method or in another generic type, some of its generic type arguments might be generic type parameters of the enclosing method or type.

To get the generic type parameters of a type that represents a generic type definition, use the `GenericTypeParameters` property. To get a `TypeInfo` object for the current `Type` object, use the `IntrospectionExtensions.GetTypeInfo` extension method.

## Type.GUID property

```csharp
public abstract Guid GUID { get; }
```

Gets the GUID associated with the `Type`.

Returns: The GUID associated with the `Type`.

#### Remarks
This property returns a GUID that's associated with a type using the `GuidAttribute` attribute. If the attribute is omitted, a GUID is assigned automatically.

The GUID returned by this property is typically used to expose a type to COM. It is not meant to be used as a unique identifier of the type.

#### Examples
The following example creates the class `MyClass1` with a public method, creates a `Type` object corresponding to `MyClass1`, and gets the `Guid` structure using the `GUID` property of the `Type` class.

_Code sample not included: ~/snippets/csharp/System/Type/GUID/type_guid.cs._

## Type.HasElementType property

```csharp
public bool HasElementType { get; }
```

Gets a value indicating whether the current `Type` encompasses or refers to another type; that is, whether the current `Type` is an array, a pointer, or is passed by reference.

Returns: `true` if the `Type` is an array, a pointer, or is passed by reference; otherwise, `false`.

#### Remarks
For example, Type.GetType("Int32[]").HasElementType returns `true`, but Type.GetType("Int32").HasElementType returns `false`. HasElementType also returns `true` for "Int32*" and "Int32&".

If the current `Type` represents a generic type, or a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example returns `true` or `false` depending on whether or not the object is an array, a reference type, or a pointer.

_Code sample not included: ~/snippets/csharp/System/Type/HasElementType/type_haselementtype.cs._

## Type.IsAbstract property

```csharp
public bool IsAbstract { get; }
```

Gets a value indicating whether the `Type` is abstract and must be overridden.

Returns: `true` if the `Type` is abstract; otherwise, `false`.

#### Remarks
The `IsAbstract` property returns `true` in the following cases:

- The current type is abstract; that is, it cannot be instantiated, but can only serve as the base class for derived classes. In C#, abstract classes are marked with the abstract keyword; in F#, they are marked with the AbstractClass attribute; in Visual Basic, they are marked with the MustInherit keyword.

- The current type is an interface.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example creates an array of `Type` objects that represent the following types:contains type returns `true` if the specified object is `abstract`; otherwise, it returns `false`.

-   `AbstractClass`, an abstract class (a class marked as `abstract` in C# and `MustInherit` in Visual Basic).

-   `DerivedClass`, a class that inherits from `AbstractClass`.

-   `SingleClass`, a non-inheritable class. it's defined as `sealed` in C# and `NotInheritable` in Visual Basic.

-   `ITypeInfo`, an interface.

-   `ImplementingClass`, a class that implements the `ITypeInfo` interface.

The method returns `true` only for `AbstractClass`, the abstract class, and `ITypeInfo`, the interface.

_Code sample not included: ~/snippets/csharp/System/Type/IsAbstract/isabstract1.cs._

## Type.IsAnsiClass property

```csharp
public bool IsAnsiClass { get; }
```

Gets a value indicating whether the string format attribute `AnsiClass` is selected for the `Type`.

Returns: `true` if the string format attribute `AnsiClass` is selected for the `Type`; otherwise, `false`.

#### Remarks
The `StringFormatMask` selects the string format attributes. The string format attributes enhance interoperability by defining how strings should be interpreted.

If the current `Type` represents a generic type, this property pertains to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

#### Examples
The following example gets the field information and checks for the `AnsiClass` attribute.

_Code sample not included: ~/snippets/csharp/System/Type/IsAnsiClass/type_isansiclass.cs._

## Type.IsArray property

```csharp
public bool IsArray { get; }
```

Gets a value that indicates whether the type is an array.

Returns: `true` if the current type is an array; otherwise, `false`.

#### Remarks
The `IsArray` property returns `false` for the `Array` class. It also returns `false` if the current instance is a `Type` object that represents a collection type or an interface designed to work with collections, such as `IEnumerable` or `IEnumerable<T>`.

To check for an array, use code such as:

```csharp
typeof(Array).IsAssignableFrom(type)
```

```vb
GetType(Array).IsAssignableFrom(type)
```

If the current type represents a generic type, or a type parameter in the definition of a generic type or generic method, this property always returns `false`.

This property is read-only.

#### Examples
The following example demonstrates using the `IsArray` property.

_Code sample not included: ~/snippets/csharp/System/Type/IsArray/isarray2.cs._

## Type.IsAutoClass property

```csharp
public bool IsAutoClass { get; }
```

Gets a value indicating whether the string format attribute `AutoClass` is selected for the `Type`.

Returns: `true` if the string format attribute `AutoClass` is selected for the `Type`; otherwise, `false`.

#### Remarks
The `StringFormatMask` selects the string format attributes. The string format attributes enhance interoperability by defining how strings should be interpreted.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

## Type.IsAutoLayout property

```csharp
public bool IsAutoLayout { get; }
```

Gets a value indicating whether the fields of the current type are laid out automatically by the common language runtime.

Returns: `true` if the `Type.Attributes` property of the current type includes `TypeAttributes.AutoLayout`; otherwise, `false`.

#### Remarks
This property is provided as a convenience. Alternatively, you can use the `LayoutMask` enumeration value to select the type layout attributes, and then test whether `AutoLayout` is set. The `AutoLayout`,`ExplicitLayout`, and `SequentialLayout` enumeration values indicate the way the fields of the type are laid out in memory.

For dynamic types, you can specify `AutoLayout` when you create the type. In code, apply the `StructLayoutAttribute` attribute with the `Auto` enumeration value to the type, to let the runtime determine the appropriate way to lay out the class.

> **Note:**
> You cannot use the `MemberInfo.GetCustomAttributes` method to determine whether the `StructLayoutAttribute` has been applied to a type.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>.`

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example creates an instance of the type and displays the `IsAutoLayout` property.

_Code sample not included: ~/snippets/csharp/System/Type/IsAutoLayout/type_isautolayout.cs._

## Type.IsByRef property

```csharp
public bool IsByRef { get; }
```

Gets a value indicating whether the `Type` is passed by reference.

Returns: `true` if the `Type` is passed by reference; otherwise, `false`.

#### Remarks
To get to the actual type, dereference the type that was passed by reference, and then call `Type.GetElementType` on that type.

#### Examples
The following example demonstrates a use of the `IsByRef` property to check whether a specified type is passed by reference. The example defines the class `MyTypeDelegator`, which overrides the `HasElementTypeImpl` method. The main class checks for the `HasElementType` property and displays the element type.

_Code sample not included: ~/snippets/csharp/System/Type/HasElementTypeImpl/type_haselementtypeimpl.cs._
