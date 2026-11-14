# ConstantPool interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantPool extends Iterable<PoolEntry> permits ClassReader, ConstantPoolBuilder
```

Provides read access to the constant pool and the bootstrap method table of a
{@code class} file.

<h2 id="index">Index in the Constant Pool</h2>
The constant pool entries are accessed by index.  A valid index is in the
range of {@link #size() [1, size())}.  It is {@linkplain PoolEntry#width()
unusable} if a {@link LongEntry} or {@link DoubleEntry} is at its previous
index.

@see BootstrapMethodsAttribute
@jvms 4.4 The Constant Pool
@sealedGraph
@since 24

## ConstantPool.entryByIndex(int)

```java
PoolEntry entryByIndex(int index)
```

{@return the entry at the specified index}

@apiNote
If only a particular type of entry is expected, use {@link #entryByIndex(
int, Class)}.

@param index the index within the pool of the desired entry
@throws ConstantPoolException if the index is out of range of the
        constant pool, or is considered unusable

## ConstantPool.size()

```java
int size()
```

{@return the exclusive upper bound of the valid indices of this constant
pool}  The actual number of entries is lower because {@code 0}, {@code
size()} are not valid, and a valid index may be unusable.

@see ##index Index in the Constant Pool

## ConstantPool.entryByIndex(int, Class<T>)

```java
<T extends PoolEntry> T entryByIndex(int index, Class<T> cls)
```

{@return the entry of a given type at the specified index}

@param <T> the entry type
@param index the index within the pool of the desired entry
@param cls the entry type
@throws ConstantPoolException if the index is out of range of the
        constant pool or considered unusable, or the entry is not
        of the given type

## ConstantPool.iterator()

```java
default Iterator<PoolEntry> iterator()
```

{@return an iterator over pool entries}

@apiNote
This skips any unusable index and is less error-prone than iterating by
raw index.  See <em>{@linkplain ##index Index in the Constant Pool}</em>.

## ConstantPool.bootstrapMethodEntry(int)

```java
BootstrapMethodEntry bootstrapMethodEntry(int index)
```

{@return the {@link BootstrapMethodEntry} at the specified index within
the bootstrap method table}

@param index the index within the bootstrap method table of the desired
             entry
@throws ConstantPoolException if the index is out of range of the
        bootstrap methods

## ConstantPool.bootstrapMethodCount()

```java
int bootstrapMethodCount()
```

{@return the number of entries in the bootstrap method table}