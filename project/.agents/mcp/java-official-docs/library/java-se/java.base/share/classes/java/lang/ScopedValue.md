# ScopedValue class (java.lang)

```java
public final class ScopedValue<T>
```

A value that may be safely and efficiently shared to methods without using method
parameters.

<p> In the Java programming language, data is usually passed to a method by means of a
method parameter. The data may need to be passed through a sequence of many methods to
get to the method that makes use of the data. Every method in the sequence of calls
needs to declare the parameter and every method has access to the data.
{@code ScopedValue} provides a means to pass data to a faraway method (typically a
<em>callback</em>) without using method parameters. In effect, a {@code ScopedValue}
is an <em>implicit method parameter</em>. It is "as if" every method in a sequence of
calls has an additional parameter. None of the methods declare the parameter and only
the methods that have access to the {@code ScopedValue} object can access its value
(the data). {@code ScopedValue} makes it possible to securely pass data from a
<em>caller</em> to a faraway <em>callee</em> through a sequence of intermediate methods
that do not declare a parameter for the data and have no access to the data.

<p> The {@code ScopedValue} API works by executing a method with a {@code ScopedValue}
object <em>bound</em> to some value for the bounded period of execution of a method.
The method may invoke another method, which in turn may invoke another. The unfolding
execution of the methods define a <em>dynamic scope</em>. Code in these methods with
access to the {@code ScopedValue} object may read its value. The {@code ScopedValue}
object reverts to being <em>unbound</em> when the original method completes normally or
with an exception. The {@code ScopedValue} API supports executing a {@link Runnable},
or {@link CallableOp} with a {@code ScopedValue} bound to a value.

<p> Consider the following example with a scoped value "{@code NAME}" bound to the value
"{@code duke}" for the execution of a {@code Runnable}'s {@code run} method.
The {@code run} method, in turn, invokes a method {@code doSomething}.


{@snippet lang=java :
    // @link substring="newInstance" target="#newInstance" :
    private static final ScopedValue<String> NAME = ScopedValue.newInstance();

    // @link substring="run" target="Carrier#run(Runnable)" :
    ScopedValue.where(NAME, "duke").run(() -> doSomething());
}
Code executed directly or indirectly by {@code doSomething}, with access to the field
{@code NAME}, can invoke {@code NAME.get()} to read the value "{@code duke}". {@code
NAME} is bound while executing the {@code run} method. It reverts to being unbound when
the {@code run} method completes.

<p> The example using {@code run} invokes a method that does not return a result.
The {@link Carrier#call(CallableOp) call} method can be used
to invoke a method that returns a result.
{@code ScopedValue} defines the {@link #where(ScopedValue, Object)} method
for cases where multiple mappings (of {@code ScopedValue} to value) are accumulated
in advance of calling a method with all {@code ScopedValue}s bound to their value.

<h2>Bindings are per-thread</h2>

A {@code ScopedValue} binding to a value is per-thread. Invoking {@code run}
executes a method with a {@code ScopedValue} bound to a value for the current thread.
The {@link #get() get} method returns the value bound for the current thread.

<p> In the example, if code executed by one thread invokes this:
{@snippet lang=java :
    ScopedValue.where(NAME, "duke1").run(() -> doSomething());
}
and code executed by another thread invokes:
{@snippet lang=java :
    ScopedValue.where(NAME, "duke2").run(() -> doSomething());
}
then code in {@code doSomething} (or any method that it calls) invoking {@code NAME.get()}
will read the value "{@code duke1}" or "{@code duke2}", depending on which thread is
executing.

<h2>Scoped values as capabilities</h2>

A {@code ScopedValue} object should be treated as a <em>capability</em> or a key to
access its value when the {@code ScopedValue} is bound. Secure usage depends on access
control (see <cite>The Java Virtual Machine Specification</cite>, Section {@jvms 5.4.4})
and taking care to not share the {@code ScopedValue} object. In many cases, a {@code
ScopedValue} will be declared in a {@code final} and {@code static} field so that it
is only accessible to code in a single class (or nest).

<h2><a id="rebind">Rebinding</a></h2>

The {@code ScopedValue} API allows a new binding to be established for <em>nested
dynamic scopes</em>. This is known as <em>rebinding</em>. A {@code ScopedValue} that
is bound to a value may be bound to a new value for the bounded execution of a new
method. The unfolding execution of code executed by that method defines the nested
dynamic scope. When the method completes, the value of the {@code ScopedValue} reverts
to its previous value.

<p> In the above example, suppose that code executed by {@code doSomething} binds
{@code NAME} to a new value with:
{@snippet lang=java :
    ScopedValue.where(NAME, "duchess").run(() -> doMore());
}
Code executed directly or indirectly by {@code doMore()} that invokes {@code
NAME.get()} will read the value "{@code duchess}". When {@code doMore()} completes
then the value of {@code NAME} reverts to "{@code duke}".

<h2><a id="inheritance">Inheritance</a></h2>

{@code ScopedValue} supports sharing across threads. This sharing is limited to
structured cases where child threads are started and terminate within the bounded
period of execution by a parent thread. When using a {@link StructuredTaskScope},
scoped value bindings are <em>captured</em> when creating a {@code StructuredTaskScope}
and inherited by all threads started in that task scope with the
{@link StructuredTaskScope#fork(java.util.concurrent.Callable) fork} method.

<p> A {@code ScopedValue} that is shared across threads requires that the value be an
immutable object or for all access to the value to be appropriately synchronized.

<p> In the following example, the {@code ScopedValue} {@code NAME} is bound to the
value "{@code duke}" for the execution of a runnable operation. The code in the {@code
run} method creates a {@code StructuredTaskScope} that forks three tasks. Code executed
directly or indirectly by these threads running {@code childTask1()}, {@code childTask2()},
and {@code childTask3()} that invokes {@code NAME.get()} will read the value
"{@code duke}".

{@snippet lang=java :
    private static final ScopedValue<String> NAME = ScopedValue.newInstance();

    ScopedValue.where(NAME, "duke").run(() -> {
        // @link substring="open" target="StructuredTaskScope#open()" :
        try (var scope = StructuredTaskScope.open()) {

             // @link substring="fork" target="StructuredTaskScope#fork(java.util.concurrent.Callable)" :
             scope.fork(() -> childTask1());
             scope.fork(() -> childTask2());
             scope.fork(() -> childTask3());

             // @link substring="join" target="StructuredTaskScope#join()" :
             scope.join();

             ..
         }
    });
}

<p> Unless otherwise specified, passing a {@code null} argument to a method in this
class will cause a {@link NullPointerException} to be thrown.

@apiNote
A {@code ScopedValue} should be preferred over a {@link ThreadLocal} for cases where
the goal is "one-way transmission" of data without using method parameters.  While a
{@code ThreadLocal} can be used to pass data to a method without using method parameters,
it does suffer from a number of issues:
<ol>
  <li> {@code ThreadLocal} does not prevent code in a faraway callee from {@linkplain
  ThreadLocal#set(Object) setting} a new value.
  <li> A {@code ThreadLocal} has an unbounded lifetime and thus continues to have a value
  after a method completes, unless explicitly {@linkplain ThreadLocal#remove() removed}.
  <li> {@linkplain InheritableThreadLocal Inheritance} is expensive - the map of
  thread-locals to values must be copied when creating each child thread.
</ol>

@implNote
Scoped values are designed to be used in fairly small
numbers. {@link #get} initially performs a search through enclosing
scopes to find a scoped value's innermost binding. It
then caches the result of the search in a small thread-local
cache. Subsequent invocations of {@link #get} for that scoped value
will almost always be very fast. However, if a program has many
scoped values that it uses cyclically, the cache hit rate
will be low and performance will be poor. This design allows
scoped-value inheritance by {@link StructuredTaskScope} threads to
be very fast: in essence, no more than copying a pointer, and
leaving a scoped-value binding also requires little more than
updating a pointer.

<p>Because the scoped-value per-thread cache is small, clients
should minimize the number of bound scoped values in use. For
example, if it is necessary to pass a number of values in this way,
it makes sense to create a record class to hold those values, and
then bind a single {@code ScopedValue} to an instance of that record.

<p>For this release, the reference implementation
provides some system properties to tune the performance of scoped
values.

<p>The system property {@code java.lang.ScopedValue.cacheSize}
controls the size of the (per-thread) scoped-value cache. This cache is crucial
for the performance of scoped values. If it is too small,
the runtime library will repeatedly need to scan for each
{@link #get}. If it is too large, memory will be unnecessarily
consumed. The default scoped-value cache size is 16 entries. It may
be varied from 2 to 16 entries in size. {@code ScopedValue.cacheSize}
must be an integer power of 2.

<p>For example, you could use {@code -Djava.lang.ScopedValue.cacheSize=8}.

<p>The other system property is {@code jdk.preserveScopedValueCache}.
This property determines whether the per-thread scoped-value
cache is preserved when a virtual thread is blocked. By default
this property is set to {@code true}, meaning that every virtual
thread preserves its scoped-value cache when blocked. Like {@code
ScopedValue.cacheSize}, this is a space versus speed trade-off: in
situations where many virtual threads are blocked most of the time,
setting this property to {@code false} might result in a useful
memory saving, but each virtual thread's scoped-value cache would
have to be regenerated after a blocking operation.

@param <T> the type of the value
@since 25

## ScopedValue.where(ScopedValue<T>, T)

```java
public <T> Carrier where(ScopedValue<T> key, T value)
```

Returns a new {@code Carrier} with the mappings from this carrier plus a
new mapping from {@code key} to {@code value}. If this carrier already has a
mapping for the scoped value {@code key} then it will map to the new
{@code value}. The current carrier is immutable, so it is not changed by this
method.

@param key the {@code ScopedValue} key
@param value the value, can be {@code null}
@param <T> the type of the value
@return a new {@code Carrier} with the mappings from this carrier plus the new mapping

## ScopedValue.get(ScopedValue<T>)

```java
public <T> T get(ScopedValue<T> key)
```

Returns the value of a {@link ScopedValue} in this mapping.

@param key the {@code ScopedValue} key
@param <T> the type of the value
@return the value
@throws NoSuchElementException if the key is not present in this mapping

## ScopedValue.call(CallableOp<? extends R, X>)

```java
public <R, X extends Throwable> R call(CallableOp<? extends R, X> op) throws X
```

Calls a value-returning operation with each scoped value in this mapping bound
to its value in the current thread.
When the operation completes (normally or with an exception), each scoped value
in the mapping will revert to being unbound, or revert to its previous value
when previously bound, in the current thread. If {@code op} completes with an
exception then it propagated by this method.

<p> Scoped values are intended to be used in a <em>structured manner</em>. If code
invoked directly or indirectly by the operation creates a {@link StructuredTaskScope}
but does not {@linkplain StructuredTaskScope#close() close} it, then it is detected
as a <em>structure violation</em> when the operation completes (normally or with an
exception). In that case, the underlying construct of the {@code StructuredTaskScope}
is closed and {@link StructureViolationException} is thrown.

@param op the operation to run
@param <R> the type of the result of the operation
@param <X> type of the exception thrown by the operation
@return the result
@throws StructureViolationException if a structure violation is detected
@throws X if {@code op} completes with an exception

## ScopedValue.run(Runnable)

```java
public void run(Runnable op)
```

Runs an operation with each scoped value in this mapping bound to its value
in the current thread.
When the operation completes (normally or with an exception), each scoped value
in the mapping will revert to being unbound, or revert to its previous value
when previously bound, in the current thread. If {@code op} completes with an
exception then it propagated by this method.

<p> Scoped values are intended to be used in a <em>structured manner</em>. If code
invoked directly or indirectly by the operation creates a {@link StructuredTaskScope}
but does not {@linkplain StructuredTaskScope#close() close} it, then it is detected
as a <em>structure violation</em> when the operation completes (normally or with an
exception). In that case, the underlying construct of the {@code StructuredTaskScope}
is closed and {@link StructureViolationException} is thrown.

@param op the operation to run
@throws StructureViolationException if a structure violation is detected

## ScopedValue.where(ScopedValue<T>, T)

```java
public static <T> Carrier where(ScopedValue<T> key, T value)
```

Creates a new {@code Carrier} with a single mapping of a {@code ScopedValue}
<em>key</em> to a value. The {@code Carrier} can be used to accumulate mappings so
that an operation can be executed with all scoped values in the mapping bound to
values. The following example runs an operation with {@code k1} bound (or rebound)
to {@code v1}, and {@code k2} bound (or rebound) to {@code v2}.
{@snippet lang=java :
    // @link substring="run" target="Carrier#run(Runnable)" :
    ScopedValue.where(k1, v1).where(k2, v2).run(() -> ... );
}

@param key the {@code ScopedValue} key
@param value the value, can be {@code null}
@param <T> the type of the value
@return a new {@code Carrier} with a single mapping

## ScopedValue.newInstance()

```java
public static <T> ScopedValue<T> newInstance()
```

Creates a scoped value that is initially unbound for all threads.

@param <T> the type of the value
@return a new {@code ScopedValue}

## ScopedValue.get()

```java
public T get()
```

{@return the value of the scoped value if bound in the current thread}

@throws NoSuchElementException if the scoped value is not bound

## ScopedValue.isBound()

```java
public boolean isBound()
```

{@return {@code true} if this scoped value is bound in the current thread}

## ScopedValue.orElse(T)

```java
public T orElse(T other)
```

Returns the value of this scoped value if bound in the current thread, otherwise
returns {@code other}.

@param other the value to return if not bound
@return the value of the scoped value if bound, otherwise {@code other}

## ScopedValue.orElseThrow(Supplier<? extends X>)

```java
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X
```

Returns the value of this scoped value if bound in the current thread, otherwise
throws an exception produced by the exception supplying function.

@param <X> the type of the exception that may be thrown
@param exceptionSupplier the supplying function that produces the exception to throw
@return the value of the scoped value if bound in the current thread
@throws X if the scoped value is not bound in the current thread