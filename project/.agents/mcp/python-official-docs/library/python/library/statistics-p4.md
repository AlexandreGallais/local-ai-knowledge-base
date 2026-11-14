---
title: "statistics --- Mathematical statistics functions (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/statistics.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# statistics --- Mathematical statistics functions (part 4 of 4)

## `NormalDist` objects

`NormalDist` is a tool for creating and manipulating normal
distributions of a `random variable
<http://www.stat.yale.edu/Courses/1997-98/101/ranvar.htm>`_.  It is a
class that treats the mean and standard deviation of data
measurements as a single entity.

Normal distributions arise from the `Central Limit Theorem
<https://en.wikipedia.org/wiki/Central_limit_theorem>`_ and have a wide range
of applications in statistics.

### class `NormalDist(mu=0.0, sigma=1.0)`

Returns a new *NormalDist* object where *mu* represents the `arithmetic
mean <https://en.wikipedia.org/wiki/Arithmetic_mean>`_ and *sigma*
represents the `standard deviation
<https://en.wikipedia.org/wiki/Standard_deviation>`_.

If *sigma* is negative, raises `StatisticsError`.

### `mean`

A read-only property for the `arithmetic mean
<https://en.wikipedia.org/wiki/Arithmetic_mean>`_ of a normal
distribution.

### `median`

A read-only property for the `median
<https://en.wikipedia.org/wiki/Median>`_ of a normal
distribution.

### `mode`

A read-only property for the `mode
<https://en.wikipedia.org/wiki/Mode_(statistics)>`_ of a normal
distribution.

### `stdev`

A read-only property for the `standard deviation
<https://en.wikipedia.org/wiki/Standard_deviation>`_ of a normal
distribution.

### `variance`

A read-only property for the `variance
<https://en.wikipedia.org/wiki/Variance>`_ of a normal
distribution. Equal to the square of the standard deviation.

### classmethod `NormalDist.from_samples(data)`

Makes a normal distribution instance with *mu* and *sigma* parameters
estimated from the *data* using `fmean()` and `stdev()`.

The *data* can be any iterable and should consist of values
that can be converted to type `float`.  If *data* does not
contain at least two elements, raises `StatisticsError` because it
takes at least one point to estimate a central value and at least two
points to estimate dispersion.

### `NormalDist.samples(n, *, seed=None)`

Generates *n* random samples for a given mean and standard deviation.
Returns a `list` of `float` values.

If *seed* is given, creates a new instance of the underlying random
number generator.  This is useful for creating reproducible results,
even in a multi-threading context.

> *Changed in version 3.13.*

Switched to a faster algorithm.  To reproduce samples from previous
versions, use `random.seed()` and `random.gauss()`.

### `NormalDist.pdf(x)`

Using a `probability density function (pdf)
<https://en.wikipedia.org/wiki/Probability_density_function>`_, compute
the relative likelihood that a random variable *X* will be near the
given value *x*.  Mathematically, it is the limit of the ratio ``P(x <=
X < x+dx) / dx`` as *dx* approaches zero.

The relative likelihood is computed as the probability of a sample
occurring in a narrow range divided by the width of the range (hence
the word "density").  Since the likelihood is relative to other points,
its value can be greater than `1.0`.

### `NormalDist.cdf(x)`

Using a `cumulative distribution function (cdf)
<https://en.wikipedia.org/wiki/Cumulative_distribution_function>`_,
compute the probability that a random variable *X* will be less than or
equal to *x*.  Mathematically, it is written `P(X <= x)`.

### `NormalDist.inv_cdf(p)`

Compute the inverse cumulative distribution function, also known as the
quantile function
or the `percent-point
<https://web.archive.org/web/20190203145224/https://www.statisticshowto.datasciencecentral.com/inverse-distribution-function/>`_
function.  Mathematically, it is written `x : P(X <= x) = p`.

Finds the value *x* of the random variable *X* such that the
probability of the variable being less than or equal to that value
equals the given probability *p*.

### `NormalDist.overlap(other)`

Measures the agreement between two normal probability distributions.
Returns a value between 0.0 and 1.0 giving `the overlapping area for
the two probability density functions
<https://www.rasch.org/rmt/rmt101r.htm>`_.

### `NormalDist.quantiles(n=4)`

Divide the normal distribution into *n* continuous intervals with
equal probability.  Returns a list of (n - 1) cut points separating
the intervals.

Set *n* to 4 for quartiles (the default).  Set *n* to 10 for deciles.
Set *n* to 100 for percentiles which gives the 99 cuts points that
separate the normal distribution into 100 equal sized groups.

### `NormalDist.zscore(x)`

Compute the
Standard Score
describing *x* in terms of the number of standard deviations
above or below the mean of the normal distribution:
`(x - mean) / stdev`.

> *Added in version 3.9.*

Instances of `NormalDist` support addition, subtraction,
multiplication and division by a constant.  These operations
are used for translation and scaling.  For example:

```python

>>> temperature_february = NormalDist(5, 2.5)             # Celsius
>>> temperature_february * (9/5) + 32                     # Fahrenheit
NormalDist(mu=41.0, sigma=4.5)
```

Dividing a constant by an instance of `NormalDist` is not supported
because the result wouldn't be normally distributed.

Since normal distributions arise from additive effects of independent
variables, it is possible to `add and subtract two independent normally
distributed random variables
<https://en.wikipedia.org/wiki/Sum_of_normally_distributed_random_variables>`_
represented as instances of `NormalDist`.  For example:

```python

>>> birth_weights = NormalDist.from_samples([2.5, 3.1, 2.1, 2.4, 2.7, 3.5])
>>> drug_effects = NormalDist(0.4, 0.15)
>>> combined = birth_weights + drug_effects
>>> round(combined.mean, 1)
3.1
>>> round(combined.stdev, 1)
0.5
```

> *Added in version 3.8.*

## Examples and Recipes

### Classic probability problems

`NormalDist` readily solves classic probability problems.

For example, given `historical data for SAT exams
<https://nces.ed.gov/programs/digest/d17/tables/dt17_226.40.asp>`_ showing
that scores are normally distributed with a mean of 1060 and a standard
deviation of 195, determine the percentage of students with test scores
between 1100 and 1200, after rounding to the nearest whole number:

```python

>>> sat = NormalDist(1060, 195)
>>> fraction = sat.cdf(1200 + 0.5) - sat.cdf(1100 - 0.5)
>>> round(fraction * 100.0, 1)
18.4
```

Find the quartiles and `deciles
<https://en.wikipedia.org/wiki/Decile>`_ for the SAT scores:

```python

>>> list(map(round, sat.quantiles()))
[928, 1060, 1192]
>>> list(map(round, sat.quantiles(n=10)))
[810, 896, 958, 1011, 1060, 1109, 1162, 1224, 1310]
```

### Monte Carlo inputs for simulations

To estimate the distribution for a model that isn't easy to solve
analytically, `NormalDist` can generate input samples for a `Monte
Carlo simulation <https://en.wikipedia.org/wiki/Monte_Carlo_method>`_:

```python

>>> def model(x, y, z):
...     return (3*x + 7*x*y - 5*y) / (11 * z)
...
>>> n = 100_000
>>> X = NormalDist(10, 2.5).samples(n, seed=3652260728)
>>> Y = NormalDist(15, 1.75).samples(n, seed=4582495471)
>>> Z = NormalDist(50, 1.25).samples(n, seed=6582483453)
>>> quantiles(map(model, X, Y, Z))       # doctest: +SKIP
[1.<example-card-number>, 1.<example-card-number>, 2.175091447274739]
```

### Approximating binomial distributions

Normal distributions can be used to approximate `Binomial
distributions <https://mathworld.wolfram.com/BinomialDistribution.html>`_
when the sample size is large and when the probability of a successful
trial is near 50%.

For example, an open source conference has 750 attendees and two rooms with a
500 person capacity.  There is a talk about Python and another about Ruby.
In previous conferences, 65% of the attendees preferred to listen to Python
talks.  Assuming the population preferences haven't changed, what is the
probability that the Python room will stay within its capacity limits?

```python

>>> n = 750             # Sample size
>>> p = 0.65            # Preference for Python
>>> q = 1.0 - p         # Preference for Ruby
>>> k = 500             # Room capacity

>>> # Approximation using the cumulative normal distribution
>>> from math import sqrt
>>> round(NormalDist(mu=n*p, sigma=sqrt(n*p*q)).cdf(k + 0.5), 4)
0.8402

>>> # Exact solution using the cumulative binomial distribution
>>> from math import comb, fsum
>>> round(fsum(comb(n, r) * p**r * q**(n-r) for r in range(k+1)), 4)
0.8402

>>> # Approximation using a simulation
>>> from random import seed, binomialvariate
>>> seed(8675309)
>>> mean(binomialvariate(n, p) <= k for i in range(10_000))
0.8406
```

### Naive bayesian classifier

Normal distributions commonly arise in machine learning problems.

Wikipedia has a `nice example of a Naive Bayesian Classifier
<https://en.wikipedia.org/wiki/Naive_Bayes_classifier#Person_classification>`_.
The challenge is to predict a person's gender from measurements of normally
distributed features including height, weight, and foot size.

We're given a training dataset with measurements for eight people.  The
measurements are assumed to be normally distributed, so we summarize the data
with `NormalDist`:

```python

>>> height_male = NormalDist.from_samples([6, 5.92, 5.58, 5.92])
>>> height_female = NormalDist.from_samples([5, 5.5, 5.42, 5.75])
>>> weight_male = NormalDist.from_samples([180, 190, 170, 165])
>>> weight_female = NormalDist.from_samples([100, 150, 130, 150])
>>> foot_size_male = NormalDist.from_samples([12, 11, 12, 10])
>>> foot_size_female = NormalDist.from_samples([6, 8, 7, 9])
```

Next, we encounter a new person whose feature measurements are known but whose
gender is unknown:

```python

>>> ht = 6.0        # height
>>> wt = 130        # weight
>>> fs = 8          # foot size
```

Starting with a 50% `prior probability
<https://en.wikipedia.org/wiki/Prior_probability>`_ of being male or female,
we compute the posterior as the prior times the product of likelihoods for the
feature measurements given the gender:

```python

>>> prior_male = 0.5
>>> prior_female = 0.5
>>> posterior_male = (prior_male * height_male.pdf(ht) *
...                   weight_male.pdf(wt) * foot_size_male.pdf(fs))

>>> posterior_female = (prior_female * height_female.pdf(ht) *
...                     weight_female.pdf(wt) * foot_size_female.pdf(fs))
```

The final prediction goes to the largest posterior. This is known as the
`maximum a posteriori
<https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation>`_ or MAP:

```python

>>> 'male' if posterior_male > posterior_female else 'female'
'female'
```
