---
title: "DebuggerStepThroughAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerStepThroughAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerStepThroughAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerStepThroughAttribute : Attribute
```

Instructs the debugger to step through the code instead of stepping into the code. This class cannot be inherited.

#### Remarks
This attribute is provided for use by source code debuggers; the common language runtime is not affected by it. For example, the Visual Studio debugger does not stop in a method that is marked with this attribute even if a breakpoint is set in the method.

The `DebuggerStepThroughAttribute` attribute affects the Just My Code (JMC) feature of Visual Studio in the following ways:

- If JMC is enabled, the Visual Studio debugger will not stop at a breakpoint in a method marked with the `DebuggerStepThroughAttribute` attribute.

- If JMC is disabled, the debugger stops at the breakpoint even if the method is marked with the `DebuggerStepThroughAttribute`.

The following code shows how the Visual Basic <example-value> uses the attribute.

```vb
<System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        components = New System.ComponentModel.Container()
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.Text = "Form1"
    End Sub
```

This attribute avoids having to step into compiler-provided code and only steps into developer-provided code. For example, if you are stepping through code by using the **F11** (Step Into) key, the attribute will cause the step to behave like an **F10** (Step Over) key for compiler-provided code. The method won't be stepped into, but it will be executed.

For more information about using attributes, see Attributes.

## DebuggerStepThroughAttribute.DebuggerStepThroughAttribute() constructor

```csharp
public DebuggerStepThroughAttribute ();
```

Initializes a new instance of the `DebuggerStepThroughAttribute` class.

To be added.
