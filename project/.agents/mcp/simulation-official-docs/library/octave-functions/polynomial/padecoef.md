# padecoef

```octave
function [num, den] = padecoef (T, N = 1)
```

@deftypefn  {} {[@var{num}, @var{den}] =} padecoef (@var{T})
@deftypefnx {} {[@var{num}, @var{den}] =} padecoef (@var{T}, @var{N})
Compute the @var{N}th-order Pad@'e approximant of the continuous-time
delay @var{T} in transfer function form.
@tex
The Pad\'e approximant of $e^{-sT}$ is defined by the following equation
$$ e^{-sT} \approx {P_n(s) \over Q_n(s)} $$
where both $P_n(s)$ and $Q_n(s)$ are $N^{th}$-order rational functions
defined by the following expressions
$$ P_n(s)=\sum_{k=0}^N {(2N - k)!N!\over (2N)!k!(N - k)!}(-sT)^k $$
$$ Q_n(s) = P_n(-s) $$
@end tex
@ifnottex
The Pad@'e approximant of @nospell{@code{exp (-sT)}} is defined by the
following equation

@example
@group
             Pn(s)
exp (-sT) ~ -------
             Qn(s)
@end group
@end example

Where both @nospell{Pn(s) and Qn(s)} are @var{N}th-order rational functions
defined by the following expressions

@example
@group
         N    (2N - k)!N!        k
Pn(s) = SUM --------------- (-sT)
        k=0 (2N)!k!(N - k)!

Qn(s) = Pn(-s)
@end group
@end example

@end ifnottex

The inputs @var{T} and @var{N} must be non-negative numeric scalars.  If
@var{N} is unspecified it defaults to 1.

The output row vectors @var{num} and @var{den} contain the numerator and
denominator coefficients in descending powers of s.  Both are
@var{N}th-order polynomials.

For example:

@smallexample
@group
t = 0.1;
n = 4;
[num, den] = padecoef (t, n)
@xresult{} num =

      1.0000e-04  -2.0000e-02   1.8000e+00  -8.4000e+01   1.6800e+03

@xresult{} den =

      1.0000e-04   2.0000e-02   1.8000e+00   8.4000e+01   1.6800e+03
@end group
@end smallexample
@end deftypefn
