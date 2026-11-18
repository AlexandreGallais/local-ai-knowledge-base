# normalize

```octave
function [z, c, s] = normalize (x, varargin)
```

@deftypefn  {} {@var{z} =} normalize (@var{x})
@deftypefnx {} {@var{z} =} normalize (@var{x}, @var{dim})
@deftypefnx {} {@var{z} =} normalize (@dots{}, @var{method})
@deftypefnx {} {@var{z} =} normalize (@dots{}, @var{method}, @var{option})
@deftypefnx {} {@var{z} =} normalize (@dots{}, @var{scale}, @var{scaleoption}, @var{center}, @var{centeroption})
@deftypefnx {} {[@var{z}, @var{c}, @var{s}] =} normalize (@dots{})
Return a normalization of the data in @var{x} using one of several available
scaling and centering methods.

@code{normalize} by default will return the @code{zscore} of @var{x},
defined as the number of standard deviations each element is from the mean
of @var{x}.  This is equivalent to centering at the mean of the data and
scaling by the standard deviation.  @var{x} must be a numeric array of
double or single floating point numbers.

The returned value @var{z} will have the same size as @var{x}.  The optional
return variables @var{c} and @var{s} are the centering and scaling factors
used in the normalization such that:

@example
@group
  @tcode{@var{z} = (@var{x} - @var{c}) ./ @var{s}}
@end group
@end example

If @var{x} is a vector, @code{normalize} will operate on the data in
@var{x}.

If @var{x} is a matrix, @code{normalize} will operate independently on
each column in @var{x}.

If @var{x} is an N-dimensional array, @code{normalize} will operate
independently on the first non-singleton dimension in @var{x}.

If the optional second argument @var{dim} is given, operate along this
dimension.

@code{normalize} ignores NaN values is @var{x} similar to the behavior of
the omitnan option in @code{std}, @code{mean}, and @code{median}.

The optional inputs @var{method} and @var{option} can be used to specify the
type of normalization performed on @var{x}.  Note that only the
@option{scale} and @option{center} options may be specified together using
any of the methods defined below.  Valid normalization methods are:

@table @code
@item zscore
(Default) Normalizes the elements in @var{x} to the scaled distance from a
 central value.  Valid Options:

   @table @code
   @item std
   (Default) Data is centered at @code{mean (@var{x})} and scaled by the
     standard deviation.

   @item robust
   Data is centered at @code{median (@var{x})} and scaled by the median
   absolute deviation.
   @end table

@item norm
@var{z} is the general vector norm of @var{x}, with @var{option} being the
normalization factor @var{p} that determines the vector norm type according
to:
@tex
$$Z = \left (\sum_k \left | X_k \right |^P  \right )^{1/P}$$
@end tex
@ifnottex

@example
@group
  @tcode{@var{z} = [sum (abs (@var{x}) .^ @var{p})] ^ (1/@var{p})}
@end group
@end example

@end ifnottex
@var{p} can be any positive scalar, specific values being:

   @table @code
   @item @var{p} = 1
   @var{x} is normalized by @code{sum (abs (@var{x}))}.

   @item @var{p} = 2
   (Default) @var{x} is normalized by the Euclidian norm, or vector
   magnitude, of the elements.

   @item @var{P} = Inf
   @var{x} is normalized by @code{max (abs (@var{x}))}.
   @end table

@item scale
@var{x} is scaled by a factor determined by @var{option}, which can be a
numeric scalar or one of the following:

   @table @code
   @item std
   (Default) @var{x} is scaled by its standard deviation.

   @item mad
   @var{x} is scaled by its median absolute deviation.

   @item first
   @var{x} is scaled by its first element.

   @item iqr
   @var{x} is scaled by its interquartile range.
   @end table

@item range
@var{x} is scaled to fit the range specified by @var{option} as a two
element scalar row vector.  The default range is [0, 1].

@item center
@var{x} is shifted by an amount determined by @var{option}, which can be a
numeric scalar or one of the following:

   @table @code
   @item mean
   (Default) @var{x} is shifted by @code{mean (@var{x})}.

   @item median
   @var{x} is shifted by @code{median (@var{x})}.
   @end table

@item medianiqr
@var{x} is shifted by @code{median (@var{x})} and scaled by the
interquartile range.
@end table

Known @sc{matlab} incompatibilities:

@enumerate
@item
The option @option{DataVariables} is only available when input @var{x} is a
table class, which is not yet implemented in core Octave.  See the
@nospell{datatypes} and @nospell{tablicious} Octave Packages for an
available overloaded method.
@end enumerate

@seealso{zscore, iqr, norm, rescale, std, median, mean, mad}
@end deftypefn
