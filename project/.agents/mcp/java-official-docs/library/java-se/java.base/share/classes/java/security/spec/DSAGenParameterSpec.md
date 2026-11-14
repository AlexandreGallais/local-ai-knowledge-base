# DSAGenParameterSpec class (java.security.spec)

```java
public final class DSAGenParameterSpec implements AlgorithmParameterSpec
```

This immutable class specifies the set of parameters used for
generating DSA parameters as specified in
<a href="http://csrc.nist.gov/publications/fips/fips186-3/fips_186-3.pdf">FIPS 186-3 Digital Signature Standard (DSS)</a>.

@spec  https://csrc.nist.gov/publications/fips/fips186-3/fips_186-3.pdf
     FIPS 186-3 Digital Signature Standard (DSS)

@see AlgorithmParameterSpec

@since 1.8

## DSAGenParameterSpec.DSAGenParameterSpec(int, int)

```java
public DSAGenParameterSpec(int primePLen, int subprimeQLen)
```

Creates a domain parameter specification for DSA parameter
generation using {@code primePLen} and {@code subprimeQLen}.
The value of {@code subprimeQLen} is also used as the default
length of the domain parameter seed in bits.
@param primePLen the desired length of the prime P in bits.
@param subprimeQLen the desired length of the sub-prime Q in bits.
@throws    IllegalArgumentException if {@code primePLen}
or {@code subprimeQLen} is illegal per the specification of
FIPS 186-3.

## DSAGenParameterSpec.DSAGenParameterSpec(int, int, int)

```java
public DSAGenParameterSpec(int primePLen, int subprimeQLen, int seedLen)
```

Creates a domain parameter specification for DSA parameter
generation using {@code primePLen}, {@code subprimeQLen},
and {@code seedLen}.
@param primePLen the desired length of the prime P in bits.
@param subprimeQLen the desired length of the sub-prime Q in bits.
@param seedLen the desired length of the domain parameter seed in bits,
shall be equal to or greater than {@code subprimeQLen}.
@throws    IllegalArgumentException if {@code primePLenLen},
{@code subprimeQLen}, or {@code seedLen} is illegal per the
specification of FIPS 186-3.

## DSAGenParameterSpec.getPrimePLength()

```java
public int getPrimePLength()
```

Returns the desired length of the prime P of the
to-be-generated DSA domain parameters in bits.
@return the length of the prime P.

## DSAGenParameterSpec.getSubprimeQLength()

```java
public int getSubprimeQLength()
```

Returns the desired length of the sub-prime Q of the
to-be-generated DSA domain parameters in bits.
@return the length of the sub-prime Q.

## DSAGenParameterSpec.getSeedLength()

```java
public int getSeedLength()
```

Returns the desired length of the domain parameter seed in bits.
@return the length of the domain parameter seed.