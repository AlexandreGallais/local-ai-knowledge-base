---
title: "Attribute class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Attribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Attribute class (part 4 of 4)

## Attribute.IsDefined(MemberInfo, Type, Boolean) method

```csharp
public static bool IsDefined (System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Determines whether any custom attributes are applied to a member of a type. Parameters specify the member, the type of the custom attribute to search for, and whether to search ancestors of the member.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, type, or property member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id4.cs._

## Attribute.IsDefined(Module, Type, Boolean) method

```csharp
public static bool IsDefined (System.Reflection.Module element, Type attributeType, bool inherit);
```

Determines whether any custom attributes are applied to a module. Parameters specify the module, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Remarks
This method ignores the `inherit` parameter and does not search the ancestors of `element` for custom attributes.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id2.cs._

## Attribute.IsDefined(ParameterInfo, Type, Boolean) method

```csharp
public static bool IsDefined (System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Determines whether any custom attributes are applied to a method parameter. Parameters specify the method parameter, the type of the custom attribute to search for, and whether to search ancestors of the method parameter.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `ExecutionEngineException`: `element` is not a method, constructor, or type.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id5.cs._

## Attribute.Match(Object) method

```csharp
public virtual bool Match (object? obj);
```

When overridden in a derived class, returns a value that indicates whether this instance equals a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance of `Attribute`.

Returns: `true` if this instance equals `obj`; otherwise, `false`.

#### Remarks
This method determines if one `Attribute` equals another. Its default implementation is the same as `Attribute.Equals`, which determines whether two attributes are of the same type and have the same field values.

In general, the `Attribute.Equals` method is intended to perform a standard test for reference or value equality. You can override the `Attribute.Match` method when you want to perform a custom comparison for equality that is based on some criteria other than that two attribute instances are of the same type and have identical values. For example, you can override the `Attribute.Match` method to compare attributes in the following scenarios:

- An attribute includes a bit field, and you consider two attribute instances equal if a particular bit is set. For example, a `NumericDisplay` attribute might include a bit field that indicates what numeric formats (such as binary, octal, decimal, and hexadecimal) a client supports. The overridden `Attribute.Match` method might consider two instances equal if they support the same numeric format.

- An attribute includes multiple fields that contain the same kind of information, or it contains an array in which values can be in any order. For example, an `Author` attribute might include multiple fields for author names. The overridden `Attribute.Match` method might consider two instances equal if they have the same authors regardless of whether each field is equal to the corresponding field.

#### Example
The following example illustrates the use of `Attribute.Match` to create a custom comparison method for attribute values. If defines an `AuthorsAttribute` that internally contains a `List<String>` that stores authors' names. Because the names can occur in any order in the list, it overrides the `Attribute.Match` method to compare author names regardless of their position in the list. Note the `Attribute.Equals` method, which performs a test for value equality, returns different results from the `Attribute.Match` method.

_Code sample not included: ~/snippets/csharp/System/Attribute/Match/match.cs._
