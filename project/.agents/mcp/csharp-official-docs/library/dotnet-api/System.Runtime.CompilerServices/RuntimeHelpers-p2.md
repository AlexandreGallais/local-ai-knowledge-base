---
title: "RuntimeHelpers class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeHelpers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeHelpers class (part 2 of 2)

## RuntimeHelpers.PrepareMethod(RuntimeMethodHandle) method

```csharp
public static void PrepareMethod (RuntimeMethodHandle method);
```

Prepares a method for inclusion in a constrained execution region (CER).

Parameters:

- `method`: A handle to the method to prepare.

To be added.

## RuntimeHelpers.PrepareMethod(RuntimeMethodHandle, RuntimeTypeHandle[]) method

```csharp
public static void PrepareMethod (RuntimeMethodHandle method, RuntimeTypeHandle[]? instantiation);
```

Prepares a method for inclusion in a constrained execution region (CER) with the specified instantiation.

Parameters:

- `method`: A handle to the method to prepare.
- `instantiation`: The instantiation to pass to the method.

To be added.

## RuntimeHelpers.ProbeForSufficientStack() method

```csharp
public static void ProbeForSufficientStack ();
```

Probes for a certain amount of stack space to ensure that a stack overflow cannot happen within a subsequent block of code (assuming that your code uses only a finite and moderate amount of stack space).

To be added.

## RuntimeHelpers.RunClassConstructor(RuntimeTypeHandle) method

```csharp
public static void RunClassConstructor (RuntimeTypeHandle type);
```

Ensures that the type initializer (also known as a static constructor) for the specified type has been run.

Parameters:

- `type`: A type handle that specifies the type for which a type initializer should be run.

Exceptions:

- `TypeInitializationException`: The type initializer throws an exception.

#### Remarks
This method is used by compilers.

## RuntimeHelpers.RunModuleConstructor(ModuleHandle) method

```csharp
public static void RunModuleConstructor (ModuleHandle module);
```

Ensures a specified module constructor method has run by the time this method returns.

Parameters:

- `module`: A handle that specifies the module constructor method to run.

Exceptions:

- `TypeInitializationException`: The module constructor throws an exception.

#### Remarks
This method is used by compilers.

The module constructor will not be run more than once, even if this method is called multiple times.

## RuntimeHelpers.SizeOf(RuntimeTypeHandle) method

```csharp
public static int SizeOf (RuntimeTypeHandle type);
```

Gets the size of an object of the given type.

Parameters:

- `type`: The type to get the size of.

Returns: The size of instances of the type.

Exceptions:

- `ArgumentException`: The passed-in type is not a valid type to get the size of.

This API returns the same value as `Unsafe.SizeOf<T>` for the type that `type` represents.

## RuntimeHelpers.TryEnsureSufficientExecutionStack() method

```csharp
public static bool TryEnsureSufficientExecutionStack ();
```

Tries to ensure there is sufficient stack to execute the average .NET function.

Returns: `true` if sufficient stack is present; otherwise, `false`.

To be added.
