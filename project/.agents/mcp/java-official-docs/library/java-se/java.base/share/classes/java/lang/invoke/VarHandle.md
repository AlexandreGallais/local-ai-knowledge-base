# VarHandle class (java.lang.invoke)

```java
public abstract sealed class VarHandle implements Constable permits IndirectVarHandle, LazyInitializingVarHandle, SegmentVarHandle, VarHandleByteArrayAsChars.ByteArrayViewVarHandle, VarHandleByteArrayAsDoubles.ByteArrayViewVarHandle, VarHandleByteArrayAsFloats.ByteArrayViewVarHandle, VarHandleByteArrayAsInts.ByteArrayViewVarHandle, VarHandleByteArrayAsLongs.ByteArrayViewVarHandle, VarHandleByteArrayAsShorts.ByteArrayViewVarHandle, VarHandleBooleans.Array, VarHandleBooleans.FieldInstanceReadOnly, VarHandleBooleans.FieldStaticReadOnly, VarHandleBytes.Array, VarHandleBytes.FieldInstanceReadOnly, VarHandleBytes.FieldStaticReadOnly, VarHandleChars.Array, VarHandleChars.FieldInstanceReadOnly, VarHandleChars.FieldStaticReadOnly, VarHandleDoubles.Array, VarHandleDoubles.FieldInstanceReadOnly, VarHandleDoubles.FieldStaticReadOnly, VarHandleFloats.Array, VarHandleFloats.FieldInstanceReadOnly, VarHandleFloats.FieldStaticReadOnly, VarHandleInts.Array, VarHandleInts.FieldInstanceReadOnly, VarHandleInts.FieldStaticReadOnly, VarHandleLongs.Array, VarHandleLongs.FieldInstanceReadOnly, VarHandleLongs.FieldStaticReadOnly, VarHandleReferences.Array, VarHandleReferences.FieldInstanceReadOnly, VarHandleReferences.FieldStaticReadOnly, VarHandleShorts.Array, VarHandleShorts.FieldInstanceReadOnly, VarHandleShorts.FieldStaticReadOnly
```

A VarHandle is a dynamically strongly typed reference to a variable, or to a
parametrically-defined family of variables, including static fields,
non-static fields, array elements, or components of an off-heap data
structure.  Access to such variables is supported under various
<em>access modes</em>, including plain read/write access, volatile
read/write access, and compare-and-set.

<p>VarHandles are immutable and have no visible state.  VarHandles cannot be
subclassed by the user.

<p>A VarHandle has:
<ul>
<li>a {@link #varType variable type} T, the type of every variable referenced
by this VarHandle; and
<li>a list of {@link #coordinateTypes coordinate types}
{@code CT1, CT2, ..., CTn}, the types of <em>coordinate expressions</em> that
jointly locate a variable referenced by this VarHandle.
</ul>
Variable and coordinate types may be primitive or reference, and are
represented by {@code Class} objects.  The list of coordinate types may be
empty.

<p>Factory methods that produce or {@link java.lang.invoke.MethodHandles.Lookup
lookup} VarHandle instances document the supported variable type and the list
of coordinate types.

<p>Each access mode is associated with one <em>access mode method</em>, a
<a href="MethodHandle.html#sigpoly">signature polymorphic</a> method named
for the access mode.  When an access mode method is invoked on a VarHandle
instance, the initial arguments to the invocation are coordinate expressions
that indicate in precisely which object the variable is to be accessed.
Trailing arguments to the invocation represent values of importance to the
access mode.  For example, the various compare-and-set or compare-and-exchange
access modes require two trailing arguments for the variable's expected value
and new value.

<p>The arity and types of arguments to the invocation of an access mode
method are not checked statically.  Instead, each access mode method
specifies an {@link #accessModeType(AccessMode) access mode type},
represented as an instance of {@link MethodType}, that serves as a kind of
method signature against which the arguments are checked dynamically.  An
access mode type gives formal parameter types in terms of the coordinate
types of a VarHandle instance and the types for values of importance to the
access mode.  An access mode type also gives a return type, often in terms of
the variable type of a VarHandle instance.  When an access mode method is
invoked on a VarHandle instance, the symbolic type descriptor at the
call site, the run time types of arguments to the invocation, and the run
time type of the return value, must <a href="#invoke">match</a> the types
given in the access mode type.  A runtime exception will be thrown if the
match fails.

For example, the access mode method {@link #compareAndSet} specifies that if
its receiver is a VarHandle instance with coordinate types
{@code CT1, ..., CTn} and variable type {@code T}, then its access mode type
is {@code (CT1 c1, ..., CTn cn, T expectedValue, T newValue)boolean}.
Suppose that a VarHandle instance can access array elements, and that its
coordinate types are {@code String[]} and {@code int} while its variable type
is {@code String}.  The access mode type for {@code compareAndSet} on this
VarHandle instance would be
{@code (String[] c1, int c2, String expectedValue, String newValue)boolean}.
Such a VarHandle instance may be produced by the
{@link MethodHandles#arrayElementVarHandle(Class) array factory method} and
access array elements as follows:
<pre> {@code
String[] sa = ...
VarHandle avh = MethodHandles.arrayElementVarHandle(String[].class);
boolean r = avh.compareAndSet(sa, 10, "expected", "new");
}</pre>

<p>Access modes control atomicity and consistency properties.
<em>Plain</em> read ({@code get}) and write ({@code set})
accesses are guaranteed to be bitwise atomic only for references
and for primitive values of at most 32 bits, and impose no observable
ordering constraints with respect to threads other than the
executing thread. <em>Opaque</em> operations are bitwise atomic and
coherently ordered with respect to accesses to the same variable.
In addition to obeying Opaque properties, <em>Acquire</em> mode
reads and their subsequent accesses are ordered after matching
<em>Release</em> mode writes and their previous accesses.  In
addition to obeying Acquire and Release properties, all
<em>Volatile</em> operations are totally ordered with respect to
each other.

<p>Access modes are grouped into the following categories:
<ul>
<li>read access modes that get the value of a variable under specified
memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
{@link #get get},
{@link #getVolatile getVolatile},
{@link #getAcquire getAcquire},
{@link #getOpaque getOpaque}.
<li>write access modes that set the value of a variable under specified
memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
{@link #set set},
{@link #setVolatile setVolatile},
{@link #setRelease setRelease},
{@link #setOpaque setOpaque}.
<li>atomic update access modes that, for example, atomically compare and set
the value of a variable under specified memory ordering effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
{@link #compareAndSet compareAndSet},
{@link #weakCompareAndSetPlain weakCompareAndSetPlain},
{@link #weakCompareAndSet weakCompareAndSet},
{@link #weakCompareAndSetAcquire weakCompareAndSetAcquire},
{@link #weakCompareAndSetRelease weakCompareAndSetRelease},
{@link #compareAndExchangeAcquire compareAndExchangeAcquire},
{@link #compareAndExchange compareAndExchange},
{@link #compareAndExchangeRelease compareAndExchangeRelease},
{@link #getAndSet getAndSet},
{@link #getAndSetAcquire getAndSetAcquire},
{@link #getAndSetRelease getAndSetRelease}.
<li>numeric atomic update access modes that, for example, atomically get and
set with addition the value of a variable under specified memory ordering
effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
{@link #getAndAdd getAndAdd},
{@link #getAndAddAcquire getAndAddAcquire},
{@link #getAndAddRelease getAndAddRelease},
<li>bitwise atomic update access modes that, for example, atomically get and
bitwise OR the value of a variable under specified memory ordering
effects.
The set of corresponding access mode methods belonging to this group
consists of the methods
{@link #getAndBitwiseOr getAndBitwiseOr},
{@link #getAndBitwiseOrAcquire getAndBitwiseOrAcquire},
{@link #getAndBitwiseOrRelease getAndBitwiseOrRelease},
{@link #getAndBitwiseAnd getAndBitwiseAnd},
{@link #getAndBitwiseAndAcquire getAndBitwiseAndAcquire},
{@link #getAndBitwiseAndRelease getAndBitwiseAndRelease},
{@link #getAndBitwiseXor getAndBitwiseXor},
{@link #getAndBitwiseXorAcquire getAndBitwiseXorAcquire},
{@link #getAndBitwiseXorRelease getAndBitwiseXorRelease}.
</ul>

<p>Factory methods that produce or {@link java.lang.invoke.MethodHandles.Lookup
lookup} VarHandle instances document the set of access modes that are
supported, which may also include documenting restrictions based on the
variable type and whether a variable is read-only.  If an access mode is not
supported then the corresponding access mode method will on invocation throw
an {@code UnsupportedOperationException}.  Factory methods should document
any additional undeclared exceptions that may be thrown by access mode
methods.
The {@link #get get} access mode is supported for all
VarHandle instances and the corresponding method never throws
{@code UnsupportedOperationException}.
If a VarHandle references a read-only variable (for example a {@code final}
field) then write, atomic update, numeric atomic update, and bitwise atomic
update access modes are not supported and corresponding methods throw
{@code UnsupportedOperationException}.
Read/write access modes (if supported), with the exception of
{@code get} and {@code set}, provide atomic access for
reference types and all primitive types.
Unless stated otherwise in the documentation of a factory method, the access
modes {@code get} and {@code set} (if supported) provide atomic access for
reference types and all primitives types, with the exception of {@code long}
and {@code double} on 32-bit platforms.

<p>Access modes will override any memory ordering effects specified at
the declaration site of a variable.  For example, a VarHandle accessing
a field using the {@code get} access mode will access the field as
specified <em>by its access mode</em> even if that field is declared
{@code volatile}.  When mixed access is performed extreme care should be
taken since the Java Memory Model may permit surprising results.

<p>In addition to supporting access to variables under various access modes,
a set of static methods, referred to as memory fence methods, is also
provided for fine-grained control of memory ordering.

The Java Language Specification permits other threads to observe operations
as if they were executed in orders different than are apparent in program
source code, subject to constraints arising, for example, from the use of
locks, {@code volatile} fields or VarHandles.  The static methods,
{@link #fullFence fullFence}, {@link #acquireFence acquireFence},
{@link #releaseFence releaseFence}, {@link #loadLoadFence loadLoadFence} and
{@link #storeStoreFence storeStoreFence}, can also be used to impose
constraints.  Their specifications, as is the case for certain access modes,
are phrased in terms of the lack of "reorderings" -- observable ordering
effects that might otherwise occur if the fence was not present.  More
precise phrasing of the specification of access mode methods and memory fence
methods may accompany future updates of the Java Language Specification.

<h2>Compiling invocation of access mode methods</h2>
A Java method call expression naming an access mode method can invoke a
VarHandle from Java source code.  From the viewpoint of source code, these
methods can take any arguments and their polymorphic result (if expressed)
can be cast to any return type.  Formally this is accomplished by giving the
access mode methods variable arity {@code Object} arguments and
{@code Object} return types (if the return type is polymorphic), but they
have an additional quality called <em>signature polymorphism</em> which
connects this freedom of invocation directly to the JVM execution stack.
<p>
As is usual with virtual methods, source-level calls to access mode methods
compile to an {@code invokevirtual} instruction.  More unusually, the
compiler must record the actual argument types, and may not perform method
invocation conversions on the arguments.  Instead, it must generate
instructions to push them on the stack according to their own unconverted
types.  The VarHandle object itself will be pushed on the stack before the
arguments.  The compiler then generates an {@code invokevirtual} instruction
that invokes the access mode method with a symbolic type descriptor which
describes the argument and return types.
<p>
To issue a complete symbolic type descriptor, the compiler must also
determine the return type (if polymorphic).  This is based on a cast on the
method invocation expression, if there is one, or else {@code Object} if the
invocation is an expression, or else {@code void} if the invocation is a
statement.  The cast may be to a primitive type (but not {@code void}).
<p>
As a corner case, an uncasted {@code null} argument is given a symbolic type
descriptor of {@code java.lang.Void}.  The ambiguity with the type
{@code Void} is harmless, since there are no references of type {@code Void}
except the null reference.


<h2><a id="invoke">Performing invocation of access mode methods</a></h2>
The first time an {@code invokevirtual} instruction is executed it is linked
by symbolically resolving the names in the instruction and verifying that
the method call is statically legal.  This also holds for calls to access mode
methods.  In this case, the symbolic type descriptor emitted by the compiler
is checked for correct syntax, and names it contains are resolved.  Thus, an
{@code invokevirtual} instruction which invokes an access mode method will
always link, as long as the symbolic type descriptor is syntactically
well-formed and the types exist.
<p>
When the {@code invokevirtual} is executed after linking, the receiving
VarHandle's access mode type is first checked by the JVM to ensure that it
matches the symbolic type descriptor.  If the type
match fails, it means that the access mode method which the caller is
invoking is not present on the individual VarHandle being invoked.

<p id="invoke-behavior">
Invocation of an access mode method behaves, by default, as if an invocation of
{@link MethodHandle#invoke}, where the receiving method handle accepts the
VarHandle instance as the leading argument.  More specifically, the
following, where {@code {access-mode}} corresponds to the access mode method
name:
<pre> {@code
VarHandle vh = ..
R r = (R) vh.{access-mode}(p1, p2, ..., pN);
}</pre>
behaves as if:
<pre> {@code
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      am,
                      vh.accessModeType(am));

R r = (R) mh.invoke(vh, p1, p2, ..., pN)
}</pre>
(modulo access mode methods do not declare throwing of {@code Throwable}).
This is equivalent to:
<pre> {@code
MethodHandle mh = MethodHandles.lookup().findVirtual(
                      VarHandle.class,
                      "{access-mode}",
                      MethodType.methodType(R, p1, p2, ..., pN));

R r = (R) mh.invokeExact(vh, p1, p2, ..., pN)
}</pre>
where the desired method type is the symbolic type descriptor and a
{@link MethodHandle#invokeExact} is performed, since before invocation of the
target, the handle will apply reference casts as necessary and box, unbox, or
widen primitive values, as if by {@link MethodHandle#asType asType} (see also
{@link MethodHandles#varHandleInvoker}).

More concisely, such behavior is equivalent to:
<pre> {@code
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = vh.toMethodHandle(am);

R r = (R) mh.invoke(p1, p2, ..., pN)
}</pre>
Where, in this case, the method handle is bound to the VarHandle instance.

<p id="invoke-exact-behavior">
A VarHandle's invocation behavior can be adjusted (see {@link #withInvokeExactBehavior}) such that invocation of
an access mode method behaves as if invocation of {@link MethodHandle#invokeExact},
where the receiving method handle accepts the VarHandle instance as the leading argument.
More specifically, the following, where {@code {access-mode}} corresponds to the access mode method
name:
<pre> {@code
VarHandle vh = ..
R r = (R) vh.{access-mode}(p1, p2, ..., pN);
}</pre>
behaves as if:
<pre> {@code
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      am,
                      vh.accessModeType(am));

R r = (R) mh.invokeExact(vh, p1, p2, ..., pN)
}</pre>
(modulo access mode methods do not declare throwing of {@code Throwable}).

More concisely, such behavior is equivalent to:
<pre> {@code
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = vh.toMethodHandle(am);

R r = (R) mh.invokeExact(p1, p2, ..., pN)
}</pre>
Where, in this case, the method handle is bound to the VarHandle instance.

<h2>Invocation checking</h2>
In typical programs, VarHandle access mode type matching will usually
succeed.  But if a match fails, the JVM will throw a
{@link WrongMethodTypeException}.
<p>
Thus, an access mode type mismatch which might show up as a linkage error
in a statically typed program can show up as a dynamic
{@code WrongMethodTypeException} in a program which uses VarHandles.
<p>
Because access mode types contain "live" {@code Class} objects, method type
matching takes into account both type names and class loaders.
Thus, even if a VarHandle {@code VH} is created in one class loader
{@code L1} and used in another {@code L2}, VarHandle access mode method
calls are type-safe, because the caller's symbolic type descriptor, as
resolved in {@code L2}, is matched against the original callee method's
symbolic type descriptor, as resolved in {@code L1}.  The resolution in
{@code L1} happens when {@code VH} is created and its access mode types are
assigned, while the resolution in {@code L2} happens when the
{@code invokevirtual} instruction is linked.
<p>
Apart from type descriptor checks, a VarHandles's capability to
access its variables is unrestricted.
If a VarHandle is formed on a non-public variable by a class that has access
to that variable, the resulting VarHandle can be used in any place by any
caller who receives a reference to it.
<p>
Unlike with the Core Reflection API, where access is checked every time a
reflective method is invoked, VarHandle access checking is performed
<a href="MethodHandles.Lookup.html#access">when the VarHandle is
created</a>.
Thus, VarHandles to non-public variables, or to variables in non-public
classes, should generally be kept secret.  They should not be passed to
untrusted code unless their use from the untrusted code would be harmless.


<h2>VarHandle creation</h2>
Java code can create a VarHandle that directly accesses any field that is
accessible to that code.  This is done via a reflective, capability-based
API called {@link java.lang.invoke.MethodHandles.Lookup
MethodHandles.Lookup}.
For example, a VarHandle for a non-static field can be obtained
from {@link java.lang.invoke.MethodHandles.Lookup#findVarHandle
Lookup.findVarHandle}.
There is also a conversion method from Core Reflection API objects,
{@link java.lang.invoke.MethodHandles.Lookup#unreflectVarHandle
Lookup.unreflectVarHandle}.
<p>
Access to protected field members is restricted to receivers only of the
accessing class, or one of its subclasses, and the accessing class must in
turn be a subclass (or package sibling) of the protected member's defining
class.  If a VarHandle refers to a protected non-static field of a declaring
class outside the current package, the receiver argument will be narrowed to
the type of the accessing class.

<h2>Interoperation between VarHandles and the Core Reflection API</h2>
Using factory methods in the {@link java.lang.invoke.MethodHandles.Lookup
Lookup} API, any field represented by a Core Reflection API object
can be converted to a behaviorally equivalent VarHandle.
For example, a reflective {@link java.lang.reflect.Field Field} can
be converted to a VarHandle using
{@link java.lang.invoke.MethodHandles.Lookup#unreflectVarHandle
Lookup.unreflectVarHandle}.
The resulting VarHandles generally provide more direct and efficient
access to the underlying fields.
<p>
As a special case, when the Core Reflection API is used to view the
signature polymorphic access mode methods in this class, they appear as
ordinary non-polymorphic methods.  Their reflective appearance, as viewed by
{@link java.lang.Class#getDeclaredMethod Class.getDeclaredMethod},
is unaffected by their special status in this API.
For example, {@link java.lang.reflect.Method#getModifiers
Method.getModifiers}
will report exactly those modifier bits required for any similarly
declared method, including in this case {@code native} and {@code varargs}
bits.
<p>
As with any reflected method, these methods (when reflected) may be invoked
directly via {@link java.lang.reflect.Method#invoke java.lang.reflect.Method.invoke},
via JNI, or indirectly via
{@link java.lang.invoke.MethodHandles.Lookup#unreflect Lookup.unreflect}.
However, such reflective calls do not result in access mode method
invocations.  Such a call, if passed the required argument (a single one, of
type {@code Object[]}), will ignore the argument and will throw an
{@code UnsupportedOperationException}.
<p>
Since {@code invokevirtual} instructions can natively invoke VarHandle
access mode methods under any symbolic type descriptor, this reflective view
conflicts with the normal presentation of these methods via bytecodes.
Thus, these native methods, when reflectively viewed by
{@code Class.getDeclaredMethod}, may be regarded as placeholders only.
<p>
In order to obtain an invoker method for a particular access mode type,
use {@link java.lang.invoke.MethodHandles#varHandleExactInvoker} or
{@link java.lang.invoke.MethodHandles#varHandleInvoker}.  The
{@link java.lang.invoke.MethodHandles.Lookup#findVirtual Lookup.findVirtual}
API is also able to return a method handle to call an access mode method for
any specified access mode type and is equivalent in behavior to
{@link java.lang.invoke.MethodHandles#varHandleInvoker}.

<h2>Interoperation between VarHandles and Java generics</h2>
A VarHandle can be obtained for a variable, such as a field, which is
declared with Java generic types.  As with the Core Reflection API, the
VarHandle's variable type will be constructed from the erasure of the
source-level type.  When a VarHandle access mode method is invoked, the
types
of its arguments or the return value cast type may be generic types or type
instances.  If this occurs, the compiler will replace those types by their
erasures when it constructs the symbolic type descriptor for the
{@code invokevirtual} instruction.

@see MethodHandle
@see MethodHandles
@see MethodType
@since 9

## VarHandle.hasInvokeExactBehavior()

```java
public boolean hasInvokeExactBehavior()
```

Returns {@code true} if this VarHandle has <a href="#invoke-exact-behavior"><em>invoke-exact behavior</em></a>.

@see #withInvokeExactBehavior()
@see #withInvokeBehavior()
@return {@code true} if this VarHandle has <a href="#invoke-exact-behavior"><em>invoke-exact behavior</em></a>.
@since 16

## VarHandle.get(Object...)

```java
public final native Object get(Object... args)
```

Returns the value of a variable, with memory semantics of reading as
if the variable was declared non-{@code volatile}.  Commonly referred to
as plain read access.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn)T}.

<p>The symbolic type descriptor at the call site of {@code get}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET)} on this VarHandle.

<p>This access mode is supported by all VarHandle instances and never
throws {@code UnsupportedOperationException}.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn)}
, statically represented using varargs.
@return the signature-polymorphic result that is the value of the
variable
, statically represented using {@code Object}.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.set(Object...)

```java
public final native void set(Object... args)
```

Sets the value of a variable to the {@code newValue}, with memory
semantics of setting as if the variable was declared non-{@code volatile}
and non-{@code final}.  Commonly referred to as plain write access.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)void}

<p>The symbolic type descriptor at the call site of {@code set}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.SET)} on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.getVolatile(Object...)

```java
public final native Object getVolatile(Object... args)
```

Returns the value of a variable, with memory semantics of reading as if
the variable was declared {@code volatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn)T}.

<p>The symbolic type descriptor at the call site of {@code getVolatile}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_VOLATILE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn)}
, statically represented using varargs.
@return the signature-polymorphic result that is the value of the
variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.setVolatile(Object...)

```java
public final native void setVolatile(Object... args)
```

Sets the value of a variable to the {@code newValue}, with memory
semantics of setting as if the variable was declared {@code volatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)void}.

<p>The symbolic type descriptor at the call site of {@code setVolatile}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.SET_VOLATILE)} on this
VarHandle.

@apiNote
Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with {@code memory_order_seq_cst}.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.getOpaque(Object...)

```java
public final native Object getOpaque(Object... args)
```

Returns the value of a variable, accessed in program order, but with no
assurance of memory ordering effects with respect to other threads.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn)T}.

<p>The symbolic type descriptor at the call site of {@code getOpaque}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_OPAQUE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn)}
, statically represented using varargs.
@return the signature-polymorphic result that is the value of the
variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.setOpaque(Object...)

```java
public final native void setOpaque(Object... args)
```

Sets the value of a variable to the {@code newValue}, in program order,
but with no assurance of memory ordering effects with respect to other
threads.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)void}.

<p>The symbolic type descriptor at the call site of {@code setOpaque}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.SET_OPAQUE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.getAcquire(Object...)

```java
public final native Object getAcquire(Object... args)
```

Returns the value of a variable, and ensures that subsequent loads and
stores are not reordered before this access.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn)T}.

<p>The symbolic type descriptor at the call site of {@code getAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_ACQUIRE)} on this
VarHandle.

@apiNote
Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with {@code memory_order_acquire}
ordering.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn)}
, statically represented using varargs.
@return the signature-polymorphic result that is the value of the
variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.setRelease(Object...)

```java
public final native void setRelease(Object... args)
```

Sets the value of a variable to the {@code newValue}, and ensures that
prior loads and stores are not reordered after this access.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)void}.

<p>The symbolic type descriptor at the call site of {@code setRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.SET_RELEASE)} on this
VarHandle.

@apiNote
Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with {@code memory_order_release}
ordering.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.

## VarHandle.compareAndSet(Object...)

```java
public final native boolean compareAndSet(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #setVolatile} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #getVolatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean}.

<p>The symbolic type descriptor at the call site of {@code
compareAndSet} must match the access mode type that is the result of
calling {@code accessModeType(VarHandle.AccessMode.COMPARE_AND_SET)} on
this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return {@code true} if successful, otherwise {@code false} if the
<em>witness value</em> was not the same as the {@code expectedValue}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.compareAndExchange(Object...)

```java
public final native Object compareAndExchange(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #setVolatile} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #getVolatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code
compareAndExchange}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the <em>witness value</em>, which
will be the same as the {@code expectedValue} if successful
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type is not
compatible with the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type is compatible with the
caller's symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.compareAndExchangeAcquire(Object...)

```java
public final native Object compareAndExchangeAcquire(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #set} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #getAcquire}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code
compareAndExchangeAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE_ACQUIRE)} on
this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the <em>witness value</em>, which
will be the same as the {@code expectedValue} if successful
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #getAcquire(Object...)

## VarHandle.compareAndExchangeRelease(Object...)

```java
public final native Object compareAndExchangeRelease(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #setRelease} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #get}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code
compareAndExchangeRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE_RELEASE)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the <em>witness value</em>, which
will be the same as the {@code expectedValue} if successful
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setRelease(Object...)
@see #get(Object...)

## VarHandle.weakCompareAndSetPlain(Object...)

```java
public final native boolean weakCompareAndSetPlain(Object... args)
```

Possibly atomically sets the value of a variable to the {@code newValue}
with the semantics of {@link #set} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #get}.

<p>This operation may fail spuriously (typically, due to memory
contention) even if the <em>witness value</em> does match the expected value.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean}.

<p>The symbolic type descriptor at the call site of {@code
weakCompareAndSetPlain} must match the access mode type that is the result of
calling {@code accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_PLAIN)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return {@code true} if successful, otherwise {@code false} if the
<em>witness value</em> was not the same as the {@code expectedValue} or if this
operation spuriously failed.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #get(Object...)

## VarHandle.weakCompareAndSet(Object...)

```java
public final native boolean weakCompareAndSet(Object... args)
```

Possibly atomically sets the value of a variable to the {@code newValue}
with the memory semantics of {@link #setVolatile} if the variable's
current value, referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #getVolatile}.

<p>This operation may fail spuriously (typically, due to memory
contention) even if the <em>witness value</em> does match the expected value.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean}.

<p>The symbolic type descriptor at the call site of {@code
weakCompareAndSet} must match the access mode type that is the
result of calling {@code accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return {@code true} if successful, otherwise {@code false} if the
<em>witness value</em> was not the same as the {@code expectedValue} or if this
operation spuriously failed.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.weakCompareAndSetAcquire(Object...)

```java
public final native boolean weakCompareAndSetAcquire(Object... args)
```

Possibly atomically sets the value of a variable to the {@code newValue}
with the semantics of {@link #set} if the variable's current value,
referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #getAcquire}.

<p>This operation may fail spuriously (typically, due to memory
contention) even if the <em>witness value</em> does match the expected value.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean}.

<p>The symbolic type descriptor at the call site of {@code
weakCompareAndSetAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_ACQUIRE)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return {@code true} if successful, otherwise {@code false} if the
<em>witness value</em> was not the same as the {@code expectedValue} or if this
operation spuriously failed.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #getAcquire(Object...)

## VarHandle.weakCompareAndSetRelease(Object...)

```java
public final native boolean weakCompareAndSetRelease(Object... args)
```

Possibly atomically sets the value of a variable to the {@code newValue}
with the semantics of {@link #setRelease} if the variable's current
value, referred to as the <em>witness value</em>, {@code ==} the
{@code expectedValue}, as accessed with the memory semantics of
{@link #get}.

<p>This operation may fail spuriously (typically, due to memory
contention) even if the <em>witness value</em> does match the expected value.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean}.

<p>The symbolic type descriptor at the call site of {@code
weakCompareAndSetRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_RELEASE)}
on this VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)}
, statically represented using varargs.
@return {@code true} if successful, otherwise {@code false} if the
<em>witness value</em> was not the same as the {@code expectedValue} or if this
operation spuriously failed.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setRelease(Object...)
@see #get(Object...)

## VarHandle.getAndSet(Object...)

```java
public final native Object getAndSet(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #setVolatile} and returns the variable's
previous value, as accessed with the memory semantics of
{@link #getVolatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code getAndSet}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_SET)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndSetAcquire(Object...)

```java
public final native Object getAndSetAcquire(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #set} and returns the variable's
previous value, as accessed with the memory semantics of
{@link #getAcquire}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code getAndSetAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_SET_ACQUIRE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndSetRelease(Object...)

```java
public final native Object getAndSetRelease(Object... args)
```

Atomically sets the value of a variable to the {@code newValue} with the
memory semantics of {@link #setRelease} and returns the variable's
previous value, as accessed with the memory semantics of
{@link #get}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T newValue)T}.

<p>The symbolic type descriptor at the call site of {@code getAndSetRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_SET_RELEASE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T newValue)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndAdd(Object...)

```java
public final native Object getAndAdd(Object... args)
```

Atomically adds the {@code value} to the current value of a variable with
the memory semantics of {@link #setVolatile}, and returns the variable's
previous value, as accessed with the memory semantics of
{@link #getVolatile}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T value)T}.

<p>The symbolic type descriptor at the call site of {@code getAndAdd}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_ADD)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T value)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndAddAcquire(Object...)

```java
public final native Object getAndAddAcquire(Object... args)
```

Atomically adds the {@code value} to the current value of a variable with
the memory semantics of {@link #set}, and returns the variable's
previous value, as accessed with the memory semantics of
{@link #getAcquire}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T value)T}.

<p>The symbolic type descriptor at the call site of {@code getAndAddAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_ADD_ACQUIRE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T value)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndAddRelease(Object...)

```java
public final native Object getAndAddRelease(Object... args)
```

Atomically adds the {@code value} to the current value of a variable with
the memory semantics of {@link #setRelease}, and returns the variable's
previous value, as accessed with the memory semantics of
{@link #get}.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T value)T}.

<p>The symbolic type descriptor at the call site of {@code getAndAddRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_ADD_RELEASE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T value)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndBitwiseOr(Object...)

```java
public final native Object getAndBitwiseOr(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the {@code mask}
with the memory semantics of {@link #setVolatile} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getVolatile}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical OR is performed instead of a bitwise OR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseOr}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndBitwiseOrAcquire(Object...)

```java
public final native Object getAndBitwiseOrAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the {@code mask}
with the memory semantics of {@link #set} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getAcquire}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical OR is performed instead of a bitwise OR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseOrAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR_ACQUIRE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #getAcquire(Object...)

## VarHandle.getAndBitwiseOrRelease(Object...)

```java
public final native Object getAndBitwiseOrRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the {@code mask}
with the memory semantics of {@link #setRelease} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #get}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical OR is performed instead of a bitwise OR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseOrRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR_RELEASE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setRelease(Object...)
@see #get(Object...)

## VarHandle.getAndBitwiseAnd(Object...)

```java
public final native Object getAndBitwiseAnd(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the {@code mask}
with the memory semantics of {@link #setVolatile} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getVolatile}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical AND is performed instead of a bitwise AND.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseAnd}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndBitwiseAndAcquire(Object...)

```java
public final native Object getAndBitwiseAndAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the {@code mask}
with the memory semantics of {@link #set} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getAcquire}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical AND is performed instead of a bitwise AND.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseAndAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND_ACQUIRE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #getAcquire(Object...)

## VarHandle.getAndBitwiseAndRelease(Object...)

```java
public final native Object getAndBitwiseAndRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the {@code mask}
with the memory semantics of {@link #setRelease} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #get}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical AND is performed instead of a bitwise AND.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseAndRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND_RELEASE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setRelease(Object...)
@see #get(Object...)

## VarHandle.getAndBitwiseXor(Object...)

```java
public final native Object getAndBitwiseXor(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the {@code mask}
with the memory semantics of {@link #setVolatile} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getVolatile}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical XOR is performed instead of a bitwise XOR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseXor}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setVolatile(Object...)
@see #getVolatile(Object...)

## VarHandle.getAndBitwiseXorAcquire(Object...)

```java
public final native Object getAndBitwiseXorAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the {@code mask}
with the memory semantics of {@link #set} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #getAcquire}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical XOR is performed instead of a bitwise XOR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseXorAcquire}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR_ACQUIRE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #set(Object...)
@see #getAcquire(Object...)

## VarHandle.getAndBitwiseXorRelease(Object...)

```java
public final native Object getAndBitwiseXorRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the {@code mask}
with the memory semantics of {@link #setRelease} and returns the
variable's previous value, as accessed with the memory semantics of
{@link #get}.

<p>If the variable type is the non-integral {@code boolean} type then a
logical XOR is performed instead of a bitwise XOR.

<p>The method signature is of the form {@code (CT1 ct1, ..., CTn ctn, T mask)T}.

<p>The symbolic type descriptor at the call site of {@code getAndBitwiseXorRelease}
must match the access mode type that is the result of calling
{@code accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR_RELEASE)} on this
VarHandle.

@param args the signature-polymorphic parameter list of the form
{@code (CT1 ct1, ..., CTn ctn, T mask)}
, statically represented using varargs.
@return the signature-polymorphic result that is the previous value of
the variable
, statically represented using {@code Object}.
@throws UnsupportedOperationException if the access mode is unsupported
for this VarHandle.
@throws WrongMethodTypeException if the access mode type does not
match the caller's symbolic type descriptor.
@throws ClassCastException if the access mode type matches the caller's
symbolic type descriptor, but a reference cast fails.
@see #setRelease(Object...)
@see #get(Object...)

## VarHandle.withInvokeExactBehavior()

```java
public abstract VarHandle withInvokeExactBehavior()
```

Returns a VarHandle, with access to the same variable(s) as this VarHandle, but whose
invocation behavior of access mode methods is adjusted to
<a href="#invoke-exact-behavior"><em>invoke-exact behavior</em></a>.
<p>
If this VarHandle already has invoke-exact behavior this VarHandle is returned.
<p>
Invoking {@link #hasInvokeExactBehavior()} on the returned var handle
is guaranteed to return {@code true}.

@apiNote
Invoke-exact behavior guarantees that upon invocation of an access mode method
the types and arity of the arguments must match the {@link #accessModeType(AccessMode) access mode type},
otherwise a {@link WrongMethodTypeException} is thrown.

@see #withInvokeBehavior()
@see #hasInvokeExactBehavior()
@return a VarHandle with invoke-exact behavior
@since 16

## VarHandle.withInvokeBehavior()

```java
public abstract VarHandle withInvokeBehavior()
```

Returns a VarHandle, with access to the same variable(s) as this VarHandle, but whose
invocation behavior of access mode methods is adjusted to
<a href="#invoke-behavior"><em>invoke behavior</em></a>.
<p>
If this VarHandle already has invoke behavior this VarHandle is returned.
<p>
Invoking {@link #hasInvokeExactBehavior()} on the returned var handle
is guaranteed to return {@code false}.

@see #withInvokeExactBehavior()
@see #hasInvokeExactBehavior()
@return a VarHandle with invoke behavior
@since 16

## VarHandle.methodName()

```java
public String methodName()
```

Returns the {@code VarHandle} signature-polymorphic method name
associated with this {@code AccessMode} value.

@return the signature-polymorphic method name
@see #valueFromMethodName

## VarHandle.valueFromMethodName(String)

```java
public static AccessMode valueFromMethodName(String methodName)
```

Returns the {@code AccessMode} value associated with the specified
{@code VarHandle} signature-polymorphic method name.

@param methodName the signature-polymorphic method name
@return the {@code AccessMode} value
@throws IllegalArgumentException if there is no {@code AccessMode}
        value associated with method name (indicating the method
        name does not correspond to a {@code VarHandle}
        signature-polymorphic method name).
@see #methodName()

## VarHandle.toString()

```java
public final String toString()
```

Returns a compact textual description of this {@linkplain VarHandle},
including the type of variable described, and a description of its coordinates.

@return A compact textual description of this {@linkplain VarHandle}

## VarHandle.varType()

```java
public Class<?> varType()
```

Returns the variable type of variables referenced by this VarHandle.

@return the variable type of variables referenced by this VarHandle

## VarHandle.coordinateTypes()

```java
public List<Class<?>> coordinateTypes()
```

Returns the coordinate types for this VarHandle.

@return the coordinate types for this VarHandle. The returned
list is unmodifiable

## VarHandle.accessModeType(AccessMode)

```java
public final MethodType accessModeType(AccessMode accessMode)
```

Obtains the access mode type for this VarHandle and a given access mode.

<p>The access mode type's parameter types will consist of a prefix that
is the coordinate types of this VarHandle followed by further
types as defined by the access mode method.
The access mode type's return type is defined by the return type of the
access mode method.

@param accessMode the access mode, corresponding to the
signature-polymorphic method of the same name
@return the access mode type for the given access mode

## VarHandle.isAccessModeSupported(AccessMode)

```java
public boolean isAccessModeSupported(AccessMode accessMode)
```

Returns {@code true} if the given access mode is supported, otherwise
{@code false}.

<p>The return of a {@code false} value for a given access mode indicates
that an {@code UnsupportedOperationException} is thrown on invocation
of the corresponding access mode method.

@param accessMode the access mode, corresponding to the
signature-polymorphic method of the same name
@return {@code true} if the given access mode is supported, otherwise
{@code false}.

## VarHandle.toMethodHandle(AccessMode)

```java
public MethodHandle toMethodHandle(AccessMode accessMode)
```

Obtains a method handle bound to this VarHandle and the given access
mode.

@apiNote This method, for a VarHandle {@code vh} and access mode
{@code {access-mode}}, returns a method handle that is equivalent to
method handle {@code bmh} in the following code (though it may be more
efficient):
<pre>{@code
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      vh.accessModeType(VarHandle.AccessMode.{access-mode}));

MethodHandle bmh = mh.bindTo(vh);
}</pre>

@param accessMode the access mode, corresponding to the
signature-polymorphic method of the same name
@return a method handle bound to this VarHandle and the given access mode

## VarHandle.describeConstable()

```java
public Optional<VarHandleDesc> describeConstable()
```

Return a nominal descriptor for this instance, if one can be
constructed, or an empty {@link Optional} if one cannot be.

@return An {@link Optional} containing the resulting nominal descriptor,
or an empty {@link Optional} if one cannot be constructed.
@since 12

## VarHandle.fullFence()

```java
public static void fullFence()
```

Ensures that loads and stores before the fence will not be reordered
with
loads and stores after the fence.

@apiNote Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
{@code atomic_thread_fence(memory_order_seq_cst)}

## VarHandle.acquireFence()

```java
public static void acquireFence()
```

Ensures that loads before the fence will not be reordered with loads and
stores after the fence.

@apiNote Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
{@code atomic_thread_fence(memory_order_acquire)}

## VarHandle.releaseFence()

```java
public static void releaseFence()
```

Ensures that loads and stores before the fence will not be
reordered with stores after the fence.

@apiNote Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
{@code atomic_thread_fence(memory_order_release)}

## VarHandle.loadLoadFence()

```java
public static void loadLoadFence()
```

Ensures that loads before the fence will not be reordered with
loads after the fence.

## VarHandle.storeStoreFence()

```java
public static void storeStoreFence()
```

Ensures that stores before the fence will not be reordered with
stores after the fence.

## VarHandle.ofField(ClassDesc, String, ClassDesc)

```java
public static VarHandleDesc ofField(ClassDesc declaringClass, String name, ClassDesc fieldType)
```

Returns a {@linkplain VarHandleDesc} corresponding to a {@link VarHandle}
for an instance field.

@param declaringClass a {@link ClassDesc} describing the declaring class,
                      for field var handles
@param name the unqualified name of the field
@param fieldType a {@link ClassDesc} describing the type of the field
@return the {@linkplain VarHandleDesc}
@throws NullPointerException if any of the arguments are null
@jvms 4.2.2 Unqualified Names

## VarHandle.ofStaticField(ClassDesc, String, ClassDesc)

```java
public static VarHandleDesc ofStaticField(ClassDesc declaringClass, String name, ClassDesc fieldType)
```

Returns a {@linkplain VarHandleDesc} corresponding to a {@link VarHandle}
for a static field.

@param declaringClass a {@link ClassDesc} describing the declaring class,
                      for field var handles
@param name the unqualified name of the field
@param fieldType a {@link ClassDesc} describing the type of the field
@return the {@linkplain VarHandleDesc}
@throws NullPointerException if any of the arguments are null
@jvms 4.2.2 Unqualified Names

## VarHandle.ofArray(ClassDesc)

```java
public static VarHandleDesc ofArray(ClassDesc arrayClass)
```

Returns a {@linkplain VarHandleDesc} corresponding to a {@link VarHandle}
for an array type.

@param arrayClass a {@link ClassDesc} describing the type of the array
@return the {@linkplain VarHandleDesc}
@throws NullPointerException if any of the arguments are null

## VarHandle.varType()

```java
public ClassDesc varType()
```

Returns a {@link ClassDesc} describing the type of the variable described
by this descriptor.

@return the variable type

## VarHandle.toString()

```java
public String toString()
```

Returns a compact textual description of this constant description.
For a field {@linkplain VarHandle}, includes the owner, name, and type
of the field, and whether it is static; for an array {@linkplain VarHandle},
the name of the component type.

@return A compact textual description of this descriptor