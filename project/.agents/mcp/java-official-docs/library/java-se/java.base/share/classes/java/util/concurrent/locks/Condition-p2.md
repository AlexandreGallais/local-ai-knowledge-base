---
title: "Condition interface (java.util.concurrent.locks) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/Condition.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Condition interface (java.util.concurrent.locks) (part 2 of 2)

## Condition.awaitUntil(Date)

```java
boolean awaitUntil(Date deadline) throws InterruptedException
```

Causes the current thread to wait until it is signalled or interrupted,
or the specified deadline elapses.

The lock associated with this condition is atomically
released and the current thread becomes disabled for thread scheduling
purposes and lies dormant until *one* of five things happens:

- Some other thread invokes the `signal` method for this
`Condition` and the current thread happens to be chosen as the
thread to be awakened; or

- Some other thread invokes the `signalAll` method for this
`Condition`; or

- Some other thread interrupts the
current thread, and interruption of thread suspension is supported; or

- The specified deadline elapses; or

- A "*spurious wakeup*" occurs.

In all cases, before this method can return the current thread must
re-acquire the lock associated with this condition. When the
thread returns it is *guaranteed* to hold this lock.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while waiting
and interruption of thread suspension is supported,

then `InterruptedException` is thrown and the current thread's
interrupted status is cleared. It is not specified, in the first
case, whether or not the test for interruption occurs before the lock
is released.

The return value indicates whether the deadline has elapsed,
which can be used as follows:

```java
boolean aMethod(Date deadline)
    throws InterruptedException {
  boolean stillWaiting = true;
  lock.lock();
  try {
    while (!conditionBeingWaitedFor()) {
      if (!stillWaiting)
        return false;
      stillWaiting = theCondition.awaitUntil(deadline);
    }
    // ...
    return true;
  } finally {
    lock.unlock();
  }
}
```

**Implementation Considerations**

The current thread is assumed to hold the lock associated with this
`Condition` when this method is called.
It is up to the implementation to determine if this is
the case and if not, how to respond. Typically, an exception will be
thrown (such as `IllegalMonitorStateException`) and the
implementation must document that fact.

An implementation can favor responding to an interrupt over normal
method return in response to a signal, or over indicating the passing
of the specified deadline. In either case the implementation
must ensure that the signal is redirected to another waiting thread, if
there is one.

Parameters:

- `deadline`: the absolute time to wait until

**Returns:** `false` if the deadline has elapsed upon return, else
        `true`

Throws:

- `InterruptedException`: if the current thread is interrupted (and interruption of thread suspension is supported)

## Condition.signal()

```java
void signal()
```

Wakes up one waiting thread.

If any threads are waiting on this condition then one
is selected for waking up. That thread must then re-acquire the
lock before returning from `await`.

**Implementation Considerations**

An implementation may (and typically does) require that the
current thread hold the lock associated with this `Condition` when this method is called. Implementations must
document this precondition and any actions taken if the lock is
not held. Typically, an exception such as `IllegalMonitorStateException` will be thrown.

## Condition.signalAll()

```java
void signalAll()
```

Wakes up all waiting threads.

If any threads are waiting on this condition then they are
all woken up. Each thread must re-acquire the lock before it can
return from `await`.

**Implementation Considerations**

An implementation may (and typically does) require that the
current thread hold the lock associated with this `Condition` when this method is called. Implementations must
document this precondition and any actions taken if the lock is
not held. Typically, an exception such as `IllegalMonitorStateException` will be thrown.
