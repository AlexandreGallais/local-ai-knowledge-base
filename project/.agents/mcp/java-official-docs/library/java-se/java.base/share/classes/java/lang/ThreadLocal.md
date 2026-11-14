---
title: "ThreadLocal class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ThreadLocal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadLocal class (java.lang)

```java
public class ThreadLocal<T>
```

This class provides thread-local variables.  These variables differ from
their normal counterparts in that each thread that accesses one (via its
`get` or `set` method) has its own, independently initialized
copy of the variable.  `ThreadLocal` instances are typically private
static fields in classes that wish to associate state with a thread (e.g.,
a user ID or Transaction ID).

For example, the class below generates unique identifiers local to each
thread.
A thread's id is assigned the first time it invokes `ThreadId.get()`
and remains unchanged on subsequent calls.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadId {
    // Atomic integer containing the next thread ID to be assigned
    private static final AtomicInteger nextId = new AtomicInteger(0);

    // Thread local variable containing each thread's ID
    private static final ThreadLocal<Integer> threadId =
        new ThreadLocal<Integer>() {
            @Override protected Integer initialValue() {
                return nextId.getAndIncrement();
        }
    };

    // Returns the current thread's unique ID, assigning it if necessary
    public static int get() {
        return threadId.get();
    }
```

Each thread holds an implicit reference to its copy of a thread-local
variable as long as the thread is alive and the `ThreadLocal`
instance is accessible; after a thread goes away, all of its copies of
thread-local instances are subject to garbage collection (unless other
references to these copies exist).

Parameters:

- `<T>`: the type of the thread local's value

**Since:** 1.2

## ThreadLocal.initialValue()

```java
protected T initialValue()
```

Returns the current thread's "initial value" for this
thread-local variable.  This method will be invoked the first
time a thread accesses the variable with the `get`
method, unless the thread previously invoked the `set`
method, in which case the `initialValue` method will not
be invoked for the thread.  Normally, this method is invoked at
most once per thread, but it may be invoked again in case of
subsequent invocations of `remove` followed by `get`.

**Implementation requirements:** This implementation simply returns `null`; if the
programmer desires thread-local variables to have an initial
value other than `null`, then either `ThreadLocal`
can be subclassed and this method overridden or the method
`ThreadLocal.withInitial(Supplier)` can be used to
construct a `ThreadLocal`.

**Returns:** the initial value for this thread-local

**See also:** #withInitial(java.util.function.Supplier)

## ThreadLocal.withInitial(Supplier<? extends S>)

```java
public static <S> ThreadLocal<S> withInitial(Supplier<? extends S> supplier)
```

Creates a thread local variable. The initial value of the variable is
determined by invoking the `get` method on the `Supplier`.

Parameters:

- ``: the type of the thread local's value
- `supplier`: the supplier to be used to determine the initial value

**Returns:** a new thread local variable

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified supplier is null

## ThreadLocal.ThreadLocal()

```java
public ThreadLocal()
```

Creates a thread local variable.

**See also:** #withInitial(java.util.function.Supplier)

## ThreadLocal.get()

```java
public T get()
```

Returns the value in the current thread's copy of this
thread-local variable.  If the variable has no value for the
current thread, it is first initialized to the value returned
by an invocation of the `initialValue` method.

**Returns:** the current thread's value of this thread-local

## ThreadLocal.set(T)

```java
public void set(T value)
```

Sets the current thread's copy of this thread-local variable
to the specified value.  Most subclasses will have no need to
override this method, relying solely on the `initialValue`
method to set the values of thread-locals.

Parameters:

- `value`: the value to be stored in the current thread's copy of this thread-local.

## ThreadLocal.remove()

```java
public void remove()
```

Removes the current thread's value for this thread-local
variable.  If this thread-local variable is subsequently
read by the current thread, its value will be
reinitialized by invoking its `initialValue` method,
unless its value is set by the current thread
in the interim.  This may result in multiple invocations of the
`initialValue` method in the current thread.

**Since:** 1.5
