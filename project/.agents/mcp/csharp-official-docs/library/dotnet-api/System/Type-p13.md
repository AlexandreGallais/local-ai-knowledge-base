---
title: "Type class (part 13 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 13 of 33)

## Type.GetInterface(String, Boolean) method

```csharp
public abstract Type? GetInterface (string name, bool ignoreCase);
```

When overridden in a derived class, searches for the specified interface, specifying whether to do a case-insensitive search for the interface name.

Parameters:

- `name`: The string containing the name of the interface to get. For generic interfaces, this is the mangled name.
- `ignoreCase`: `true` to ignore the case of that part of `name` that specifies the simple interface name (the part that specifies the namespace must be correctly cased).

-or-

`false` to perform a case-sensitive search for all parts of `name`.

Returns: An object representing the interface with the specified name, implemented or inherited by the current `Type`, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `AmbiguousMatchException`: The current `Type` represents a type that implements the same generic interface with different type arguments.

#### Remarks
The `ignoreCase` parameter applies only to the simple interface name, not to the namespace. The portion of `name` that specifies the namespace must have the correct case, or the interface will not be found. For example, the string "System.icomparable" finds the `IComparable` interface, but the string "system.icomparable" does not.

If the current `Type` represents a constructed generic type, this method returns the `Type` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the interface constraints and any interfaces inherited from class or interface constraints.

> **Note:**
> For generic interfaces, the `name` parameter is the mangled name, ending with a grave accent (\`) and the number of type parameters. This is true for both generic interface definitions and constructed generic interfaces. For example, to find `IExample<T>` (`IExample(Of T)` in Visual Basic) or `IExample<string>` (`IExample(Of String)` in Visual Basic), search for ``"IExample`1"``.

#### Examples
The following code example uses the `GetInterface` method to perform a case-insensitive search of the `Hashtable` class for the `IEnumerable` interface.

The code example also demonstrates the `GetInterface` method overload and the `Type.GetInterfaceMap` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetInterface/type_getinterface.cs._

## Type.GetInterfaceMap(Type) method

```csharp
public virtual System.Reflection.InterfaceMapping GetInterfaceMap (Type interfaceType);
```

Returns an interface mapping for the specified interface type.

Parameters:

- `interfaceType`: The interface type to retrieve a mapping for.

Returns: An object that represents the interface mapping for `interfaceType`.

Exceptions:

- `ArgumentException`: `interfaceType` is not implemented by the current type.

-or-

The `interfaceType` argument does not refer to an interface.

-or-

The current instance or `interfaceType` argument is an open generic type; that is, the `Type.ContainsGenericParameters` property returns `true`.

-or-

`interfaceType` is a generic interface, and the current type is an array type.
- `ArgumentNullException`: `interfaceType` is `null`.
- `InvalidOperationException`: The current `Type` represents a generic type parameter; that is, `Type.IsGenericParameter` is `true`.
- `NotSupportedException`: The invoked method is not supported in the base class. Derived classes must provide an implementation.

#### Remarks
The interface map denotes how an interface is mapped into the actual members on a class that implements that interface.

If the current `Type` represents a constructed generic type, type parameters are replaced by the appropriate type arguments in the elements of the `InterfaceMapping` returned by this method.

#### Examples
The following example calls the `Type.GetInterfaceMap` method to determine how the `IFormatProvider` interface maps to `CultureInfo` methods, and how the `IAppDomainSetup` interface maps to `AppDomainSetup` properties. Note that, because the `IAppDomainSetup` interface defines a set of properties, the returned `InterfaceMapping` object includes separate `MethodInfo` objects for a property's get and set accessors.

_Code sample not included: ~/snippets/csharp/System/Type/GetInterfaceMap/interfacemapping1.cs._

## Type.GetInterfaces() method

```csharp
public abstract Type[] GetInterfaces ();
```

When overridden in a derived class, gets all the interfaces implemented or inherited by the current `Type`.

Returns: An array of `Type` objects representing all the interfaces implemented or inherited by the current `Type`.

-or-

An empty array of type `Type`, if no interfaces are implemented or inherited by the current `Type`.

Exceptions:

- `TargetInvocationException`: A static initializer is invoked and throws an exception.

#### Remarks
The `Type.GetInterfaces` method returns interfaces in a deterministic order based upon the metadata ordering in the assembly.

If the current `Type` represents a constructed generic type, this method returns the `Type` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the interface constraints and any interfaces inherited from class or interface constraints.

#### Examples
The following example gets the type of the specified class and displays all the interfaces that the type implements or inherits. To compile the Visual Basic <example-value>, use the following compiler commands:

`vbc type_getinterfaces1.vb /r:System.Web.dll /r:System.dll`

_Code sample not included: ~/snippets/csharp/System/Type/GetInterfaces/type_getinterfaces1.cs._

## Type.GetMember(String) method

```csharp
public System.Reflection.MemberInfo[] GetMember (string name);
```

Searches for the public members with the specified name.

Parameters:

- `name`: The string containing the name of the public members to get.

Returns: An array of `MemberInfo` objects representing the public members with the specified name, if found; otherwise, an empty array.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
The search for `name` is case-sensitive. The search includes public static and public instance members.

Members include properties, methods, fields, events, and so on.

The `Type.GetMember` method returns members in a deterministic order based upon the metadata ordering in the assembly.

This method overload will not find class initializers (static constructor). To find class initializers, use an overload that takes `BindingFlags`, and specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

The following table shows what members of a base class are returned by the `Get` methods when reflecting on a type.

|Member Type|Static|Non-Static|
|-----------------|------------|-----------------|
|Constructor|No|No|
|Field|No|Yes. A field is always hide-by-name-and-signature.|
|Event|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|
|Method|No|Yes. A method (both virtual and non-virtual) can be hide-by-name or hide-by-name-and-signature.|
|Nested Type|No|No|
|Property|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|

1. Hide-by-name-and-signature considers all of the parts of the signature, including custom modifiers, return types, parameter types, sentinels, and unmanaged calling conventions. This is a binary comparison.

2. For reflection, properties and events are hide-by-name-and-signature. If you have a property with both a get and a set accessor in the base class, but the derived class has only a get accessor, the derived class property hides the base class property, and you will not be able to access the setter on the base class.

3. Custom attributes are not part of the common type system.

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example displays all the members of the `String` class that start with the letter C.

_Code sample not included: ~/snippets/csharp/System/Type/GetMember/type_getmember.cs._

## Type.GetMember(String, BindingFlags) method

```csharp
public virtual System.Reflection.MemberInfo[] GetMember (string name, System.Reflection.BindingFlags bindingAttr);
```

Searches for the specified members, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the members to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `MemberInfo` objects representing the public members with the specified name, if found; otherwise, an empty array.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
This method can be overridden by a derived class.

Members include properties, methods, fields, events, and so on.

The `Type.GetMember` method returns members in a deterministic order based upon the metadata ordering in the assembly.

The following `BindingFlags` filter flags can be used to define which members to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public members in the search.

- Specify `BindingFlags.NonPublic` to include non-public members (that is, private, internal, and protected members) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the members declared on the `Type`, not members that were simply inherited.

See `BindingFlags` for more information.

To get the class initializer (static constructor) using this method overload, you must specify "static constructor" for `name`, and `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic) for `bindingAttr`. You can also get the class initializer using the `TypeInitializer` property.

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example displays all the public static members of the `myString` class that start with the letter C.

_Code sample not included: ~/snippets/csharp/System/Type/GetMember/type_getmember.cs._
