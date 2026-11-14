---
title: "Type class (part 14 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 14 of 33)

## Type.GetMember(String, MemberTypes, BindingFlags) method

```csharp
public virtual System.Reflection.MemberInfo[] GetMember (string name, System.Reflection.MemberTypes type, System.Reflection.BindingFlags bindingAttr);
```

Searches for the specified members of the specified member type, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the members to get.
- `type`: The value to search for.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `MemberInfo` objects representing the public members with the specified name, if found; otherwise, an empty array.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `NotSupportedException`: A derived class must provide an implementation.

#### Remarks
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

To get the class initializer (static constructor) using this method overload, you must specify "static constructor" for `name`, `Constructor` for `type`, and  `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic) for `bindingAttr`. You can also get the class initializer using the `TypeInitializer` property.

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example displays all the methods of the `myString` class that start with the letter C.

_Code sample not included: ~/snippets/csharp/System/Type/GetMember/type_getmember.cs._

## Type.GetMembers() method

```csharp
public System.Reflection.MemberInfo[] GetMembers ();
```

Returns all the public members of the current `Type`.

Returns: An array of `MemberInfo` objects representing all the public members of the current `Type`.

-or-

An empty array of type `MemberInfo`, if the current `Type` does not have public members.

#### Remarks

Members include properties, methods, constructors, fields, events, and nested types.

The `Type.GetMembers` method returns members in a deterministic order based upon the metadata ordering in the assembly.

This method overload calls the `GetMembers` method overload, with `Public` | `Instance` | `Static` (`Public`` Or ``Instance`` Or ``Static` in Visual Basic). It will not find class initializers (static constructors). To find class initializers, call the `GetMembers` overload, and specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

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

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

#### Examples
The following code example demonstrates how to use the `GetMembers` method overload to collect information about all public members of a specified class.

_Code sample not included: ~/snippets/csharp/System/Type/GetMembers/type_getmembers1.cs._

## Type.GetMembers(BindingFlags) method

```csharp
public abstract System.Reflection.MemberInfo[] GetMembers (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the members defined for the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `MemberInfo` objects representing all members defined for the current `Type` that match the specified binding constraints.

-or-

An empty array if no members are defined for the current `Type`, or if none of the defined members match the binding constraints.

#### Remarks

Members include properties, methods, constructors, fields, events, and nested types.

For the `GetMethods(BindingFlags)` overload to successfully retrieve method information, the `bindingAttr` argument must include at least one of `Instance` and `Static`, along with at least one of `NonPublic` and `Public`. The sole exception is a method call with `NonPublic`, which returns member information about nested types.

The following `BindingFlags` filter flags can be used to define which members to include in the search:

- Specify `BindingFlags.Instance` to include instance methods.

- Specify `BindingFlags.Static` to include static methods.

- Specify `BindingFlags.Public` to include public methods in the search.

- Specify `BindingFlags.NonPublic` to include non-public methods (that is, private, internal, and protected methods) in the search. Only protected and internal methods on base classes are returned; private methods on base classes are not returned.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

- Specify `BindingFlags.Default` alone to return an empty `MethodInfo` array.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.DeclaredOnly` to search only the members declared on the `Type`, not members that were simply inherited.

See `BindingFlags` for more information.

The `Type.GetMembers` method returns members in a deterministic order based upon the metadata ordering in the assembly.

To get the class initializer (static constructor) using this method overload, you must specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

#### Examples
The following code example demonstrates how to use the `GetMembers` method overload to collect information about all public instance members of a specified class.

_Code sample not included: ~/snippets/csharp/System/Type/GetMembers/type_getmembers2.cs._

## Type.GetMemberWithSameMetadataDefinitionAs(MemberInfo) method

```csharp
public virtual System.Reflection.MemberInfo GetMemberWithSameMetadataDefinitionAs (System.Reflection.MemberInfo member);
```

Searches for the `MemberInfo` on the current `Type` that matches the specified `MemberInfo`.

Parameters:

- `member`: The `MemberInfo` to find on the current `Type`.

Returns: An object representing the member on the current `Type` that matches the specified member.

Exceptions:

- `ArgumentNullException`: `member` is `null`.
- `ArgumentException`: `member` does not match a member on the current `Type`.

#### Remarks

This method can be used to find a constructed generic member given a member from a generic type definition.

## Type.GetMethod(String) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name);
```

Searches for the public method with the specified name.

Parameters:

- `name`: The string containing the name of the public method to get.

Returns: An object that represents the public method with the specified name, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name.
- `ArgumentNullException`: `name` is `null`.

#### Remarks
The search for `name` is case-sensitive. The search includes public static and public instance methods.

If a method is overloaded and has more than one public method, the `GetMethod` method throws an `AmbiguousMatchException` exception. In the following example, an exception is thrown because there is more than one public overload of the `Int32.ToString` method. On the other hand, because the `Person.ToString` method overrides  `Object.ToString` and therefore is not overloaded, the `GetMethod` method is able to retrieve the `MethodInfo` object.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/GetMethodWithOverloads2.cs._

You can do one of the following to retrieve a specific method:

- Call the `GetMethod` method and specify a `bindingAttr` argument that uniquely identifies the method. For example, if the exception is thrown because a type has a static and an instance overload, you can specify a `bindingAttr` argument  of `Static` or `Instance`.

- Call an overload of the `Type.GetMethod` method that includes a `types` parameter which defines the types of the method's parameters.

- Call the `GetMethods` method to retrieve an array containing all of the public methods belonging to a type. You can then iterate it to identify the duplicate methods named `name`.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example gets a method named `MethodA`.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/type_getmethod1.cs._
