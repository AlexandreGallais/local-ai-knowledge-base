---
title: "SuppressGCTransitionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SuppressGCTransitionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SuppressGCTransitionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class SuppressGCTransitionAttribute : Attribute
```

Indicates that a garbage collection transition should be skipped when an unmanaged function call is made.

#### Remarks

This attribute is ignored if applied to a method without the `DllImportAttribute`.

Forgoing this transition can yield benefits when the cost of the transition is more than the execution time of the unmanaged function. However, avoiding this transition removes some of the guarantees the runtime provides through a normal P/Invoke. When exiting the managed runtime to enter an unmanaged function, the GC must transition from Cooperative mode into Preemptive mode. Full details on these modes can be found at https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/clr-code-guide.md#2.1.8.
Suppressing the GC transition is an advanced scenario and should not be done without fully understanding potential consequences.

One of these consequences is an impact to Mixed-mode debugging.
During Mixed-mode debugging, it is not possible to step into or set breakpoints in a P/Invoke that has been marked with this attribute. A workaround is to switch to native debugging and set a breakpoint in the native function.
In general, usage of this attribute is not recommended if debugging the P/Invoke is important, for example, stepping through the native code or diagnosing an exception thrown from the native code.

The P/Invoke method that this attribute is applied to must have all of the following properties:
* Native function always executes for a trivial amount of time (less than 1 microsecond).
* Native function does not perform a blocking syscall (for example, any type of I/O).
* Native function does not call back into the runtime (for example, Reverse P/Invoke).
* Native function does not throw exceptions.
* Native function does not manipulate locks or other concurrency primitives.

Consequences of invalid uses of this attribute include:

* GC starvation.
* Immediate runtime termination.
* Data corruption.

Applying this attribute can cause the P/Invoke export to be bound earlier as a side-effect of the calling method being JIT compiled. `EntryPointNotFoundException` or other exceptions might be thrown earlier than when the attribute is not applied.

## SuppressGCTransitionAttribute.SuppressGCTransitionAttribute() constructor

```csharp
public SuppressGCTransitionAttribute ();
```

Instance constructor.

To be added.
