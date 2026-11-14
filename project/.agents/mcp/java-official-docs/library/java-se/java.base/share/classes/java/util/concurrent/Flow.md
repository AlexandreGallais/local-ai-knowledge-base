# Flow class (java.util.concurrent)

```java
public final class Flow
```

Interrelated interfaces and static methods for establishing
flow-controlled components in which {@link Publisher Publishers}
produce items consumed by one or more {@link Subscriber
Subscribers}, each managed by a {@link Subscription
Subscription}.

<p>These interfaces correspond to the <a
href="http://www.reactive-streams.org/"> reactive-streams</a>
specification.  They apply in both concurrent and distributed
asynchronous settings: All (seven) methods are defined in {@code
void} "one-way" message style. Communication relies on a simple form
of flow control (method {@link Subscription#request}) that can be
used to avoid resource management problems that may otherwise occur
in "push" based systems.

<p><b>Examples.</b> A {@link Publisher} usually defines its own
{@link Subscription} implementation; constructing one in method
{@code subscribe} and issuing it to the calling {@link
Subscriber}. It publishes items to the subscriber asynchronously,
normally using an {@link Executor}.  For example, here is a very
simple publisher that only issues (when requested) a single {@code
TRUE} item to a single subscriber.  Because the subscriber receives
only a single item, this class does not use buffering and ordering
control required in most implementations (for example {@link
SubmissionPublisher}).

<pre> {@code
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
}}</pre>

<p>A {@link Subscriber} arranges that items be requested and
processed.  Items (invocations of {@link Subscriber#onNext}) are
not issued unless requested, but multiple items may be requested.
Many Subscriber implementations can arrange this in the style of
the following example, where a buffer size of 1 single-steps, and
larger sizes usually allow for more efficient overlapped processing
with less communication; for example with a value of 64, this keeps
total outstanding requests between 32 and 64.
Because Subscriber method invocations for a given {@link
Subscription} are strictly ordered, there is no need for these
methods to use locks or volatiles unless a Subscriber maintains
multiple Subscriptions (in which case it is better to instead
define multiple Subscribers, each with its own Subscription).

<pre> {@code
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
}}</pre>

<p>The default value of {@link #defaultBufferSize} may provide a
useful starting point for choosing request sizes and capacities in
Flow components based on expected rates, resources, and usages.
Or, when flow control is never needed, a subscriber may initially
request an effectively unbounded number of items, as in:

<pre> {@code
class UnboundedSubscriber<T> implements Subscriber<T> {
  public void onSubscribe(Subscription subscription) {
    subscription.request(Long.MAX_VALUE); // effectively unbounded
  }
  public void onNext(T item) { use(item); }
  public void onError(Throwable ex) { ex.printStackTrace(); }
  public void onComplete() {}
  void use(T item) { ... }
}}</pre>

@author Doug Lea
@since 9

## Flow.subscribe(Subscriber<? super T>)

```java
public void subscribe(Subscriber<? super T> subscriber)
```

Adds the given Subscriber if possible.  If already
subscribed, or the attempt to subscribe fails due to policy
violations or errors, the Subscriber's {@code onError}
method is invoked with an {@link IllegalStateException}.
Otherwise, the Subscriber's {@code onSubscribe} method is
invoked with a new {@link Subscription}.  Subscribers may
enable receiving items by invoking the {@code request}
method of this Subscription, and may unsubscribe by
invoking its {@code cancel} method.

@param subscriber the subscriber
@throws NullPointerException if subscriber is null

## Flow.onSubscribe(Subscription)

```java
public void onSubscribe(Subscription subscription)
```

Method invoked prior to invoking any other Subscriber
methods for the given Subscription. If this method throws
an exception, resulting behavior is not guaranteed, but may
cause the Subscription not to be established or to be cancelled.

<p>Typically, implementations of this method invoke {@code
subscription.request} to enable receiving items.

@param subscription a new subscription

## Flow.onNext(T)

```java
public void onNext(T item)
```

Method invoked with a Subscription's next item.  If this
method throws an exception, resulting behavior is not
guaranteed, but may cause the Subscription to be cancelled.

@param item the item

## Flow.onError(Throwable)

```java
public void onError(Throwable throwable)
```

Method invoked upon an unrecoverable error encountered by a
Publisher or Subscription, after which no other Subscriber
methods are invoked by the Subscription.  If this method
itself throws an exception, resulting behavior is
undefined.

@param throwable the exception

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

Adds the given number {@code n} of items to the current
unfulfilled demand for this subscription.  If {@code n} is
less than or equal to zero, the Subscriber will receive an
{@code onError} signal with an {@link
IllegalArgumentException} argument.  Otherwise, the
Subscriber will receive up to {@code n} additional {@code
onNext} invocations (or fewer if terminated).

@param n the increment of demand; a value of {@code
Long.MAX_VALUE} may be considered as effectively unbounded

## Flow.cancel()

```java
public void cancel()
```

Causes the Subscriber to (eventually) stop receiving
messages.  Implementation is best-effort -- additional
messages may be received after invoking this method.
A cancelled subscription need not ever receive an
{@code onComplete} or {@code onError} signal.

## Flow.defaultBufferSize()

```java
public static int defaultBufferSize()
```

Returns a default value for Publisher or Subscriber buffering,
that may be used in the absence of other constraints.

@implNote
The current value returned is 256.

@return the buffer size value