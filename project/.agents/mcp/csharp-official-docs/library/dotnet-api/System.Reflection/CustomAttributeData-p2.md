---
title: "CustomAttributeData class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeData class (part 2 of 2)

## CustomAttributeData.GetCustomAttributes(Module) method

```csharp
public static System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributes (System.Reflection.Module target);
```

Returns a list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target module.

Parameters:

- `target`: The module whose custom attribute data is to be retrieved.

Returns: A list of objects that represent data about the attributes that have been applied to the target module.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

To be added.

## CustomAttributeData.GetCustomAttributes(ParameterInfo) method

```csharp
public static System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributes (System.Reflection.ParameterInfo target);
```

Returns a list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target parameter.

Parameters:

- `target`: The parameter whose attribute data is to be retrieved.

Returns: A list of objects that represent data about the attributes that have been applied to the target parameter.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

#### Remarks
This method provides an alternative to the `ParameterInfo.GetCustomAttributes` method that can always be used in the Reflection-only context.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `CustomAttributeData.GetCustomAttributes` method is used in `Main()` to retrieve the custom attributes applied to a parameter of a test method. The return value of `CustomAttributeData.GetCustomAttributes` is passed to the `ShowAttributeData` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a particular type.

Returns: A hash code for the current `Object`.

To be added.

## CustomAttributeData.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the custom attribute.

Returns: A string value that represents the custom attribute.

#### Remarks
The string value includes the attribute type, the attribute parameters, and the named parameters.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

In this example, the `CustomAttributeData.ToString` method is used in the `ShowAttributeData` method, to identify the attribute whose data is being displayed.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._
