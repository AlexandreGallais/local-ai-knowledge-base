---
title: "CustomAttributeExtensions class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeExtensions class (part 2 of 3)

## CustomAttributeExtensions.GetCustomAttributes(Assembly, Type) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.Assembly element, Type attributeType);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified assembly.

Parameters:

- `element`: The assembly to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(MemberInfo, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.MemberInfo element, bool inherit);
```

Retrieves a collection of custom attributes that are applied to a specified member, and optionally inspects the ancestors of that member.

Parameters:

- `element`: The member to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element` that match the specified criteria, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(MemberInfo, Type) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.MemberInfo element, Type attributeType);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified member.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(Module, Type) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.Module element, Type attributeType);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified module.

Parameters:

- `element`: The module to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(ParameterInfo, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.ParameterInfo element, bool inherit);
```

Retrieves a collection of custom attributes that are applied to a specified parameter, and optionally inspects the ancestors of that parameter.

Parameters:

- `element`: The parameter to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(ParameterInfo, Type) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.ParameterInfo element, Type attributeType);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified parameter.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(MemberInfo, Type, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified member, and optionally inspects the ancestors of that member.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes(ParameterInfo, Type, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<Attribute> GetCustomAttributes (this System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified parameter, and optionally inspects the ancestors of that parameter.

Parameters:

- `element`: The parameter to inspect.
- `attributeType`: The type of attribute to search for.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element` and that match `attributeType`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(Assembly) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.Assembly element) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified assembly.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The assembly to inspect.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(MemberInfo) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.MemberInfo element) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified member.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The member to inspect.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(Module) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.Module element) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified module.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The module to inspect.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(ParameterInfo) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.ParameterInfo element) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified parameter.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The parameter to inspect.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(MemberInfo, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.MemberInfo element, bool inherit) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified member, and optionally inspects the ancestors of that member.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The member to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.GetCustomAttributes<T>(ParameterInfo, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetCustomAttributes<T> (this System.Reflection.ParameterInfo element, bool inherit) where T : Attribute;
```

Retrieves a collection of custom attributes of a specified type that are applied to a specified parameter, and optionally inspects the ancestors of that parameter.

Parameters:

- `T`: The type of attribute to search for.
- `element`: The parameter to inspect.
- `inherit`: `true` to inspect the ancestors of `element`; otherwise, `false`.

Returns: A collection of the custom attributes that are applied to `element` and that match `T`, or an empty collection if no such attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

To be added.

## CustomAttributeExtensions.IsDefined(Assembly, Type) method

```csharp
public static bool IsDefined (this System.Reflection.Assembly element, Type attributeType);
```

Indicates whether custom attributes of a specified type are applied to a specified assembly.

Parameters:

- `element`: The assembly to inspect.
- `attributeType`: The type of the attribute to search for.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.

## CustomAttributeExtensions.IsDefined(MemberInfo, Type) method

```csharp
public static bool IsDefined (this System.Reflection.MemberInfo element, Type attributeType);
```

Indicates whether custom attributes of a specified type are applied to a specified member.

Parameters:

- `element`: The member to inspect.
- `attributeType`: The type of attribute to search for.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.

To be added.

## CustomAttributeExtensions.IsDefined(Module, Type) method

```csharp
public static bool IsDefined (this System.Reflection.Module element, Type attributeType);
```

Indicates whether custom attributes of a specified type are applied to a specified module.

Parameters:

- `element`: The module to inspect.
- `attributeType`: The type of attribute to search for.

Returns: `true` if an attribute of the specified type is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

To be added.
