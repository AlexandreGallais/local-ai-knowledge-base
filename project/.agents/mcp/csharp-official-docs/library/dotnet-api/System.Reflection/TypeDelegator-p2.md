---
title: "TypeDelegator class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeDelegator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDelegator class (part 2 of 3)

## TypeDelegator.GetEvent(String, BindingFlags) method

```csharp
public override System.Reflection.EventInfo? GetEvent (string name, System.Reflection.BindingFlags bindingAttr);
```

Returns the specified event.

Parameters:

- `name`: The name of the event to get.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An `EventInfo` object representing the event declared or inherited by this type with the specified name. This method returns `null` if no such event is found.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

#### Remarks
If `bindingAttr` is `BindingFlags`.`IgnoreCase`, the case of the `name` parameter is ignored.

## TypeDelegator.GetEvents() method

```csharp
public override System.Reflection.EventInfo[] GetEvents ();
```

Returns an array of `EventInfo` objects representing all the public events declared or inherited by the current `TypeDelegator`.

Returns: An array that contains all the events declared or inherited by the current type. If there are no events, an empty array is returned.

To be added.

## TypeDelegator.GetEvents(BindingFlags) method

```csharp
public override System.Reflection.EventInfo[] GetEvents (System.Reflection.BindingFlags bindingAttr);
```

Returns the events specified in `bindingAttr` that are declared or inherited by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of type `EventInfo` containing the events specified in `bindingAttr`. If there are no events, an empty array is returned.

To be added.

## TypeDelegator.GetField(String, BindingFlags) method

```csharp
public override System.Reflection.FieldInfo? GetField (string name, System.Reflection.BindingFlags bindingAttr);
```

Returns a `FieldInfo` object representing the field with the specified name.

Parameters:

- `name`: The name of the field to find.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: A `FieldInfo` object representing the field declared or inherited by this `TypeDelegator` with the specified name. Returns `null` if no such field is found.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

#### Remarks
Use a `bindingAttr` of `BindingFlags`.NonPublic to return all public and nonpublic fields. Use `BindingFlags.IgnoreCase` to ignore the case of the fields, as the search is case-sensitive by default.

## TypeDelegator.GetFields(BindingFlags) method

```csharp
public override System.Reflection.FieldInfo[] GetFields (System.Reflection.BindingFlags bindingAttr);
```

Returns an array of `FieldInfo` objects representing the data fields defined for the type wrapped by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of type `FieldInfo` containing the fields declared or inherited by the current `TypeDelegator`. An empty array is returned if there are no matched fields.

#### Remarks
The `TypeDelegator.GetFields` method does not return fields in a particular order, such as alphabetical or declaration order. Your code must not depend on the order in which fields are returned, because that order can vary.

Use a `bindingAttr` of `BindingFlags`.NonPublic to return all public and nonpublic fields.

## TypeDelegator.GetFunctionPointerCallingConventions() method

```csharp
public override Type[] GetFunctionPointerCallingConventions ();
```

When overridden in a derived class, returns the calling conventions of the current function pointer `Type`.

Returns: An array of `Type` objects representing all the calling conventions for the current function pointer `Type`.

-or-

An empty array of type `Type`, if no calling conventions are defined for the current function pointer `Type`.

-or-

An empty array of type `Type`, if the current function pointer `Type` is not a modified `Type`. A modified `Type` is obtained from `FieldInfo.GetModifiedFieldType`, `PropertyInfo.GetModifiedPropertyType`, or `ParameterInfo.GetModifiedParameterType`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

This method is provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace.

## TypeDelegator.GetFunctionPointerParameterTypes() method

```csharp
public override Type[] GetFunctionPointerParameterTypes ();
```

When overridden in a derived class, returns the parameter types of the current function pointer `Type`.

Returns: An array of `Type` objects representing all the parameter types for the current function pointer `Type`.

-or-

An empty array of type `Type`, if no parameters are defined for the current function pointer `Type`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

To be added.

## TypeDelegator.GetFunctionPointerReturnType() method

```csharp
public override Type GetFunctionPointerReturnType ();
```

When overridden in a derived class, returns the return type of the current function pointer `Type`.

Returns: A `Type` object representing the return type for the current function pointer `Type`.

Exceptions:

- `InvalidOperationException`: The current type is not a function pointer. That is, the `Type.IsFunctionPointer` property returns `false`.

To be added.

## TypeDelegator.GetInterface(String, Boolean) method

```csharp
public override Type? GetInterface (string name, bool ignoreCase);
```

Returns the specified interface implemented by the type wrapped by the current `TypeDelegator`.

Parameters:

- `name`: The fully qualified name of the interface implemented by the current class.
- `ignoreCase`: `true` if the case is to be ignored; otherwise, `false`.

Returns: A `Type` object representing the interface implemented (directly or indirectly) by the current class with the fully qualified name matching the specified name. If no interface that matches name is found, null is returned.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

To be added.

## TypeDelegator.GetInterfaceMap(Type) method

```csharp
public override System.Reflection.InterfaceMapping GetInterfaceMap (Type interfaceType);
```

Returns an interface mapping for the specified interface type.

Parameters:

- `interfaceType`: The `Type` of the interface to retrieve a mapping of.

Returns: An `InterfaceMapping` object representing the interface mapping for `interfaceType`.

#### Remarks
The interface map denotes how an interface is mapped into the actual methods on a class that implements that interface.

## TypeDelegator.GetInterfaces() method

```csharp
public override Type[] GetInterfaces ();
```

Returns all the interfaces implemented on the current class and its base classes.

Returns: An array of type `Type` containing all the interfaces implemented on the current class and its base classes. If none are defined, an empty array is returned.

To be added.

## TypeDelegator.GetMember(String, MemberTypes, BindingFlags) method

```csharp
public override System.Reflection.MemberInfo[] GetMember (string name, System.Reflection.MemberTypes type, System.Reflection.BindingFlags bindingAttr);
```

Returns members (properties, methods, constructors, fields, events, and nested types) specified by the given `name`, `type`, and `bindingAttr`.

Parameters:

- `name`: The name of the member to get.
- `type`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.
- `bindingAttr`: The type of members to get.

Returns: An array of type `MemberInfo` containing all the members of the current class and its base class meeting the specified criteria.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

#### Remarks
If `bindingAttr` is `BindingFlags`.NonPublic, all the members will be considered. If there are no matches, an empty array is returned.

## TypeDelegator.GetMembers(BindingFlags) method

```csharp
public override System.Reflection.MemberInfo[] GetMembers (System.Reflection.BindingFlags bindingAttr);
```

Returns members specified by `bindingAttr`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of type `MemberInfo` containing all the members of the current class and its base classes that meet the `bindingAttr` filter.

#### Remarks
If `bindingAttr` is `BindingFlags`.NonPublic, all the members will be considered. If there are no matches, an empty array is returned.

## TypeDelegator.GetMemberWithSameMetadataDefinitionAs(MemberInfo) method

```csharp
public override System.Reflection.MemberInfo GetMemberWithSameMetadataDefinitionAs (System.Reflection.MemberInfo member);
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

## TypeDelegator.GetMethodImpl(String, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected override System.Reflection.MethodInfo? GetMethodImpl (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified method whose parameters match the specified argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `name`: The method name.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects using reflection. If `binder` is `null`, the default binder is used.
- `callConvention`: The calling conventions.
- `types`: An array of type `Type` containing a list of the parameter number, order, and types. Types cannot be `null`; use an appropriate `GetMethod` method or an empty array to search for a method without parameters.
- `modifiers`: An array of type `ParameterModifier` having the same length as the `types` array, whose elements represent the attributes associated with the parameters of the method to get.

Returns: A `MethodInfoInfo` object for the implementation method that matches the specified criteria, or `null` if a match cannot be found.

#### Remarks
The `callConvention` parameter indicates the calling convention for the entry point. If no `CallingConventions` is specified, a default `CallingConventions` value of `Standard` is used.

## TypeDelegator.GetMethods(BindingFlags) method

```csharp
public override System.Reflection.MethodInfo[] GetMethods (System.Reflection.BindingFlags bindingAttr);
```

Returns an array of `MethodInfo` objects representing specified methods of the type wrapped by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of `MethodInfo` objects representing the methods defined on this `TypeDelegator`.

To be added.

## TypeDelegator.GetNestedType(String, BindingFlags) method

```csharp
public override Type? GetNestedType (string name, System.Reflection.BindingFlags bindingAttr);
```

Returns a nested type specified by `name` and in `bindingAttr` that are declared or inherited by the type represented by the current `TypeDelegator`.

Parameters:

- `name`: The nested type's name.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: A `Type` object representing the nested type.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

To be added.

## TypeDelegator.GetNestedTypes(BindingFlags) method

```csharp
public override Type[] GetNestedTypes (System.Reflection.BindingFlags bindingAttr);
```

Returns the nested types specified in `bindingAttr` that are declared or inherited by the type wrapped by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of type `Type` containing the nested types.

To be added.

## TypeDelegator.GetNullableUnderlyingType() method

```csharp
public override Type? GetNullableUnderlyingType ();
```

To be added.

Returns: To be added.

To be added.

## TypeDelegator.GetProperties(BindingFlags) method

```csharp
public override System.Reflection.PropertyInfo[] GetProperties (System.Reflection.BindingFlags bindingAttr);
```

Returns an array of `PropertyInfo` objects representing properties of the type wrapped by the current `TypeDelegator`.

Parameters:

- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.

Returns: An array of `PropertyInfo` objects representing properties defined on this `TypeDelegator`.

To be added.
