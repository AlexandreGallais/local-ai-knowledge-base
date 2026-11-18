# arma_rnd

```octave
function x = arma_rnd (a, b, v, t, n = 100)
```

@deftypefn {} {@var{x} =} arma_rnd (@var{a}, @var{b}, @var{v}, @var{t}, @var{n})
Return a simulation of the ARMA model.

The ARMA model is defined by

@example
@group
x(n) = a(1) * x(n-1) + @dots{} + a(k) * x(n-k)
     + e(n) + b(1) * e(n-1) + @dots{} + b(l) * e(n-l)
@end group
@end example

@noindent
in which @var{k} is the length of vector @var{a}, @var{l} is the length of
vector @var{b} and @var{e} is Gaussian white noise with variance @var{v}.
The function returns a vector of length @var{t}.

The optional parameter @var{n} gives the number of dummy @var{x}(@var{i})
used for initialization, i.e., a sequence of length @var{t}+@var{n} is
generated and @var{x}(@var{n}+1:@var{t}+@var{n}) is returned.  If @var{n}
is omitted, @var{n} = 100 is used.
@end deftypefn
