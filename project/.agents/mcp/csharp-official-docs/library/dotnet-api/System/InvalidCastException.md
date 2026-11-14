---
title: "InvalidCastException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InvalidCastException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidCastException class

Namespace: `System`

```csharp
public class InvalidCastException : SystemException
```

The exception that is thrown for invalid casting or explicit conversion.

.NET supports automatic conversion from derived types to their base types and back to the derived type, as well as from types that present interfaces to interface objects and back. It also includes a variety of mechanisms that support custom conversions. For more information, see Type Conversion in .NET.

An `InvalidCastException` exception is thrown when the conversion of an instance of one type to another type is not supported. For example, attempting to convert a `Char` value to a `DateTime` value throws an `InvalidCastException` exception. It differs from an `OverflowException` exception, which is thrown when a conversion of one type to another is supported, but the value of the source type is outside the range of the target type. An `InvalidCastException` exception is caused by developer error and should not be handled in a `try/catch` block. Instead, the cause of the exception should be eliminated.

For information about conversions supported by the system, see the `Convert` class. For errors that occur when the destination type can store source type values but is not large enough to store a specific source value, see the `OverflowException` exception.

> **Note:**
> In many cases, your language compiler detects that no conversion exists between the source type and the target type and issues a compiler error.

Some of the conditions under which an attempted conversion throws an `InvalidCastException` exception are discussed in the following sections.

For an explicit reference conversion to be successful, the source value must be `null`, or the object type referenced by the source argument must be convertible to the destination type by an implicit reference conversion.

The following intermediate language (IL) instructions throw an `InvalidCastException` exception:

- `castclass`
- `refanyval`
- `unbox`

`InvalidCastException` uses the HRESULT `COR_E_INVALIDCAST`, which has the value 0x80004002.

For a list of initial property values for an instance of `InvalidCastException`, see the `InvalidCastException.%23ctor` constructors.

#### Primitive types and IConvertible

You directly or indirectly call a primitive type's `IConvertible` implementation that does not support a particular conversion. For example, trying to convert a `Boolean` value to a `Char` or a `DateTime` value to an `Int32` throws an `InvalidCastException` exception. The following example calls both the `Boolean.System%23IConvertible%23ToChar` and `ToChar` methods to convert a `Boolean` value to a `Char`. In both cases, the method call throws an `InvalidCastException` exception.

_Code sample not included: ~/snippets/csharp/System/InvalidCastException/Overview/iconvertible1.cs._

Because the conversion is not supported, there is no workaround.

#### The Convert.ChangeType method

You've called the `Convert.ChangeType` method to convert an object from one type to another, but one or both types don't implement the `IConvertible` interface.

In most cases, because the conversion is not supported, there is no workaround. In some cases, a possible workaround is to manually assign property values from the source type to similar properties of a the target type.

#### Narrowing conversions and IConvertible implementations

Narrowing operators define the explicit conversions supported by a type. A casting operator in C# or the `CType` conversion method in Visual Basic (if `Option Strict` is on)  is required to perform the conversion.

However, if neither the source type nor the target type defines an explicit or narrowing conversion between the two types, and the `IConvertible` implementation of one or both types doesn't support a conversion from the source type to the target type, an `InvalidCastException` exception is thrown.

In most cases, because the conversion is not supported, there is no workaround.

#### Downcasting

You're downcasting, that is, trying to convert an instance of a base type to one of its derived types. In the following example, trying to convert a `Person` object to a `PersonWithID` object fails.

_Code sample not included: ~/snippets/csharp/System/InvalidCastException/Overview/basetoderived1.cs._

As the example shows, the downcast succeeds only if the `Person` object was created by an upcast from a `PersonWithId` object to a `Person` object, or if the `Person` object is `null`.

#### Conversion from an interface object

You're attempting to convert an interface object to a type that implements that interface, but the target type is not the same type or a base class of the type from which the interface object was originally derived. The following example throws an `InvalidCastException` exception when it attempts to convert an `IFormatProvider` object to a `DateTimeFormatInfo` object. The conversion fails because although the `DateTimeFormatInfo` class implements the `IFormatProvider` interface, the `DateTimeFormatInfo` object is not related to the `CultureInfo` class from which the interface object was derived.

_Code sample not included: ~/snippets/csharp/System/InvalidCastException/Overview/Interface1.cs._

As the exception message indicates, the conversion would succeed only if the interface object is converted back to an instance of the original type, in this case a  `CultureInfo`. The conversion would also succeed if the interface object is converted to an instance of a base type of the original type.

#### String conversions

You're trying to convert a value or an object to its string representation by using a casting operator in C#. In the following example, both the attempt to cast a `Char` value to a string and the attempt to cast an integer to a string throw an `InvalidCastException` exception.

_Code sample not included: ~/snippets/csharp/System/InvalidCastException/Overview/ToString1.cs._

> **Note:**
> Using the Visual Basic `CStr` operator to convert a value of a primitive type to a string succeeds. The operation does not throw an `InvalidCastException` exception.

To successfully convert an instance of any type to its string representation, call its `ToString` method, as the following example does. The `ToString` method is always present, since the `Object.ToString` method is defined by the `Object` class and therefore is either inherited or overridden by all managed types.

_Code sample not included: ~/snippets/csharp/System/InvalidCastException/Overview/ToString2.cs._

#### Visual Basic 6.0 migration

You're upgrading a Visual Basic 6.0 application with a call to a custom event in a user control to Visual Basic .NET, and an `InvalidCastException` exception is thrown with the message, "Specified cast is not valid." To eliminate this exception, change the line of code in your form (such as `Form1`)

```vb
Call UserControl11_MyCustomEvent(UserControl11, New UserControl1.MyCustomEventEventArgs(5))
```

and replace it with the following line of code:

```vb
Call UserControl11_MyCustomEvent(UserControl11(0), New UserControl1.MyCustomEventEventArgs(5))
```

## InvalidCastException.InvalidCastException() constructor

```csharp
public InvalidCastException ();
```

Initializes a new instance of the `InvalidCastException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Cannot cast from source type to destination type." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `InvalidCastException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## InvalidCastException.InvalidCastException(String) constructor

```csharp
public InvalidCastException (string? message);
```

Initializes a new instance of the `InvalidCastException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `InvalidCastException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## InvalidCastException.InvalidCastException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidCastException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidCastException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## InvalidCastException.InvalidCastException(String, Exception) constructor

```csharp
public InvalidCastException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidCastException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or returns `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidCastException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## InvalidCastException.InvalidCastException(String, Int32) constructor

```csharp
public InvalidCastException (string? message, int errorCode);
```

Initializes a new instance of the `InvalidCastException` class with a specified message and error code.

Parameters:

- `message`: The message that indicates the reason the exception occurred.
- `errorCode`: The error code (HRESULT) value associated with the exception.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This constructor supplies an HRESULT value that is accessible to inheritors of the `InvalidCastException` class, via the protected `HResult` property of the `Exception` class.

The following table shows the initial property values for an instance of `InvalidCastException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|
