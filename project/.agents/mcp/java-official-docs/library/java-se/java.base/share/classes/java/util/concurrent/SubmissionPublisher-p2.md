---
title: "SubmissionPublisher class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/SubmissionPublisher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SubmissionPublisher class (java.util.concurrent) (part 2 of 2)

## SubmissionPublisher.getNumberOfSubscribers()

```java
public int getNumberOfSubscribers()
```

Returns the number of current subscribers.

**Returns:** the number of current subscribers

## SubmissionPublisher.getExecutor()

```java
public Executor getExecutor()
```

Returns the Executor used for asynchronous delivery.

**Returns:** the Executor used for asynchronous delivery

## SubmissionPublisher.getMaxBufferCapacity()

```java
public int getMaxBufferCapacity()
```

Returns the maximum per-subscriber buffer capacity.

**Returns:** the maximum per-subscriber buffer capacity

## SubmissionPublisher.getSubscribers()

```java
public List<Subscriber<? super T>> getSubscribers()
```

Returns a list of current subscribers for monitoring and
tracking purposes, not for invoking `Flow.Subscriber`
methods on the subscribers.

**Returns:** list of current subscribers

## SubmissionPublisher.isSubscribed(Subscriber<? super T>)

```java
public boolean isSubscribed(Subscriber<? super T> subscriber)
```

Returns true if the given Subscriber is currently subscribed.

Parameters:

- `subscriber`: the subscriber

**Returns:** true if currently subscribed

Throws:

- `NullPointerException`: if subscriber is null

## SubmissionPublisher.estimateMinimumDemand()

```java
public long estimateMinimumDemand()
```

Returns an estimate of the minimum number of items requested
(via request) but not
yet produced, among all current subscribers.

**Returns:** the estimate, or zero if no subscribers

## SubmissionPublisher.estimateMaximumLag()

```java
public int estimateMaximumLag()
```

Returns an estimate of the maximum number of items produced but
not yet consumed among all current subscribers.

**Returns:** the estimate

## SubmissionPublisher.consume(Consumer<? super T>)

```java
public CompletableFuture<Void> consume(Consumer<? super T> consumer)
```

Processes all published items using the given Consumer function.
Returns a CompletableFuture that is completed normally when this
publisher signals onComplete, or completed exceptionally upon any error, or an
exception is thrown by the Consumer, or the returned
CompletableFuture is cancelled, in which case no further items
are processed.

Parameters:

- `consumer`: the function applied to each onNext item

**Returns:** a CompletableFuture that is completed normally
when the publisher signals onComplete, and exceptionally
upon any error or cancellation

Throws:

- `NullPointerException`: if consumer is null

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
