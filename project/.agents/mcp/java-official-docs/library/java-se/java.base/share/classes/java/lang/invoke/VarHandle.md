---
title: "VarHandle class (java.lang.invoke) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VarHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VarHandle class (java.lang.invoke)

```java
public abstract sealed class VarHandle implements Constable permits IndirectVarHandle, LazyInitializingVarHandle, SegmentVarHandle, VarHandleByteArrayAsChars.ByteArrayViewVarHandle, VarHandleByteArrayAsDoubles.ByteArrayViewVarHandle, VarHandleByteArrayAsFloats.ByteArrayViewVarHandle, VarHandleByteArrayAsInts.ByteArrayViewVarHandle, VarHandleByteArrayAsLongs.ByteArrayViewVarHandle, VarHandleByteArrayAsShorts.ByteArrayViewVarHandle, VarHandleBooleans.Array, VarHandleBooleans.FieldInstanceReadOnly, VarHandleBooleans.FieldStaticReadOnly, VarHandleBytes.Array, VarHandleBytes.FieldInstanceReadOnly, VarHandleBytes.FieldStaticReadOnly, VarHandleChars.Array, VarHandleChars.FieldInstanceReadOnly, VarHandleChars.FieldStaticReadOnly, VarHandleDoubles.Array, VarHandleDoubles.FieldInstanceReadOnly, VarHandleDoubles.FieldStaticReadOnly, VarHandleFloats.Array, VarHandleFloats.FieldInstanceReadOnly, VarHandleFloats.FieldStaticReadOnly, VarHandleInts.Array, VarHandleInts.FieldInstanceReadOnly, VarHandleInts.FieldStaticReadOnly, VarHandleLongs.Array, VarHandleLongs.FieldInstanceReadOnly, VarHandleLongs.FieldStaticReadOnly, VarHandleReferences.Array, VarHandleReferences.FieldInstanceReadOnly, VarHandleReferences.FieldStaticReadOnly, VarHandleShorts.Array, VarHandleShorts.FieldInstanceReadOnly, VarHandleShorts.FieldStaticReadOnly
```

A VarHandle is a dynamically strongly typed reference to a variable, or to a
parametrically-defined family of variables, including static fields,
non-static fields, array elements, or components of an off-heap data
structure.  Access to such variables is supported under various
*access modes*, including plain read/write access, volatile
read/write access, and compare-and-set.

VarHandles are immutable and have no visible state.  VarHandles cannot be
subclassed by the user.

A VarHandle has:

- a variable type T, the type of every variable referenced
by this VarHandle; and

- a list of coordinate types
`CT1, CT2, ..., CTn`, the types of *coordinate expressions* that
jointly locate a variable referenced by this VarHandle.

Variable and coordinate types may be primitive or reference, and are
represented by `Class` objects.  The list of coordinate types may be
empty.

Factory methods that produce or lookup VarHandle instances document the supported variable type and the list
of coordinate types.

Each access mode is associated with one *access mode method*, a
signature polymorphic method named
for the access mode.  When an access mode method is invoked on a VarHandle
instance, the initial arguments to the invocation are coordinate expressions
that indicate in precisely which object the variable is to be accessed.
Trailing arguments to the invocation represent values of importance to the
access mode.  For example, the various compare-and-set or compare-and-exchange
access modes require two trailing arguments for the variable's expected value
and new value.

The arity and types of arguments to the invocation of an access mode
method are not checked statically.  Instead, each access mode method
specifies an access mode type,
represented as an instance of `MethodType`, that serves as a kind of
method signature against which the arguments are checked dynamically.  An
access mode type gives formal parameter types in terms of the coordinate
types of a VarHandle instance and the types for values of importance to the
access mode.  An access mode type also gives a return type, often in terms of
the variable type of a VarHandle instance.  When an access mode method is
invoked on a VarHandle instance, the symbolic type descriptor at the
call site, the run time types of arguments to the invocation, and the run
time type of the return value, must match the types
given in the access mode type.  A runtime exception will be thrown if the
match fails.

For example, the access mode method `compareAndSet` specifies that if
its receiver is a VarHandle instance with coordinate types
`CT1, ..., CTn` and variable type `T`, then its access mode type
is `(CT1 c1, ..., CTn cn, T expectedValue, T newValue)boolean`.
Suppose that a VarHandle instance can access array elements, and that its
coordinate types are `String[]` and `int` while its variable type
is `String`.  The access mode type for `compareAndSet` on this
VarHandle instance would be
`(String[] c1, int c2, String expectedValue, String newValue)boolean`.
Such a VarHandle instance may be produced by the
array factory method and
access array elements as follows:

```java
String[] sa = ...
VarHandle avh = MethodHandles.arrayElementVarHandle(String[].class);
boolean r = avh.compareAndSet(sa, 10, "expected", "new");
```

Access modes control atomicity and consistency properties.
*Plain* read (`get`) and write (`set`)
accesses are guaranteed to be bitwise atomic only for references
and for primitive values of at most 32 bits, and impose no observable
ordering constraints with respect to threads other than the
executing thread. *Opaque* operations are bitwise atomic and
coherently ordered with respect to accesses to the same variable.
In addition to obeying Opaque properties, *Acquire* mode
reads and their subsequent accesses are ordered after matching
*Release* mode writes and their previous accesses.  In
addition to obeying Acquire and Release properties, all
*Volatile* operations are totally ordered with respect to
each other.

Access modes are grouped into the following categories:

- read access modes that get the value of a variable under specified
memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
get,
getVolatile,
getAcquire,
getOpaque.

- write access modes that set the value of a variable under specified
memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
set,
setVolatile,
setRelease,
setOpaque.

- atomic update access modes that, for example, atomically compare and set
the value of a variable under specified memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
compareAndSet,
weakCompareAndSetPlain,
weakCompareAndSet,
weakCompareAndSetAcquire,
weakCompareAndSetRelease,
compareAndExchangeAcquire,
compareAndExchange,
compareAndExchangeRelease,
getAndSet,
getAndSetAcquire,
getAndSetRelease.

- numeric atomic update access modes that, for example, atomically get and
set with addition the value of a variable under specified memory ordering
effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
getAndAdd,
getAndAddAcquire,
getAndAddRelease,

- bitwise atomic update access modes that, for example, atomically get and
bitwise OR the value of a variable under specified memory ordering
effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
getAndBitwiseOr,
getAndBitwiseOrAcquire,
getAndBitwiseOrRelease,
getAndBitwiseAnd,
getAndBitwiseAndAcquire,
getAndBitwiseAndRelease,
getAndBitwiseXor,
getAndBitwiseXorAcquire,
getAndBitwiseXorRelease.

Factory methods that produce or lookup VarHandle instances document the set of access modes that are
supported, which may also include documenting restrictions based on the
variable type and whether a variable is read-only.  If an access mode is not
supported then the corresponding access mode method will on invocation throw
an `UnsupportedOperationException`.  Factory methods should document
any additional undeclared exceptions that may be thrown by access mode
methods.
The get access mode is supported for all
VarHandle instances and the corresponding method never throws
`UnsupportedOperationException`.
If a VarHandle references a read-only variable (for example a `final`
field) then write, atomic update, numeric atomic update, and bitwise atomic
update access modes are not supported and corresponding methods throw
`UnsupportedOperationException`.
Read/write access modes (if supported), with the exception of
`get` and `set`, provide atomic access for
reference types and all primitive types.
Unless stated otherwise in the documentation of a factory method, the access
modes `get` and `set` (if supported) provide atomic access for
reference types and all primitives types, with the exception of `long`
and `double` on 32-bit platforms.

Access modes will override any memory ordering effects specified at
the declaration site of a variable.  For example, a VarHandle accessing
a field using the `get` access mode will access the field as
specified *by its access mode* even if that field is declared
`volatile`.  When mixed access is performed extreme care should be
taken since the Java Memory Model may permit surprising results.

In addition to supporting access to variables under various access modes,
a set of static methods, referred to as memory fence methods, is also
provided for fine-grained control of memory ordering.

The Java Language Specification permits other threads to observe operations
as if they were executed in orders different than are apparent in program
source code, subject to constraints arising, for example, from the use of
locks, `volatile` fields or VarHandles.  The static methods,
fullFence, acquireFence,
releaseFence, loadLoadFence and
storeStoreFence, can also be used to impose
constraints.  Their specifications, as is the case for certain access modes,
are phrased in terms of the lack of "reorderings" -- observable ordering
effects that might otherwise occur if the fence was not present.  More
precise phrasing of the specification of access mode methods and memory fence
methods may accompany future updates of the Java Language Specification.

#### Compiling invocation of access mode methods

A Java method call expression naming an access mode method can invoke a
VarHandle from Java source code.  From the viewpoint of source code, these
methods can take any arguments and their polymorphic result (if expressed)
can be cast to any return type.  Formally this is accomplished by giving the
access mode methods variable arity `Object` arguments and
`Object` return types (if the return type is polymorphic), but they
have an additional quality called *signature polymorphism* which
connects this freedom of invocation directly to the JVM execution stack.

As is usual with virtual methods, source-level calls to access mode methods
compile to an `invokevirtual` instruction.  More unusually, the
compiler must record the actual argument types, and may not perform method
invocation conversions on the arguments.  Instead, it must generate
instructions to push them on the stack according to their own unconverted
types.  The VarHandle object itself will be pushed on the stack before the
arguments.  The compiler then generates an `invokevirtual` instruction
that invokes the access mode method with a symbolic type descriptor which
describes the argument and return types.

To issue a complete symbolic type descriptor, the compiler must also
determine the return type (if polymorphic).  This is based on a cast on the
method invocation expression, if there is one, or else `Object` if the
invocation is an expression, or else `void` if the invocation is a
statement.  The cast may be to a primitive type (but not `void`).

As a corner case, an uncasted `null` argument is given a symbolic type
descriptor of `java.lang.Void`.  The ambiguity with the type
`Void` is harmless, since there are no references of type `Void`
except the null reference.

#### Performing invocation of access mode methods

The first time an `invokevirtual` instruction is executed it is linked
by symbolically resolving the names in the instruction and verifying that
the method call is statically legal.  This also holds for calls to access mode
methods.  In this case, the symbolic type descriptor emitted by the compiler
is checked for correct syntax, and names it contains are resolved.  Thus, an
`invokevirtual` instruction which invokes an access mode method will
always link, as long as the symbolic type descriptor is syntactically
well-formed and the types exist.

When the `invokevirtual` is executed after linking, the receiving
VarHandle's access mode type is first checked by the JVM to ensure that it
matches the symbolic type descriptor.  If the type
match fails, it means that the access mode method which the caller is
invoking is not present on the individual VarHandle being invoked.

Invocation of an access mode method behaves, by default, as if an invocation of
`MethodHandle.invoke`, where the receiving method handle accepts the
VarHandle instance as the leading argument.  More specifically, the
following, where `{access-mode}` corresponds to the access mode method
name:

```java
VarHandle vh = ..
R r = (R) vh.{access-mode}(p1, p2, ..., pN);
```

behaves as if:

```java
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      am,
                      vh.accessModeType(am));

R r = (R) mh.invoke(vh, p1, p2, ..., pN)
```

(modulo access mode methods do not declare throwing of `Throwable`).
This is equivalent to:

```java
MethodHandle mh = MethodHandles.lookup().findVirtual(
                      VarHandle.class,
                      "{access-mode}",
                      MethodType.methodType(R, p1, p2, ..., pN));

R r = (R) mh.invokeExact(vh, p1, p2, ..., pN)
```

where the desired method type is the symbolic type descriptor and a
`MethodHandle.invokeExact` is performed, since before invocation of the
target, the handle will apply reference casts as necessary and box, unbox, or
widen primitive values, as if by asType (see also
`MethodHandles.varHandleInvoker`).

More concisely, such behavior is equivalent to:

```java
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = vh.toMethodHandle(am);

R r = (R) mh.invoke(p1, p2, ..., pN)
```

Where, in this case, the method handle is bound to the VarHandle instance.

A VarHandle's invocation behavior can be adjusted (see `withInvokeExactBehavior`) such that invocation of
an access mode method behaves as if invocation of `MethodHandle.invokeExact`,
where the receiving method handle accepts the VarHandle instance as the leading argument.
More specifically, the following, where `{access-mode}` corresponds to the access mode method
name:

```java
VarHandle vh = ..
R r = (R) vh.{access-mode}(p1, p2, ..., pN);
```

behaves as if:

```java
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      am,
                      vh.accessModeType(am));

R r = (R) mh.invokeExact(vh, p1, p2, ..., pN)
```

(modulo access mode methods do not declare throwing of `Throwable`).
