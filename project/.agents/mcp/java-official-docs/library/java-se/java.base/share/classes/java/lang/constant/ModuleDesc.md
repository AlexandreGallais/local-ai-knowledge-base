# ModuleDesc interface (java.lang.constant)

```java
public sealed interface ModuleDesc permits ModuleDescImpl
```

A nominal descriptor for a {@code Module} constant.

<p>
To create a {@link ModuleDesc} for a module, use the {@link #of(String)}
method.

@jvms 4.4.11 The CONSTANT_Module_info Structure
@since 21

## ModuleDesc.of(String)

```java
static ModuleDesc of(String name)
```

Returns a {@link ModuleDesc} for a module,
given the name of the module.

@param name the module name
@return a {@link ModuleDesc} describing the desired module
@throws NullPointerException if the argument is {@code null}
@throws IllegalArgumentException if the name string is not in the
correct format
@jvms 4.2.3 Module and Package Names

## ModuleDesc.name()

```java
String name()
```

Returns the module name of this {@link ModuleDesc}.

@return the module name

## ModuleDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.
Returns {@code true} if and only if the specified object is
also a {@link ModuleDesc} and both describe the same module.

@param o the other object
@return whether this descriptor is equal to the other object