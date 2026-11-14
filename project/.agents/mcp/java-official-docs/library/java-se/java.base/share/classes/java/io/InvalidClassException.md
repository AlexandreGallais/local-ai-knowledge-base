---
title: "InvalidClassException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InvalidClassException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidClassException class (java.io)

```java
public class InvalidClassException extends ObjectStreamException
```

Thrown when the Serialization runtime detects one of the following
problems with a Class.

-  The serial version of the class does not match that of the class
     descriptor read from the stream

-  The class contains unknown datatypes

-  The class does not have an accessible no-arg constructor

-  The ObjectStreamClass of an enum constant does not represent
     an enum type

-  Other conditions given in the *Java Object Serialization
     Specification*

**Since:** 1.1

## InvalidClassException.classname

```java
public String classname
```

Name of the invalid class.

## InvalidClassException.InvalidClassException(String)

```java
public InvalidClassException(String reason)
```

Report an InvalidClassException for the reason specified.

Parameters:

- `reason`: String describing the reason for the exception.

## InvalidClassException.InvalidClassException(String, String)

```java
public InvalidClassException(String cname, String reason)
```

Constructs an InvalidClassException object.

Parameters:

- `cname`: a String naming the invalid class.
- `reason`: a String describing the reason for the exception.

## InvalidClassException.InvalidClassException(String, Throwable)

```java
public InvalidClassException(String reason, Throwable cause)
```

Report an InvalidClassException for the reason and cause specified.

Parameters:

- `reason`: String describing the reason for the exception.
- `cause`: the cause

**Since:** 19

## InvalidClassException.InvalidClassException(String, String, Throwable)

```java
public InvalidClassException(String cname, String reason, Throwable cause)
```

Report an InvalidClassException for the reason and cause specified.

Parameters:

- `cname`: a String naming the invalid class.
- `reason`: String describing the reason for the exception.
- `cause`: the cause

**Since:** 19

## InvalidClassException.getMessage()

```java
public String getMessage()
```

Produce the message and include the classname, if present.
