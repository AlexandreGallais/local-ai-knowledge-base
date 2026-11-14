---
title: "statistics --- Mathematical statistics functions (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/statistics.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# statistics --- Mathematical statistics functions (part 3 of 4)

### `variance(data, xbar=None)`

Return the sample variance of *data*, an iterable of at least two real-valued
numbers.  Variance, or second moment about the mean, is a measure of the
variability (spread or dispersion) of data.  A large variance indicates that
the data is spread out; a small variance indicates it is clustered closely
around the mean.

If the optional second argument *xbar* is given, it should be the *sample*
mean of *data*.  If it is missing or `None` (the default), the mean is
automatically calculated.

Use this function when your data is a sample from a population. To calculate
the variance from the entire population, see `pvariance()`.

Raises `StatisticsError` if *data* has fewer than two values.

Examples:

```python

>>> data = [2.75, 1.75, 1.25, 0.25, 0.5, 1.25, 3.5]
>>> variance(data)
1.<example-card-number>
```

If you have already calculated the sample mean of your data, you can pass it
as the optional second argument *xbar* to avoid recalculation:

```python

>>> m = mean(data)
>>> variance(data, m)
1.<example-card-number>
```

This function does not attempt to verify that you have passed the actual mean
as *xbar*.  Using arbitrary values for *xbar* can lead to invalid or
impossible results.

Decimal and Fraction values are supported:

```python

>>> from decimal import Decimal as D
>>> variance([D("27.5"), D("30.25"), D("30.25"), D("34.5"), D("41.75")])
Decimal('31.01875')

>>> from fractions import Fraction as F
>>> variance([F(1, 6), F(1, 2), F(5, 3)])
Fraction(67, 108)
```

> **Note:** This is the sample variance s² with Bessel's correction, also known as
> variance with N-1 degrees of freedom.  Provided that the data points are
> representative (e.g. independent and identically distributed), the result
> should be an unbiased estimate of the true population variance.
>
> If you somehow know the actual population mean μ you should pass it to the
> `pvariance()` function as the *mu* parameter to get the variance of a
> sample.

### `quantiles(data, *, n=4, method='exclusive')`

Divide *data* into *n* continuous intervals with equal probability.
Returns a list of `n - 1` cut points separating the intervals.

Set *n* to 4 for quartiles (the default).  Set *n* to 10 for deciles.  Set
*n* to 100 for percentiles which gives the 99 cuts points that separate
*data* into 100 equal sized groups.  Raises `StatisticsError` if *n*
is not least 1.

The *data* can be any iterable containing sample data.  For meaningful
results, the number of data points in *data* should be larger than *n*.
Raises `StatisticsError` if there is not at least one data point.

The cut points are linearly interpolated from the
two nearest data points.  For example, if a cut point falls one-third
of the distance between two sample values, `100` and `112`, the
cut-point will evaluate to `104`.

The *method* for computing quantiles can be varied depending on
whether the *data* includes or excludes the lowest and
highest possible values from the population.

The default *method* is "exclusive" and is used for data sampled from
a population that can have more extreme values than found in the
samples.  The portion of the population falling below the *i-th* of
*m* sorted data points is computed as `i / (m + 1)`.  Given nine
sample values, the method sorts them and assigns the following
percentiles: 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%.

Setting the *method* to "inclusive" is used for describing population
data or for samples that are known to include the most extreme values
from the population.  The minimum value in *data* is treated as the 0th
percentile and the maximum value is treated as the 100th percentile.
The portion of the population falling below the *i-th* of *m* sorted
data points is computed as `(i - 1) / (m - 1)`.  Given 11 sample
values, the method sorts them and assigns the following percentiles:
0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%.

```python

# Decile cut points for empirically sampled data
>>> data = [105, 129, 87, 86, 111, 111, 89, 81, 108, 92, 110,
...         100, 75, 105, 103, 109, 76, 119, 99, 91, 103, 129,
...         106, 101, 84, 111, 74, 87, 86, 103, 103, 106, 86,
...         111, 75, 87, 102, 121, 111, 88, 89, 101, 106, 95,
...         103, 107, 101, 81, 109, 104]
>>> [round(q, 1) for q in quantiles(data, n=10)]
[81.0, 86.2, 89.0, 99.4, 102.5, 103.6, 106.0, 109.8, 111.0]
```

> *Added in version 3.8.*

> *Changed in version 3.13.*
> No longer raises an exception for an input with only a single data point.
> This allows quantile estimates to be built up one sample point
> at a time becoming gradually more refined with each new data point.

### `covariance(x, y, /)`

Return the sample covariance of two sequence inputs *x* and *y*. Covariance
is a measure of the joint variability of two inputs.

Both inputs must be of the same length (no less than two), otherwise
`StatisticsError` is raised.

Examples:

```python

>>> x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> y = [1, 2, 3, 1, 2, 3, 1, 2, 3]
>>> covariance(x, y)
0.75
>>> z = [9, 8, 7, 6, 5, 4, 3, 2, 1]
>>> covariance(x, z)
-7.5
>>> covariance(z, x)
-7.5
```

> *Added in version 3.10.*

### `correlation(x, y, /, *, method='linear')`

Return the `Pearson's correlation coefficient
<https://en.wikipedia.org/wiki/Pearson_correlation_coefficient>`_
for two sequence inputs. Pearson's correlation coefficient *r* takes values
between -1 and +1. It measures the strength and direction of a linear
relationship.

If *method* is "ranked", computes `Spearman's rank correlation coefficient
<https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient>`_
for two inputs. The data is replaced by ranks.  Ties are averaged so that
equal values receive the same rank.  The resulting coefficient measures the
strength of a monotonic relationship.

Spearman's correlation coefficient is appropriate for ordinal data or for
continuous data that doesn't meet the linear proportion requirement for
Pearson's correlation coefficient.

Both inputs must be of the same length (no less than two), and need
not to be constant, otherwise `StatisticsError` is raised.

Example with `Kepler's laws of planetary motion
<https://en.wikipedia.org/wiki/Kepler's_laws_of_planetary_motion>`_:

```python

>>> # Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and  Neptune
>>> orbital_period = [88, 225, 365, 687, 4331, 10_756, 30_687, 60_190]    # days
>>> dist_from_sun = [58, 108, 150, 228, 778, 1_400, 2_900, 4_500] # million km

>>> # Show that a perfect monotonic relationship exists
>>> correlation(orbital_period, dist_from_sun, method='ranked')
1.0

>>> # Observe that a linear relationship is imperfect
>>> round(correlation(orbital_period, dist_from_sun), 4)
0.9882

>>> # Demonstrate Kepler's third law: There is a linear correlation
>>> # between the square of the orbital period and the cube of the
>>> # distance from the sun.
>>> period_squared = [p * p for p in orbital_period]
>>> dist_cubed = [d * d * d for d in dist_from_sun]
>>> round(correlation(period_squared, dist_cubed), 4)
1.0
```

> *Added in version 3.10.*

> *Changed in version 3.12.*
> Added support for Spearman's rank correlation coefficient.

### `linear_regression(x, y, /, *, proportional=False)`

Return the slope and intercept of `simple linear regression
<https://en.wikipedia.org/wiki/Simple_linear_regression>`_
parameters estimated using ordinary least squares. Simple linear
regression describes the relationship between an independent variable *x* and
a dependent variable *y* in terms of this linear function:

*y = slope * x + intercept + noise*

where `slope` and `intercept` are the regression parameters that are
estimated, and `noise` represents the
variability of the data that was not explained by the linear regression
(it is equal to the difference between predicted and actual values
of the dependent variable).

Both inputs must be sequences of the same length (no less than two), and
the independent variable *x* cannot be constant;
otherwise a `StatisticsError` is raised.

For example, we can use the `release dates of the Monty
Python films <https://en.wikipedia.org/wiki/Monty_Python#Films>`_
to predict the cumulative number of Monty Python films
that would have been produced by 2019
assuming that they had kept the pace.

```python

>>> year = [1971, 1975, 1979, 1982, 1983]
>>> films_total = [1, 2, 3, 4, 5]
>>> slope, intercept = linear_regression(year, films_total)
>>> round(slope * 2019 + intercept)
16
```

If *proportional* is true, the independent variable *x* and the
dependent variable *y* are assumed to be directly proportional.
The data is fit to a line passing through the origin.
Since the *intercept* will always be 0.0, the underlying linear
function simplifies to:

*y = slope * x + noise*

Continuing the example from `correlation()`, we look to see
how well a model based on major planets can predict the orbital
distances for dwarf planets:

```python

>>> model = linear_regression(period_squared, dist_cubed, proportional=True)
>>> slope = model.slope

>>> # Dwarf planets:   Pluto,  Eris,    Makemake, Haumea, Ceres
>>> orbital_periods = [90_560, 204_199, 111_845, 103_410, 1_680]  # days
>>> predicted_dist = [math.cbrt(slope * (p * p)) for p in orbital_periods]
>>> list(map(round, predicted_dist))
[5912, 10166, 6806, 6459, 414]

>>> [5_906, 10_152, 6_796, 6_450, 414]  # actual distance in million km
[5906, 10152, 6796, 6450, 414]
```

> *Added in version 3.10.*

> *Changed in version 3.11.*
> Added support for *proportional*.

## Exceptions

A single exception is defined:

### exception `StatisticsError`

Subclass of `ValueError` for statistics-related exceptions.
