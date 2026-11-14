---
title: "random --- Generate pseudo-random numbers (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/random.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# random --- Generate pseudo-random numbers (part 2 of 2)

## Alternative Generator

### class `Random([seed])`

Class that implements the default pseudo-random number generator used by the
`random` module.

> *Changed in version 3.11.*
> Formerly the *seed* could be any hashable object.  Now it is limited to:
> `None`, `int`, `float`, `str`,
> `bytes`, or `bytearray`.

Subclasses of `Random` should override the following methods if they
wish to make use of a different basic <example-value>:

### `Random.seed(a=None, version=2)`

Override this method in subclasses to customise the `seed()`
behaviour of `Random` instances.

### `Random.getstate()`

Override this method in subclasses to customise the `getstate()`
behaviour of `Random` instances.

### `Random.setstate(state)`

Override this method in subclasses to customise the `setstate()`
behaviour of `Random` instances.

### `Random.random()`

Override this method in subclasses to customise the `random()`
behaviour of `Random` instances.

Optionally, a custom generator subclass can also supply the following method:

### `Random.getrandbits(k)`

Override this method in subclasses to customise the
`getrandbits()` behaviour of `Random` instances.

### `Random.randbytes(n)`

Override this method in subclasses to customise the
`randbytes()` behaviour of `Random` instances.

### class `SystemRandom([seed])`

Class that uses the `os.urandom()` function for generating random numbers
from sources provided by the operating system. Not available on all systems.
Does not rely on software state, and sequences are not reproducible. Accordingly,
the `seed()` method has no effect and is ignored.
The `getstate()` and `setstate()` methods raise
`NotImplementedError` if called.

## Notes on Reproducibility

Sometimes it is useful to be able to reproduce the sequences given by a
pseudo-random number generator.  By reusing a seed value, the same sequence should be
reproducible from run to run as long as multiple threads are not running.

Most of the random module's algorithms and seeding functions are subject to
change across Python versions, but two aspects are guaranteed not to change:

- If a new seeding method is added, then a backward compatible seeder will be
offered.

- The generator's `random()` method will continue to produce the same
sequence when the compatible seeder is given the same seed.

## Examples

Basic <example-value>:

```
>>> random()                          # Random float:  0.0 <= x < 1.0
0.37444887175646646

>>> uniform(2.5, 10.0)                # Random float:  2.5 <= x <= 10.0
3.<example-card-number>

>>> expovariate(1 / 5)                # Interval between arrivals averaging 5 seconds
5.148957571865031

>>> randrange(10)                     # Integer from 0 to 9 inclusive
7

>>> randrange(0, 101, 2)              # Even integer from 0 to 100 inclusive
26

>>> choice(['win', 'lose', 'draw'])   # Single random element from a sequence
'draw'

>>> deck = 'ace two three four'.split()
>>> shuffle(deck)                     # Shuffle a list
>>> deck
['four', 'two', 'ace', 'three']

>>> sample([10, 20, 30, 40, 50], k=4) # Four samples without replacement
[40, 10, 50, 30]
```

Simulations:

```
>>> # Six roulette wheel spins (weighted sampling with replacement)
>>> choices(['red', 'black', 'green'], [18, 18, 2], k=6)
['red', 'green', 'black', 'black', 'red', 'black']

>>> # Deal 20 cards without replacement from a deck
>>> # of 52 playing cards, and determine the proportion of cards
>>> # with a ten-value:  ten, jack, queen, or king.
>>> deal = sample(['tens', 'low cards'], counts=[16, 36], k=20)
>>> deal.count('tens') / 20
0.15

>>> # Estimate the probability of getting 5 or more heads from 7 spins
>>> # of a biased coin that settles on heads 60% of the time.
>>> sum(binomialvariate(n=7, p=0.6) >= 5 for i in range(10_000)) / 10_000
0.4169

>>> # Probability of the median of 5 samples being in middle two quartiles
>>> def trial():
...     return 2_500 <= sorted(choices(range(10_000), k=5))[2] < 7_500
...
>>> sum(trial() for i in range(10_000)) / 10_000
0.7958
```

Example of `statistical bootstrapping
<https://en.wikipedia.org/wiki/Bootstrapping_(statistics)>`_ using resampling
with replacement to estimate a confidence interval for the mean of a sample:

```
# https://www.thoughtco.com/example-of-bootstrapping-3126155
from statistics import fmean as mean
from random import choices

data = [41, 50, 29, 37, 81, 30, 73, 63, 20, 35, 68, 22, 60, 31, 95]
means = sorted(mean(choices(data, k=len(data))) for i in range(100))
print(f'The sample mean of {mean(data):.1f} has a 90% confidence '
      f'interval from {means[5]:.1f} to {means[94]:.1f}')
```

Example of a `resampling permutation test
<https://en.wikipedia.org/wiki/Resampling_(statistics)#Permutation_tests>`_
to determine the statistical significance or `p-value
<https://en.wikipedia.org/wiki/P-value>`_ of an observed difference
between the effects of a drug versus a placebo:

```
# Example from "Statistics is Easy" by Dennis Shasha and Manda Wilson
from statistics import fmean as mean
from random import shuffle

drug = [54, 73, 53, 70, 73, 68, 52, 65, 65]
placebo = [54, 51, 58, 44, 55, 52, 42, 47, 58, 46]
observed_diff = mean(drug) - mean(placebo)

n = 10_000
count = 0
combined = drug + placebo
for i in range(n):
    shuffle(combined)
    new_diff = mean(combined[:len(drug)]) - mean(combined[len(drug):])
    count += (new_diff >= observed_diff)

print(f'{n} label reshufflings produced only {count} instances with a difference')
print(f'at least as extreme as the observed difference of {observed_diff:.1f}.')
print(f'The one-sided p-value of {count / n:.4f} leads us to reject the null')
print(f'hypothesis that there is no difference between the drug and the placebo.')
```

Simulation of arrival times and service deliveries for a multiserver queue:

```
from heapq import heapify, heapreplace
from random import expovariate, gauss
from statistics import mean, quantiles

average_arrival_interval = 5.6
average_service_time = 15.0
stdev_service_time = 3.5
num_servers = 3

waits = []
arrival_time = 0.0
servers = [0.0] * num_servers  # time when each server becomes available
heapify(servers)
for i in range(1_000_000):
    arrival_time += expovariate(1.0 / average_arrival_interval)
    next_server_available = servers[0]
    wait = max(0.0, next_server_available - arrival_time)
    waits.append(wait)
    service_duration = max(0.0, gauss(average_service_time, stdev_service_time))
    service_completed = arrival_time + wait + service_duration
    heapreplace(servers, service_completed)

print(f'Mean wait: {mean(waits):.1f}   Max wait: {max(waits):.1f}')
print('Quartiles:', [round(q, 1) for q in quantiles(waits)])
```

> **See also:** Statistics for Hackers
> a video tutorial by
> Jake Vanderplas
> on statistical analysis using just a few fundamental concepts
> including simulation, sampling, shuffling, and cross-validation.
>
> `Economics Simulation
> <https://nbviewer.org/url/norvig.com/ipython/Economics.ipynb>`_
> a simulation of a marketplace by
> Peter Norvig that shows effective
> use of many of the tools and distributions provided by this module
> (gauss, uniform, sample, betavariate, choice, triangular, and randrange).
>
> `A Concrete Introduction to Probability (using Python)
> <https://nbviewer.org/url/norvig.com/ipython/Probability.ipynb>`_
> a tutorial by Peter Norvig covering
> the basics of probability theory, how to write simulations, and
> how to perform data analysis using Python.

## Recipes

These recipes show how to efficiently make random selections
from the combinatoric iterators in the `itertools` module
or the more-itertools project:

```python

import random

def random_product(*iterables, repeat=1):
    "Random selection from itertools.product(*iterables, repeat=repeat)"
    pools = tuple(map(tuple, iterables)) * repeat
    return tuple(map(random.choice, pools))

def random_permutation(iterable, r=None):
    "Random selection from itertools.permutations(iterable, r)"
    pool = tuple(iterable)
    r = len(pool) if r is None else r
    return tuple(random.sample(pool, r))

def random_combination(iterable, r):
    "Random selection from itertools.combinations(iterable, r)"
    pool = tuple(iterable)
    n = len(pool)
    indices = sorted(random.sample(range(n), r))
    return tuple(pool[i] for i in indices)

def random_combination_with_replacement(iterable, r):
    "Choose r elements with replacement.  Order the result to match the iterable."
    # Result will be in set(itertools.combinations_with_replacement(iterable, r)).
    pool = tuple(iterable)
    n = len(pool)
    indices = sorted(random.choices(range(n), k=r))
    return tuple(pool[i] for i in indices)

def random_derangement(iterable):
    "Choose a permutation where no element stays in its original position."
    seq = tuple(iterable)
    if len(seq) < 2:
        if not seq:
            return ()
        raise IndexError('No derangments to choose from')
    perm = list(range(len(seq)))
    start = tuple(perm)
    while True:
        random.shuffle(perm)
        if all(p != q for p, q in zip(start, perm)):
            return tuple([seq[i] for i in perm])
```

```python

>>> import random

>>> random.seed(8675309)
>>> random_product('ABCDEFG', repeat=5)
('D', 'B', 'E', 'F', 'E')

>>> random.seed(8675309)
>>> random_permutation('ABCDEFG')
('D', 'B', 'E', 'C', 'G', 'A', 'F')
>>> random_permutation('ABCDEFG', 5)
('A', 'G', 'D', 'C', 'B')

>>> random.seed(8675309)
>>> random_combination('ABCDEFG', 7)
('A', 'B', 'C', 'D', 'E', 'F', 'G')
>>> random_combination('ABCDEFG', 6)
('A', 'B', 'C', 'D', 'F', 'G')
>>> random_combination('ABCDEFG', 5)
('A', 'B', 'C', 'E', 'F')
>>> random_combination('ABCDEFG', 4)
('B', 'C', 'D', 'G')
>>> random_combination('ABCDEFG', 3)
('B', 'E', 'G')
>>> random_combination('ABCDEFG', 2)
('E', 'G')
>>> random_combination('ABCDEFG', 1)
('C',)
>>> random_combination('ABCDEFG', 0)
()

>>> random.seed(8675309)
>>> random_combination_with_replacement('ABCDEFG', 7)
('B', 'C', 'D', 'E', 'E', 'E', 'G')
>>> random_combination_with_replacement('ABCDEFG', 3)
('A', 'B', 'E')
>>> random_combination_with_replacement('ABCDEFG', 2)
('A', 'G')
>>> random_combination_with_replacement('ABCDEFG', 1)
('E',)
>>> random_combination_with_replacement('ABCDEFG', 0)
()

>>> random.seed(8675309)
>>> random_derangement('')
()
>>> random_derangement('A')
Traceback (most recent call last):
...
IndexError: No derangments to choose from
>>> random_derangement('AB')
('B', 'A')
>>> random_derangement('ABC')
('C', 'A', 'B')
>>> random_derangement('ABCD')
('B', 'A', 'D', 'C')
>>> random_derangement('ABCDE')
('B', 'C', 'A', 'E', 'D')
>>> # Identical inputs treated as distinct
>>> identical = 20
>>> random_derangement((10, identical, 30, identical))
(20, 30, 10, 20)
```

The default `.random()` returns multiples of 2⁻⁵³ in the range
*0.0 ≤ x < 1.0*.  All such numbers are evenly spaced and are exactly
representable as Python floats.  However, many other representable
floats in that interval are not possible selections.  For example,
`0.05954861408025609` isn't an integer multiple of 2⁻⁵³.

The following recipe takes a different approach.  All floats in the
interval are possible selections.  The mantissa comes from a uniform
distribution of integers in the range *2⁵² ≤ mantissa < 2⁵³*.  The
exponent comes from a geometric distribution where exponents smaller
than *-53* occur half as often as the next larger exponent.

```
from random import Random
from math import ldexp

class FullRandom(Random):

    def random(self):
        mantissa = 0x10_0000_0000_0000 | self.getrandbits(52)
        exponent = -53
        x = 0
        while not x:
            x = self.getrandbits(32)
            exponent += x.bit_length() - 32
        return ldexp(mantissa, exponent)
```

All real valued distributions
in the class will use the new method:

```
>>> fr = FullRandom()
>>> fr.random()
0.05954861408025609
>>> fr.expovariate(0.25)
8.87925541791544
```

The recipe is conceptually equivalent to an algorithm that chooses from
all the multiples of 2⁻¹⁰⁷⁴ in the range *0.0 ≤ x < 1.0*.  All such
numbers are evenly spaced, but most have to be rounded down to the
nearest representable Python float.  (The value 2⁻¹⁰⁷⁴ is the smallest
positive unnormalized float and is equal to `math.ulp(0.0)`.)

> **See also:** `Generating Pseudo-random Floating-Point Values
> <https://allendowney.com/research/rand/downey07randfloat.pdf>`_ a
> paper by Allen B. Downey describing ways to generate more
> fine-grained floats than normally generated by `.random()`.

## Command-line usage

> *Added in version 3.13.*

The `random` module can be executed from the command line.

```sh
python -m random [-h] [-c CHOICE [CHOICE ...] | -i N | -f N] [input ...]
```

The following options are accepted:

random

### option `-h, --help`

Show the help message and exit.

### option `-c CHOICE [CHOICE ...]`

```python
--choice CHOICE [CHOICE ...]
```

Print a random choice, using `choice()`.

### option `-i <N>`

```python
--integer <N>
```

Print a random integer between 1 and N inclusive, using `randint()`.

### option `-f <N>`

```python
--float <N>
```

Print a random floating-point number between 0 and N inclusive,
using `uniform()`.

If no options are given, the output depends on the input:

- String or multiple: same as `--choice`.
- Integer: same as `--integer`.
- Float: same as `--float`.

## Command-line example

Here are some examples of the `random` command-line interface:

```console
$ # Choose one at random
$ python -m random egg bacon sausage spam "Lobster Thermidor aux crevettes with a Mornay sauce"
Lobster Thermidor aux crevettes with a Mornay sauce

$ # Random integer
$ python -m random 6
6

$ # Random floating-point number
$ python -m random 1.8
1.<example-card-number>

$ # With explicit arguments
$ python  -m random --choice egg bacon sausage spam "Lobster Thermidor aux crevettes with a Mornay sauce"
egg

$ python -m random --integer 6
3

$ python -m random --float 1.8
1.<example-card-number>

$ python -m random --integer 6
5

$ python -m random --float 6
3.<example-card-number>
```
