---
title: "Thread class (java.lang) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Thread.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Thread class (java.lang) (part 2 of 3)

## Thread.Thread(ThreadGroup, Runnable, String)

```java
public Thread(ThreadGroup group, Runnable task, String name)
```

Initializes a new platform `Thread` so that it has `task`
as its run object, has the specified `name` as its name,
and belongs to the thread group referred to by `group`.

The priority of the newly created thread is the smaller of
priority of the thread creating it and the maximum permitted
priority of the thread group. The method setPriority may be used to change the priority to a new value.

The newly created thread is initially marked as being a daemon
thread if and only if the thread creating it is currently marked
as a daemon thread. The method setDaemon
may be used to change whether or not a thread is a daemon.

For a non-null group, task, and name, invoking this constructor directly
is equivalent to:

```java
Thread.ofPlatform().group(group).name(name).unstarted(task);
```

Parameters:

- `group`: the thread group. If `null`, the group is set to the current thread's thread group.
- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this thread's run method is invoked.
- `name`: the name of the new thread

**See also:** Inheritance when creating threads

## Thread.Thread(ThreadGroup, Runnable, String, long)

```java
public Thread(ThreadGroup group, Runnable task, String name, long stackSize)
```

Initializes a new platform `Thread` so that it has `task`
as its run object, has the specified `name` as its name,
and belongs to the thread group referred to by `group`, and has
the specified *stack size*.

This constructor is identical to `Thread(ThreadGroup,Runnable,String)` with the exception of the fact
that it allows the thread stack size to be specified.  The stack size
is the approximate number of bytes of address space that the virtual
machine is to allocate for this thread's stack.  **The effect of the
`stackSize` parameter, if any, is highly platform dependent.**

On some platforms, specifying a higher value for the
`stackSize` parameter may allow a thread to achieve greater
recursion depth before throwing a `StackOverflowError`.
Similarly, specifying a lower value may allow a greater number of
threads to exist concurrently without throwing an `OutOfMemoryError` (or other internal error).  The details of
the relationship between the value of the `stackSize` parameter
and the maximum recursion depth and concurrency level are
platform-dependent.  **On some platforms, the value of the
`stackSize` parameter may have no effect whatsoever.**

The virtual machine is free to treat the `stackSize`
parameter as a suggestion.  If the specified value is unreasonably low
for the platform, the virtual machine may instead use some
platform-specific minimum value; if the specified value is unreasonably
high, the virtual machine may instead use some platform-specific
maximum.  Likewise, the virtual machine is free to round the specified
value up or down as it sees fit (or to ignore it completely).

Specifying a value of zero for the `stackSize` parameter will
cause this constructor to behave exactly like the
`Thread(ThreadGroup, Runnable, String)` constructor.

*Due to the platform-dependent nature of the behavior of this
constructor, extreme care should be exercised in its use.
The thread stack size necessary to perform a given computation will
likely vary from one JRE implementation to another.  In light of this
variation, careful tuning of the stack size parameter may be required,
and the tuning may need to be repeated for each JRE implementation on
which an application is to run.*

Implementation note: Java platform implementers are encouraged to
document their implementation's behavior with respect to the
`stackSize` parameter.

For a non-null group, task, and name, invoking this constructor directly
is equivalent to:

```java
Thread.ofPlatform().group(group).name(name).stackSize(stackSize).unstarted(task);
```

Parameters:

- `group`: the thread group. If `null`, the group is set to the current thread's thread group.
- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this thread's run method is invoked.
- `name`: the name of the new thread
- `stackSize`: the desired stack size for the new thread, or zero to indicate that this parameter is to be ignored.

**Since:** 1.4

**See also:** Inheritance when creating threads

## Thread.Thread(ThreadGroup, Runnable, String, long, boolean)

```java
public Thread(ThreadGroup group, Runnable task, String name, long stackSize, boolean inheritInheritableThreadLocals)
```

Initializes a new platform `Thread` so that it has `task`
as its run object, has the specified `name` as its name,
belongs to the thread group referred to by `group`, has
the specified `stackSize`, and inherits initial values for
inheritable thread-local variables
if `inheritThreadLocals` is `true`.

 This constructor is identical to `Thread(ThreadGroup,Runnable,String,long)` with the added ability to
suppress, or not, the inheriting of initial values for inheritable
thread-local variables from the constructing thread. This allows for
finer grain control over inheritable thread-locals. Care must be taken
when passing a value of `false` for `inheritThreadLocals`,
as it may lead to unexpected behavior if the new thread executes code
that expects a specific thread-local value to be inherited.

 Specifying a value of `true` for the `inheritThreadLocals`
parameter will cause this constructor to behave exactly like the
`Thread(ThreadGroup, Runnable, String, long)` constructor.

 For a non-null group, task, and name, invoking this constructor directly
is equivalent to:

```java
Thread.ofPlatform()
     .group(group)
     .name(name)
     .stackSize(stackSize)
     .inheritInheritableThreadLocals(inheritInheritableThreadLocals)
     .unstarted(task);
```

Parameters:

- `group`: the thread group. If `null`, the group is set to the current thread's thread group.
- `task`: the object whose `run` method is invoked when this thread is started. If `null`, this thread's run method is invoked.
- `name`: the name of the new thread
- `stackSize`: the desired stack size for the new thread, or zero to indicate that this parameter is to be ignored
- `inheritInheritableThreadLocals`: if `true`, inherit initial values for inheritable thread-locals from the constructing thread, otherwise no initial values are inherited

**Since:** 9

**See also:** Inheritance when creating threads

## Thread.startVirtualThread(Runnable)

```java
public static Thread startVirtualThread(Runnable task)
```

Creates a virtual thread to execute a task and schedules it to execute.

 This method is equivalent to:

```java
Thread.ofVirtual().start(task);
```

Parameters:

- `task`: the object to run when the thread executes

**Returns:** a new, and started, virtual thread

**See also:** Inheritance when creating threads

**Since:** 21

## Thread.isVirtual()

```java
public final boolean isVirtual()
```

Returns `true` if this thread is a virtual thread. A virtual thread
is scheduled by the Java virtual machine rather than the operating system.

**Returns:** `true` if this thread is a virtual thread

**Since:** 21

## Thread.start()

```java
public void start()
```

Schedules this thread to begin execution. The thread will execute
independently of the current thread.

 A thread can be started at most once. In particular, a thread can not
be restarted after it has terminated.

Throws:

- `IllegalThreadStateException`: if the thread was already started

## Thread.run()

```java
public void run()
```

This method is run by the thread when it executes. Subclasses of `Thread` may override this method.

 This method is not intended to be invoked directly. If this thread is a
platform thread created with a `Runnable` task then invoking this method
will invoke the task's `run` method. If this thread is a virtual thread
then invoking this method directly does nothing.

**Implementation requirements:** The default implementation executes the `Runnable` task that
the `Thread` was created with. If the thread was created without a task
then this method does nothing.

## Thread.stop()

```java
public final void stop()
```

Throws `UnsupportedOperationException`.

**Deprecated:** This method was originally specified to "stop" a victim
      thread by causing the victim thread to throw a `ThreadDeath`.
      It was inherently unsafe. Stopping a thread caused it to unlock
      all of the monitors that it had locked (as a natural consequence
      of the `ThreadDeath` exception propagating up the stack). If
      any of the objects previously protected by these monitors were in
      an inconsistent state, the damaged objects became visible to
      other threads, potentially resulting in arbitrary behavior.
      Usages of `stop` should be replaced by code that simply
      modifies some variable to indicate that the target thread should
      stop running.  The target thread should check this variable
      regularly, and return from its run method in an orderly fashion
      if the variable indicates that it is to stop running.  If the
      target thread waits for long periods (on a condition variable,
      for example), the `interrupt` method should be used to
      interrupt the wait.
      For more information, see
      Why
      is Thread.stop deprecated and the ability to stop a thread removed?.

Throws:

- `UnsupportedOperationException`: always

## Thread.interrupt()

```java
public void interrupt()
```

Interrupts this thread.

 If this thread is blocked in an invocation of the wait(), wait(long), or int) wait(long, int) methods of the `Object`
class, or of the `join()`, `join(long)`, int), `sleep(long)`, or int)
methods of this class, then its interrupt status will be cleared and it
will receive an `InterruptedException`.

 If this thread is blocked in an I/O operation upon an InterruptibleChannel
then the channel will be closed, the thread's interrupt
status will be set, and the thread will receive a `java.nio.channels.ClosedByInterruptException`.

 If this thread is blocked in a `java.nio.channels.Selector`
then the thread's interrupt status will be set and it will return
immediately from the selection operation, possibly with a non-zero
value, just as if the selector's wakeup method were invoked.

 If none of the previous conditions hold then this thread's interrupt
status will be set.

 Interrupting a thread that is not alive need not have any effect.

**Implementation note:** In the JDK Reference Implementation, interruption of a thread
that is not alive still records that the interrupt request was made and
will report it via `interrupted()` and `isInterrupted()`.

## Thread.interrupted()

```java
public static boolean interrupted()
```

Tests whether the current thread has been interrupted.  The
*interrupted status* of the thread is cleared by this method.  In
other words, if this method were to be called twice in succession, the
second call would return false (unless the current thread were
interrupted again, after the first call had cleared its interrupted
status and before the second call had examined it).

**Returns:** `true` if the current thread has been interrupted;
         `false` otherwise.

**See also:** #isInterrupted()

## Thread.isInterrupted()

```java
public boolean isInterrupted()
```

Tests whether this thread has been interrupted.  The *interrupted
status* of the thread is unaffected by this method.

**Returns:** `true` if this thread has been interrupted;
         `false` otherwise.

**See also:** #interrupted()

## Thread.isAlive()

```java
public final boolean isAlive()
```

Tests if this thread is alive. A thread is alive if it has
been started and has not yet terminated.

**Returns:** `true` if this thread is alive;
         `false` otherwise.

## Thread.setPriority(int)

```java
public final void setPriority(int newPriority)
```

Changes the priority of this thread.

For platform threads, the priority is set to the smaller of the specified
`newPriority` and the maximum permitted priority of the thread's
thread group.

The priority of a virtual thread is always `Thread.NORM_PRIORITY`
and `newPriority` is ignored.

Parameters:

- `newPriority`: the new thread priority

**See also:** #setPriority(int)

**See also:** ThreadGroup#getMaxPriority()

Throws:

- `IllegalArgumentException`: if the priority is not in the range `MIN_PRIORITY` to `MAX_PRIORITY`.

## Thread.getPriority()

```java
public final int getPriority()
```

Returns this thread's priority.

 The priority of a virtual thread is always `Thread.NORM_PRIORITY`.

**Returns:** this thread's priority.

**See also:** #setPriority

## Thread.setName(String)

```java
public final synchronized void setName(String name)
```

Changes the name of this thread to be equal to the argument `name`.

Parameters:

- `name`: the new name for this thread.

**Implementation note:** In the JDK Reference Implementation, if this thread is the
current thread, and it's a platform thread that was not attached to the
VM with the Java Native Interface

AttachCurrentThread function, then this method will set the operating
system thread name. This may be useful for debugging and troubleshooting
purposes.

**See also:** #getName

## Thread.getName()

```java
public final String getName()
```

Returns this thread's name.

**Returns:** this thread's name.

**See also:** #setName(String)

## Thread.getThreadGroup()

```java
public final ThreadGroup getThreadGroup()
```

Returns the thread's thread group or `null` if the thread has
terminated.

 The thread group returned for a virtual thread is the special
*ThreadGroup for
virtual threads*.

**Returns:** this thread's thread group or `null`

## Thread.activeCount()

```java
public static int activeCount()
```

Returns an estimate of the number of live
platform threads in the current thread's thread group and its subgroups.
Virtual threads are not included in the estimate.

 The value returned is only an estimate because the number of
threads may change dynamically while this method traverses internal
data structures, and might be affected by the presence of certain
system threads. This method is intended primarily for debugging
and monitoring purposes.

**Returns:** an estimate of the number of live platform threads in the
         current thread's thread group and in any other thread group
         that has the current thread's thread group as an ancestor
