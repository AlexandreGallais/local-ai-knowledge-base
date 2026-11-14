---
title: "itertools --- Functions creating iterators for efficient looping (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/itertools.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# itertools --- Functions creating iterators for efficient looping (part 6 of 6)

```python
'XAxB XBxA XxAB BAxX BxAX BxXA xAXB xBAX xBXA'
>>> result1 == result2
False
>>> result1.casefold() == result2.casefold()
True

>>> list(powerset([1,2,3]))
[(), (1,), (2,), (3,), (1, 2), (1, 3), (2, 3), (1, 2, 3)]
>>> all(len(list(powerset(range(n)))) == 2**n for n in range(18))
True
>>> list(powerset('abcde')) == sorted(sorted(set(powerset('abcde'))), key=len)
True

>>> list(unique_everseen('AAAABBBCCDAABBB'))
['A', 'B', 'C', 'D']
>>> list(unique_everseen('ABBCcAD', str.casefold))
['A', 'B', 'C', 'D']
>>> list(unique_everseen('ABBcCAD', str.casefold))
['A', 'B', 'c', 'D']
>>> # Verify that the input is consumed lazily
>>> input_iterator = iter('AAAABBBCCDAABBB')
>>> output_iterator = unique_everseen(input_iterator)
>>> next(output_iterator)
'A'
>>> ''.join(input_iterator)
'AAABBBCCDAABBB'

>>> list(unique_justseen('AAAABBBCCDAABBB'))
['A', 'B', 'C', 'D', 'A', 'B']
>>> list(unique_justseen('ABBCcAD', str.casefold))
['A', 'B', 'C', 'A', 'D']
>>> list(unique_justseen('ABBcCAD', str.casefold))
['A', 'B', 'c', 'A', 'D']
>>> # Verify that the input is consumed lazily
>>> input_iterator = iter('AAAABBBCCDAABBB')
>>> output_iterator = unique_justseen(input_iterator)
>>> next(output_iterator)
'A'
>>> ''.join(input_iterator)
'AAABBBCCDAABBB'

>>> list(unique([[1, 2], [3, 4], [1, 2]]))
[[1, 2], [3, 4]]
>>> list(unique('ABBcCAD', str.casefold))
['A', 'B', 'c', 'D']
>>> list(unique('ABBcCAD', str.casefold, reverse=True))
['D', 'c', 'B', 'A']

>>> d = dict(a=1, b=2, c=3)
>>> it = iter_except(d.popitem, KeyError)
>>> d['d'] = 4
>>> next(it)
('d', 4)
>>> next(it)
('c', 3)
>>> next(it)
('b', 2)
>>> d['e'] = 5
>>> next(it)
('e', 5)
>>> next(it)
('a', 1)
>>> next(it, 'empty')
'empty'

>>> first_true('ABC0DEF1', '9', str.isdigit)
'0'
>>> # Verify that inputs are consumed lazily
>>> it = iter('ABC0DEF1')
>>> first_true(it, predicate=str.isdigit)
'0'
>>> ''.join(it)
'DEF1'

>>> multinomial(5, 2, 2, 1, 1)
83160
>>> word = 'coffee'
>>> multinomial(*Counter(word).values()) == len(set(permutations(word)))
True

>>> list(running_mean([8.5, 9.5, 7.5, 6.5]))
[8.5, 9.0, 8.5, 8.0]
>>> list(running_mean([37, 33, 38, 28]))
[37.0, 35.0, 36.0, 34.0]

>>> list(running_min([37, 33, 38, 28]))
[37, 33, 33, 28]

>>> list(running_max([37, 33, 38, 28]))
[37, 37, 38, 38]

>>> list(running_median([37, 33, 38, 28]))
[37, 35.0, 37, 35.0]

>>> list(running_statistics([37, 33, 38, 28]))
[(1, 37, 37, 37, 37.0), (2, 33, 35.0, 37, 35.0), (3, 33, 37, 38, 36.0), (4, 28, 35.0, 38, 34.0)]
```

```python

# Old recipes and their tests which are guaranteed to continue to work.

def tabulate(function, start=0):
    "Return function(0), function(1), ..."
    return map(function, count(start))

def old_sumprod_recipe(vec1, vec2):
    "Compute a sum of products."
    return sum(starmap(operator.mul, zip(vec1, vec2, strict=True)))

def dotproduct(vec1, vec2):
    return sum(map(operator.mul, vec1, vec2))

def pad_none(iterable):
    """Returns the sequence elements and then returns None indefinitely.

    Useful for emulating the behavior of the built-in map() function.
    """
    return chain(iterable, repeat(None))

def triplewise(iterable):
    "Return overlapping triplets from an iterable"
    # triplewise('ABCDEFG') → ABC BCD CDE DEF EFG
    for (a, _), (b, c) in pairwise(pairwise(iterable)):
        yield a, b, c

def nth_combination(iterable, r, index):
    "Equivalent to list(combinations(iterable, r))[index]"
    pool = tuple(iterable)
    n = len(pool)
    c = math.comb(n, r)
    if index < 0:
        index += c
    if index < 0 or index >= c:
        raise IndexError
    result = []
    while r:
        c, n, r = c*r//n, n-1, r-1
        while index >= c:
            index -= c
            c, n = c*(n-r)//n, n-1
        result.append(pool[-1-n])
    return tuple(result)

def before_and_after(predicate, it):
   """ Variant of takewhile() that allows complete
       access to the remainder of the iterator.

       >>> it = iter('ABCdEfGhI')
       >>> all_upper, remainder = before_and_after(str.isupper, it)
       >>> ''.join(all_upper)
       'ABC'
       >>> ''.join(remainder)     # takewhile() would lose the 'd'
       'dEfGhI'

       Note that the true iterator must be fully consumed
       before the remainder iterator can generate valid results.
   """
   it = iter(it)
   transition = []

   def true_iterator():
       for elem in it:
           if predicate(elem):
               yield elem
           else:
               transition.append(elem)
               return

   return true_iterator(), chain(transition, it)

def partition(predicate, iterable):
    """Partition entries into false entries and true entries.

    If *predicate* is slow, consider wrapping it with functools.lru_cache().
    """
    # partition(is_odd, range(10)) → 0 2 4 6 8   and  1 3 5 7 9
    t1, t2 = tee(iterable)
    return filterfalse(predicate, t1), filter(predicate, t2)
```

```python

>>> list(islice(tabulate(lambda x: 2*x), 4))
[0, 2, 4, 6]

>>> dotproduct([1,2,3], [4,5,6])
32

>>> old_sumprod_recipe([1,2,3], [4,5,6])
32

>>> list(islice(pad_none('abc'), 0, 6))
['a', 'b', 'c', None, None, None]

>>> list(triplewise('ABCDEFG'))
[('A', 'B', 'C'), ('B', 'C', 'D'), ('C', 'D', 'E'), ('D', 'E', 'F'), ('E', 'F', 'G')]

>>> population = 'ABCDEFGH'
>>> for r in range(len(population) + 1):
...     seq = list(combinations(population, r))
...     for i in range(len(seq)):
...         assert nth_combination(population, r, i) == seq[i]
...     for i in range(-len(seq), 0):
...         assert nth_combination(population, r, i) == seq[i]
...
>>> iterable = 'abcde'
>>> r = 3
>>> combos = list(combinations(iterable, r))
>>> all(nth_combination(iterable, r, i) == comb for i, comb in enumerate(combos))
True

>>> it = iter('ABCdEfGhI')
>>> all_upper, remainder = before_and_after(str.isupper, it)
>>> ''.join(all_upper)
'ABC'
>>> ''.join(remainder)
'dEfGhI'

>>> def is_odd(x):
...     return x % 2 == 1
...
>>> evens, odds = partition(is_odd, range(10))
>>> list(evens)
[0, 2, 4, 6, 8]
>>> list(odds)
[1, 3, 5, 7, 9]
>>> # Verify that the input is consumed lazily
>>> input_iterator = iter(range(10))
>>> evens, odds = partition(is_odd, input_iterator)
>>> next(odds)
1
>>> next(odds)
3
>>> next(evens)
0
>>> list(input_iterator)
[4, 5, 6, 7, 8, 9]
```
