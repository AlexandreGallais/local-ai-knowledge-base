---
title: "Object class (java.lang) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Object.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Object class (java.lang) (part 2 of 2)

## Object.wait(long, int)

```java
public final void wait(long timeoutMillis, int nanos) throws InterruptedException
```

Causes the current thread to wait until it is awakened, typically
by being *notified* or *interrupted*, or until a
certain amount of real time has elapsed.

The current thread must own this object's monitor lock. See the
notify method for a description of the ways in which
a thread can become the owner of a monitor lock.

This method causes the current thread (referred to here as *T*) to
place itself in the wait set for this object and then to relinquish any
and all synchronization claims on this object. Note that only the locks
on this object are relinquished; any other objects on which the current
thread may be synchronized remain locked while the thread waits.

Thread *T* then becomes disabled for thread scheduling purposes
and lies dormant until one of the following occurs:

- Some other thread invokes the `notify` method for this
object and thread *T* happens to be arbitrarily chosen as
the thread to be awakened.

- Some other thread invokes the `notifyAll` method for this
object.

- Some other thread interrupts
thread *T*.

- The specified amount of real time has elapsed, more or less.
The amount of real time, in nanoseconds, is given by the expression
`1000000 * timeoutMillis + nanos`. If `timeoutMillis` and `nanos`
are both zero, then real time is not taken into consideration and the
thread waits until awakened by one of the other causes.

- Thread *T* is awakened spuriously. (See below.)

The thread *T* is then removed from the wait set for this
object and re-enabled for thread scheduling. It competes in the
usual manner with other threads for the right to synchronize on the
object; once it has regained control of the object, all its
synchronization claims on the object are restored to the status quo
ante - that is, to the situation as of the time that the `wait`
method was invoked. Thread *T* then returns from the
invocation of the `wait` method. Thus, on return from the
`wait` method, the synchronization state of the object and of
thread `T` is exactly as it was when the `wait` method
was invoked.

A thread can wake up without being notified, interrupted, or timing out, a
so-called *spurious wakeup*.  While this will rarely occur in practice,
applications must guard against it by testing for the condition that should
have caused the thread to be awakened, and continuing to wait if the condition
is not satisfied. See the example below.

For more information on this topic, see section 14.2,
"Condition Queues," in Brian Goetz and others' *Java Concurrency
in Practice* (Addison-Wesley, 2006) or Item 81 in Joshua
Bloch's *Effective Java, Third Edition* (Addison-Wesley,
2018).

If the current thread is interrupted
by any thread before or while it is waiting, then an `InterruptedException`
is thrown.  The *interrupted status* of the current thread is cleared when
this exception is thrown. This exception is not thrown until the lock status of
this object has been restored as described above.

Parameters:

- `timeoutMillis`: the maximum time to wait, in milliseconds
- `nanos`: additional time, in nanoseconds, in the range 0-999999 inclusive

**API note:** The recommended approach to waiting is to check the condition being awaited in
a `while` loop around the call to `wait`, as shown in the example
below. Among other things, this approach avoids problems that can be caused
by spurious wakeups.

**See also:** #notify()

**See also:** #notifyAll()

**See also:** #wait()

**See also:** #wait(long)

Throws:

- `IllegalArgumentException`: if `timeoutMillis` is negative, or if the value of `nanos` is out of range
- `IllegalMonitorStateException`: if the current thread is not the owner of the object's monitor
- `InterruptedException`: if any thread interrupted the current thread before or while the current thread was waiting. The *interrupted status* of the current thread is cleared when this exception is thrown.

## Object.finalize()

```java
protected void finalize() throws Throwable
```

Called by the garbage collector on an object when garbage collection
determines that there are no more references to the object.
A subclass overrides the `finalize` method to dispose of
system resources or to perform other cleanup.

**When running in a Java virtual machine in which finalization has been
disabled or removed, the garbage collector will never call
`finalize()`. In a Java virtual machine in which finalization is
enabled, the garbage collector might call `finalize` only after an
indefinite delay.**

The general contract of `finalize` is that it is invoked
if and when the Java virtual
machine has determined that there is no longer any
means by which this object can be accessed by any thread that has
not yet died, except as a result of an action taken by the
finalization of some other object or class which is ready to be
finalized. The `finalize` method may take any action, including
making this object available again to other threads; the usual purpose
of `finalize`, however, is to perform cleanup actions before
the object is irrevocably discarded. For example, the finalize method
for an object that represents an input/output connection might perform
explicit I/O transactions to break the connection before the object is
permanently discarded.

The `finalize` method of class `Object` performs no
special action; it simply returns normally. Subclasses of
`Object` may override this definition.

The Java programming language does not guarantee which thread will
invoke the `finalize` method for any given object. It is
guaranteed, however, that the thread that invokes finalize will not
be holding any user-visible synchronization locks when finalize is
invoked. If an uncaught exception is thrown by the finalize method,
the exception is ignored and finalization of that object terminates.

After the `finalize` method has been invoked for an object, no
further action is taken until the Java virtual machine has again
determined that there is no longer any means by which this object can
be accessed by any thread that has not yet died, including possible
actions by other objects or classes which are ready to be finalized,
at which point the object may be discarded.

The `finalize` method is never invoked more than once by a Java
virtual machine for any given object.

Any exception thrown by the `finalize` method causes
the finalization of this object to be halted, but is otherwise
ignored.

**API note:** Classes that embed non-heap resources have many options
for cleanup of those resources. The class must ensure that the
lifetime of each instance is longer than that of any resource it embeds.
`java.lang.ref.Reference.reachabilityFence` can be used to ensure that
objects remain reachable while resources embedded in the object are in use.

A subclass should avoid overriding the `finalize` method
unless the subclass embeds non-heap resources that must be cleaned up
before the instance is collected.
Finalizer invocations are not automatically chained, unlike constructors.
If a subclass overrides `finalize` it must invoke the superclass
finalizer explicitly.
To guard against exceptions prematurely terminating the finalize chain,
the subclass should use a `try-finally` block to ensure
`super.finalize()` is always invoked. For example,

**Override:** protected void finalize() throws Throwable {
        try {
            ... // cleanup subclass state
        } finally {
            super.finalize();
        }
    }
}

**Deprecated:** Finalization is deprecated and subject to removal in a future
release. The use of finalization can lead to problems with security,
performance, and reliability.
See JEP 421 for
discussion and alternatives.

Subclasses that override `finalize` to perform cleanup should use
alternative cleanup mechanisms and remove the `finalize` method.
Use `java.lang.ref.Cleaner` and
`java.lang.ref.PhantomReference` as safer ways to release resources
when an object becomes unreachable. Alternatively, add a `close`
method to explicitly release resources, and implement
`AutoCloseable` to enable use of the `try`-with-resources
statement.

This method will remain in place until finalizers have been removed from
most existing code.

**See also:** java.lang.ref.WeakReference

**See also:** java.lang.ref.PhantomReference

**JLS:** 12.6 Finalization of Class Instances

Throws:

- `Throwable`: the `Exception` raised by this method
