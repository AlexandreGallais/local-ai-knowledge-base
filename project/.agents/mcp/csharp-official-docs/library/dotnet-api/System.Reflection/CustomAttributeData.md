---
title: "CustomAttributeData class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeData class

Namespace: `System.Reflection`

```csharp
public class CustomAttributeData
```

Provides access to custom attribute data for assemblies, modules, types, members and parameters that are loaded into the reflection-only context.

#### Remarks
Code that is being examined in the reflection-only context cannot be executed, so it is not always possible to examine custom attributes by creating instances of them and then examining their properties, using methods like `Attribute.GetCustomAttributes`, `MemberInfo.GetCustomAttributes`, and so on. If the code for the attribute type itself is loaded into the reflection-only context, it cannot be executed.

The `CustomAttributeData` class allows examination of custom attributes in the reflection-only context by providing an abstraction for attributes. The members of this class can be used to obtain the positional arguments and named arguments of the attribute. Use the `ConstructorArguments` property to get a list of `CustomAttributeTypedArgument` structures that represent the positional arguments, and use the `NamedArguments` property to get a list of `CustomAttributeNamedArgument` structures that represent the named arguments.

> **Note:**
>  The `CustomAttributeNamedArgument` structure only provides information about the attribute property used to get and set the argument value. To obtain the type and value of the argument, use the `TypedValue` property to obtain a `CustomAttributeTypedArgument` structure.

When you have a `CustomAttributeTypedArgument` structure for an argument, whether named or positional, use the `ArgumentType` property to get the type and the `Value` property to get the value.

> **Note:**
>  For an array argument, the `Value` property returns a generic `ReadOnlyCollection<T>` of `CustomAttributeTypedArgument` objects. Each `CustomAttributeTypedArgument` object in the collection represents the corresponding element of the array.

`CustomAttributeData` can be used in the execution context as well as in the reflection-only context. For example, you might want to avoid loading the assembly that contains the code for a custom attribute. Using the `CustomAttributeData` class is different from using methods like `Attribute.GetCustomAttributes`:

- The properties and methods of `CustomAttributeData` only provide you with the values that were specified for the attribute instance, not the semantics of the constructor. For example, a string argument of an attribute might be converted internally to some other representation, and returned in a canonical form; or a property might have side effects when the actual attribute code is executed.

- The properties and methods of `CustomAttributeData` do not allow you to retrieve the custom attributes inherited from base classes.

To create instances of the `CustomAttributeData` class, use the `static` (`Shared` in Visual Basic) `CustomAttributeData.GetCustomAttributes` factory methods.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays information about the custom attributes that were applied to it and to the type and members it contains.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.CustomAttributeData() constructor

```csharp
protected CustomAttributeData ();
```

Initializes a new instance of the `CustomAttributeData` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `CustomAttributeData` objects.

## CustomAttributeData.AttributeType property

```csharp
public virtual Type AttributeType { get; }
```

Gets the type of the attribute.

Returns: The type of the attribute.

To be added.

## CustomAttributeData.Constructor property

```csharp
public virtual System.Reflection.ConstructorInfo Constructor { get; }
```

Gets a `ConstructorInfo` object that represents the constructor that would have initialized the custom attribute.

Returns: An object that represents the constructor that would have initialized the custom attribute represented by the current instance of the `CustomAttributeData` class.

#### Remarks
If an attribute type has multiple constructors, this property returns only the particular constructor that would have initialized the attribute instance represented by the current `CustomAttributeData` object.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `Constructor` property is used in the `ShowAttributeData` method that displays custom attribute data. In this code example, the `ConstructorInfo` returned by this property is used to display a text string that describes the constructor, demonstrating that the property returns the constructor that would initialize the attribute.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.ConstructorArguments property

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeTypedArgument> ConstructorArguments { get; }
```

Gets the list of positional arguments specified for the attribute instance represented by the `CustomAttributeData` object.

Returns: A collection of structures that represent the positional arguments specified for the custom attribute instance.

#### Remarks
This method gets the positional arguments that were specified for the custom attribute instance without executing any of the custom attribute code. Thus, it can be used in the reflection-only context.

Use the `CustomAttributeData.NamedArguments` method to get the named arguments specified for the attribute instance.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `ConstructorArguments` property is used in the `ShowAttributeData` method that displays custom attribute data. In this code example, this property is used to display the list of arguments passed to the constructor that initialized the attribute.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.NamedArguments property

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeNamedArgument> NamedArguments { get; }
```

Gets the list of named arguments specified for the attribute instance represented by the `CustomAttributeData` object.

Returns: A collection of structures that represent the named arguments specified for the custom attribute instance.

#### Remarks
This method gets the named arguments that were specified for the custom attribute instance without executing any of the custom attribute code. Thus, it can be used in the Reflection-only context.

The list that is returned contains only the named arguments that were specified for the attribute instance.

Use the `CustomAttributeData.ConstructorArguments` method to get the positional arguments that were specified for the attribute instance.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `NamedArguments` property is used in the `ShowAttributeData` method that displays custom attribute data. In this code example, this property is used to display the list of named arguments specified for the attribute.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` is equal to the current instance; otherwise, `false`.

To be added.

## CustomAttributeData.GetCustomAttributes(Assembly) method

```csharp
public static System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributes (System.Reflection.Assembly target);
```

Returns a list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target assembly.

Parameters:

- `target`: The assembly whose custom attribute data is to be retrieved.

Returns: A list of objects that represent data about the attributes that have been applied to the target assembly.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

#### Remarks
This method provides an alternative to the `Assembly.GetCustomAttributes` method that can always be used in the Reflection-only context.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `CustomAttributeData.GetCustomAttributes` method is used in `Main()` to get the custom attributes applied to the assembly. The return value of the method is passed to the `ShowAttributeData` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeData.GetCustomAttributes(MemberInfo) method

```csharp
public static System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributes (System.Reflection.MemberInfo target);
```

Returns a list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target member.

Parameters:

- `target`: The member whose attribute data is to be retrieved.

Returns: A list of objects that represent data about the attributes that have been applied to the target member.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

#### Remarks
This method overload gets custom attribute data for types, nested types, and type members, because the `Type` class and the classes in the `Reflection` namespace that represent type members all derive from `MemberInfo`.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `CustomAttributeData.GetCustomAttributes` method is used in `Main()` to get the custom attributes that were applied to a type and to a test method (`Type` derives from `MemberInfo`). The return value of `CustomAttributeData.GetCustomAttributes` is passed to the `ShowAttributeData` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._
