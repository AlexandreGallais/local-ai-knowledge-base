---
title: "MethodHandles class (java.lang.invoke) (part 4 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 4 of 14)

## MethodHandles.findStatic(Class<?>, String, MethodType)

```java
public MethodHandle findStatic(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle for a static method.
The type of the method handle will be that of the method.
(Since static methods do not take receivers, there is no
additional receiver argument inserted into the method handle type,
as there would be with findVirtual or findSpecial.)
The method and all its argument types must be accessible to the lookup object.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set.

If the returned method handle is invoked, the method's class will
be initialized, if it has not already been initialized.

**Example:**

Parameters:

- `refc`: the class from which the method is accessed
- `name`: the name of the method
- `type`: the type of the method

**Returns:** the desired method handle

Throws:

- `NoSuchMethodException`: if the method does not exist
- `IllegalAccessException`: if access checking fails, or if the method is not `static`, or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.findVirtual(Class<?>, String, MethodType)

```java
public MethodHandle findVirtual(Class<?> refc, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle for a virtual method.
The type of the method handle will be that of the method,
with the receiver type (usually `refc`) prepended.
The method and all its argument types must be accessible to the lookup object.

When called, the handle will treat the first argument as a receiver
and, for non-private methods, dispatch on the receiver's type to determine which method
implementation to enter.
For private methods the named method in `refc` will be invoked on the receiver.
(The dispatching action is identical with that performed by an
`invokevirtual` or `invokeinterface` instruction.)

The first argument will be of type `refc` if the lookup
class has full privileges to access the member.  Otherwise
the member must be `protected` and the first argument
will be restricted in type to the lookup class.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set.

Because of the general equivalence between `invokevirtual`
instructions and method handles produced by `findVirtual`,
if the class is `MethodHandle` and the name string is
`invokeExact` or `invoke`, the resulting
method handle is equivalent to one produced by
MethodHandles.exactInvoker or
MethodHandles.invoker
with the same `type` argument.

If the class is `VarHandle` and the name string corresponds to
the name of a signature-polymorphic access mode method, the resulting
method handle is equivalent to one produced by
`java.lang.invoke.MethodHandles.varHandleInvoker` with
the access mode corresponding to the name string and with the same
`type` arguments.

**Example:**

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the name of the method
- `type`: the type of the method, with the receiver argument omitted

**Returns:** the desired method handle

Throws:

- `NoSuchMethodException`: if the method does not exist
- `IllegalAccessException`: if access checking fails, or if the method is `static`, or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.findConstructor(Class<?>, MethodType)

```java
public MethodHandle findConstructor(Class<?> refc, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces a method handle which creates an object and initializes it, using
the constructor of the specified type.
The parameter types of the method handle will be those of the constructor,
while the return type will be a reference to the constructor's class.
The constructor and all its argument types must be accessible to the lookup object.

The requested type must have a return type of `void`.
(This is consistent with the JVM's treatment of constructor type descriptors.)

The returned method handle will have
variable arity if and only if
the constructor's variable arity modifier bit (`0x0080`) is set.

If the returned method handle is invoked, the constructor's class will
be initialized, if it has not already been initialized.

**Example:**

Parameters:

- `refc`: the class or interface from which the method is accessed
- `type`: the type of the method, with the receiver argument omitted, and a void return type

**Returns:** the desired method handle

Throws:

- `NoSuchMethodException`: if the constructor does not exist
- `IllegalAccessException`: if access checking fails or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.findClass(String)

```java
public Class<?> findClass(String targetName) throws ClassNotFoundException, IllegalAccessException
```

Looks up a class by name from the lookup context defined by this `Lookup` object,
as if resolved by an `ldc` instruction.
Such a resolution, as specified in JVMS , attempts to locate and load the class,
and then determines whether the class is accessible to this lookup object.

For a class or an interface, the name is the binary name.
For an array class of `n` dimensions, the name begins with `n` occurrences
of `'['` and followed by the element type as encoded in the
table specified in `Class.getName`.

The lookup context here is determined by the lookup class,
its class loader, and the lookup modes.

Parameters:

- `targetName`: the binary name of the class or the string representing an array class

**Returns:** the requested class.

**Since:** 9

**jvms:** 5.4.3.1 Class and Interface Resolution

Throws:

- `LinkageError`: if the linkage fails
- `ClassNotFoundException`: if the class cannot be loaded by the lookup class' loader.
- `IllegalAccessException`: if the class is not accessible, using the allowed access modes.
- `NullPointerException`: if `targetName` is null

## MethodHandles.ensureInitialized(Class<T>)

```java
public <T> Class<T> ensureInitialized(Class<T> targetClass) throws IllegalAccessException
```

Ensures that `targetClass` has been initialized. The class
to be initialized must be accessible
to this `Lookup` object.  This method causes `targetClass`
to be initialized if it has not been already initialized,
as specified in JVMS .

This method returns when `targetClass` is fully initialized, or
when `targetClass` is being initialized by the current thread.

Parameters:

- `<T>`: the type of the class to be initialized
- `targetClass`: the class to be initialized

**Returns:** `targetClass` that has been initialized, or that is being
        initialized by the current thread.

**Since:** 15

**jvms:** 5.5 Initialization

Throws:

- `IllegalArgumentException`: if `targetClass` is a primitive type or `void` or array class
- `IllegalAccessException`: if `targetClass` is not accessible to this lookup
- `ExceptionInInitializerError`: if the class initialization provoked by this method fails

## MethodHandles.accessClass(Class<T>)

```java
public <T> Class<T> accessClass(Class<T> targetClass) throws IllegalAccessException
```

Determines if a class can be accessed from the lookup context defined by
this `Lookup` object. The static initializer of the class is not run.
If `targetClass` is an array class, `targetClass` is accessible
if the element type of the array class is accessible.  Otherwise,
`targetClass` is determined as accessible as follows.

If `targetClass` is in the same module as the lookup class,
the lookup class is `LC` in module `M1` and
the previous lookup class is in module `M0` or
`null` if not present,
`targetClass` is accessible if and only if one of the following is true:

- If this lookup has `PRIVATE` access, `targetClass` is
    `LC` or other class in the same nest of `LC`.

- If this lookup has `PACKAGE` access, `targetClass` is
    in the same runtime package of `LC`.

- If this lookup has `MODULE` access, `targetClass` is
    a public type in `M1`.

- If this lookup has `PUBLIC` access, `targetClass` is
    a public type in a package exported by `M1` to at least  `M0`
    if the previous lookup class is present; otherwise, `targetClass`
    is a public type in a package exported by `M1` unconditionally.

Otherwise, if this lookup has `UNCONDITIONAL` access, this lookup
can access public types in all modules when the type is in a package
that is exported unconditionally.

Otherwise, `targetClass` is in a different module from `lookupClass`,
and if this lookup does not have `PUBLIC` access, `lookupClass`
is inaccessible.

Otherwise, if this lookup has no previous lookup class,
`M1` is the module containing `lookupClass` and
`M2` is the module containing `targetClass`,
then `targetClass` is accessible if and only if

- `M1` reads `M2`, and

- `targetClass` is public and in a package exported by
    `M2` at least to `M1`.

Otherwise, if this lookup has a previous lookup class,
`M1` and `M2` are as before, and `M0` is the module
containing the previous lookup class, then `targetClass` is accessible
if and only if one of the following is true:

- `targetClass` is in `M0` and `M1`
    `Module.canRead(Module)`  reads} `M0` and the type is
    in a package that is exported to at least `M1`.

- `targetClass` is in `M1` and `M0`
    `Module.canRead(Module)`  reads} `M1` and the type is
    in a package that is exported to at least `M0`.

- `targetClass` is in a third module `M2` and both `M0`
    and `M1` reads `M2` and the type is in a package
    that is exported to at least both `M0` and `M2`.

Otherwise, `targetClass` is not accessible.

Parameters:

- `<T>`: the type of the class to be access-checked
- `targetClass`: the class to be access-checked

**Returns:** `targetClass` that has been access-checked

**Since:** 9

**See also:** Cross-module lookups

Throws:

- `IllegalAccessException`: if the class is not accessible from the lookup class and previous lookup class, if present, using the allowed access modes.
- `NullPointerException`: if `targetClass` is `null`

## MethodHandles.findSpecial(Class<?>, String, MethodType, Class<?>)

```java
public MethodHandle findSpecial(Class<?> refc, String name, MethodType type, Class<?> specialCaller) throws NoSuchMethodException, IllegalAccessException
```

Produces an early-bound method handle for a virtual method.
It will bypass <example-value> for overriding methods on the receiver,
as if called from an `invokespecial`
instruction from within the explicitly specified `specialCaller`.
The type of the method handle will be that of the method,
with a suitably restricted receiver type prepended.
(The receiver type will be `specialCaller` or a subtype.)
The method and all its argument types must be accessible
to the lookup object.

Before method resolution,
if the explicitly specified caller class is not identical with the
lookup class, or if this lookup object does not have
private access
privileges, the access fails.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set.

*(Note:  JVM internal methods named `ConstantDescs#INIT_NAME`
are not visible to this API,
even though the `invokespecial` instruction can refer to them
in special circumstances.  Use findConstructor
to access instance initialization methods in a safe manner.)*

**Example:**

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the name of the method (which must not be "<init>")
- `type`: the type of the method, with the receiver argument omitted
- `specialCaller`: the proposed calling class to perform the `invokespecial`

**Returns:** the desired method handle

Throws:

- `NoSuchMethodException`: if the method does not exist
- `IllegalAccessException`: if access checking fails, or if the method is `static`, or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.findGetter(Class<?>, String, Class<?>)

```java
public MethodHandle findGetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving read access to a non-static field.
The type of the method handle will have a return type of the field's
value type.
The method handle's single argument will be the instance containing
the field.
Access checking is performed immediately on behalf of the lookup class.

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the field's name
- `type`: the field's type

**Returns:** a method handle which can load values from the field

**See also:** #findVarHandle(Class, String, Class)

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is `static`
- `NullPointerException`: if any argument is null

## MethodHandles.findSetter(Class<?>, String, Class<?>)

```java
public MethodHandle findSetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving write access to a non-static field.
The type of the method handle will have a void return type.
The method handle will take two arguments, the instance containing
the field, and the value to be stored.
The second argument will be of the field's value type.
Access checking is performed immediately on behalf of the lookup class.

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the field's name
- `type`: the field's type

**Returns:** a method handle which can store values into the field

**See also:** #findVarHandle(Class, String, Class)

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is `static` or `final`
- `NullPointerException`: if any argument is null
