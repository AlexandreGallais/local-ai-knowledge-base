---
title: "RangeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/RangeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RangeAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class RangeAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the numeric range constraints for the value of a data field.

#### Remarks
When you apply this attribute to a data field, you must follow the guidelines for how to use validation attributes.

#### Examples
The following example shows how to use the `RangeAttribute` to customize formatting for a data field. The example performs the following steps:

- Implements a metadata partial class and the associated metadata class.

- In the associated metadata class, it applies the `RangeAttribute` attribute to obtain the following results:

- Apply the attribute to a data field of type integer.

- Apply the attribute to an integer data field and define a custom validation error message.

- Apply the attribute to a `DateTime` data field and define a custom validation error message.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RangeAttribute/CS/Product.cs._

To compile the example, you need the following:

- Microsoft Visual Studio 2008 Service Pack 1 or Visual Web Developer 2008 Express Edition SP1.

- A data-driven Web site. This enables you to create a data context for the database and the class that contains the data field to customize. For more information, see `Walkthrough: Creating a New Dynamic Data Web Site using Scaffolding`.

## RangeAttribute.RangeAttribute(Double, Double) constructor

```csharp
public RangeAttribute (double minimum, double maximum);
```

Initializes a new instance of the `RangeAttribute` class by using the specified minimum and maximum values.

Parameters:

- `minimum`: Specifies the minimum value allowed for the data field value.
- `maximum`: Specifies the maximum value allowed for the data field value.

To be added.

## RangeAttribute.RangeAttribute(Int32, Int32) constructor

```csharp
public RangeAttribute (int minimum, int maximum);
```

Initializes a new instance of the `RangeAttribute` class by using the specified minimum and maximum values.

Parameters:

- `minimum`: Specifies the minimum value allowed for the data field value.
- `maximum`: Specifies the maximum value allowed for the data field value.

#### Examples
The following example shows how to use the `RangeAttribute.%23ctor` to specify the range for an integer data field.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RangeAttribute/CS/Product.cs._

## RangeAttribute.RangeAttribute(Type, String, String) constructor

```csharp
public RangeAttribute (Type type, string minimum, string maximum);
```

Initializes a new instance of the `RangeAttribute` class by using the specified minimum and maximum values and the specific type.

Parameters:

- `type`: Specifies the type of the object to test.
- `minimum`: Specifies the minimum value allowed for the data field value.
- `maximum`: Specifies the maximum value allowed for the data field value.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The object to validate must implement the `IComparable` interface.

#### Examples
The following example shows how to use the `RangeAttribute.%23ctor` method to specify the range for a `DateTime` field. It also includes a custom error message that shows how to use the formatting capabilities of the `RangeAttribute.FormatErrorMessage` method.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RangeAttribute/CS/Product.cs._

## RangeAttribute.ConvertValueInInvariantCulture property

```csharp
public bool ConvertValueInInvariantCulture { get; set; }
```

Gets or sets a value that determines whether any conversions of the value being validated to `RangeAttribute.OperandType` as set by the `type` parameter of the `RangeAttribute.#ctor` constructor use the invariant culture or the current culture.

Returns: `true` to use the invariant culture for any conversions; `false` to use the culture that is current at the time of the validation.

This property has no effect on the constructors with `Int32` or `Double` parameters, which always use the invariant culture for any conversions of the validated value.

## RangeAttribute.Maximum property

```csharp
public object Maximum { get; }
```

Gets the maximum allowed field value.

Returns: The maximum value that is allowed for the data field.

To be added.

## RangeAttribute.MaximumIsExclusive property

```csharp
public bool MaximumIsExclusive { get; set; }
```

Specifies whether validation should fail for values that are equal to `RangeAttribute.Maximum`.

Returns: To be added.

To be added.

## RangeAttribute.Minimum property

```csharp
public object Minimum { get; }
```

Gets the minimum allowed field value.

Returns: The minimum value that is allowed for the data field.

#### Remarks
The minimum value that is allowed for the data field.

## RangeAttribute.MinimumIsExclusive property

```csharp
public bool MinimumIsExclusive { get; set; }
```

Specifies whether validation should fail for values that are equal to `RangeAttribute.Minimum`.

Returns: To be added.

To be added.

## RangeAttribute.OperandType property

```csharp
public Type OperandType { get; }
```

Gets the type of the data field whose value must be validated.

Returns: The type of the data field whose value must be validated.

#### Remarks
The object to be tested must implement the `IComparable` interface.

## RangeAttribute.ParseLimitsInInvariantCulture property

```csharp
public bool ParseLimitsInInvariantCulture { get; set; }
```

Gets or sets a value that determines whether string values for `RangeAttribute.Minimum` and `RangeAttribute.Maximum` are parsed using the invariant culture rather than the current culture.

Returns: To be added.

To be added.

## RangeAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Formats the error message that is displayed when range validation fails.

Parameters:

- `name`: The name of the field that caused the validation failure.

Returns: The formatted error message.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.

#### Remarks
The `RangeAttribute.FormatErrorMessage` creates the error message by using the name of the data field that caused the validation failure. You can override this method in a custom validation attribute to customize how errors are created, or to provide a more complex message that contains parameters that you evaluate at run time. For an example, see the `RangeAttribute.%23ctor` constructor.

## RangeAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## RangeAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks that the value of the data field is in the specified range.

Parameters:

- `value`: The data field value to validate.

Returns: `true` if the specified value is in the range; otherwise, `false`.

Exceptions:

- `ValidationException`: The data field value was outside the allowed range.
- `InvalidOperationException`: The current attribute is ill-formed.

To be added.
