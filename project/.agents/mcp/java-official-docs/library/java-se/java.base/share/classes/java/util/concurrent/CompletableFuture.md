# CompletableFuture class (java.util.concurrent)

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T>
```

A {@link Future} that may be explicitly completed (setting its
value and status), and may be used as a {@link CompletionStage},
supporting dependent functions and actions that trigger upon its
completion.

<p>When two or more threads attempt to
{@link #complete complete},
{@link #completeExceptionally completeExceptionally}, or
{@link #cancel cancel}
a CompletableFuture, only one of them succeeds.

<p>In addition to these and related methods for directly
manipulating status and results, CompletableFuture implements
interface {@link CompletionStage} with the following policies: <ul>

<li>Actions supplied for dependent completions of
<em>non-async</em> methods may be performed by the thread that
completes the current CompletableFuture, or by any other caller of
a completion method.

<li>All <em>async</em> methods without an explicit Executor
argument, as well as those involving delays are performed using the
{@link ForkJoinPool#commonPool()}.  The default async Executor may
be overridden for non-static methods in subclasses by defining
method {@link #defaultExecutor()}. To simplify monitoring,
debugging, and tracking, all generated asynchronous tasks are
instances of the marker interface {@link
AsynchronousCompletionTask}.  Operations with time-delays can use
adapter methods defined in this class, for example: {@code
supplyAsync(supplier, delayedExecutor(timeout, timeUnit))}.

<li>All CompletionStage methods are implemented independently of
other public methods, so the behavior of one method is not impacted
by overrides of others in subclasses.

<li>All CompletionStage methods return CompletableFutures.  To
restrict usages to only those methods defined in interface
CompletionStage, use method {@link #minimalCompletionStage}. Or to
ensure only that clients do not themselves modify a future, use
method {@link #copy}.
</ul>

<p>CompletableFuture also implements {@link Future} with the following
policies: <ul>

<li>Since (unlike {@link FutureTask}) this class has no direct
control over the computation that causes it to be completed,
cancellation is treated as just another form of exceptional
completion.  Method {@link #cancel cancel} has the same effect as
{@code completeExceptionally(new CancellationException())}. Method
{@link #isCompletedExceptionally} can be used to determine if a
CompletableFuture completed in any exceptional fashion.

<li>In case of exceptional completion with a CompletionException,
methods {@link #get()} and {@link #get(long, TimeUnit)} throw an
{@link ExecutionException} with the same cause as held in the
corresponding CompletionException.  To simplify usage in most
contexts, this class also defines methods {@link #join()} and
{@link #getNow} that instead throw the CompletionException directly
in these cases.
</ul>

<p>Arguments used to pass a completion result (that is, for
parameters of type {@code T}) for methods accepting them may be
null, but passing a null value for any other parameter will result
in a {@link NullPointerException} being thrown.

<p>Subclasses of this class should normally override the "virtual
constructor" method {@link #newIncompleteFuture}, which establishes
the concrete type returned by CompletionStage methods. For example,
here is a class that substitutes a different default Executor and
disables the {@code obtrude} methods:

<pre> {@code
class MyCompletableFuture<T> extends CompletableFuture<T> {
  static final Executor myExecutor = ...;
  public MyCompletableFuture() { }
  public <U> CompletableFuture<U> newIncompleteFuture() {
    return new MyCompletableFuture<U>(); }
  public Executor defaultExecutor() {
    return myExecutor; }
  public void obtrudeValue(T value) {
    throw new UnsupportedOperationException(); }
  public void obtrudeException(Throwable ex) {
    throw new UnsupportedOperationException(); }
}}</pre>

@author Doug Lea
@param <T> The result type returned by this future's {@code join}
and {@code get} methods
@since 1.8

## CompletableFuture.CompletableFuture()

```java
public CompletableFuture()
```

Creates a new incomplete CompletableFuture.

## CompletableFuture.supplyAsync(Supplier<U>)

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the {@link ForkJoinPool#commonPool()} with
the value obtained by calling the given Supplier.

@param supplier a function returning the value to be used
to complete the returned CompletableFuture
@param <U> the function's return type
@return the new CompletableFuture

## CompletableFuture.supplyAsync(Supplier<U>, Executor)

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the given executor with the value obtained
by calling the given Supplier.

@param supplier a function returning the value to be used
to complete the returned CompletableFuture
@param executor the executor to use for asynchronous execution
@param <U> the function's return type
@return the new CompletableFuture

## CompletableFuture.runAsync(Runnable)

```java
public static CompletableFuture<Void> runAsync(Runnable runnable)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the {@link ForkJoinPool#commonPool()} after
it runs the given action.

@param runnable the action to run before completing the
returned CompletableFuture
@return the new CompletableFuture

## CompletableFuture.runAsync(Runnable, Executor)

```java
public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the given executor after it runs the given
action.

@param runnable the action to run before completing the
returned CompletableFuture
@param executor the executor to use for asynchronous execution
@return the new CompletableFuture

## CompletableFuture.completedFuture(U)

```java
public static <U> CompletableFuture<U> completedFuture(U value)
```

Returns a new CompletableFuture that is already completed with
the given value.

@param value the value
@param <U> the type of the value
@return the completed CompletableFuture

## CompletableFuture.isDone()

```java
public boolean isDone()
```

Returns {@code true} if completed in any fashion: normally,
exceptionally, or via cancellation.

@return {@code true} if completed

## CompletableFuture.get()

```java
public T get() throws InterruptedException, ExecutionException
```

Waits if necessary for this future to complete, and then
returns its result.

@return the result value
@throws CancellationException if this future was cancelled
@throws ExecutionException if this future completed exceptionally
@throws InterruptedException if the current thread was interrupted
while waiting

## CompletableFuture.get(long, TimeUnit)

```java
public T get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Waits if necessary for at most the given time for this future
to complete, and then returns its result, if available.

@param timeout the maximum time to wait
@param unit the time unit of the timeout argument
@return the result value
@throws CancellationException if this future was cancelled
@throws ExecutionException if this future completed exceptionally
@throws InterruptedException if the current thread was interrupted
while waiting
@throws TimeoutException if the wait timed out

## CompletableFuture.join()

```java
public T join()
```

Returns the result value when complete, or throws an
(unchecked) exception if completed exceptionally. To better
conform with the use of common functional forms, if a
computation involved in the completion of this
CompletableFuture threw an exception, this method throws an
(unchecked) {@link CompletionException} with the underlying
exception as its cause.

@return the result value
@throws CancellationException if the computation was cancelled
@throws CompletionException if this future completed
exceptionally or a completion computation threw an exception

## CompletableFuture.getNow(T)

```java
public T getNow(T valueIfAbsent)
```

Returns the result value (or throws any encountered exception)
if completed, else returns the given valueIfAbsent.

@param valueIfAbsent the value to return if not completed
@return the result value, if completed, else the given valueIfAbsent
@throws CancellationException if the computation was cancelled
@throws CompletionException if this future completed
exceptionally or a completion computation threw an exception

## CompletableFuture.resultNow()

```java
public T resultNow()
```

@since 19

## CompletableFuture.exceptionNow()

```java
public Throwable exceptionNow()
```

@since 19

## CompletableFuture.complete(T)

```java
public boolean complete(T value)
```

If not already completed, sets the value returned by {@link
#get()} and related methods to the given value.

@param value the result value
@return {@code true} if this invocation caused this CompletableFuture
to transition to a completed state, else {@code false}

## CompletableFuture.completeExceptionally(Throwable)

```java
public boolean completeExceptionally(Throwable ex)
```

If not already completed, causes invocations of {@link #get()}
and related methods to throw the given exception.

@param ex the exception
@return {@code true} if this invocation caused this CompletableFuture
to transition to a completed state, else {@code false}

## CompletableFuture.toCompletableFuture()

```java
public CompletableFuture<T> toCompletableFuture()
```

Returns this CompletableFuture.

@return this CompletableFuture

## CompletableFuture.exceptionallyAsync(Function<Throwable, ? extends T>)

```java
public CompletableFuture<T> exceptionallyAsync( Function<Throwable, ? extends T> fn)
```

@since 12

## CompletableFuture.exceptionallyAsync(Function<Throwable, ? extends T>, Executor)

```java
public CompletableFuture<T> exceptionallyAsync( Function<Throwable, ? extends T> fn, Executor executor)
```

@since 12

## CompletableFuture.exceptionallyCompose(Function<Throwable, ? extends CompletionStage<T>>)

```java
public CompletableFuture<T> exceptionallyCompose( Function<Throwable, ? extends CompletionStage<T>> fn)
```

@since 12

## CompletableFuture.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>)

```java
public CompletableFuture<T> exceptionallyComposeAsync( Function<Throwable, ? extends CompletionStage<T>> fn)
```

@since 12

## CompletableFuture.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>, Executor)

```java
public CompletableFuture<T> exceptionallyComposeAsync( Function<Throwable, ? extends CompletionStage<T>> fn, Executor executor)
```

@since 12

## CompletableFuture.allOf(CompletableFuture<?>...)

```java
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs)
```

Returns a new CompletableFuture that is completed when all of
the given CompletableFutures complete.  If any of the given
CompletableFutures complete exceptionally, then the returned
CompletableFuture also does so, with a CompletionException
holding this exception as its cause.  Otherwise, the results,
if any, of the given CompletableFutures are not reflected in
the returned CompletableFuture, but may be obtained by
inspecting them individually. If no CompletableFutures are
provided, returns a CompletableFuture completed with the value
{@code null}.

<p>Among the applications of this method is to await completion
of a set of independent CompletableFutures before continuing a
program, as in: {@code CompletableFuture.allOf(c1, c2,
c3).join();}.

@param cfs the CompletableFutures
@return a new CompletableFuture that is completed when all of the
given CompletableFutures complete
@throws NullPointerException if the array or any of its elements are
{@code null}

## CompletableFuture.anyOf(CompletableFuture<?>...)

```java
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs)
```

Returns a new CompletableFuture that is completed when any of
the given CompletableFutures complete, with the same result.
Otherwise, if it completed exceptionally, the returned
CompletableFuture also does so, with a CompletionException
holding this exception as its cause.  If no CompletableFutures
are provided, returns an incomplete CompletableFuture.

@param cfs the CompletableFutures
@return a new CompletableFuture that is completed with the
result or exception of any of the given CompletableFutures when
one completes
@throws NullPointerException if the array or any of its elements are
{@code null}

## CompletableFuture.cancel(boolean)

```java
public boolean cancel(boolean mayInterruptIfRunning)
```

If not already completed, completes this CompletableFuture with
a {@link CancellationException}. Dependent CompletableFutures
that have not already completed will also complete
exceptionally, with a {@link CompletionException} caused by
this {@code CancellationException}.

@param mayInterruptIfRunning this value has no effect in this
implementation because interrupts are not used to control
processing.

@return {@code true} if this task is now cancelled

## CompletableFuture.isCancelled()

```java
public boolean isCancelled()
```

Returns {@code true} if this CompletableFuture was cancelled
before it completed normally.

@return {@code true} if this CompletableFuture was cancelled
before it completed normally

## CompletableFuture.isCompletedExceptionally()

```java
public boolean isCompletedExceptionally()
```

Returns {@code true} if this CompletableFuture completed
exceptionally, in any way. Possible causes include
cancellation, explicit invocation of {@code
completeExceptionally}, and abrupt termination of a
CompletionStage action.

@return {@code true} if this CompletableFuture completed
exceptionally

## CompletableFuture.state()

```java
public State state()
```

@since 19

## CompletableFuture.obtrudeValue(T)

```java
public void obtrudeValue(T value)
```

Forcibly sets or resets the value subsequently returned by
method {@link #get()} and related methods, whether or not
already completed. This method is designed for use only in
error recovery actions, and even in such situations may result
in ongoing dependent completions using established versus
overwritten outcomes.

@param value the completion value

## CompletableFuture.obtrudeException(Throwable)

```java
public void obtrudeException(Throwable ex)
```

Forcibly causes subsequent invocations of method {@link #get()}
and related methods to throw the given exception, whether or
not already completed. This method is designed for use only in
error recovery actions, and even in such situations may result
in ongoing dependent completions using established versus
overwritten outcomes.

@param ex the exception
@throws NullPointerException if the exception is null

## CompletableFuture.getNumberOfDependents()

```java
public int getNumberOfDependents()
```

Returns the estimated number of CompletableFutures whose
completions are awaiting completion of this CompletableFuture.
This method is designed for use in monitoring system state, not
for synchronization control.

@return the number of dependent CompletableFutures

## CompletableFuture.toString()

```java
public String toString()
```

Returns a string identifying this CompletableFuture, as well as
its completion state.  The state, in brackets, contains the
String {@code "Completed normally"} or the String {@code
"Completed exceptionally"}, or the String {@code "Not
completed"} followed by the number of CompletableFutures
dependent upon its completion, if any.

@return a string identifying this CompletableFuture, as well as its state

## CompletableFuture.newIncompleteFuture()

```java
public <U> CompletableFuture<U> newIncompleteFuture()
```

Returns a new incomplete CompletableFuture of the type to be
returned by a CompletionStage method. Subclasses should
normally override this method to return an instance of the same
class as this CompletableFuture. The default implementation
returns an instance of class CompletableFuture.

@param <U> the type of the value
@return a new CompletableFuture
@since 9

## CompletableFuture.defaultExecutor()

```java
public Executor defaultExecutor()
```

Returns the default Executor used for async methods that do not
specify an Executor. This class uses the {@link
ForkJoinPool#commonPool()} if it supports more than one
parallel thread, or else an Executor using one thread per async
task.  This method may be overridden in subclasses to return
an Executor that provides at least one independent thread.

@return the executor
@since 9

## CompletableFuture.copy()

```java
public CompletableFuture<T> copy()
```

Returns a new CompletableFuture that is completed normally with
the same value as this CompletableFuture when it completes
normally. If this CompletableFuture completes exceptionally,
then the returned CompletableFuture completes exceptionally
with a CompletionException with this exception as cause. The
behavior is equivalent to {@code thenApply(x -> x)}. This
method may be useful as a form of "defensive copying", to
prevent clients from completing, while still being able to
arrange dependent actions.

@return the new CompletableFuture
@since 9

## CompletableFuture.minimalCompletionStage()

```java
public CompletionStage<T> minimalCompletionStage()
```

Returns a new CompletionStage that is completed normally with
the same value as this CompletableFuture when it completes
normally, and cannot be independently completed or otherwise
used in ways not defined by the methods of interface {@link
CompletionStage}.  If this CompletableFuture completes
exceptionally, then the returned CompletionStage completes
exceptionally with a CompletionException with this exception as
cause.

<p>Unless overridden by a subclass, a new non-minimal
CompletableFuture with all methods available can be obtained from
a minimal CompletionStage via {@link #toCompletableFuture()}.
For example, completion of a minimal stage can be awaited by

<pre> {@code minimalStage.toCompletableFuture().join(); }</pre>

@return the new CompletionStage
@since 9

## CompletableFuture.completeAsync(Supplier<? extends T>, Executor)

```java
public CompletableFuture<T> completeAsync(Supplier<? extends T> supplier, Executor executor)
```

Completes this CompletableFuture with the result of
the given Supplier function invoked from an asynchronous
task using the given executor.

@param supplier a function returning the value to be used
to complete this CompletableFuture
@param executor the executor to use for asynchronous execution
@return this CompletableFuture
@since 9

## CompletableFuture.completeAsync(Supplier<? extends T>)

```java
public CompletableFuture<T> completeAsync(Supplier<? extends T> supplier)
```

Completes this CompletableFuture with the result of the given
Supplier function invoked from an asynchronous task using the
default executor.

@param supplier a function returning the value to be used
to complete this CompletableFuture
@return this CompletableFuture
@since 9

## CompletableFuture.orTimeout(long, TimeUnit)

```java
public CompletableFuture<T> orTimeout(long timeout, TimeUnit unit)
```

Exceptionally completes this CompletableFuture with
a {@link TimeoutException} if not otherwise completed
before the given timeout elapsed.

@param timeout how long to wait before completing exceptionally
       with a TimeoutException, in units of {@code unit}
@param unit a {@code TimeUnit} determining how to interpret the
       {@code timeout} parameter
@return this CompletableFuture
@since 9

## CompletableFuture.completeOnTimeout(T, long, TimeUnit)

```java
public CompletableFuture<T> completeOnTimeout(T value, long timeout, TimeUnit unit)
```

Completes this CompletableFuture with the given value if not
otherwise completed before the given timeout elapsed.

@param value the value to use upon timeout
@param timeout how long to wait before completing normally
       with the given value, in units of {@code unit}
@param unit a {@code TimeUnit} determining how to interpret the
       {@code timeout} parameter
@return this CompletableFuture
@since 9

## CompletableFuture.delayedExecutor(long, TimeUnit, Executor)

```java
public static Executor delayedExecutor(long delay, TimeUnit unit, Executor executor)
```

Returns a new Executor that submits a task to the given base
executor after the given delay (or no delay if non-positive).
Each delay commences upon invocation of the returned executor's
{@code execute} method.

@param delay how long to delay, in units of {@code unit}
@param unit a {@code TimeUnit} determining how to interpret the
       {@code delay} parameter
@param executor the base executor
@return the new delayed executor
@since 9

## CompletableFuture.delayedExecutor(long, TimeUnit)

```java
public static Executor delayedExecutor(long delay, TimeUnit unit)
```

Returns a new Executor that submits a task to the default
executor after the given delay (or no delay if non-positive).
Each delay commences upon invocation of the returned executor's
{@code execute} method.

@param delay how long to delay, in units of {@code unit}
@param unit a {@code TimeUnit} determining how to interpret the
       {@code delay} parameter
@return the new delayed executor
@since 9

## CompletableFuture.completedStage(U)

```java
public static <U> CompletionStage<U> completedStage(U value)
```

Returns a new CompletionStage that is already completed with
the given value and supports only those methods in
interface {@link CompletionStage}.

@param value the value
@param <U> the type of the value
@return the completed CompletionStage
@since 9

## CompletableFuture.failedFuture(Throwable)

```java
public static <U> CompletableFuture<U> failedFuture(Throwable ex)
```

Returns a new CompletableFuture that is already completed
exceptionally with the given exception.

@param ex the exception
@param <U> the type of the value
@return the exceptionally completed CompletableFuture
@since 9

## CompletableFuture.failedStage(Throwable)

```java
public static <U> CompletionStage<U> failedStage(Throwable ex)
```

Returns a new CompletionStage that is already completed
exceptionally with the given exception and supports only those
methods in interface {@link CompletionStage}.

@param ex the exception
@param <U> the type of the value
@return the exceptionally completed CompletionStage
@since 9