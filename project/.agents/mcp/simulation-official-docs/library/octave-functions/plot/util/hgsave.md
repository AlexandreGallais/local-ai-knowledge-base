# hgsave

```octave
function hgsave (h, filename, fmt = "-binary")
```

@deftypefn  {} {} hgsave (@var{filename})
@deftypefnx {} {} hgsave (@var{h}, @var{filename})
@deftypefnx {} {} hgsave (@var{h}, @var{filename}, @var{fmt})
Save the graphics handle(s) @var{h} to the file @var{filename} in the format
@var{fmt}.

If unspecified, @var{h} is the current figure as returned by @code{gcf}.

When @var{filename} does not have an extension the default filename
extension @file{.ofig} will be appended.

If present, @var{fmt} must be one of the following:

@itemize @bullet
@item @option{-binary}, @option{-float-binary}

@item @option{-hdf5}, @option{-float-hdf5}

@item @option{-V7}, @option{-v7}, @option{-7}, @option{-mat7-binary}

@item @option{-V6}, @option{-v6}, @option{-6}, @option{-mat6-binary}

@item @option{-text}

@item @option{-zip}, @option{-z}
@end itemize

The default format is @option{-binary} to minimize storage.

Programming Note: When producing graphics for final publication use
@code{print} or @code{saveas}.  When it is important to be able to continue
to edit a figure as an Octave object, use @code{hgsave}/@code{hgload}.
@seealso{hgload, hdl2struct, savefig, saveas, print}
@end deftypefn
