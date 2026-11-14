---
title: "CallingConventions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CallingConventions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallingConventions enum

Namespace: `System.Reflection`

```csharp
public enum CallingConventions
```

Defines the valid calling conventions for a method.

#### Remarks
The native calling convention is the set of rules governing the order and layout of arguments passed to compiled methods. It also governs how to pass the return value, what registers to use for arguments, and whether the called or the calling method removes arguments from the stack.

#### Examples
_Code sample not included: ~/snippets/csharp/System/Type/GetConstructor/type_getconstructor3.cs._

## CallingConventions.Any field

```csharp
Any
```

Specifies that either the `Standard` or the `VarArgs` calling convention may be used.

## CallingConventions.ExplicitThis field

```csharp
ExplicitThis
```

Specifies that the signature is a function-pointer signature, representing a call to an instance or virtual method (not a static method). If `ExplicitThis` is set, `HasThis` must also be set. The first argument passed to the called method is still a `this` pointer, but the type of the first argument is now unknown. Therefore, a token that describes the type (or class) of the `this` pointer is explicitly stored into its metadata signature.

## CallingConventions.HasThis field

```csharp
HasThis
```

Specifies an instance or virtual method (not a static method). At run-time, the called method is passed a pointer to the target object as its first argument (the `this` pointer). The signature stored in metadata does not include the type of this first argument, because the method is known and its owner class can be discovered from metadata.

## CallingConventions.Standard field

```csharp
Standard
```

Specifies the default calling convention as determined by the common language runtime. Use this calling convention for static methods. For instance or virtual methods use `HasThis`.

## CallingConventions.VarArgs field

```csharp
VarArgs
```

Specifies the calling convention for methods with variable arguments.
