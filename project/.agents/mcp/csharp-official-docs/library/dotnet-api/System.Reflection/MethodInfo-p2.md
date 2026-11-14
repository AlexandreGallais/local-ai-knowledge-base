---
title: "MethodInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodInfo class (part 2 of 2)

## MethodInfo.GetGenericMethodDefinition() method

```csharp
public virtual System.Reflection.MethodInfo GetGenericMethodDefinition ();
```

Returns a `MethodInfo` object that represents a generic method definition from which the current method can be constructed.

Returns: A `MethodInfo` object representing a generic method definition from which the current method can be constructed.

Exceptions:

- `InvalidOperationException`: The current method is not a generic method. That is, `MethodBase.IsGenericMethod` returns `false`.
- `NotSupportedException`: This method is not supported.

#### Remarks
A generic method definition is a template from which methods can be constructed. For example, from the generic method definition `T M<T>(T t)` (expressed in C# syntax; `Function M(Of T)(ByVal tVal As T) As T` in Visual Basic) you can construct and invoke the method `int M<int>(int t)` (`Function M(Of Integer)(ByVal tVal As Integer) As Integer` in Visual Basic). Given a `MethodInfo` object representing this constructed method, the `MethodInfo.GetGenericMethodDefinition` method returns the generic method definition.

If two constructed methods are created from the same generic method definition, the `MethodInfo.GetGenericMethodDefinition` method returns the same `MethodInfo` object for both methods.

If you call `MethodInfo.GetGenericMethodDefinition` on a `MethodInfo` that already represents a generic method definition, it returns the current `MethodInfo`.

If a generic method definition includes generic parameters of the declaring type, there will be a generic method definition specific to each constructed type. For example, consider the following code:

```csharp
class B<U,V> {}
class C<T> { public B<T,S> M<S>() {...}}
```

```vb
Class B(Of U, V)
End Class
Class C(Of T)
    Public Function M(Of S)() As B(Of T, S)
        ...
    End Function
End Class
```

In the constructed type `C<int>` (`C(Of Integer)` in Visual Basic), the generic method `M` returns `B<int, S>`. In the open type `C<T>`, `M` returns `B<T, S>`. In both cases, the `IsGenericMethodDefinition` property returns `true` for the `MethodInfo` that represents `M`, so `MethodInfo.MakeGenericMethod` can be called on both `MethodInfo` objects. In the case of the constructed type, the result of calling `MethodInfo.MakeGenericMethod` is a `MethodInfo` that can be invoked. In the case of the open type, the `MethodInfo` returned by `MethodInfo.MakeGenericMethod` cannot be invoked.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

#### Examples
The following code example shows a class with a generic method and the code required to obtain a `MethodInfo` for the method, bind the method to type arguments, and get the original generic type definition back from the bound method.

This example is part of a larger example provided for the `MethodInfo.MakeGenericMethod` method.

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._

## MethodInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## MethodInfo.MakeGenericMethod(Type[]) method

```csharp
public virtual System.Reflection.MethodInfo MakeGenericMethod (params Type[] typeArguments);
```

Substitutes the elements of an array of types for the type parameters of the current generic method definition, and returns a `MethodInfo` object representing the resulting constructed method.

Parameters:

- `typeArguments`: An array of types to be substituted for the type parameters of the current generic method definition.

Returns: A `MethodInfo` object that represents the constructed method formed by substituting the elements of `typeArguments` for the type parameters of the current generic method definition.

Exceptions:

- `InvalidOperationException`: The current `MethodInfo` does not represent a generic method definition. That is, `MethodBase.IsGenericMethodDefinition` returns `false`.
- `ArgumentNullException`: `typeArguments` is `null`.

-or-

Any element of `typeArguments` is `null`.
- `ArgumentException`: The number of elements in `typeArguments` is not the same as the number of type parameters of the current generic method definition.

-or-

An element of `typeArguments` does not satisfy the constraints specified for the corresponding type parameter of the current generic method definition.
- `NotSupportedException`: This method is not supported.

#### Remarks
The `MethodInfo.MakeGenericMethod` method allows you to write code that assigns specific types to the type parameters of a generic method definition, thus creating a `MethodInfo` object that represents a particular constructed method. If the `ContainsGenericParameters` property of this `MethodInfo` object returns `true`, you can use it to invoke the method or to create a delegate to invoke the method.

Methods constructed with the `MethodInfo.MakeGenericMethod` method can be open, that is, some of their type arguments can be type parameters of enclosing generic types. You might use such open constructed methods when you generate dynamic assemblies. For example, consider the following code.

```csharp
class C
{
    T N<T,U>(T t, U u) {...}
    public V M<V>(V v)
    {
        return N<V,int>(v, 42);
    }
}
```

```vb
Class C
    Public Function N(Of T,U)(ByVal ta As T, ByVal ua As U) As T
        ...
    End Function
    Public Function M(Of V)(ByVal va As V ) As V
        Return N(Of V, Integer)(va, 42)
    End Function
End Class
```

The method body of `M` contains a call to method `N`, specifying the type parameter of `M` and the type `Int32`. The `IsGenericMethodDefinition` property returns `false` for method `N<V,int>`. The `ContainsGenericParameters` property returns `true`, so method `N<V,int>` cannot be invoked.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

#### Examples
The following code example demonstrates the properties and methods of `MethodInfo` that support the examination of generic methods. The example does the following:

- Defines a class that has a generic method.
- Creates a `MethodInfo` that represents the generic method.
- Displays properties of the generic method definition.
- Assigns type arguments to the type parameters of the `MethodInfo`, and invokes the resulting constructed generic method.
- Displays properties of the constructed generic method.
- Retrieves the generic method definition from the constructed method and compares it to the original definition.

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._

## MethodInfo.op_Equality(MethodInfo, MethodInfo) method

```csharp
public static bool operator == (System.Reflection.MethodInfo? left, System.Reflection.MethodInfo? right);
```

Indicates whether two `MethodInfo` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## MethodInfo.op_Inequality(MethodInfo, MethodInfo) method

```csharp
public static bool operator != (System.Reflection.MethodInfo? left, System.Reflection.MethodInfo? right);
```

Indicates whether two `MethodInfo` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.
