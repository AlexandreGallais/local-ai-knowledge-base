---
title: "Delegate class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate class

Namespace: `System`

```csharp
public abstract class Delegate : ICloneable, System.Runtime.Serialization.ISerializable
```

Represents a delegate, which is a data structure that refers to a static method or to a class instance and an instance method of that class.

#### Remarks
The `Delegate` class is the base class for delegate types. However, only the system and compilers can derive explicitly from the `Delegate` class or from the `MulticastDelegate` class. It is also not permissible to derive a new type from a delegate type. The `Delegate` class is not considered a delegate type; it is a class used to derive delegate types.

Most languages implement a `delegate` keyword, and compilers for those languages are able to derive from the `MulticastDelegate` class; therefore, users should use the `delegate` keyword provided by the language.

> **Note:**
> The common language runtime provides an `Invoke` method for each delegate type, with the same signature as the delegate. You don't have to call this method explicitly from C# or Visual Basic <example-value> the compilers call it automatically. The `Invoke` method is useful in reflection when you want to find the signature of the delegate type.

The common language runtime provides each delegate type with `BeginInvoke` and `EndInvoke` methods, to enable asynchronous invocation of the delegate. For more information about these methods, see Calling Synchronous Methods Asynchronously.

The declaration of a delegate type establishes a contract that specifies the signature of one or more methods. A delegate is an instance of a delegate type that has references to:

- An instance method of a type and a target object assignable to that type.
- An instance method of a type, with the hidden `this` parameter exposed in the formal parameter list. The delegate is said to be an open instance delegate.
- A static method.
- A static method and a target object assignable to the first parameter of the method. The delegate is said to be closed over its first argument.

For more information on delegate binding, see the `CreateDelegate` method overload.

When a delegate represents an instance method closed over its first argument (the most common case), the delegate stores a reference to the method's entry point and a reference to an object, called the target, which is of a type assignable to the type that defined the method. When a delegate represents an open instance method, it stores a reference to the method's entry point. The delegate signature must include the hidden `this` parameter in its formal parameter list; in this case, the delegate does not have a reference to a target object, and a target object must be supplied when the delegate is invoked.

When a delegate represents a static method, the delegate stores a reference to the method's entry point. When a delegate represents a static method closed over its first argument, the delegate stores a reference to the method's entry point and a reference to a target object assignable to the type of the method's first argument. When the delegate is invoked, the first argument of the static method receives the target object. This first argument must be a reference type.

The invocation list of a delegate is an ordered set of delegates in which each element of the list invokes exactly one of the methods represented by the delegate. An invocation list can contain duplicate methods. During an invocation, methods are invoked in the order in which they appear in the invocation list. A delegate attempts to invoke every method in its invocation list; duplicates are invoked once for each time they appear in the invocation list. Delegates are immutable; once created, the invocation list of a delegate does not change.

Delegates are referred to as multicast, or combinable, because a delegate can invoke one or more methods and can be used in combining operations.

Combining operations, such as `Delegate.Combine` and `Delegate.Remove`, do not alter existing delegates. Instead, such an operation returns a new delegate that contains the results of the operation, an unchanged delegate, or `null`. A combining operation returns `null` when the result of the operation is a delegate that does not reference at least one method. A combining operation returns an unchanged delegate when the requested operation has no effect.

> **Note:**
> Managed languages use the `Delegate.Combine` and `Delegate.Remove` methods to implement delegate operations. Examples include the `AddHandler` and `RemoveHandler` statements in Visual Basic and the += and -= operators on delegate types in C#.

Generic delegate types can have variant type parameters. Contravariant type parameters can be used as parameter types of the delegate, and a covariant type parameter can be used as the return type. This feature allows generic delegate types that are constructed from the same generic type definition to be assignment-compatible if their type arguments are reference types with an inheritance relationship, as explained in Covariance and Contravariance.

> **Note:**
> Generic delegates that are assignment-compatible because of variance are not necessarily combinable. To be combinable, the types must match exactly. For example, suppose that a class named `Derived` is derived from a class named `Base`. A delegate of type `Action<Base>` (`Action(Of Base)` in Visual Basic) can be assigned to a variable of type `Action<Derived>`, but the two delegates cannot be combined because the types do not match exactly.

If an invoked method throws an exception, the method stops executing, the exception is passed back to the caller of the delegate, and remaining methods in the invocation list are not invoked. Catching the exception in the caller does not alter this behavior.

When the signature of the methods invoked by a delegate includes a return value, the delegate returns the return value of the last element in the invocation list. When the signature includes a parameter that is passed by reference, the final value of the parameter is the result of every method in the invocation list executing sequentially and updating the parameter's value.

The closest equivalent of a delegate in C is a function pointer. A delegate can represent a static method or an instance method. When the delegate represents an instance method, the delegate stores not only a reference to the method's entry point, but also a reference to the class instance. Unlike function pointers, delegates are object oriented and type safe.

#### CreateDelegate examples

The `Delegate.CreateDelegate` methods create a delegate of a specified type.

#### `CreateDelegate` method

This method overload is equivalent to calling the `CreateDelegate` method overload and specifying `true` for `throwOnBindFailure`.

#### Examples

This section contains two code examples. The first example demonstrates the two kinds of delegates that can be created with this method overload: open over an instance method and open over a static method.

The second code example demonstrates compatible parameter types and return types.

##### Example 1

The following code example demonstrates the two ways a delegate can be created using this overload of the `Delegate.CreateDelegate` method.

> **Note:**
> There are two overloads of the `Delegate.CreateDelegate` method that specify a `MethodInfo` but not a first argument; their functionality is the same except that one allows you to specify whether to throw on failure to bind, and the other always throws. This code example uses both overloads.

The example declares a class `C` with a static method `M2` and an instance method `M1`, and two delegate types: `D1` takes an instance of `C` and a string, and `D2` takes a string.

A second class named `Example` contains the code that creates the delegates.

- A delegate of type `D1`, representing an open instance method, is created for the instance method `M1`. An instance must be passed when the delegate is invoked.
- A delegate of type `D2`, representing an open static method, is created for the static method `M2`.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/openClosedOver.cs._

##### Example 2

The following code example demonstrates compatibility of parameter types and return types.

The code example defines a base class named `Base` and a class named `Derived` that derives from `Base`. The derived class has a `static` (`Shared` in Visual Basic) method named `MyMethod` with one parameter of type `Base` and a return type of `Derived`. The code example also defines a delegate named `Example` that has one parameter of type `Derived` and a return type of `Base`.

The code example demonstrates that the delegate named `Example` can be used to represent the method `MyMethod`. The method can be bound to the delegate because:

- The parameter type of the delegate (`Derived`) is more restrictive than the parameter type of `MyMethod` (`Base`), so that it is always safe to pass the argument of the delegate to `MyMethod`.
- The return type of `MyMethod` (`Derived`) is more restrictive than the parameter type of the delegate (`Base`), so that it is always safe to cast the return type of the method to the return type of the delegate.

The code example produces no output.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/source1.cs._

#### `CreateDelegate` and `CreateDelegate` methods

The functionality of these two overloads is the same except that one allows you to specify whether to throw on failure to bind, and the other always throws.

The delegate type and the method must have compatible return types. That is, the return type of `method` must be assignable to the return type of `type`.

`firstArgument`, the second parameter to these overloads, is the first argument of the method the delegate represents. If `firstArgument` is supplied, it is passed to `method` every time the delegate is invoked; `firstArgument` is said to be bound to the delegate, and the delegate is said to be closed over its first argument. If `method` is `static` (`Shared` in Visual Basic), the argument list supplied when invoking the delegate includes all parameters except the first; if `method` is an instance method, then `firstArgument` is passed to the hidden instance parameter (represented by `this` in C#, or by `Me` in Visual Basic).

If `firstArgument` is supplied, the first parameter of `method` must be a reference type, and `firstArgument` must be compatible with that type.

> **Important:**
> If `method` is `static` (`Shared` in Visual Basic) and its first parameter is of type `Object` or `ValueType`, then `firstArgument` can be a value type. In this case `firstArgument` is automatically boxed. Automatic boxing does not occur for any other arguments, as it would in a C# or Visual Basic <example-value> call.

If `firstArgument` is a null reference and `method` is an instance method, the result depends on the signatures of the delegate type `type` and of `method`:

- If the signature of `type` explicitly includes the hidden first parameter of `method`, the delegate is said to represent an open instance method. When the delegate is invoked, the first argument in the argument list is passed to the hidden instance parameter of `method`.
- If the signatures of `method` and `type` match (that is, all parameter types are compatible), then the delegate is said to be closed over a null reference. Invoking the delegate is like calling an instance method on a null instance, which is not a particularly useful thing to do.

If `firstArgument` is a null reference and `method` is static, the result depends on the signatures of the delegate type `type` and of `method`:

- If the signature of `method` and `type` match (that is, all parameter types are compatible), the delegate is said to represent an open static method. This is the most common case for static methods. In this case, you can get slightly better performance by using the `CreateDelegate` method overload.
- If the signature of `type` begins with the second parameter of `method` and the rest of the parameter types are compatible, then the delegate is said to be closed over a null reference. When the delegate is invoked, a null reference is passed to the first parameter of `method`.

#### Example

The following code example shows all the methods a single delegate type can represent: closed over an instance method, open over an instance method, open over a static method, and closed over a static method.

The code example defines two classes, `C` and `F`, and a delegate type `D` with one argument of type `C`. The classes have matching static and instance methods `M1`, `M3`, and `M4`, and class `C` also has an instance method `M2` that has no arguments.

A third class named `Example` contains the code that creates the delegates.

- Delegates are created for instance method `M1` of type `C` and type `F`; each is closed over an instance of the respective type. Method `M1` of type `C` displays the `ID` properties of the bound instance and of the argument.
- A delegate is created for method `M2` of type `C`. This is an open instance delegate, in which the argument of the delegate represents the hidden first argument on the instance method. The method has no other arguments. It is called as if it were a static method.
- Delegates are created for static method `M3` of type `C` and type `F`; these are open static delegates.
- Finally, delegates are created for static method `M4` of type `C` and type `F`; each method has the declaring type as its first argument, and an instance of the type is supplied, so the delegates are closed over their first arguments. Method `M4` of type `C` displays the `ID` properties of the bound instance and of the argument.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/source.cs._

#### Compatible parameter types and return type

The parameter types and return type of a delegate created using this method overload must be compatible with the parameter types and return type of the method the delegate represents; the types do not have to match exactly.

A parameter of a delegate is compatible with the corresponding parameter of a method if the type of the delegate parameter is more restrictive than the type of the method parameter, because this guarantees that an argument passed to the delegate can be passed safely to the method.

Similarly, the return type of a delegate is compatible with the return type of a method if the return type of the method is more restrictive than the return type of the delegate, because this guarantees that the return value of the method can be cast safely to the return type of the delegate.

For example, a delegate with a parameter of type `Hashtable` and a return type of `Object` can represent a method with a parameter of type `Object` and a return value of type `Hashtable`.
