# legendre

```octave
function retval = legendre (n, x, normalization)
```

@deftypefn  {} {@var{l} =} legendre (@var{n}, @var{x})
@deftypefnx {} {@var{l} =} legendre (@var{n}, @var{x}, @var{normalization})
Compute the associated Legendre function of degree @var{n} and order
@var{m} = 0 @dots{} @var{n}.

The value @var{n} must be a real non-negative integer.

@var{x} is a vector with real-valued elements in the range [-1, 1].

The optional argument @var{normalization} may be one of @qcode{"unnorm"},
@qcode{"sch"}, or @qcode{"norm"}.  The default if no normalization is given
is @qcode{"unnorm"}.

When the optional argument @var{normalization} is @qcode{"unnorm"}, compute
the associated Legendre function of degree @var{n} and order @var{m} and
return all values for @var{m} = 0 @dots{} @var{n}.  The return value has one
dimension more than @var{x}.

The associated Legendre function of degree @var{n} and order @var{m}:
@tex
$$
P^m_n(x) = (-1)^m (1-x^2)^{m/2}{d^m\over {dx^m}}P_n (x)
$$
@end tex
@ifnottex

@example
@group
 m         m      2  m/2   d^m
P(x) = (-1) * (1-x  )    * ----  P(x)
 n                         dx^m   n
@end group
@end example

@end ifnottex

@noindent
with Legendre polynomial of degree @var{n}:
@tex
$$
P(x) = {1\over{2^n n!}}\biggl({d^n\over{dx^n}}(x^2 - 1)^n\biggr)
$$
@end tex
@ifnottex

@example
@group
          1    d^n   2    n
P(x) = ------ [----(x - 1) ]
 n     2^n n!  dx^n
@end group
@end example

@end ifnottex

@noindent
@code{legendre (3, [-1.0, -0.9, -0.8])} returns the matrix:

@example
@group
 x  |   -1.0   |   -0.9   |   -0.8
------------------------------------
m=0 | -1.00000 | -0.47250 | -0.08000
m=1 |  0.00000 | -1.99420 | -1.98000
m=2 |  0.00000 | -2.56500 | -4.32000
m=3 |  0.00000 | -1.24229 | -3.24000
@end group
@end example

When the optional argument @var{normalization} is @qcode{"sch"}, compute
the Schmidt semi-normalized associated Legendre function.  The Schmidt
semi-normalized associated Legendre function is related to the unnormalized
Legendre functions by the following:

For Legendre functions of degree @var{n} and order 0:
@tex
$$
SP^0_n (x) = P^0_n (x)
$$
@end tex
@ifnottex

@example
@group
  0      0
SP(x) = P(x)
  n      n
@end group
@end example

@end ifnottex

For Legendre functions of degree n and order m:
@tex
$$
SP^m_n (x) = P^m_n (x)(-1)^m\biggl({2(n-m)!\over{(n+m)!}}\biggl)^{0.5}
$$
@end tex
@ifnottex

@example
@group
  m      m         m    2(n-m)! 0.5
SP(x) = P(x) * (-1)  * [-------]
  n      n              (n+m)!
@end group
@end example

@end ifnottex

When the optional argument @var{normalization} is @qcode{"norm"}, compute
the fully normalized associated Legendre function.  The fully normalized
associated Legendre function is related to the unnormalized associated
Legendre functions by the following:

For Legendre functions of degree @var{n} and order @var{m}
@tex
$$
NP^m_n (x) = P^m_n (x)(-1)^m\biggl({(n+0.5)(n-m)!\over{(n+m)!}}\biggl)^{0.5}
$$
@end tex
@ifnottex

@example
@group
  m      m         m    (n+0.5)(n-m)! 0.5
NP(x) = P(x) * (-1)  * [-------------]
  n      n                  (n+m)!
@end group
@end example

@end ifnottex
@end deftypefn
