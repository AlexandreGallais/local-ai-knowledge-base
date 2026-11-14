---
title: "CustomAttributeExtensions class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeExtensions class

Namespace: `System.Reflection`

```csharp
public static class CustomAttributeExtensions
```

Contains static methods for retrieving custom attributes.

To be added.

## CustomAttributeExtensions.GetCustomAttribute(Assembly, Type) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.Assembly element, Type attributeType);
```

Retrieves a custom attribute of a specified type that is applied to a specified assembly.

Parameters:

- `element`: The assembly to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A custom attribute that matches `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute(MemberInfo, Type) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.MemberInfo element, Type attributeType);
```

Retrieves a custom attribute of a specified type that is applied to a specified member.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A custom attribute that matches `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute(Module, Type) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.Module element, Type attributeType);
```

Retrieves a custom attribute of a specified type that is applied to a specified module.

Parameters:

- `element`: The module to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A custom attribute that matches `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute(ParameterInfo, Type) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.ParameterInfo element, Type attributeType);
```

Retrieves a custom attribute of a specified type that is applied to a specified parameter.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A custom attribute that matches `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute(MemberInfo, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Retrieves a custom attribute of a specified type that is applied to a specified member, and optionally inspects the ancestors of that member.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A custom attribute that matches `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute(ParameterInfo, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (this System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Retrieves a custom attribute of a specified type that is applied to a specified parameter, and optionally inspects the ancestors of that parameter.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A custom attribute matching `attributeType`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(Assembly) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.Assembly element) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified assembly.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The assembly to inspect.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(MemberInfo) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.MemberInfo element) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified member.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The member to inspect.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(Module) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.Module element) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified module.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The module to inspect.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(ParameterInfo) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.ParameterInfo element) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified parameter.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The parameter to inspect.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(MemberInfo, Boolean) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.MemberInfo element, bool inherit) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified member, and optionally inspects the ancestors of that member.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The member to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttribute<T>(ParameterInfo, Boolean) method

```csharp
public static T? GetCustomAttribute<T> (this System.Reflection.ParameterInfo element, bool inherit) where T : Attribute;
```

Retrieves a custom attribute of a specified type that is applied to a specified parameter, and optionally inspects the ancestors of that parameter.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The parameter to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A custom attribute that matches `T`, or `null` if no such attribute is found.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
Use the `CustomAttributeExtensions.GetCustomAttributes` extension method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

## CustomAttributeExtensions.GetCustomAttributes(Assembly) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.Assembly element);
```

Retrieves a collection of custom attributes that are applied to a specified assembly.

Parameters:

- `element`: The assembly to inspect.

Returns: A collection of the custom attributes that are applied to `element`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(MemberInfo) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.MemberInfo element);
```

Retrieves a collection of custom attributes that are applied to a specified member.

Parameters:

- `element`: The member to inspect.

Returns: A collection of the custom attributes that are applied to `element`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(Module) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.Module element);
```

Retrieves a collection of custom attributes that are applied to a specified module.

Parameters:

- `element`: The module to inspect.

Returns: A collection of the custom attributes that are applied to `element`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(ParameterInfo) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.ParameterInfo element);
```

Retrieves a collection of custom attributes that are applied to a specified parameter.

Parameters:

- `element`: The parameter to inspect.

Returns: A collection of the custom attributes that are applied to `element`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.
