---
title: "Provider class (java.security) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Provider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Provider class (java.security) (part 2 of 2)

## Provider.getAttribute(String)

```java
public final String getAttribute(String name)
```

Return the value of the specified attribute or `null` if this
attribute is not set for this Service.

Parameters:

- `name`: the name of the requested attribute

**Returns:** the value of the specified attribute or `null` if the
        attribute is not present

Throws:

- `NullPointerException`: if name is `null`

## Provider.newInstance(Object)

```java
public Object newInstance(Object constructorParameter) throws NoSuchAlgorithmException
```

Return a new instance of the implementation described by this
service. The security provider framework uses this method to
construct implementations. Applications will typically not need
to call it.

The default implementation uses reflection to invoke the
standard constructor for this type of service.
Security providers can override this method to implement
instantiation in a different way.
For details and the values of constructorParameter that are
valid for the various types of services see the
.

Parameters:

- `constructorParameter`: the value to pass to the constructor, or `null` if this type of service does not use a constructorParameter.

**Returns:** a new implementation of this service

Throws:

- `InvalidParameterException`: if the value of constructorParameter is invalid for this type of service.
- `NoSuchAlgorithmException`: if instantiation failed for any other reason.

## Provider.supportsParameter(Object)

```java
public boolean supportsParameter(Object parameter)
```

Test whether this Service can use the specified parameter.
Returns `false` if this service cannot use the parameter.
Returns `true` if this service can use the parameter,
if a fast test is infeasible, or if the status is unknown.

The security provider framework uses this method with
some types of services to quickly exclude non-matching
implementations for consideration.
Applications will typically not need to call it.

For details and the values of parameter that are valid for the
various types of services see the top of this class and the
.
Security providers can override it to implement their own test.

Parameters:

- `parameter`: the parameter to test

**Returns:** `false` if this service cannot use the specified
parameter; `true` if it can possibly use the parameter

Throws:

- `InvalidParameterException`: if the value of parameter is invalid for this type of service or if this method cannot be used with this type of service

## Provider.toString()

```java
public String toString()
```

Return a `String` representation of this service.

**Returns:** a `String` representation of this service.
