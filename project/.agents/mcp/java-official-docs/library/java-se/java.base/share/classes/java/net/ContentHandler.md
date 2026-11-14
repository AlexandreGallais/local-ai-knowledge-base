---
title: "ContentHandler class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ContentHandler.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ContentHandler class (java.net)

```java
public abstract class ContentHandler
```

The abstract class `ContentHandler` is the superclass
of all classes that read an `Object` from a
`URLConnection`.

An application does not generally call the
`getContent` method in this class directly. Instead, an
application calls the `getContent` method in class
`URL` or in `URLConnection`.
The application's content handler factory (an instance of a class that
implements the interface `ContentHandlerFactory` set up by a call to
setContentHandlerFactory) is called with a `String` giving the
MIME type of the object being received on the socket. The factory returns an
instance of a subclass of `ContentHandler`, and its
`getContent` method is called to create the object.

If no content handler could be found,
URLConnection will look for a content handler in a user-definable set of places.
Users can define a vertical-bar delimited set of class prefixes
to search through by defining the `java.content.handler.pkgs` system
property. The class name must be of the form:

    *{package-prefix}.{major}.{minor}*

    where *{major}.{minor}* is formed by taking the
    content-type string, replacing all slash characters with a
    `period` ('.'), and all other non-alphanumeric characters
    with the underscore character '`_`'. The alphanumeric
    characters are specifically the 26 uppercase ASCII letters
    '`A`' through '`Z`', the 26 lowercase ASCII
    letters '`a`' through '`z`', and the 10 ASCII
    digits '`0`' through '`9`'.

    e.g.
    YoyoDyne.experimental.text.plain

If no user-defined content handler is found, then the system
tries to load a specific *content-type* handler from one
of the built-in handlers, if one exists.

**See also:** java.net.ContentHandler#getContent(java.net.URLConnection)

**See also:** java.net.ContentHandlerFactory

**See also:** java.net.URL#getContent()

**See also:** java.net.URLConnection

**See also:** java.net.URLConnection#getContent()

**See also:** java.net.URLConnection#setContentHandlerFactory(java.net.ContentHandlerFactory)

**Since:** 1.0

## ContentHandler.ContentHandler()

```java
public ContentHandler()
```

Constructor for subclasses to call.

## ContentHandler.getContent(URLConnection)

```java
public abstract Object getContent(URLConnection urlc) throws IOException
```

Given a URL connect stream positioned at the beginning of the
representation of an object, this method reads that stream and
creates an object from it.

Parameters:

- `urlc`: a URL connection.

**Returns:** the object read by the `ContentHandler`.

Throws:

- `IOException`: if an I/O error occurs while reading the object.

## ContentHandler.getContent(URLConnection, Class[])

```java
public Object getContent(URLConnection urlc, Class[] classes) throws IOException
```

Given a URL connect stream positioned at the beginning of the
representation of an object, this method reads that stream and
creates an object that matches one of the types specified.

The default implementation of this method should call
`getContent(URLConnection)`
and screen the return type for a match of the suggested types.

Parameters:

- `urlc`: a URL connection.
- `classes`: an array of types requested

**Returns:** the object read by the `ContentHandler` that is
                the first match of the suggested types or
                `null` if none of the requested  are supported.

**Since:** 1.3

Throws:

- `IOException`: if an I/O error occurs while reading the object.
