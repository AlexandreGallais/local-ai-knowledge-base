# openfig

```octave
function h = openfig (filename = "Untitled.fig", varargin)
```

@deftypefn  {} {} openfig
@deftypefnx {} {} openfig (@var{filename})
@deftypefnx {} {} openfig (@dots{}, @var{copies})
@deftypefnx {} {} openfig (@dots{}, @var{visibility})
@deftypefnx {} {@var{h} =} openfig (@dots{})
Read saved figure window(s) from @var{filename} and return graphics
handle(s) @var{h}.

By default, @var{filename} is @qcode{"Untitled.fig"}.  If a full path is not
specified, the file opened will be the first one encountered in the load
path.  If @var{filename} is not found and does not have an extension, a
search will take place for the first file in the load path with extension
@qcode{".fig"} or @qcode{".ofig"}, in that order.

@var{copies} is an optional input indicating whether a new figure should
be created (@qcode{"new"}) or whether an existing figure may be reused
(@qcode{"reuse"}).  An existing figure may be reused if the
@qcode{"FileName"} property matches the specified input @var{filename}.
When a figure is reused it becomes the active figure and is shown on top
of other figures.  If the figure was offscreen, it is re-positioned to be
onscreen.  The default value for @var{copies} is @qcode{"new"}.

@var{visibility} is an optional input indicating whether to show the figure
(@qcode{"visible"}) or not (@qcode{"invisible"}).  When @var{visibility} is
specified as an input to @code{openfig} it overrides the visibility setting
stored in @var{filename}.

@seealso{open, hgload, savefig, struct2hdl}
@end deftypefn
