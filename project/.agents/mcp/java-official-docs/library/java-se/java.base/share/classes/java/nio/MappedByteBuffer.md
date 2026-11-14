# MappedByteBuffer class (java.nio)

```java
public abstract sealed class MappedByteBuffer extends ByteBuffer permits DirectByteBuffer
```

A direct byte buffer whose content is a memory-mapped region of a file.

<p> Mapped byte buffers are created via the {@link
java.nio.channels.FileChannel#map FileChannel.map} method.  This class
extends the {@link ByteBuffer} class with operations that are specific to
memory-mapped file regions.

<p> A mapped byte buffer and the file mapping that it represents remain
valid until the buffer itself is garbage-collected.

<p> The content of a mapped byte buffer can change at any time, for example
if the content of the corresponding region of the mapped file is changed by
this program or another.  Whether or not such changes occur, and when they
occur, is operating-system dependent and therefore unspecified.

<a id="inaccess"></a><p> All or part of a mapped byte buffer may become
inaccessible at any time, for example if the mapped file is truncated.  An
attempt to access an inaccessible region of a mapped byte buffer will not
change the buffer's content and will cause an unspecified exception to be
thrown either at the time of the access or at some later time.  It is
therefore strongly recommended that appropriate precautions be taken to
avoid the manipulation of a mapped file by this program, or by a
concurrently running program, except to read or write the file's content.

<p> Mapped byte buffers otherwise behave no differently than ordinary direct
byte buffers. </p>


@author Mark Reinhold
@author JSR-51 Expert Group
@since 1.4

## MappedByteBuffer.isLoaded()

```java
public final boolean isLoaded()
```

Tells whether or not this buffer's content is resident in physical
memory.

<p> A return value of {@code true} implies that it is highly likely
that all of the data in this buffer is resident in physical memory and
may therefore be accessed without incurring any virtual-memory page
faults or I/O operations.  A return value of {@code false} does not
necessarily imply that the buffer's content is not resident in physical
memory.

<p> The returned value is a hint, rather than a guarantee, because the
underlying operating system may have paged out some of the buffer's data
by the time that an invocation of this method returns.  </p>

@return  {@code true} if it is likely that this buffer's content
         is resident in physical memory

## MappedByteBuffer.load()

```java
public final MappedByteBuffer load()
```

Loads this buffer's content into physical memory.

<p> This method makes a best effort to ensure that, when it returns,
this buffer's content is resident in physical memory.  Invoking this
method may cause some number of page faults and I/O operations to
occur. </p>

@return  This buffer

## MappedByteBuffer.force()

```java
public final MappedByteBuffer force()
```

Forces any changes made to this buffer's content to be written to the
storage device containing the mapped file.  The region starts at index
zero in this buffer and is {@code capacity()} bytes.  An invocation of
this method behaves in exactly the same way as the invocation
{@link force(int,int) force(0,capacity())}.

<p> If the file mapped into this buffer resides on a local storage
device then when this method returns it is guaranteed that all changes
made to the buffer since it was created, or since this method was last
invoked, will have been written to that device.

<p> If the file does not reside on a local device then no such guarantee
is made.

<p> If this buffer was not mapped in read/write mode ({@link
java.nio.channels.FileChannel.MapMode#READ_WRITE}) then
invoking this method may have no effect. In particular, the
method has no effect for buffers mapped in read-only or private
mapping modes. This method may or may not have an effect for
implementation-specific mapping modes. </p>

@throws UncheckedIOException
        If an I/O error occurs writing the buffer's content to the
        storage device containing the mapped file

@return  This buffer

## MappedByteBuffer.force(int, int)

```java
public final MappedByteBuffer force(int index, int length)
```

Forces any changes made to a region of this buffer's content to
be written to the storage device containing the mapped
file. The region starts at the given {@code index} in this
buffer and is {@code length} bytes.

<p> If the file mapped into this buffer resides on a local
storage device then when this method returns it is guaranteed
that all changes made to the selected region buffer since it
was created, or since this method was last invoked, will have
been written to that device. The force operation is free to
write bytes that lie outside the specified region, for example
to ensure that data blocks of some device-specific granularity
are transferred in their entirety.

<p> If the file does not reside on a local device then no such
guarantee is made.

<p> If this buffer was not mapped in read/write mode ({@link
java.nio.channels.FileChannel.MapMode#READ_WRITE}) then
invoking this method may have no effect. In particular, the
method has no effect for buffers mapped in read-only or private
mapping modes. This method may or may not have an effect for
implementation-specific mapping modes. </p>

@param  index
        The index of the first byte in the buffer region that is
        to be written back to storage; must be non-negative
        and less than {@code capacity()}

@param  length
        The length of the region in bytes; must be non-negative
        and no larger than {@code capacity() - index}

@throws IndexOutOfBoundsException
        if the preconditions on the index and length do not
        hold.

@throws UncheckedIOException
        If an I/O error occurs writing the buffer's content to the
        storage device containing the mapped file

@return  This buffer

@since 13

## MappedByteBuffer.position(int)

```java
public final MappedByteBuffer position(int newPosition)
```

{@inheritDoc}
@since 9

## MappedByteBuffer.limit(int)

```java
public final MappedByteBuffer limit(int newLimit)
```

{@inheritDoc}
@since 9

## MappedByteBuffer.mark()

```java
public final MappedByteBuffer mark()
```

{@inheritDoc}
@since 9

## MappedByteBuffer.reset()

```java
public final MappedByteBuffer reset()
```

{@inheritDoc}
@since 9

## MappedByteBuffer.clear()

```java
public final MappedByteBuffer clear()
```

{@inheritDoc}
@since 9

## MappedByteBuffer.flip()

```java
public final MappedByteBuffer flip()
```

{@inheritDoc}
@since 9

## MappedByteBuffer.rewind()

```java
public final MappedByteBuffer rewind()
```

{@inheritDoc}
@since 9

## MappedByteBuffer.slice()

```java
public abstract MappedByteBuffer slice()
```

{@inheritDoc}

<p> Reading bytes into physical memory by invoking {@code load()} on the
returned buffer, or writing bytes to the storage device by invoking
{@code force()} on the returned buffer, will only act on the sub-range
of this buffer that the returned buffer represents, namely
{@code [position(),limit())}.

@since 17

## MappedByteBuffer.slice(int, int)

```java
public abstract MappedByteBuffer slice(int index, int length)
```

{@inheritDoc}

<p> Reading bytes into physical memory by invoking {@code load()} on the
returned buffer, or writing bytes to the storage device by invoking
{@code force()} on the returned buffer, will only act on the sub-range
of this buffer that the returned buffer represents, namely
{@code [index,index+length)}, where {@code index} and {@code length} are
assumed to satisfy the preconditions.

@since 17

## MappedByteBuffer.duplicate()

```java
public abstract MappedByteBuffer duplicate()
```

{@inheritDoc}

@since 17

## MappedByteBuffer.compact()

```java
public abstract MappedByteBuffer compact()
```

{@inheritDoc}
@throws  ReadOnlyBufferException {@inheritDoc}

@since 17