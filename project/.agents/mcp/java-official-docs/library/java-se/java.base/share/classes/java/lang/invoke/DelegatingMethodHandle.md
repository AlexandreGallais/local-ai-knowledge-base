# DelegatingMethodHandle class (java.lang.invoke)

```java
/*non-public*/ abstract sealed class DelegatingMethodHandle extends MethodHandle permits MethodHandleImpl.AsVarargsCollector, MethodHandleImpl.WrappedMember, MethodHandleImpl.IntrinsicMethodHandle, MethodHandleImpl.CountingWrapper
```

A method handle whose invocation behavior is determined by a target.
The delegating MH itself can hold extra "intentions" beyond the simple behavior.
@author jrose

## DelegatingMethodHandle.getTarget()

```java
protected abstract MethodHandle getTarget()
```

Define this to extract the delegated target which supplies the invocation behavior.