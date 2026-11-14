---
title: "LicenseException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseException class

Namespace: `System.ComponentModel`

```csharp
public class LicenseException : SystemException
```

Represents the exception thrown when a component cannot be granted a license.

#### Remarks
The `LicenseManager.Validate` method throws `LicenseException` when a component cannot obtain a valid license. This occurs when a component is either not licensed, or is licensed but cannot be granted a valid license.

#### Examples
The following code example shows how to catch a `LicenseException` and interpret its content. In the sample, the application calls the `LicenseManager.Validate` method for a `Form` that is not licensed. Upon catching the exception, the sample fetches the respective error message, the type of component that was not granted a license, the stack trace, and the origin of the exception.

This example requires that you have specified the `LicenseProvider` by marking the `Form` with a `LicenseProviderAttribute` attribute. For more information on how to do this, see the `LicenseManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseException/Overview/licenseex.cs._

## LicenseException.LicenseException(Type) constructor

```csharp
public LicenseException (Type? type);
```

Initializes a new instance of the `LicenseException` class for the type of component that was denied a license.

Parameters:

- `type`: A `Type` that represents the type of component that was not granted a license.

To be added.

## LicenseException.LicenseException(SerializationInfo, StreamingContext) constructor

```csharp
protected LicenseException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `LicenseException` class with the given `SerializationInfo` and `StreamingContext`.

Parameters:

- `info`: The `SerializationInfo` to be used for deserialization.
- `context`: The destination to be used for deserialization.

To be added.

## LicenseException.LicenseException(Type, Object) constructor

```csharp
public LicenseException (Type? type, object? instance);
```

Initializes a new instance of the `LicenseException` class for the type and the instance of the component that was denied a license.

Parameters:

- `type`: A `Type` that represents the type of component that was not granted a license.
- `instance`: The instance of the component that was not granted a license.

To be added.

## LicenseException.LicenseException(Type, Object, String) constructor

```csharp
public LicenseException (Type? type, object? instance, string? message);
```

Initializes a new instance of the `LicenseException` class for the type and the instance of the component that was denied a license, along with a message to display.

Parameters:

- `type`: A `Type` that represents the type of component that was not granted a license.
- `instance`: The instance of the component that was not granted a license.
- `message`: The exception message to display.

To be added.

## LicenseException.LicenseException(Type, Object, String, Exception) constructor

```csharp
public LicenseException (Type? type, object? instance, string? message, Exception? innerException);
```

Initializes a new instance of the `LicenseException` class for the type and the instance of the component that was denied a license, along with a message to display and the original exception thrown.

Parameters:

- `type`: A `Type` that represents the type of component that was not granted a license.
- `instance`: The instance of the component that was not granted a license.
- `message`: The exception message to display.
- `innerException`: An `Exception` that represents the original exception.

To be added.

## LicenseException.LicensedType property

```csharp
public Type? LicensedType { get; }
```

Gets the type of the component that was not granted a license.

Returns: A `Type` that represents the type of component that was not granted a license.

To be added.

## LicenseException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` with information about the exception.

Parameters:

- `info`: The `SerializationInfo` to be used for deserialization.
- `context`: The destination to be used for deserialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.
