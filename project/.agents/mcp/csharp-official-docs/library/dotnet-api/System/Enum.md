---
title: "Enum class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class

Namespace: `System`

```csharp
public abstract class Enum : ValueType, IComparable, IConvertible, ISpanFormattable
```

Provides the base class for enumerations.

An enumeration is a set of named constants whose underlying type is any integral type. If no underlying type is explicitly declared, `Int32` is used. `Enum` is the base class for all enumerations in .NET. Enumeration types are defined by the `enum` keyword in C#, the `Enum`...`End Enum` construct in Visual Basic, and the `type` keyword in F#.

`Enum` provides methods for comparing instances of this class, converting the value of an instance to its string representation, converting the string representation of a number to an instance of this class, and creating an instance of a specified enumeration and value.

You can also treat an enumeration as a bit field. For more information, see the Non-exclusive members and the Flags attribute section and `FlagsAttribute`.

#### Create an enumeration type

Programming languages typically provide syntax to declare an enumeration that consists of a set of named constants and their values. The following example illustrates the syntax used by C#, F#, and Visual Basic to define an enumeration. It creates an enumeration named `ArrivalStatus` that has three members: `ArrivalStatus.Early`, `ArrivalStatus.OnTime`, and `ArrivalStatus.Late`. Note that in all cases, the enumeration does not explicitly inherit from `Enum`; the inheritance relationship is handled implicitly by the compiler.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class1.cs._

> **Warning:**
> You should never create an enumeration type whose underlying type is non-integral or `Char`. Although you can create such an enumeration type by using reflection, method calls that use the resulting type are unreliable and may also throw additional exceptions.

#### Instantiate an enumeration type

You can instantiate an enumeration type just as you instantiate any other value type: by declaring a variable and assigning one of the enumeration's constants to it. The following example instantiates an `ArrivalStatus` whose value is `ArrivalStatus.OnTime`.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class1.cs._

You can also instantiate an enumeration value in the following ways:

- By using a particular programming language's features to cast (as in C#) or convert (as in Visual Basic) an integer value to an enumeration value. The following example creates an `ArrivalStatus` object whose value is `ArrivalStatus.Early` in this way.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class2.cs._

- By calling its implicit parameterless constructor. As the following example shows, in this case the underlying value of the enumeration instance is 0. However, this is not necessarily the value of a valid constant in the enumeration.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class2.cs._

- By calling the `Enum.Parse` or `Enum.TryParse` method to parse a string that contains the name of a constant in the enumeration. For more information, see the Parse enumeration values section.

- By calling the `Enum.ToObject` method to convert an integral value to an enumeration type. For more information, see the Perform conversions section.

#### Enumeration best practices

We recommend that you use the following best practices when you define enumeration types:

- If you have not defined an enumeration member whose value is 0, consider creating a `None` enumerated constant. By default, the memory used for the enumeration is initialized to zero by the common language runtime. Consequently, if you do not define a constant whose value is zero, the enumeration will contain an illegal value when it is created.

- If there is an obvious default case that your application has to represent, consider using an enumerated constant whose value is zero to represent it. If there is no default case, consider using an enumerated constant whose value is zero to specify the case that is not represented by any of the other enumerated constants.

- Do not specify enumerated constants that are reserved for future use.

- When you define a method or property that takes an enumerated constant as a value, consider validating the value. The reason is that you can cast a numeric value to the enumeration type even if that numeric value is not defined in the enumeration.

Additional best practices for enumeration types whose constants are bit fields are listed in the Non-exclusive members and the Flags attribute section.

#### Perform operations with enumerations

You cannot define new methods when you are creating an enumeration. However, an enumeration type inherits a complete set of static and instance methods from the `Enum` class. The following sections survey most of these methods, in addition to several other methods that are commonly used when working with enumeration values.

#### Perform conversions

You can convert between an enumeration member and its underlying type by using a casting (in C# and F#), or conversion (in Visual Basic) operator. In F#, the `enum` function is also used. The following example uses casting or conversion operators to perform conversions both from an integer to an enumeration value and from an enumeration value to an integer.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class2.cs._

The `Enum` class also includes a `Enum.ToObject` method that converts a value of any integral type to an enumeration value. The following example uses the `ToObject` method to convert an `Int32` to an `ArrivalStatus` value. Note that, because the `Enum.ToObject` returns a value of type `Object`, the use of a casting or conversion operator may still be necessary to cast the object to the enumeration type.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/class2.cs._

When converting an integer to an enumeration value, it is possible to assign a value that is not actually a member of the enumeration. To prevent this, you can pass the integer to the `Enum.IsDefined` method before performing the conversion. The following example uses this method to determine whether the elements in an array of integer values can be converted to `ArrivalStatus` values.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classconversion1.cs._

Although the `Enum` class provides explicit interface implementations of the `IConvertible` interface for converting from an enumeration value to an integral type, you should use the methods of the `Convert` class, such as `Convert.ToInt32`, to perform these conversions. The following example illustrates how you can use the `Enum.GetUnderlyingType` method along with the `Convert.ChangeType` method to convert an enumeration value to its underlying type. Note that this example does not require the underlying type of the enumeration to be known at compile time.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classconversion2.cs._

#### Parse enumeration values

The `Enum.Parse` and `Enum.TryParse` methods allow you to convert the string representation of an enumeration value to that value. The string representation can be either the name or the underlying value of an enumeration constant. Note that the parsing methods will successfully convert string representations of numbers that are not members of a particular enumeration if the strings can be converted to a value of the enumeration's underlying type. To prevent this, the `Enum.IsDefined` method can be called to ensure that the result of the parsing method is a valid enumeration value. The example illustrates this approach and demonstrates calls to both the `Parse` and `TryParse<T>` methods. Note that the non-generic parsing method returns an object that you may have to cast (in C# and F#) or convert (in Visual Basic) to the appropriate enumeration type.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classparse1.cs._

#### Format enumeration values

You can convert enumeration values to their string representations by calling the static `Enum.Format` method, as well as the overloads of the instance `Enum.ToString` method. You can use a format string to control the precise way in which an enumeration value is represented as a string. For more information, see Enumeration Format Strings. The following example uses each of the supported enumeration format strings ("G" or "g", "D" or "d", "X" or "x", and "F" or "f" ) to convert a member of the `ArrivalStatus` enumeration to its string representations.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classformat1.cs._

#### Iterate enumeration members

The `Enum` type does not implement the `IEnumerable` or `IEnumerable<T>` interface, which would enable you to iterate members of a collection by using a `foreach` (in C#), `for..in` (in F#), or `For Each` (in Visual Basic) construct. However, you can enumerate members in either of two ways.

- You can call the `Enum.GetNames` method to retrieve a string array containing the names of the enumeration members. Next, for each element of the string array, you can call the `Enum.Parse` method to convert the string to its equivalent enumeration value. The following example illustrates this approach.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classiterate.cs._

- You can call the `Enum.GetValues` method to retrieve an array that contains the underlying values in the enumeration. Next, for each element of the array, you can call the `Enum.ToObject` method to convert the integer to its equivalent enumeration value. The following example illustrates this approach.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classiterate.cs._

#### Non-exclusive members and the Flags attribute

One common use of an enumeration is to represent a set of mutually exclusive values. For example, an `ArrivalStatus` instance can have a value of `Early`, `OnTime`, or `Late`. It makes no sense for the value of an `ArrivalStatus` instance to reflect more than one enumeration constant.

In other cases, however, the value of an enumeration object can include multiple enumeration members, and each member represents a bit field in the enumeration value. The `FlagsAttribute` attribute can be used to indicate that the enumeration consists of bit fields. For example, an enumeration named `Pets` might be used to indicate the kinds of pets in a household. It can be defined as follows.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classbitwise1.cs._

The `Pets` enumeration can then be used as shown in the following example.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classbitwise1.cs._

The following best practices should be used when defining a bitwise enumeration and applying the `FlagsAttribute` attribute.

- Use the `FlagsAttribute` custom attribute for an enumeration only if a bitwise operation (AND, OR, EXCLUSIVE OR) is to be performed on a numeric value.

- Define enumeration constants in powers of two, that is, 1, 2, 4, 8, and so on. This means the individual flags in combined enumeration constants do not overlap.

- Consider creating an enumerated constant for commonly used flag combinations. For example, if you have an enumeration used for file I/O operations that contains the enumerated constants `Read = 1` and `Write = 2`, consider creating the enumerated constant `ReadWrite = Read OR Write`, which combines the `Read` and `Write` flags. In addition, the bitwise OR operation used to combine the flags might be considered an advanced concept in some circumstances that should not be required for simple tasks.

- Use caution if you define a negative number as a flag enumerated constant because many flag positions might be set to 1, which might make your code confusing and encourage coding errors.

- A convenient way to test whether a flag is set in a numeric value is to call the instance `Enum.HasFlag` method, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classbitwise1.cs._

It is equivalent to performing a bitwise AND operation between the numeric value and the flag enumerated constant, which sets all bits in the numeric value to zero that do not correspond to the flag, and then testing whether the result of that operation is equal to the flag enumerated constant. This is illustrated in the following example.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classbitwise1.cs._

- Use `None` as the name of the flag enumerated constant whose value is zero. You cannot use the `None` enumerated constant in a bitwise AND operation to test for a flag because the result is always zero. However, you can perform a logical, not a bitwise, comparison between the numeric value and the `None` enumerated constant to determine whether any bits in the numeric value are set. This is illustrated in the following example.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/classbitwise1.cs._

- Do not define an enumeration value solely to mirror the state of the enumeration itself. For example, do not define an enumerated constant that merely marks the end of the enumeration. If you need to determine the last value of the enumeration, check for that value explicitly. In addition, you can perform a range check for the first and last enumerated constant if all values within the range are valid.

#### Add enumeration methods

Because enumeration types are defined by language structures, such as `enum` (C#), and `Enum` (Visual Basic), you cannot define custom methods for an enumeration type other than those methods inherited from the `Enum` class. However, you can use extension methods to add functionality to a particular enumeration type.

In the following example, the `Grades` enumeration represents the possible letter grades that a student may receive in a class. An extension method named `Passing` is added to the `Grades` type so that each instance of that type now "knows" whether it represents a passing grade or not.      The `Extensions` class also contains a static read-write variable that defines the minimum passing grade. The return value of the `Passing` extension method reflects the current value of that variable.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/Extensions.cs._

#### Examples

The following example demonstrates using an enumeration to represent named values and another enumeration to represent named bit fields.

_Code sample not included: ~/snippets/csharp/System/Enum/Overview/EnumMain.cs._

## Enum.Enum() constructor

```csharp
protected Enum ();
```

Initializes a new instance of the `Enum` class.

To be added.
