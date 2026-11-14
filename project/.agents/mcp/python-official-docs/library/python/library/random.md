---
title: "random --- Generate pseudo-random numbers (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/random.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `random` --- Generate pseudo-random numbers

Module `random`.

**Source code:** Lib/random.py

This module implements pseudo-random number generators for various
distributions.

For integers, there is uniform selection from a range. For sequences, there is
uniform selection of a random element, a function to generate a random
permutation of a list in-place, and a function for random sampling without
replacement.

On the real line, there are functions to compute uniform, normal (Gaussian),
lognormal, negative exponential, gamma, and beta distributions. For generating
distributions of angles, the von Mises distribution is available.

Almost all module functions depend on the basic <example-value> `.random()`, which
generates a random float uniformly in the half-open range `0.0 <= X < 1.0`.
Python uses the Mersenne Twister as the core generator.  It produces 53-bit precision
floats and has a period of 2**19937-1.  The underlying implementation in C is
both fast and threadsafe.  The Mersenne Twister is one of the most extensively
tested random number generators in existence.  However, being completely
deterministic, it is not suitable for all purposes, and is completely unsuitable
for cryptographic purposes.

The functions supplied by this module are actually bound methods of a hidden
instance of the `random.Random` class.  You can instantiate your own
instances of `Random` to get generators that don't share state.

Class `Random` can also be subclassed if you want to use a different
basic <example-value> of your own devising: see the documentation on that class for
more details.

The `random` module also provides the `SystemRandom` class which
uses the system function `os.urandom()` to generate random numbers
from sources provided by the operating system.

> **Warning:** The pseudo-random generators of this module should not be used for
> security purposes.  For security or cryptographic uses, see the
> `secrets` module.

> **See also:** M. Matsumoto and T. Nishimura, "Mersenne Twister: A 623-dimensionally
> equidistributed uniform pseudorandom number generator", ACM Transactions on
> Modeling and Computer Simulation Vol. 8, No. 1, January pp.3--30 1998.
>
>
> `Complementary-Multiply-with-Carry recipe
> <https://code.activestate.com/recipes/576707-long-period-random-number-generator/>`_ for a compatible alternative
> random number generator with a long period and comparatively simple update
> operations.

> **Note:** The global random number generator and instances of `Random` are thread-safe.
> However, in the free-threaded build, concurrent calls to the global generator or
> to the same instance of `Random` may encounter contention and poor performance.
> Consider using separate instances of `Random` per thread instead.

## Bookkeeping functions

### `seed(a=None, version=2)`

Initialize the random number generator.

If *a* is omitted or `None`, the current system time is used.  If
randomness sources are provided by the operating system, they are used
instead of the system time (see the `os.urandom()` function for details
on availability).

If *a* is an int, its absolute value is used directly.

With version 2 (the default), a `str`, `bytes`, or `bytearray`
object gets converted to an `int` and all of its bits are used.

With version 1 (provided for reproducing random sequences from older versions
of Python), the algorithm for `str` and `bytes` generates a
narrower range of seeds.

> *Changed in version 3.2.*
> Moved to the version 2 scheme which uses all of the bits in a string seed.

> *Changed in version 3.11.*
> The *seed* must be one of the following types:
> `None`, `int`, `float`, `str`,
> `bytes`, or `bytearray`.

### `getstate()`

Return an object capturing the current internal state of the generator.  This
object can be passed to `setstate()` to restore the state.

### `setstate(state)`

*state* should have been obtained from a previous call to `getstate()`, and
`setstate()` restores the internal state of the generator to what it was at
the time `getstate()` was called.

## Functions for bytes

### `randbytes(n)`

Generate *n* random bytes.

This method should not be used for generating security tokens.
Use `secrets.token_bytes()` instead.

> *Added in version 3.9.*

## Functions for integers

### `randrange(stop)`

```python
randrange(start, stop[, step])
```

Return a randomly selected element from `range(start, stop, step)`.

This is roughly equivalent to `choice(range(start, stop, step))` but
supports arbitrarily large ranges and is optimized for common cases.

The positional argument pattern matches the `range()` function.

Keyword arguments should not be used because they can be interpreted
in unexpected ways. For example `randrange(start=100)` is interpreted
as `randrange(0, 100, 1)`.

> *Changed in version 3.2.*
> `randrange()` is more sophisticated about producing equally distributed
> values.  Formerly it used a style like `int(random()*n)` which could produce
> slightly uneven distributions.

> *Changed in version 3.12.*
> Automatic conversion of non-integer types is no longer supported.
> Calls such as `randrange(10.0)` and `randrange(Fraction(10, 1))`
> now raise a `TypeError`.

### `randint(a, b)`

Return a random integer *N* such that `a <= N <= b`.  Alias for
`randrange(a, b+1)`.

### `getrandbits(k)`

Returns a non-negative Python integer with *k* random bits. This method
is supplied with the Mersenne Twister generator and some other generators
may also provide it as an optional part of the API. When available,
`getrandbits()` enables `randrange()` to handle arbitrarily large
ranges.

> *Changed in version 3.9.*
> This method now accepts zero for *k*.

## Functions for sequences

### `choice(seq)`

Return a random element from the non-empty sequence *seq*. If *seq* is empty,
raises `IndexError`.

### `choices(population, weights=None, *, cum_weights=None, k=1)`

Return a *k* sized list of elements chosen from the *population* with replacement.
If the *population* is empty, raises `IndexError`.

If a *weights* sequence is specified, selections are made according to the
relative weights.  Alternatively, if a *cum_weights* sequence is given, the
selections are made according to the cumulative weights (perhaps computed
using `itertools.accumulate()`).  For example, the relative weights
`[10, 5, 30, 5]` are equivalent to the cumulative weights
`[10, 15, 45, 50]`.  Internally, the relative weights are converted to
cumulative weights before making selections, so supplying the cumulative
weights saves work.

If neither *weights* nor *cum_weights* are specified, selections are made
with equal probability.  If a weights sequence is supplied, it must be
the same length as the *population* sequence.  It is a `TypeError`
to specify both *weights* and *cum_weights*.

The *weights* or *cum_weights* can use any numeric type that interoperates
with the `float` values returned by `random()` (that includes
integers, floats, and fractions but excludes decimals).  Weights are assumed
to be non-negative and finite.  A `ValueError` is raised if all
weights are zero.

For a given seed, the `choices()` function with equal weighting
typically produces a different sequence than repeated calls to
`choice()`.  The algorithm used by `choices()` uses floating-point
arithmetic for internal consistency and speed.  The algorithm used
by `choice()` defaults to integer arithmetic with repeated selections
to avoid small biases from round-off error.

> *Added in version 3.6.*

> *Changed in version 3.9.*
> Raises a `ValueError` if all weights are zero.

### `shuffle(x)`

Shuffle the sequence *x* in place.

To shuffle an immutable sequence and return a new shuffled list, use
`sample(x, k=len(x))` instead.

Note that even for small `len(x)`, the total number of permutations of *x*
can quickly grow larger than the period of most random number generators.
This implies that most permutations of a long sequence can never be
generated.  For example, a sequence of length 2080 is the largest that
can fit within the period of the Mersenne Twister random number generator.

> *Changed in version 3.11.*
> Removed the optional parameter *random*.

### `sample(population, k, *, counts=None)`

Return a *k* length list of unique elements chosen from the population
sequence.  Used for random sampling without replacement.

Returns a new list containing elements from the population while leaving the
original population unchanged.  The resulting list is in selection order so that
all sub-slices will also be valid random samples.  This allows raffle winners
(the sample) to be partitioned into grand prize and second place winners (the
subslices).

Members of the population need not be hashable or unique.  If the population
contains repeats, then each occurrence is a possible selection in the sample.

Repeated elements can be specified one at a time or with the optional
keyword-only *counts* parameter.  For example, ``sample(['red', 'blue'],
counts=[4, 2], k=5)` is equivalent to `sample(['red', 'red', 'red', 'red',
'blue', 'blue'], k=5)``.

To choose a sample from a range of integers, use a `range()` object as an
argument.  This is especially fast and space efficient for sampling from a large
population:  `sample(range(10000000), k=60)`.

If the sample size is larger than the population size, a `ValueError`
is raised.

> *Changed in version 3.9.*
> Added the *counts* parameter.

> *Changed in version 3.11.*
> The *population* must be a sequence.  Automatic conversion of sets
> to lists is no longer supported.

## Discrete distributions

The following function generates a discrete distribution.

### `binomialvariate(n=1, p=0.5)`

`Binomial distribution
<https://mathworld.wolfram.com/BinomialDistribution.html>`_.
Return the number of successes for *n* independent trials with the
probability of success in each trial being *p*:

Mathematically equivalent to:

```
sum(random() < p for i in range(n))
```

The number of trials *n* should be a non-negative integer.
The probability of success *p* should be between `0.0 <= p <= 1.0`.
The result is an integer in the range `0 <= X <= n`.

> *Added in version 3.12.*

## Real-valued distributions

The following functions generate specific real-valued distributions. Function
parameters are named after the corresponding variables in the distribution's
equation, as used in common mathematical practice; most of these equations can
be found in any statistics text.

### `random()`

Return the next random floating-point number in the range `0.0 <= X < 1.0`

### `uniform(a, b)`

Return a random floating-point number *N* such that `a <= N <= b` for
`a <= b` and `b <= N <= a` for `b < a`.

The end-point value `b` may or may not be included in the range
depending on floating-point rounding in the expression
`a + (b-a) * random()`.

### `triangular(low, high, mode)`

Return a random floating-point number *N* such that `low <= N <= high` and
with the specified *mode* between those bounds.  The *low* and *high* bounds
default to zero and one.  The *mode* argument defaults to the midpoint
between the bounds, giving a symmetric distribution.

### `betavariate(alpha, beta)`

Beta distribution.  Conditions on the parameters are `alpha > 0` and
`beta > 0`. Returned values range between 0 and 1.

### `expovariate(lambd = 1.0)`

Exponential distribution.  *lambd* is 1.0 divided by the desired
mean.  It should be nonzero.  (The parameter would be called
"lambda", but that is a reserved word in Python.)  Returned values
range from 0 to positive infinity if *lambd* is positive, and from
negative infinity to 0 if *lambd* is negative.

> *Changed in version 3.12.*
> Added the default value for `lambd`.

### `gammavariate(alpha, beta)`

Gamma distribution.  (*Not* the gamma function!)  The shape and
scale parameters, *alpha* and *beta*, must have positive values.
(Calling conventions vary and some sources define 'beta'
as the inverse of the scale).

The probability distribution function is:

```
          x ** (alpha - 1) * math.exp(-x / beta)
pdf(x) =  --------------------------------------
            math.gamma(alpha) * beta ** alpha
```

### `gauss(mu=0.0, sigma=1.0)`

Normal distribution, also called the Gaussian distribution.
*mu* is the mean,
and *sigma* is the standard deviation.  This is slightly faster than
the `normalvariate()` function defined below.

Multithreading note:  When two threads call this function
simultaneously, it is possible that they will receive the
same return value.  This can be avoided in three ways.
1) Have each thread use a different instance of the random
number generator. 2) Put locks around all calls. 3) Use the
slower, but thread-safe `normalvariate()` function instead.

> *Changed in version 3.11.*
> *mu* and *sigma* now have default arguments.

### `lognormvariate(mu, sigma)`

Log normal distribution.  If you take the natural logarithm of this
distribution, you'll get a normal distribution with mean *mu* and standard
deviation *sigma*.  *mu* can have any value, and *sigma* must be greater than
zero.

### `normalvariate(mu=0.0, sigma=1.0)`

Normal distribution.  *mu* is the mean, and *sigma* is the standard deviation.

> *Changed in version 3.11.*
> *mu* and *sigma* now have default arguments.

### `vonmisesvariate(mu, kappa)`

*mu* is the mean angle, expressed in radians between 0 and 2**pi*, and *kappa*
is the concentration parameter, which must be greater than or equal to zero.  If
*kappa* is equal to zero, this distribution reduces to a uniform random angle
over the range 0 to 2**pi*.

### `paretovariate(alpha)`

Pareto distribution.  *alpha* is the shape parameter.

### `weibullvariate(alpha, beta)`

Weibull distribution.  *alpha* is the scale parameter and *beta* is the shape
parameter.
