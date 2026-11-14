---
title: "DebuggerStepperBoundaryAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerStepperBoundaryAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerStepperBoundaryAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerStepperBoundaryAttribute : Attribute
```

Indicates the code following the attribute is to be executed in run, not step, mode.

#### Remarks
The `DebuggerStepperBoundaryAttribute` attribute is used as an escape from the effect of a `DebuggerNonUserCodeAttribute`. When executing within the boundaries of the `DebuggerNonUserCodeAttribute`, designer-provided code is executed as a step-through until the next user supplied code is encountered. When context switches are made on a thread, the next user-supplied code module stepped into may not relate to the code that was in the process of being debugged. To avoid this debugging experience, use the `DebuggerStepperBoundaryAttribute` to escape from stepping through code to running code. For example, in Visual Studio 2005, encountering a `DebuggerStepperBoundaryAttribute` while stepping through code using the F10 key (or **Step Over** command) has the same effect as pressing the F5 key or using the **Start Debugging** command.

## DebuggerStepperBoundaryAttribute.DebuggerStepperBoundaryAttribute() constructor

```csharp
public DebuggerStepperBoundaryAttribute ();
```

Initializes a new instance of the `DebuggerStepperBoundaryAttribute` class.

#### Remarks
For a description of the purpose of this constructor, see the `DebuggerStepperBoundaryAttribute` class.
