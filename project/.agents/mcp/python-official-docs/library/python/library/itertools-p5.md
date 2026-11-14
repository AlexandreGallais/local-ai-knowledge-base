---
title: "itertools --- Functions creating iterators for efficient looping (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/itertools.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# itertools --- Functions creating iterators for efficient looping (part 5 of 6)

```python

These examples no longer appear in the docs but are guaranteed
to keep working.

>>> amounts = [120.15, 764.05, 823.14]
>>> for checknum, amount in zip(count(1200), amounts):
...     print('Check %d is for $%.2f' % (checknum, amount))
...
Check 1200 is for $120.15
Check 1201 is for $764.05
Check 1202 is for $823.14

>>> import operator
>>> for cube in map(operator.pow, range(1,4), repeat(3)):
...    print(cube)
...
1
8
27

>>> reportlines = ['EuroPython', 'Roster', '', 'alex', '', 'laura', '', 'martin', '', 'walter', '', 'samuele']
>>> for name in islice(reportlines, 3, None, 2):
...    print(name.title())
...
Alex
Laura
Martin
Walter
Samuele

>>> from operator import itemgetter
>>> d = dict(a=1, b=2, c=1, d=2, e=1, f=2, g=3)
>>> di = sorted(sorted(d.items()), key=itemgetter(1))
>>> for k, g in groupby(di, itemgetter(1)):
...     print(k, list(map(itemgetter(0), g)))
...
1 ['a', 'c', 'e']
2 ['b', 'd', 'f']
3 ['g']

# Find runs of consecutive numbers using groupby.  The key to the solution
# is differencing with a range so that consecutive numbers all appear in
# same group.
>>> data = [ 1,  4,5,6, 10, 15,16,17,18, 22, 25,26,27,28]
>>> for k, g in groupby(enumerate(data), lambda t:t[0]-t[1]):
...     print(list(map(operator.itemgetter(1), g)))
...
[1]
[4, 5, 6]
[10]
[15, 16, 17, 18]
[22]
[25, 26, 27, 28]

Now, we test all of the itertool recipes

>>> take(10, count())
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> # Verify that the input is consumed lazily
>>> it = iter('abcdef')
>>> take(3, it)
['a', 'b', 'c']
>>> list(it)
['d', 'e', 'f']

>>> list(prepend(1, [2, 3, 4]))
[1, 2, 3, 4]

>>> list(enumerate('abc'))
[(0, 'a'), (1, 'b'), (2, 'c')]

>>> for _ in loops(5):
...     print('hi')
...
hi
hi
hi
hi
hi

>>> list(tail(3, 'ABCDEFG'))
['E', 'F', 'G']
>>> # Verify the input is consumed greedily
>>> input_iterator = iter('ABCDEFG')
>>> output_iterator = tail(3, input_iterator)
>>> list(input_iterator)
[]

>>> it = iter(range(10))
>>> consume(it, 3)
>>> # Verify the input is consumed lazily
>>> next(it)
3
>>> # Verify the input is consumed completely
>>> consume(it)
>>> next(it, 'Done')
'Done'

>>> nth('abcde', 3)
'd'
>>> nth('abcde', 9) is None
True
>>> # Verify that the input is consumed lazily
>>> it = iter('abcde')
>>> nth(it, 2)
'c'
>>> list(it)
['d', 'e']

>>> [all_equal(s) for s in ('', 'A', 'AAAA', 'AAAB', 'AAABA')]
[True, True, True, False, False]
>>> [all_equal(s, key=str.casefold) for s in ('', 'A', 'AaAa', 'AAAB', 'AAABA')]
[True, True, True, False, False]
>>> # Verify that the input is consumed lazily and that only
>>> # one element of a second equivalence class is used to disprove
>>> # the assertion that all elements are equal.
>>> it = iter('aaabbbccc')
>>> all_equal(it)
False
>>> ''.join(it)
'bbccc'

>>> quantify(range(99), lambda x: x%2==0)
50
>>> quantify([True, False, False, True, True])
3
>>> quantify(range(12), predicate=lambda x: x%2==1)
6

>>> a = [[1, 2, 3], [4, 5, 6]]
>>> list(flatten(a))
[1, 2, 3, 4, 5, 6]

>>> list(ncycles('abc', 3))
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']
>>> # Verify greedy consumption of input iterator
>>> input_iterator = iter('abc')
>>> output_iterator = ncycles(input_iterator, 3)
>>> list(input_iterator)
[]

>>> sum_of_squares([10, 20, 30])
1400

>>> list(reshape([(0, 1), (2, 3), (4, 5)], 3))
[(0, 1, 2), (3, 4, 5)]
>>> M = [(0, 1, 2, 3), (4, 5, 6, 7), (8, 9, 10, 11)]
>>> list(reshape(M, 1))
[(0,), (1,), (2,), (3,), (4,), (5,), (6,), (7,), (8,), (9,), (10,), (11,)]
>>> list(reshape(M, 2))
[(0, 1), (2, 3), (4, 5), (6, 7), (8, 9), (10, 11)]
>>> list(reshape(M, 3))
[(0, 1, 2), (3, 4, 5), (6, 7, 8), (9, 10, 11)]
>>> list(reshape(M, 4))
[(0, 1, 2, 3), (4, 5, 6, 7), (8, 9, 10, 11)]
>>> list(reshape(M, 5))
Traceback (most recent call last):
...
ValueError: batched(): incomplete batch
>>> list(reshape(M, 6))
[(0, 1, 2, 3, 4, 5), (6, 7, 8, 9, 10, 11)]
>>> list(reshape(M, 12))
[(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)]

>>> list(transpose([(1, 2, 3), (11, 22, 33)]))
[(1, 11), (2, 22), (3, 33)]
>>> # Verify that the inputs are consumed lazily
>>> input1 = iter([1, 2, 3])
>>> input2 = iter([11, 22, 33])
>>> output_iterator = transpose([input1, input2])
>>> next(output_iterator)
(1, 11)
>>> list(zip(input1, input2))
[(2, 22), (3, 33)]

>>> list(matmul([(7, 5), (3, 5)], [[2, 5], [7, 9]]))
[(49, 80), (41, 60)]
>>> list(matmul([[2, 5], [7, 9], [3, 4]], [[7, 11, 5, 4, 9], [3, 5, 2, 6, 3]]))
[(29, 47, 20, 38, 33), (76, 122, 53, 82, 90), (33, 53, 23, 36, 39)]

>>> list(convolve([1, -1, -20], [1, -3])) == [1, -4, -17, 60]
True
>>> data = [20, 40, 24, 32, 20, 28, 16]
>>> list(convolve(data, [0.25, 0.25, 0.25, 0.25]))
[5.0, 15.0, 21.0, 29.0, 29.0, 26.0, 24.0, 16.0, 11.0, 4.0]
>>> list(convolve(data, [1, -1]))
[20, 20, -16, 8, -12, 8, -12, -16]
>>> list(convolve(data, [1, -2, 1]))
[20, 0, -36, 24, -20, 20, -20, -4, 16]
>>> # Verify signal is consumed lazily and the kernel greedily
>>> signal_iterator = iter([10, 20, 30, 40, 50])
>>> kernel_iterator = iter([1, 2, 3])
>>> output_iterator = convolve(signal_iterator, kernel_iterator)
>>> list(kernel_iterator)
[]
>>> next(output_iterator)
10
>>> next(output_iterator)
40
>>> list(signal_iterator)
[30, 40, 50]

>>> from fractions import Fraction
>>> from decimal import Decimal
>>> polynomial_eval([1, -4, -17, 60], x=5)
0
>>> x = 5; x**3 - 4*x**2 -17*x + 60
0
>>> polynomial_eval([1, -4, -17, 60], x=2.5)
8.125
>>> x = 2.5; x**3 - 4*x**2 -17*x + 60
8.125
>>> polynomial_eval([1, -4, -17, 60], x=Fraction(2, 3))
Fraction(1274, 27)
>>> x = Fraction(2, 3); x**3 - 4*x**2 -17*x + 60
Fraction(1274, 27)
>>> polynomial_eval([1, -4, -17, 60], x=Decimal('1.75'))
Decimal('23.359375')
>>> x = Decimal('1.75'); x**3 - 4*x**2 -17*x + 60
Decimal('23.359375')
>>> polynomial_eval([], 2)
0
>>> polynomial_eval([], 2.5)
0.0
>>> polynomial_eval([], Fraction(2, 3))
Fraction(0, 1)
>>> polynomial_eval([], Decimal('1.75'))
Decimal('0')
>>> polynomial_eval([11], 7) == 11
True
>>> polynomial_eval([11, 2], 7) == 11 * 7 + 2
True

>>> polynomial_from_roots([5, -4, 3])
[1, -4, -17, 60]
>>> factored = lambda x: (x - 5) * (x + 4) * (x - 3)
>>> expanded = lambda x: x**3 -4*x**2 -17*x + 60
>>> all(factored(x) == expanded(x) for x in range(-10, 11))
True

>>> polynomial_derivative([1, -4, -17, 60])
[3, -8, -17]

>>> list(iter_index('AABCADEAF', 'A'))
[0, 1, 4, 7]
>>> list(iter_index('AABCADEAF', 'B'))
[2]
>>> list(iter_index('AABCADEAF', 'X'))
[]
>>> list(iter_index('', 'X'))
[]
>>> list(iter_index('AABCADEAF', 'A', 1))
[1, 4, 7]
>>> list(iter_index(iter('AABCADEAF'), 'A', 1))
[1, 4, 7]
>>> list(iter_index('AABCADEAF', 'A', 2))
[4, 7]
>>> list(iter_index(iter('AABCADEAF'), 'A', 2))
[4, 7]
>>> list(iter_index('AABCADEAF', 'A', 10))
[]
>>> list(iter_index(iter('AABCADEAF'), 'A', 10))
[]
>>> list(iter_index('AABCADEAF', 'A', 1, 7))
[1, 4]
>>> list(iter_index(iter('AABCADEAF'), 'A', 1, 7))
[1, 4]
>>> # Verify that ValueErrors not swallowed (gh-107208)
>>> def assert_no_value(iterable, forbidden_value):
...     for item in iterable:
...         if item == forbidden_value:
...             raise ValueError
...         yield item
...
>>> list(iter_index(assert_no_value('AABCADEAF', 'B'), 'A'))
Traceback (most recent call last):
...
ValueError
>>> # Verify that both paths can find identical NaN values
>>> x = float('NaN')
>>> y = float('NaN')
>>> list(iter_index([0, x, x, y, 0], x))
[1, 2]
>>> list(iter_index(iter([0, x, x, y, 0]), x))
[1, 2]
>>> # Test list input. Lists do not support None for the stop argument
>>> list(iter_index(list('AABCADEAF'), 'A'))
[0, 1, 4, 7]
>>> # Verify that input is consumed lazily
>>> input_iterator = iter('AABCADEAF')
>>> output_iterator = iter_index(input_iterator, 'A')
>>> next(output_iterator)
0
>>> next(output_iterator)
1
>>> next(output_iterator)
4
>>> ''.join(input_iterator)
'DEAF'

>>> # Verify that the target value can be a sequence.
>>> seq = [[10, 20], [30, 40], 30, 40, [30, 40], 50]
>>> target = [30, 40]
>>> list(iter_index(seq, target))
[1, 4]

>>> # Verify faithfulness to type specific index() method behaviors.
>>> # For example, bytes and str perform continuous-subsequence searches
>>> # that do not match the general behavior specified
>>> # in collections.abc.Sequence.index().
>>> seq = 'abracadabra'
>>> target = 'ab'
>>> list(iter_index(seq, target))
[0, 7]

>>> list(sieve(30))
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
>>> small_primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
>>> all(list(sieve(n)) == [p for p in small_primes if p < n] for n in range(101))
True
>>> len(list(sieve(100)))
25
>>> len(list(sieve(1_000)))
168
>>> len(list(sieve(10_000)))
1229
>>> len(list(sieve(100_000)))
9592
>>> len(list(sieve(1_000_000)))
78498
>>> carmichael = {561, 1105, 1729, 2465, 2821, 6601, 8911}  # https://oeis.org/A002997
>>> set(sieve(10_000)).isdisjoint(carmichael)
True

>>> small_primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
>>> list(filter(is_prime, range(-100, 100))) == small_primes
True
>>> carmichael = {561, 1105, 1729, 2465, 2821, 6601, 8911}  # https://oeis.org/A002997
>>> any(map(is_prime, carmichael))
False
>>> # https://www.wolframalpha.com/input?i=is+128884753939+prime
>>> is_prime(128_884_753_939)           # large prime
True
>>> is_prime(999953 * 999983)           # large semiprime
False
>>> is_prime(1_000_000_000_000_007)     # factor() example
False
>>> is_prime(1_000_000_000_000_403)     # factor() example
True

>>> list(factor(99))                    # Code example 1
[3, 3, 11]
>>> list(factor(1_000_000_000_000_007)) # Code example 2
[47, 59, 360620266859]
>>> list(factor(1_000_000_000_000_403)) # Code example 3
[<example-card-number>]
>>> list(factor(0))
[]
>>> list(factor(1))
[]
>>> list(factor(2))
[2]
>>> list(factor(3))
[3]
>>> list(factor(4))
[2, 2]
>>> list(factor(5))
[5]
>>> list(factor(6))
[2, 3]
>>> list(factor(7))
[7]
>>> list(factor(8))
[2, 2, 2]
>>> list(factor(9))
[3, 3]
>>> list(factor(10))
[2, 5]
>>> list(factor(128_884_753_939))       # large prime
[128884753939]
>>> list(factor(999953 * 999983))       # large semiprime
[999953, 999983]
>>> list(factor(6 ** 20)) == [2] * 20 + [3] * 20   # large power
True
>>> list(factor(909_909_090_909))       # large multiterm composite
[3, 3, 7, 13, 13, 751, 113797]
>>> math.prod([3, 3, 7, 13, 13, 751, 113797])
909909090909
>>> all(math.prod(factor(n)) == n for n in range(1, 2_000))
True
>>> all(set(factor(n)) <= set(sieve(n+1)) for n in range(2_000))
True
>>> all(list(factor(n)) == sorted(factor(n)) for n in range(2_000))
True

>>> totient(0)  # https://www.wolframalpha.com/input?i=totient+0
0
>>> first_totients = [1, 1, 2, 2, 4, 2, 6, 4, 6, 4, 10, 4, 12, 6, 8, 8, 16, 6,
... 18, 8, 12, 10, 22, 8, 20, 12, 18, 12, 28, 8, 30, 16, 20, 16, 24, 12, 36, 18,
... 24, 16, 40, 12, 42, 20, 24, 22, 46, 16, 42, 20, 32, 24, 52, 18, 40, 24, 36,
... 28, 58, 16, 60, 30, 36, 32, 48, 20, 66, 32, 44]  # https://oeis.org/A000010
...
>>> list(map(totient, range(1, 70))) == first_totients
True
>>> reference_totient = lambda n: sum(math.gcd(t, n) == 1 for t in range(1, n+1))
>>> all(totient(n) == reference_totient(n) for n in range(1000))
True
>>> totient(128_884_753_939) == 128_884_753_938  # large prime
True
>>> totient(999953 * 999983) == 999952 * 999982  # large semiprime
True
>>> totient(6 ** 20) == 1 * 2**19 * 2 * 3**19    # repeated primes
True

>>> list(flatten([('a', 'b'), (), ('c', 'd', 'e'), ('f',), ('g', 'h', 'i')]))
['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

>>> list(repeatfunc(pow, 5, 2, 3))
[8, 8, 8, 8, 8]
>>> take(5, map(int, repeatfunc(random.random)))
[0, 0, 0, 0, 0]
>>> random.seed(85753098575309)
>>> list(repeatfunc(random.random, 3))
[0.16370491282496968, 0.45889608687313455, 0.<example-card-number>]
>>> list(repeatfunc(chr, 3, 65))
['A', 'A', 'A']
>>> list(repeatfunc(pow, 3, 2, 5))
[32, 32, 32]

>>> list(grouper('abcdefg', 3, fillvalue='x'))
[('a', 'b', 'c'), ('d', 'e', 'f'), ('g', 'x', 'x')]

>>> it = grouper('abcdefg', 3, incomplete='strict')
>>> next(it)
('a', 'b', 'c')
>>> next(it)
('d', 'e', 'f')
>>> next(it)
Traceback (most recent call last):
  ...
ValueError: zip() argument 2 is shorter than argument 1

>>> list(grouper('abcdefg', n=3, incomplete='ignore'))
[('a', 'b', 'c'), ('d', 'e', 'f')]

>>> list(sliding_window('ABCDEFG', 1))
[('A',), ('B',), ('C',), ('D',), ('E',), ('F',), ('G',)]
>>> list(sliding_window('ABCDEFG', 2))
[('A', 'B'), ('B', 'C'), ('C', 'D'), ('D', 'E'), ('E', 'F'), ('F', 'G')]
>>> list(sliding_window('ABCDEFG', 3))
[('A', 'B', 'C'), ('B', 'C', 'D'), ('C', 'D', 'E'), ('D', 'E', 'F'), ('E', 'F', 'G')]
>>> list(sliding_window('ABCDEFG', 4))
[('A', 'B', 'C', 'D'), ('B', 'C', 'D', 'E'), ('C', 'D', 'E', 'F'), ('D', 'E', 'F', 'G')]
>>> list(sliding_window('ABCDEFG', 5))
[('A', 'B', 'C', 'D', 'E'), ('B', 'C', 'D', 'E', 'F'), ('C', 'D', 'E', 'F', 'G')]
>>> list(sliding_window('ABCDEFG', 6))
[('A', 'B', 'C', 'D', 'E', 'F'), ('B', 'C', 'D', 'E', 'F', 'G')]
>>> list(sliding_window('ABCDEFG', 7))
[('A', 'B', 'C', 'D', 'E', 'F', 'G')]
>>> list(sliding_window('ABCDEFG', 8))
[]
>>> try:
...     list(sliding_window('ABCDEFG', -1))
... except ValueError:
...     'zero or negative n not supported'
...
'zero or negative n not supported'
>>> try:
...     list(sliding_window('ABCDEFG', 0))
... except ValueError:
...     'zero or negative n not supported'
...
'zero or negative n not supported'

>>> list(roundrobin('abc', 'd', 'ef'))
['a', 'd', 'e', 'b', 'f', 'c']
>>> ranges = [range(5, 1000), range(4, 3000), range(0), range(3, 2000), range(2, 5000), range(1, 3500)]
>>> collections.Counter(roundrobin(*ranges)) == collections.Counter(chain(*ranges))
True
>>> # Verify that the inputs are consumed lazily
>>> input_iterators = list(map(iter, ['abcd', 'ef', '', 'ghijk', 'l', 'mnopqr']))
>>> output_iterator = roundrobin(*input_iterators)
>>> ''.join(islice(output_iterator, 10))
'aeglmbfhnc'
>>> ''.join(chain(*input_iterators))
'dijkopqr'

>>> list(subslices('ABCD'))
['A', 'AB', 'ABC', 'ABCD', 'B', 'BC', 'BCD', 'C', 'CD', 'D']

>>> ' '.join(map(''.join, derangements('ABCD')))
'BADC BCDA BDAC CADB CDAB CDBA DABC DCAB DCBA'
>>> ' '.join(map(''.join, derangements('ABCD', 3)))
'BAD BCA BCD BDA CAB CAD CDA CDB DAB DCA DCB'
>>> ' '.join(map(''.join, derangements('ABCD', 2)))
'BA BC BD CA CD DA DC'
>>> ' '.join(map(''.join, derangements('ABCD', 1)))
'B C D'
>>> ' '.join(map(''.join, derangements('ABCD', 0)))
''
>>> # Compare number of derangements to https://oeis.org/A000166
>>> [len(list(derangements(range(n)))) for n in range(10)]
[1, 0, 1, 2, 9, 44, 265, 1854, 14833, 133496]
>>> # Verify that identical objects are treated as unique by position
>>> identical = 'X'
>>> distinct = 'x'
>>> seq1 = ('A', identical, 'B', identical)
>>> result1 = ' '.join(map(''.join, derangements(seq1)))
>>> result1
'XAXB XBXA XXAB BAXX BXAX BXXA XAXB XBAX XBXA'
>>> seq2 = ('A', identical, 'B', distinct)
>>> result2 = ' '.join(map(''.join, derangements(seq2)))
>>> result2
```
