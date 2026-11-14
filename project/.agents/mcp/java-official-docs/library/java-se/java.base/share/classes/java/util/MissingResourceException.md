# MissingResourceException class (java.util)

```java
public class MissingResourceException extends RuntimeException
```

Signals that a resource is missing.
@see java.lang.Exception
@see ResourceBundle
@author      Mark Davis
@since       1.1

## MissingResourceException.MissingResourceException(String, String, String)

```java
public MissingResourceException(String s, String className, String key)
```

Constructs a MissingResourceException with the specified information.
A detail message is a String that describes this particular exception.
@param s the detail message
@param className the name of the resource class
@param key the key for the missing resource.

## MissingResourceException.getClassName()

```java
public String getClassName()
```

Gets parameter passed by constructor.

@return the name of the resource class

## MissingResourceException.getKey()

```java
public String getKey()
```

Gets parameter passed by constructor.

@return the key for the missing resource