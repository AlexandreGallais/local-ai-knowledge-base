---
title: "Programming FAQ (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/programming.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Programming FAQ (part 3 of 7)

### How do I write a function with output parameters (call by reference)?

Remember that arguments are passed by assignment in Python.  Since assignment
just creates references to objects, there's no alias between an argument name in
the caller and callee, and consequently no call-by-reference.  You can achieve the
desired effect in a number of ways.

1) By returning a tuple of the results:

```
   >>> def func1(a, b):
   ...     a = 'new-value'        # a and b are local names
   ...     b = b + 1              # assigned to new objects
   ...     return a, b            # return new values
   ...
   >>> x, y = 'old-value', 99
   >>> func1(x, y)
   ('new-value', 100)

This is almost always the clearest solution.
```

2) By using global variables.  This isn't thread-safe, and is not recommended.

3) By passing a mutable (changeable in-place) object:

```
>>> def func2(a):
...     a[0] = 'new-value'     # 'a' references a mutable list
...     a[1] = a[1] + 1        # changes a shared object
...
>>> args = ['old-value', 99]
>>> func2(args)
>>> args
['new-value', 100]
```

4) By passing in a dictionary that gets mutated:

```
>>> def func3(args):
...     args['a'] = 'new-value'     # args is a mutable dictionary
...     args['b'] = args['b'] + 1   # change it in-place
...
>>> args = {'a': 'old-value', 'b': 99}
>>> func3(args)
>>> args
{'a': 'new-value', 'b': 100}
```

5) Or bundle up values in a class instance:

```
   >>> class Namespace:
   ...     def __init__(self, /, **args):
   ...         for key, value in args.items():
   ...             setattr(self, key, value)
   ...
   >>> def func4(args):
   ...     args.a = 'new-value'        # args is a mutable Namespace
   ...     args.b = args.b + 1         # change object in-place
   ...
   >>> args = Namespace(a='old-value', b=99)
   >>> func4(args)
   >>> vars(args)
   {'a': 'new-value', 'b': 100}

There's almost never a good reason to get this complicated.
```

Your best choice is to return a tuple containing the multiple results.

### How do you make a higher order function in Python?

You have two choices: you can use nested scopes or you can use callable objects.
For example, suppose you wanted to define `linear(a,b)` which returns a
function `f(x)` that computes the value `a*x+b`.  Using nested scopes:

```
def linear(a, b):
    def result(x):
        return a * x + b
    return result
```

Or using a callable object:

```
class linear:

    def __init__(self, a, b):
        self.a, self.b = a, b

    def __call__(self, x):
        return self.a * x + self.b
```

In both cases,:

```
taxes = linear(0.3, 2)
```

gives a callable object where `taxes(10e6) == 0.3 * 10e6 + 2`.

The callable object approach has the disadvantage that it is a bit slower and
results in slightly longer code.  However, note that a collection of callables
can share their signature via inheritance:

```
class exponential(linear):
    # __init__ inherited
    def __call__(self, x):
        return self.a * (x ** self.b)
```

Object can encapsulate state for several methods:

```
class counter:

    value = 0

    def set(self, x):
        self.value = x

    def up(self):
        self.value = self.value + 1

    def down(self):
        self.value = self.value - 1

count = counter()
inc, dec, reset = count.up, count.down, count.set
```

Here `inc()`, `dec()` and `reset()` act like functions which share the
same counting variable.

### How do I copy an object in Python?

In general, try `copy.copy()` or `copy.deepcopy()` for the general case.
Not all objects can be copied, but most can.

Some objects can be copied more easily.  Dictionaries have a `copy()`
method:

```
newdict = olddict.copy()
```

Sequences can be copied by slicing:

```
new_l = l[:]
```

### How can I find the methods or attributes of an object?

For an instance `x` of a user-defined class, `dir(x)` returns an alphabetized
list of the names containing the instance attributes and methods and attributes
defined by its class.

### How can my code discover the name of an object?

Generally speaking, it can't, because objects don't really have names.
Essentially, assignment always binds a name to a value; the same is true of
`def` and `class` statements, but in that case the value is a
callable. Consider the following code:

```
>>> class A:
...     pass
...
>>> B = A
>>> a = B()
>>> b = a
>>> print(b)
<__main__.A object at 0x16D07CC>
>>> print(a)
<__main__.A object at 0x16D07CC>
```

Arguably the class has a name: even though it is bound to two names and invoked
through the name `B` the created instance is still reported as an instance of
class `A`.  However, it is impossible to say whether the instance's name is `a` or
`b`, since both names are bound to the same value.

Generally speaking it should not be necessary for your code to "know the names"
of particular values. Unless you are deliberately writing introspective
programs, this is usually an indication that a change of approach might be
beneficial.

In comp.lang.python, Fredrik Lundh once gave an excellent analogy in answer to
this question:

The same way as you get the name of that cat you found on your porch: the cat
(object) itself cannot tell you its name, and it doesn't really care -- so
the only way to find out what it's called is to ask all your neighbours
(namespaces) if it's their cat (object)...

no name at all!

### What's up with the comma operator's precedence?

Comma is not an operator in Python.  Consider this session:

```
>>> "a" in "b", "a"
(False, 'a')
```

Since the comma is not an operator, but a separator between expressions the
above is evaluated as if you had entered:

```
("a" in "b"), "a"
```

not:

```
"a" in ("b", "a")
```

The same is true of the various assignment operators (`=`, `+=`, and so on).
They are not truly operators but syntactic delimiters in assignment statements.

### Is there an equivalent of C's "?:" ternary operator?

Yes, there is. The syntax is as follows:

```
[on_true] if [expression] else [on_false]

x, y = 50, 25
small = x if x < y else y
```

Before this syntax was introduced in Python 2.5, a common idiom was to use
logical operators:

```
[expression] and [on_true] or [on_false]
```

However, this idiom is unsafe, as it can give wrong results when *on_true*
has a false boolean value.  Therefore, it is always better to use
the `... if ... else ...` form.

### Is it possible to write obfuscated one-liners in Python?

Yes.  Usually this is done by nesting `lambda` within
`lambda`.  See the following three examples, slightly adapted from Ulf Bartelt:

```
from functools import reduce

# Primes < 1000
print(list(filter(None,map(lambda y:y*reduce(lambda x,y:x*y!=0,
map(lambda x,y=y:y%x,range(2,int(pow(y,0.5)+1))),1),range(2,1000)))))

# First 10 Fibonacci numbers
print(list(map(lambda x,f=lambda x,f:(f(x-1,f)+f(x-2,f)) if x>1 else 1:
f(x,f), range(10))))

# Mandelbrot set
print((lambda Ru,Ro,Iu,Io,IM,Sx,Sy:reduce(lambda x,y:x+'\n'+y,map(lambda y,
Iu=Iu,Io=Io,Ru=Ru,Ro=Ro,Sy=Sy,L=lambda yc,Iu=Iu,Io=Io,Ru=Ru,Ro=Ro,i=IM,
Sx=Sx,Sy=Sy:reduce(lambda x,y:x+y,map(lambda x,xc=Ru,yc=yc,Ru=Ru,Ro=Ro,
i=i,Sx=Sx,F=lambda xc,yc,x,y,k,f=lambda xc,yc,x,y,k,f:(k<=0)or (x*x+y*y
>=4.0) or 1+f(xc,yc,x*x-y*y+xc,2.0*x*y+yc,k-1,f):f(xc,yc,x,y,k,f):chr(
64+F(Ru+x*(Ro-Ru)/Sx,yc,0,0,i)),range(Sx))):L(Iu+y*(Io-Iu)/Sy),range(Sy
))))(-2.1, 0.7, -1.2, 1.2, 30, 80, 24))
#    \___ ___/  \___ ___/  |   |   |__ lines on screen
#        V          V      |   |______ columns on screen
#        |          |      |__________ maximum of "iterations"
#        |          |_________________ range on y axis
#        |____________________________ range on x axis
```

Don't try this at home, kids!

### What does the slash(/) in the parameter list of a function mean?

A slash in the argument list of a function denotes that the parameters prior to
it are positional-only.  Positional-only parameters are the ones without an
externally usable name.  Upon calling a function that accepts positional-only
parameters, arguments are mapped to parameters based solely on their position.
For example, `divmod()` is a function that accepts positional-only
parameters. Its documentation looks like this:

```
>>> help(divmod)
Help on built-in function divmod in module builtins:

divmod(x, y, /)
    Return the tuple (x//y, x%y).  Invariant: div*y + mod == x.
```

The slash at the end of the parameter list means that both parameters are
positional-only. Thus, calling `divmod()` with keyword arguments would lead
to an error:

```
>>> divmod(x=3, y=4)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: divmod() takes no keyword arguments
```
