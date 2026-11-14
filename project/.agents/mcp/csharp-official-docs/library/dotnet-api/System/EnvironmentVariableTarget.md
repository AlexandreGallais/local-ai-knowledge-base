---
title: "EnvironmentVariableTarget enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/EnvironmentVariableTarget.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnvironmentVariableTarget enum

Namespace: `System`

```csharp
public enum EnvironmentVariableTarget
```

Specifies the location where an environment variable is stored or retrieved in a set or get operation.

#### Remarks

The `EnvironmentVariableTarget` enumeration is used by certain overloads of the `Environment.SetEnvironmentVariable`, `Environment.GetEnvironmentVariable`, and `Environment.GetEnvironmentVariables` methods to specify the location, or target, where the name and value of an environment variable is stored or retrieved.

The target can be one of three locations:

- The environment block associated with the current process (`EnvironmentVariableTarget.Process`).

The user creates the environment variable in a set operation. When the process terminates, the operating system destroys the environment variable in that process.

- The Windows operating system registry key <example-value> for environment variables associated with the current user (`EnvironmentVariableTarget.User`).

On Windows systems, when the user creates the environment variable in a set operation, the operating system stores the environment variable in the system registry, but not in the current process. If the user starts a new process, the operating system copies the environment variable from the registry to that process. When the process terminates, the operating system destroys the environment variable in that process. However, the environment variable in the registry persists until the user removes it programmatically or by means of an operating system tool.

On Unix-based systems, an attempt to create an enviroment variable with `EnvironmentVariable.User` has no effect, and an attempt to retrieve an enviroment variable using `EnvironmentVariable.User` returns `null` (in C#) or `Nothing` (in Visual Basic).

- The registry key <example-value> for environment variables associated with all users on the local machine (`EnvironmentVariableTarget.Machine`).

When a user creates the environment variable in a set operation, the operating system stores the environment variable in the system registry, but not in the current process. If any user on the local machine starts a new process, the operating system copies the environment variable from the registry to that process. When the process terminates, the operating system destroys the environment variable in that process. However, the environment variable in the registry persists until a user removes it programmatically or by means of an operating system tool.

On Unix-based systems, an attempt to create an enviroment variable with `EnvironmentVariable.Machine` has no effect, and an attempt to retrieve an enviroment variable using `EnvironmentVariable.Machine` returns `null` (in C#) or `Nothing` (in Visual Basic).

#### Examples

The following example uses the `EnvironmentVariableTarget` enumeration in methods that create, retrieve, and delete environment variables. The output from the example shows that environmnent variables stored and retrieved without specifying a `EnvironmentVariableTarget` value are stored in the environment block associated with the current process (`EnvironmentVariableTarget.Process`). The example output from Unix-based systems also shows that attempts to define an environment variable with a value other than `EnvironmentVariableTarget.Process` is ignored.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/gsev.cs._

## EnvironmentVariableTarget.Machine field

```csharp
Machine
```

The environment variable is stored or retrieved from the `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment` key in the Windows operating system registry. This value should be used on .NET implementations running on Windows systems only.

## EnvironmentVariableTarget.Process field

```csharp
Process
```

The environment variable is stored or retrieved from the environment block associated with the current process.

## EnvironmentVariableTarget.User field

```csharp
User
```

The environment variable is stored or retrieved from the `HKEY_CURRENT_USER\Environment` key in the Windows operating system registry. This value should be used on .NET implementations running on Windows systems only.
