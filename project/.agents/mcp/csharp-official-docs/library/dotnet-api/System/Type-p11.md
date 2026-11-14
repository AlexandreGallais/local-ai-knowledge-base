---
title: "Type class (part 11 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 11 of 33)

## Type.GetEvents() method

```csharp
public virtual System.Reflection.EventInfo[] GetEvents ();
```

Returns all the public events that are declared or inherited by the current `Type`.

Returns: An array of `EventInfo` objects representing all the public events which are declared or inherited by the current `Type`.

-or-

An empty array of type `EventInfo`, if the current `Type` does not have public events.

#### Remarks
An event is considered public to reflection if it has at least one method or accessor that is public. Otherwise the event is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The `Type.GetEvents` method returns events in a deterministic order based upon the metadata ordering in the assembly.

This method can be overridden by a derived class.

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

If the current `Type` represents a constructed generic type, this method returns the `EventInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the events of the class constraint.

#### Examples
The following example obtains an array of `EventInfo` objects, gets all the events for a `Button` class, and displays the event names. To compile the Visual Basic <example-value>, use the following command line:

`vbc type_getevents1.vb /r:System.Windows.Forms.dll /r:System.dll`

_Code sample not included: ~/snippets/csharp/System/Type/GetEvents/type_getevents1.cs._

## Type.GetEvents(BindingFlags) method

```csharp
public abstract System.Reflection.EventInfo[] GetEvents (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for events that are declared or inherited by the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `EventInfo` objects representing all events that are declared or inherited by the current `Type` that match the specified binding constraints.

-or-

An empty array of type `EventInfo`, if the current `Type` does not have events, or if none of the events match the binding constraints.

#### Remarks
The `Type.GetEvents` method returns events in a deterministic order based upon the metadata ordering in the assembly.

The following `BindingFlags` filter flags can be used to define which events to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public events in the search.

- Specify `BindingFlags.NonPublic` to include non-public events (that is, private, internal, and protected events) in the search. Only protected and internal events on base classes are returned; private events on base classes are not returned.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.DeclaredOnly` to search only the events declared on the `Type`, not events that were simply inherited.

See `BindingFlags` for more information.

An event is considered public to reflection if it has at least one method or accessor that is public. Otherwise the event is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

If the current `Type` represents a constructed generic type, this method returns the `EventInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the events of the class constraint.

#### Examples
The following example obtains an array of `EventInfo` objects that match the specified binding flags, gets all the events for a `Button` class, and displays the event names. To compile the Visual Basic <example-value>, use the following command line:

`vbc type_getevents2.vb /r:System.Windows.Forms.dll /r:System.dll`

_Code sample not included: ~/snippets/csharp/System/Type/GetEvents/type_getevents2.cs._

## Type.GetField(String) method

```csharp
public System.Reflection.FieldInfo? GetField (string name);
```

Searches for the public field with the specified name.

Parameters:

- `name`: The string containing the name of the data field to get.

Returns: An object representing the public field with the specified name, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `NotSupportedException`: This `Type` object is a `TypeBuilder` whose `TypeBuilder.CreateType` method has not yet been called.

#### Remarks
The search for `name` is case-sensitive. The search includes public static and public instance fields.

If the current `Type` represents a constructed generic type, this method returns the `FieldInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the fields of the class constraint.

#### Examples
The following example gets the `Type` object for the specified class, obtains the `FieldInfo` object for the field, and displays the value of the field.

_Code sample not included: ~/snippets/csharp/System/Type/GetField/type_getfield.cs._

## Type.GetField(String, BindingFlags) method

```csharp
public abstract System.Reflection.FieldInfo? GetField (string name, System.Reflection.BindingFlags bindingAttr);
```

Searches for the specified field, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the data field to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: An object representing the field that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
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

The following `BindingFlags` filter flags can be used to define which fields to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public fields in the search.

- Specify `BindingFlags.NonPublic` to include non-public fields (that is, private, internal, and protected fields) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the fields declared on the `Type`, not fields that were simply inherited.

See `BindingFlags` for more information.

If the current `Type` represents a constructed generic type, this method returns the `FieldInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the fields of the class constraint.

#### Examples
The following example gets the `Type` object for the specified class, obtains the `FieldInfo` object for the field that matches the specified binding flags, and displays the value of the field.

_Code sample not included: ~/snippets/csharp/System/Type/GetField/type_getfield.cs._

## Type.GetFields() method

```csharp
public System.Reflection.FieldInfo[] GetFields ();
```

Returns all the public fields of the current `Type`.

Returns: An array of `FieldInfo` objects representing all the public fields defined for the current `Type`.

-or-

An empty array of type `FieldInfo`, if no public fields are defined for the current `Type`.

#### Remarks
The `Type.GetFields` method returns fields in a deterministic order based upon the metadata ordering in the assembly.

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

If the current `Type` represents a constructed generic type, this method returns the `FieldInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the public fields of the class constraint.

#### Examples
The following example shows a use of the `GetFields()` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetFields/fieldinfo_isspecialname.cs._
