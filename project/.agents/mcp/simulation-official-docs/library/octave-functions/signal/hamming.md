# hamming

```octave
function c = hamming (m, opt)
```

@deftypefn  {} {@var{c} =} hamming (@var{m})
@deftypefnx {} {@var{c} =} hamming (@var{m}, "periodic")
@deftypefnx {} {@var{c} =} hamming (@var{m}, "symmetric")
Return the filter coefficients of a Hamming window of length @var{m}.

If the optional argument @qcode{"periodic"} is given, the periodic form
of the window is returned.  This is equivalent to the window of length
@var{m}+1 with the last coefficient removed.  The optional argument
@qcode{"symmetric"} is equivalent to not specifying a second argument.

For a definition of the Hamming window see, e.g.,
@nospell{A.V. Oppenheim & R. W. Schafer},
@cite{Discrete-Time Signal Processing}.
@end deftypefn
