# Thread class (java.lang)

```java
public class Thread implements Runnable
```

A <i>thread</i> is a thread of execution in a program. The Java
virtual machine allows an application to have multiple threads of
execution running concurrently.

<p> {@code Thread} defines constructors and a {@link Builder} to create threads.
{@linkplain #start() Starting} a thread schedules it to execute its {@link #run() run}
method. The newly started thread executes concurrently with the thread that caused
it to start.

<p> A thread <i>terminates</i> if either its {@code run} method completes normally,
or if its {@code run} method completes abruptly and the appropriate {@linkplain
Thread.UncaughtExceptionHandler uncaught exception handler} completes normally or
abruptly. With no code left to run, the thread has completed execution. The
{@link #join() join} method can be used to wait for a thread to terminate.

<p> Threads have a unique {@linkplain #threadId() identifier} and a {@linkplain
#getName() name}. The identifier is generated when a {@code Thread} is created
and cannot be changed. The thread name can be specified when creating a thread
or can be {@linkplain #setName(String) changed} at a later time.

<p> Threads support {@link ThreadLocal} variables. These are variables that are
local to a thread, meaning a thread can have a copy of a variable that is set to
a value that is independent of the value set by other threads. {@code Thread} also
supports {@link InheritableThreadLocal} variables that are thread local variables
that are inherited at thread creation time from the parent {@code Thread}.
{@code Thread} supports a special inheritable thread local for the thread
{@linkplain #getContextClassLoader() context-class-loader}.

<h2><a id="platform-threads">Platform threads</a></h2>
<p> {@code Thread} supports the creation of <i>platform threads</i> that are
typically mapped 1:1 to kernel threads scheduled by the operating system.
Platform threads will usually have a large stack and other resources that are
maintained by the operating system. Platforms threads are suitable for executing
all types of tasks but may be a limited resource.

<p> Platform threads get an automatically generated thread name by default.

<p> Platform threads are designated <i>daemon</i> or <i>non-daemon</i> threads.
When the Java virtual machine starts up, there is usually one non-daemon
thread (the thread that typically calls the application's {@code main} method).
The <a href="Runtime.html#shutdown">shutdown sequence</a> begins when all started
non-daemon threads have terminated. Unstarted non-daemon threads do not prevent
the shutdown sequence from beginning.

<p> In addition to the daemon status, platform threads have a {@linkplain
#getPriority() thread priority} and are members of a {@linkplain ThreadGroup
thread group}.

<h2><a id="virtual-threads">Virtual threads</a></h2>
<p> {@code Thread} also supports the creation of <i>virtual threads</i>.
Virtual threads are typically <i>user-mode threads</i> scheduled by the Java
runtime rather than the operating system. Virtual threads will typically require
few resources and a single Java virtual machine may support millions of virtual
threads. Virtual threads are suitable for executing tasks that spend most of
the time blocked, often waiting for I/O operations to complete. Virtual threads
are not intended for long running CPU intensive operations.

<p> Virtual threads typically employ a small set of platform threads used as
<em>carrier threads</em>. Locking and I/O operations are examples of operations
where a carrier thread may be re-scheduled from one virtual thread to another.
Code executing in a virtual thread is not aware of the underlying carrier thread.
The {@linkplain Thread#currentThread()} method, used to obtain a reference
to the <i>current thread</i>, will always return the {@code Thread} object
for the virtual thread.

<p> Virtual threads do not have a thread name by default. The {@link #getName()
getName} method returns the empty string if a thread name is not set.

<p> Virtual threads are daemon threads and so do not prevent the
<a href="Runtime.html#shutdown">shutdown sequence</a> from beginning.
Virtual threads have a fixed {@linkplain #getPriority() thread priority}
that cannot be changed.

<h2>Creating and starting threads</h2>

<p> {@code Thread} defines public constructors for creating platform threads and
the {@link #start() start} method to schedule threads to execute. {@code Thread}
may be extended for customization and other advanced reasons although most
applications should have little need to do this.

<p> {@code Thread} defines a {@link Builder} API for creating and starting both
platform and virtual threads. The following are examples that use the builder:
{@snippet :
  Runnable runnable = ...

  // Start a daemon thread to run a task
  Thread thread = Thread.ofPlatform().daemon().start(runnable);

  // Create an unstarted thread with name "duke", its start() method
  // must be invoked to schedule it to execute.
  Thread thread = Thread.ofPlatform().name("duke").unstarted(runnable);

  // A ThreadFactory that creates daemon threads named "worker-0", "worker-1", ...
  ThreadFactory factory = Thread.ofPlatform().daemon().name("worker-", 0).factory();

  // Start a virtual thread to run a task
  Thread thread = Thread.ofVirtual().start(runnable);

  // A ThreadFactory that creates virtual threads
  ThreadFactory factory = Thread.ofVirtual().factory();
}

<h2><a id="inheritance">Inheritance when creating threads</a></h2>
A {@code Thread} created with one of the public constructors inherits the daemon
status and thread priority from the parent thread at the time that the child {@code
Thread} is created. The {@linkplain ThreadGroup thread group} is also inherited when
not provided to the constructor. When using a {@code Thread.Builder} to create a
platform thread, the daemon status, thread priority, and thread group are inherited
when not set on the builder. As with the constructors, inheriting from the parent
thread is done when the child {@code Thread} is created.

<p> A {@code Thread} inherits its initial values of {@linkplain InheritableThreadLocal
inheritable-thread-local} variables (including the context class loader) from
the parent thread values at the time that the child {@code Thread} is created.
The 5-param {@linkplain Thread#Thread(ThreadGroup, Runnable, String, long, boolean)
constructor} can be used to create a thread that does not inherit its initial
values from the constructing thread. When using a {@code Thread.Builder}, the
{@link Builder#inheritInheritableThreadLocals(boolean) inheritInheritableThreadLocals}
method can be used to select if the initial values are inherited.

<p> Unless otherwise specified, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be thrown.

@implNote
In the JDK Reference Implementation, the virtual thread scheduler may be configured
with the following system properties:
<table class="striped">
<caption style="display:none">System properties</caption>
  <thead>
  <tr>
    <th scope="col">System property</th>
    <th scope="col">Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th scope="row">
      {@systemProperty jdk.virtualThreadScheduler.parallelism}
    </th>
    <td> The number of platform threads available for scheduling virtual
      threads. It defaults to the number of available processors. </td>
  </tr>
  <tr>
    <th scope="row">
      {@systemProperty jdk.virtualThreadScheduler.maxPoolSize}
    </th>
    <td> The maximum number of platform threads available to the scheduler.
      It defaults to 256. </td>
  </tr>
  </tbody>
</table>

@since   1.0

## Thread.MIN_PRIORITY

```java
public static final int MIN_PRIORITY
```

The minimum priority that a thread can have.

## Thread.NORM_PRIORITY

```java
public static final int NORM_PRIORITY
```

The default priority that is assigned to a thread.

## Thread.MAX_PRIORITY

```java
public static final int MAX_PRIORITY
```

The maximum priority that a thread can have.

## Thread.currentThread()

```java
public static native Thread currentThread()
```

Returns the Thread object for the current thread.
@return  the current thread

## Thread.yield()

```java
public static void yield()
```

A hint to the scheduler that the current thread is willing to yield
its current use of a processor. The scheduler is free to ignore this
hint.

<p> Yield is a heuristic attempt to improve relative progression
between threads that would otherwise over-utilise a CPU. Its use
should be combined with detailed profiling and benchmarking to
ensure that it actually has the desired effect.

<p> It is rarely appropriate to use this method. It may be useful
for debugging or testing purposes, where it may help to reproduce
bugs due to race conditions. It may also be useful when designing
concurrency control constructs such as the ones in the
{@link java.util.concurrent.locks} package.

## Thread.sleep(long)

```java
public static void sleep(long millis) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified number of milliseconds, subject to
the precision and accuracy of system timers and schedulers. The thread
does not lose ownership of any monitors.

@param  millis
        the length of time to sleep in milliseconds

@throws  IllegalArgumentException
         if the value of {@code millis} is negative

@throws  InterruptedException
         if any thread has interrupted the current thread. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

## Thread.sleep(long, int)

```java
public static void sleep(long millis, int nanos) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified number of milliseconds plus the specified
number of nanoseconds, subject to the precision and accuracy of system
timers and schedulers. The thread does not lose ownership of any
monitors.

@param  millis
        the length of time to sleep in milliseconds

@param  nanos
        {@code 0-999999} additional nanoseconds to sleep

@throws  IllegalArgumentException
         if the value of {@code millis} is negative, or the value of
         {@code nanos} is not in the range {@code 0-999999}

@throws  InterruptedException
         if any thread has interrupted the current thread. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

## Thread.sleep(Duration)

```java
public static void sleep(Duration duration) throws InterruptedException
```

Causes the currently executing thread to sleep (temporarily cease
execution) for the specified duration, subject to the precision and
accuracy of system timers and schedulers. This method is a no-op if
the duration is {@linkplain Duration#isNegative() negative}.

@param  duration
        the duration to sleep

@throws  InterruptedException
         if the current thread is interrupted while sleeping. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

@since 19

## Thread.onSpinWait()

```java
public static void onSpinWait()
```

Indicates that the caller is momentarily unable to progress, until the
occurrence of one or more actions on the part of other activities. By
invoking this method within each iteration of a spin-wait loop construct,
the calling thread indicates to the runtime that it is busy-waiting.
The runtime may take action to improve the performance of invoking
spin-wait loop constructions.

@apiNote
As an example consider a method in a class that spins in a loop until
some flag is set outside of that method. A call to the {@code onSpinWait}
method should be placed inside the spin loop.
{@snippet :
    class EventHandler {
        volatile boolean eventNotificationNotReceived;
        void waitForEventAndHandleIt() {
            while ( eventNotificationNotReceived ) {
                Thread.onSpinWait();
            }
            readAndProcessEvent();
        }

        void readAndProcessEvent() {
            // Read event from some source and process it
             . . .
        }
    }
}
<p>
The code above would remain correct even if the {@code onSpinWait}
method was not called at all. However on some architectures the Java
Virtual Machine may issue the processor instructions to address such
code patterns in a more beneficial way.

@since 9

## Thread.ofPlatform()

```java
public static Builder.OfPlatform ofPlatform()
```

Returns a builder for creating a platform {@code Thread} or {@code ThreadFactory}
that creates platform threads.

@apiNote The following are examples using the builder:
{@snippet :
  // Start a daemon thread to run a task
  Thread thread = Thread.ofPlatform().daemon().start(runnable);

  // Create an unstarted thread with name "duke", its start() method
  // must be invoked to schedule it to execute.
  Thread thread = Thread.ofPlatform().name("duke").unstarted(runnable);

  // A ThreadFactory that creates daemon threads named "worker-0", "worker-1", ...
  ThreadFactory factory = Thread.ofPlatform().daemon().name("worker-", 0).factory();
}

@return A builder for creating {@code Thread} or {@code ThreadFactory} objects.
@since 21

## Thread.ofVirtual()

```java
public static Builder.OfVirtual ofVirtual()
```

Returns a builder for creating a virtual {@code Thread} or {@code ThreadFactory}
that creates virtual threads.

@apiNote The following are examples using the builder:
{@snippet :
  // Start a virtual thread to run a task.
  Thread thread = Thread.ofVirtual().start(runnable);

  // A ThreadFactory that creates virtual threads
  ThreadFactory factory = Thread.ofVirtual().factory();
}

@return A builder for creating {@code Thread} or {@code ThreadFactory} objects.
@since 21

## Thread.clone()

```java
protected Object clone() throws CloneNotSupportedException
```

Throws CloneNotSupportedException as a Thread can not be meaningfully
cloned. Construct a new Thread instead.

@throws  CloneNotSupportedException
         always

## Thread.Thread()

```java
public Thread()
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (null, null, gname)}, where {@code gname} is a newly generated
name. Automatically generated names are of the form
{@code "Thread-"+}<i>n</i>, where <i>n</i> is an integer.

<p> This constructor is only useful when extending {@code Thread} to
override the {@link #run()} method.

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(Runnable)

```java
public Thread(Runnable task)
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (null, task, gname)}, where {@code gname} is a newly generated
name. Automatically generated names are of the form
{@code "Thread-"+}<i>n</i>, where <i>n</i> is an integer.

<p> For a non-null task, invoking this constructor directly is equivalent to:
<pre>{@code Thread.ofPlatform().unstarted(task); }</pre>

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this classes {@code run} method does
        nothing.

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(ThreadGroup, Runnable)

```java
public Thread(ThreadGroup group, Runnable task)
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (group, task, gname)}, where {@code gname} is a newly generated
name. Automatically generated names are of the form
{@code "Thread-"+}<i>n</i>, where <i>n</i> is an integer.

<p> For a non-null group and task, invoking this constructor directly is
equivalent to:
<pre>{@code Thread.ofPlatform().group(group).unstarted(task); }</pre>

@param  group
        the thread group. If {@code null} the group
        is set to the current thread's thread group.

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this thread's run method is invoked.

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(String)

```java
public Thread(String name)
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (null, null, name)}.

<p> This constructor is only useful when extending {@code Thread} to
override the {@link #run()} method.

@param   name
         the name of the new thread

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(ThreadGroup, String)

```java
public Thread(ThreadGroup group, String name)
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (group, null, name)}.

<p> This constructor is only useful when extending {@code Thread} to
override the {@link #run()} method.

@param  group
        the thread group. If {@code null}, the group
        is set to the current thread's thread group.

@param  name
        the name of the new thread

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(Runnable, String)

```java
public Thread(Runnable task, String name)
```

Initializes a new platform {@code Thread}. This constructor has the same
effect as {@linkplain #Thread(ThreadGroup,Runnable,String) Thread}
{@code (null, task, name)}.

<p> For a non-null task and name, invoking this constructor directly is
equivalent to:
<pre>{@code Thread.ofPlatform().name(name).unstarted(task); }</pre>

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this thread's run method is invoked.

@param  name
        the name of the new thread

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(ThreadGroup, Runnable, String)

```java
public Thread(ThreadGroup group, Runnable task, String name)
```

Initializes a new platform {@code Thread} so that it has {@code task}
as its run object, has the specified {@code name} as its name,
and belongs to the thread group referred to by {@code group}.

<p>The priority of the newly created thread is the smaller of
priority of the thread creating it and the maximum permitted
priority of the thread group. The method {@linkplain #setPriority
setPriority} may be used to change the priority to a new value.

<p>The newly created thread is initially marked as being a daemon
thread if and only if the thread creating it is currently marked
as a daemon thread. The method {@linkplain #setDaemon setDaemon}
may be used to change whether or not a thread is a daemon.

<p>For a non-null group, task, and name, invoking this constructor directly
is equivalent to:
<pre>{@code Thread.ofPlatform().group(group).name(name).unstarted(task); }</pre>

@param  group
        the thread group. If {@code null}, the group
        is set to the current thread's thread group.

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this thread's run method is invoked.

@param  name
        the name of the new thread

@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(ThreadGroup, Runnable, String, long)

```java
public Thread(ThreadGroup group, Runnable task, String name, long stackSize)
```

Initializes a new platform {@code Thread} so that it has {@code task}
as its run object, has the specified {@code name} as its name,
and belongs to the thread group referred to by {@code group}, and has
the specified <i>stack size</i>.

<p>This constructor is identical to {@link
#Thread(ThreadGroup,Runnable,String)} with the exception of the fact
that it allows the thread stack size to be specified.  The stack size
is the approximate number of bytes of address space that the virtual
machine is to allocate for this thread's stack.  <b>The effect of the
{@code stackSize} parameter, if any, is highly platform dependent.</b>

<p>On some platforms, specifying a higher value for the
{@code stackSize} parameter may allow a thread to achieve greater
recursion depth before throwing a {@link StackOverflowError}.
Similarly, specifying a lower value may allow a greater number of
threads to exist concurrently without throwing an {@link
OutOfMemoryError} (or other internal error).  The details of
the relationship between the value of the {@code stackSize} parameter
and the maximum recursion depth and concurrency level are
platform-dependent.  <b>On some platforms, the value of the
{@code stackSize} parameter may have no effect whatsoever.</b>

<p>The virtual machine is free to treat the {@code stackSize}
parameter as a suggestion.  If the specified value is unreasonably low
for the platform, the virtual machine may instead use some
platform-specific minimum value; if the specified value is unreasonably
high, the virtual machine may instead use some platform-specific
maximum.  Likewise, the virtual machine is free to round the specified
value up or down as it sees fit (or to ignore it completely).

<p>Specifying a value of zero for the {@code stackSize} parameter will
cause this constructor to behave exactly like the
{@code Thread(ThreadGroup, Runnable, String)} constructor.

<p><i>Due to the platform-dependent nature of the behavior of this
constructor, extreme care should be exercised in its use.
The thread stack size necessary to perform a given computation will
likely vary from one JRE implementation to another.  In light of this
variation, careful tuning of the stack size parameter may be required,
and the tuning may need to be repeated for each JRE implementation on
which an application is to run.</i>

<p>Implementation note: Java platform implementers are encouraged to
document their implementation's behavior with respect to the
{@code stackSize} parameter.

<p>For a non-null group, task, and name, invoking this constructor directly
is equivalent to:
<pre>{@code Thread.ofPlatform().group(group).name(name).stackSize(stackSize).unstarted(task); }</pre>

@param  group
        the thread group. If {@code null}, the group
        is set to the current thread's thread group.

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this thread's run method is invoked.

@param  name
        the name of the new thread

@param  stackSize
        the desired stack size for the new thread, or zero to indicate
        that this parameter is to be ignored.

@since 1.4
@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.Thread(ThreadGroup, Runnable, String, long, boolean)

```java
public Thread(ThreadGroup group, Runnable task, String name, long stackSize, boolean inheritInheritableThreadLocals)
```

Initializes a new platform {@code Thread} so that it has {@code task}
as its run object, has the specified {@code name} as its name,
belongs to the thread group referred to by {@code group}, has
the specified {@code stackSize}, and inherits initial values for
{@linkplain InheritableThreadLocal inheritable thread-local} variables
if {@code inheritThreadLocals} is {@code true}.

<p> This constructor is identical to {@link
#Thread(ThreadGroup,Runnable,String,long)} with the added ability to
suppress, or not, the inheriting of initial values for inheritable
thread-local variables from the constructing thread. This allows for
finer grain control over inheritable thread-locals. Care must be taken
when passing a value of {@code false} for {@code inheritThreadLocals},
as it may lead to unexpected behavior if the new thread executes code
that expects a specific thread-local value to be inherited.

<p> Specifying a value of {@code true} for the {@code inheritThreadLocals}
parameter will cause this constructor to behave exactly like the
{@code Thread(ThreadGroup, Runnable, String, long)} constructor.

<p> For a non-null group, task, and name, invoking this constructor directly
is equivalent to:
<pre>{@code Thread.ofPlatform()
     .group(group)
     .name(name)
     .stackSize(stackSize)
     .inheritInheritableThreadLocals(inheritInheritableThreadLocals)
     .unstarted(task); }</pre>

@param  group
        the thread group. If {@code null}, the group
        is set to the current thread's thread group.

@param  task
        the object whose {@code run} method is invoked when this thread
        is started. If {@code null}, this thread's run method is invoked.

@param  name
        the name of the new thread

@param  stackSize
        the desired stack size for the new thread, or zero to indicate
        that this parameter is to be ignored

@param  inheritInheritableThreadLocals
        if {@code true}, inherit initial values for inheritable
        thread-locals from the constructing thread, otherwise no initial
        values are inherited

@since 9
@see <a href="#inheritance">Inheritance when creating threads</a>

## Thread.startVirtualThread(Runnable)

```java
public static Thread startVirtualThread(Runnable task)
```

Creates a virtual thread to execute a task and schedules it to execute.

<p> This method is equivalent to:
<pre>{@code Thread.ofVirtual().start(task); }</pre>

@param task the object to run when the thread executes
@return a new, and started, virtual thread
@see <a href="#inheritance">Inheritance when creating threads</a>
@since 21

## Thread.isVirtual()

```java
public final boolean isVirtual()
```

Returns {@code true} if this thread is a virtual thread. A virtual thread
is scheduled by the Java virtual machine rather than the operating system.

@return {@code true} if this thread is a virtual thread

@since 21

## Thread.start()

```java
public void start()
```

Schedules this thread to begin execution. The thread will execute
independently of the current thread.

<p> A thread can be started at most once. In particular, a thread can not
be restarted after it has terminated.

@throws IllegalThreadStateException if the thread was already started

## Thread.run()

```java
public void run()
```

This method is run by the thread when it executes. Subclasses of {@code
Thread} may override this method.

<p> This method is not intended to be invoked directly. If this thread is a
platform thread created with a {@link Runnable} task then invoking this method
will invoke the task's {@code run} method. If this thread is a virtual thread
then invoking this method directly does nothing.

@implSpec The default implementation executes the {@link Runnable} task that
the {@code Thread} was created with. If the thread was created without a task
then this method does nothing.

## Thread.stop()

```java
public final void stop()
```

Throws {@code UnsupportedOperationException}.

@throws  UnsupportedOperationException always

@deprecated This method was originally specified to "stop" a victim
      thread by causing the victim thread to throw a {@link ThreadDeath}.
      It was inherently unsafe. Stopping a thread caused it to unlock
      all of the monitors that it had locked (as a natural consequence
      of the {@code ThreadDeath} exception propagating up the stack). If
      any of the objects previously protected by these monitors were in
      an inconsistent state, the damaged objects became visible to
      other threads, potentially resulting in arbitrary behavior.
      Usages of {@code stop} should be replaced by code that simply
      modifies some variable to indicate that the target thread should
      stop running.  The target thread should check this variable
      regularly, and return from its run method in an orderly fashion
      if the variable indicates that it is to stop running.  If the
      target thread waits for long periods (on a condition variable,
      for example), the {@code interrupt} method should be used to
      interrupt the wait.
      For more information, see
      <a href="{@docRoot}/java.base/java/lang/doc-files/threadPrimitiveDeprecation.html">Why
      is Thread.stop deprecated and the ability to stop a thread removed?</a>.

## Thread.interrupt()

```java
public void interrupt()
```

Interrupts this thread.

<p> If this thread is blocked in an invocation of the {@link
Object#wait() wait()}, {@link Object#wait(long) wait(long)}, or {@link
Object#wait(long, int) wait(long, int)} methods of the {@link Object}
class, or of the {@link #join()}, {@link #join(long)}, {@link
#join(long, int)}, {@link #sleep(long)}, or {@link #sleep(long, int)}
methods of this class, then its interrupt status will be cleared and it
will receive an {@link InterruptedException}.

<p> If this thread is blocked in an I/O operation upon an {@link
java.nio.channels.InterruptibleChannel InterruptibleChannel}
then the channel will be closed, the thread's interrupt
status will be set, and the thread will receive a {@link
java.nio.channels.ClosedByInterruptException}.

<p> If this thread is blocked in a {@link java.nio.channels.Selector}
then the thread's interrupt status will be set and it will return
immediately from the selection operation, possibly with a non-zero
value, just as if the selector's {@link
java.nio.channels.Selector#wakeup wakeup} method were invoked.

<p> If none of the previous conditions hold then this thread's interrupt
status will be set. </p>

<p> Interrupting a thread that is not alive need not have any effect.

@implNote In the JDK Reference Implementation, interruption of a thread
that is not alive still records that the interrupt request was made and
will report it via {@link #interrupted()} and {@link #isInterrupted()}.

## Thread.interrupted()

```java
public static boolean interrupted()
```

Tests whether the current thread has been interrupted.  The
<i>interrupted status</i> of the thread is cleared by this method.  In
other words, if this method were to be called twice in succession, the
second call would return false (unless the current thread were
interrupted again, after the first call had cleared its interrupted
status and before the second call had examined it).

@return  {@code true} if the current thread has been interrupted;
         {@code false} otherwise.
@see #isInterrupted()

## Thread.isInterrupted()

```java
public boolean isInterrupted()
```

Tests whether this thread has been interrupted.  The <i>interrupted
status</i> of the thread is unaffected by this method.

@return  {@code true} if this thread has been interrupted;
         {@code false} otherwise.
@see     #interrupted()

## Thread.isAlive()

```java
public final boolean isAlive()
```

Tests if this thread is alive. A thread is alive if it has
been started and has not yet terminated.

@return  {@code true} if this thread is alive;
         {@code false} otherwise.

## Thread.setPriority(int)

```java
public final void setPriority(int newPriority)
```

Changes the priority of this thread.

For platform threads, the priority is set to the smaller of the specified
{@code newPriority} and the maximum permitted priority of the thread's
{@linkplain ThreadGroup thread group}.

The priority of a virtual thread is always {@link Thread#NORM_PRIORITY}
and {@code newPriority} is ignored.

@param newPriority the new thread priority
@throws  IllegalArgumentException if the priority is not in the
         range {@code MIN_PRIORITY} to {@code MAX_PRIORITY}.
@see #setPriority(int)
@see ThreadGroup#getMaxPriority()

## Thread.getPriority()

```java
public final int getPriority()
```

Returns this thread's priority.

<p> The priority of a virtual thread is always {@link Thread#NORM_PRIORITY}.

@return  this thread's priority.
@see     #setPriority

## Thread.setName(String)

```java
public final synchronized void setName(String name)
```

Changes the name of this thread to be equal to the argument {@code name}.

@implNote In the JDK Reference Implementation, if this thread is the
current thread, and it's a platform thread that was not attached to the
VM with the Java Native Interface
<a href="{@docRoot}/../specs/jni/invocation.html#attachcurrentthread">
AttachCurrentThread</a> function, then this method will set the operating
system thread name. This may be useful for debugging and troubleshooting
purposes.

@param      name   the new name for this thread.

@spec jni/index.html Java Native Interface Specification
@see        #getName

## Thread.getName()

```java
public final String getName()
```

Returns this thread's name.

@return  this thread's name.
@see     #setName(String)

## Thread.getThreadGroup()

```java
public final ThreadGroup getThreadGroup()
```

Returns the thread's thread group or {@code null} if the thread has
terminated.

<p> The thread group returned for a virtual thread is the special
<a href="ThreadGroup.html#virtualthreadgroup"><em>ThreadGroup for
virtual threads</em></a>.

@return  this thread's thread group or {@code null}

## Thread.activeCount()

```java
public static int activeCount()
```

Returns an estimate of the number of {@linkplain #isAlive() live}
platform threads in the current thread's thread group and its subgroups.
Virtual threads are not included in the estimate.

<p> The value returned is only an estimate because the number of
threads may change dynamically while this method traverses internal
data structures, and might be affected by the presence of certain
system threads. This method is intended primarily for debugging
and monitoring purposes.

@return  an estimate of the number of live platform threads in the
         current thread's thread group and in any other thread group
         that has the current thread's thread group as an ancestor

## Thread.enumerate(Thread[])

```java
public static int enumerate(Thread[] tarray)
```

Copies into the specified array every {@linkplain #isAlive() live}
platform thread in the current thread's thread group and its subgroups.
This method simply invokes the {@link java.lang.ThreadGroup#enumerate(Thread[])}
method of the current thread's thread group. Virtual threads are
not enumerated by this method.

<p> An application might use the {@linkplain #activeCount activeCount}
method to get an estimate of how big the array should be, however
<i>if the array is too short to hold all the threads, the extra threads
are silently ignored.</i>  If it is critical to obtain every live
thread in the current thread's thread group and its subgroups, the
invoker should verify that the returned int value is strictly less
than the length of {@code tarray}.

<p> Due to the inherent race condition in this method, it is recommended
that the method only be used for debugging and monitoring purposes.

@param  tarray
        an array into which to put the list of threads

@return  the number of threads put into the array

## Thread.join(long)

```java
public final void join(long millis) throws InterruptedException
```

Waits at most {@code millis} milliseconds for this thread to terminate.
A timeout of {@code 0} means to wait forever.
This method returns immediately, without waiting, if the thread has not
been {@link #start() started}.

@implNote
For platform threads, the implementation uses a loop of {@code this.wait}
calls conditioned on {@code this.isAlive}. As a thread terminates the
{@code this.notifyAll} method is invoked. It is recommended that
applications not use {@code wait}, {@code notify}, or
{@code notifyAll} on {@code Thread} instances.

@param  millis
        the time to wait in milliseconds

@throws  IllegalArgumentException
         if the value of {@code millis} is negative

@throws  InterruptedException
         if any thread has interrupted the current thread. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

## Thread.join(long, int)

```java
public final void join(long millis, int nanos) throws InterruptedException
```

Waits at most {@code millis} milliseconds plus
{@code nanos} nanoseconds for this thread to terminate.
If both arguments are {@code 0}, it means to wait forever.
This method returns immediately, without waiting, if the thread has not
been {@link #start() started}.

@implNote
For platform threads, the implementation uses a loop of {@code this.wait}
calls conditioned on {@code this.isAlive}. As a thread terminates the
{@code this.notifyAll} method is invoked. It is recommended that
applications not use {@code wait}, {@code notify}, or
{@code notifyAll} on {@code Thread} instances.

@param  millis
        the time to wait in milliseconds

@param  nanos
        {@code 0-999999} additional nanoseconds to wait

@throws  IllegalArgumentException
         if the value of {@code millis} is negative, or the value
         of {@code nanos} is not in the range {@code 0-999999}

@throws  InterruptedException
         if any thread has interrupted the current thread. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

## Thread.join()

```java
public final void join() throws InterruptedException
```

Waits for this thread to terminate.

<p> An invocation of this method behaves in exactly the same
way as the invocation

<blockquote>
{@linkplain #join(long) join}{@code (0)}
</blockquote>

@throws  InterruptedException
         if any thread has interrupted the current thread. The
         <i>interrupted status</i> of the current thread is
         cleared when this exception is thrown.

## Thread.join(Duration)

```java
public final boolean join(Duration duration) throws InterruptedException
```

Waits for this thread to terminate for up to the given waiting duration.

<p> This method does not wait if the duration to wait is less than or
equal to zero. In this case, the method just tests if the thread has
terminated.

@param   duration
         the maximum duration to wait

@return  {@code true} if the thread has terminated, {@code false} if the
         thread has not terminated

@throws  InterruptedException
         if the current thread is interrupted while waiting.
         The <i>interrupted status</i> of the current thread is cleared
         when this exception is thrown.

@throws  IllegalThreadStateException
         if this thread has not been started.

@since 19

## Thread.dumpStack()

```java
public static void dumpStack()
```

Prints a stack trace of the current thread to the standard error stream.
This method is useful for debugging.

## Thread.setDaemon(boolean)

```java
public final void setDaemon(boolean on)
```

Marks this thread as either a <i>daemon</i> or <i>non-daemon</i> thread.
The <a href="Runtime.html#shutdown">shutdown sequence</a> begins when all
started non-daemon threads have terminated.

<p> The daemon status of a virtual thread is always {@code true} and cannot be
changed by this method to {@code false}.

<p> This method must be invoked before the thread is started. The behavior
of this method when the thread has terminated is not specified.

@param  on
        if {@code true}, marks this thread as a daemon thread

@throws  IllegalArgumentException
         if this is a virtual thread and {@code on} is false
@throws  IllegalThreadStateException
         if this thread is {@linkplain #isAlive alive}

## Thread.isDaemon()

```java
public final boolean isDaemon()
```

Tests if this thread is a daemon thread.
The daemon status of a virtual thread is always {@code true}.

@return  {@code true} if this thread is a daemon thread;
         {@code false} otherwise.
@see     #setDaemon(boolean)

## Thread.checkAccess()

```java
public final void checkAccess()
```

Does nothing.

@deprecated This method originally determined if the currently running
thread had permission to modify this thread. This method was only useful
in conjunction with {@linkplain SecurityManager the Security Manager},
which is no longer supported. There is no replacement for the Security
Manager or this method.

## Thread.toString()

```java
public String toString()
```

Returns a string representation of this thread. The string representation
will usually include the thread's {@linkplain #threadId() identifier} and
name. The default implementation for platform threads includes the thread's
identifier, name, priority, and the name of the thread group.

@return  a string representation of this thread.

## Thread.getContextClassLoader()

```java
public ClassLoader getContextClassLoader()
```

Returns the context {@code ClassLoader} for this thread.
The context {@code ClassLoader} may be set by the creator of the thread
for use by code running in this thread when loading classes and resources.
If not {@linkplain #setContextClassLoader set}, the default is to inherit
the context class loader from the parent thread.

<p> The context {@code ClassLoader} of the primordial thread is typically
set to the class loader used to load the application.

@return  the context {@code ClassLoader} for this thread, or {@code null}
         indicating the system class loader (or, failing that, the
         bootstrap class loader)

@since 1.2

## Thread.setContextClassLoader(ClassLoader)

```java
public void setContextClassLoader(ClassLoader cl)
```

Sets the context {@code ClassLoader} for this thread.

<p> The context {@code ClassLoader} may be set by the creator of the thread
for use by code running in this thread when loading classes and resources.

@param  cl
        the context ClassLoader for this Thread, or null  indicating the
        system class loader (or, failing that, the bootstrap class loader)

@since 1.2

## Thread.holdsLock(Object)

```java
public static native boolean holdsLock(Object obj)
```

Returns {@code true} if and only if the current thread holds the
monitor lock on the specified object.

<p>This method is designed to allow a program to assert that
the current thread already holds a specified lock:
<pre>
    assert Thread.holdsLock(obj);
</pre>

@param  obj the object on which to test lock ownership
@return {@code true} if the current thread holds the monitor lock on
        the specified object.
@since 1.4

## Thread.getStackTrace()

```java
public StackTraceElement[] getStackTrace()
```

Returns an array of stack trace elements representing the stack dump
of this thread.  This method will return a zero-length array if
this thread has not started, has started but has not yet been
scheduled to run by the system, or has terminated.
If the returned array is of non-zero length then the first element of
the array represents the top of the stack, which is the most recent
method invocation in the sequence.  The last element of the array
represents the bottom of the stack, which is the least recent method
invocation in the sequence.

<p>Some virtual machines may, under some circumstances, omit one
or more stack frames from the stack trace.  In the extreme case,
a virtual machine that has no stack trace information concerning
this thread is permitted to return a zero-length array from this
method.

@return an array of {@code StackTraceElement},
each represents one stack frame.

@see Throwable#getStackTrace
@since 1.5

## Thread.getAllStackTraces()

```java
public static Map<Thread, StackTraceElement[]> getAllStackTraces()
```

Returns a map of stack traces for all live platform threads. The map
does not include virtual threads.
The map keys are threads and each map value is an array of
{@code StackTraceElement} that represents the stack dump
of the corresponding {@code Thread}.
The returned stack traces are in the format specified for
the {@link #getStackTrace getStackTrace} method.

<p>The threads may be executing while this method is called.
The stack trace of each thread only represents a snapshot and
each stack trace may be obtained at different time.  A zero-length
array will be returned in the map value if the virtual machine has
no stack trace information about a thread.

@return a {@code Map} from {@code Thread} to an array of
{@code StackTraceElement} that represents the stack trace of
the corresponding thread.

@see #getStackTrace
@see Throwable#getStackTrace

@since 1.5

## Thread.getId()

```java
public long getId()
```

Returns the identifier of this Thread.  The thread ID is a positive
{@code long} number generated when this thread was created.
The thread ID is unique and remains unchanged during its lifetime.

@return this thread's ID

@deprecated This method is not final and may be overridden to return a
value that is not the thread ID. Use {@link #threadId()} instead.

@since 1.5

## Thread.threadId()

```java
public final long threadId()
```

Returns the identifier of this Thread.  The thread ID is a positive
{@code long} number generated when this thread was created.
The thread ID is unique and remains unchanged during its lifetime.

@return this thread's ID
@since 19

## Thread.getState()

```java
public State getState()
```

Returns the state of this thread.
This method is designed for use in monitoring of the system state,
not for synchronization control.

@return this thread's state.
@since 1.5

## Thread.setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler)

```java
public static void setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler ueh)
```

Set the default handler invoked when a thread abruptly terminates
due to an uncaught exception, and no other handler has been defined
for that thread.

<p>Uncaught exception handling is controlled first by the thread, then
by the thread's {@link ThreadGroup} object and finally by the default
uncaught exception handler. If the thread does not have an explicit
uncaught exception handler set, and the thread's thread group
(including parent thread groups)  does not specialize its
{@code uncaughtException} method, then the default handler's
{@code uncaughtException} method will be invoked.
<p>By setting the default uncaught exception handler, an application
can change the way in which uncaught exceptions are handled (such as
logging to a specific device, or file) for those threads that would
already accept whatever &quot;default&quot; behavior the system
provided.

<p>Note that the default uncaught exception handler should not usually
defer to the thread's {@code ThreadGroup} object, as that could cause
infinite recursion.

@param ueh the object to use as the default uncaught exception handler.
If {@code null} then there is no default handler.

@see #setUncaughtExceptionHandler
@see #getUncaughtExceptionHandler
@see ThreadGroup#uncaughtException
@since 1.5

## Thread.getDefaultUncaughtExceptionHandler()

```java
public static UncaughtExceptionHandler getDefaultUncaughtExceptionHandler()
```

Returns the default handler invoked when a thread abruptly terminates
due to an uncaught exception. If the returned value is {@code null},
there is no default.
@since 1.5
@see #setDefaultUncaughtExceptionHandler
@return the default uncaught exception handler for all threads

## Thread.getUncaughtExceptionHandler()

```java
public UncaughtExceptionHandler getUncaughtExceptionHandler()
```

Returns the handler invoked when this thread abruptly terminates
due to an uncaught exception. If this thread has not had an
uncaught exception handler explicitly set then this thread's
{@code ThreadGroup} object is returned, unless this thread
has terminated, in which case {@code null} is returned.
@since 1.5
@return the uncaught exception handler for this thread

## Thread.setUncaughtExceptionHandler(UncaughtExceptionHandler)

```java
public void setUncaughtExceptionHandler(UncaughtExceptionHandler ueh)
```

Set the handler invoked when this thread abruptly terminates
due to an uncaught exception.
<p>A thread can take full control of how it responds to uncaught
exceptions by having its uncaught exception handler explicitly set.
If no such handler is set then the thread's {@code ThreadGroup}
object acts as its handler.
@param ueh the object to use as this thread's uncaught exception
handler. If {@code null} then this thread has no explicit handler.
@see #setDefaultUncaughtExceptionHandler
@see ThreadGroup#uncaughtException
@since 1.5