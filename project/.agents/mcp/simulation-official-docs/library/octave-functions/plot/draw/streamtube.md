# streamtube

```octave
function h = streamtube (varargin)
```

@deftypefn  {} {} streamtube (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamtube (@var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamtube (@var{xyz}, @var{x}, @var{y}, @var{z}, @var{div})
@deftypefnx {} {} streamtube (@var{xyz}, @var{div})
@deftypefnx {} {} streamtube (@var{xyz}, @var{dia})
@deftypefnx {} {} streamtube (@dots{}, @var{options})
@deftypefnx {} {} streamtube (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} streamtube (@dots{})
Plot tubes scaled by the divergence along streamlines.

@code{streamtube} draws tubes whose diameter is scaled by the divergence of
a vector field.  The vector field is given by
@code{[@var{u}, @var{v}, @var{w}]} and is defined over a rectangular grid
given by @code{[@var{x}, @var{y}, @var{z}]}.  The tubes start at the
seed points @code{[@var{sx}, @var{sy}, @var{sz}]} and are plot along
streamlines.

@code{streamtube} can also be called with a cell array containing
pre-computed streamline data.  To do this, @var{xyz} must be created with
the @code{stream3} command.  @var{div} is used to scale the tubes.
In order to plot tubes scaled by the vector field divergence, @var{div}
must be calculated with the @code{divergence} command.

A tube diameter of zero corresponds to the smallest scaling value along the
streamline and the largest tube diameter corresponds to the largest scaling
value.

It is also possible to draw a tube along an arbitrary array of vertices
@var{xyz}.  The tube diameter can be specified by the vertex array @var{dia}
or by a constant.

The input parameter @var{options} is a 2-D vector of the form
@code{[@var{scale}, @var{n}]}.  The first parameter scales the tube
diameter (default 1).  The second parameter specifies the number of vertices
that are used to construct the tube circumference (default 20).

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the plot objects
created for each tube.

@seealso{stream3, streamline, streamribbon, ostreamtube}
@end deftypefn
