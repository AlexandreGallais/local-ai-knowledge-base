---
title: "Flow class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Flow.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Flow class (java.util.concurrent)

```java
public final class Flow
```

Interrelated interfaces and static methods for establishing
flow-controlled components in which Publishers
produce items consumed by one or more Subscribers, each managed by a Subscription.

These interfaces correspond to the  reactive-streams
specification.  They apply in both concurrent and distributed
asynchronous settings: All (seven) methods are defined in `void` "one-way" message style. Communication relies on a simple form
of flow control (method `Subscription.request`) that can be
used to avoid resource management problems that may otherwise occur
in "push" based systems.

**Examples.** A `Publisher` usually defines its own
`Subscription` implementation; constructing one in method
`subscribe` and issuing it to the calling `Subscriber`. It publishes items to the subscriber asynchronously,
normally using an `Executor`.  For example, here is a very
simple publisher that only issues (when requested) a single `TRUE` item to a single subscriber.  Because the subscriber receives
only a single item, this class does not use buffering and ordering
control required in most implementations (for example `SubmissionPublisher`).

```java
class OneShotPublisher implements Publisher<Boolean> {
  private final ExecutorService executor = ForkJoinPool.commonPool(); // daemon-based
  private boolean subscribed; // true after first subscribe
  public synchronized void subscribe(Subscriber<? super Boolean> subscriber) {
    if (subscribed)
      subscriber.onError(new IllegalStateException()); // only one allowed
    else {
      subscribed = true;
      subscriber.onSubscribe(new OneShotSubscription(subscriber, executor));
    }
  }
  static class OneShotSubscription implements Subscription {
    private final Subscriber<? super Boolean> subscriber;
    private final ExecutorService executor;
    private Future<?> future; // to allow cancellation
    private boolean completed;
    OneShotSubscription(Subscriber<? super Boolean> subscriber,
                        ExecutorService executor) {
      this.subscriber = subscriber;
      this.executor = executor;
    }
    public synchronized void request(long n) {
      if (!completed) {
        completed = true;
        if (n <= 0) {
          IllegalArgumentException ex = new IllegalArgumentException();
          executor.execute(() -> subscriber.onError(ex));
        } else {
          future = executor.submit(() -> {
            subscriber.onNext(Boolean.TRUE);
            subscriber.onComplete();
          });
        }
      }
    }
    public synchronized void cancel() {
      completed = true;
      if (future != null) future.cancel(false);
    }
  }
}
```

A `Subscriber` arranges that items be requested and
processed.  Items (invocations of `Subscriber.onNext`) are
not issued unless requested, but multiple items may be requested.
Many Subscriber implementations can arrange this in the style of
the following example, where a buffer size of 1 single-steps, and
larger sizes usually allow for more efficient overlapped processing
with less communication; for example with a value of 64, this keeps
total outstanding requests between 32 and 64.
Because Subscriber method invocations for a given `Subscription` are strictly ordered, there is no need for these
methods to use locks or volatiles unless a Subscriber maintains
multiple Subscriptions (in which case it is better to instead
define multiple Subscribers, each with its own Subscription).

```java
class SampleSubscriber<T> implements Subscriber<T> {
  final Consumer<? super T> consumer;
  Subscription subscription;
  final long bufferSize;
  long count;
  SampleSubscriber(long bufferSize, Consumer<? super T> consumer) {
    this.bufferSize = bufferSize;
    this.consumer = consumer;
  }
  public void onSubscribe(Subscription subscription) {
    long initialRequestSize = bufferSize;
    count = bufferSize - bufferSize / 2; // re-request when half consumed
    (this.subscription = subscription).request(initialRequestSize);
  }
  public void onNext(T item) {
    if (--count <= 0)
      subscription.request(count = bufferSize - bufferSize / 2);
    consumer.accept(item);
  }
  public void onError(Throwable ex) { ex.printStackTrace(); }
  public void onComplete() {}
}
```

The default value of `defaultBufferSize` may provide a
useful starting point for choosing request sizes and capacities in
Flow components based on expected rates, resources, and usages.
Or, when flow control is never needed, a subscriber may initially
request an effectively unbounded number of items, as in:

```java
class UnboundedSubscriber<T> implements Subscriber<T> {
  public void onSubscribe(Subscription subscription) {
    subscription.request(Long.MAX_VALUE); // effectively unbounded
  }
  public void onNext(T item) { use(item); }
  public void onError(Throwable ex) { ex.printStackTrace(); }
  public void onComplete() {}
  void use(T item) { ... }
}
```

**Since:** 9

## Flow.subscribe(Subscriber<? super T>)

```java
public void subscribe(Subscriber<? super T> subscriber)
```

Adds the given Subscriber if possible.  If already
subscribed, or the attempt to subscribe fails due to policy
violations or errors, the Subscriber's `onError`
method is invoked with an `IllegalStateException`.
Otherwise, the Subscriber's `onSubscribe` method is
invoked with a new `Subscription`.  Subscribers may
enable receiving items by invoking the `request`
method of this Subscription, and may unsubscribe by
invoking its `cancel` method.

Parameters:

- `subscriber`: the subscriber

Throws:

- `NullPointerException`: if subscriber is null

## Flow.onSubscribe(Subscription)

```java
public void onSubscribe(Subscription subscription)
```

Method invoked prior to invoking any other Subscriber
methods for the given Subscription. If this method throws
an exception, resulting behavior is not guaranteed, but may
cause the Subscription not to be established or to be cancelled.

Typically, implementations of this method invoke `subscription.request` to enable receiving items.

Parameters:

- `subscription`: a new subscription

## Flow.onNext(T)

```java
public void onNext(T item)
```

Method invoked with a Subscription's next item.  If this
method throws an exception, resulting behavior is not
guaranteed, but may cause the Subscription to be cancelled.

Parameters:

- `item`: the item

## Flow.onError(Throwable)

```java
public void onError(Throwable throwable)
```

Method invoked upon an unrecoverable error encountered by a
Publisher or Subscription, after which no other Subscriber
methods are invoked by the Subscription.  If this method
itself throws an exception, resulting behavior is
undefined.

Parameters:

- `throwable`: the exception

## Flow.onComplete()

```java
public void onComplete()
```

Method invoked when it is known that no additional
Subscriber method invocations will occur for a Subscription
that is not already terminated by error, after which no
other Subscriber methods are invoked by the Subscription.
If this method throws an exception, resulting behavior is
undefined.

## Flow.request(long)

```java
public void request(long n)
```

Adds the given number `n` of items to the current
unfulfilled demand for this subscription.  If `n` is
less than or equal to zero, the Subscriber will receive an
`onError` signal with an `IllegalArgumentException` argument.  Otherwise, the
Subscriber will receive up to `n` additional `onNext` invocations (or fewer if terminated).

Parameters:

- `n`: the increment of demand; a value of `Long.MAX_VALUE` may be considered as effectively unbounded

## Flow.cancel()

```java
public void cancel()
```

Causes the Subscriber to (eventually) stop receiving
messages.  Implementation is best-effort -- additional
messages may be received after invoking this method.
A cancelled subscription need not ever receive an
`onComplete` or `onError` signal.

## Flow.defaultBufferSize()

```java
public static int defaultBufferSize()
```

Returns a default value for Publisher or Subscriber buffering,
that may be used in the absence of other constraints.

**Implementation note:** The current value returned is 256.

**Returns:** the buffer size value
