---
title: "CompletionStage interface (java.util.concurrent) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletionStage.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletionStage interface (java.util.concurrent) (part 3 of 3)

## CompletionStage.whenComplete(BiConsumer<? super T, ? super Throwable>)

```java
public CompletionStage<T> whenComplete (BiConsumer<? super T, ? super Throwable> action)
```

Returns a new CompletionStage with the same result or exception as
this stage, that executes the given action when this stage completes.

When this stage is complete, the given action is invoked
with the result (or `null` if none) and the exception (or
`null` if none) of this stage as arguments.  The returned
stage is completed when the action returns.

Unlike method handle,
this method is not designed to translate completion outcomes,
so the supplied action should not throw an exception. However,
if it does, the following rules apply: if this stage completed
normally but the supplied action throws an exception, then the
returned stage completes exceptionally with the supplied
action's exception. Or, if this stage completed exceptionally
and the supplied action throws an exception, then the returned
stage completes exceptionally with this stage's exception.

Parameters:

- `action`: the action to perform

**Returns:** the new CompletionStage

## CompletionStage.whenCompleteAsync(BiConsumer<? super T, ? super Throwable>)

```java
public CompletionStage<T> whenCompleteAsync (BiConsumer<? super T, ? super Throwable> action)
```

Returns a new CompletionStage with the same result or exception as
this stage, that executes the given action using this stage's
default asynchronous execution facility when this stage completes.

When this stage is complete, the given action is invoked with the
result (or `null` if none) and the exception (or `null`
if none) of this stage as arguments.  The returned stage is completed
when the action returns.

Unlike method handleAsync,
this method is not designed to translate completion outcomes,
so the supplied action should not throw an exception. However,
if it does, the following rules apply: If this stage completed
normally but the supplied action throws an exception, then the
returned stage completes exceptionally with the supplied
action's exception. Or, if this stage completed exceptionally
and the supplied action throws an exception, then the returned
stage completes exceptionally with this stage's exception.

Parameters:

- `action`: the action to perform

**Returns:** the new CompletionStage

## CompletionStage.whenCompleteAsync(BiConsumer<? super T, ? super Throwable>, Executor)

```java
public CompletionStage<T> whenCompleteAsync (BiConsumer<? super T, ? super Throwable> action, Executor executor)
```

Returns a new CompletionStage with the same result or exception as
this stage, that executes the given action using the supplied
Executor when this stage completes.

When this stage is complete, the given action is invoked with the
result (or `null` if none) and the exception (or `null`
if none) of this stage as arguments.  The returned stage is completed
when the action returns.

Unlike method handleAsync,
this method is not designed to translate completion outcomes,
so the supplied action should not throw an exception. However,
if it does, the following rules apply: If this stage completed
normally but the supplied action throws an exception, then the
returned stage completes exceptionally with the supplied
action's exception. Or, if this stage completed exceptionally
and the supplied action throws an exception, then the returned
stage completes exceptionally with this stage's exception.

Parameters:

- `action`: the action to perform
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.exceptionally(Function<Throwable, ? extends T>)

```java
public CompletionStage<T> exceptionally (Function<Throwable, ? extends T> fn)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is executed with this stage's exception as the
argument to the supplied function.  Otherwise, if this stage
completes normally, then the returned stage also completes
normally with the same value.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage if this CompletionStage completed exceptionally

**Returns:** the new CompletionStage

## CompletionStage.exceptionallyAsync(Function<Throwable, ? extends T>)

```java
public default CompletionStage<T> exceptionallyAsync (Function<Throwable, ? extends T> fn)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is executed with this stage's exception as the
argument to the supplied function, using this stage's default
asynchronous execution facility.  Otherwise, if this stage
completes normally, then the returned stage also completes
normally with the same value.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage if this CompletionStage completed exceptionally

**Implementation requirements:** The default implementation invokes `handle`,
relaying to `handleAsync` on exception, then `thenCompose` for result.

**Returns:** the new CompletionStage

**Since:** 12

## CompletionStage.exceptionallyAsync(Function<Throwable, ? extends T>, Executor)

```java
public default CompletionStage<T> exceptionallyAsync (Function<Throwable, ? extends T> fn, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is executed with this stage's exception as the
argument to the supplied function, using the supplied Executor.
Otherwise, if this stage completes normally, then the returned
stage also completes normally with the same value.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage if this CompletionStage completed exceptionally
- `executor`: the executor to use for asynchronous execution

**Implementation requirements:** The default implementation invokes `handle`,
relaying to `handleAsync` on exception, then `thenCompose` for result.

**Returns:** the new CompletionStage

**Since:** 12

## CompletionStage.exceptionallyCompose(Function<Throwable, ? extends CompletionStage<T>>)

```java
public default CompletionStage<T> exceptionallyCompose (Function<Throwable, ? extends CompletionStage<T>> fn)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is composed using the results of the supplied
function applied to this stage's exception.

Parameters:

- `fn`: the function to use to compute the returned CompletionStage if this CompletionStage completed exceptionally

**Implementation requirements:** The default implementation invokes `handle`,
invoking the given function on exception, then `thenCompose` for result.

**Returns:** the new CompletionStage

**Since:** 12

## CompletionStage.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>)

```java
public default CompletionStage<T> exceptionallyComposeAsync (Function<Throwable, ? extends CompletionStage<T>> fn)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is composed using the results of the supplied
function applied to this stage's exception, using this stage's
default asynchronous execution facility.

Parameters:

- `fn`: the function to use to compute the returned CompletionStage if this CompletionStage completed exceptionally

**Implementation requirements:** The default implementation invokes `handle`,
relaying to `handleAsync` on exception, then `thenCompose` for result.

**Returns:** the new CompletionStage

**Since:** 12

## CompletionStage.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>, Executor)

```java
public default CompletionStage<T> exceptionallyComposeAsync (Function<Throwable, ? extends CompletionStage<T>> fn, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
exceptionally, is composed using the results of the supplied
function applied to this stage's exception, using the
supplied Executor.

Parameters:

- `fn`: the function to use to compute the returned CompletionStage if this CompletionStage completed exceptionally
- `executor`: the executor to use for asynchronous execution

**Implementation requirements:** The default implementation invokes `handle`,
relaying to `handleAsync` on exception, then `thenCompose` for result.

**Returns:** the new CompletionStage

**Since:** 12

## CompletionStage.toCompletableFuture()

```java
public CompletableFuture<T> toCompletableFuture()
```

Returns a `CompletableFuture` maintaining the same
completion properties as this stage. If this stage is already a
CompletableFuture, this method may return this stage itself.
Otherwise, invocation of this method may be equivalent in
effect to `thenApply(x -> x)`, but returning an instance
of type `CompletableFuture`.

**Returns:** the CompletableFuture
