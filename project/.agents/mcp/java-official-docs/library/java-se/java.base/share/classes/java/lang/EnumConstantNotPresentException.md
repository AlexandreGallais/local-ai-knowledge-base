# EnumConstantNotPresentException class (java.lang)

```java
/* rawtypes are part of the public api */ public class EnumConstantNotPresentException extends RuntimeException
```

Thrown when an application tries to access an enum constant by name
and the enum type contains no constant with the specified name.
This exception can be thrown by the {@linkplain
java.lang.reflect.AnnotatedElement API used to read annotations
reflectively}.

@author  Josh Bloch
@see     java.lang.reflect.AnnotatedElement
@since   1.5

## EnumConstantNotPresentException.EnumConstantNotPresentException(Class<? extends Enum>, String)

```java
public EnumConstantNotPresentException(Class<? extends Enum> enumType, String constantName)
```

Constructs an {@code EnumConstantNotPresentException} for the
specified constant.

@param enumType the type of the missing enum constant
@param constantName the name of the missing enum constant

## EnumConstantNotPresentException.enumType()

```java
public Class<? extends Enum> enumType()
```

Returns the type of the missing enum constant.

@return the type of the missing enum constant

## EnumConstantNotPresentException.constantName()

```java
public String constantName()
```

Returns the name of the missing enum constant.

@return the name of the missing enum constant