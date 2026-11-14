---
title: "statistics --- Mathematical statistics functions (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/statistics.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# statistics --- Mathematical statistics functions (part 2 of 4)

## Function details

Note: The functions do not require the data given to them to be sorted.
However, for reading convenience, most of the examples show sorted sequences.

### `mean(data)`

Return the sample arithmetic mean of *data* which can be a sequence or iterable.

The arithmetic mean is the sum of the data divided by the number of data
points.  It is commonly called "the average", although it is only one of many
different mathematical averages.  It is a measure of the central location of
the data.

If *data* is empty, `StatisticsError` will be raised.

Some examples of use:

```python

>>> mean([1, 2, 3, 4, 4])
2.8
>>> mean([-1.0, 2.5, 3.25, 5.75])
2.625

>>> from fractions import Fraction as F
>>> mean([F(3, 7), F(1, 21), F(5, 3), F(1, 3)])
Fraction(13, 21)

>>> from decimal import Decimal as D
>>> mean([D("0.5"), D("0.75"), D("0.625"), D("0.375")])
Decimal('0.5625')
```

> **Note:** The mean is strongly affected by `outliers
> <https://en.wikipedia.org/wiki/Outlier>`_ and is not necessarily a
> typical example of the data points. For a more robust, although less
> efficient, measure of `central tendency
> <https://en.wikipedia.org/wiki/Central_tendency>`_, see `median()`.
>
> The sample mean gives an unbiased estimate of the true population mean,
> so that when taken on average over all the possible samples,
> `mean(sample)` converges on the true mean of the entire population.  If
> *data* represents the entire population rather than a sample, then
> `mean(data)` is equivalent to calculating the true population mean μ.

### `fmean(data, weights=None)`

Convert *data* to floats and compute the arithmetic mean.

This runs faster than the `mean()` function and it always returns a
`float`.  The *data* may be a sequence or iterable.  If the input
dataset is empty, raises a `StatisticsError`.

```python

>>> fmean([3.5, 4.0, 5.25])
4.25
```

Optional weighting is supported.  For example, a professor assigns a
grade for a course by weighting quizzes at 20%, homework at 20%, a
midterm exam at 30%, and a final exam at 30%:

```python

>>> grades = [85, 92, 83, 91]
>>> weights = [0.20, 0.20, 0.30, 0.30]
>>> fmean(grades, weights)
87.6
```

If *weights* is supplied, it must be the same length as the *data* or
a `ValueError` will be raised.

> *Added in version 3.8.*

> *Changed in version 3.11.*
> Added support for *weights*.

### `geometric_mean(data)`

Convert *data* to floats and compute the geometric mean.

The geometric mean indicates the central tendency or typical value of the
*data* using the product of the values (as opposed to the arithmetic mean
which uses their sum).

Raises a `StatisticsError` if the input dataset is empty,
if it contains a zero, or if it contains a negative value.
The *data* may be a sequence or iterable.

No special efforts are made to achieve exact results.
(However, this may change in the future.)

```python

>>> round(geometric_mean([54, 24, 36]), 1)
36.0
```

> *Added in version 3.8.*

### `harmonic_mean(data, weights=None)`

Return the harmonic mean of *data*, a sequence or iterable of
real-valued numbers.  If *weights* is omitted or `None`, then
equal weighting is assumed.

The harmonic mean is the reciprocal of the arithmetic `mean()` of the
reciprocals of the data. For example, the harmonic mean of three values *a*,
*b* and *c* will be equivalent to `3/(1/a + 1/b + 1/c)`.  If one of the
values is zero, the result will be zero.

The harmonic mean is a type of average, a measure of the central
location of the data.  It is often appropriate when averaging
ratios or rates, for example speeds.

Suppose a car travels 10 km at 40 km/hr, then another 10 km at 60 km/hr.
What is the average speed?

```python

>>> harmonic_mean([40, 60])
48.0
```

Suppose a car travels 40 km/hr for 5 km, and when traffic clears,
speeds-up to 60 km/hr for the remaining 30 km of the journey. What
is the average speed?

```python

>>> harmonic_mean([40, 60], weights=[5, 30])
56.0
```

`StatisticsError` is raised if *data* is empty, any element
is less than zero, or if the weighted sum isn't positive.

The current algorithm has an early-out when it encounters a zero
in the input.  This means that the subsequent inputs are not tested
for validity.  (This behavior may change in the future.)

> *Added in version 3.6.*

> *Changed in version 3.10.*
> Added support for *weights*.

### `kde(data, h, kernel='normal', *, cumulative=False)`

`Kernel Density Estimation (KDE)
<https://www.itm-conferences.org/articles/itmconf/pdf/2018/08/itmconf_sam2018_00037.pdf>`_:
Create a continuous probability density function or cumulative
distribution function from discrete samples.

The basic idea is to smooth the data using `a kernel function
<https://en.wikipedia.org/wiki/Kernel_(statistics)>`_.
to help draw inferences about a population from a sample.

The degree of smoothing is controlled by the scaling parameter *h*
which is called the bandwidth.  Smaller values emphasize local
features while larger values give smoother results.

The *kernel* determines the relative weights of the sample data
points.  Generally, the choice of kernel shape does not matter
as much as the more influential bandwidth smoothing parameter.

Kernels that give some weight to every sample point include
*normal* (*gauss*), *logistic*, and *sigmoid*.

Kernels that only give weight to sample points within the bandwidth
include *rectangular* (*uniform*), *triangular*, *parabolic*
(*epanechnikov*), *quartic* (*biweight*), *triweight*, and *cosine*.

If *cumulative* is true, will return a cumulative distribution function.

A `StatisticsError` will be raised if the *data* sequence is empty.

`Wikipedia has an example
<https://en.wikipedia.org/wiki/Kernel_density_estimation#Example>`_
where we can use `kde()` to generate and plot a probability
density function estimated from a small sample:

```python

>>> sample = [-2.1, -1.3, -0.4, 1.9, 5.1, 6.2]
>>> f_hat = kde(sample, h=1.5)
>>> xarr = [i/100 for i in range(-750, 1100)]
>>> yarr = [f_hat(x) for x in xarr]
```

The points in `xarr` and `yarr` can be used to make a PDF plot:

> *Added in version 3.13.*

### `kde_random(data, h, kernel='normal', *, seed=None)`

Return a function that makes a random selection from the estimated
probability density function produced by `kde(data, h, kernel)`.

Providing a *seed* allows reproducible selections. In the future, the
values may change slightly as more accurate kernel inverse CDF estimates
are implemented.  The seed may be an integer, float, str, or bytes.

A `StatisticsError` will be raised if the *data* sequence is empty.

Continuing the example for `kde()`, we can use
`kde_random()` to generate new random selections from an
estimated probability density function:

```python
>>> data = [-2.1, -1.3, -0.4, 1.9, 5.1, 6.2]
>>> rand = kde_random(data, h=1.5, seed=8675309)
>>> new_selections = [rand() for i in range(10)]
>>> [round(x, 1) for x in new_selections]
[0.7, 6.2, 1.2, 6.9, 7.0, 1.8, 2.5, -0.5, -1.8, 5.6]
```

> *Added in version 3.13.*

### `median(data)`

Return the median (middle value) of numeric data, using the common "mean of
middle two" method.  If *data* is empty, `StatisticsError` is raised.
*data* can be a sequence or iterable.

The median is a robust measure of central location and is less affected by
the presence of outliers.  When the number of data points is odd, the
middle data point is returned:

```python

>>> median([1, 3, 5])
3
```

When the number of data points is even, the median is interpolated by taking
the average of the two middle values:

```python

>>> median([1, 3, 5, 7])
4.0
```

This is suited for when your data is discrete, and you don't mind that the
median may not be an actual data point.

If the data is ordinal (supports order operations) but not numeric (doesn't
support addition), consider using `median_low()` or `median_high()`
instead.

### `median_low(data)`

Return the low median of numeric data.  If *data* is empty,
`StatisticsError` is raised.  *data* can be a sequence or iterable.

The low median is always a member of the data set.  When the number of data
points is odd, the middle value is returned.  When it is even, the smaller of
the two middle values is returned.

```python

>>> median_low([1, 3, 5])
3
>>> median_low([1, 3, 5, 7])
3
```

Use the low median when your data are discrete and you prefer the median to
be an actual data point rather than interpolated.

### `median_high(data)`

Return the high median of data.  If *data* is empty, `StatisticsError`
is raised.  *data* can be a sequence or iterable.

The high median is always a member of the data set.  When the number of data
points is odd, the middle value is returned.  When it is even, the larger of
the two middle values is returned.

```python

>>> median_high([1, 3, 5])
3
>>> median_high([1, 3, 5, 7])
5
```

Use the high median when your data are discrete and you prefer the median to
be an actual data point rather than interpolated.

### `median_grouped(data, interval=1.0)`

Estimates the median for numeric data that has been `grouped or binned
<https://en.wikipedia.org/wiki/Data_binning>`_ around the midpoints
of consecutive, fixed-width intervals.

The *data* can be any iterable of numeric data with each value being
exactly the midpoint of a bin.  At least one value must be present.

The *interval* is the width of each bin.

For example, demographic information may have been summarized into
consecutive ten-year age groups with each group being represented
by the 5-year midpoints of the intervals:

```python

>>> from collections import Counter
>>> demographics = Counter({
...    25: 172,   # 20 to 30 years old
...    35: 484,   # 30 to 40 years old
...    45: 387,   # 40 to 50 years old
...    55:  22,   # 50 to 60 years old
...    65:   6,   # 60 to 70 years old
... })
...
```

The 50th percentile (median) is the 536th person out of the 1071
member cohort.  That person is in the 30 to 40 year old age group.

The regular `median()` function would assume that everyone in the
tricenarian age group was exactly 35 years old.  A more tenable
assumption is that the 484 members of that age group are evenly
distributed between 30 and 40.  For that, we use
`median_grouped()`:

```python

>>> data = list(demographics.elements())
>>> median(data)
35
>>> round(median_grouped(data, interval=10), 1)
37.5
```

The caller is responsible for making sure the data points are separated
by exact multiples of *interval*.  This is essential for getting a
correct result.  The function does not check this precondition.

Inputs may be any numeric type that can be coerced to a float during
the interpolation step.

### `mode(data)`

Return the single most common data point from discrete or nominal *data*.
The mode (when it exists) is the most typical value and serves as a
measure of central location.

If there are multiple modes with the same frequency, returns the first one
encountered in the *data*.  If the smallest or largest of those is
desired instead, use `min(multimode(data))` or `max(multimode(data))`.
If the input *data* is empty, `StatisticsError` is raised.

`mode` assumes discrete data and returns a single value. This is the
standard treatment of the mode as commonly taught in schools:

```python

>>> mode([1, 1, 2, 3, 3, 3, 3, 4])
3
```

The mode is unique in that it is the only statistic in this package that
also applies to nominal (non-numeric) data:

```python

>>> mode(["red", "blue", "blue", "red", "green", "red", "red"])
'red'
```

Only hashable inputs are supported.  To handle type `set`,
consider casting to `frozenset`.  To handle type `list`,
consider casting to `tuple`.  For mixed or nested inputs, consider
using this slower quadratic algorithm that only depends on equality tests:
`max(data, key=data.count)`.

> *Changed in version 3.8.*
> Now handles multimodal datasets by returning the first mode encountered.
> Formerly, it raised `StatisticsError` when more than one mode was
> found.

### `multimode(data)`

Return a list of the most frequently occurring values in the order they
were first encountered in the *data*.  Will return more than one result if
there are multiple modes or an empty list if the *data* is empty:

```python

>>> multimode('aabbbbccddddeeffffgg')
['b', 'd', 'f']
>>> multimode('')
[]
```

> *Added in version 3.8.*

### `pstdev(data, mu=None)`

Return the population standard deviation (the square root of the population
variance).  See `pvariance()` for arguments and other details.

```python

>>> pstdev([1.5, 2.5, 2.5, 2.75, 3.25, 4.75])
0.986893273527251
```

### `pvariance(data, mu=None)`

Return the population variance of *data*, a non-empty sequence or iterable
of real-valued numbers.  Variance, or second moment about the mean, is a
measure of the variability (spread or dispersion) of data.  A large
variance indicates that the data is spread out; a small variance indicates
it is clustered closely around the mean.

If the optional second argument *mu* is given, it should be the *population*
mean of the *data*.  It can also be used to compute the second moment around
a point that is not the mean.  If it is missing or `None` (the default),
the arithmetic mean is automatically calculated.

Use this function to calculate the variance from the entire population.  To
estimate the variance from a sample, the `variance()` function is usually
a better choice.

Raises `StatisticsError` if *data* is empty.

Examples:

```python

>>> data = [0.0, 0.25, 0.25, 1.25, 1.5, 1.75, 2.75, 3.25]
>>> pvariance(data)
1.25
```

If you have already calculated the mean of your data, you can pass it as the
optional second argument *mu* to avoid recalculation:

```python

>>> mu = mean(data)
>>> pvariance(data, mu)
1.25
```

Decimals and Fractions are supported:

```python

>>> from decimal import Decimal as D
>>> pvariance([D("27.5"), D("30.25"), D("30.25"), D("34.5"), D("41.75")])
Decimal('24.815')

>>> from fractions import Fraction as F
>>> pvariance([F(1, 4), F(5, 4), F(1, 2)])
Fraction(13, 72)
```

> **Note:** When called with the entire population, this gives the population variance
> σ².  When called on a sample instead, this is the biased sample variance
> s², also known as variance with N degrees of freedom.
>
> If you somehow know the true population mean μ, you may use this
> function to calculate the variance of a sample, giving the known
> population mean as the second argument.  Provided the data points are a
> random sample of the population, the result will be an unbiased estimate
> of the population variance.

### `stdev(data, xbar=None)`

Return the sample standard deviation (the square root of the sample
variance).  See `variance()` for arguments and other details.

```python

>>> stdev([1.5, 2.5, 2.5, 2.75, 3.25, 4.75])
1.<example-card-number>
```
