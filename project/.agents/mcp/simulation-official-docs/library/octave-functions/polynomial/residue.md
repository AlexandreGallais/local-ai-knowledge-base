# residue

```octave
function [r, p, k, e] = residue (b, a, varargin)
```

@deftypefn  {} {[@var{r}, @var{p}, @var{k}, @var{e}] =} residue (@var{b}, @var{a})
@deftypefnx {} {[@var{b}, @var{a}] =} residue (@var{r}, @var{p}, @var{k})
@deftypefnx {} {[@var{b}, @var{a}] =} residue (@var{r}, @var{p}, @var{k}, @var{e})
The first calling form computes the partial fraction expansion for the
quotient of the polynomials, @var{b} and @var{a}.

The quotient is defined as
@tex
$$
{B(s)\over A(s)} = \sum_{m=1}^M {r_m\over (s-p_m)^e_m}
  + \sum_{i=1}^N k_i s^{N-i}.
$$
@end tex
@ifnottex

@example
@group
B(s)    M       r(m)        N
---- = SUM ------------- + SUM k(i)*s^(N-i)
A(s)   m=1 (s-p(m))^e(m)   i=1
@end group
@end example

@end ifnottex
@noindent
where @math{M} is the number of poles (the length of the @var{r}, @var{p},
and @var{e}), the @var{k} vector is a polynomial of order @math{N-1}
representing the direct contribution, and the @var{e} vector specifies the
multiplicity of the m-th residue's pole.

For example,

@example
@group
b = [1, 1, 1];
a = [1, -5, 8, -4];
[r, p, k, e] = residue (b, a)
   @xresult{} r = [-2; 7; 3]
   @xresult{} p = [2; 2; 1]
   @xresult{} k = [](0x0)
   @xresult{} e = [1; 2; 1]
@end group
@end example

@noindent
which represents the following partial fraction expansion
@tex
$$
{s^2+s+1\over s^3-5s^2+8s-4} = {-2\over s-2} + {7\over (s-2)^2} + {3\over s-1}
$$
@end tex
@ifnottex

@example
@group
        s^2 + s + 1       -2        7        3
   ------------------- = ----- + ------- + -----
   s^3 - 5s^2 + 8s - 4   (s-2)   (s-2)^2   (s-1)
@end group
@end example

@end ifnottex

The second calling form performs the inverse operation and computes the
reconstituted quotient of polynomials, @var{b}(s)/@var{a}(s), from the
partial fraction expansion; represented by the residues, poles, and a direct
polynomial specified by @var{r}, @var{p} and @var{k}, and the pole
multiplicity @var{e}.

If the multiplicity, @var{e}, is not explicitly specified the multiplicity
is determined by the function @code{mpoles}.

For example:

@example
@group
r = [-2; 7; 3];
p = [2; 2; 1];
k = [1, 0];
[b, a] = residue (r, p, k)
   @xresult{} b = [1, -5, 9, -3, 1]
   @xresult{} a = [1, -5, 8, -4]

where mpoles is used to determine e = [1; 2; 1]
@end group
@end example

Alternatively the multiplicity may be defined explicitly, for example,

@example
@group
r = [7; 3; -2];
p = [2; 1; 2];
k = [1, 0];
e = [2; 1; 1];
[b, a] = residue (r, p, k, e)
   @xresult{} b = [1, -5, 9, -3, 1]
   @xresult{} a = [1, -5, 8, -4]
@end group
@end example

@noindent
which represents the following partial fraction expansion
@tex
$$
{-2\over s-2} + {7\over (s-2)^2} + {3\over s-1} + s = {s^4-5s^3+9s^2-3s+1\over s^3-5s^2+8s-4}
$$
@end tex
@ifnottex

@example
@group
 -2        7        3         s^4 - 5s^3 + 9s^2 - 3s + 1
----- + ------- + ----- + s = --------------------------
(s-2)   (s-2)^2   (s-1)          s^3 - 5s^2 + 8s - 4
@end group
@end example

@end ifnottex
@seealso{mpoles, poly, roots, conv, deconv}
@end deftypefn
