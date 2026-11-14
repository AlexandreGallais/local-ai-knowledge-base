---
title: "Gatherer interface (java.util.stream) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Gatherer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Gatherer interface (java.util.stream) (part 2 of 2)

## Gatherer.integrate(A, T, Downstream<? super R>)

```java
boolean integrate(A state, T element, Downstream<? super R> downstream)
```

Performs an action given: the current state, the next element, and
a downstream object; potentially inspecting and/or updating
the state, optionally sending any number of elements downstream
-- and then returns whether more elements are to be consumed or not.

Parameters:

- `state`: The state to integrate into
- `element`: The element to integrate
- `downstream`: The downstream object of this integration

**Returns:** `true` if subsequent integration is desired,
        `false` if not

## Gatherer.of(Integrator)

```java
static <A, T, R> Integrator<A, T, R> of(Integrator<A, T, R> integrator)
```

Factory method for turning Integrator-shaped lambdas into
Integrators.

Parameters:

- `integrator`: a lambda to create as Integrator
- ``: the type of state used by this integrator
- `<T>`: the type of elements this integrator receives
- `<R>`: the type of results this integrator can produce

**Returns:** the given lambda as an Integrator

## Gatherer.ofGreedy(Greedy)

```java
static <A, T, R> Greedy<A, T, R> ofGreedy(Greedy<A, T, R> greedy)
```

Factory method for turning Integrator-shaped lambdas into
`Greedy` Integrators.

Parameters:

- `greedy`: a lambda to create as Integrator.Greedy
- ``: the type of state used by this integrator
- `<T>`: the type of elements this integrator receives
- `<R>`: the type of results this integrator can produce

**Returns:** the given lambda as a Greedy Integrator
