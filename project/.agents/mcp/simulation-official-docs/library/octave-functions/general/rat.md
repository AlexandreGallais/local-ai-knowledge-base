# rat

```octave
function [n, d] = rat (x, tol)
```

@deftypefn  {} {@var{s} =} rat (@var{x})
@deftypefnx {} {@var{s} =} rat (@var{x}, @var{tol})
@deftypefnx {} {[@var{n}, @var{d}] =} rat (@dots{})

Find a rational approximation of @var{x} to within the tolerance defined by
@var{tol}.

If unspecified, the default tolerance is @code{1e-6 * norm (@var{x}(:), 1)}.

When called with one output argument, return a string containing a
continued fraction expansion (multiple terms).

When called with two output arguments, return numeric matrices for the
numerator and denominator of a fractional representation of @var{x} such
that @code{@var{x} = @var{n} ./ @var{d}}.

For example:

@example
@group
s = rat (pi)
@xresult{} s = 3 + 1/(7 + 1/16)

[n, d] = rat (pi)
@xresult{} n =  355
@xresult{} d =  113

n / d - pi
@xresult{} 2.6676e-07
@end group
@end example

Complex inputs are similar:

@example
@group
s = rat (0.5 + i * pi)
@xresult{} s = complex (1 + 1/(-2), 3 + 1/(7 + 1/16))

[n, d] = rat (0.5 + i * pi)
@xresult{} n =  113 + 710i
@xresult{} d =  226

n / d - (0.5 + i * pi)
@xresult{} 0 + 2.6676e-07i
@end group
@end example

Programming Notes:

1. With one output @code{rat} produces a string which is a continued
fraction expansion.  To produce a string which is a simple fraction
(one numerator, one denominator) use @code{rats}.

2. The string output produced by @code{rat} can be passed to @code{eval}
to get back the original input up to the tolerance used.

@seealso{rats, format}
@end deftypefn
