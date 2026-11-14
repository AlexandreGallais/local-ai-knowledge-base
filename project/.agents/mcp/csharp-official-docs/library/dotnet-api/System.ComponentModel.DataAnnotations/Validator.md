---
title: "Validator class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/Validator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Validator class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public static class Validator
```

Defines a helper class that can be used to validate objects, properties, and methods when it is included in their associated `ValidationAttribute` attributes.

To be added.

## Validator.TryValidateObject(Object, ValidationContext, ValidationResult>) method

```csharp
public static bool TryValidateObject (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults);
```

Determines whether the specified object is valid using the validation context and validation results collection.

Parameters:

- `instance`: The object to validate.
- `validationContext`: The context that describes the object to validate.
- `validationResults`: A collection to hold each failed validation.

Returns: `true` if the object validates; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.
- `ArgumentException`: `instance` doesn't match the `ValidationContext.ObjectInstance`on `validationContext`.

#### Remarks
This method evaluates each `ValidationAttribute` instance that is attached to the object type. It also checks whether each property that is marked with `RequiredAttribute` is provided. It does not recursively validate the property values of the object.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation. Each stage runs only if the preceding stages succeed. Object-level validation invokes `Validate` if implemented.

## Validator.TryValidateObject(Object, ValidationContext, ValidationResult>, Boolean) method

```csharp
public static bool TryValidateObject (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, bool validateAllProperties);
```

Determines whether the specified object is valid using the validation context, validation results collection, and a value that specifies whether to validate all properties.

Parameters:

- `instance`: The object to validate.
- `validationContext`: The context that describes the object to validate.
- `validationResults`: A collection to hold each failed validation.
- `validateAllProperties`: `true` to validate all properties; if `false`, only required attributes are validated.

Returns: `true` if the object validates; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.
- `ArgumentException`: `instance` doesn't match the`ValidationContext.ObjectInstance`on `validationContext`.

#### Remarks
This method evaluates each `ValidationAttribute` instance that is attached to the object type. It also checks whether each property that is marked with `RequiredAttribute` is provided. It validates the property values of the object if `validateAllProperties` is `true` but does not recursively validate properties of the objects returned by the properties.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation. Each stage runs only if the preceding stages succeed. Object-level validation invokes `Validate` if implemented.

## Validator.TryValidateObjectAsync(Object, ValidationContext, ValidationResult>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> TryValidateObjectAsync (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously tests whether the given object instance is valid.

Parameters:

- `instance`: The object instance to test.  It cannot be `null`.
- `validationContext`: Describes the object to validate and provides services and context for the validators.
- `validationResults`: An optional collection that receives validation failures as `ValidationResult` instances.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` that is `true` if the object is valid, `false` if any validation errors are encountered.

Exceptions:

- `ArgumentNullException`: When `instance` is `null`.
- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentException`: When `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.
- `OperationCanceledException`: The validation operation was canceled.

This method evaluates all `ValidationAttribute`s attached to the object instance's type.  It also checks to ensure all properties marked with `RequiredAttribute` are set.  It does not validate the `ValidationAttribute`s on individual properties of the object unless `Validator.TryValidateObjectAsync` is called with `validateAllProperties` set to `true`.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation.
Each stage runs only if the preceding stages succeed.
Object-level validation prefers invoking `IAsyncValidatableObject.ValidateAsync` when implemented,
with `IValidatableObject.Validate` as a fallback for objects that implement only the synchronous interface.
It does not invoke both.

## Validator.TryValidateObjectAsync(Object, ValidationContext, ValidationResult>, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> TryValidateObjectAsync (object instance, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, bool validateAllProperties, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously tests whether the given object instance is valid.

Parameters:

- `instance`: The object instance to test.  It cannot be `null`.
- `validationContext`: Describes the object to validate and provides services and context for the validators.
- `validationResults`: An optional collection that receives validation failures as `ValidationResult` instances.
- `validateAllProperties`: If `true`, also evaluates all properties of the object (this process is not recursive over properties of the properties).
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` that is `true` if the object is valid, `false` if any validation errors are encountered.

Exceptions:

- `ArgumentNullException`: When `instance` is `null`.
- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentException`: When `instance` doesn't match the `ValidationContext.ObjectInstance` on `validationContext`.
- `OperationCanceledException`: The validation operation was canceled.

This method evaluates all `ValidationAttribute`s attached to the object instance's type. It also
checks to ensure all properties marked with `RequiredAttribute` are set. If
`validateAllProperties` is `true`, this method also evaluates the `ValidationAttribute`s for all the immediate
properties of this object. This process is not recursive.

When `validateAllProperties` is `true`, validation is started for each
property in sequence. Synchronous attributes for a property run before that property's
asynchronous attributes are awaited. Asynchronous validation that remains in progress can
overlap with asynchronous validation for other properties.

When `validationResults` is `null`, validation stops after the
first property error (cross-property short-circuit). Any in-flight async validators on
other properties are cancelled cooperatively. When `validationResults`
is non-null, all properties complete and all errors are collected.

Returns `Task<T>` for interoperability with standard async
composition patterns such as `Task.WhenAll` and `Task.WhenAny`.

Validation runs in three stages: property validation, type-level attribute validation, and object-level validation.
Each stage runs only if the preceding stages succeed.
Object-level validation prefers invoking `IAsyncValidatableObject.ValidateAsync` when implemented,
with `IValidatableObject.Validate` as a fallback for objects that implement only the synchronous interface.
It does not invoke both.

## Validator.TryValidateProperty(Object, ValidationContext, ValidationResult>) method

```csharp
public static bool TryValidateProperty (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults);
```

Validates the property.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context that describes the property to validate.
- `validationResults`: A collection to hold each failed validation.

Returns: `true` if the property validates; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` cannot be assigned to the property.

-or-

`value` is `null`.
- `ArgumentException`: The `ValidationContext.MemberName` property of `validationContext` is not a valid property.

#### Remarks
This method tests each `ValidationException.ValidationAttribute` instance that is associated with the property that is identified by the `validationContext` parameter.

## Validator.TryValidatePropertyAsync(Object, ValidationContext, ValidationResult>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> TryValidatePropertyAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously tests whether the given property value is valid.

Parameters:

- `value`: The value to test.
- `validationContext`: Describes the property member to validate and provides services and context for the validators.
- `validationResults`: An optional collection that receives validation failures as `ValidationResult` instances.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` that is `true` if the value is valid, `false` if any validation errors are encountered.

Exceptions:

- `ArgumentNullException`: `validationContext` is `null`, or
`ValidationContext.MemberName` is `null` or empty.
- `ArgumentException`: `ValidationContext.MemberName` does not identify a valid public, non-indexer property,
or `value` cannot be assigned to that property.
- `OperationCanceledException`: The validation operation was canceled.

This method tests each `ValidationAttribute` associated with the property
identified by `validationContext`. If `validationResults` is non-null,
this method adds a `ValidationResult` to it for each validation failure.

If there is a `RequiredAttribute` found on the property, it is evaluated before all other
validation attributes. If the required validator fails, validation stops, adding that single failure to the
`validationResults` collection when applicable and returning `false`.

Any `AsyncValidationAttribute` instances are evaluated asynchronously after all synchronous
validation attributes have passed.

## Validator.TryValidateValue(Object, ValidationContext, ValidationResult>, ValidationAttribute>) method

```csharp
public static bool TryValidateValue (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationAttribute> validationAttributes);
```

Returns a value that indicates whether the specified value is valid with the specified attributes.

Parameters:

- `value`: The value to validate.
- `validationContext`: The context that describes the object to validate.
- `validationResults`: A collection to hold failed validations.
- `validationAttributes`: The validation attributes.

Returns: `true` if the object validates; otherwise, `false`.

#### Remarks
This method tests each validation attribute in the `validationAttributes` parameter against the `value` parameter. If the `validationResults` parameter is not `null`, this method adds a `ValidationResult` object for each validation failure to the validation results collection. If the `validationResults` parameter is `null`, this method does not add a `ValidationResult` object to the collection. If a `RequiredAttribute` attribute is included in the `validationAttributes` parameter, the `RequiredAttribute` attribute is evaluated first.

## Validator.TryValidateValueAsync(Object, ValidationContext, ValidationResult>, ValidationAttribute>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> TryValidateValueAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Collections.Generic.ICollection<System.ComponentModel.DataAnnotations.ValidationResult>? validationResults, System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationAttribute> validationAttributes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously tests whether the given value is valid against a specified list of `ValidationAttribute`s.

Parameters:

- `value`: The value to test.
- `validationContext`: Describes the object being validated and provides services and context for the validators.
- `validationResults`: An optional collection that receives validation failures as `ValidationResult` instances.
- `validationAttributes`: The list of `ValidationAttribute`s to validate this `value` against.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` that is `true` if the value is valid, `false` if any validation errors are encountered.

Exceptions:

- `ArgumentNullException`: When `validationContext` is `null`.
- `ArgumentNullException`: When `validationAttributes` is `null`.
- `OperationCanceledException`: The validation operation was canceled.

This method tests each specified `ValidationAttribute`. If
`validationResults` is non-null, this method adds a `ValidationResult`
to it for each validation failure.

Any `AsyncValidationAttribute` instances are evaluated asynchronously after all synchronous
validation attributes have passed.
