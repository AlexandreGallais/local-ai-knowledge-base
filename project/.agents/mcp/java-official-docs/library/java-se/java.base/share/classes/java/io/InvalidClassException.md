# InvalidClassException class (java.io)

```java
public class InvalidClassException extends ObjectStreamException
```

Thrown when the Serialization runtime detects one of the following
problems with a Class.
<UL>
<LI> The serial version of the class does not match that of the class
     descriptor read from the stream
<LI> The class contains unknown datatypes
<LI> The class does not have an accessible no-arg constructor
<LI> The ObjectStreamClass of an enum constant does not represent
     an enum type
<LI> Other conditions given in the <cite>Java Object Serialization
     Specification</cite>
</UL>

@since   1.1

## InvalidClassException.classname

```java
public String classname
```

Name of the invalid class.

@serial Name of the invalid class.

## InvalidClassException.InvalidClassException(String)

```java
public InvalidClassException(String reason)
```

Report an InvalidClassException for the reason specified.

@param reason  String describing the reason for the exception.

## InvalidClassException.InvalidClassException(String, String)

```java
public InvalidClassException(String cname, String reason)
```

Constructs an InvalidClassException object.

@param cname   a String naming the invalid class.
@param reason  a String describing the reason for the exception.

## InvalidClassException.InvalidClassException(String, Throwable)

```java
public InvalidClassException(String reason, Throwable cause)
```

Report an InvalidClassException for the reason and cause specified.

@param reason  String describing the reason for the exception.
@param cause the cause
@since 19

## InvalidClassException.InvalidClassException(String, String, Throwable)

```java
public InvalidClassException(String cname, String reason, Throwable cause)
```

Report an InvalidClassException for the reason and cause specified.

@param cname   a String naming the invalid class.
@param reason  String describing the reason for the exception.
@param cause the cause
@since 19

## InvalidClassException.getMessage()

```java
public String getMessage()
```

Produce the message and include the classname, if present.