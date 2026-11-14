---
title: "Exception class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Exception.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Exception class (part 4 of 4)

## Exception.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

When overridden in a derived class, sets the `SerializationInfo` with information about the exception.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` parameter is a null reference (`Nothing` in Visual Basic).

To be added.

## Exception.GetType() method

```csharp
public Type GetType ();
```

Gets the runtime type of the current instance.

Returns: A `Type` object that represents the exact runtime type of the current instance.

#### Remarks
The `Exception.GetType` method exists to support the .NET infrastructure, and internally invokes the fundamental method, `Object.GetType`.

## Exception.ToString() method

```csharp
public override string ToString ();
```

Creates and returns a string representation of the current exception.

Returns: A string representation of the current exception.

#### Remarks
`Exception.ToString` returns a representation of the current exception that is intended to be understood by humans. Where the exception contains culture-sensitive data, the string representation returned by `ToString` is required to take into account the current system culture. Although there are no exact requirements for the format of the returned string, it should attempt to reflect the value of the object as perceived by the user.

The default implementation of `Exception.ToString` obtains the name of the class that threw the current exception, the message, the result of calling `Exception.ToString` on the inner exception, and the result of calling `Environment.StackTrace`. If any of these members is `null`, its value is not included in the returned string.

If there is no error message or if it is an empty string (""), then no error message is returned. The name of the inner exception and the stack trace are returned only if they are not `null`.

This method overrides `Object.ToString`.

#### Examples
The following example causes an exception and displays the result of calling `Exception.ToString` on that exception. Note that the `Exception.ToString` method is called implicitly when the Exception class instance appears in the argument list of the `Console.WriteLine` method.

_Code sample not included: ~/snippets/csharp/System/Exception/ToString/ToStringEx1.cs._

## Exception.SerializeObjectState event

```csharp
protected event EventHandler<System.Runtime.Serialization.SafeSerializationEventArgs>? SerializeObjectState;
```

Occurs when an exception is serialized to create an exception state object that contains serialized data about the exception.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.
