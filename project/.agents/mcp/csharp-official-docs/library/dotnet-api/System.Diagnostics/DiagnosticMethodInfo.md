---
title: "DiagnosticMethodInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DiagnosticMethodInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DiagnosticMethodInfo class

Namespace: `System.Diagnostics`

```csharp
public sealed class DiagnosticMethodInfo
```

Represents diagnostic information about a method. Information provided by this class is similar to information

provided by `MethodBase` but it's meant for logging and tracing purposes.

To be added.

## DiagnosticMethodInfo.DeclaringAssemblyName property

```csharp
public string DeclaringAssemblyName { get; }
```

Gets the display name of the assembly that owns this method.

Returns: To be added.

To be added.

## DiagnosticMethodInfo.DeclaringTypeName property

```csharp
public string DeclaringTypeName { get; }
```

Gets the fully qualified name of the type that owns this method, including its namespace but not its assembly.

Returns: To be added.

To be added.

## DiagnosticMethodInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the method.

Returns: To be added.

Only the simple name of the method is returned, without information about generic parameters or arity.

## DiagnosticMethodInfo.Create(Delegate) method

```csharp
public static System.Diagnostics.DiagnosticMethodInfo? Create (Delegate delegate);
```

Creates a `DiagnosticMethodInfo` that represents the target of the delegate.

Parameters:

- `delegate`: The delegate to examine.

Returns: An object that represents the method.

This returns the definition of the target method, with stripped instantiation information.

The return value might be `null` if the `StackTraceSupport` feature switch is set to `false`.

## DiagnosticMethodInfo.Create(StackFrame) method

```csharp
public static System.Diagnostics.DiagnosticMethodInfo? Create (System.Diagnostics.StackFrame frame);
```

Creates a `DiagnosticMethodInfo` that represents the method this stack frame is associtated with.

Parameters:

- `frame`: The stack frame to examine.

Returns: An object that represents the stack frame.

This returns the definition of the target method, with stripped instantiation information.

The return value might be `null` if the `StackTraceSupport` feature switch is set to `false`.

The return value might be `null` if the target method is unknown.
