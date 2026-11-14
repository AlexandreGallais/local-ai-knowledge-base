---
title: "Phaser class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Phaser.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Phaser class (java.util.concurrent) (part 2 of 2)

## Phaser.awaitAdvanceInterruptibly(int)

```java
public int awaitAdvanceInterruptibly(int phase) throws InterruptedException
```

Awaits the phase of this phaser to advance from the given phase
value, throwing `InterruptedException` if interrupted
while waiting, or returning immediately if the current phase is
not equal to the given phase value or this phaser is
terminated.

Parameters:

- `phase`: an arrival phase number, or negative value if terminated; this argument is normally the value returned by a previous call to `arrive` or `arriveAndDeregister`.

**Returns:** the next arrival phase number, or the argument if it is
negative, or the (negative) current phase
if terminated

Throws:

- `InterruptedException`: if thread interrupted while waiting

## Phaser.awaitAdvanceInterruptibly(int, long, TimeUnit)

```java
public int awaitAdvanceInterruptibly(int phase, long timeout, TimeUnit unit) throws InterruptedException, TimeoutException
```

Awaits the phase of this phaser to advance from the given phase
value or the given timeout to elapse, throwing `InterruptedException` if interrupted while waiting, or
returning immediately if the current phase is not equal to the
given phase value or this phaser is terminated.

Parameters:

- `phase`: an arrival phase number, or negative value if terminated; this argument is normally the value returned by a previous call to `arrive` or `arriveAndDeregister`.
- `timeout`: how long to wait before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** the next arrival phase number, or the argument if it is
negative, or the (negative) current phase
if terminated

Throws:

- `InterruptedException`: if thread interrupted while waiting
- `TimeoutException`: if timed out while waiting

## Phaser.forceTermination()

```java
public void forceTermination()
```

Forces this phaser to enter termination state.  Counts of
registered parties are unaffected.  If this phaser is a member
of a tiered set of phasers, then all of the phasers in the set
are terminated.  If this phaser is already terminated, this
method has no effect.  This method may be useful for
coordinating recovery after one or more tasks encounter
unexpected exceptions.

## Phaser.getPhase()

```java
public final int getPhase()
```

Returns the current phase number. The maximum phase number is
`Integer.MAX_VALUE`, after which it restarts at
zero. Upon termination, the phase number is negative,
in which case the prevailing phase prior to termination
may be obtained via `getPhase() + Integer.MIN_VALUE`.

**Returns:** the phase number, or a negative value if terminated

## Phaser.getRegisteredParties()

```java
public int getRegisteredParties()
```

Returns the number of parties registered at this phaser.

**Returns:** the number of parties

## Phaser.getArrivedParties()

```java
public int getArrivedParties()
```

Returns the number of registered parties that have arrived at
the current phase of this phaser. If this phaser has terminated,
the returned value is meaningless and arbitrary.

**Returns:** the number of arrived parties

## Phaser.getUnarrivedParties()

```java
public int getUnarrivedParties()
```

Returns the number of registered parties that have not yet
arrived at the current phase of this phaser. If this phaser has
terminated, the returned value is meaningless and arbitrary.

**Returns:** the number of unarrived parties

## Phaser.getParent()

```java
public Phaser getParent()
```

Returns the parent of this phaser, or `null` if none.

**Returns:** the parent of this phaser, or `null` if none

## Phaser.getRoot()

```java
public Phaser getRoot()
```

Returns the root ancestor of this phaser, which is the same as
this phaser if it has no parent.

**Returns:** the root ancestor of this phaser

## Phaser.isTerminated()

```java
public boolean isTerminated()
```

Returns `true` if this phaser has been terminated.

**Returns:** `true` if this phaser has been terminated

## Phaser.onAdvance(int, int)

```java
protected boolean onAdvance(int phase, int registeredParties)
```

Overridable method to perform an action upon impending phase
advance, and to control termination. This method is invoked
upon arrival of the party advancing this phaser (when all other
waiting parties are dormant).  If this method returns `true`, this phaser will be set to a final termination state
upon advance, and subsequent calls to `isTerminated`
will return true. Any (unchecked) Exception or Error thrown by
an invocation of this method is propagated to the party
attempting to advance this phaser, in which case no advance
occurs.

The arguments to this method provide the state of the phaser
prevailing for the current transition.  The effects of invoking
arrival, registration, and waiting methods on this phaser from
within `onAdvance` are unspecified and should not be
relied on.

If this phaser is a member of a tiered set of phasers, then
`onAdvance` is invoked only for its root phaser on each
advance.

To support the most common use cases, the default
implementation of this method returns `true` when the
number of registered parties has become zero as the result of a
party invoking `arriveAndDeregister`.  You can disable
this behavior, thus enabling continuation upon future
registrations, by overriding this method to always return
`false`:

```java
Phaser phaser = new Phaser() {
  protected boolean onAdvance(int phase, int parties) { return false; }
};
```

Parameters:

- `phase`: the current phase number on entry to this method, before this phaser is advanced
- `registeredParties`: the current number of registered parties

**Returns:** `true` if this phaser should terminate

## Phaser.toString()

```java
public String toString()
```

Returns a string identifying this phaser, as well as its
state.  The state, in brackets, includes the String `"phase = "` followed by the phase number, `"parties = "`
followed by the number of registered parties, and `"arrived = "` followed by the number of arrived parties.

**Returns:** a string identifying this phaser, as well as its state
