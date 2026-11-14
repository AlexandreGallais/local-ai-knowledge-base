---
title: "CompletionStage interface (java.util.concurrent) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletionStage.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletionStage interface (java.util.concurrent)

```java
public interface CompletionStage<T>
```

A stage of a possibly asynchronous computation, that performs an
action or computes a value when another CompletionStage completes.
A stage completes upon termination of its computation, but this may
in turn trigger other dependent stages.  The functionality defined
in this interface takes only a few basic forms, which expand out to
a larger set of methods to capture a range of usage styles:

- The computation performed by a stage may be expressed as a
Function, Consumer, or Runnable (using methods with names including
*apply*, *accept*, or *run*, respectively)
depending on whether it requires arguments and/or produces results.
For example:

```java
stage.thenApply(x -> square(x))
     .thenAccept(x -> System.out.print(x))
     .thenRun(() -> System.out.println());
```

An additional form (*compose*) allows the construction of
computation pipelines from functions returning completion stages.

Any argument to a stage's computation is the outcome of a
triggering stage's computation.

- One stage's execution may be triggered by completion of a
single stage, or both of two stages, or either of two stages.
Dependencies on a single stage are arranged using methods with
prefix *then*. Those triggered by completion of
*both* of two stages may *combine* their results or
effects, using correspondingly named methods. Those triggered by
*either* of two stages make no guarantees about which of the
results or effects are used for the dependent stage's computation.

- Dependencies among stages control the triggering of
computations, but do not otherwise guarantee any particular
ordering. Additionally, execution of a new stage's computations may
be arranged in any of three ways: default execution, default
asynchronous execution (using methods with suffix *async*
that employ the stage's default asynchronous execution facility),
or custom (via a supplied `Executor`).  The execution
properties of default and async modes are specified by
CompletionStage implementations, not this interface. Methods with
explicit Executor arguments may have arbitrary execution
properties, and might not even support concurrent execution, but
are arranged for processing in a way that accommodates asynchrony.

- Two method forms (handle and whenComplete) support unconditional computation
whether the triggering stage completed normally or exceptionally.
Method exceptionally supports computation
only when the triggering stage completes exceptionally, computing a
replacement result, similarly to the java `catch` keyword.
In all other cases, if a stage's computation terminates abruptly
with an (unchecked) exception or error, then all dependent stages
requiring its completion complete exceptionally as well, with a
`CompletionException` holding the exception as its cause.  If
a stage is dependent on *both* of two stages, and both
complete exceptionally, then the CompletionException may correspond
to either one of these exceptions.  If a stage is dependent on
*either* of two others, and only one of them completes
exceptionally, no guarantees are made about whether the dependent
stage completes normally or exceptionally. In the case of method
`whenComplete`, when the supplied action itself encounters an
exception, then the stage completes exceptionally with this
exception unless the source stage also completed exceptionally, in
which case the exceptional completion from the source stage is
given preference and propagated to the dependent stage.

All methods adhere to the above triggering, execution, and
exceptional completion specifications (which are not repeated in
individual method specifications). Additionally, while arguments
used to pass a completion result (that is, for parameters of type
`T`) for methods accepting them may be null, passing a null
value for any other parameter will result in a `NullPointerException` being thrown.

Method form handle is the most general way of
creating a continuation stage, unconditionally performing a
computation that is given both the result and exception (if any) of
the triggering CompletionStage, and computing an arbitrary result.
Method whenComplete is similar, but preserves
the result of the triggering stage instead of computing a new one.
Because a stage's normal result may be `null`, both methods
should have a computation structured thus:

```java
(result, exception) -> {
  if (exception == null) {
    // triggering stage completed normally
  } else {
    // triggering stage completed exceptionally
  }
}
```

This interface does not define methods for initially creating,
forcibly completing normally or exceptionally, probing completion
status or results, or awaiting completion of a stage.
Implementations of CompletionStage may provide means of achieving
such effects, as appropriate.  Method `toCompletableFuture`
enables interoperability among different implementations of this
interface by providing a common conversion type.

Parameters:

- `<T>`: the type of values the stage produces or consumes

**Since:** 1.8

## CompletionStage.thenApply(Function<? super T,? extends U>)

```java
public <U> CompletionStage<U> thenApply(Function<? super T,? extends U> fn)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed with this stage's result as the argument
to the supplied function.

This method is analogous to
Optional.map and
Stream.map.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenApplyAsync(Function<? super T,? extends U>)

```java
public <U> CompletionStage<U> thenApplyAsync (Function<? super T,? extends U> fn)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed using this stage's default asynchronous
execution facility, with this stage's result as the argument to
the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenApplyAsync(Function<? super T,? extends U>, Executor)

```java
public <U> CompletionStage<U> thenApplyAsync (Function<? super T,? extends U> fn, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed using the supplied Executor, with this
stage's result as the argument to the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `fn`: the function to use to compute the value of the returned CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenAccept(Consumer<? super T>)

```java
public CompletionStage<Void> thenAccept(Consumer<? super T> action)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed with this stage's result as the argument
to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.thenAcceptAsync(Consumer<? super T>)

```java
public CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed using this stage's default asynchronous
execution facility, with this stage's result as the argument to
the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.thenAcceptAsync(Consumer<? super T>, Executor)

```java
public CompletionStage<Void> thenAcceptAsync(Consumer<? super T> action, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
normally, is executed using the supplied Executor, with this
stage's result as the argument to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.thenRun(Runnable)

```java
public CompletionStage<Void> thenRun(Runnable action)
```

Returns a new CompletionStage that, when this stage completes
normally, executes the given action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.thenRunAsync(Runnable)

```java
public CompletionStage<Void> thenRunAsync(Runnable action)
```

Returns a new CompletionStage that, when this stage completes
normally, executes the given action using this stage's default
asynchronous execution facility.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage

**Returns:** the new CompletionStage

## CompletionStage.thenRunAsync(Runnable, Executor)

```java
public CompletionStage<Void> thenRunAsync(Runnable action, Executor executor)
```

Returns a new CompletionStage that, when this stage completes
normally, executes the given action using the supplied Executor.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `action`: the action to perform before completing the returned CompletionStage
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletionStage

## CompletionStage.thenCombine(CompletionStage<? extends U>, BiFunction<? super T,? super U,? extends V>)

```java
public <U,V> CompletionStage<V> thenCombine (CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed with the two
results as arguments to the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the type of the other CompletionStage's result
- `<V>`: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenCombineAsync(CompletionStage<? extends U>, BiFunction<? super T,? super U,? extends V>)

```java
public <U,V> CompletionStage<V> thenCombineAsync (CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed using this
stage's default asynchronous execution facility, with the two
results as arguments to the supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- ``: the type of the other CompletionStage's result
- `<V>`: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenCombineAsync(CompletionStage<? extends U>, BiFunction<? super T,? super U,? extends V>, Executor)

```java
public <U,V> CompletionStage<V> thenCombineAsync (CompletionStage<? extends U> other, BiFunction<? super T,? super U,? extends V> fn, Executor executor)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed using the
supplied executor, with the two results as arguments to the
supplied function.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `fn`: the function to use to compute the value of the returned CompletionStage
- `executor`: the executor to use for asynchronous execution
- ``: the type of the other CompletionStage's result
- `<V>`: the function's return type

**Returns:** the new CompletionStage

## CompletionStage.thenAcceptBoth(CompletionStage<? extends U>, BiConsumer<? super T, ? super U>)

```java
public <U> CompletionStage<Void> thenAcceptBoth (CompletionStage<? extends U> other, BiConsumer<? super T, ? super U> action)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed with the two
results as arguments to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- ``: the type of the other CompletionStage's result

**Returns:** the new CompletionStage

## CompletionStage.thenAcceptBothAsync(CompletionStage<? extends U>, BiConsumer<? super T, ? super U>)

```java
public <U> CompletionStage<Void> thenAcceptBothAsync (CompletionStage<? extends U> other, BiConsumer<? super T, ? super U> action)
```

Returns a new CompletionStage that, when this and the other
given stage both complete normally, is executed using this
stage's default asynchronous execution facility, with the two
results as arguments to the supplied action.

See the `CompletionStage` documentation for rules
covering exceptional completion.

Parameters:

- `other`: the other CompletionStage
- `action`: the action to perform before completing the returned CompletionStage
- ``: the type of the other CompletionStage's result

**Returns:** the new CompletionStage
