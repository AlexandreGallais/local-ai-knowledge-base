# spaugment

```octave
function s = spaugment (A, c)
```

@deftypefn {} {@var{s} =} spaugment (@var{A}, @var{c})
Create the augmented matrix of @var{A}.

This is given by

@example
@group
[@var{c} * eye(@var{m}, @var{m}), @var{A};
            @var{A}', zeros(@var{n}, @var{n})]
@end group
@end example

@noindent
This is related to the least squares solution of
@code{@var{A} \ @var{b}}, by

@example
@group
@var{s} * [ @var{r} / @var{c}; x] = [ @var{b}, zeros(@var{n}, columns(@var{b})) ]
@end group
@end example

@noindent
where @var{r} is the residual error

@example
@var{r} = @var{b} - @var{A} * @var{x}
@end example

As the matrix @var{s} is symmetric indefinite it can be factorized with
@code{lu}, and the minimum norm solution can therefore be found without the
need for a @code{qr} factorization.  As the residual error will be
@code{zeros (@var{m}, @var{m})} for underdetermined problems, and example
can be

@example
@group
m = 11; n = 10; mn = max (m, n);
A = spdiags ([ones(mn,1), 10*ones(mn,1), -ones(mn,1)],
             [-1, 0, 1], m, n);
x0 = A \ ones (m,1);
s = spaugment (A);
[L, U, P, Q] = lu (s);
x1 = Q * (U \ (L \ (P  * [ones(m,1); zeros(n,1)])));
x1 = x1(end - n + 1 : end);
@end group
@end example

To find the solution of an overdetermined problem needs an estimate of the
residual error @var{r} and so it is more complex to formulate a minimum norm
solution using the @code{spaugment} function.

In general the left division operator is more stable and faster than using
the @code{spaugment} function.
@seealso{mldivide}
@end deftypefn
