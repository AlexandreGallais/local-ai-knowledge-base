# SubmissionPublisher class (java.util.concurrent)

```java
public class SubmissionPublisher<T> implements Publisher<T>, AutoCloseable
```

A {@link Flow.Publisher} that asynchronously issues submitted
(non-null) items to current subscribers until it is closed.  Each
current subscriber receives newly submitted items in the same order
unless drops or exceptions are encountered.  Using a
SubmissionPublisher allows item generators to act as compliant <a
href="http://www.reactive-streams.org/"> reactive-streams</a>
Publishers relying on drop handling and/or blocking for flow
control.

<p>A SubmissionPublisher uses the {@link Executor} supplied in its
constructor for delivery to subscribers. The best choice of
Executor depends on expected usage. If the generator(s) of
submitted items run in separate threads, and the number of
subscribers can be estimated, consider using a {@link
Executors#newFixedThreadPool}. Otherwise consider using the
default, normally the {@link ForkJoinPool#commonPool}.

<p>Buffering allows producers and consumers to transiently operate
at different rates.  Each subscriber uses an independent buffer.
Buffers are created upon first use and expanded as needed up to the
given maximum. (The enforced capacity may be rounded up to the
nearest power of two and/or bounded by the largest value supported
by this implementation.)  Invocations of {@link
Flow.Subscription#request(long) request} do not directly result in
buffer expansion, but risk saturation if unfilled requests exceed
the maximum capacity.  The default value of {@link
Flow#defaultBufferSize()} may provide a useful starting point for
choosing a capacity based on expected rates, resources, and usages.

<p>A single SubmissionPublisher may be shared among multiple
sources. Actions in a source thread prior to publishing an item or
issuing a signal <a href="package-summary.html#MemoryVisibility">
<i>happen-before</i></a> actions subsequent to the corresponding
access by each subscriber. But reported estimates of lag and demand
are designed for use in monitoring, not for synchronization
control, and may reflect stale or inaccurate views of progress.

<p>Publication methods support different policies about what to do
when buffers are saturated. Method {@link #submit(Object) submit}
blocks until resources are available. This is simplest, but least
responsive.  The {@code offer} methods may drop items (either
immediately or with bounded timeout), but provide an opportunity to
interpose a handler and then retry.

<p>If any Subscriber method throws an exception, its subscription
is cancelled.  If a handler is supplied as a constructor argument,
it is invoked before cancellation upon an exception in method
{@link Flow.Subscriber#onNext onNext}, but exceptions in methods
{@link Flow.Subscriber#onSubscribe onSubscribe},
{@link Flow.Subscriber#onError(Throwable) onError} and
{@link Flow.Subscriber#onComplete() onComplete} are not recorded or
handled before cancellation.  If the supplied Executor throws
{@link RejectedExecutionException} (or any other RuntimeException
or Error) when attempting to execute a task, or a drop handler
throws an exception when processing a dropped item, then the
exception is rethrown. In these cases, not all subscribers will
have been issued the published item. It is usually good practice to
{@link #closeExceptionally closeExceptionally} in these cases.

<p>Method {@link #consume(Consumer)} simplifies support for a
common case in which the only action of a subscriber is to request
and process all items using a supplied function.

<p>This class may also serve as a convenient base for subclasses
that generate items, and use the methods in this class to publish
them.  For example here is a class that periodically publishes the
items generated from a supplier. (In practice you might add methods
to independently start and stop generation, to share Executors
among publishers, and so on, or use a SubmissionPublisher as a
component rather than a superclass.)

<pre> {@code
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
}}</pre>

<p>Here is an example of a {@link Flow.Processor} implementation.
It uses single-step requests to its publisher for simplicity of
illustration. A more adaptive version could monitor flow using the
lag estimate returned from {@code submit}, along with other utility
methods.

<pre> {@code
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
}}</pre>

@param <T> the published item type
@author Doug Lea
@since 9

## SubmissionPublisher.SubmissionPublisher(Executor, int, BiConsumer<? super Subscriber<? super T>, ? super Throwable>)

```java
public SubmissionPublisher(Executor executor, int maxBufferCapacity, BiConsumer<? super Subscriber<? super T>, ? super Throwable> handler)
```

Creates a new SubmissionPublisher using the given Executor for
async delivery to subscribers, with the given maximum buffer size
for each subscriber, and, if non-null, the given handler invoked
when any Subscriber throws an exception in method {@link
Flow.Subscriber#onNext(Object) onNext}.

@param executor the executor to use for async delivery,
supporting creation of at least one independent thread
@param maxBufferCapacity the maximum capacity for each
subscriber's buffer (the enforced capacity may be rounded up to
the nearest power of two and/or bounded by the largest value
supported by this implementation; method {@link #getMaxBufferCapacity}
returns the actual value)
@param handler if non-null, procedure to invoke upon exception
thrown in method {@code onNext}
@throws NullPointerException if executor is null
@throws IllegalArgumentException if maxBufferCapacity not
positive

## SubmissionPublisher.SubmissionPublisher(Executor, int)

```java
public SubmissionPublisher(Executor executor, int maxBufferCapacity)
```

Creates a new SubmissionPublisher using the given Executor for
async delivery to subscribers, with the given maximum buffer size
for each subscriber, and no handler for Subscriber exceptions in
method {@link Flow.Subscriber#onNext(Object) onNext}.

@param executor the executor to use for async delivery,
supporting creation of at least one independent thread
@param maxBufferCapacity the maximum capacity for each
subscriber's buffer (the enforced capacity may be rounded up to
the nearest power of two and/or bounded by the largest value
supported by this implementation; method {@link #getMaxBufferCapacity}
returns the actual value)
@throws NullPointerException if executor is null
@throws IllegalArgumentException if maxBufferCapacity not
positive

## SubmissionPublisher.SubmissionPublisher()

```java
public SubmissionPublisher()
```

Creates a new SubmissionPublisher using the {@link
ForkJoinPool#commonPool()} for async delivery to subscribers, with
maximum buffer capacity of {@link Flow#defaultBufferSize}, and no
handler for Subscriber exceptions in method {@link
Flow.Subscriber#onNext(Object) onNext}.

## SubmissionPublisher.subscribe(Subscriber<? super T>)

```java
public void subscribe(Subscriber<? super T> subscriber)
```

Adds the given Subscriber unless already subscribed.  If already
subscribed, the Subscriber's {@link
Flow.Subscriber#onError(Throwable) onError} method is invoked on
the existing subscription with an {@link IllegalStateException}.
Otherwise, upon success, the Subscriber's {@link
Flow.Subscriber#onSubscribe onSubscribe} method is invoked
asynchronously with a new {@link Flow.Subscription}.  If {@link
Flow.Subscriber#onSubscribe onSubscribe} throws an exception, the
subscription is cancelled. Otherwise, if this SubmissionPublisher
was closed exceptionally, then the subscriber's {@link
Flow.Subscriber#onError onError} method is invoked with the
corresponding exception, or if closed without exception, the
subscriber's {@link Flow.Subscriber#onComplete() onComplete}
method is invoked.  Subscribers may enable receiving items by
invoking the {@link Flow.Subscription#request(long) request}
method of the new Subscription, and may unsubscribe by invoking
its {@link Flow.Subscription#cancel() cancel} method.

@param subscriber the subscriber
@throws NullPointerException if subscriber is null

## SubmissionPublisher.submit(T)

```java
public int submit(T item)
```

Publishes the given item to each current subscriber by
asynchronously invoking its {@link Flow.Subscriber#onNext(Object)
onNext} method, blocking uninterruptibly while resources for any
subscriber are unavailable. This method returns an estimate of
the maximum lag (number of items submitted but not yet consumed)
among all current subscribers. This value is at least one
(accounting for this submitted item) if there are any
subscribers, else zero.

<p>If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers,
then this exception is rethrown, in which case not all
subscribers will have been issued this item.

@param item the (non-null) item to publish
@return the estimated maximum lag among subscribers
@throws IllegalStateException if closed
@throws NullPointerException if item is null
@throws RejectedExecutionException if thrown by Executor

## SubmissionPublisher.offer(T, BiPredicate<Subscriber<? super T>, ? super T>)

```java
public int offer(T item, BiPredicate<Subscriber<? super T>, ? super T> onDrop)
```

Publishes the given item, if possible, to each current subscriber
by asynchronously invoking its {@link
Flow.Subscriber#onNext(Object) onNext} method. The item may be
dropped by one or more subscribers if resource limits are
exceeded, in which case the given handler (if non-null) is
invoked, and if it returns true, retried once.  Other calls to
methods in this class by other threads are blocked while the
handler is invoked.  Unless recovery is assured, options are
usually limited to logging the error and/or issuing an {@link
Flow.Subscriber#onError(Throwable) onError} signal to the
subscriber.

<p>This method returns a status indicator: If negative, it
represents the (negative) number of drops (failed attempts to
issue the item to a subscriber). Otherwise it is an estimate of
the maximum lag (number of items submitted but not yet
consumed) among all current subscribers. This value is at least
one (accounting for this submitted item) if there are any
subscribers, else zero.

<p>If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers, or
the drop handler throws an exception when processing a dropped
item, then this exception is rethrown.

@param item the (non-null) item to publish
@param onDrop if non-null, the handler invoked upon a drop to a
subscriber, with arguments of the subscriber and item; if it
returns true, an offer is re-attempted (once)
@return if negative, the (negative) number of drops; otherwise
an estimate of maximum lag
@throws IllegalStateException if closed
@throws NullPointerException if item is null
@throws RejectedExecutionException if thrown by Executor

## SubmissionPublisher.offer(T, long, TimeUnit, BiPredicate<Subscriber<? super T>, ? super T>)

```java
public int offer(T item, long timeout, TimeUnit unit, BiPredicate<Subscriber<? super T>, ? super T> onDrop)
```

Publishes the given item, if possible, to each current subscriber
by asynchronously invoking its {@link
Flow.Subscriber#onNext(Object) onNext} method, blocking while
resources for any subscription are unavailable, up to the
specified timeout or until the caller thread is interrupted, at
which point the given handler (if non-null) is invoked, and if it
returns true, retried once. (The drop handler may distinguish
timeouts from interrupts by checking whether the current thread
is interrupted.)  Other calls to methods in this class by other
threads are blocked while the handler is invoked.  Unless
recovery is assured, options are usually limited to logging the
error and/or issuing an {@link Flow.Subscriber#onError(Throwable)
onError} signal to the subscriber.

<p>This method returns a status indicator: If negative, it
represents the (negative) number of drops (failed attempts to
issue the item to a subscriber). Otherwise it is an estimate of
the maximum lag (number of items submitted but not yet
consumed) among all current subscribers. This value is at least
one (accounting for this submitted item) if there are any
subscribers, else zero.

<p>If the Executor for this publisher throws a
RejectedExecutionException (or any other RuntimeException or
Error) when attempting to asynchronously notify subscribers, or
the drop handler throws an exception when processing a dropped
item, then this exception is rethrown.

@param item the (non-null) item to publish
@param timeout how long to wait for resources for any subscriber
before giving up, in units of {@code unit}
@param unit a {@code TimeUnit} determining how to interpret the
{@code timeout} parameter
@param onDrop if non-null, the handler invoked upon a drop to a
subscriber, with arguments of the subscriber and item; if it
returns true, an offer is re-attempted (once)
@return if negative, the (negative) number of drops; otherwise
an estimate of maximum lag
@throws IllegalStateException if closed
@throws NullPointerException if item is null
@throws RejectedExecutionException if thrown by Executor

## SubmissionPublisher.close()

```java
public void close()
```

Unless already closed, issues {@link
Flow.Subscriber#onComplete() onComplete} signals to current
subscribers, and disallows subsequent attempts to publish.
Upon return, this method does <em>NOT</em> guarantee that all
subscribers have yet completed.

## SubmissionPublisher.closeExceptionally(Throwable)

```java
public void closeExceptionally(Throwable error)
```

Unless already closed, issues {@link
Flow.Subscriber#onError(Throwable) onError} signals to current
subscribers with the given error, and disallows subsequent
attempts to publish.  Future subscribers also receive the given
error. Upon return, this method does <em>NOT</em> guarantee
that all subscribers have yet completed.

@param error the {@code onError} argument sent to subscribers
@throws NullPointerException if error is null

## SubmissionPublisher.isClosed()

```java
public boolean isClosed()
```

Returns true if this publisher is not accepting submissions.

@return true if closed

## SubmissionPublisher.getClosedException()

```java
public Throwable getClosedException()
```

Returns the exception associated with {@link
#closeExceptionally(Throwable) closeExceptionally}, or null if
not closed or if closed normally.

@return the exception, or null if none

## SubmissionPublisher.hasSubscribers()

```java
public boolean hasSubscribers()
```

Returns true if this publisher has any subscribers.

@return true if this publisher has any subscribers

## SubmissionPublisher.getNumberOfSubscribers()

```java
public int getNumberOfSubscribers()
```

Returns the number of current subscribers.

@return the number of current subscribers

## SubmissionPublisher.getExecutor()

```java
public Executor getExecutor()
```

Returns the Executor used for asynchronous delivery.

@return the Executor used for asynchronous delivery

## SubmissionPublisher.getMaxBufferCapacity()

```java
public int getMaxBufferCapacity()
```

Returns the maximum per-subscriber buffer capacity.

@return the maximum per-subscriber buffer capacity

## SubmissionPublisher.getSubscribers()

```java
public List<Subscriber<? super T>> getSubscribers()
```

Returns a list of current subscribers for monitoring and
tracking purposes, not for invoking {@link Flow.Subscriber}
methods on the subscribers.

@return list of current subscribers

## SubmissionPublisher.isSubscribed(Subscriber<? super T>)

```java
public boolean isSubscribed(Subscriber<? super T> subscriber)
```

Returns true if the given Subscriber is currently subscribed.

@param subscriber the subscriber
@return true if currently subscribed
@throws NullPointerException if subscriber is null

## SubmissionPublisher.estimateMinimumDemand()

```java
public long estimateMinimumDemand()
```

Returns an estimate of the minimum number of items requested
(via {@link Flow.Subscription#request(long) request}) but not
yet produced, among all current subscribers.

@return the estimate, or zero if no subscribers

## SubmissionPublisher.estimateMaximumLag()

```java
public int estimateMaximumLag()
```

Returns an estimate of the maximum number of items produced but
not yet consumed among all current subscribers.

@return the estimate

## SubmissionPublisher.consume(Consumer<? super T>)

```java
public CompletableFuture<Void> consume(Consumer<? super T> consumer)
```

Processes all published items using the given Consumer function.
Returns a CompletableFuture that is completed normally when this
publisher signals {@link Flow.Subscriber#onComplete()
onComplete}, or completed exceptionally upon any error, or an
exception is thrown by the Consumer, or the returned
CompletableFuture is cancelled, in which case no further items
are processed.

@param consumer the function applied to each onNext item
@return a CompletableFuture that is completed normally
when the publisher signals onComplete, and exceptionally
upon any error or cancellation
@throws NullPointerException if consumer is null

## SubmissionPublisher.isReleasable()

```java
public final boolean isReleasable()
```

Returns true if closed or space available.
For ManagedBlocker.

## SubmissionPublisher.block()

```java
public final boolean block()
```

Blocks until closed, space available or timeout.
For ManagedBlocker.