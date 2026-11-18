# savefig

```octave
function savefig (varargin)
```

@deftypefn  {} {} savefig ()
@deftypefnx {} {} savefig (@var{h})
@deftypefnx {} {} savefig (@var{filename})
@deftypefnx {} {} savefig (@var{h}, @var{filename})
@deftypefnx {} {} savefig (@var{h}, @var{filename}, @qcode{"compact"})
Save figure windows specified by graphics handle(s) @var{h} to file
@var{filename}.

If unspecified, @var{h} is the current figure returned by @code{gcf}.

If unspecified, @var{filename} is set to @file{"Untitled.fig"}.  If
@var{filename} does not have an extension then the default extension
@file{".fig"} will be added.

If the optional third input @qcode{"compact"} is present then the data
will be compressed to save more space.

@seealso{hgsave, hdl2struct, openfig}
@end deftypefn
