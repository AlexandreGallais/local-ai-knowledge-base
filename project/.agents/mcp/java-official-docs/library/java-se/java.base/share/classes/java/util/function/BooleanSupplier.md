# BooleanSupplier interface (java.util.function)

```java
public interface BooleanSupplier
```

Represents a supplier of {@code boolean}-valued results.  This is the
{@code boolean}-producing primitive specialization of {@link Supplier}.

<p>There is no requirement that a new or distinct result be returned each
time the supplier is invoked.

<p>This is a <a href="package-summary.html">functional interface</a>
whose functional method is {@link #getAsBoolean()}.

@see Supplier
@since 1.8

## BooleanSupplier.getAsBoolean()

```java
boolean getAsBoolean()
```

Gets a result.

@return a result