---
title: "DebuggerDisableUserUnhandledExceptionsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerDisableUserUnhandledExceptionsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerDisableUserUnhandledExceptionsAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerDisableUserUnhandledExceptionsAttribute : Attribute
```

If a .NET Debugger is attached that supports the `Debugger.BreakForUserUnhandledException` API, the debugger won't break on user-unhandled exceptions when the exception is caught by a method with this attribute, unless `Debugger.BreakForUserUnhandledException` is called.

## Remarks
Visual Studio has added support for catching asynchronous user-unhandled exceptions and it's enabled by default. This feature has existed for a long time for synchronous methods, but not for `async`/`await` methods. The `BreakForUserUnhandledException` method disables the feature for specific methods. This is useful for exceptions that propagate through user code but are expected to be handled by framework code. This attribute is designed to be used along with `BreakForUserUnhandledException`.

## Example

```csharp
        [MethodImpl(MethodImplOptions.NoInlining)]
        [DebuggerDisableUserUnhandledExceptions]
        static async Task InvokeUserCode(Func<Task> userCode)
        {
          try
          {
              await userCode();
          }
          catch (Exception ex)
          {
              if (TryHandleWithFilter(ex))
              {
                  return; // example case where we don't want to break for user-unhandled exceptions
              }

              Debugger.BreakForUserUnhandledException(e); // debugger will stop here and show the exception if attached.
          }
        }
```

## DebuggerDisableUserUnhandledExceptionsAttribute.DebuggerDisableUserUnhandledExceptionsAttribute() constructor

```csharp
public DebuggerDisableUserUnhandledExceptionsAttribute ();
```

Initializes a new instance of the `DebuggerDisableUserUnhandledExceptionsAttribute` class.

To be added.
