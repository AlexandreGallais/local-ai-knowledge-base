# SecureRandomSpi class (java.security)

```java
public abstract class SecureRandomSpi implements java.io.Serializable
```

This class defines the <i>Service Provider Interface</i> (<b>SPI</b>)
for the {@link SecureRandom} class.
<p>
All the abstract methods in this class must be implemented by each
service provider who wishes to supply the implementation
of a cryptographically strong pseudo-random number generator.

@implSpec
If the {@link #SecureRandomSpi(SecureRandomParameters)}
constructor is overridden in an implementation, it will always be called
whenever a {@code SecureRandom} is instantiated. Precisely, if an object is
instantiated with one of {@code SecureRandom}'s {@code getInstance} methods
<em>without</em> a {@link SecureRandomParameters} parameter,
the constructor will be called with a {@code null} argument and the
implementation is responsible for creating its own
{@code SecureRandomParameters} parameter for use when
{@link #engineGetParameters()} is called. If an object
is instantiated with one of {@code SecureRandom}'s {@code getInstance}
methods <em>with</em> a {@code SecureRandomParameters} argument,
the constructor will be called with that argument. The
{@link #engineGetParameters()} method must not return {@code null}.
<p>
Otherwise, if the {@code SecureRandomSpi(SecureRandomParameters)}
constructor is not overridden in an implementation, the
{@link #SecureRandomSpi()} constructor must be overridden, and it will be
called if an object is instantiated with one of {@code SecureRandom}'s
{@code getInstance} methods <em>without</em> a
{@code SecureRandomParameters} argument. Calling one of
{@code SecureRandom}'s {@code getInstance} methods <em>with</em>
a {@code SecureRandomParameters} argument will never
return an instance of this implementation. The
{@link #engineGetParameters()} method must return {@code null}.
<p>
See {@link SecureRandom} for additional details on thread safety. By
default, a {@code SecureRandomSpi} implementation is considered to be
not safe for use by multiple concurrent threads and {@code SecureRandom}
will synchronize access to each of the applicable engine methods
(see {@link SecureRandom} for the list of methods). However, if a
{@code SecureRandomSpi} implementation is thread-safe, the <a href=
"{@docRoot}/../specs/security/standard-names.html#service-attributes">
service provider attribute</a> "ThreadSafe" should be set to "true" during
its registration, as follows:
<blockquote><pre>
put("SecureRandom.AlgName ThreadSafe", "true");</pre>
</blockquote>
or
<blockquote><pre>
putService(new Service(this, "SecureRandom", "AlgName", className,
         null, Map.of("ThreadSafe", "true")));</pre>
</blockquote>
{@code SecureRandom} will call the applicable engine methods
without any synchronization.

@spec security/standard-names.html Java Security Standard Algorithm Names
@since 1.2

## SecureRandomSpi.SecureRandomSpi()

```java
public SecureRandomSpi()
```

Constructor without a parameter.

## SecureRandomSpi.SecureRandomSpi(SecureRandomParameters)

```java
protected SecureRandomSpi(SecureRandomParameters params)
```

Constructor with a parameter.

@param params the {@link SecureRandomParameters} object.
              This argument can be {@code null}.
@throws IllegalArgumentException if {@code params} is
        unrecognizable or unsupported by this {@code SecureRandom}

@since 9

## SecureRandomSpi.engineSetSeed(byte[])

```java
protected abstract void engineSetSeed(byte[] seed)
```

Reseeds this random object with the given seed. The seed supplements,
rather than replaces, the existing seed. Thus, repeated calls
are guaranteed never to reduce randomness.

@param seed the seed.

## SecureRandomSpi.engineNextBytes(byte[])

```java
protected abstract void engineNextBytes(byte[] bytes)
```

Generates a user-specified number of random bytes.
<p>
Some random number generators can only generate a limited amount
of random bytes per invocation. If the size of {@code bytes}
is greater than this limit, the implementation should invoke
its generation process multiple times to completely fill the
buffer before returning from this method.

@param bytes the array to be filled in with random bytes.

## SecureRandomSpi.engineNextBytes(byte[], SecureRandomParameters)

```java
protected void engineNextBytes( byte[] bytes, SecureRandomParameters params)
```

Generates a user-specified number of random bytes with
additional parameters.
<p>
Some random number generators can only generate a limited amount
of random bytes per invocation. If the size of {@code bytes}
is greater than this limit, the implementation should invoke
its generation process multiple times to completely fill the
buffer before returning from this method.

@implSpec The default implementation throws
an {@link UnsupportedOperationException}.

@param bytes the array to be filled in with random bytes
@param params additional parameters
@throws UnsupportedOperationException if the implementation
        has not overridden this method
@throws IllegalArgumentException if {@code params} is {@code null},
        illegal or unsupported by this {@code SecureRandom}

@since 9

## SecureRandomSpi.engineGenerateSeed(int)

```java
protected abstract byte[] engineGenerateSeed(int numBytes)
```

Returns the given number of seed bytes.  This call may be used to
seed other random number generators.

@param numBytes the number of seed bytes to generate.

@return the seed bytes.

## SecureRandomSpi.engineReseed(SecureRandomParameters)

```java
protected void engineReseed(SecureRandomParameters params)
```

Reseeds this random object with entropy input read from its
entropy source with additional parameters.
<p>
If this method is called by {@link SecureRandom#reseed()},
{@code params} will be {@code null}.
<p>
Do not override this method if the implementation does not
support reseeding.

@implSpec The default implementation throws
          an {@link UnsupportedOperationException}.

@param params extra parameters, can be {@code null}.
@throws UnsupportedOperationException if the implementation
        has not overridden this method
@throws IllegalArgumentException if {@code params} is
        illegal or unsupported by this {@code SecureRandom}

@since 9

## SecureRandomSpi.engineGetParameters()

```java
protected SecureRandomParameters engineGetParameters()
```

Returns the effective {@link SecureRandomParameters} for this
{@code SecureRandom} instance.

@implSpec The default implementation returns {@code null}.

@return the effective {@link SecureRandomParameters} parameters,
or {@code null} if no parameters were used.

@since 9

## SecureRandomSpi.toString()

```java
public String toString()
```

Returns a Human-readable string representation of this
{@code SecureRandom}.

@return the string representation