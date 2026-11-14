---
title: "Type class (part 8 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 8 of 33)

## Type.FindInterfaces(TypeFilter, Object) method

```csharp
public virtual Type[] FindInterfaces (System.Reflection.TypeFilter filter, object? filterCriteria);
```

Returns an array of `Type` objects representing a filtered list of interfaces implemented or inherited by the current `Type`.

Parameters:

- `filter`: The delegate that compares the interfaces against `filterCriteria`.
- `filterCriteria`: The search criteria that determines whether an interface should be included in the returned array.

Returns: An array of `Type` objects representing a filtered list of the interfaces implemented or inherited by the current `Type`, or an empty array if no interfaces matching the filter are implemented or inherited by the current `Type`.

Exceptions:

- `ArgumentNullException`: `filter` is `null`.
- `TargetInvocationException`: A static initializer is invoked and throws an exception.

#### Remarks
This method can be overridden by a derived class.

The `FilterTypeName` and `FilterTypeNameIgnoreCase` delegates supplied by the `Module` class may also be used, in lieu of the `TypeFilter` delegate.

All of the interfaces implemented by this class are considered during the search, whether declared by a base class or this class itself.

This method searches the base class hierarchy, returning each of the matching interfaces each class implements as well as all the matching interfaces each of those interfaces implements (that is, the transitive closure of the matching interfaces is returned). No duplicate interfaces are returned.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, `Type.FindInterfaces` searches all the interfaces declared in the constraints on the type parameter, and all interfaces inherited through the interfaces declared in the constraints. If the current `Type` represents a type argument of a generic type, `Type.FindInterfaces` searches all the interfaces implemented by the type, whether or not they match constraints.

> **Note:**
> `Type.FindInterfaces` can return generic interfaces, even on types that are not generic. For example, a nongeneric type might implement `IEnumerable<int>` (`IEnumerable(Of Integer)` in Visual Basic).

#### Examples
The following example finds the specified interface implemented or inherited by the specified type, and then displays the interface names.

_Code sample not included: ~/snippets/csharp/System/Type/FindInterfaces/type_findinterfaces.cs._

## Type.FindMembers(MemberTypes, BindingFlags, MemberFilter, Object) method

```csharp
public virtual System.Reflection.MemberInfo[] FindMembers (System.Reflection.MemberTypes memberType, System.Reflection.BindingFlags bindingAttr, System.Reflection.MemberFilter? filter, object? filterCriteria);
```

Returns a filtered array of `MemberInfo` objects of the specified member type.

Parameters:

- `memberType`: A bitwise combination of the enumeration values that indicates the type of member to search for.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `filter`: The delegate that does the comparisons, returning `true` if the member currently being inspected matches the `filterCriteria` and `false` otherwise.
- `filterCriteria`: The search criteria that determines whether a member is returned in the array of `MemberInfo` objects.

The fields of `FieldAttributes`, `MethodAttributes`, and `MethodImplAttributes` can be used in conjunction with the `FilterAttribute` delegate supplied by this class.

Returns: A filtered array of `MemberInfo` objects of the specified member type.

-or-

An empty array if the current `Type` does not have members of type `memberType` that match the filter criteria.

Exceptions:

- `ArgumentNullException`: `filter` is `null`.

#### Remarks

This method can be overridden by a derived class.

Members include properties, methods, fields, events, and so on.

For the `FindMembers` method to successfully retrieve member information, the `bindingAttr` argument must include at least one of `Instance` and `Static`, along with at least one of `NonPublic` and `Public`.

The following `BindingFlags` filter flags can be used to define which members to include in the search:

- Specify `BindingFlags.Instance` to include instance members in the search.

- Specify `BindingFlags.Static` to include static members in the search.

- Specify `BindingFlags.Public` to include public members in the search.

- Specify `BindingFlags.NonPublic` to include non-public members (that is, private, internal, and protected members) in the search.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.DeclaredOnly` to search only the members declared on the `Type`, not members that were simply inherited.

See `BindingFlags` for more information.

To get the class initializer (static constructor) using this method, you must specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

If the current `Type` represents a type parameter of a generic type or generic method, `Type.FindMembers` processes any members declared by the class constraint and the interface constraints of the type parameter.

The `filter` argument can be a custom delegate of type `MemberFilter`, or it can be one of the following  predefined delegates:

- `FilterAttribute`, which uses a`FieldAttributes`, `MethodAttributes`, or `MethodImplAttributes` bitmask as the `filterCriteria` value.

- `FilterName`, which performs a case-sensitive comparison of each member name with the string passed to `filterCriteria`.

- `FilterNameIgnoreCase`, which performs a case-insensitive comparison of each member name with the string passed to `filterCriteria`.

#### Examples
The following example finds all the members in a class that match the specified search criteria, and then displays the matched members.

_Code sample not included: ~/snippets/csharp/System/Type/FindMembers/type_findmembers.cs._

## Type.GetArrayRank() method

```csharp
public virtual int GetArrayRank ();
```

Gets the number of dimensions in an array.

Returns: An integer that contains the number of dimensions in the current type.

Exceptions:

- `NotSupportedException`: The functionality of this method is unsupported in the base class and must be implemented in a derived class instead.
- `ArgumentException`: The current type is not an array.

#### Examples
The following example displays the number of dimensions in an array.

_Code sample not included: ~/snippets/csharp/System/Type/GetArrayRank/type_getarrayrank.cs._

## Type.GetAttributeFlagsImpl() method

```csharp
protected abstract System.Reflection.TypeAttributes GetAttributeFlagsImpl ();
```

When overridden in a derived class, implements the `Type.Attributes` property and gets a bitwise combination of enumeration values that indicate the attributes associated with the `Type`.

Returns: A `TypeAttributes` object representing the attribute set of the `Type`.

To be added.

## Type.GetConstructor(Type[]) method

```csharp
public System.Reflection.ConstructorInfo? GetConstructor (Type[] types);
```

Searches for a public instance constructor whose parameters match the types in the specified array.

Parameters:

- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the desired constructor.

-or-

An empty array of `Type` objects, to get a constructor that takes no parameters. Such an empty array is provided by the `static` field `Type.EmptyTypes`.

Returns: An object representing the public instance constructor whose parameters match the types in the parameter type array, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

#### Remarks
This method overload looks for public instance constructors and cannot be used to obtain a class initializer (static constructor). To get a class initializer, use an overload that takes `BindingFlags`, and specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

If the requested constructor is non-public, this method returns `null`.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `ConstructorInfo` with the type parameters replaced by the appropriate type arguments. If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method always returns `null`.

## Examples
The following example obtains the type of `MyClass`, gets the `ConstructorInfo` object, and displays the constructor signature.

_Code sample not included: ~/snippets/csharp/System/Type/GetConstructor/type_getconstructor.cs._

## Type.GetConstructor(BindingFlags, Type[]) method

```csharp
public System.Reflection.ConstructorInfo? GetConstructor (System.Reflection.BindingFlags bindingAttr, Type[] types);
```

Searches for a constructor whose parameters match the specified argument types, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.
-or- Default to return `null`.
- `types`: An array of Type objects representing the number, order, and type of the parameters for the constructor to get.
-or- An empty array of the type `Type` (that is, Type[] types = Array.Empty{Type}()) to get a constructor that takes no parameters.
-or- `Type.EmptyTypes`.

Returns: A `ConstructorInfo` object representing the constructor that matches the specified requirements, if found; otherwise, `null`.

To be added.

## Type.GetConstructor(BindingFlags, Binder, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.ConstructorInfo? GetConstructor (System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for a constructor whose parameters match the specified argument types and modifiers, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the constructor to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a constructor that takes no parameters.

-or-

`Type.EmptyTypes`.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the parameter type array. The default binder does not process this parameter.

Returns: A `ConstructorInfo` object representing the constructor that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.

#### Remarks
If an exact match does not exist, the `binder` will attempt to coerce the parameter types specified in the `types` array in order to select a match. If the `binder` is unable to select a match, then `null` is returned.

The following `BindingFlags` filter flags can be used to define which constructors to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public constructors in the search.

- Specify `BindingFlags.NonPublic` to include non-public constructors (that is, private, internal, and protected constructors) in the search.

See `BindingFlags` for more information.

To get the class initializer (static constructor) using this method overload, you must specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `ConstructorInfo` with the type parameters replaced by the appropriate type arguments. If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method always returns `null`.

## Examples
The following example obtains the type of `MyClass`, gets the `ConstructorInfo` object, and displays the constructor signature.

_Code sample not included: ~/snippets/csharp/System/Type/GetConstructor/type_getconstructor2.cs._
