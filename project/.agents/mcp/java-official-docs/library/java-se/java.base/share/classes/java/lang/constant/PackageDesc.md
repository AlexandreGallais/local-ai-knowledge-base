# PackageDesc interface (java.lang.constant)

```java
public sealed interface PackageDesc permits PackageDescImpl
```

A nominal descriptor for a {@code Package} constant.

<p>
To create a {@link PackageDesc} for a package,
use the {@link #of(String)} or {@link #ofInternalName(String)} method.

@jvms 4.4.12 The CONSTANT_Package_info Structure
@since 21

## PackageDesc.of(String)

```java
static PackageDesc of(String name)
```

Returns a {@link PackageDesc} for a package,
given the name of the package, such as {@code "java.lang"}.

@param name the fully qualified (dot-separated) package name
@return a {@link PackageDesc} describing the desired package
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the name string is not in the
correct format
@jls 6.5.3 Meaning of Module Names and Package Names
@see PackageDesc#ofInternalName(String)

## PackageDesc.ofInternalName(String)

```java
static PackageDesc ofInternalName(String name)
```

Returns a {@link PackageDesc} for a package,
given the name of the package in internal form,
such as {@code "java/lang"}.

@param name the fully qualified package name, in internal
(slash-separated) form
@return a {@link PackageDesc} describing the desired package
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the name string is not in the
correct format
@jvms 4.2.1 Binary Class and Interface Names
@jvms 4.2.3 Module and Package Names
@see PackageDesc#of(String)

## PackageDesc.internalName()

```java
String internalName()
```

Returns the fully qualified (slash-separated) package name in internal form
of this {@link PackageDesc}.

@return the package name in internal form, or the empty string for the
unnamed package
@see PackageDesc#name()

## PackageDesc.name()

```java
default String name()
```

Returns the fully qualified (dot-separated) package name
of this {@link PackageDesc}.

@return the package name, or the empty string for the
unnamed package
@see PackageDesc#internalName()

## PackageDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.
Returns {@code true} if and only if the specified object is
also a {@link PackageDesc} and both describe the same package.

@param o the other object
@return whether this descriptor is equal to the other object