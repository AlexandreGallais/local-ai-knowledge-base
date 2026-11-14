---
title: "FlagsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FlagsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FlagsAttribute class

Namespace: `System`

```csharp
public class FlagsAttribute : Attribute
```

Indicates that an enumeration can be treated as a bit field; that is, a set of flags.

The `FlagsAttribute` attribute indicates that an enumeration can be treated as a bit field; that is, a set of flags.

Bit fields are generally used for lists of elements that might occur in combination, whereas enumeration constants are generally used for lists of mutually exclusive elements. Therefore, bit fields are designed to be combined with a bitwise `OR` operation to generate unnamed values, whereas enumerated constants are not. Languages vary in their use of bit fields compared to enumeration constants.

#### Attributes of the FlagsAttribute

`AttributeUsageAttribute` is applied to this class, and its `Inherited` property specifies `false`. This attribute can only be applied to enumerations.

#### Guidelines for FlagsAttribute and enum

- Use the `FlagsAttribute` custom attribute for an enumeration only if a bitwise operation (AND, OR, EXCLUSIVE OR) is to be performed on a numeric value.

- Define enumeration constants in powers of two, that is, 1, 2, 4, 8, and so on. This means the individual flags in combined enumeration constants do not overlap.

- Consider creating an enumerated constant for commonly used flag combinations. For example, if you have an enumeration used for file I/O operations that contains the enumerated constants `Read = 1` and `Write = 2`, consider creating the enumerated constant `ReadWrite = Read OR Write`, which combines the `Read` and `Write` flags. In addition, the bitwise OR operation used to combine the flags might be considered an advanced concept in some circumstances that should not be required for simple tasks.

- Use caution if you define a negative number as a flag enumerated constant because many flag positions might be set to 1, which might make your code confusing and encourage coding errors.

- A convenient way to test whether a flag is set in a numeric value is to perform a bitwise AND operation between the numeric value and the flag enumerated constant, which sets all bits in the numeric value to zero that do not correspond to the flag, then test whether the result of that operation is equal to the flag enumerated constant.

- Use `None` as the name of the flag enumerated constant whose value is zero. You cannot use the `None` enumerated constant in a bitwise AND operation to test for a flag because the result is always zero. However, you can perform a logical, not a bitwise, comparison between the numeric value and the `None` enumerated constant to determine whether any bits in the numeric value are set.

If you create a value enumeration instead of a flags enumeration, it is still worthwhile to create a `None` enumerated constant. The reason is that by default the memory used for the enumeration is initialized to zero by the common language runtime. Consequently, if you do not define a constant whose value is zero, the enumeration will contain an illegal value when it is created.

If there is an obvious default case your application needs to represent, consider using an enumerated constant whose value is zero to represent the default. If there is no default case, consider using an enumerated constant whose value is zero that means the case that is not represented by any of the other enumerated constants.

- Do not define an enumeration value solely to mirror the state of the enumeration itself. For example, do not define an enumerated constant that merely marks the end of the enumeration. If you need to determine the last value of the enumeration, check for that value explicitly. In addition, you can perform a range check for the first and last enumerated constant if all values within the range are valid.

- Do not specify enumerated constants that are reserved for future use.

- When you define a method or property that takes an enumerated constant as a value, consider validating the value. The reason is that you can cast a numeric value to the enumeration type even if that numeric value is not defined in the enumeration.

#### Examples

The following example illustrates the use of the `FlagsAttribute` attribute and shows the effect on the `Enum.ToString` method of using `FlagsAttribute` on an `Enum` declaration.

_Code sample not included: ~/snippets/csharp/System/FlagsAttribute/Overview/flags.cs._

The preceding example defines two color-related enumerations, `SingleHue` and `MultiHue`. The latter has the `FlagsAttribute` attribute; the former does not. The example shows the difference in behavior when a range of integers, including integers that do not represent underlying values of the enumeration type, are cast to the enumeration type and their string representations displayed. For example, note that 3 cannot be represented as a `SingleHue` value because 3 is not the underlying value of any `SingleHue` member, whereas the `FlagsAttribute` attribute makes it possible to represent 3 as a `MultiHue` value of `Black, Red`.

The following example defines another enumeration with the `FlagsAttribute` attribute and shows how to use bitwise logical and equality operators to determine whether one or more bit fields are set in an enumeration value. You can also use the `Enum.HasFlag` method to do that, but that is not shown in this example.

_Code sample not included: ~/snippets/csharp/System/FlagsAttribute/Overview/flags1.cs._

## FlagsAttribute.FlagsAttribute() constructor

```csharp
public FlagsAttribute ();
```

Initializes a new instance of the `FlagsAttribute` class.

#### Examples

The following example defines a `PhoneService` enumeration that represents forms of communication provided by a telephone company. It initializes three variables representing the service provided to three different households, and then indicates which households have no service, which households have only cell phone service, and which households have both cell phone and land line service. Finally, it implicitly calls the `ToString` method to display the types of service provided to each household.

_Code sample not included: ~/snippets/csharp/System/FlagsAttribute/Overview/flags1.cs._

The following example illustrates the use of the `FlagsAttribute` attribute and shows the effect on the `Enum.ToString` method of using `FlagsAttribute` on an `Enum` declaration.

_Code sample not included: ~/snippets/csharp/System/FlagsAttribute/Overview/flags.cs._
