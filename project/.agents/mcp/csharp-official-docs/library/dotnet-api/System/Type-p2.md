---
title: "Type class (part 2 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 2 of 33)

## Type.BaseType property

```csharp
public abstract Type? BaseType { get; }
```

Gets the type from which the current `Type` directly inherits.

Returns: The `Type` from which the current `Type` directly inherits, or `null` if the current `Type` represents the `Object` class or an interface.

#### Remarks
The base type is the type from which the current type directly inherits. `Object` is the only type that does not have a base type, therefore `null` is returned as the base type of `Object`.

Interfaces inherit from zero or more base interfaces; therefore, this property returns `null` if the `Type` object represents an interface. The base interfaces can be determined with `Type.GetInterfaces` or `Type.FindInterfaces`.

If the current `Type` represents a constructed generic type, the base type reflects the generic arguments. For example, consider the following declarations:

_Code sample not included: ~/snippets/csharp/System/Type/BaseType/remarks.cs._

For the constructed type `C<int>` (`C(Of Integer)` in Visual Basic), the `BaseType` property returns `B<int>`.

If the current `Type` represents a type parameter of a generic type definition, `Type.BaseType` returns the class constraint, that is, the class the type parameter must inherit. If there is no class constraint, `Type.BaseType` returns `Object`.

This property is read-only.

#### Examples
The following example demonstrates using the `BaseType` property.

_Code sample not included: ~/snippets/csharp/System/Type/BaseType/testbasetype.cs._

The following example uses recursion to list the complete inheritance hierarchy of each class found in an assembly. The example defines a class named `C` that derives from a class named `B`, which, in turn, derives from a class named `A`.

_Code sample not included: ~/snippets/csharp/System/Type/BaseType/basetype3.cs._

## Type.ContainsGenericParameters property

```csharp
public virtual bool ContainsGenericParameters { get; }
```

Gets a value indicating whether the current `Type` object has type parameters that have not been replaced by specific types.

Returns: `true` if the `Type` object is itself a generic type parameter or has type parameters for which specific types have not been supplied; otherwise, `false`.

#### Remarks
In order to create an instance of a type, there must be no generic type definitions or open constructed types in the type arguments of the type itself, in any enclosing generic types, or in any elements of the type. Another way of saying this is that when examined recursively, the type must contain no generic type parameters.

Since types can be arbitrarily complex, making this determination is difficult. For convenience and to reduce the chance of error, the `ContainsGenericParameters` property provides a standard way to distinguish between closed constructed types, which can be instantiated, and open constructed types, which cannot. If the `ContainsGenericParameters` property returns `true`, the type cannot be instantiated.

The `ContainsGenericParameters` property searches recursively for type parameters. For example, it returns `true` for an array whose elements are type `A<T>` (`A(Of T)` in Visual Basic), even though the array is not itself generic. Contrast this with the behavior of the `IsGenericType` property, which returns `false` for arrays.

For a set of example classes and a table showing the values of the `ContainsGenericParameters` property, see `Type.IsGenericType`.

#### Examples
The following example defines a generic class with two type parameters and then defines a second generic class that derives from the first class. The derived class's base class has two type arguments: the first is `Int32` and the second is a type parameter of the derived type. The example displays information about these generic classes, including the positions reported by the `GenericParameterPosition` property.

_Code sample not included: ~/snippets/csharp/System/Type/ContainsGenericParameters/source.cs._

## Type.DeclaringMethod property

```csharp
public virtual System.Reflection.MethodBase? DeclaringMethod { get; }
```

Gets a `MethodBase` that represents the declaring method, if the current `Type` represents a type parameter of a generic method.

Returns: If the current `Type` represents a type parameter of a generic method, a `MethodBase` that represents declaring method; otherwise, `null`.

#### Remarks
The declaring method is a generic method definition. That is, if `Type.DeclaringMethod` does not return `null`, then `DeclaringMethod.IsGenericMethodDefinition` returns `true`.

The `Type.DeclaringType` and `Type.DeclaringMethod` properties identify the generic type definition or generic method definition in which the generic type parameter was originally defined:

- If the `DeclaringMethod` property returns a `MethodInfo`, that `MethodInfo` represents a generic method definition, and the current `Type` object represents a type parameter of that generic method definition.

- If the `DeclaringMethod` property returns `null`, then the `DeclaringType` property always returns a `Type` object representing a generic type definition, and the current `Type` object represents a type parameter of that generic type definition.

- Getting the `DeclaringMethod` property on a type whose `IsGenericParameter` property is `false` throws an `InvalidOperationException`.

The `MethodBase` that is returned by the `DeclaringMethod` property is either a `MethodInfo` in the case of a generic method, or a `ConstructorInfo` in the case of a generic constructor.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following code example defines a class that has a generic method, assigns a type argument to the method, and invokes the resulting constructed generic method. It also displays information about the generic method definition and the constructed method. When displaying information about the type parameters of the generic method definition, in the `DisplayGenericMethodInfo` method, the example code shows the value of the `DeclaringMethod` property for the method's generic type parameter.

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._

## Type.DeclaringType property

```csharp
public override Type? DeclaringType { get; }
```

Gets the type that declares the current nested type or generic type parameter.

Returns: A `Type` object representing the enclosing type, if the current type is a nested type; or the generic type definition, if the current type is a type parameter of a generic type; or the type that declares the generic method, if the current type is a type parameter of a generic method; otherwise, `null`.

#### Remarks
If the current `Type` object represents a type parameter of a generic type, this property returns the generic type definition.

If the current `Type` object represents a type parameter of a generic method, this property returns the type that contains the generic method definition. If the type is generic, the generic type definition is returned. That is, the following code returns the generic type definition of the `List<T>` generic class, which contains the `List<T>.ConvertAll` generic method:

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringType/remarks.cs._

If the current `Type` represents a type parameter in the definition of a generic type or generic method, the `Type.DeclaringType` and `Type.DeclaringMethod` properties identify the generic type definition or generic method definition where the generic type parameter was originally defined:

- If the `DeclaringMethod` property returns a `MethodInfo`, that `MethodInfo` represents a generic method definition, and the current `Type` object represents a type parameter of that generic method definition.

- If the `DeclaringMethod` property returns `null`, then the `DeclaringType` property always returns a `Type` object representing a generic type definition, and the current `Type` object represents a type parameter of that generic type definition.

- Getting the `DeclaringType` property on a type whose `IsGenericParameter` property is `false` throws an `InvalidOperationException`.

#### Examples
This example displays the declaring type of a method in a derived class.

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringType/source.cs._

## Type.DefaultBinder property

```csharp
public static System.Reflection.Binder DefaultBinder { get; }
```

Gets a reference to the default binder, which implements internal rules for selecting the appropriate members to be called by `Type.InvokeMember`.

Returns: A reference to the default binder used by the system.

#### Remarks
The default binder provided with the common language runtime is applicable in all but the most specialized circumstances. If you need a binder that follows rules that differ from those of the supplied default binder, define a type derived from the `Binder` class and pass an instance of that type using the `binder` parameter of one of the `Type.InvokeMember` overloads.

Reflection models the accessibility rules of the common type system. For example, if the caller is in the same assembly, the caller does not need special permissions for internal members. Otherwise, the caller needs `ReflectionPermission`. This is consistent with lookup of members that are protected, private, and so on.

The general principle is that `Binder.ChangeType` should perform only widening conversions, which never lose data. An example of a widening conversion is converting a value that is a 32-bit signed integer to a value that is a 64-bit signed integer. This is distinguished from a narrowing conversion, which may lose data. An example of a narrowing conversion is converting a 64-bit signed integer to a 32-bit signed integer.

The following table lists the conversions supported by the default binder.

|Source Type|Target Type|
|-----------------|-----------------|
|Any type|Its base type.|
|Any type|The interface it implements.|
|Char|Unt16, UInt32, Int32, UInt64, Int64, Single, Double|
|Byte|Char, Unt16, Int16, UInt32, Int32, UInt64, Int64, Single, Double|
|SByte|Int16, Int32, Int64, Single, Double|
|UInt16|UInt32, Int32, UInt64, Int64, Single, Double|
|Int16|Int32, Int64, Single, Double|
|UInt32|UInt64, Int64, Single, Double|
|Int32|Int64, Single, Double|
|UInt64|Single, Double|
|Int64|Single, Double|
|Single|Double|
|Non-reference|By-reference.|

#### Examples
The following example gets the default binder from the `DefaultBinder` property, and invokes a member of MyClass by passing the `DefaultBinder` value as a parameter to `Type.InvokeMember`.

_Code sample not included: ~/snippets/csharp/System/Type/DefaultBinder/type_defaultbinder.cs._

## Type.FullName property

```csharp
public abstract string? FullName { get; }
```

Gets the fully qualified name of the type, including its namespace but not its assembly.

Returns: The fully qualified name of the type, including its namespace but not its assembly; or `null` if the type can't be represented by a fully qualified name. Types that can't be represented by a fully qualified name include types that contain unresolved generic parameters (`Type.ContainsGenericParameters` is `true`) and types that contain function pointers.

#### Remarks
For example, the fully qualified name of the `String` type is `System.String`. Contrast this with the assembly-qualified name returned by the `AssemblyQualifiedName` property, which consists of the full name plus the full assembly name.

If the current type represents a closed generic type, the type arguments in the string returned by the `FullName` property are qualified by their full assembly name, even though the string representation of the generic type itself is not qualified by its full assembly name. The following example illustrates the difference in the FullName property for a type that represents generic type definition and one that represents a closed generic type.

_Code sample not included: ~/snippets/csharp/System/Type/FullName/fullnameex1.cs._

This property returns `null` if:

- The current `Type` object represents a type parameter of a generic type.

The following example retrieves the type parameter of the `Nullable<T>` type and attempts to display its `FullName` property.

_Code sample not included: ~/snippets/csharp/System/Type/FullName/Fullname3.cs._

- The current `Type` object represents an array type, a pointer  type, or a `byref` type that is based on a generic type parameter.

The following example defines a generic type, `Generictype1<T>`, with three methods: `Display(T[])`, which is passed an array of type T; `HandleT(T)`, which is passed a T object; and `ChangeValue(ref T)`, which is passed a T object by reference. Because C# and Visual Basic do not allow us to define T as a pointer in the `HandleT` method, we have to call the `Type.MakePointerType` method on the `Type` object that represents the method's parameter type to create a pointer to a generic type. The output from the example shows that in all three cases, the `FullName` property is `null`.

_Code sample not included: ~/snippets/csharp/System/Type/FullName/Fullname4.cs._

- The current type contains generic type parameters that have not been replaced by specific types (that is, the `ContainsGenericParameters` property returns `true`), but the type is not a generic type definition (that is, the `IsGenericTypeDefinition` property returns `false`

In the following example, `Derived<T>` inherits from `Base<T>`. The `BaseType` property obtains the  `Type` object that represents the base type of `Derived<T>`, and its `FullName` property returns `null`.

_Code sample not included: ~/snippets/csharp/System/Type/FullName/Fullname5.cs._

To get a `Type.FullName` that is not `null`, you can use the `Type.GetGenericTypeDefinition` method to get the generic type definition, as the example illustrates.

This property is read-only.

#### Examples
The following example displays the full name of the specified type.

_Code sample not included: ~/snippets/csharp/System/Type/FullName/testfullname.cs._

The following example compares the strings returned by the `Type.ToString` method and the `Type.Name`, `FullName`, and `Type.AssemblyQualifiedName` properties.

_Code sample not included: ~/snippets/csharp/System/Type/AssemblyQualifiedName/fullname1.cs._
