# ThreadGroup class (java.lang)

```java
public class ThreadGroup implements Thread.UncaughtExceptionHandler
```

A thread group represents a set of threads. In addition, a thread group can
also include other thread groups. The thread groups form a tree in which
every thread group except the initial thread group has a parent.

<p> A thread group has a name and maximum priority. The name is specified
when creating the group and cannot be changed. The group's maximum priority
is the maximum priority for threads created in the group. It is initially
inherited from the parent thread group but may be changed using the {@link
#setMaxPriority(int) setMaxPriority} method.

<p> A thread group is weakly <a href="ref/package-summary.html#reachability">
<em>reachable</em></a> from its parent group so that it is eligible for garbage
collection when there are no {@linkplain Thread#isAlive() live} threads in the
group and the thread group is otherwise <i>unreachable</i>.

<p> Unless otherwise specified, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be thrown.

<h2><a id="virtualthreadgroup">Thread groups and virtual threads</a></h2>
The Java runtime creates a special thread group for
<a href="Thread.html#virtual-threads">virtual threads</a>. This group is
returned by the {@link Thread#getThreadGroup() Thread.getThreadGroup} method
when invoked on a virtual thread. The thread group differs to other thread
groups in that its maximum priority is fixed and cannot be changed with the
{@link #setMaxPriority(int) setMaxPriority} method.
Virtual threads are not included in the estimated thread count returned by the
{@link #activeCount() activeCount} method, are not enumerated by the {@link
#enumerate(Thread[]) enumerate} method, and are not interrupted by the {@link
#interrupt() interrupt} method.

@apiNote
Thread groups provided a way in early Java releases to group threads and provide
a form of <i>job control</i> for threads. Thread groups supported the isolation
of applets and defined methods intended for diagnostic purposes. It should be
rare for new applications to create ThreadGroups and interact with this API.

@since   1.0

## ThreadGroup.ThreadGroup(String)

```java
public ThreadGroup(String name)
```

Constructs a new thread group. The parent of this new group is
the thread group of the currently running thread.

@param   name   the name of the new thread group, can be {@code null}

## ThreadGroup.ThreadGroup(ThreadGroup, String)

```java
public ThreadGroup(ThreadGroup parent, String name)
```

Creates a new thread group. The parent of this new group is the
specified thread group.

@param     parent   the parent thread group.
@param     name     the name of the new thread group, can be {@code null}

## ThreadGroup.getName()

```java
public final String getName()
```

Returns the name of this thread group.

@return  the name of this thread group, may be {@code null}

## ThreadGroup.getParent()

```java
public final ThreadGroup getParent()
```

Returns the parent of this thread group.

@return  the parent of this thread group. The top-level thread group
         is the only thread group whose parent is {@code null}.

## ThreadGroup.getMaxPriority()

```java
public final int getMaxPriority()
```

Returns the maximum priority of this thread group. This is the maximum
priority for new threads created in the thread group.

@return  the maximum priority for new threads created in the thread group
@see     #setMaxPriority

## ThreadGroup.isDaemon()

```java
public final boolean isDaemon()
```

{@return the daemon status of this thread group}
The daemon status is not used for anything.

@deprecated This method originally indicated if the thread group is a
            <i>daemon thread group</i> that is automatically destroyed
            when its last thread terminates. The concept of daemon
            thread group no longer exists.
            A thread group is eligible to be GC'ed when there are no
            live threads in the group and it is otherwise unreachable.

## ThreadGroup.isDestroyed()

```java
public boolean isDestroyed()
```

Returns false.

@return false

@deprecated This method originally indicated if the thread group is
            destroyed. The ability to destroy a thread group and the
            concept of a destroyed thread group no longer exists.
            A thread group is eligible to be GC'ed when there are no
            live threads in the group and it is otherwise unreachable.

@since   1.1

## ThreadGroup.setDaemon(boolean)

```java
public final void setDaemon(boolean daemon)
```

Sets the daemon status of this thread group.
The daemon status is not used for anything.

@param      daemon the daemon status

@deprecated This method originally configured whether the thread group is
            a <i>daemon thread group</i> that is automatically destroyed
            when its last thread terminates. The concept of daemon thread
            group no longer exists. A thread group is eligible to be GC'ed
            when there are no live threads in the group and it is otherwise
            unreachable.

## ThreadGroup.setMaxPriority(int)

```java
public final void setMaxPriority(int pri)
```

Sets the maximum priority of the group. The maximum priority of the
<a href="ThreadGroup.html#virtualthreadgroup"><em>ThreadGroup for virtual
threads</em></a> is not changed by this method (the new priority is ignored).
Threads in the thread group (or subgroups) that already have a higher
priority are not affected by this method.
<p>
If the {@code pri} argument is less than
{@link Thread#MIN_PRIORITY} or greater than
{@link Thread#MAX_PRIORITY}, the maximum priority of the group
remains unchanged.
<p>
Otherwise, the priority of this ThreadGroup object is set to the
smaller of the specified {@code pri} and the maximum permitted
priority of the parent of this thread group. (If this thread group
is the system thread group, which has no parent, then its maximum
priority is simply set to {@code pri}.) Then this method is
called recursively, with {@code pri} as its argument, for
every thread group that belongs to this thread group.

@param      pri   the new priority of the thread group.
@see        #getMaxPriority

## ThreadGroup.parentOf(ThreadGroup)

```java
public final boolean parentOf(ThreadGroup g)
```

Tests if this thread group is either the thread group
argument or one of its ancestor thread groups.

@param   g   a thread group, can be {@code null}
@return  {@code true} if this thread group is the thread group
         argument or one of its ancestor thread groups;
         {@code false} otherwise.

## ThreadGroup.checkAccess()

```java
public final void checkAccess()
```

Does nothing.

@deprecated This method originally determined if the currently running
thread had permission to modify this thread group. This method was only
useful in conjunction with {@linkplain SecurityManager the Security Manager},
which is no longer supported. There is no replacement for the Security
Manager or this method.

## ThreadGroup.activeCount()

```java
public int activeCount()
```

Returns an estimate of the number of {@linkplain Thread#isAlive() live}
platform threads in this thread group and its subgroups. Virtual threads
are not included in the estimate. This method recursively iterates over
all subgroups in this thread group.

<p> The value returned is only an estimate because the number of
threads may change dynamically while this method traverses internal
data structures, and might be affected by the presence of certain
system threads. This method is intended primarily for debugging
and monitoring purposes.

@return  an estimate of the number of live threads in this thread
         group and in any other thread group that has this thread
         group as an ancestor

## ThreadGroup.enumerate(Thread[])

```java
public int enumerate(Thread[] list)
```

Copies into the specified array every {@linkplain Thread#isAlive() live}
platform thread in this thread group and its subgroups. Virtual threads
are not enumerated by this method.

<p> An invocation of this method behaves in exactly the same
way as the invocation

<blockquote>
{@linkplain #enumerate(Thread[], boolean) enumerate}{@code (list, true)}
</blockquote>

@param  list
        an array into which to put the list of threads

@return  the number of threads put into the array

## ThreadGroup.enumerate(Thread[], boolean)

```java
public int enumerate(Thread[] list, boolean recurse)
```

Copies into the specified array every {@linkplain Thread#isAlive() live}
platform thread in this thread group. Virtual threads are not enumerated
by this method. If {@code recurse} is {@code true}, this method recursively
enumerates all subgroups of this thread group and references to every live
platform thread in these subgroups are also included. If the array is too
short to hold all the threads, the extra threads are silently ignored.

<p> An application might use the {@linkplain #activeCount activeCount}
method to get an estimate of how big the array should be, however
<i>if the array is too short to hold all the threads, the extra threads
are silently ignored.</i>  If it is critical to obtain every live
thread in this thread group, the caller should verify that the returned
int value is strictly less than the length of {@code list}.

<p> Due to the inherent race condition in this method, it is recommended
that the method only be used for debugging and monitoring purposes.

@param  list
        an array into which to put the list of threads

@param  recurse
        if {@code true}, recursively enumerate all subgroups of this
        thread group

@return  the number of threads put into the array

## ThreadGroup.activeGroupCount()

```java
public int activeGroupCount()
```

Returns an estimate of the number of groups in this thread group and its
subgroups. Recursively iterates over all subgroups in this thread group.

<p> The value returned is only an estimate because the number of
thread groups may change dynamically while this method traverses
internal data structures. This method is intended primarily for
debugging and monitoring purposes.

@return  the number of thread groups with this thread group as
         an ancestor

## ThreadGroup.enumerate(ThreadGroup[])

```java
public int enumerate(ThreadGroup[] list)
```

Copies into the specified array references to every subgroup in this
thread group and its subgroups.

<p> An invocation of this method behaves in exactly the same
way as the invocation

<blockquote>
{@linkplain #enumerate(ThreadGroup[], boolean) enumerate}{@code (list, true)}
</blockquote>

@param  list
        an array into which to put the list of thread groups

@return  the number of thread groups put into the array

## ThreadGroup.enumerate(ThreadGroup[], boolean)

```java
public int enumerate(ThreadGroup[] list, boolean recurse)
```

Copies into the specified array references to every subgroup in this
thread group. If {@code recurse} is {@code true}, this method recursively
enumerates all subgroups of this thread group and references to every
thread group in these subgroups are also included.

<p> An application might use the
{@linkplain #activeGroupCount activeGroupCount} method to
get an estimate of how big the array should be, however <i>if the
array is too short to hold all the thread groups, the extra thread
groups are silently ignored.</i>  If it is critical to obtain every
subgroup in this thread group, the caller should verify that
the returned int value is strictly less than the length of
{@code list}.

<p> Due to the inherent race condition in this method, it is recommended
that the method only be used for debugging and monitoring purposes.

@param  list
        an array into which to put the list of thread groups

@param  recurse
        if {@code true}, recursively enumerate all subgroups

@return  the number of thread groups put into the array

## ThreadGroup.interrupt()

```java
public final void interrupt()
```

Interrupts all {@linkplain Thread#isAlive() live} platform threads in
this thread group and its subgroups.

@see        java.lang.Thread#interrupt()
@since      1.2

## ThreadGroup.destroy()

```java
public final void destroy()
```

Does nothing.

@deprecated This method was originally specified to destroy an empty
            thread group. The ability to explicitly destroy a thread group
            no longer exists. A thread group is eligible to be GC'ed when
            there are no live threads in the group and it is otherwise
            unreachable.

## ThreadGroup.list()

```java
public void list()
```

Prints information about this thread group to the standard
output. This method is useful only for debugging.

## ThreadGroup.uncaughtException(Thread, Throwable)

```java
public void uncaughtException(Thread t, Throwable e)
```

Called by the Java Virtual Machine when a thread in this
thread group stops because of an uncaught exception, and the thread
does not have a specific {@link Thread.UncaughtExceptionHandler}
installed.
<p>
The {@code uncaughtException} method of
{@code ThreadGroup} does the following:
<ul>
<li>If this thread group has a parent thread group, the
    {@code uncaughtException} method of that parent is called
    with the same two arguments.
<li>Otherwise, this method checks to see if there is a
    {@linkplain Thread#getDefaultUncaughtExceptionHandler default
    uncaught exception handler} installed, and if so, its
    {@code uncaughtException} method is called with the same
    two arguments.
<li>Otherwise, a message containing the thread's name, as returned
    from the thread's {@link Thread#getName getName} method, and a
    stack backtrace, using the {@code Throwable}'s {@link
    Throwable#printStackTrace() printStackTrace} method, is
    printed to the {@linkplain System#err standard error stream}.
</ul>
<p>
Applications can override this method in subclasses of
{@code ThreadGroup} to provide alternative handling of
uncaught exceptions.

@param   t   the thread that is about to exit.
@param   e   the uncaught exception.

## ThreadGroup.toString()

```java
public String toString()
```

Returns a string representation of this Thread group.

@return  a string representation of this thread group.