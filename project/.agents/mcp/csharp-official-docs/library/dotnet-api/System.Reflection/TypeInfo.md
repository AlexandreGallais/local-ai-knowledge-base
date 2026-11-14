---
title: "TypeInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeInfo class

Namespace: `System.Reflection`

```csharp
public abstract class TypeInfo : Type, System.Reflection.IReflectableType
```

Represents type declarations for class types, interface types, array types, value types, enumeration types, type parameters, generic type definitions, and open or closed constructed generic types.

#### Remarks

`TypeInfo` contains many of the members available in the `Type` class. To get a `TypeInfo` object from a `Type` object, use the `GetTypeInfo` extension method.

A `TypeInfo` object represents the type definition itself, whereas a `Type` object represents a reference to the type definition. Getting a `TypeInfo` object forces the assembly that contains that type to load. In comparison, you can manipulate `Type` objects without necessarily requiring the runtime to load the assembly they reference.

You can use the `DeclaredMembers` property to get all declared members, or the `DeclaredProperties` property to get all declared properties. Reflection contexts can implement lazy traversal of these collections for large assemblies or types. To get specific members, use methods such as `TypeInfo.GetDeclaredMethod` and `TypeInfo.GetDeclaredProperty`, and pass the name of the method or property you would like to retrieve.

To filter the results of `TypeInfo` properties, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

#### Examples

The following example uses the reflection types and members in .NET to retrieve the methods and properties of the `Calendar` type, including inherited methods and properties, and then writes them to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/TypeInfo/Overview/example.cs._
## TypeInfo.TypeInfo() constructor

```csharp
protected TypeInfo ();
```

Initializes a `TypeInfo` instance.

To be added.

## TypeInfo.DeclaredConstructors property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.ConstructorInfo> DeclaredConstructors { get; }
```

Gets a collection of the constructors declared by the current type.

Returns: A collection of the constructors declared by the current type.

#### Remarks
To filter the results of the `DeclaredConstructors` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

## TypeInfo.DeclaredEvents property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.EventInfo> DeclaredEvents { get; }
```

Gets a collection of the events defined by the current type.

Returns: A collection of the events defined by the current type.

#### Remarks
To filter the results of the `DeclaredEvents` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

## TypeInfo.DeclaredFields property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.FieldInfo> DeclaredFields { get; }
```

Gets a collection of the fields defined by the current type.

Returns: A collection of the fields defined by the current type.

#### Remarks
To filter the results of the `DeclaredFields` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

## TypeInfo.DeclaredMembers property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.MemberInfo> DeclaredMembers { get; }
```

Gets a collection of the members defined by the current type.

Returns: A collection of the members defined by the current type.

#### Remarks
To filter the results of the `DeclaredMembers` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

## TypeInfo.DeclaredMethods property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.MethodInfo> DeclaredMethods { get; }
```

Gets a collection of the methods defined by the current type.

Returns: A collection of the methods defined by the current type.

#### Remarks
To filter the results of the `DeclaredMethods` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

#### Examples

The following example uses the reflection types and members in .NET to retrieve the methods and properties of the `Calendar` type, including inherited methods and properties, and then writes them to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/TypeInfo/Overview/example.cs._
## TypeInfo.DeclaredNestedTypes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.TypeInfo> DeclaredNestedTypes { get; }
```

Gets a collection of the nested types defined by the current type.

Returns: A collection of nested types defined by the current type.

#### Remarks
To filter the results of the `DeclaredNestedTypes` property, use LINQ queries. For reflection objects that originate with the runtime (for example, as the result of `typeof(Object)`), you can traverse the inheritance tree by using the methods in the `RuntimeReflectionExtensions` class. Consumers of objects from customized reflection contexts cannot use these methods and must traverse the inheritance tree themselves.

## TypeInfo.DeclaredProperties property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.PropertyInfo> DeclaredProperties { get; }
```

Gets a collection of the properties defined by the current type.

Returns: A collection of the properties defined by the current type.

#### Examples

The following example uses the reflection types and members in .NET to retrieve the methods and properties of the `Calendar` type, including inherited methods and properties, and then writes them to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/TypeInfo/Overview/example.cs._
## TypeInfo.GenericTypeParameters property

```csharp
public virtual Type[] GenericTypeParameters { get; }
```

Gets an array of the generic type parameters of the current instance.

Returns: An array that contains the current instance's generic type parameters, or an array of `Array.Length` zero if the current instance has no generic type parameters.

To be added.

## TypeInfo.ImplementedInterfaces property

```csharp
public virtual System.Collections.Generic.IEnumerable<Type> ImplementedInterfaces { get; }
```

Gets a collection of the interfaces implemented by the current type.

Returns: A collection of the interfaces implemented by the current type.

To be added.

## TypeInfo.AsType() method

```csharp
public virtual Type AsType ();
```

Returns the current type as a `Type` object.

Returns: The current type.

To be added.

## TypeInfo.GetDeclaredEvent(String) method

```csharp
public virtual System.Reflection.EventInfo? GetDeclaredEvent (string name);
```

Returns an object that represents the specified event declared by the current type.

Parameters:

- `name`: The name of the event.

Returns: An object that represents the specified event, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.GetDeclaredField(String) method

```csharp
public virtual System.Reflection.FieldInfo? GetDeclaredField (string name);
```

Returns an object that represents the specified field declared by the current type.

Parameters:

- `name`: The name of the field.

Returns: An object that represents the specified field, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.GetDeclaredMethod(String) method

```csharp
public virtual System.Reflection.MethodInfo? GetDeclaredMethod (string name);
```

Returns an object that represents the specified method declared by the current type.

Parameters:

- `name`: The name of the method.

Returns: An object that represents the specified method, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.GetDeclaredMethods(String) method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.MethodInfo> GetDeclaredMethods (string name);
```

Returns a collection that contains all methods declared on the current type that match the specified name.

Parameters:

- `name`: The method name to search for.

Returns: A collection that contains methods that match `name`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.GetDeclaredNestedType(String) method

```csharp
public virtual System.Reflection.TypeInfo? GetDeclaredNestedType (string name);
```

Returns an object that represents the specified nested type declared by the current type.

Parameters:

- `name`: The name of the nested type.

Returns: An object that represents the specified nested type, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.GetDeclaredProperty(String) method

```csharp
public virtual System.Reflection.PropertyInfo? GetDeclaredProperty (string name);
```

Returns an object that represents the specified property declared by the current type.

Parameters:

- `name`: The name of the property.

Returns: An object that represents the specified property, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## TypeInfo.IsAssignableFrom(TypeInfo) method

```csharp
public virtual bool IsAssignableFrom (System.Reflection.TypeInfo? typeInfo);
```

Returns a value that indicates whether the specified type can be assigned to the current type.

Parameters:

- `typeInfo`: The type to check.

Returns: `true` if the specified type can be assigned to this type; otherwise, `false`.

To be added.

## TypeInfo.System.Reflection.IReflectableType.GetTypeInfo() method

```csharp
System.Reflection.TypeInfo IReflectableType.GetTypeInfo ();
```

Returns a representation of the current type as a `TypeInfo` object.

Returns: A reference to the current type.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `TypeInfo` instance is cast to an `IReflectableType` interface.
