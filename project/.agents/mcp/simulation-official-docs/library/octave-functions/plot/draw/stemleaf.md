# stemleaf

```octave
function plotstr = stemleaf (x, caption, stem_sz)
```

@deftypefn  {} {} stemleaf (@var{x}, @var{caption})
@deftypefnx {} {} stemleaf (@var{x}, @var{caption}, @var{stem_sz})
@deftypefnx {} {@var{plotstr} =} stemleaf (@dots{})
Compute and display a stem and leaf plot of the vector @var{x}.

The input @var{x} should be a vector of integers.  Any non-integer values
will be converted to integer by @code{@var{x} = fix (@var{x})}.  By default
each element of @var{x} will be plotted with the last digit of the element
as a leaf value and the remaining digits as the stem.  For example, 123
will be plotted with the stem @samp{12} and the leaf @samp{3}.  The second
argument, @var{caption}, should be a character array which provides a
description of the data.  It is included as a heading for the output.

The optional input @var{stem_sz} sets the width of each stem.
The stem width is determined by @code{10^(@var{stem_sz} + 1)}.
The default stem width is 10.

The output of @code{stemleaf} is composed of two parts: a
"Fenced Letter Display", followed by the stem-and-leaf plot itself.
The Fenced Letter Display is described in @cite{Exploratory Data Analysis}.
Briefly, the entries are as shown:

@example
@group

        Fenced Letter Display
#% nx|___________________     nx = numel (x)
M% mi|       md         |     mi median index, md median
H% hi|hl              hu| hs  hi lower hinge index, hl,hu hinges,
1    |x(1)         x(nx)|     hs h_spreadx(1), x(nx) first
           _______            and last data value.
     ______|step |_______     step 1.5*h_spread
    f|ifl            ifh|     inner fence, lower and higher
     |nfl            nfh|     no.\ of data points within fences
    F|ofl            ofh|     outer fence, lower and higher
     |nFl            nFh|     no.\ of data points outside outer
                              fences
@end group
@end example

The stem-and-leaf plot shows on each line the stem value followed by the
string made up of the leaf digits.  If the @var{stem_sz} is not 1 the
successive leaf values are separated by ",".

With no return argument, the plot is immediately displayed.  If an output
argument is provided, the plot is returned as an array of strings.

The leaf digits are not sorted.  If sorted leaf values are desired, use
@code{@var{xs} = sort (@var{x})} before calling @code{stemleaf (@var{xs})}.

The stem and leaf plot and associated displays are described in:
Chapter 3, @cite{Exploratory Data Analysis} by @nospell{J. W. Tukey},
Addison-Wesley, 1977.
@seealso{hist, printd}
@end deftypefn
