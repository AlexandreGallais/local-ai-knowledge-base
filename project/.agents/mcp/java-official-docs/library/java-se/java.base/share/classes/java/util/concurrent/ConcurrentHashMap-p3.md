---
title: "ConcurrentHashMap class (java.util.concurrent) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentHashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentHashMap class (java.util.concurrent) (part 3 of 4)

## ConcurrentHashMap.reduce(long, BiFunction<? super K, ? super V, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduce(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, or null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case it is not combined)
- `reducer`: a commutative associative combining function
- ``: the return type of the transformer

**Returns:** the result of accumulating the given transformation
of all (key, value) pairs

**Since:** 1.8

## ConcurrentHashMap.reduceToDouble(long, ToDoubleBiFunction<? super K, ? super V>, double, DoubleBinaryOperator)

```java
public double reduceToDouble(long parallelismThreshold, ToDoubleBiFunction<? super K, ? super V> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all (key, value) pairs

**Since:** 1.8

## ConcurrentHashMap.reduceToLong(long, ToLongBiFunction<? super K, ? super V>, long, LongBinaryOperator)

```java
public long reduceToLong(long parallelismThreshold, ToLongBiFunction<? super K, ? super V> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all (key, value) pairs

**Since:** 1.8

## ConcurrentHashMap.reduceToInt(long, ToIntBiFunction<? super K, ? super V>, int, IntBinaryOperator)

```java
public int reduceToInt(long parallelismThreshold, ToIntBiFunction<? super K, ? super V> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all (key, value) pairs

**Since:** 1.8

## ConcurrentHashMap.forEachKey(long, Consumer<? super K>)

```java
public void forEachKey(long parallelismThreshold, Consumer<? super K> action)
```

Performs the given action for each key.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `action`: the action

**Since:** 1.8

## ConcurrentHashMap.forEachKey(long, Function<? super K, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachKey(long parallelismThreshold, Function<? super K, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each key.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case the action is not applied)
- `action`: the action
- ``: the return type of the transformer

**Since:** 1.8

## ConcurrentHashMap.searchKeys(long, Function<? super K, ? extends U>)

```java
public <U> U searchKeys(long parallelismThreshold, Function<? super K, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each key, or null if none. Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `searchFunction`: a function returning a non-null result on success, else null
- ``: the return type of the search function

**Returns:** a non-null result from applying the given search
function on each key, or null if none

**Since:** 1.8

## ConcurrentHashMap.reduceKeys(long, BiFunction<? super K, ? super K, ? extends K>)

```java
public K reduceKeys(long parallelismThreshold, BiFunction<? super K, ? super K, ? extends K> reducer)
```

Returns the result of accumulating all keys using the given
reducer to combine values, or null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating all keys using the given
reducer to combine values, or null if none

**Since:** 1.8

## ConcurrentHashMap.reduceKeys(long, Function<? super K, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceKeys(long parallelismThreshold, Function<? super K, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, or
null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case it is not combined)
- `reducer`: a commutative associative combining function
- ``: the return type of the transformer

**Returns:** the result of accumulating the given transformation
of all keys

**Since:** 1.8

## ConcurrentHashMap.reduceKeysToDouble(long, ToDoubleFunction<? super K>, double, DoubleBinaryOperator)

```java
public double reduceKeysToDouble(long parallelismThreshold, ToDoubleFunction<? super K> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all keys

**Since:** 1.8

## ConcurrentHashMap.reduceKeysToLong(long, ToLongFunction<? super K>, long, LongBinaryOperator)

```java
public long reduceKeysToLong(long parallelismThreshold, ToLongFunction<? super K> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all keys

**Since:** 1.8

## ConcurrentHashMap.reduceKeysToInt(long, ToIntFunction<? super K>, int, IntBinaryOperator)

```java
public int reduceKeysToInt(long parallelismThreshold, ToIntFunction<? super K> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all keys

**Since:** 1.8

## ConcurrentHashMap.forEachValue(long, Consumer<? super V>)

```java
public void forEachValue(long parallelismThreshold, Consumer<? super V> action)
```

Performs the given action for each value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `action`: the action

**Since:** 1.8

## ConcurrentHashMap.forEachValue(long, Function<? super V, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachValue(long parallelismThreshold, Function<? super V, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case the action is not applied)
- `action`: the action
- ``: the return type of the transformer

**Since:** 1.8

## ConcurrentHashMap.searchValues(long, Function<? super V, ? extends U>)

```java
public <U> U searchValues(long parallelismThreshold, Function<? super V, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each value, or null if none.  Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `searchFunction`: a function returning a non-null result on success, else null
- ``: the return type of the search function

**Returns:** a non-null result from applying the given search
function on each value, or null if none

**Since:** 1.8

## ConcurrentHashMap.reduceValues(long, BiFunction<? super V, ? super V, ? extends V>)

```java
public V reduceValues(long parallelismThreshold, BiFunction<? super V, ? super V, ? extends V> reducer)
```

Returns the result of accumulating all values using the
given reducer to combine values, or null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating all values

**Since:** 1.8

## ConcurrentHashMap.reduceValues(long, Function<? super V, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceValues(long parallelismThreshold, Function<? super V, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values, or
null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case it is not combined)
- `reducer`: a commutative associative combining function
- ``: the return type of the transformer

**Returns:** the result of accumulating the given transformation
of all values

**Since:** 1.8

## ConcurrentHashMap.reduceValuesToDouble(long, ToDoubleFunction<? super V>, double, DoubleBinaryOperator)

```java
public double reduceValuesToDouble(long parallelismThreshold, ToDoubleFunction<? super V> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all values

**Since:** 1.8

## ConcurrentHashMap.reduceValuesToLong(long, ToLongFunction<? super V>, long, LongBinaryOperator)

```java
public long reduceValuesToLong(long parallelismThreshold, ToLongFunction<? super V> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all values

**Since:** 1.8
