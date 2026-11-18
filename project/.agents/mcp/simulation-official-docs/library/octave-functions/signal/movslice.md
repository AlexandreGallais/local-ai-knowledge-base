# movslice

```octave
function [slcidx, C, Cpre, Cpost, win, wlen, scalar_wlen] = movslice (N, wlen, samplepoints = [])
```

@deftypefn  {} {@var{slcidx} =} movslice (@var{N}, @var{wlen})
@deftypefnx {} {@var{slcidx} =} movslice (@var{N}, @var{wlen}, @var{samplepoints})
@deftypefnx {} {[@var{slcidx}, @var{C}, @var{Cpre}, @var{Cpost}, @var{win}, @var{wlen}, @var{scalar_wlen}] =} movslice (@dots{})
Generate indices to slice a vector of length @var{N} into windows of length
@var{wlen}.

The input @var{N} must be a positive integer.

The moving window length input @var{wlen} can either be a numeric scalar
or a 2-element numeric array.  The elements included in the moving window
will depend on the size and value of @var{wlen} as well as whether the
@var{samplepoints} input was specified.

The optional input @var{samplepoints} is a sorted, numeric vector of unique
positions of the @var{N} data points.  The default value is the vector
@code{[1 : @var{N}]}.  When a non-default @var{samplepoints} vector is
specified, the moving window length @var{wlen} is measured
against the @var{samplepoints} positions to determine which points are
included in each window slice.  It should be noted that @var{samplepoints}
need not be uniformly spaced which can result in window slices containing
different numbers of points.  Because of this, as specified below the
shape and content of some @code{movslice} outputs will be different when
a non-default @var{samplepoints} is used.

The moving window size and included elements will be defined as follows:

@itemize
@item
If @var{samplepoints} has the default value of @code{1:@var{N}} (or has
not been specified):

@itemize
@item
For integer-valued @var{wlen}:

@itemize
@item
For odd, integer-valued, scalar @var{wlen} the window is symmetric and
includes @w{@code{(@var{wlen} - 1) / 2}}@ elements on either side of the
central element.  For example, the window slice at index 5 with a window
length of 3 will include the elements @w{@code{[4, 5, 6]}}.

@item
For even, integer-valued, scalar @var{wlen} the window is asymmetric and
has @w{@code{@var{wlen}/2}}@ elements to the left of the central element
and @w{@code{@var{wlen}/2 - 1}}@ elements to the right of the central
element.  For example, the window slice at index 5 with a window length of
4 will include the elements @w{@code{[3, 4, 5, 6]}}.

@item
For integer-valued vector @var{wlen} of the form
@w{@code{[@var{nb}, @var{na}]}}@ where @var{nb} and @var{na} are integer
valued the window includes @var{nb} elements to the left of the central
element and @var{na} elements to the right of the central element.  For
example, given @w{@code{@var{wlen} = [3, 1]}}, the window slice at index 5
will include the elements @w{@code{[2, 3, 4, 5, 6]}}.
@end itemize

@item
For non-integer-valued scalar @var{wlen}:

@itemize
@item
Non-integer-valued scalar @var{wlen} will be converted to
two-element vector form with
@w{@code{@var{nb} = @var{na} = fix (@var{wlen} / 2)}}, and then processed
as stated above for integer-valued vectors.  For example, the window slice
at index 5 with @w{@code{@var{wlen} = 2.5}}@ will include the elements
@w{@code{[3, 4, 5, 6, 7]}}.

@item
Non-integer-valued vector @var{wlen} will be truncated to integer values
with @w{@code{@var{wlen} = fix (@var{wlen})}}@ and then processed as
stated above for integer-valued vectors.  For example, the window slice
at index 5 with @w{@code{@var{wlen} = [1.2, 2.3]}}@ will include the
elements @w{@code{[4, 5, 6, 7]}}.
@end itemize
@end itemize

@item
If @var{samplepoints} has been specified with a non-default vector:

@itemize
@item
For vector @var{wlen} specified as @w{@code{[@var{nb}, @var{na}]}}, the
window will include all points within a distance less than or equal to
@var{nb} before and @var{na} after the central element's position, with
point positions defined by the elements of @var{samplepoints}.  For
example, at index 5 with @w{@code{@var{wlen} = [2, 3]}}@ and the 3rd-8th
elements of @var{samplepoints} being @w{@code{[1, 3, 5, 7, 8 ,9]}}, the
window slice will include the elements @w{@code{[4, 5, 6, 7]}}@
corresponding to @var{samplepoints} @w{@code{[3, 5, 7, 8]}}.

@item
Scalar @var{wlen} will be converted to two-element vector form with
@w{@code{@var{nb} = @var{na} = @var{wlen} / 2}}.  The window will then
include all points within a distance of less than or equal to @var{nb}
before and less than, but not equal to, @var{na} after the central
element's position, @w{@code{[@var{nb}, @var{na})}}.  For example, at
index 5 with @w{@code{@var{wlen} = [2, 3]}}@ and the 3rd-8th elements of
@var{samplepoints} being @w{@code{[1, 3, 5, 7, 8 ,9]}}, the window slice
will include the elements @w{@code{[4, 5, 6]}}@ corresponding to
@var{samplepoints} @w{@code{[3, 5, 7]}}.
@end itemize
@end itemize

The output @var{slcidx} is an array of indices of the slices of the vector.

@itemize
@item
If @var{samplepoints} is default or unspecified, @var{slcidx} will contain
only the indices of the slices that fit fully within the vector.  Each
column will be the indices of one slice as the window moves from left to
right.  The slices will have @w{@code{fix (@var{wlen})}}@ elements for
scalar @var{wlen}, or @w{@code{@var{nb} + @var{na} + 1}}@ elements for array
valued @var{wlen}.

@item
If a non-default @var{samplepoints} has been specified, @var{slcidx} will
be a 2x@var{N} array with the first and second rows containing the first
and last elements of each slice, respectively.
@end itemize

Optional output @var{C} is a row vector of window center positions where
the window stays fully within the vector.

Optional outputs @var{Cpre} and @var{Cpost} contain the vector elements at
the start and end of the vector, respectively, that result in the window
extending beyond the ends of the vector.

Optional output @var{win} contains information for creating the moving
window.

@itemize
@item
If @var{samplepoints} is default or unspecified, @var{win} is a column
vector with the same number of rows as @var{slcidx} that contains the
moving window defined as a center relative position stencil.

@item
If a non-default @var{samplepoints} has been specified, @var{win} will
be a 2x@var{N} array with the first and second rows containing the left and
right bounds of each window slice, respectively, using the same
coordinates as @var{samplepoints}.  These bounds may lie outside of the
position vector specified by @var{samplepoints}.
@end itemize

Optional output @var{wlen} returns the window length used by
@code{movslice} in two-element @w{@code{[@var{nb}, @var{na}]}}@ form.

Optional logical output @var{scalar_wlen} returns the scalar or vector
state of the input @var{wlen} so that calling functions can determinine
whether the moving window should be inclusive or exclusive of the right
window endpoints.  I.e., inclusive @w{@code{[@var{nb}, @var{na}]}}@ for
vector @var{wlen} or exclusive @w{@code{[@var{nb}, @var{na})}}@ for scalar
@var{wlen}.

@seealso{movfun}
@end deftypefn
