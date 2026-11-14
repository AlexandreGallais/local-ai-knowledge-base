# InvalidModuleDescriptorException class (java.lang.module)

```java
public class InvalidModuleDescriptorException extends RuntimeException
```

Thrown when reading a module descriptor and the module descriptor is found
to be malformed or otherwise cannot be interpreted as a module descriptor.

@see ModuleDescriptor#read
@since 9

## InvalidModuleDescriptorException.InvalidModuleDescriptorException()

```java
public InvalidModuleDescriptorException()
```

Constructs an {@code InvalidModuleDescriptorException} with no detail
message.

## InvalidModuleDescriptorException.InvalidModuleDescriptorException(String)

```java
public InvalidModuleDescriptorException(String msg)
```

Constructs an {@code InvalidModuleDescriptorException} with the
specified detail message.

@param msg
       The detail message; can be {@code null}