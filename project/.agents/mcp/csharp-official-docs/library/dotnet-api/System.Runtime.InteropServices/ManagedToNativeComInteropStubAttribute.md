---
title: "ManagedToNativeComInteropStubAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ManagedToNativeComInteropStubAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ManagedToNativeComInteropStubAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ManagedToNativeComInteropStubAttribute : Attribute
```

Provides support for user customization of interop stubs in managed-to-COM interop scenarios.

#### Remarks
This attribute enables interop developers who have knowledge about marshaling and the inner workings of interop calls to do the following:

- Take advantage of customized interop stubs at build time instead of run time.

- Debug customized interop stubs.

- Provide marshaling capabilities within a stub that the runtime does not provide.

- Provide user-specific method dispatch capabilities.

You apply the attribute on a method in an interface to specify a corresponding stub method for managed-to-native COM interop.

If this attribute is encountered during run time, the common language runtime does not dynamically generate an interop stub. Instead, it invokes the custom stub that was created at build time.

The `ManagedToNativeComInteropStubAttribute` attribute has the following characteristics:

- The attribute can be used only on methods from interfaces that are marked `[ComImport]`. If the attribute is applied to non-interface types, it is ignored by the runtime.

- The attribute can be used only once on the same method in an interface. If it is used more than once, the compiler generates a duplicated attribute error.

- The attribute is not inheritable from a base interface. Derived interfaces must explicitly assign the attribute.

- The assembly that contains the attributed method must also contain the customized stub.

Overloaded stub methods are valid. Although you specify only the type and the name of the stub method, the runtime will discover the corresponding stub. It does this by examining all the arguments on the interface method, and then performing full signature matching by using an explicit `this` pointer.

It is also possible for multiple methods in an interface to share the same stub method; however, you should be careful when you use shared stubs.

> **Note:**
>  Stub methods must be static.

You could inform the runtime to use a customized interop stub at build time instead of run time with the following C# code:

```
[ComImport]
interface IMyInterface
{
    [ManagedToNativeComInteropStubAttribute(typeof(TestStubClass),
              "ForwardTestStub")]
    void GetString (string arg);
}
```

You could then use the following code to declare the corresponding stub method:

```
class TestStubClass
{
    internal static void ForwardTestStub(IMyInterface thisObject,
             string arg) {…}
}
```

## ManagedToNativeComInteropStubAttribute.ManagedToNativeComInteropStubAttribute(Type, String) constructor

```csharp
public ManagedToNativeComInteropStubAttribute (Type classType, string methodName);
```

Initializes a new instance of the `ManagedToNativeComInteropStubAttribute` class with the specified class type and method name.

Parameters:

- `classType`: The class that contains the required stub method.
- `methodName`: The name of the stub method.

Exceptions:

- `ArgumentException`: `methodName` cannot be found.

-or-

The method is not static or non-generic.

-or-

The method's parameter list does not match the expected parameter list for the stub.
- `MethodAccessException`: The interface that contains the managed interop method has no access to the stub method, because the stub method has private or protected accessibility, or because of a security issue.

To be added.

## ManagedToNativeComInteropStubAttribute.ClassType property

```csharp
public Type ClassType { get; }
```

Gets the class that contains the required stub method.

Returns: The class that contains the customized interop stub.

To be added.

## ManagedToNativeComInteropStubAttribute.MethodName property

```csharp
public string MethodName { get; }
```

Gets the name of the stub method.

Returns: The name of a customized interop stub.

To be added.
