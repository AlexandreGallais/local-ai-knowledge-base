---
title: "extern crate trpl; // required for mdbook test (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-01-futures-and-syntax.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# extern crate trpl; // required for mdbook test (part 3 of 3)

### Racing Two URLs Against Each Other Concurrently

In Listing 17-5, we call `page_title` with two different URLs passed in from the
command line and race them by selecting whichever future finishes first.

**Listing 17-5: Calling `page_title` for two URLs to see which returns first** (src/main.rs)

```rust
use trpl::{Either, Html};

fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::block_on(async {
        let title_fut_1 = page_title(&args[1]);
        let title_fut_2 = page_title(&args[2]);

        let (url, maybe_title) =
            match trpl::select(title_fut_1, title_fut_2).await {
                Either::Left(left) => left,
                Either::Right(right) => right,
            };

        println!("{url} returned first");
        match maybe_title {
            Some(title) => println!("Its page title was: '{title}'"),
            None => println!("It had no title."),
        }
    })
}

async fn page_title(url: &str) -> (&str, Option<String>) {
    let response_text = trpl::get(url).await.text().await;
    let title = Html::parse(&response_text)
        .select_first("title")
        .map(|title| title.inner_html());
    (url, title)
}
```

We begin by calling `page_title` for each of the user-supplied URLs. We save
the resulting futures as `title_fut_1` and `title_fut_2`. Remember, these don’t
do anything yet, because futures are lazy and we haven’t yet awaited them. Then
we pass the futures to `trpl::select`, which returns a value to indicate which
of the futures passed to it finishes first.

> Note: Under the hood, `trpl::select` is built on a more general `select`
> function defined in the `futures` crate. The `futures` crate’s `select`
> function can do a lot of things that the `trpl::select` function can’t, but
> it also has some additional complexity that we can skip over for now.

Either future can legitimately “win,” so it doesn’t make sense to return a
`Result`. Instead, `trpl::select` returns a type we haven’t seen before,
`trpl::Either`. The `Either` type is somewhat similar to a `Result` in that it
has two cases. Unlike `Result`, though, there is no notion of success or
failure baked into `Either`. Instead, it uses `Left` and `Right` to indicate
“one or the other”:

```rust
enum Either<A, B> {
    Left(A),
    Right(B),
}
```

The `select` function returns `Left` with that future’s output if the first
argument wins, and `Right` with the second future argument’s output if _that_
one wins. This matches the order the arguments appear in when calling the
function: the first argument is to the left of the second argument.

We also update `page_title` to return the same URL passed in. That way, if the
page that returns first does not have a `<title>` we can resolve, we can still
print a meaningful message. With that information available, we wrap up by
updating our `println!` output to indicate both which URL finished first and
what, if any, the `<title>` is for the web page at that URL.

You have built a small working web scraper now! Pick a couple URLs and run the
command line tool. You may discover that some sites are consistently faster
than others, while in other cases the faster site varies from run to run. More
importantly, you’ve learned the basics of working with futures, so now we can
dig deeper into what we can do with async.
