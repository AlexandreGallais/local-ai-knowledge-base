---
title: "SubmissionPublisher class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/SubmissionPublisher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SubmissionPublisher class (java.util.concurrent)

```java
public class SubmissionPublisher<T> implements Publisher<T>, AutoCloseable
```

A `Flow.Publisher` that asynchronously issues submitted
(non-null) items to current subscribers until it is closed.  Each
current subscriber receives newly submitted items in the same order
unless drops or exceptions are encountered.  Using a
SubmissionPublisher allows item generators to act as compliant  reactive-streams
Publishers relying on drop handling and/or blocking for flow
control.

A SubmissionPublisher uses the `Executor` supplied in its
constructor for delivery to subscribers. The best choice of
Executor depends on expected usage. If the generator(s) of
submitted items run in separate threads, and the number of
subscribers can be estimated, consider using a `Executors.newFixedThreadPool`. Otherwise consider using the
default, normally the `ForkJoinPool.commonPool`.

Buffering allows producers and consumers to transiently operate
at different rates.  Each subscriber uses an independent buffer.
Buffers are created upon first use and expanded as needed up to the
given maximum. (The enforced capacity may be rounded up to the
nearest power of two and/or bounded by the largest value supported
by this implementation.)  Invocations of request do not directly result in
buffer expansion, but risk saturation if unfilled requests exceed
the maximum capacity.  The default value of `Flow.defaultBufferSize()` may provide a useful starting point for
choosing a capacity based on expected rates, resources, and usages.

A single SubmissionPublisher may be shared among multiple
sources. Actions in a source thread prior to publishing an item or
issuing a signal
*happen-before* actions subsequent to the corresponding
access by each subscriber. But reported estimates of lag and demand
are designed for use in monitoring, not for synchronization
control, and may reflect stale or inaccurate views of progress.

Publication methods support different policies about what to do
when buffers are saturated. Method submit
blocks until resources are available. This is simplest, but least
responsive.  The `offer` methods may drop items (either
immediately or with bounded timeout), but provide an opportunity to
interpose a handler and then retry.

If any Subscriber method throws an exception, its subscription
is cancelled.  If a handler is supplied as a constructor argument,
it is invoked before cancellation upon an exception in method
onNext, but exceptions in methods
onSubscribe,
onError and
onComplete are not recorded or
handled before cancellation.  If the supplied Executor throws
`RejectedExecutionException` (or any other RuntimeException
or Error) when attempting to execute a task, or a drop handler
throws an exception when processing a dropped item, then the
exception is rethrown. In these cases, not all subscribers will
have been issued the published item. It is usually good practice to
closeExceptionally in these cases.

Method `consume(Consumer)` simplifies support for a
common case in which the only action of a subscriber is to request
and process all items using a supplied function.

This class may also serve as a convenient base for subclasses
that generate items, and use the methods in this class to publish
them.  For example here is a class that periodically publishes the
items generated from a supplier. (In practice you might add methods
to independently start and stop generation, to share Executors
among publishers, and so on, or use a SubmissionPublisher as a
component rather than a superclass.)

```java
class PeriodicPublisher<T> extends SubmissionPublisher<T> {
  final ScheduledFuture<?> periodicTask;
  final ScheduledExecutorService scheduler;
  PeriodicPublisher(Executor executor, int maxBufferCapacity,
                    Supplier<? extends T> supplier,
                    long period, TimeUnit unit) {
    super(executor, maxBufferCapacity);
    scheduler = new ScheduledThreadPoolExecutor(1);
    periodicTask = scheduler.scheduleAtFixedRate(
      () -> submit(supplier.get()), 0, period, unit);
  }
  public void close() {
    periodicTask.cancel(false);
    scheduler.shutdown();
    super.close();
  }
}
```

Here is an example of a `Flow.Processor` implementation.
It uses single-step requests to its publisher for simplicity of
illustration. A more adaptive version could monitor flow using the
lag estimate returned from `submit`, along with other utility
methods.

```java
class TransformProcessor<S,T> extends SubmissionPublisher<T>
  implements Flow.Processor<S,T> {
  final Function<? super S, ? extends T> function;
  Flow.Subscription subscription;
  TransformProcessor(Executor executor, int maxBufferCapacity,
                     Function<? super S, ? extends T> function) {
    super(executor, maxBufferCapacity);
    this.function = function;
  }
  public void onSubscribe(Flow.Subscription subscription) {
    (this.subscription = subscription).request(1);
  }
  public void onNext(S item) {
    subscription.request(1);
    submit(function.apply(item));
  }
  public void onError(Throwable ex) { closeExceptionally(ex); }
  public void onComplete() { close(); }
}
```

Parameters:

- `<T>`: the published item type

**Since:** 9

## SubmissionPublisher.SubmissionPublisher(Executor, int, BiConsumer<? super Subscriber<? super T>, ? super Throwable>)

```java
public SubmissionPublisher(Executor executor, int maxBufferCapacity, BiConsumer<? super Subscriber<? super T>, ? super Throwable> handler)
```

Creates a new SubmissionPublisher using the given Executor for
async delivery to subscribers, with the given maximum buffer size
for each subscriber, and, if non-null, the given handler invoked
when any Subscriber throws an exception in method onNext.

Parameters:

- `executor`: the executor to use for async delivery, supporting creation of at least one independent thread
- `maxBufferCapacity`: the maximum capacity for each subscriber's buffer (the enforced capacity may be rounded up to the nearest power of two and/or bounded by the largest value supported by this implementation; method `getMaxBufferCapacity` returns the actual value)
- `handler`: if non-null, procedure to invoke upon exception thrown in method `onNext`

Throws:

- `NullPointerException`: if executor is null
- `IllegalArgumentException`: if maxBufferCapacity not positive

## SubmissionPublisher.SubmissionPublisher(Executor, int)

```java
public SubmissionPublisher(Executor executor, int maxBufferCapacity)
```

Creates a new SubmissionPublisher using the given Executor for
async delivery to subscribers, with the given maximum buffer size
for each subscriber, and no handler for Subscriber exceptions in
method onNext.

Parameters:

- `executor`: the executor to use for async delivery, supporting creation of at least one independent thread
- `maxBufferCapacity`: the maximum capacity for each subscriber's buffer (the enforced capacity may be rounded up to the nearest power of two and/or bounded by the largest value supported by this implementation; method `getMaxBufferCapacity` returns the actual value)

Throws:

- `NullPointerException`: if executor is null
- `IllegalArgumentException`: if maxBufferCapacity not positive

## SubmissionPublisher.SubmissionPublisher()

```java
public SubmissionPublisher()
```

Creates a new SubmissionPublisher using the `ForkJoinPool.commonPool()` for async delivery to subscribers, with
maximum buffer capacity of `Flow.defaultBufferSize`, and no
handler for Subscriber exceptions in method onNext.

## SubmissionPublisher.subscribe(Subscriber<? super T>)

```java
public void subscribe(Subscriber<? super T> subscriber)
```

Adds the given Subscriber unless already subscribed.  If already
subscribed, the Subscriber's onError method is invoked on
the existing subscription with an `IllegalStateException`.
Otherwise, upon success, the Subscriber's onSubscribe method is invoked
asynchronously with a new `Flow.Subscription`.  If onSubscribe throws an exception, the
subscription is cancelled. Otherwise, if this SubmissionPublisher
was closed exceptionally, then the subscriber's onError method is invoked with the
corresponding exception, or if closed without exception, the
subscriber's onComplete
method is invoked.  Subscribers may enable receiving items by
invoking the request
method of the new Subscription, and may unsubscribe by invoking
its cancel method.

Parameters:

- `subscriber`: the subscriber

Throws:

- `NullPointerException`: if subscriber is null

## SubmissionPublisher.submit(T)

```java
public int submit(T item)
```

Publishes the given item to each current subscriber by
asynchronously invoking its onNext method, blocking uninterruptibly while resources for any
subscriber are unavailable. This method returns an estimate of
the maximum lag (number of items submitted but not yet consumed)
among all current subscribers. This value is at least one
(accounting for this submitted item) if there are any
subscribers, else zero.

If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers,
then this exception is rethrown, in which case not all
subscribers will have been issued this item.

Parameters:

- `item`: the (non-null) item to publish

**Returns:** the estimated maximum lag among subscribers

Throws:

- `IllegalStateException`: if closed
- `NullPointerException`: if item is null
- `RejectedExecutionException`: if thrown by Executor

## SubmissionPublisher.offer(T, BiPredicate<Subscriber<? super T>, ? super T>)

```java
public int offer(T item, BiPredicate<Subscriber<? super T>, ? super T> onDrop)
```

Publishes the given item, if possible, to each current subscriber
by asynchronously invoking its onNext method. The item may be
dropped by one or more subscribers if resource limits are
exceeded, in which case the given handler (if non-null) is
invoked, and if it returns true, retried once.  Other calls to
methods in this class by other threads are blocked while the
handler is invoked.  Unless recovery is assured, options are
usually limited to logging the error and/or issuing an onError signal to the
subscriber.

This method returns a status indicator: If negative, it
represents the (negative) number of drops (failed attempts to
issue the item to a subscriber). Otherwise it is an estimate of
the maximum lag (number of items submitted but not yet
consumed) among all current subscribers. This value is at least
one (accounting for this submitted item) if there are any
subscribers, else zero.

If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers, or
the drop handler throws an exception when processing a dropped
item, then this exception is rethrown.

Parameters:

- `item`: the (non-null) item to publish
- `onDrop`: if non-null, the handler invoked upon a drop to a subscriber, with arguments of the subscriber and item; if it returns true, an offer is re-attempted (once)

**Returns:** if negative, the (negative) number of drops; otherwise
an estimate of maximum lag

Throws:

- `IllegalStateException`: if closed
- `NullPointerException`: if item is null
- `RejectedExecutionException`: if thrown by Executor

## SubmissionPublisher.offer(T, long, TimeUnit, BiPredicate<Subscriber<? super T>, ? super T>)

```java
public int offer(T item, long timeout, TimeUnit unit, BiPredicate<Subscriber<? super T>, ? super T> onDrop)
```

Publishes the given item, if possible, to each current subscriber
by asynchronously invoking its onNext method, blocking while
resources for any subscription are unavailable, up to the
specified timeout or until the caller thread is interrupted, at
which point the given handler (if non-null) is invoked, and if it
returns true, retried once. (The drop handler may distinguish
timeouts from interrupts by checking whether the current thread
is interrupted.)  Other calls to methods in this class by other
threads are blocked while the handler is invoked.  Unless
recovery is assured, options are usually limited to logging the
error and/or issuing an onError signal to the subscriber.

This method returns a status indicator: If negative, it
represents the (negative) number of drops (failed attempts to
issue the item to a subscriber). Otherwise it is an estimate of
the maximum lag (number of items submitted but not yet
consumed) among all current subscribers. This value is at least
one (accounting for this submitted item) if there are any
subscribers, else zero.

If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers, or
the drop handler throws an exception when processing a dropped
item, then this exception is rethrown.

Parameters:

- `item`: the (non-null) item to publish
- `timeout`: how long to wait for resources for any subscriber before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter
- `onDrop`: if non-null, the handler invoked upon a drop to a subscriber, with arguments of the subscriber and item; if it returns true, an offer is re-attempted (once)

**Returns:** if negative, the (negative) number of drops; otherwise
an estimate of maximum lag

Throws:

- `IllegalStateException`: if closed
- `NullPointerException`: if item is null
- `RejectedExecutionException`: if thrown by Executor

## SubmissionPublisher.close()

```java
public void close()
```

Unless already closed, issues onComplete signals to current
subscribers, and disallows subsequent attempts to publish.
Upon return, this method does *NOT* guarantee that all
subscribers have yet completed.

## SubmissionPublisher.closeExceptionally(Throwable)

```java
public void closeExceptionally(Throwable error)
```

Unless already closed, issues onError signals to current
subscribers with the given error, and disallows subsequent
attempts to publish.  Future subscribers also receive the given
error. Upon return, this method does *NOT* guarantee
that all subscribers have yet completed.

Parameters:

- `error`: the `onError` argument sent to subscribers

Throws:

- `NullPointerException`: if error is null

## SubmissionPublisher.isClosed()

```java
public boolean isClosed()
```

Returns true if this publisher is not accepting submissions.

**Returns:** true if closed

## SubmissionPublisher.getClosedException()

```java
public Throwable getClosedException()
```

Returns the exception associated with closeExceptionally, or null if
not closed or if closed normally.

**Returns:** the exception, or null if none

## SubmissionPublisher.hasSubscribers()

```java
public boolean hasSubscribers()
```

Returns true if this publisher has any subscribers.

**Returns:** true if this publisher has any subscribers
