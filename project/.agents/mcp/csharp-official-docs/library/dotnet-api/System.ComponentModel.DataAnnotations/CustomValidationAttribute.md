---
title: "CustomValidationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/CustomValidationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomValidationAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class CustomValidationAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies a custom validation method that is used to validate a property or class instance.

#### Remarks
The `CustomValidationAttribute` attribute is used to perform custom validation when the `ValidationAttribute.IsValid` method is invoked to perform validation. The `ValidationAttribute.IsValid` method then redirects the call to the method that is identified by the `Method` property, which in turn performs the actual validation.

The `CustomValidationAttribute` attribute can be applied to types, properties, fields, methods, and method parameters. When it is applied to a property, the attribute is invoked whenever a value is assigned to that property. When it is applied to a method, the attribute is invoked whenever the program calls that method. When it is applied to a method parameter, the attribute is invoked before the method is called.

For more information about using attributes, see Attributes.

## CustomValidationAttribute.CustomValidationAttribute(Type, String) constructor

```csharp
public CustomValidationAttribute (Type validatorType, string method);
```

Initializes a new instance of the `CustomValidationAttribute` class.

Parameters:

- `validatorType`: The type that contains the method that performs custom validation.
- `method`: The method that performs custom validation.

#### Remarks
This method specifies a custom class and a related method to call at run time in order to execute custom validation logic.

## CustomValidationAttribute.Method property

```csharp
public string Method { get; }
```

Gets the validation method.

Returns: The name of the validation method.

#### Remarks
The custom method specified by this property must be public and static, and it must return a Boolean value. It must also take at least one input parameter that specifies the object to validate. This parameter can be strongly typed. If a process passes a value of a different type, type conversion will be attempted.

The specified method should return `true` if a given object is valid. Otherwise it should return `false`.

The custom method can also take parameters that specify a `ValidationContext` input value and a `ValidationResult` output value. The `ValidationContext` parameter provides additional context information that the method can use to determine the context that it is used in. The `ValidationResult` output parameter enables the method to return an error message.

If the method returns `null` for the `ValidationResult` parameter or if it returns an empty value for the `ErrorMessage` property, the default `ValidationAttribute.FormatErrorMessage` method will be called to compose the error message.

## CustomValidationAttribute.ValidatorType property

```csharp
public Type ValidatorType { get; }
```

Gets the type that performs custom validation.

Returns: The type that performs custom validation.

#### Remarks
This property returns the type that is passed to the ctor `CustomValidationAttribute.%23ctor` constructor overload.

## CustomValidationAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Formats a validation error message.

Parameters:

- `name`: The name to include in the formatted message.

Returns: An instance of the formatted error message.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.

#### Remarks
The error message is formatted at run time to include the `name` value that is passed to this method.

## CustomValidationAttribute.IsValid(Object, ValidationContext) method

```csharp
protected override System.ComponentModel.DataAnnotations.ValidationResult? IsValid (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Overrides the validation method.  See `DataAnnotations.ValidationContext)`.

Parameters:

- `value`: The value to validate.
- `validationContext`: An object that provides context about the validation operation, such as the object and member being validated.

Returns: Whatever the `CustomValidationAttribute.Method` in `CustomValidationAttribute.ValidatorType` returns.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.

To be added.
