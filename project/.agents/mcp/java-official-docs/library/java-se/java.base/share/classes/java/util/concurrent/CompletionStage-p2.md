---
title: "CompletionStage interface (java.util.concurrent) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletionStage.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletionStage interface (java.util.concurrent) (part 2 of 3)

## CompletionStage.thenAcceptBothAsync(CompletionStage<? extends U>, BiConsumer<? super T, ? super U>, Executor)

```java
public <U> CompletionStage<Void> thenAcceptBothAsync (CompletionStage<? extends U> other, BiConsumer<? super T, ? super U> action, Executor executor)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed using the
supplied executor, with the two results as arguments to the
supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the type of the other CompletionStage's result

**Returns:** the new CompletionStage

## CompletionStage.runAfterBoth(CompletionStage<?>, Runnable)

```java
public CompletionStage<Void> runAfterBoth(CompletionStage<?> other, Runnable action)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, executes the given action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.runAfterBothAsync(CompletionStage<?>, Runnable)

```java
public CompletionStage<Void> runAfterBothAsync(CompletionStage<?> other, Runnable action)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, executes the given action
using this stage's default asynchronous execution facility.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.runAfterBothAsync(CompletionStage<?>, Runnable, Executor)

```java
public CompletionStage<Void> runAfterBothAsync(CompletionStage<?> other, Runnable action, Executor executor)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, executes the given action
using the supplied executor.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.applyToEither(CompletionStage<? extends T>, Function<? super T, U>)

```java
public <U> CompletionStage<U> applyToEither (CompletionStage<? extends T> other, Function<? super T, U> fn)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed with the
corresponding result as argument to the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.applyToEitherAsync(CompletionStage<? extends T>, Function<? super T, U>)

```java
public <U> CompletionStage<U> applyToEitherAsync (CompletionStage<? extends T> other, Function<? super T, U> fn)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed using this
stage's default asynchronous execution facility, with the
corresponding result as argument to the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.applyToEitherAsync(CompletionStage<? extends T>, Function<? super T, U>, Executor)

```java
public <U> CompletionStage<U> applyToEitherAsync (CompletionStage<? extends T> other, Function<? super T, U> fn, Executor executor)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed using the
supplied executor, with the corresponding result as argument to
the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.acceptEither(CompletionStage<? extends T>, Consumer<? super T>)

```java
public CompletionStage<Void> acceptEither (CompletionStage<? extends T> other, Consumer<? super T> action)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed with the
corresponding result as argument to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.acceptEitherAsync(CompletionStage<? extends T>, Consumer<? super T>)

```java
public CompletionStage<Void> acceptEitherAsync (CompletionStage<? extends T> other, Consumer<? super T> action)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed using this
stage's default asynchronous execution facility, with the
corresponding result as argument to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.acceptEitherAsync(CompletionStage<? extends T>, Consumer<? super T>, Executor)

```java
public CompletionStage<Void> acceptEitherAsync (CompletionStage<? extends T> other, Consumer<? super T> action, Executor executor)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, is executed using the
supplied executor, with the corresponding result as argument to
the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.runAfterEither(CompletionStage<?>, Runnable)

```java
public CompletionStage<Void> runAfterEither(CompletionStage<?> other, Runnable action)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, executes the given action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.runAfterEitherAsync(CompletionStage<?>, Runnable)

```java
public CompletionStage<Void> runAfterEitherAsync (CompletionStage<?> other, Runnable action)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, executes the given action
using this stage's default asynchronous execution facility.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.runAfterEitherAsync(CompletionStage<?>, Runnable, Executor)

```java
public CompletionStage<Void> runAfterEitherAsync (CompletionStage<?> other, Runnable action, Executor executor)
```

Returns a new CompletionStage that, when either this or the
other given stage complete normally, executes the given action
using the supplied executor.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.thenCompose(Function<? super T, ? extends CompletionStage>)

```java
public <U> CompletionStage<U> thenCompose (Function<? super T, ? extends CompletionStage<U>> fn)
```

Returns a new CompletionStage that is completed with the same
value as the CompletionStage returned by the given function.

When this stage completes normally, the given function is
invoked with this stage's result as the argument, returning
another CompletionStage.  When that stage completes normally,
the CompletionStage returned by this method is completed with
the same value.

To ensure progress, the supplied function must arrange
eventual completion of its result.

This method is analogous to
Optional.flatMap and
Stream.flatMap.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute another CompletionStage
- ``: the type of the returned CompletionStage's result

**Returns:** the new CompletionStage

## CompletionStage.thenComposeAsync(Function<? super T, ? extends CompletionStage>)

```java
public <U> CompletionStage<U> thenComposeAsync (Function<? super T, ? extends CompletionStage<U>> fn)
```

Returns a new CompletionStage that is completed with the same
value as the CompletionStage returned by the given function,
executed using this stage's default asynchronous execution
facility.

When this stage completes normally, the given function is
invoked with this stage's result as the argument, returning
another CompletionStage.  When that stage completes normally,
the CompletionStage returned by this method is completed with
the same value.

To ensure progress, the supplied function must arrange
eventual completion of its result.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute another CompletionStage
- ``: the type of the returned CompletionStage's result

**Returns:** the new CompletionStage

## CompletionStage.thenComposeAsync(Function<? super T, ? extends CompletionStage>, Executor)

```java
public <U> CompletionStage<U> thenComposeAsync (Function<? super T, ? extends CompletionStage<U>> fn, Executor executor)
```

Returns a new CompletionStage that is completed with the same
value as the CompletionStage returned by the given function,
executed using the supplied Executor.

When this stage completes normally, the given function is
invoked with this stage's result as the argument, returning
another CompletionStage.  When that stage completes normally,
the CompletionStage returned by this method is completed with
the same value.

To ensure progress, the supplied function must arrange
eventual completion of its result.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute another CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the type of the returned CompletionStage's result

**Returns:** the new CompletionStage

## CompletionStage.handle(BiFunction<? super T, Throwable, ? extends U>)

```java
public <U> CompletionStage<U> handle (BiFunction<? super T, Throwable, ? extends U> fn)
```

Returns a new CompletionStage that, when this stage completes
either normally or exceptionally, is executed with this stage's
result and exception as arguments to the supplied function.

When this stage is complete, the given function is invoked
with the result (or `null` if none) and the exception (or
`null` if none) of this stage as arguments, and the
function's result is used to complete the returned stage.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.handleAsync(BiFunction<? super T, Throwable, ? extends U>)

```java
public <U> CompletionStage<U> handleAsync (BiFunction<? super T, Throwable, ? extends U> fn)
```

Returns a new CompletionStage that, when this stage completes
either normally or exceptionally, is executed using this stage's
default asynchronous execution facility, with this stage's
result and exception as arguments to the supplied function.

When this stage is complete, the given function is invoked
with the result (or `null` if none) and the exception (or
`null` if none) of this stage as arguments, and the
function's result is used to complete the returned stage.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.handleAsync(BiFunction<? super T, Throwable, ? extends U>, Executor)

```java
public <U> CompletionStage<U> handleAsync (BiFunction<? super T, Throwable, ? extends U> fn, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
either normally or exceptionally, is executed using the
supplied executor, with this stage's result and exception as
arguments to the supplied function.

When this stage is complete, the given function is invoked
with the result (or `null` if none) and the exception (or
`null` if none) of this stage as arguments, and the
function's result is used to complete the returned stage.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the function's return type

**Returns:** the new CompletionStage
