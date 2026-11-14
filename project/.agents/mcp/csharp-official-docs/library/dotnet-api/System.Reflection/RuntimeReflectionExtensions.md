---
title: "RuntimeReflectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/RuntimeReflectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeReflectionExtensions class

Namespace: `System.Reflection`

```csharp
public static class RuntimeReflectionExtensions
```

Provides methods that retrieve information about types at run time.

To be added.

## RuntimeReflectionExtensions.GetMethodInfo(Delegate) method

```csharp
public static System.Reflection.MethodInfo GetMethodInfo (this Delegate del);
```

Gets an object that represents the method represented by the specified delegate.

Parameters:

- `del`: The delegate to examine.

Returns: An object that represents the method.

Exceptions:

- `ArgumentNullException`: `del` is `null`.
- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

To be added.

## RuntimeReflectionExtensions.GetRuntimeBaseDefinition(MethodInfo) method

```csharp
public static System.Reflection.MethodInfo? GetRuntimeBaseDefinition (this System.Reflection.MethodInfo method);
```

Retrieves an object that represents the specified method on the direct or indirect base class where the method was first declared.

Parameters:

- `method`: The method to retrieve information about.

Returns: An object that represents the specified method's initial declaration on a base class.

Exceptions:

- `ArgumentNullException`: `method` is `null`.

To be added.

## RuntimeReflectionExtensions.GetRuntimeEvent(Type, String) method

```csharp
public static System.Reflection.EventInfo? GetRuntimeEvent (this Type type, string name);
```

Retrieves an object that represents the specified event.

Parameters:

- `type`: The type that contains the event.
- `name`: The name of the event.

Returns: An object that represents the specified event, or `null` if the event is not found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`name` is `null`.

To be added.

## RuntimeReflectionExtensions.GetRuntimeEvents(Type) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Reflection.EventInfo> GetRuntimeEvents (this Type type);
```

Retrieves a collection that represents all the events defined on a specified type.

Parameters:

- `type`: The type that contains the events.

Returns: A collection of events for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
This method returns all events defined on the specified type, including inherited, non-public, instance, and static events.

## RuntimeReflectionExtensions.GetRuntimeField(Type, String) method

```csharp
public static System.Reflection.FieldInfo? GetRuntimeField (this Type type, string name);
```

Retrieves an object that represents a specified field.

Parameters:

- `type`: The type that contains the field.
- `name`: The name of the field.

Returns: An object that represents the specified field, or `null` if the field is not found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`name` is `null`.

To be added.

## RuntimeReflectionExtensions.GetRuntimeFields(Type) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Reflection.FieldInfo> GetRuntimeFields (this Type type);
```

Retrieves a collection that represents all the fields defined on a specified type.

Parameters:

- `type`: The type that contains the fields.

Returns: A collection of fields for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
This method returns all fields that are defined on the specified type, including inherited, non-public, instance, and static fields.

## RuntimeReflectionExtensions.GetRuntimeInterfaceMap(TypeInfo, Type) method

```csharp
public static System.Reflection.InterfaceMapping GetRuntimeInterfaceMap (this System.Reflection.TypeInfo typeInfo, Type interfaceType);
```

Returns an interface mapping for the specified type and the specified interface.

Parameters:

- `typeInfo`: The type to retrieve a mapping for.
- `interfaceType`: The interface to retrieve a mapping for.

Returns: An object that represents the interface mapping for the specified interface and type.

Exceptions:

- `ArgumentNullException`: `typeInfo` is `null`.

-or-

`interfaceType` is `null`.
- `ArgumentException`: `interfaceType` is not implemented by `typeInfo`.

-or-

`interfaceType` does not refer to an interface.

-or-

`typeInfo` or `interfaceType` is an open generic type.

-or-

`interfaceType` is a generic interface, and `typeInfo` is an array type.
- `InvalidOperationException`: `typeInfo` represents a generic type parameter.
- `NotSupportedException`: `typeInfo` is a `TypeBuilder` instance whose `TypeBuilder.CreateType` method has not yet been called.

-or-

The invoked method is not supported in the base class. Derived classes must provide an implementation.

To be added.

## RuntimeReflectionExtensions.GetRuntimeMethod(Type, String, Type[]) method

```csharp
public static System.Reflection.MethodInfo? GetRuntimeMethod (this Type type, string name, Type[] parameters);
```

Retrieves an object that represents a specified method.

Parameters:

- `type`: The type that contains the method.
- `name`: The name of the method.
- `parameters`: An array that contains the method's parameters.

Returns: An object that represents the specified method, or `null` if the method is not found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`name` is `null`.
- `AmbiguousMatchException`: More than one method is found with the specified name.

To be added.

## RuntimeReflectionExtensions.GetRuntimeMethods(Type) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Reflection.MethodInfo> GetRuntimeMethods (this Type type);
```

Retrieves a collection that represents all methods defined on a specified type.

Parameters:

- `type`: The type that contains the methods.

Returns: A collection of methods for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
This method returns all methods defined on the specified type, including inherited, non-public, instance, and static methods.

## RuntimeReflectionExtensions.GetRuntimeProperties(Type) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Reflection.PropertyInfo> GetRuntimeProperties (this Type type);
```

Retrieves a collection that represents all the properties defined on a specified type.

Parameters:

- `type`: The type that contains the properties.

Returns: A collection of properties for the specified type.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
This method returns all properties defined on the specified type, including inherited, non-public, instance, and static properties.

## RuntimeReflectionExtensions.GetRuntimeProperty(Type, String) method

```csharp
public static System.Reflection.PropertyInfo? GetRuntimeProperty (this Type type, string name);
```

Retrieves an object that represents a specified property.

Parameters:

- `type`: The type that contains the property.
- `name`: The name of the property.

Returns: An object that represents the specified property, or `null` if the property is not found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`name` is `null`.
- `ArgumentException`: `type` is not a `RuntimeType`.
- `AmbiguousMatchException`: More than one property with the requested name was found.

To be added.
