---
title: "LicenseManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseManager class

Namespace: `System.ComponentModel`

```csharp
public sealed class LicenseManager
```

Provides properties and methods to add a license to a component and to manage a `LicenseProvider`. This class cannot be inherited.

#### Remarks
The `LicenseManager` class provides the following `static` properties: `LicenseManager.CurrentContext` and `LicenseManager.UsageMode`. The class also provides the following `static` methods: `LicenseManager.CreateWithContext`, `LicenseManager.IsValid`, and `LicenseManager.Validate`.

When you create a component that you want to license, you must do the following:

1.  Specify the `LicenseProvider` by marking the component with a `LicenseProviderAttribute`.

2.  Call `LicenseManager.Validate` or `LicenseManager.IsValid` in the constructor of the component. `LicenseManager.Validate` throws a `LicenseException` when it tries to create an instance without a valid license. `LicenseManager.IsValid` does not throw an exception.

3.  Call `License.Dispose` on any license that is granted when the component is disposed or finalized.

#### Examples
The following code example creates a licensed control using the `LicenseManager.Validate` method. It uses a `LicenseProvider` that is implemented by the `LicFileLicenseProvider` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseManager/Overview/source.cs._

## LicenseManager.CurrentContext property

```csharp
public static System.ComponentModel.LicenseContext CurrentContext { get; set; }
```

Gets or sets the current `LicenseContext`, which specifies when you can use the licensed object.

Returns: A `LicenseContext` that specifies when you can use the licensed object.

Exceptions:

- `InvalidOperationException`: The `LicenseManager.CurrentContext` property is currently locked and cannot be changed.

#### Remarks
When the user requests a valid `License`, the user must give the context in which the `License` is valid to the `LicenseProvider.GetLicense` method. The `LicenseContext` returned by this property should be passed to all `LicenseProvider` classes.

## LicenseManager.UsageMode property

```csharp
public static System.ComponentModel.LicenseUsageMode UsageMode { get; }
```

Gets the `LicenseUsageMode` that specifies when you can use the licensed object for the `LicenseManager.CurrentContext`.

Returns: One of the `LicenseUsageMode` values, as specified in the `LicenseManager.CurrentContext` property.

#### Remarks
If this property cannot find a `LicenseManager.CurrentContext` value, it returns `Runtime`.

## LicenseManager.CreateWithContext(Type, LicenseContext) method

```csharp
public static object? CreateWithContext (Type type, System.ComponentModel.LicenseContext creationContext);
```

Creates an instance of the specified type, given a context in which you can use the licensed instance.

Parameters:

- `type`: A `Type` that represents the type to create.
- `creationContext`: A `LicenseContext` that specifies when you can use the licensed instance.

Returns: An instance of the specified type.

#### Remarks
The `LicenseContext` you specify as the `creationContext` parameter is used as the `LicenseManager.CurrentContext` for the life of this `License`. The `LicenseManager.CreateWithContext` method blocks all other threads in the `AppDomain` from modifying the `LicenseManager.CurrentContext`, allowing `LicenseManager.CreateWithContext` to behave as an atomic operation.

## LicenseManager.CreateWithContext(Type, LicenseContext, Object[]) method

```csharp
public static object? CreateWithContext (Type type, System.ComponentModel.LicenseContext creationContext, object[] args);
```

Creates an instance of the specified type with the specified arguments, given a context in which you can use the licensed instance.

Parameters:

- `type`: A `Type` that represents the type to create.
- `creationContext`: A `LicenseContext` that specifies when you can use the licensed instance.
- `args`: An array of type `Object` that represents the arguments for the type.

Returns: An instance of the specified type with the given array of arguments.

#### Remarks
The `LicenseContext` you specify as the `creationContext` parameter is used as the `LicenseManager.CurrentContext` for the life of this `License`. This method blocks all other threads in the `AppDomain` from modifying the `LicenseManager.CurrentContext`, allowing `LicenseManager.CreateWithContext` to behave as an atomic operation.

## LicenseManager.IsLicensed(Type) method

```csharp
public static bool IsLicensed (Type type);
```

Returns whether the given type has a valid license.

Parameters:

- `type`: The `Type` to find a valid license for.

Returns: `true` if the given type is licensed; otherwise, `false`.

To be added.

## LicenseManager.IsValid(Type) method

```csharp
public static bool IsValid (Type type);
```

Determines whether a valid license can be granted for the specified type.

Parameters:

- `type`: A `Type` that represents the type of object that requests the `License`.

Returns: `true` if a valid license can be granted; otherwise, `false`.

#### Remarks
The `LicenseManager.IsValid` method returns `true` when the type is either not licensed, or is licensed and the license is valid.

This method does not throw a `LicenseException` when it cannot grant a valid `License`. The `LicenseManager.Validate` method throws exceptions.

## LicenseManager.IsValid(Type, Object, License) method

```csharp
public static bool IsValid (Type type, object? instance, out System.ComponentModel.License? license);
```

Determines whether a valid license can be granted for the specified instance of the type. This method creates a valid `License`.

Parameters:

- `type`: A `Type` that represents the type of object that requests the license.
- `instance`: An object of the specified type or a type derived from the specified type.
- `license`: A `License` that is a valid license, or `null` if a valid license cannot be granted.

Returns: `true` if a valid `License` can be granted; otherwise, `false`.

#### Remarks
The `LicenseManager.IsValid` method returns `true` when the `type` parameter is not licensed, or when it is licensed and the `license` parameter is valid.

This method does not throw a `LicenseException` when it cannot grant a valid `License`. The `LicenseManager.Validate` method throws exceptions.

If the `license` parameter is not `null` after this call, the object asking for a `License` must dispose of the license by calling the `License.Dispose` method when the object is disposed of or finalized.

## LicenseManager.LockContext(Object) method

```csharp
public static void LockContext (object contextUser);
```

Prevents changes being made to the current `LicenseContext` of the given object.

Parameters:

- `contextUser`: The object whose current context you want to lock.

Exceptions:

- `InvalidOperationException`: The context is already locked.

#### Remarks
Use the `LicenseContext` to get the `License` of an object. This method locks the `LicenseContext`, preventing the `License` from being retrieved.

## LicenseManager.UnlockContext(Object) method

```csharp
public static void UnlockContext (object contextUser);
```

Allows changes to be made to the current `LicenseContext` of the given object.

Parameters:

- `contextUser`: The object whose current context you want to unlock.

Exceptions:

- `ArgumentException`: `contextUser` represents a different user than the one specified in a previous call to `LicenseManager.LockContext`.

#### Remarks
Use the `LicenseContext` to get the `License` of an object. This method unlocks the `LicenseContext`, allowing the `License` to be retrieved.

## LicenseManager.Validate(Type) method

```csharp
public static void Validate (Type type);
```

Determines whether a license can be granted for the specified type.

Parameters:

- `type`: A `Type` that represents the type of object that requests the license.

Exceptions:

- `LicenseException`: A `License` cannot be granted.

#### Remarks
This method throws a `LicenseException` when a valid `License` cannot be granted. The `LicenseManager.IsValid` method does not throw an exception.

## LicenseManager.Validate(Type, Object) method

```csharp
public static System.ComponentModel.License? Validate (Type type, object? instance);
```

Determines whether a license can be granted for the instance of the specified type.

Parameters:

- `type`: A `Type` that represents the type of object that requests the license.
- `instance`: An `Object` of the specified type or a type derived from the specified type.

Returns: A valid `License`.

Exceptions:

- `LicenseException`: The type is licensed, but a `License` cannot be granted.

#### Remarks
This method throws a `LicenseException` when a valid `License` cannot be granted. The `LicenseManager.IsValid` method does not throw an exception.

All objects asking for a `License` must dispose of the license by calling the `License.Dispose` method when the object is disposed of or finalized.
