# NativeMethodHandle class (java.lang.invoke)

```java
/*non-public*/ final class NativeMethodHandle extends MethodHandle
```

This class models a method handle to a native function. A native method handle is made up of a {@link NativeEntryPoint},
which is used to capture the characteristics of the native call (such as calling convention to be used,
or whether a native transition is required) and a <em>fallback</em> method handle, which can be used
when intrinsification of this method handle is not possible.

## NativeMethodHandle.make(NativeEntryPoint)

```java
public static MethodHandle make(NativeEntryPoint nep)
```

Creates a new native method handle with given {@link NativeEntryPoint} and <em>fallback</em> method handle.