---
title: "DebuggerNonUserCodeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggerNonUserCodeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggerNonUserCodeAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggerNonUserCodeAttribute : Attribute
```

Identifies a type or member that is not part of the user code for an application.

#### Remarks
Designer provided types and members that are not part of the code specifically created by the user can complicate the debugging experience. This attribute suppresses the display of these adjunct types and members in the debugger window and automatically steps through, rather than into, designer provided code.  When the debugger encounters this attribute when stepping through user code, the user experience is to not see the designer provided code and to step to the next user-supplied code statement.

> **Note:**
>  The common language runtime attaches no semantics to this attribute. It is provided for use by source code debuggers. For example, in Visual Studio 2005, the debugger does not display an element with this attribute in the debugger window, does not stop in a method with this attribute, and does not allow a breakpoint to be set in the method.

The debugger behavior when the `DebuggerNonUserCodeAttribute` is present is similar to using a combination of the `DebuggerHiddenAttribute` attribute, which hides the code from the debugger, and the `DebuggerStepThroughAttribute` attribute, which tells the debugger to step through, rather than into, the code it is applied to.

#### Examples
The following code example shows the use of this attribute in a Visual Basic project.

```vb
' Form overrides Dispose to clean up the component list.  
<System.Diagnostics.DebuggerNonUserCode()> _  
Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)  
    If disposing AndAlso components IsNot Nothing Then  
        components.Dispose()  
    End If  
    MyBase.Dispose(disposing)  
End Sub  
```

## DebuggerNonUserCodeAttribute.DebuggerNonUserCodeAttribute() constructor

```csharp
public DebuggerNonUserCodeAttribute ();
```

Initializes a new instance of the `DebuggerNonUserCodeAttribute` class.

#### Remarks
For a description of the function of this constructor and an example of its use, see the `DebuggerNonUserCodeAttribute` class.
