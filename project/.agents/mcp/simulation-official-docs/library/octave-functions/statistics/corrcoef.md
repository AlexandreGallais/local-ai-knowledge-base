# corrcoef

```octave
function [r, p, lci, hci] = corrcoef (x, varargin)
```

@deftypefn  {} {@var{r} =} corrcoef (@var{x})
@deftypefnx {} {@var{r} =} corrcoef (@var{x}, @var{y})
@deftypefnx {} {@var{r} =} corrcoef (@dots{}, @var{param}, @var{value}, @dots{})
@deftypefnx {} {[@var{r}, @var{p}] =} corrcoef (@dots{})
@deftypefnx {} {[@var{r}, @var{p}, @var{lci}, @var{hci}] =} corrcoef (@dots{})
Compute a matrix of correlation coefficients.

@var{x} is an array where each column contains a variable and each row is
an observation.

If a second input @var{y} (of the same size as @var{x}) is given then
calculate the correlation coefficients between @var{x} and @var{y}.

@var{param}, @var{value} are optional pairs of parameters and values which
modify the calculation.  Valid options are:

@table @asis
@item @qcode{"alpha"}
Confidence level used for the bounds of the confidence interval, @var{lci}
and @var{hci}.  Default is 0.05, i.e., 95% confidence interval.

@item @qcode{"rows"}
Determine processing of NaN values.  Acceptable values are @qcode{"all"},
@qcode{"complete"}, and @qcode{"pairwise"}.  Default is @qcode{"all"}.
With @qcode{"complete"}, only the rows without NaN values are considered.
With @qcode{"pairwise"}, the selection of NaN-free rows is made for each
pair of variables.
@end table

Output @var{r} is a matrix of Pearson's product moment correlation
coefficients for each pair of variables.

Output @var{p} is a matrix of pair-wise p-values testing for the null
hypothesis of a correlation coefficient of zero.

Outputs @var{lci} and @var{hci} are matrices containing, respectively, the
lower and higher bounds of the 95% confidence interval of each correlation
coefficient.
@seealso{corr, cov, std}
@end deftypefn
