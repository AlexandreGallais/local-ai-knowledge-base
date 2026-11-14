---
title: "CompressedStack class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CompressedStack.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompressedStack class

Namespace: `System.Threading`

```csharp
public sealed class CompressedStack : System.Runtime.Serialization.ISerializable
```

Provides methods for setting and capturing the compressed stack on the current thread. This class cannot be inherited.

To be added.

## CompressedStack.Capture() method

```csharp
public static System.Threading.CompressedStack Capture ();
```

Captures the compressed stack from the current thread.

Returns: A `CompressedStack` object.

To be added.

## CompressedStack.CreateCopy() method

```csharp
public System.Threading.CompressedStack CreateCopy ();
```

Creates a copy of the current compressed stack.

Returns: A `CompressedStack` object representing the current compressed stack.

To be added.

## CompressedStack.GetCompressedStack() method

```csharp
public static System.Threading.CompressedStack GetCompressedStack ();
```

Gets the compressed stack for the current thread.

Returns: A `CompressedStack` for the current thread.

Exceptions:

- `SecurityException`: A caller in the call chain does not have permission to access unmanaged code.

-or-

The request for `StrongNameIdentityPermission` failed.

To be added.

## CompressedStack.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the logical context information needed to recreate an instance of this execution context.

Parameters:

- `info`: The `SerializationInfo` object to be populated with serialization information.
- `context`: The `StreamingContext` structure representing the destination context of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## CompressedStack.Run(CompressedStack, ContextCallback, Object) method

```csharp
public static void Run (System.Threading.CompressedStack compressedStack, System.Threading.ContextCallback callback, object? state);
```

Runs a method in the specified compressed stack on the current thread.

Parameters:

- `compressedStack`: The `CompressedStack` to set.
- `callback`: A `ContextCallback` that represents the method to be run in the specified security context.
- `state`: The object to be passed to the callback method.

Exceptions:

- `ArgumentException`: `compressedStack` is `null`.

To be added.
