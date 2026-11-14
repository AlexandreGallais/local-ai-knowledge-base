# Reference class (java.lang.ref)

```java
public abstract sealed class Reference< T> permits PhantomReference, SoftReference, WeakReference, FinalReference
```

Abstract base class for reference objects.  This class defines the
operations common to all reference objects.  Because reference objects are
implemented in close cooperation with the garbage collector, this class may
not be subclassed directly.
@param <T> the type of the referent

@author   Mark Reinhold
@since    1.2
@sealedGraph

## Reference.get()

```java
public T get()
```

Returns this reference object's referent.  If this reference object has
been cleared, either by the program or by the garbage collector, then
this method returns {@code null}.

@apiNote
This method returns a strong reference to the referent. This may cause
the garbage collector to treat it as strongly reachable until some later
collection cycle.  The {@link #refersTo(Object) refersTo} method can be
used to avoid such strengthening when testing whether some object is
the referent of a reference object; that is, use {@code ref.refersTo(obj)}
rather than {@code ref.get() == obj}.

@return   The object to which this reference refers, or
          {@code null} if this reference object has been cleared
@see #refersTo

## Reference.refersTo(T)

```java
public final boolean refersTo(T obj)
```

Tests if the referent of this reference object is {@code obj}.
Using a {@code null} {@code obj} returns {@code true} if the
reference object has been cleared.

@param  obj the object to compare with this reference object's referent
@return {@code true} if {@code obj} is the referent of this reference object
@since 16

## Reference.clear()

```java
public void clear()
```

Clears this reference object. Invoking this method does not enqueue this
object, and the garbage collector will not clear or enqueue this object.

<p>When the garbage collector or the {@link #enqueue()} method clear
references they do so directly, without invoking this method.

@apiNote
There is a potential race condition with the garbage collector. When this
method is called, the garbage collector may already be in the process of
(or already completed) clearing and/or enqueueing this reference.
Avoid this race by ensuring the referent remains strongly reachable until
after the call to clear(), using {@link #reachabilityFence(Object)} if
necessary.

## Reference.isEnqueued()

```java
public boolean isEnqueued()
```

Tests if this reference object is in its associated queue, if any.
This method returns {@code true} only if all of the following conditions
are met:
<ul>
<li>this reference object was registered with a queue when it was created; and
<li>the garbage collector has added this reference object to the queue
    or {@link #enqueue()} is called; and
<li>this reference object is not yet removed from the queue.
</ul>
Otherwise, this method returns {@code false}.
This method may return {@code false} if this reference object has been cleared
but not enqueued due to the race condition.

@deprecated
This method was originally specified to test if a reference object has
been cleared and enqueued but was never implemented to do this test.
This method could be misused due to the inherent race condition
or without an associated {@code ReferenceQueue}.
An application relying on this method to release critical resources
could cause serious performance issue.
An application should use {@link ReferenceQueue} to reliably determine
what reference objects that have been enqueued or
{@link #refersTo(Object) refersTo(null)} to determine if this reference
object has been cleared.

@return   {@code true} if and only if this reference object is
          in its associated queue (if any).

## Reference.enqueue()

```java
public boolean enqueue()
```

Clears this reference object, then attempts to add it to the queue with
which it is registered, if any.

<p>If this reference is registered with a queue but not yet enqueued,
the reference is added to the queue; this method is
<b><i>successful</i></b> and returns true.
If this reference is not registered with a queue, or was already enqueued
(by the garbage collector, or a previous call to {@code enqueue}), this
method is <b><i>unsuccessful</i></b> and returns false.

<p>{@linkplain java.lang.ref##MemoryConsistency Memory consistency effects}:
Actions in a thread prior to a <b><i>successful</i></b> call to {@code enqueue}
<a href="{@docRoot}/java.base/java/util/concurrent/package-summary.html#MemoryVisibility"><i>happen-before</i></a>
the reference is removed from the queue by {@link ReferenceQueue#poll}
or {@link ReferenceQueue#remove}. <b><i>Unsuccessful</i></b> calls to
{@code enqueue} have no specified memory consistency effects.

<p> When this method clears references it does so directly, without
invoking the {@link #clear()} method. When the garbage collector clears
and enqueues references it does so directly, without invoking the
{@link #clear()} method or this method.

@apiNote
Use of this method allows the registered queue's
{@link ReferenceQueue#poll} and {@link ReferenceQueue#remove} methods
to return this reference even though the referent may still be strongly
reachable.

@return   {@code true} if this reference object was successfully
          enqueued; {@code false} if it was already enqueued or if
          it was not registered with a queue when it was created

## Reference.clone()

```java
protected Object clone() throws CloneNotSupportedException
```

Throws {@link CloneNotSupportedException}. A {@code Reference} cannot be
meaningfully cloned. Construct a new {@code Reference} instead.

@return never returns normally
@throws  CloneNotSupportedException always

## Reference.reachabilityFence(Object)

```java
public static void reachabilityFence(Object ref)
```

Ensures that the given object remains
<a href="package-summary.html#reachability"><em>strongly reachable</em></a>.
This reachability is assured regardless of any optimizing transformations
the virtual machine may perform that might otherwise allow the object to
become unreachable (see JLS {@jls 12.6.1}). Thus, the given object is not
reclaimable by garbage collection at least until after the invocation of
this method. References to the given object will not be cleared (or
enqueued, if applicable) by the garbage collector until after invocation
of this method.
Invocation of this method does not itself initiate reference processing,
garbage collection, or finalization.

<p> This method establishes an ordering for <em>strong reachability</em>
with respect to garbage collection.  It controls relations that are
otherwise only implicit in a program -- the reachability conditions
triggering garbage collection.  This method is applicable only
when reclamation may have visible effects,
such as for objects that use finalizers or {@link Cleaner}, or code that
performs {@linkplain java.lang.ref reference processing}.

<p>{@linkplain java.lang.ref##MemoryConsistency Memory consistency effects}:
Actions in a thread prior to calling {@code reachabilityFence(x)}
<a href="{@docRoot}/java.base/java/util/concurrent/package-summary.html#MemoryVisibility"><i>happen-before</i></a>
the garbage collector clears any reference to {@code x}.

@apiNote
Reference processing or finalization can occur after an object becomes
unreachable. An object can become unreachable when the virtual machine
detects that there is no further need for the object (other than for
running a finalizer). In the course of optimization, the virtual machine
can reorder operations of an object's methods such that the object
becomes unneeded earlier than might naively be expected &mdash;
including while a method of the object is still running. For instance,
the VM can move the loading of <em>values</em> from the object's fields
to occur earlier. The object itself is then no longer needed and becomes
unreachable, and the method can continue running using the obtained values.
This may have surprising and undesirable effects when using a Cleaner or
finalizer for cleanup: there is a race between the
program thread running the method, and the cleanup thread running the
Cleaner or finalizer. The cleanup thread could free a
resource, followed by the program thread (still running the method)
attempting to access the now-already-freed resource.
Use of {@code reachabilityFence} can prevent this race by ensuring that the
object remains strongly reachable.
<p>
The following is an example in which the bookkeeping associated with a class is
managed through array indices.  Here, method {@code action} uses a
{@code reachabilityFence} to ensure that the {@code Resource} object is
not reclaimed before bookkeeping on an associated
{@code ExternalResource} has been performed; specifically, to
ensure that the array slot holding the {@code ExternalResource} is not
nulled out in method {@link Object#finalize}, which may otherwise run
concurrently.

{@snippet :
class Resource {
  private static ExternalResource[] externalResourceArray = ...

  int myIndex;
  Resource(...) {
    this.myIndex = ...
    externalResourceArray[myIndex] = ...;
    ...
  }
  protected void finalize() {
    externalResourceArray[this.myIndex] = null;
    ...
  }
  public void action() {
    try {
      // ...
      int i = this.myIndex; // last use of 'this' Resource in action()
      Resource.update(externalResourceArray[i]);
    } finally {
      Reference.reachabilityFence(this);
    }
  }
  private static void update(ExternalResource ext) {
    ext.status = ...;
  }
}
}

The invocation of {@code reachabilityFence} is
placed <em>after</em> the call to {@code update}, to ensure that the
array slot is not nulled out by {@link Object#finalize} before the
update, even if the call to {@code action} was the last use of this
object.  This might be the case if, for example, a usage in a user program
had the form {@code new Resource().action();} which retains no other
reference to this {@code Resource}.
The {@code reachabilityFence} call is placed in a {@code finally} block to
ensure that it is invoked across all paths in the method. A more complex
method might need further precautions to ensure that
{@code reachabilityFence} is encountered along all code paths.

<p> Method {@code reachabilityFence} is not required in constructions
that themselves ensure reachability.  For example, because objects that
are locked cannot, in general, be reclaimed, it would suffice if all
accesses of the object, in all methods of class {@code Resource}
(including {@code finalize}) were enclosed in {@code synchronized (this)}
blocks.  (Further, such blocks must not include infinite loops, or
themselves be unreachable, which fall into the corner case exceptions to
the "in general" disclaimer.)  However, method {@code reachabilityFence}
remains a better option in cases where synchronization is not as efficient,
desirable, or possible; for example because it would encounter deadlock.

@param ref the reference to the object to keep strongly reachable. If
{@code null}, this method has no effect.
@since 9