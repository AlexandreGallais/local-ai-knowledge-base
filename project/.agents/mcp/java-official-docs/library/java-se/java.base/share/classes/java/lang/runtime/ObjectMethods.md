---
title: "ObjectMethods class (java.lang.runtime)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/runtime/ObjectMethods.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectMethods class (java.lang.runtime)

```java
public final class ObjectMethods
```

Bootstrap methods for state-driven implementations of core methods,
including `Object.equals(Object)`, `Object.hashCode()`, and
`Object.toString()`.  These methods may be used, for example, by
Java compiler implementations to implement the bodies of `Object`
methods for record classes.

**Since:** 16

## ObjectMethods.bootstrap(MethodHandles.Lookup, String, TypeDescriptor, Class<?>, String, MethodHandle...)

```java
public static Object bootstrap(MethodHandles.Lookup lookup, String methodName, TypeDescriptor type, Class<?> recordClass, String names, MethodHandle... getters) throws Throwable
```

Bootstrap method to generate the `Object.equals(Object)`,
`Object.hashCode()`, and `Object.toString()` methods, based
on a description of the component names and accessor methods, for either
`invokedynamic` call sites or dynamic constant pool entries.

For more detail on the semantics of the generated methods see the specification
of `java.lang.Record.equals(Object)`, `java.lang.Record.hashCode()` and
`java.lang.Record.toString()`.

Parameters:

- `lookup`: Every bootstrap method is expected to have a `lookup` which usually represents a lookup context with the accessibility privileges of the caller. This is because `invokedynamic` call sites always provide a `lookup` to the corresponding bootstrap method, but this method just ignores the `lookup` parameter
- `methodName`: the name of the method to generate, which must be one of `"equals"`, `"hashCode"`, or `"toString"`
- `type`: a `MethodType` corresponding the descriptor type for the method, which must correspond to the descriptor for the corresponding `Object` method, if linking an `invokedynamic` call site, or the constant `MethodHandle.class`, if linking a dynamic constant
- `recordClass`: the record class hosting the record components
- `names`: the list of component names, joined into a string separated by ";", or the empty string if there are no components. This parameter is ignored if the `methodName` parameter is `"equals"` or `"hashCode"`
- `getters`: method handles for the accessor methods for the components

**Returns:** a call site if invoked by indy, or a method handle
                    if invoked by a condy

Throws:

- `IllegalArgumentException`: if the bootstrap arguments are invalid or inconsistent
- `NullPointerException`: if any argument is `null` or if any element in the `getters` array is `null`
- `Throwable`: if any exception is thrown during call site construction
