---
title: "Type class (part 10 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 10 of 33)

## Type.GetDefaultMembers() method

```csharp
public virtual System.Reflection.MemberInfo[] GetDefaultMembers ();
```

Searches for the members defined for the current `Type` whose `DefaultMemberAttribute` is set.

Returns: An array of `MemberInfo` objects representing all default members of the current `Type`.

-or-

An empty array of type `MemberInfo`, if the current `Type` does not have default members.

#### Remarks
The `Type.GetDefaultMembers` method does not return members in a particular order, such as alphabetical or declaration order. Your code must not depend on the order in which members are returned, because that order varies.

This method can be overridden by a derived class.

Members include properties, methods, fields, events, and so on.

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

If the current `Type` represents a constructed generic type, this method returns the `MemberInfo` objects with the type parameters replaced by the appropriate type arguments. For example, if class `C<T>` has a property `P` that returns `T`, calling `Type.GetDefaultMembers` on `C<int>` returns `int P` in C# (`Property P As Integer` in Visual Basic).

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the members of the class constraint, or the members of `Object` if there is no class constraint.

#### Examples
The following example obtains the default member information of `MyClass` and displays the default members.

_Code sample not included: ~/snippets/csharp/System/Type/GetDefaultMembers/type_getdefaultmembers.cs._

## Type.GetElementType() method

```csharp
public abstract Type? GetElementType ();
```

When overridden in a derived class, returns the `Type` of the object encompassed or referred to by the current array, pointer or reference type.

Returns: The `Type` of the object encompassed or referred to by the current array, pointer, or reference type, or `null` if the current `Type` is not an array or a pointer, or is not passed by reference, or represents a generic type or a type parameter in the definition of a generic type or generic method.

#### Remarks
This method returns `null` for the `Array` class.

#### Examples
The following example demonstrates using the `GetElementType` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetElementType/testgetelementtype.cs._

## Type.GetEnumName(Object) method

```csharp
public virtual string? GetEnumName (object value);
```

Returns the name of the constant that has the specified value, for the current enumeration type.

Parameters:

- `value`: The value whose name is to be retrieved.

Returns: The name of the member of the current enumeration type that has the specified value, or `null` if no such constant is found.

Exceptions:

- `ArgumentException`: The current type is not an enumeration.

-or-

`value` is neither of the current type nor does it have the same underlying type as the current type.
- `ArgumentNullException`: `value` is `null`.

To be added.

## Type.GetEnumNames() method

```csharp
public virtual string[] GetEnumNames ();
```

Returns the names of the members of the current enumeration type.

Returns: An array that contains the names of the members of the enumeration.

Exceptions:

- `ArgumentException`: The current type is not an enumeration.

#### Remarks
The elements of the return value array are sorted by the binary values (that is, the unsigned values) of the enumerated constants. If the array contains enumerated constants with the same value, the order of their corresponding names is unspecified.

## Type.GetEnumUnderlyingType() method

```csharp
public virtual Type GetEnumUnderlyingType ();
```

Returns the underlying type of the current enumeration type.

Returns: The underlying type of the current enumeration.

Exceptions:

- `ArgumentException`: The current type is not an enumeration.

-or-

The enumeration type is not valid, because it contains more than one instance field.

#### Remarks
By default, the underlying type of an enumeration in C# and Visual Basic is `Int32`. Other integer types can be specified.

## Type.GetEnumValues() method

```csharp
public virtual Array GetEnumValues ();
```

Returns an array of the values of the constants in the current enumeration type.

Returns: An array that contains the values. The elements of the array are sorted by the binary values (that is, the unsigned values) of the enumeration constants.

Exceptions:

- `ArgumentException`: The current type is not an enumeration.

To be added.

## Type.GetEnumValuesAsUnderlyingType() method

```csharp
public virtual Array GetEnumValuesAsUnderlyingType ();
```

Retrieves an array of the values of the underlying type constants of this enumeration type.

Returns: An array that contains the values of the underlying type constants in this enumeration type.

Exceptions:

- `ArgumentException`: This type is not an enumeration type.

You can use this method to get enumeration values when it's hard to create an array of the enumeration type.
For example, you might use this method for the `MetadataLoadContext` enumeration or on a platform where run-time code generation is not available.

## Type.GetEvent(String) method

```csharp
public System.Reflection.EventInfo? GetEvent (string name);
```

Returns the `EventInfo` object representing the specified public event.

Parameters:

- `name`: The string containing the name of an event that is declared or inherited by the current `Type`.

Returns: The object representing the specified public event that is declared or inherited by the current `Type`, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
An event is considered public to reflection if it has at least one method or accessor that is public. Otherwise the event is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The search for `name` is case-sensitive. The search includes public static and public instance events.

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

If the current `Type` represents a constructed generic type, this method returns the `EventInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the events of the class constraint.

#### Examples
The following example creates an `EventInfo` object and gets the event for a button class for the specified event.

_Code sample not included: ~/snippets/csharp/System/Type/GetEvent/type_getevent.cs._

## Type.GetEvent(String, BindingFlags) method

```csharp
public abstract System.Reflection.EventInfo? GetEvent (string name, System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, returns the `EventInfo` object representing the specified event, using the specified binding constraints.

Parameters:

- `name`: The name of an event that is declared or inherited by the current `Type`.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: The object representing the specified event that is declared or inherited by the current `Type`, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
The following `BindingFlags` filter flags can be used to define which events to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public events in the search.

- Specify `BindingFlags.NonPublic` to include non-public events (that is, private, internal, and protected events) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the events declared on the `Type`, not events that were simply inherited.

See `BindingFlags` for more information.

An event is considered public to reflection if it has at least one method or accessor that is public. Otherwise the event is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

If the current `Type` represents a constructed generic type, this method returns the `EventInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the events of the class constraint.

#### Examples
The following code example uses the `GetEvent` method to search a type for a public or non-public event named "Click" that is not `static` (`Shared` in Visual Basic).

_Code sample not included: ~/snippets/csharp/System/Type/GetEvent/type_getevent1.cs._
