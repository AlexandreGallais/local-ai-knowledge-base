# webwrite

```octave
function response = webwrite (url, varargin)
```

@deftypefn  {} {@var{response} =} webwrite (@var{url}, @var{name1}, @var{value1}, @dots{})
@deftypefnx {} {@var{response} =} webwrite (@var{url}, @var{data})
@deftypefnx {} {@var{response} =} webwrite (@dots{}, @var{options})

Write data to RESTful web services.

Write content to the web service specified by @var{url} and return the
response in @var{response}.

All name-value pairs given (@var{name1}, @var{value1}, @dots{}) are added
as pairs of query parameters to the body of request method (@code{get},
@code{post}, @code{put}, etc.).

@var{options} is a @code{weboptions} object that may be used to add other
HTTP request options.  This argument can be used with either calling form.
See @code{help weboptions} for a complete list of supported HTTP options.

@seealso{weboptions, webread}
@end deftypefn
