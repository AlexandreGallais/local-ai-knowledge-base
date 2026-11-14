---
title: "TypeDelegator class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeDelegator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDelegator class

Namespace: `System.Reflection`

```csharp
public class TypeDelegator : System.Reflection.TypeInfo
```

Wraps a `Type` object and delegates methods to that `Type`.

#### Remarks
Derive from this type and override only those members you have to provide customization in, plus any members that are required by your program and not already implemented by `TypeDelegator`.

`TypeDelegator` derives from `Type` and implements most of the properties and methods of `Type`. For each member it implements, `TypeDelegator` automatically delegates to the corresponding member of an internal `Type` object, which is supplied as an argument to the constructor. This internal `Type` object is exposed to deriving classes by the `protected` `typeImpl` field.

> **Note:**
>  Some members of `TypeDelegator` have implementations even though the members themselves are simply inherited from `Type`. In these cases, the implementation is provided by an overridden `protected` method that has a name that ends in "Impl". For example, the implementation for all overloads of the `TypeDelegator.GetMethods` method is supplied by the overridden `TypeDelegator.GetMethodImpl` method. The implementation for inherited properties such as `Type.IsPublic` and `Type.IsNestedAssembly` is provided by the overridden `TypeDelegator.GetAttributeFlagsImpl` method.

Deriving classes can provide a public constructor that takes a `Type` object as its parameter and simply passes that object to the `%23ctor` constructor, or can set the internal `Type` object in some other way.

If a deriving class uses a member that is not implemented by `TypeDelegator`, it must override that member and provide an implementation. The simplest implementation is to call the corresponding member on the internal `Type` object exposed by the `typeImpl` field, but you can provide any implementation your application requires. It is not necessary to override these members if they are not used by your application or by library functions your application calls (for example, by the `%23ctor` constructor).

The following virtual methods (`Overridable` methods in Visual Basic) of `Type` are not implemented by `TypeDelegator`: `Type.MakeGenericType`, `Type.GetGenericTypeDefinition`, `Type.GetGenericArguments`, `Type.GetGenericParameterConstraints`, `Type.MakeArrayType`, `Type.MakeByRefType`, `Type.MakePointerType`, `Type.GetEnumNames`, `Type.GetEnumValues`, `Type.GetEnumUnderlyingType`, `Type.GetTypeCodeImpl`, `Type.IsEnumDefined`, `Type.IsEquivalentTo`.

The following virtual properties (`Overridable` properties in Visual Basic) of `Type` are not implemented by `TypeDelegator`: `Type.IsGenericType`, `Type.IsGenericTypeDefinition`, `Type.IsGenericParameter`, `Type.ContainsGenericParameters`, `Type.DeclaringMethod`, `Type.GenericParameterAttributes`, `Type.GenericParameterPosition`, `Type.IsSecurityCritical`, `Type.IsSecuritySafeCritical`, `Type.IsSecurityTransparent`.

## TypeDelegator.TypeDelegator() constructor

```csharp
protected TypeDelegator ();
```

Initializes a new instance of the `TypeDelegator` class with default properties.

To be added.

## TypeDelegator.TypeDelegator(Type) constructor

```csharp
public TypeDelegator (Type delegatingType);
```

Initializes a new instance of the `TypeDelegator` class specifying the encapsulating instance.

Parameters:

- `delegatingType`: The instance of the class `Type` that encapsulates the call to the method of an object.

Exceptions:

- `ArgumentNullException`: `delegatingType` is `null`.

#### Remarks
This constructor is called from a class to generate a delegate based upon the `Type` object for the class defining the method.

## TypeDelegator.Assembly property

```csharp
public override System.Reflection.Assembly Assembly { get; }
```

Gets the assembly of the implemented type.

Returns: An `Assembly` object representing the assembly of the implemented type.

#### Remarks
Assemblies are the deployment units in the common language runtime. Assemblies establish the namespace for resolving requests and determine which resources are exposed externally and which are accessible from within the assembly. The common language runtime can determine and locate the assembly for any running object.

## TypeDelegator.AssemblyQualifiedName property

```csharp
public override string? AssemblyQualifiedName { get; }
```

Gets the assembly's fully qualified name.

Returns: A `String` containing the assembly's fully qualified name.

To be added.

## TypeDelegator.BaseType property

```csharp
public override Type? BaseType { get; }
```

Gets the base type for the current type.

Returns: The base type for a type.

#### Remarks
The base type is the type from which this type directly inherits. Since the `Object` class type is the ultimate base class of all the other types, it is the only type that does not have a base type. In this case, `null` is returned as the base type of the `Object` type.

## TypeDelegator.FullName property

```csharp
public override string? FullName { get; }
```

Gets the fully qualified name of the implemented type.

Returns: A `String` containing the type's fully qualified name.

#### Remarks
A string containing the fully qualified name of the current `TypeDelegator`.

## TypeDelegator.GUID property

```csharp
public override Guid GUID { get; }
```

Gets the GUID (globally unique identifier) of the implemented type.

Returns: A GUID.

#### Remarks
The GUID (globally unique identifier) is a 128-bit unique identification string used to identify a class or an interface. It is primarily useful for interoperability between .NET and COM.

## TypeDelegator.IsByRefLike property

```csharp
public override bool IsByRefLike { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.IsCollectible property

```csharp
public override bool IsCollectible { get; }
```

Gets the `MemberInfo.IsCollectible` value for this object's `TypeDelegator.typeImpl`, which indicates whether this object, which is a `MemberInfo` implementation, references one or more assemblies held in a collectible `AssemblyLoadContext`.

Returns: `true` if this object, which is a `MemberInfo` implementation, references one or more assemblies held in a collectible assembly load context; otherwise, `false`.

To be added.

## TypeDelegator.IsConstructedGenericType property

```csharp
public override bool IsConstructedGenericType { get; }
```

Gets a value that indicates whether this object represents a constructed generic type.

Returns: `true` if this object represents a constructed generic type; otherwise, `false`.

To be added.

## TypeDelegator.IsFunctionPointer property

```csharp
public override bool IsFunctionPointer { get; }
```

Gets a value that indicates whether the current `Type` is a function pointer.

Returns: `true` if the current `Type` is a function pointer; otherwise, `false`.

To be added.

## TypeDelegator.IsGenericMethodParameter property

```csharp
public override bool IsGenericMethodParameter { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.IsGenericTypeParameter property

```csharp
public override bool IsGenericTypeParameter { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.IsSZArray property

```csharp
public override bool IsSZArray { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.IsTypeDefinition property

```csharp
public override bool IsTypeDefinition { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.IsUnmanagedFunctionPointer property

```csharp
public override bool IsUnmanagedFunctionPointer { get; }
```

Gets a value that indicates whether the current `Type` is an unmanaged function pointer.

Returns: `true` if the current `Type` is an unmanaged function pointer; otherwise, `false`.

To be added.

## TypeDelegator.IsVariableBoundArray property

```csharp
public override bool IsVariableBoundArray { get; }
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.MetadataToken <example-value>

```csharp
public override int MetadataToken { get; }
```

Gets a value that identifies this entity in metadata.

Returns: A value which, in combination with the module, uniquely identifies this entity in metadata.

#### Remarks
The tokens obtained using this property can be passed to the unmanaged reflection API.

## TypeDelegator.Module property

```csharp
public override System.Reflection.Module Module { get; }
```

Gets the module that contains the implemented type.

Returns: A `Module` object representing the module of the implemented type.

#### Remarks
A module is a loadable unit that can contain type declarations and implementations. Modules contain enough information to enable the common language runtime to locate all implementation bits when the module is loaded.

## TypeDelegator.Name property

```csharp
public override string Name { get; }
```

Gets the name of the implemented type, with the path removed.

Returns: A `String` containing the type's non-qualified name.

#### Remarks
A string containing the name of the current `TypeDelegator`. Only the simple name, not the fully qualified name, is returned. To get the name and the path, use `TypeDelegator.FullName`.

## TypeDelegator.Namespace property

```csharp
public override string? Namespace { get; }
```

Gets the namespace of the implemented type.

Returns: A `String` containing the type's namespace.

#### Remarks
This property gets a string containing the namespace of the current `TypeDelegator`. For example, if the `TypeDelegator` is `TypeFilter`, the returned namespace is `Reflection`.

## TypeDelegator.TypeHandle property

```csharp
public override RuntimeTypeHandle TypeHandle { get; }
```

Gets a handle to the internal metadata representation of an implemented type.

Returns: A `RuntimeTypeHandle` object.

#### Remarks
A type handle is a unique integer value associated with each type. The handle is unique during the runtime.

## TypeDelegator.UnderlyingSystemType property

```csharp
public override Type UnderlyingSystemType { get; }
```

Gets the underlying `Type` that represents the implemented type.

Returns: The underlying type.

To be added.

## TypeDelegator.GetAttributeFlagsImpl() method

```csharp
protected override System.Reflection.TypeAttributes GetAttributeFlagsImpl ();
```

Gets the attributes assigned to the `TypeDelegator`.

Returns: A `TypeAttributes` object representing the implementation attribute flags.

#### Remarks
This method can be used to determine if the `TypeDelegator` is abstract, public, and so on.

## TypeDelegator.GetConstructorImpl(BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected override System.Reflection.ConstructorInfo? GetConstructorImpl (System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Gets the constructor that implemented the `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects using reflection. If `binder` is `null`, the default binder is used.
- `callConvention`: The calling conventions.
- `types`: An array of type `Type` containing a list of the parameter number, order, and types. Types cannot be `null`; use an appropriate `GetMethod` method or an empty array to search for a method without parameters.
- `modifiers`: An array of type `ParameterModifier` having the same length as the `types` array, whose elements represent the attributes associated with the parameters of the method to get.

Returns: A `ConstructorInfo` object for the method that matches the specified criteria, or `null` if a match cannot be found.

#### Remarks
The `callConvention` parameter indicates the calling convention for the entry point. If no calling convention is specified, a default `CallingConventions` value of `Standard` is used.

## TypeDelegator.GetConstructors(BindingFlags) method

```csharp
public override System.Reflection.ConstructorInfo[] GetConstructors (System.Reflection.BindingFlags bindingAttr);
```

Returns an array of `ConstructorInfo` objects representing constructors defined for the type wrapped by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of type `ConstructorInfo` containing the specified constructors defined for this class. If no constructors are defined, an empty array is returned. Depending on the value of a specified parameter, only public constructors or both public and non-public constructors will be returned.

#### Remarks
Class initializers are available only through `GetMember`, `GetMembers`, `FindMembers`, and `GetConstructors`.

## TypeDelegator.GetCustomAttributes(Boolean) method

```csharp
public override object[] GetCustomAttributes (bool inherit);
```

Returns all the custom attributes defined for this type, specifying whether to search the type's inheritance chain.

Parameters:

- `inherit`: Specifies whether to search this type's inheritance chain to find the attributes.

Returns: An array of objects containing all the custom attributes defined for this type.

Exceptions:

- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## TypeDelegator.GetCustomAttributes(Type, Boolean) method

```csharp
public override object[] GetCustomAttributes (Type attributeType, bool inherit);
```

Returns an array of custom attributes identified by type.

Parameters:

- `attributeType`: An array of custom attributes identified by type.
- `inherit`: Specifies whether to search this type's inheritance chain to find the attributes.

Returns: An array of objects containing the custom attributes defined in this type that match the `attributeType` parameter, specifying whether to search the type's inheritance chain, or `null` if no custom attributes are defined on this type.

Exceptions:

- `ArgumentException`: `attributeType` is `null`.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## TypeDelegator.GetElementType() method

```csharp
public override Type? GetElementType ();
```

Returns the `Type` of the object encompassed or referred to by the current array, pointer or ByRef.

Returns: The `Type` of the object encompassed or referred to by the current array, pointer or `ByRef`, or `null` if the current `Type` is not an array, a pointer or a `ByRef`.

To be added.
