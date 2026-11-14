---
title: "Module class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Module.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Module class (part 2 of 4)

## Module.GetMethodImpl(String, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected virtual System.Reflection.MethodInfo? GetMethodImpl (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

Returns the method implementation in accordance with the specified criteria.

Parameters:

- `name`: The method name.
- `bindingAttr`: One of the `BindingFlags` bit flags used to control the search.
- `binder`: An object that implements `Binder`, containing properties related to this method.
- `callConvention`: The calling convention for the method.
- `types`: The parameter types to search for.
- `modifiers`: An array of parameter modifiers used to make binding work with parameter signatures in which the types have been modified.

Returns: A `MethodInfo` object containing implementation information as specified, or `null` if the method does not exist.

Exceptions:

- `AmbiguousMatchException`: `types` is `null`.

To be added.

## Module.GetMethods() method

```csharp
public System.Reflection.MethodInfo[] GetMethods ();
```

Returns the global methods defined on the module.

Returns: An array of `MethodInfo` objects representing all the global methods defined on the module; if there are no global methods, an empty array is returned.

To be added.

## Module.GetMethods(BindingFlags) method

```csharp
public virtual System.Reflection.MethodInfo[] GetMethods (System.Reflection.BindingFlags bindingFlags);
```

Returns the global methods defined on the module that match the specified binding flags.

Parameters:

- `bindingFlags`: A bitwise combination of `BindingFlags` values that limit the search.

Returns: An array of type `MethodInfo` representing the global methods defined on the module that match the specified binding flags; if no global methods match the binding flags, an empty array is returned.

To be added.

## Module.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Provides an `ISerializable` implementation for serialized objects.

Parameters:

- `info`: The information and data needed to serialize or deserialize an object.
- `context`: The context for the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Module.GetPEKind(PortableExecutableKinds, ImageFileMachine) method

```csharp
public virtual void GetPEKind (out System.Reflection.PortableExecutableKinds peKind, out System.Reflection.ImageFileMachine machine);
```

Gets a pair of values indicating the nature of the code in a module and the platform targeted by the module.

Parameters:

- `peKind`: When this method returns, a combination of the `PortableExecutableKinds` values indicating the nature of the code in the module.
- `machine`: When this method returns, one of the `ImageFileMachine` values indicating the platform targeted by the module.

To be added.

## Module.GetType(String) method

```csharp
public virtual Type? GetType (string className);
```

Returns the specified type, performing a case-sensitive search.

Parameters:

- `className`: The name of the type to locate. The name must be fully qualified with the namespace.

Returns: A `Type` object representing the given type, if the type is in this module; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `className` is `null`.
- `TargetInvocationException`: The class initializers are invoked and an exception is thrown.
- `ArgumentException`: `className` is a zero-length string.
- `FileNotFoundException`: `className` requires a dependent assembly that could not be found.
- `FileLoadException`: `className` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `className` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `className` requires a dependent assembly, but the file is not a valid assembly.

-or-

`className` requires a dependent assembly which was compiled for a version of the runtime later than the currently loaded version.

#### Remarks

> **Note:**
>  If the type has been forwarded to another assembly, it is still returned by this method. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

A type can be retrieved from a specific module using `Module.GetType`. Calling `Module.GetType` on the module that contains the manifest will not search the entire assembly. To retrieve a type from an assembly, regardless of which module it is in, you must call `Assembly.GetType`.

#### Examples
The following example displays the name of a type in the specified module.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/GetType/class1.cs._

## Module.GetType(String, Boolean) method

```csharp
public virtual Type? GetType (string className, bool ignoreCase);
```

Returns the specified type, searching the module with the specified case sensitivity.

Parameters:

- `className`: The name of the type to locate. The name must be fully qualified with the namespace.
- `ignoreCase`: `true` for case-insensitive search; otherwise, `false`.

Returns: A `Type` object representing the given type, if the type is in this module; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `className` is `null`.
- `TargetInvocationException`: The class initializers are invoked and an exception is thrown.
- `ArgumentException`: `className` is a zero-length string.
- `FileNotFoundException`: `className` requires a dependent assembly that could not be found.
- `FileLoadException`: `className` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `className` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `className` requires a dependent assembly, but the file is not a valid assembly.

-or-

`className` requires a dependent assembly which was compiled for a version of the runtime later than the currently loaded version.

#### Remarks

> **Note:**
>  If the type has been forwarded to another assembly, it is still returned by this method. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

A type can be retrieved from a specific module using `Module.GetType`. Calling `Module.GetType` on the module that contains the manifest will not search the entire assembly. To retrieve a type from an assembly, regardless of which module it is in, you must call `Assembly.GetType`.

#### Examples
The following example displays the name of a type in the specified module, specifying `false` for the `ignoreCase` parameter so that case will not be ignored.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/GetType/class11.cs._

## Module.GetType(String, Boolean, Boolean) method

```csharp
public virtual Type? GetType (string className, bool throwOnError, bool ignoreCase);
```

Returns the specified type, specifying whether to make a case-sensitive search of the module and whether to throw an exception if the type cannot be found.

Parameters:

- `className`: The name of the type to locate. The name must be fully qualified with the namespace.
- `throwOnError`: `true` to throw an exception if the type cannot be found; `false` to return `null`.
- `ignoreCase`: `true` for case-insensitive search; otherwise, `false`.

Returns: A `Type` object representing the specified type, if the type is declared in this module; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `className` is `null`.
- `TargetInvocationException`: The class initializers are invoked and an exception is thrown.
- `ArgumentException`: `className` is a zero-length string.
- `TypeLoadException`: `throwOnError` is `true`, and the type cannot be found.
- `FileNotFoundException`: `className` requires a dependent assembly that could not be found.
- `FileLoadException`: `className` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `className` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `className` requires a dependent assembly, but the file is not a valid assembly.

-or-

`className` requires a dependent assembly which was compiled for a version of the runtime later than the currently loaded version.

#### Remarks
The `throwOnError` parameter affects only what happens when the type is not found. It does not affect any other exceptions that might be thrown. In particular, if the type is found but cannot be loaded, `TypeLoadException` can be thrown even if `throwOnError` is `false`.

> **Note:**
>  If the type has been forwarded to another assembly, it is still returned by this method. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

A type can be retrieved from a specific module using `Module.GetType`. Calling `Module.GetType` on the module that contains the manifest will not search the entire assembly. To retrieve a type from an assembly, regardless of which module it is in, you must call `Assembly.GetType`.

#### Examples
The following example displays the name of a type in the specified module. The `throwOnError` and `ignoreCase` parameters are specified as `false`.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/GetType/class12.cs._

## Module.GetTypes() method

```csharp
public virtual Type[] GetTypes ();
```

Returns all the types defined within this module.

Returns: An array of type `Type` containing types defined within the module that is reflected by this instance.

Exceptions:

- `ReflectionTypeLoadException`: One or more classes in a module could not be loaded.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`ReflectionTypeLoadException` is a special load exception. The `ReflectionTypeLoadException.Types` property contains the array of types that were defined in the module and were loaded. This array may contain some null values. The `ReflectionTypeLoadException.LoaderExceptions` property is an array of exceptions that represent the exceptions that were thrown by the loader. The holes in the class array line up with the exceptions.

For example, if the class initializers of one of the classes throws an exception while it is being loaded, a `TargetInvocationException` is stored in the corresponding element of the `LoaderExceptions` array.

> **Note:**
>  If a type has been forwarded to another assembly, it is not included in the returned array. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

## Module.IsDefined(Type, Boolean) method

```csharp
public virtual bool IsDefined (Type attributeType, bool inherit);
```

Returns a value that indicates whether the specified attribute type has been applied to this module.

Parameters:

- `attributeType`: The type of custom attribute to test for.
- `inherit`: This argument is ignored for objects of this type.

Returns: `true` if one or more instances of `attributeType` have been applied to this module; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not a `Type` object supplied by the runtime. For example, `attributeType` is a `TypeBuilder` object.

#### Examples
The following example demonstrates a use of the `IsDefined` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/IsDefined/class1.cs._

## Module.IsResource() method

```csharp
public virtual bool IsResource ();
```

Gets a value indicating whether the object is a resource.

Returns: `true` if the object is a resource; otherwise, `false`.

#### Examples
The following example demonstrates a use of the `IsResource` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/IsResource/class1.cs._

## Module.op_Equality(Module, Module) method

```csharp
public static bool operator == (System.Reflection.Module? left, System.Reflection.Module? right);
```

Indicates whether two `Module` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Module.op_Inequality(Module, Module) method

```csharp
public static bool operator != (System.Reflection.Module? left, System.Reflection.Module? right);
```

Indicates whether two `Module` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Module.ResolveField(Int32) method

```csharp
public System.Reflection.FieldInfo? ResolveField (int metadataToken);
```

Returns the field identified by the specified metadata token.

Parameters:

- `metadataToken`: A metadata token that identifies a field in the module.

Returns: A `FieldInfo` object representing the field that is identified by the specified metadata token.

Exceptions:

- `ArgumentException`: `metadataToken` is not a token for a field in the scope of the current module.

-or-

`metadataToken` identifies a field whose parent `TypeSpec` has a signature containing element type `var` (a type parameter of a generic type) or `mvar` (a type parameter of a generic method).
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks
To resolve a metadata token that identifies a field whose parent `TypeSpec` has a signature containing element type `ELEMENT_TYPE_VAR` or `ELEMENT_TYPE_MVAR`, use the `ResolveField` method overload, which allows you to supply the necessary context. That is, when you are resolving a metadata token for a field that depends on the generic type parameters of the generic type and/or the generic method in which the token is embedded, you must use the overload that allows you to supply those type parameters.

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

For code that demonstrates token <example-value> using the generic context (that is, the generic type parameters of the generic type and/or the generic method in which the token is embedded) see the `ResolveMethod` method.
