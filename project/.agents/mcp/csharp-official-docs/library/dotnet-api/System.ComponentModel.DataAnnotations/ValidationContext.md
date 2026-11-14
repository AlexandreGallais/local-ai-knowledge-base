---
title: "ValidationContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/ValidationContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidationContext class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class ValidationContext : IServiceProvider
```

Describes the context in which a validation check is performed.

#### Remarks
This class describes the type or member on which validation is performed. It also enables custom validation to be added through any service that implements the `IServiceProvider` interface.

## ValidationContext.ValidationContext(Object) constructor

```csharp
public ValidationContext (object instance);
```

Initializes a new instance of the `ValidationContext` class using the specified object instance.

Parameters:

- `instance`: The object instance to validate. It cannot be `null`.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

To be added.

## ValidationContext.ValidationContext(Object, Object>) constructor

```csharp
public ValidationContext (object instance, System.Collections.Generic.IDictionary<object,object?>? items);
```

Initializes a new instance of the `ValidationContext` class using the specified object and an optional property bag.

Parameters:

- `instance`: The object instance to validate.  It cannot be `null`.
- `items`: An optional set of key/value pairs to make available to consumers.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

#### Remarks
If `items` is `null`, an empty dictionary is created. If `items` is not null, the set of key/value pairs is copied into a new dictionary, preventing consumers from modifying the original dictionary.

## ValidationContext.ValidationContext(Object, IServiceProvider, Object>) constructor

```csharp
public ValidationContext (object instance, IServiceProvider? serviceProvider, System.Collections.Generic.IDictionary<object,object?>? items);
```

Initializes a new instance of the `ValidationContext` class using the service provider and dictionary of service consumers.

Parameters:

- `instance`: The object to validate. This parameter is required.
- `serviceProvider`: The object that implements the `IServiceProvider` interface. This parameter is optional.
- `items`: A dictionary of key/value pairs to make available to the service consumers. This parameter is optional.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

#### Remarks
The `serviceProvider` parameter represents a service that can be used by the `ValidationContext.GetService` method in order to perform custom validation.

If the `items` parameter is `null`, an empty dictionary is created. If the parameter is not `null`, the set of key/value pairs is copied into a new dictionary, which prevents the service consumers from modifying the original dictionary.

## ValidationContext.ValidationContext(Object, String, IServiceProvider, Object>) constructor

```csharp
public ValidationContext (object instance, string displayName, IServiceProvider? serviceProvider, System.Collections.Generic.IDictionary<object,object?>? items);
```

Constructs a `ValidationContext` for a given object instance with a `displayName`, an optional `serviceProvider`, and an optional property bag of `items`.

Parameters:

- `instance`: The object instance being validated.  It cannot be `null`.
- `displayName`: The display name associated with the object instance.
- `serviceProvider`: Optional `IServiceProvider` to use when `ValidationContext.GetService` is called.

If it is `null`, `ValidationContext.GetService` will always return `null`.
- `items`: Optional set of key/value pairs to make available to consumers via `ValidationContext.Items`.

If `null`, an empty dictionary will be created.  If not `null`, the set of key/value pairs will be copied into a new dictionary, preventing consumers from modifying the original dictionary.

Exceptions:

- `ArgumentNullException`: When `instance` is `null`

This constructor is trim-safe because it does not use reflection to resolve the Type of the `instance` to support setting the DisplayName.

## ValidationContext.DisplayName property

```csharp
public string DisplayName { get; set; }
```

Gets or sets the name of the member to validate.

Returns: The name of the member to validate.

#### Remarks
The `ValidationContext.DisplayName` value is the name that is shown to the user. If a display name is not explicitly set, this property uses the value that is assigned by the associated `DisplayAttribute` object. If that attribute does not exist, the property returns the value of the `MemberName` property.

## ValidationContext.Items property

```csharp
public System.Collections.Generic.IDictionary<object,object?> Items { get; }
```

Gets the dictionary of key/value pairs that is associated with this context.

Returns: The dictionary of the key/value pairs for this context.

This property is never `null`, but the dictionary can be empty.
Changes made to entries in this dictionary do not affect the original dictionary
specified in the constructor.

`ValidationContext.Items`
is designed as a read-only input channel populated before validation begins.
The validation pipeline does not guarantee attribute execution order beyond
`RequiredAttribute` priority,
and no built-in attribute mutates this dictionary during validation.
Custom validators should treat it as read-only during validation execution.
Mutating it from within a validator is unsupported and can produce race
conditions under parallel asynchronous validation.

## ValidationContext.MemberName property

```csharp
public string? MemberName { get; set; }
```

Gets or sets the name of the member to validate.

Returns: The name of the member to validate.

#### Remarks

This property represents an entity member name, not the name of a corresponding data field. Therefore, this name is not localized. It should be set only for property or parameter contexts.

## ValidationContext.ObjectInstance property

```csharp
public object ObjectInstance { get; }
```

Gets the object to validate.

Returns: The object to validate.

#### Remarks
During validation, especially during property-level validation, the object instance could be in an indeterminate state.
When validation is performed without an owning object (for example, validating standalone values), it might be a placeholder, so don't treat it as the owner of the value.

## ValidationContext.ObjectType property

```csharp
public Type ObjectType { get; }
```

Gets the type of the object to validate.

Returns: The type of the object to validate.

To be added.

## ValidationContext.GetService(Type) method

```csharp
public object? GetService (Type serviceType);
```

Returns the service that provides custom validation.

Parameters:

- `serviceType`: The type of the service to use for validation.

Returns: An instance of the service, or `null` if the service is not available.

#### Remarks
If the `ValidationContext.ServiceContainer` object is defined at the application level, the `ValidationContext.GetService` method accesses it to retrieve the requested service.

If the `ValidationContext.ServiceContainer` object is not defined or it does not return the service, the `ValidationContext.GetService` method queries the `IServiceProvider` object that is passed to the `ValidationContext.%23ctor` method in order to obtain the service.

## ValidationContext.InitializeServiceProvider(Object>) method

```csharp
public void InitializeServiceProvider (Func<Type,object?> serviceProvider);
```

Initializes the `ValidationContext` using a service provider that can return service instances by type when `IDependencyResolver.GetService` is called.

Parameters:

- `serviceProvider`: The service provider.

To be added.
