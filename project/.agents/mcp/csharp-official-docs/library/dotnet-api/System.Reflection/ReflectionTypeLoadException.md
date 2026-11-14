---
title: "ReflectionTypeLoadException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ReflectionTypeLoadException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReflectionTypeLoadException class

Namespace: `System.Reflection`

```csharp
public sealed class ReflectionTypeLoadException : SystemException
```

The exception that is thrown by the `Module.GetTypes` method if any of the classes in a module cannot be loaded. This class cannot be inherited.

#### Remarks
`ReflectionTypeLoadException` uses the HRESULT COR_E_REFLECTIONTYPELOAD that has the value 0x80131602.

An instance contains the array of classes (Types property) that were defined in the module and were loaded. The array can contain some null values. There is also another array of exceptions (`LoaderExceptions` property). This exception array represents the exceptions that were thrown by the class loader. The holes in the class array line up with the exceptions.

This exception exposes both the array of classes and the array of `TypeLoadExceptions`.

## ReflectionTypeLoadException.ReflectionTypeLoadException(Type[], Exception[]) constructor

```csharp
public ReflectionTypeLoadException (Type?[]? classes, Exception?[]? exceptions);
```

Initializes a new instance of the `ReflectionTypeLoadException` class with the given classes and their associated exceptions.

Parameters:

- `classes`: An array of type `Type` containing the classes that were defined in the module and loaded. This array can contain null reference (`Nothing` in Visual Basic) values.
- `exceptions`: An array of type `Exception` containing the exceptions that were thrown by the class loader. The null reference (`Nothing` in Visual Basic) values in the `classes` array line up with the exceptions in this `exceptions` array.

To be added.

## ReflectionTypeLoadException.ReflectionTypeLoadException(Type[], Exception[], String) constructor

```csharp
public ReflectionTypeLoadException (Type?[]? classes, Exception?[]? exceptions, string? message);
```

Initializes a new instance of the `ReflectionTypeLoadException` class with the given classes, their associated exceptions, and exception descriptions.

Parameters:

- `classes`: An array of type `Type` containing the classes that were defined in the module and loaded. This array can contain null reference (`Nothing` in Visual Basic) values.
- `exceptions`: An array of type `Exception` containing the exceptions that were thrown by the class loader. The null reference (`Nothing` in Visual Basic) values in the `classes` array line up with the exceptions in this `exceptions` array.
- `message`: A `String` describing the reason the exception was thrown.

To be added.

## ReflectionTypeLoadException.LoaderExceptions property

```csharp
public Exception?[] LoaderExceptions { get; }
```

Gets the array of exceptions thrown by the class loader.

Returns: An array of type `Exception` containing the exceptions thrown by the class loader. The null values in the `ReflectionTypeLoadException.Types` array of this instance line up with the exceptions in this array.

#### Remarks
The `LoaderExceptions` property retrieves an array of type `Exception` that is parallel to the `ReflectionTypeLoadException.Types` array. This array will contain null values whenever reflection cannot load a class.

## ReflectionTypeLoadException.Message property

```csharp
public override string Message { get; }
```

Gets the error message for this exception.

Returns: A string containing the error message for this exception.

To be added.

## ReflectionTypeLoadException.Types property

```csharp
public Type?[] Types { get; }
```

Gets the array of classes that were defined in the module and loaded.

Returns: An array of type `Type` containing the classes that were defined in the module and loaded. This array can contain some `null` values.

#### Remarks
The `LoaderExceptions` property retrieves an array of type `Exception` that is parallel to this `Types` array. This array will contain null values whenever reflection cannot load a class.

## ReflectionTypeLoadException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Provides an `ISerializable` implementation for serialized objects.

Parameters:

- `info`: The information and data needed to serialize or deserialize an object.
- `context`: The context for the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## ReflectionTypeLoadException.ToString() method

```csharp
public override string ToString ();
```

Returns the fully qualified name of this exception and the messages for all the loader exceptions.

Returns: A string containing the fully qualified name of this exception and the exception messages for its loader exceptions.

To be added.
