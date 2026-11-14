---
title: "ValidationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/ValidationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidationAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public abstract class ValidationAttribute : Attribute
```

Serves as the base class for all validation attributes.

#### Remarks
This class enforces validation, based on the metadata that is associated with the data table. You can override this class to create custom validation attributes.

## ValidationAttribute.ValidationAttribute() constructor

```csharp
protected ValidationAttribute ();
```

Initializes a new instance of the `ValidationAttribute` class.

This constructor chooses a generic validation error message. If you subclass `ValidationAttribute`, use other constructors or supply a better message.

## ValidationAttribute.ValidationAttribute(String>) constructor

```csharp
protected ValidationAttribute (Func<string> errorMessageAccessor);
```

Initializes a new instance of the `ValidationAttribute` class by using the function that enables access to validation resources.

Parameters:

- `errorMessageAccessor`: The function that enables access to validation resources.

Exceptions:

- `ArgumentNullException`: `errorMessageAccessor` is `null`.

This constructor provides a resource accessor function that is used by the `ErrorMessageString` property to retrieve an error message.

## ValidationAttribute.ValidationAttribute(String) constructor

```csharp
protected ValidationAttribute (string errorMessage);
```

Initializes a new instance of the `ValidationAttribute` class by using the error message to associate with a validation control.

Parameters:

- `errorMessage`: The error message to associate with a validation control.

To be added.

## ValidationAttribute.ErrorMessage property

```csharp
public string? ErrorMessage { get; set; }
```

Gets or sets an error message to associate with a validation control if validation fails.

Returns: The error message that is associated with the validation control.

This property is the error message that you associate with the validation control. It is used for non-localized error messages.

## ValidationAttribute.ErrorMessageResourceName property

```csharp
public string? ErrorMessageResourceName { get; set; }
```

Gets or sets the error message resource name to use in order to look up the `ValidationAttribute.ErrorMessageResourceType` property value if validation fails.

Returns: The error message resource that is associated with a validation control.

#### Remarks
You use the `ErrorMessageResourceName` property together with the `ErrorMessageResourceType` property in order to provide a localized error message.

## ValidationAttribute.ErrorMessageResourceType property

```csharp
public Type? ErrorMessageResourceType { get; set; }
```

Gets or sets the resource type to use for error-message lookup if validation fails.

Returns: The type of error message that is associated with a validation control.

#### Remarks
You use the `ErrorMessageResourceType` property together with the `ErrorMessageResourceName` property in order to provide a localized error message.

## ValidationAttribute.ErrorMessageString property

```csharp
protected string ErrorMessageString { get; }
```

Gets the localized validation error message.

Returns: The localized validation error message.

#### Remarks
The error message string is obtained by evaluating the `ErrorMessage` property or by evaluating the `ValidationAttribute.ErrorMessageResourceType` and `ValidationAttribute.ErrorMessageResourceName` properties. The two cases are mutually exclusive. The second case is used if you want to display a localized error message.

## ValidationAttribute.RequiresValidationContext property

```csharp
public virtual bool RequiresValidationContext { get; }
```

Gets a value that indicates whether the attribute requires validation context.

Returns: `true` if the attribute requires validation context; otherwise, `false`.

This property is a hint for callers deciding whether a `ValidationContext` must be supplied. The asynchronous validation entry point `AsyncValidationAttribute.GetValidationResultAsync` always requires a non-`null``ValidationContext` parameter, so this property is not applicable to the asynchronous pipeline.

## ValidationAttribute.FormatErrorMessage(String) method

```csharp
public virtual string FormatErrorMessage (string name);
```

Applies formatting to an error message, based on the data field where the error occurred.

Parameters:

- `name`: The name to include in the formatted message.

Returns: An instance of the formatted error message.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.

#### Remarks
This method formats an error message by using the `ErrorMessageString` property. This method appends the name of the data field that triggered the error to the formatted error message. You can customize how the error message is formatted by creating a derived class that overrides this method.

## ValidationAttribute.FormatMessage(String, String) method

```csharp
public virtual string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## ValidationAttribute.GetValidationResult(Object, ValidationContext) method

```csharp
public System.ComponentModel.DataAnnotations.ValidationResult? GetValidationResult (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Checks whether the specified value is valid with respect to the current validation attribute.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context information about the validation operation.

Returns: An instance of the `ValidationResult` class.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.
- `ArgumentNullException`: `validationContext` is `null`.
- `NotImplementedException`: `ValidationAttribute.IsValid` has not been implemented by a derived class.

#### Remarks
The `ValidationAttribute.GetValidationResult` method checks validity without throwing an exception.

## ValidationAttribute.IsValid(Object) method

```csharp
public virtual bool IsValid (object? value);
```

Determines whether the specified value of the object is valid.

Parameters:

- `value`: The value of the object to validate.

Returns: `true` if the specified value is valid; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.
- `NotImplementedException`: Neither overload of `IsValid` has been implemented by a derived class.

#### Remarks
If you inherit from the `ValidationAttribute` class, you must implement the validation logic in this method.

## ValidationAttribute.IsValid(Object, ValidationContext) method

```csharp
protected virtual System.ComponentModel.DataAnnotations.ValidationResult? IsValid (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Validates the specified value with respect to the current validation attribute.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context information about the validation operation.

Returns: An instance of the `ValidationResult` class.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.
- `NotImplementedException`: `ValidationAttribute.IsValid` has not been implemented by a derived class.

To be added.

## ValidationAttribute.Validate(Object, ValidationContext) method

```csharp
public void Validate (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Validates the specified object.

Parameters:

- `value`: The object to validate.
- `validationContext`: The `ValidationContext` object that describes the context where the validation checks are performed. This parameter cannot be `null`.

Exceptions:

- `ValidationException`: Validation failed.
- `InvalidOperationException`: The current attribute is malformed.
- `NotImplementedException`: `ValidationAttribute.IsValid` has not been implemented by a derived class.

#### Remarks
This method calls the `ValidationAttribute.IsValid` method to determine whether the object that is specified by the `value` parameter is valid. If the `ValidationAttribute.IsValid` method returns `false`, this method calls the `ValidationAttribute.FormatErrorMessage` method to get a localized message that states the problem. It then throws a `ValidationException` exception.

## ValidationAttribute.Validate(Object, String) method

```csharp
public void Validate (object? value, string name);
```

Validates the specified object.

Parameters:

- `value`: The value of the object to validate.
- `name`: The name to include in the error message.

Exceptions:

- `ValidationException`: `value` is not valid.
- `InvalidOperationException`: The current attribute is malformed.

#### Remarks
This method validates the value of the object or property on which the `ValidationAttribute` attribute is declared. It calls the `ValidationAttribute.IsValid` method and passes `value` as a parameter. If validation fails, a `ValidationException` exception is thrown.
