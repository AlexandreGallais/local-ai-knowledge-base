# ECGenParameterSpec class (java.security.spec)

```java
public class ECGenParameterSpec extends NamedParameterSpec
```

This immutable class specifies the set of parameters used for
generating elliptic curve (EC) domain parameters.

@see AlgorithmParameterSpec

@author Valerie Peng

@since 1.5

## ECGenParameterSpec.ECGenParameterSpec(String)

```java
public ECGenParameterSpec(String stdName)
```

Creates a parameter specification for EC parameter
generation using a standard (or predefined) name
{@code stdName} in order to generate the corresponding
(precomputed) elliptic curve domain parameters. For the
list of supported names, please consult the documentation
of the provider whose implementation will be used.

@param stdName the standard name of the to-be-generated EC
       domain parameters. See the ECGenParameterSpec section in the
       <a href=
       "{@docRoot}/../specs/security/standard-names.html#ecgenparameterspec">
       Java Security Standard Algorithm Names Specification</a> for
       information about standard names.
@spec security/standard-names.html Java Security Standard Algorithm Names
@throws NullPointerException if {@code stdName} is null.