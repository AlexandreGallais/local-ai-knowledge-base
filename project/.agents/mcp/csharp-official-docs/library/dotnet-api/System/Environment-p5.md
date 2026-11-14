---
title: "Environment class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment class (part 5 of 5)

## Environment.SetEnvironmentVariable(String, String, EnvironmentVariableTarget) method

```csharp
public static void SetEnvironmentVariable (string variable, string? value, EnvironmentVariableTarget target);
```

Creates, modifies, or deletes an environment variable stored in the current process or in the Windows operating system registry key <example-value> for the current user or local machine.

Parameters:

- `variable`: The name of an environment variable.
- `value`: A value to assign to `variable`.
- `target`: One of the enumeration values that specifies the location of the environment variable.

Exceptions:

- `ArgumentNullException`: `variable` is `null`.
- `ArgumentException`: `variable` contains a zero-length string, an initial hexadecimal zero character (0x00), or an equal sign ("=").

-or-

The length of `variable` is greater than or equal to 32,767 characters.

-or-

`target` is not a member of the `EnvironmentVariableTarget` enumeration.

-or-

`target` is `EnvironmentVariableTarget.Machine` or `EnvironmentVariableTarget.User`, and the length of `variable` is greater than or equal to 255.

-or-

`target` is `EnvironmentVariableTarget.Process` and the length of `value` is greater than or equal to 32,767 characters.

-or-

An error occurred during the execution of this operation.
- `SecurityException`: The caller does not have the required permission to perform this operation.

#### Remarks

The `SetEnvironmentVariable` method lets you define an environment variable that is available to the current process (the `Process` value). Environment variables that are unique to the current process environment block persist only until the process ends.

In addition, on Windows systems only, the `SetEnvironmentVariable` method lets you define an environment variable that is available to all processes that run on a machine (the `Machine` value) and to all processes run by a user (the `User` value). Per-machine and per-user environment variables are copied into the environment block of the current process.

On Unix-like systems, calls to the `SetEnvironmentVariable` method with a value of `Machine` or `User` are ignored.

On Unix-like systems, calls to the `SetEnvironmentVariable` method with a value of `Process` have no effect on any native libraries that are, or will be, loaded. (Conversely, in-process environment modifications made by native libraries aren't seen by managed callers.)

If the `value` argument is not `null` and the environment variable named by the `variable` argument doesn't exist, the environment variable is created and assigned the contents of `value`. If it does exist, its value is modified.

If `variable` contains a non-initial hexadecimal zero character, the characters before the zero character are considered the environment variable name and all subsequent characters are ignored.

If `value` contains a non-initial hexadecimal zero character, the characters before the zero character are assigned to the environment variable and all subsequent characters are ignored.

If `value` is `null` (or empty in versions prior to .NET 9) and the environment variable named by `variable` exists, the environment variable is deleted. `value` is considered empty under any of the following conditions:

- It is `Empty`.
- It consists of a single character whose value is U+0000.

If `variable` doesn't exist, no error occurs although the operation can't be performed. Be careful when `target` is `Machine`, because you can accidentally delete an environment variable that affects your entire local machine, not just the current process or user.

#### EnvironmentVariableTarget.Machine and EnvironmentVariableTarget.User on Windows systems

If `target` is `User`, the environment variable is stored in the HKEY_CURRENT_USER\Environment key of the local computer's registry. It is also copied to instances of File Explorer that are running as the current user. The environment variable is then inherited by any new processes that the user launches from File Explorer.

Similarly, if `target` is `Machine`, the environment variable is stored in the HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Session Manager\Environment key of the local computer's registry. It is also copied to all instances of File Explorer. The environment variable is then inherited by any new processes that are launched from File Explorer.

If `target` is `User` or `Machine`, other applications are notified of the set operation by a Windows `WM_SETTINGCHANGE` message.

If `target` is `User` or `Machine`, we recommend keeping `value` under 2,048 bytes (as stored in the Windows registry) for registry efficiency. This isn't a hard limit.

#### Examples

The following example creates environment variables for the `Process`, `User`, and `Machine` targets, checks whether the operating system registry contains the user and machine environment variables, then deletes the environment variables. Because .NET on Unix-like systems does not support per-user and per-machine environment variables, only `SetEnvironmentVariable` and `SetEnvironmentVariable` with a value of `Process` successfully store an environment variable to the process environment block.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/gsev.cs._
