---
title: "MethodBase class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodBase class (part 3 of 4)

## MethodBase.GetGenericArguments() method

```csharp
public virtual Type[] GetGenericArguments ();
```

Returns an array of `Type` objects that represent the type arguments of a generic method or the type parameters of a generic method definition.

Returns: An array of `Type` objects that represent the type arguments of a generic method or the type parameters of a generic method definition. Returns an empty array if the current method is not a generic method.

Exceptions:

- `NotSupportedException`: This method is not overridden in a derived class.

#### Remarks
The elements of the returned array are in the order in which they appear in the list of type parameters for the generic method.

- If the current method is a closed constructed method (that is, the `ContainsGenericParameters` property returns `false`), the array returned by the `MethodBase.GetGenericArguments` method contains the types that have been assigned to the generic type parameters of the generic method definition.
- If the current method is a generic method definition, the array contains the type parameters.
- If the current method is an open constructed method (that is, the `ContainsGenericParameters` property returns `true`) in which specific types have been assigned to some type parameters and type parameters of enclosing generic types have been assigned to other type parameters, the array contains both types and type parameters. Use the `IsGenericParameter` property to tell them apart. For a demonstration of this scenario, see the code example provided for the `ContainsGenericParameters` property.
- If the current method is a constructor, the returned array is an empty array in .NET 11 and later. In .NET 10 and earlier versions, the `MethodBase.GetGenericArguments` method throws `NotSupportedException`.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

## MethodBase.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## MethodBase.GetMethodBody() method

```csharp
public virtual System.Reflection.MethodBody? GetMethodBody ();
```

When overridden in a derived class, gets a `MethodBody` object that provides access to the MSIL stream, local variables, and exceptions for the current method.

Returns: A `MethodBody` object that provides access to the MSIL stream, local variables, and exceptions for the current method.

Exceptions:

- `InvalidOperationException`: This method is invalid unless overridden in a derived class.

#### Remarks
You do not have to override the `MethodBase.GetMethodBody` in order to use it. You can call the `MethodBase.GetMethodBody` method on `MethodInfo` and `ConstructorInfo` objects, because the method is overridden in the runtime versions of these classes. For example, the runtime version of the `MethodInfo` class derives from the `MethodInfo` class, which in turn derives from the `MethodBase` class.

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method.

The `LocalVariables` property is used to obtain a list of `LocalVariableInfo` objects and display their types and index order. The `ExceptionHandlingClauses` property is used to obtain a list of exception-handling clauses.

> **Note:**
> Not all computer languages can generate `Filter` clauses. The Visual Basic <example-value> shows a filter clause, using a Visual Basic `When` expression, which is omitted from the examples for other languages.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBase.GetMethodFromHandle(RuntimeMethodHandle) method

```csharp
public static System.Reflection.MethodBase? GetMethodFromHandle (RuntimeMethodHandle handle);
```

Gets method information by using the method's internal metadata representation (handle).

Parameters:

- `handle`: The method's handle.

Returns: A `MethodBase` containing information about the method.

Exceptions:

- `ArgumentException`: `handle` is invalid.

To be added.

## MethodBase.GetMethodFromHandle(RuntimeMethodHandle, RuntimeTypeHandle) method

```csharp
public static System.Reflection.MethodBase? GetMethodFromHandle (RuntimeMethodHandle handle, RuntimeTypeHandle declaringType);
```

Gets a `MethodBase` object for the constructor or method represented by the specified handle, for the specified generic type.

Parameters:

- `handle`: A handle to the internal metadata representation of a constructor or method.
- `declaringType`: A handle to the generic type that defines the constructor or method.

Returns: A `MethodBase` object representing the method or constructor specified by `handle`, in the generic type specified by `declaringType`.

Exceptions:

- `ArgumentException`: `handle` is invalid.

#### Remarks

A `RuntimeMethodHandle` structure for a constructor or method of a generic type can represent different `MethodBase` objects, depending on the types specified for the type parameters of the generic type. For example, if `class G<T>` (`class G(Of T)` in Visual Basic) has a method that returns type `T`, the `MethodBase` object for that method in a constructed class such as `G<int>` is different from the `MethodBase` object for that method in the generic type definition.

## MethodBase.GetMethodImplementationFlags() method

```csharp
public abstract System.Reflection.MethodImplAttributes GetMethodImplementationFlags ();
```

When overridden in a derived class, returns the `MethodImplAttributes` flags.

Returns: The `MethodImplAttributes` flags.

#### Examples
The following example defines a constructor in a dynamic assembly and then uses the `MethodBase.GetMethodImplementationFlags` method to display the method implementation flags that are set by default.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/GetMethodImplementationFlags/constructorbuilder_getmodule_4.cs._

## MethodBase.GetParameters() method

```csharp
public abstract System.Reflection.ParameterInfo[] GetParameters ();
```

When overridden in a derived class, gets the parameters of the specified method or constructor.

Returns: An array of type `ParameterInfo` containing information that matches the signature of the method (or constructor) reflected by this `MethodBase` instance.

#### Examples
The following example uses the `MethodBase.GetParameters` method to retrieve the parameters of the `Invoke` method of a delegate.

The example defines a delegate named `MyDelegate` and an event named `ev` of type `MyDelegate`. The code in the `Main` method discovers the event signature by getting the delegate type of the event, getting the `Invoke` method of the delegate type, and then retrieving and displaying the parameters.

_Code sample not included: ~/snippets/csharp/System.Reflection/EventInfo/EventHandlerType/eventarg.cs._

## MethodBase.Invoke(Object, Object[]) method

```csharp
public object? Invoke (object? obj, object?[]? parameters);
```

Invokes the method or constructor represented by the current instance, using the specified parameters.

Parameters:

- `obj`: The object on which to invoke the method or constructor. If a method is static, this argument is ignored. If a constructor is static, this argument must be `null` or an instance of the class that defines the constructor.
- `parameters`: An argument list for the invoked method or constructor. This is an array of objects with the same number, order, and type as the parameters of the method or constructor to be invoked. If there are no parameters, `parameters` should be `null`.

If the method or constructor represented by this instance takes a `ref` parameter (`ByRef` in Visual Basic), no special attribute is required for that parameter in order to invoke the method or constructor using this function. Any object in this array that is not explicitly initialized with a value will contain the default value for that object type. For reference-type elements, this value is `null`. For value-type elements, the default value is 0, 0.0, or `false`, depending on the specific element type.

Returns: An object containing the return value of the invoked method, or `null` in the case of a constructor.

Exceptions:

- `TargetException`: The `obj` parameter is `null` and the method is not static.

-or-

The method is not declared or inherited by the class of `obj`.

-or-

A static constructor is invoked, and `obj` is neither `null` nor an instance of the class that declared the constructor.
- `ArgumentException`: The elements of the `parameters` array do not match the signature of the method or constructor reflected by this instance.
- `TargetInvocationException`: The invoked method or constructor throws an exception.

-or-

The current instance is a `DynamicMethod` that contains unverifiable code. See the "Verification" section in Remarks for `DynamicMethod`.
- `TargetParameterCountException`: The `parameters` array does not have the correct number of arguments.
- `MethodAccessException`: The caller does not have permission to execute the method or constructor that is represented by the current instance.
- `InvalidOperationException`: The type that declares the method is an open generic type. That is, the `Type.ContainsGenericParameters` property returns `true` for the declaring type.
- `NotSupportedException`: The current instance is a `MethodBuilder`.

#### Remarks
This is a convenience method that calls the `Invoke` method overload, passing `Default` for `invokeAttr` and `null` for `binder` and `culture`.

If the invoked method throws an exception, the `Exception.GetBaseException` method returns the originating exception.

To invoke a static method using its `MethodInfo` object, pass `null` for `obj`.

> **Note:**
> If this method overload is used to invoke an instance constructor, the object supplied for `obj` is reinitialized; that is, all instance initializers are executed. The return value is `null`. If a class constructor is invoked, the class is reinitialized; that is, all class initializers are executed. The return value is `null`.

If a parameter of the reflected method is a value type, and the corresponding argument in `parameters` is `null`, the runtime passes a zero-initialized instance of the value type.

#### Examples
The following code example demonstrates dynamic method lookup using reflection. Note that you cannot use the `MethodInfo` object from the base class to invoke the overridden method in the derived class, because late binding cannot resolve overrides.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/Invoke/source.cs._
