# ConcurrentMap interface (java.util.concurrent)

```java
public interface ConcurrentMap<K,V> extends Map<K,V>
```

A {@link Map} providing thread safety and atomicity guarantees.

<p>To maintain the specified guarantees, default implementations of
methods including {@link #putIfAbsent} inherited from {@link Map}
must be overridden by implementations of this interface. Similarly,
implementations of the collections returned by methods {@link
#keySet}, {@link #values}, and {@link #entrySet} must override
methods such as {@code removeIf} when necessary to
preserve atomicity guarantees.

<p>Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
{@code ConcurrentMap} as a key or value
<a href="package-summary.html#MemoryVisibility"><i>happen-before</i></a>
actions subsequent to the access or removal of that object from
the {@code ConcurrentMap} in another thread.

<p>This interface is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.5
@author Doug Lea
@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

## ConcurrentMap.getOrDefault(Object, V)

```java
default V getOrDefault(Object key, V defaultValue)
```

{@inheritDoc}

@implNote This implementation assumes that the ConcurrentMap cannot
contain null values and {@code get()} returning null unambiguously means
the key is absent. Implementations which support null values
<strong>must</strong> override this default implementation.

@throws ClassCastException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@since 1.8

## ConcurrentMap.forEach(BiConsumer<? super K, ? super V>)

```java
default void forEach(BiConsumer<? super K, ? super V> action)
```

{@inheritDoc}

@implSpec The default implementation is equivalent to, for this
{@code map}:
<pre> {@code
for (Map.Entry<K,V> entry : map.entrySet()) {
  action.accept(entry.getKey(), entry.getValue());
}}</pre>

@implNote The default implementation assumes that
{@code IllegalStateException} thrown by {@code getKey()} or
{@code getValue()} indicates that the entry has been removed and cannot
be processed. Operation continues for subsequent entries.

@throws NullPointerException {@inheritDoc}
@since 1.8

## ConcurrentMap.putIfAbsent(K, V)

```java
V putIfAbsent(K key, V value)
```

If the specified key is not already associated
with a value, associates it with the given value.
This is equivalent to, for this {@code map}:
<pre> {@code
if (!map.containsKey(key))
  return map.put(key, value);
else
  return map.get(key);}</pre>

except that the action is performed atomically.

@implNote This implementation intentionally re-abstracts the
inappropriate default provided in {@code Map}.

@param key key with which the specified value is to be associated
@param value value to be associated with the specified key
@return the previous value associated with the specified key, or
        {@code null} if there was no mapping for the key.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with the key,
        if the implementation supports null values.)
@throws UnsupportedOperationException if the {@code put} operation
        is not supported by this map
@throws ClassCastException if the class of the specified key or value
        prevents it from being stored in this map
@throws NullPointerException if the specified key or value is null,
        and this map does not permit null keys or values
@throws IllegalArgumentException if some property of the specified key
        or value prevents it from being stored in this map

## ConcurrentMap.remove(Object, Object)

```java
boolean remove(Object key, Object value)
```

Removes the entry for a key only if currently mapped to a given value.
This is equivalent to, for this {@code map}:
<pre> {@code
if (map.containsKey(key)
    && Objects.equals(map.get(key), value)) {
  map.remove(key);
  return true;
} else {
  return false;
}}</pre>

except that the action is performed atomically.

@implNote This implementation intentionally re-abstracts the
inappropriate default provided in {@code Map}.

@param key key with which the specified value is associated
@param value value expected to be associated with the specified key
@return {@code true} if the value was removed
@throws UnsupportedOperationException if the {@code remove} operation
        is not supported by this map
@throws ClassCastException if the key or value is of an inappropriate
        type for this map
(<a href="{@docRoot}/java.base/java/util/Collection.html#optional-restrictions">optional</a>)
@throws NullPointerException if the specified key or value is null,
        and this map does not permit null keys or values
(<a href="{@docRoot}/java.base/java/util/Collection.html#optional-restrictions">optional</a>)

## ConcurrentMap.replace(K, V, V)

```java
boolean replace(K key, V oldValue, V newValue)
```

Replaces the entry for a key only if currently mapped to a given value.
This is equivalent to, for this {@code map}:
<pre> {@code
if (map.containsKey(key)
    && Objects.equals(map.get(key), oldValue)) {
  map.put(key, newValue);
  return true;
} else {
  return false;
}}</pre>

except that the action is performed atomically.

@implNote This implementation intentionally re-abstracts the
inappropriate default provided in {@code Map}.

@param key key with which the specified value is associated
@param oldValue value expected to be associated with the specified key
@param newValue value to be associated with the specified key
@return {@code true} if the value was replaced
@throws UnsupportedOperationException if the {@code put} operation
        is not supported by this map
@throws ClassCastException if the class of a specified key or value
        prevents it from being stored in this map
@throws NullPointerException if a specified key or value is null,
        and this map does not permit null keys or values
@throws IllegalArgumentException if some property of a specified key
        or value prevents it from being stored in this map

## ConcurrentMap.replace(K, V)

```java
V replace(K key, V value)
```

Replaces the entry for a key only if currently mapped to some value.
This is equivalent to, for this {@code map}:
<pre> {@code
if (map.containsKey(key))
  return map.put(key, value);
else
  return null;}</pre>

except that the action is performed atomically.

@implNote This implementation intentionally re-abstracts the
inappropriate default provided in {@code Map}.

@param key key with which the specified value is associated
@param value value to be associated with the specified key
@return the previous value associated with the specified key, or
        {@code null} if there was no mapping for the key.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with the key,
        if the implementation supports null values.)
@throws UnsupportedOperationException if the {@code put} operation
        is not supported by this map
@throws ClassCastException if the class of the specified key or value
        prevents it from being stored in this map
@throws NullPointerException if the specified key or value is null,
        and this map does not permit null keys or values
@throws IllegalArgumentException if some property of the specified key
        or value prevents it from being stored in this map

## ConcurrentMap.replaceAll(BiFunction<? super K, ? super V, ? extends V>)

```java
default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function)
```

{@inheritDoc}

@implSpec
<p>The default implementation is equivalent to, for this {@code map}:
<pre> {@code
for (Map.Entry<K,V> entry : map.entrySet()) {
  K k;
  V v;
  do {
    k = entry.getKey();
    v = entry.getValue();
  } while (!map.replace(k, v, function.apply(k, v)));
}}</pre>

The default implementation may retry these steps when multiple
threads attempt updates including potentially calling the function
repeatedly for a given key.

<p>This implementation assumes that the ConcurrentMap cannot contain null
values and {@code get()} returning null unambiguously means the key is
absent. Implementations which support null values <strong>must</strong>
override this default implementation.

@throws UnsupportedOperationException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@throws ClassCastException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ConcurrentMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
default V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

{@inheritDoc}

@implSpec
The default implementation is equivalent to the following steps for this
{@code map}:

<pre> {@code
V oldValue, newValue;
return ((oldValue = map.get(key)) == null
        && (newValue = mappingFunction.apply(key)) != null
        && (oldValue = map.putIfAbsent(key, newValue)) == null)
  ? newValue
  : oldValue;}</pre>

<p>This implementation assumes that the ConcurrentMap cannot contain null
values and {@code get()} returning null unambiguously means the key is
absent. Implementations which support null values <strong>must</strong>
override this default implementation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ConcurrentMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

@implSpec
The default implementation is equivalent to performing the following
steps for this {@code map}:

<pre> {@code
for (V oldValue; (oldValue = map.get(key)) != null; ) {
  V newValue = remappingFunction.apply(key, oldValue);
  if ((newValue == null)
      ? map.remove(key, oldValue)
      : map.replace(key, oldValue, newValue))
    return newValue;
}
return null;}</pre>
When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

<p>This implementation assumes that the ConcurrentMap cannot contain null
values and {@code get()} returning null unambiguously means the key is
absent. Implementations which support null values <strong>must</strong>
override this default implementation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ConcurrentMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

@implSpec
The default implementation is equivalent to performing the following
steps for this {@code map}:

<pre> {@code
for (;;) {
  V oldValue = map.get(key);
  V newValue = remappingFunction.apply(key, oldValue);
  if (newValue != null) {
    if ((oldValue != null)
      ? map.replace(key, oldValue, newValue)
      : map.putIfAbsent(key, newValue) == null)
      return newValue;
  } else if (oldValue == null || map.remove(key, oldValue)) {
    return null;
  }
}}</pre>
When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

<p>This implementation assumes that the ConcurrentMap cannot contain null
values and {@code get()} returning null unambiguously means the key is
absent. Implementations which support null values <strong>must</strong>
override this default implementation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ConcurrentMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
default V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

@implSpec
The default implementation is equivalent to performing the following
steps for this {@code map}:

<pre> {@code
for (;;) {
  V oldValue = map.get(key);
  if (oldValue != null) {
    V newValue = remappingFunction.apply(oldValue, value);
    if (newValue != null) {
      if (map.replace(key, oldValue, newValue))
        return newValue;
    } else if (map.remove(key, oldValue)) {
      return null;
    }
  } else if (map.putIfAbsent(key, value) == null) {
    return value;
  }
}}</pre>
When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

<p>This implementation assumes that the ConcurrentMap cannot contain null
values and {@code get()} returning null unambiguously means the key is
absent. Implementations which support null values <strong>must</strong>
override this default implementation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException {@inheritDoc}
@throws NullPointerException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8