---
title: "Validator class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/Validator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Validator class (part 2 of 2)

## Validator.ValidateObject(Object, ValidationContext) method

```csharp
public static void ValidateObject (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Determines whether the specified object is valid using the validation context.

Parameters:

- `instance`: The object to validate.
- `validationContext`: The context that describes the object to validate.

Exceptions:

- `ValidationException`: The object is not valid.
- `ArgumentNullException`: `instance` is `null`.
- `ArgumentException`: `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.

#### Remarks
This method evaluates each `ValidationAttribute` instance that is attached to the object type.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation. Each stage runs only if the preceding stages succeed. Object-level validation invokes `Validate` if implemented.

## Validator.ValidateObject(Object, ValidationContext, Boolean) method

```csharp
public static void ValidateObject (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, bool validateAllProperties);
```

Determines whether the specified object is valid using the validation context, and a value that specifies whether to validate all properties.

Parameters:

- `instance`: The object to validate.
- `validationContext`: The context that describes the object to validate.
- `validateAllProperties`: `true` to validate all properties; otherwise, `false`.

Exceptions:

- `ValidationException`: `instance` is not valid.
- `ArgumentNullException`: `instance` is `null`.
- `ArgumentException`: `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.

#### Remarks
This method evaluates each `ValidationAttribute` instance that is attached to the object type.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation. Each stage runs only if the preceding stages succeed. Object-level validation invokes `Validate` if implemented.

## Validator.ValidateObjectAsync(Object, ValidationContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ValidateObjectAsync (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously throws a `ValidationException` if the given `instance` is not valid.

Parameters:

- `instance`: The object instance to test.  It cannot be `null`.
- `validationContext`: Describes the object being validated and provides services and context for the validators.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task` representing the asynchronous validation operation.

Exceptions:

- `ArgumentNullException`: When `instance` is `null`.
- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentException`: When `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.
- `ValidationException`: When `instance` is found to be invalid.
- `OperationCanceledException`: The validation operation was canceled.

This method checks the `RequiredAttribute` attributes on the object's properties.
If property validation succeeds, the method evaluates the `ValidationAttribute`
attributes attached to the object's type.

This overload does not evaluate other property-level validation attributes. To evaluate those attributes,
call the overload that accepts `validateAllProperties` with that argument set to `true`.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation.
Each stage runs only if the preceding stages succeed.
Object-level validation prefers invoking `IAsyncValidatableObject.ValidateAsync` when implemented,
with `IValidatableObject.Validate` as a fallback for objects that implement only the synchronous interface.
It does not invoke both.

## Validator.ValidateObjectAsync(Object, ValidationContext, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ValidateObjectAsync (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, bool validateAllProperties, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously throws a `ValidationException` if the given object instance is not valid.

Parameters:

- `instance`: The object instance to test.  It cannot be `null`.
- `validationContext`: Describes the object being validated and provides services and context for the validators.
- `validateAllProperties`: If `true`, also validates all the `instance`'s properties.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task` representing the asynchronous validation operation.

Exceptions:

- `ArgumentNullException`: When `instance` is `null`.
- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentException`: When `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.
- `ValidationException`: When `instance` is found to be invalid.
- `OperationCanceledException`: The validation operation was canceled.

This method checks the `RequiredAttribute` attributes on the object's properties even when
`validateAllProperties` is `false`. If property validation succeeds,
the method evaluates the `ValidationAttribute` attributes attached to the object's type.

If `validateAllProperties` is `true`, the method also evaluates other
validation attributes on the object's immediate properties. This process does not recursively validate property values.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation.
Each stage runs only if the preceding stages succeed.
Object-level validation prefers invoking `IAsyncValidatableObject.ValidateAsync` when implemented,
with `IValidatableObject.Validate` as a fallback for objects that implement only the synchronous interface.
It does not invoke both.

## Validator.ValidateProperty(Object, ValidationContext) method

```csharp
public static void ValidateProperty (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Validates the property.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context that describes the property to validate.

Exceptions:

- `ArgumentNullException`: `value` cannot be assigned to the property.
- `ValidationException`: The `value` parameter is not valid.

#### Remarks
This method tests each `ValidationException.ValidationAttribute` instance that is associated with the property identified by the `validationContext` parameter.

## Validator.ValidatePropertyAsync(Object, ValidationContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ValidatePropertyAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously throws a `ValidationException` if the given property `value` is not valid.

Parameters:

- `value`: The value to test.
- `validationContext`: Describes the object being validated and provides services and context for the validators.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task` representing the asynchronous validation operation.

Exceptions:

- `ArgumentNullException`: `validationContext` is `null`, or
`ValidationContext.MemberName` is `null` or empty.
- `ArgumentException`: `ValidationContext.MemberName` does not identify a valid public, non-indexer property,
or `value` cannot be assigned to that property.
- `ValidationException`: When `value` is invalid for this property.
- `OperationCanceledException`: The validation operation was canceled.

To be added.

## Validator.ValidateValue(Object, ValidationContext, ValidationAttribute>) method

```csharp
public static void ValidateValue (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationAttribute> validationAttributes);
```

Validates the specified attributes.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context that describes the object to validate.
- `validationAttributes`: The validation attributes.

Exceptions:

- `ArgumentNullException`: The `validationContext` parameter is `null`.
- `ValidationException`: The `value` parameter does not validate with the `validationAttributes` parameter.

#### Remarks
This method tests each validation attribute in the `validationAttributes` parameter against the `value` parameter.  If a `RequiredAttribute` attribute is included, the `RequiredAttribute` attribute is evaluated first.

## Validator.ValidateValueAsync(Object, ValidationContext, ValidationAttribute>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ValidateValueAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationAttribute> validationAttributes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously throws a `ValidationException` if the given value is not valid for the `ValidationAttribute`s.

Parameters:

- `value`: The value to test.
- `validationContext`: Describes the object being tested.
- `validationAttributes`: The list of `ValidationAttribute`s to validate this `value` against.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task` representing the asynchronous validation operation.

Exceptions:

- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentNullException`: When `validationAttributes` is `null`.
- `ValidationException`: When `value` is found to be invalid.
- `OperationCanceledException`: The validation operation was canceled.

To be added.
