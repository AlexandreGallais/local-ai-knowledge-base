---
title: "HttpRequest class (java.net.http) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpRequest.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpRequest class (java.net.http) (part 2 of 2)

## HttpRequest.ofByteArray(byte[], int, int)

```java
public static BodyPublisher ofByteArray(byte[] buf, int offset, int length)
```

Returns a request body publisher whose body is the content of the
given byte array of `length` bytes starting from the specified
`offset`.

Parameters:

- `buf`: the byte array containing the body
- `offset`: the offset of the first byte
- `length`: the number of bytes to use

**Returns:** a BodyPublisher

Throws:

- `IndexOutOfBoundsException`: if the sub-range is defined to be out of bounds

## HttpRequest.ofFile(Path)

```java
public static BodyPublisher ofFile(Path path) throws FileNotFoundException
```

A request body publisher that takes data from the contents of a File.

Parameters:

- `path`: the path to the file containing the body

**Returns:** a BodyPublisher

Throws:

- `java.io.FileNotFoundException`: if the path is not found

## HttpRequest.ofByteArrays(Iterable<byte[]>)

```java
public static BodyPublisher ofByteArrays(Iterable<byte[]> iter)
```

A request body publisher that takes data from an `Iterable`
of byte arrays. An `Iterable` is provided which supplies
`Iterator` instances. Each attempt to send the request results
in one invocation of the `Iterable`.

Parameters:

- `iter`: an Iterable of byte arrays

**Returns:** a BodyPublisher

## HttpRequest.noBody()

```java
public static BodyPublisher noBody()
```

A request body publisher which sends no request body.

**Returns:** a BodyPublisher which completes immediately and sends
        no request body.

## HttpRequest.concat(BodyPublisher...)

```java
public static BodyPublisher concat(BodyPublisher... publishers)
```

Returns a `BodyPublisher` that publishes a request
body consisting of the concatenation of the request bodies
published by a sequence of publishers.

 If the sequence is empty an empty publisher
is returned. Otherwise, if the sequence contains a single element,
that publisher is returned. Otherwise a *concatenation publisher*
is returned.

 The request body published by a *concatenation publisher*
is logically equivalent to the request body that would have
been published by concatenating all the bytes of each publisher
in sequence.

 Each publisher is lazily subscribed to in turn,
until all the body bytes are published, an error occurs, or the
concatenation publisher's subscription is cancelled.
The concatenation publisher may be subscribed to more than once,
which in turn may result in the publishers in the sequence being
subscribed to more than once.

 The concatenation publisher has a known content
length only if all publishers in the sequence have a known content
length. The contentLength
reported by the concatenation publisher is computed as follows:

-  If any of the publishers reports an *unknown* content length,
        or if the sum of the known content lengths would exceed
        `Long.MAX_VALUE`, the resulting
        content length is *unknown*.

-  Otherwise, the resulting content length is the sum of the
        known content lengths, a number between
        `0` and `Long.MAX_VALUE`, inclusive.

Parameters:

- `publishers`: a sequence of publishers.

**Implementation note:** If the concatenation publisher's subscription is
cancelled, or an error occurs
while publishing the bytes, not all publishers in the sequence may
be subscribed to.

**Returns:** An aggregate publisher that publishes a request body
logically equivalent to the concatenation of all bytes published
by each publisher in the sequence.

**Since:** 16
