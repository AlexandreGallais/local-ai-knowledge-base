---
title: "CountedCompleter class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CountedCompleter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CountedCompleter class (java.util.concurrent) (part 2 of 2)

```java
class MapReducer<E> extends CountedCompleter<E> { // version 2
  final E[] array; final MyMapper<E> mapper;
  final MyReducer<E> reducer; final int lo, hi;
  MapReducer<E> forks, next; // record subtask forks in list
  E result;
  MapReducer(CountedCompleter<?> p, E[] array, MyMapper<E> mapper,
             MyReducer<E> reducer, int lo, int hi, MapReducer<E> next) {
    super(p);
    this.array = array; this.mapper = mapper;
    this.reducer = reducer; this.lo = lo; this.hi = hi;
    this.next = next;
  }
  public void compute() {
    int l = lo, h = hi;
    while (h - l >= 2) {
      int mid = (l + h) >>> 1;
      addToPendingCount(1);
      (forks = new MapReducer(this, array, mapper, reducer, mid, h, forks)).fork();
      h = mid;
    }
    if (h > l)
      result = mapper.apply(array[l]);
    // process completions by reducing along and advancing subtask links
    for (CountedCompleter<?> c = firstComplete(); c != null; c = c.nextComplete()) {
      for (MapReducer t = (MapReducer)c, s = t.forks; s != null; s = t.forks = s.next)
        t.result = reducer.apply(t.result, s.result);
    }
  }
  public E getRawResult() { return result; }

  public static <E> E mapReduce(E[] array, MyMapper<E> mapper, MyReducer<E> reducer) {
    return new MapReducer<E>(null, array, mapper, reducer,
                             0, array.length, null).invoke();
  }
}
```

**Triggers.** Some CountedCompleters are themselves never
forked, but instead serve as bits of plumbing in other designs;
including those in which the completion of one or more async tasks
triggers another async task. For example:

```java
class HeaderBuilder extends CountedCompleter<...> { ... }
class BodyBuilder extends CountedCompleter<...> { ... }
class PacketSender extends CountedCompleter<...> {
  PacketSender(...) { super(null, 1); ... } // trigger on second completion
  public void compute() { } // never called
  public void onCompletion(CountedCompleter<?> caller) { sendPacket(); }
}
// sample use:
PacketSender p = new PacketSender();
new HeaderBuilder(p, ...).fork();
new BodyBuilder(p, ...).fork();
```

Parameters:

- `<T>`: the type of the result of the completer

**Since:** 1.8

## CountedCompleter.CountedCompleter(CountedCompleter<?>, int)

```java
protected CountedCompleter(CountedCompleter<?> completer, int initialPendingCount)
```

Creates a new CountedCompleter with the given completer
and initial pending count.

Parameters:

- `completer`: this task's completer, or `null` if none
- `initialPendingCount`: the initial pending count

## CountedCompleter.CountedCompleter(CountedCompleter<?>)

```java
protected CountedCompleter(CountedCompleter<?> completer)
```

Creates a new CountedCompleter with the given completer
and an initial pending count of zero.

Parameters:

- `completer`: this task's completer, or `null` if none

## CountedCompleter.CountedCompleter()

```java
protected CountedCompleter()
```

Creates a new CountedCompleter with no completer
and an initial pending count of zero.

## CountedCompleter.compute()

```java
public abstract void compute()
```

The main computation performed by this task.

## CountedCompleter.onCompletion(CountedCompleter<?>)

```java
public void onCompletion(CountedCompleter<?> caller)
```

Performs an action when method `tryComplete` is invoked
and the pending count is zero, or when the unconditional
method `complete` is invoked.  By default, this method
does nothing. You can distinguish cases by checking the
identity of the given caller argument. If not equal to `this`, then it is typically a subtask that may contain results
(and/or links to other results) to combine.

Parameters:

- `caller`: the task invoking this method (which may be this task itself)

## CountedCompleter.onExceptionalCompletion(Throwable, CountedCompleter<?>)

```java
public boolean onExceptionalCompletion(Throwable ex, CountedCompleter<?> caller)
```

Performs an action when method `completeExceptionally(Throwable)` is invoked or method `compute` throws an exception, and this task has not already
otherwise completed normally. On entry to this method, this task
`ForkJoinTask.isCompletedAbnormally`.  The return value
of this method controls further propagation: If `true`
and this task has a completer that has not completed, then that
completer is also completed exceptionally, with the same
exception as this completer.  The default implementation of
this method does nothing except return `true`.

Parameters:

- `ex`: the exception
- `caller`: the task invoking this method (which may be this task itself)

**Returns:** `true` if this exception should be propagated to this
task's completer, if one exists

## CountedCompleter.getCompleter()

```java
public final CountedCompleter<?> getCompleter()
```

Returns the completer established in this task's constructor,
or `null` if none.

**Returns:** the completer

## CountedCompleter.getPendingCount()

```java
public final int getPendingCount()
```

Returns the current pending count.

**Returns:** the current pending count

## CountedCompleter.setPendingCount(int)

```java
public final void setPendingCount(int count)
```

Sets the pending count to the given value.

Parameters:

- `count`: the count

## CountedCompleter.addToPendingCount(int)

```java
public final void addToPendingCount(int delta)
```

Adds (atomically) the given value to the pending count.

Parameters:

- `delta`: the value to add

## CountedCompleter.compareAndSetPendingCount(int, int)

```java
public final boolean compareAndSetPendingCount(int expected, int count)
```

Sets (atomically) the pending count to the given count only if
it currently holds the given expected value.

Parameters:

- `expected`: the expected value
- `count`: the new value

**Returns:** `true` if successful

## CountedCompleter.decrementPendingCountUnlessZero()

```java
public final int decrementPendingCountUnlessZero()
```

If the pending count is nonzero, (atomically) decrements it.

**Returns:** the initial (undecremented) pending count holding on entry
to this method

## CountedCompleter.getRoot()

```java
public final CountedCompleter<?> getRoot()
```

Returns the root of the current computation; i.e., this
task if it has no completer, else its completer's root.

**Returns:** the root of the current computation

## CountedCompleter.tryComplete()

```java
public final void tryComplete()
```

If the pending count is nonzero, decrements the count;
otherwise invokes `onCompletion(CountedCompleter)`
and then similarly tries to complete this task's completer,
if one exists, else marks this task as complete.

## CountedCompleter.propagateCompletion()

```java
public final void propagateCompletion()
```

Equivalent to `tryComplete` but does not invoke `onCompletion(CountedCompleter)` along the completion path:
If the pending count is nonzero, decrements the count;
otherwise, similarly tries to complete this task's completer, if
one exists, else marks this task as complete. This method may be
useful in cases where `onCompletion` should not, or need
not, be invoked for each completer in a computation.

## CountedCompleter.complete(T)

```java
public void complete(T rawResult)
```

Regardless of pending count, invokes
`onCompletion(CountedCompleter)`, marks this task as
complete and further triggers `tryComplete` on this
task's completer, if one exists.  The given rawResult is
used as an argument to `setRawResult` before invoking
`onCompletion(CountedCompleter)` or marking this task
as complete; its value is meaningful only for classes
overriding `setRawResult`.  This method does not modify
the pending count.

This method may be useful when forcing completion as soon as
any one (versus all) of several subtask results are obtained.
However, in the common (and recommended) case in which `setRawResult` is not overridden, this effect can be obtained
more simply using `quietlyCompleteRoot()`.

Parameters:

- `rawResult`: the raw result

## CountedCompleter.firstComplete()

```java
public final CountedCompleter<?> firstComplete()
```

If this task's pending count is zero, returns this task;
otherwise decrements its pending count and returns `null`.
This method is designed to be used with `nextComplete` in
completion traversal loops.

**Returns:** this task, if pending count was zero, else `null`

## CountedCompleter.nextComplete()

```java
public final CountedCompleter<?> nextComplete()
```

If this task does not have a completer, invokes `ForkJoinTask.quietlyComplete` and returns `null`.  Or, if
the completer's pending count is non-zero, decrements that
pending count and returns `null`.  Otherwise, returns the
completer.  This method can be used as part of a completion
traversal loop for homogeneous task hierarchies:

```java
for (CountedCompleter<?> c = firstComplete();
     c != null;
     c = c.nextComplete()) {
  // ... process c ...
}
```

**Returns:** the completer, or `null` if none

## CountedCompleter.quietlyCompleteRoot()

```java
public final void quietlyCompleteRoot()
```

Equivalent to `getRoot().quietlyComplete()`.

## CountedCompleter.helpComplete(int)

```java
public final void helpComplete(int maxTasks)
```

If this task has not completed, attempts to process at most the
given number of other unprocessed tasks for which this task is
on the completion path, if any are known to exist.

Parameters:

- `maxTasks`: the maximum number of tasks to process. If less than or equal to zero, then no tasks are processed.

## CountedCompleter.exec()

```java
protected final boolean exec()
```

Implements execution conventions for CountedCompleters.

## CountedCompleter.getRawResult()

```java
public T getRawResult()
```

Returns the result of the computation.  By default,
returns `null`, which is appropriate for `Void`
actions, but in other cases should be overridden, almost
always to return a field or function of a field that
holds the result upon completion.

**Returns:** the result of the computation

## CountedCompleter.setRawResult(T)

```java
protected void setRawResult(T t)
```

A method that result-bearing CountedCompleters may optionally
use to help maintain result data.  By default, does nothing.
Overrides are not recommended. However, if this method is
overridden to update existing objects or fields, then it must
in general be defined to be thread-safe.
