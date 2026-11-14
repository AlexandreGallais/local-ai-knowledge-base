---
title: "Pipe class (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/Pipe.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Pipe class (java.nio.channels)

```java
public abstract class Pipe
```

A pair of channels that implements a unidirectional pipe.

 A pipe consists of a pair of channels: A writable sink channel and a readable source
channel.  Once some bytes are written to the sink channel they can be read
from the source channel in exactly the order in which they were written.

 Whether or not a thread writing bytes to a pipe will block until another
thread reads those bytes, or some previously-written bytes, from the pipe is
system-dependent and therefore unspecified.  Many pipe implementations will
buffer up to a certain number of bytes between the sink and source channels,
but such buffering should not be assumed.

**Since:** 1.4

## Pipe.SourceChannel(SelectorProvider)

```java
protected SourceChannel(SelectorProvider provider)
```

Constructs a new instance of this class.

Parameters:

- `provider`: The selector provider

## Pipe.validOps()

```java
public final int validOps()
```

Returns an operation set identifying this channel's supported
operations.

 Pipe-source channels only support reading, so this method
returns `SelectionKey.OP_READ`.

**Returns:** The valid-operation set

## Pipe.SinkChannel(SelectorProvider)

```java
protected SinkChannel(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The selector provider

## Pipe.validOps()

```java
public final int validOps()
```

Returns an operation set identifying this channel's supported
operations.

 Pipe-sink channels only support writing, so this method returns
`SelectionKey.OP_WRITE`.

**Returns:** The valid-operation set

## Pipe.Pipe()

```java
protected Pipe()
```

Initializes a new instance of this class.

## Pipe.source()

```java
public abstract SourceChannel source()
```

Returns this pipe's source channel.

**Returns:** This pipe's source channel

## Pipe.sink()

```java
public abstract SinkChannel sink()
```

Returns this pipe's sink channel.

**Returns:** This pipe's sink channel

## Pipe.open()

```java
public static Pipe open() throws IOException
```

Opens a pipe.

 The new pipe is created by invoking the openPipe method of the
system-wide default `java.nio.channels.spi.SelectorProvider`
object.

**Returns:** A new pipe

Throws:

- `IOException`: If an I/O error occurs
