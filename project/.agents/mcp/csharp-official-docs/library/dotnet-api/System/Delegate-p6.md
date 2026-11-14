---
title: "Delegate class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate class (part 6 of 7)

## Delegate.CreateDelegate(Type, Type, String, Boolean) method

```csharp
public static Delegate CreateDelegate (Type type, Type target, string method, bool ignoreCase);
```

Creates a delegate of the specified type that represents the specified static method of the specified class, with the specified case-sensitivity.

Parameters:

- `type`: The `Type` of delegate to create.
- `target`: The `Type` representing the class that implements `method`.
- `method`: The name of the static method that the delegate is to represent.
- `ignoreCase`: A Boolean indicating whether to ignore the case when comparing the name of the method.

Returns: A delegate of the specified type that represents the specified static method of the specified class.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`target` is not a `RuntimeType`.

-or-

`target` is an open generic type. That is, its `Type.ContainsGenericParameters` property is `true`.

-or-

`method` is not a `static` method (`Shared` method in Visual Basic).

-or-

`method` cannot be bound, for example because it cannot be found.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method creates delegates for static methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

This method overload is equivalent to calling the `CreateDelegate` method overload, specifying `true` for `throwOnBindFailure`.

## Delegate.CreateDelegate(Type, Object, String, Boolean, Boolean) method

```csharp
public static Delegate? CreateDelegate (Type type, object target, string method, bool ignoreCase, bool throwOnBindFailure);
```

Creates a delegate of the specified type that represents the specified instance method to invoke on the specified class instance, with the specified case-sensitivity and the specified behavior on failure to bind.

Parameters:

- `type`: The `Type` of delegate to create.
- `target`: The class instance on which `method` is invoked.
- `method`: The name of the instance method that the delegate is to represent.
- `ignoreCase`: A Boolean indicating whether to ignore the case when comparing the name of the method.
- `throwOnBindFailure`: `true` to throw an exception if `method` cannot be bound; otherwise, `false`.

Returns: A delegate of the specified type that represents the specified instance method to invoke on the specified class instance.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`method` is not an instance method.

-or-

`method` cannot be bound, for example because it cannot be found, and `throwOnBindFailure` is `true`.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method creates delegates for instance methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

## Delegate.CreateDelegate(Type, Type, String, Boolean, Boolean) method

```csharp
public static Delegate? CreateDelegate (Type type, Type target, string method, bool ignoreCase, bool throwOnBindFailure);
```

Creates a delegate of the specified type that represents the specified static method of the specified class, with the specified case-sensitivity and the specified behavior on failure to bind.

Parameters:

- `type`: The `Type` of delegate to create.
- `target`: The `Type` representing the class that implements `method`.
- `method`: The name of the static method that the delegate is to represent.
- `ignoreCase`: A Boolean indicating whether to ignore the case when comparing the name of the method.
- `throwOnBindFailure`: `true` to throw an exception if `method` cannot be bound; otherwise, `false`.

Returns: A delegate of the specified type that represents the specified static method of the specified class.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`target` is not a `RuntimeType`.

-or-

`target` is an open generic type. That is, its `Type.ContainsGenericParameters` property is `true`.

-or-

`method` is not a `static` method (`Shared` method in Visual Basic).

-or-

`method` cannot be bound, for example because it cannot be found, and `throwOnBindFailure` is `true`.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method creates delegates for static methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

## Delegate.DynamicInvoke(Object[]) method

```csharp
public object? DynamicInvoke (params object?[]? args);
```

Dynamically invokes (late-bound) the method represented by the current delegate.

Parameters:

- `args`: An array of objects that are the arguments to pass to the method represented by the current delegate.

-or-

`null`, if the method represented by the current delegate does not require arguments.

Returns: The object returned by the method represented by the delegate.

Exceptions:

- `TargetParameterCountException`: The `args` array does not have the correct number of arguments.
- `ArgumentException`: The elements of the `args` array do not match the signature of the delegate.
- `TargetInvocationException`: The method represented by the delegate is an instance method and the target object is `null`.

-or-

One of the encapsulated methods throws an exception.
- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

-or-

The number, order, or type of parameters listed in `args` is invalid.

#### Remarks
This method calls the `Delegate.DynamicInvokeImpl` method.

## Delegate.DynamicInvokeImpl(Object[]) method

```csharp
protected virtual object? DynamicInvokeImpl (object?[]? args);
```

Dynamically invokes (late-bound) the method represented by the current delegate.

Parameters:

- `args`: An array of objects that are the arguments to pass to the method represented by the current delegate.

-or-

`null`, if the method represented by the current delegate does not require arguments.

Returns: The object returned by the method represented by the delegate.

Exceptions:

- `TargetParameterCountException`: The `args` array does not have the correct number of arguments.
- `ArgumentException`: The elements of the `args` array do not match the signature of the delegate.
- `TargetInvocationException`: The method represented by the delegate is an instance method and the target object is `null`.

-or-

One of the encapsulated methods throws an exception.
- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

-or-

The number, order, or type of parameters listed in `args` is invalid.

#### Remarks
This method implements the `Delegate.DynamicInvoke` method.

## Delegate.EnumerateInvocationList<TDelegate>(TDelegate) method

```csharp
public static Delegate.InvocationListEnumerator<TDelegate> EnumerateInvocationList<TDelegate> (TDelegate? d) where TDelegate : Delegate;
```

Gets an enumerator for the invocation targets of this delegate.

Parameters:

- `TDelegate`: Delegate type being enumerated.
- `d`: The delegate being enumerated.

Returns: A `InvocationListEnumerator<T>` that follows the IEnumerable pattern and thus can be used in a C# 'foreach' statement to retrieve the invocation targets of this delegate without allocations. The method returns an empty enumerator for `null` delegate.

The order of the delegates returned by the enumerator is the same order in which the current delegate invokes the methods that those delegates represent.

## Delegate.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object and the current delegate are of the same type and share the same targets, methods, and invocation list.

Parameters:

- `obj`: The object to compare with the current delegate.

Returns: `true` if `obj` and the current delegate have the same targets, methods, and invocation list; otherwise, `false`.

Exceptions:

- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

#### Remarks
If the two delegates are not of the same type, they are not considered equal.

The methods and targets are compared for equality as follows:

- If the two methods being compared are both static and are the same method on the same class, the methods are considered equal and the targets are also considered equal.

- If the two methods being compared are instance methods and are the same method on the same object, the methods are considered equal and the targets are also considered equal.

- Otherwise, the methods are not considered to be equal and the targets are also not considered to be equal.

Two invocation lists are considered identical only if they have the same order and the corresponding elements from the two lists represent the same method and target.

## Delegate.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for the delegate.

Returns: A hash code for the delegate.

#### Remarks
The return value of this method must not be persisted for two reasons. First, the hash function of a class might be altered to generate a better distribution, rendering any values from the old hash function useless. Second, the default implementation of this class does not guarantee that the same value will be returned by different instances.

## Delegate.GetInvocationList() method

```csharp
public virtual Delegate[] GetInvocationList ();
```

Returns the invocation list of the delegate.

Returns: An array of delegates representing the invocation list of the current delegate.

#### Remarks
Each delegate in the array represents exactly one method.

The order of the delegates in the array is the same order in which the current delegate invokes the methods that those delegates represent.

#### Examples
The following example assigns three methods to a delegate. It then calls the  `Delegate.GetInvocationList` method to get a total count of the methods assigned to the delegate, to execute the delegates in reverse order, and to execute the methods whose name do not include the substring "File".

_Code sample not included: ~/snippets/csharp/System/Delegate/GetInvocationList/GetInvocationList1.cs._

## Delegate.GetMethodImpl() method

```csharp
protected virtual System.Reflection.MethodInfo GetMethodImpl ();
```

Gets the method represented by the current delegate.

Returns: A `MethodInfo` describing the method represented by the current delegate.

Exceptions:

- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

#### Remarks
This method implements the `Method` property.

## Delegate.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Not supported.

Parameters:

- `info`: Not supported.
- `context`: Not supported.

Exceptions:

- `NotSupportedException`: This method is not supported.
- `PlatformNotSupportedException`: In all cases.

To be added.

## Delegate.op_Equality(Delegate, Delegate) method

```csharp
public static bool operator == (Delegate? d1, Delegate? d2);
```

Determines whether the specified delegates are equal.

Parameters:

- `d1`: The first delegate to compare.
- `d2`: The second delegate to compare.

Returns: `true` if `d1` is equal to `d2`; otherwise, `false`.

#### Remarks
Two delegates of the same type with the same targets, methods, and invocation lists are considered equal.

If the two delegates are not of the same type, they are not considered equal.

The methods and targets are compared for equality as follows:

- If the two methods being compared are both static and are the same method on the same class, the methods are considered equal and the targets are also considered equal.

- If the two methods being compared are instance methods and are the same method on the same object, the methods are considered equal and the targets are also considered equal.

- Otherwise, the methods are not considered to be equal and the targets are also not considered to be equal.

Two invocation lists are considered identical if they have the same order and the corresponding elements from the two lists represent the same method and target.

The equivalent method for this operator is `Equals`

## Delegate.op_Inequality(Delegate, Delegate) method

```csharp
public static bool operator != (Delegate? d1, Delegate? d2);
```

Determines whether the specified delegates are not equal.

Parameters:

- `d1`: The first delegate to compare.
- `d2`: The second delegate to compare.

Returns: `true` if `d1` is not equal to `d2`; otherwise, `false`.

#### Remarks
Two delegates are considered not equal if they are of different types, or have different methods, different targets, or different invocation lists.

If the two delegates are not of the same type, they are not considered equal.

The methods and targets are compared for equality as follows:

- If the two methods being compared are both static and are the same method on the same class, the methods are considered equal and the targets are also considered equal.

- If the two methods being compared are instance methods and are the same method on the same object, the methods are considered equal and the targets are also considered equal.

- Otherwise, the methods are not considered to be equal and the targets are also not considered to be equal.

Two invocation lists are not equal if they have different sizes, if they are ordered differently, or if at least one element from one list represents a method or target that is different from that represented by its corresponding element in the other list.

The equivalent method for this operator is `Equals`
