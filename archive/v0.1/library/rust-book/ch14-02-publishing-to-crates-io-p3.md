---
title: "ch14-02-publishing-to-crates-io (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch14-02-publishing-to-crates-io.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch14-02-publishing-to-crates-io (part 3 of 3)

### Adding Metadata to a New Crate

Let’s say you have a crate you want to publish. Before publishing, you’ll need
to add some metadata in the `[package]` section of the crate’s _Cargo.toml_
file.

Your crate will need a unique name. While you’re working on a crate locally,
you can name a crate whatever you’d like. However, crate names on
crates.io are allocated on a first-come,
first-served basis. Once a crate name is taken, no one else can publish a crate
with that name. Before attempting to publish a crate, search for the name you
want to use. If the name has been used, you will need to find another name and
edit the `name` field in the _Cargo.toml_ file under the `[package]` section to
use the new name for publishing, like so:

Filename: Cargo.toml

```toml
[package]
name = "guessing_game"
```

Even if you’ve chosen a unique name, when you run `cargo publish` to publish
the crate at this point, you’ll get a warning and then an error:

```console
$ cargo publish
    Updating crates.io index
warning: manifest has no description, license, license-file, documentation, homepage or repository.
See https://doc.rust-lang.org/cargo/reference/manifest.html#package-metadata for more info.
--snip--
error: failed to publish to registry at https://crates.io

Caused by:
  the remote server responded with an error (status 400 Bad Request): missing or empty metadata fields: description, license. Please see https://doc.rust-lang.org/cargo/reference/manifest.html for more information on configuring these fields
```

This results in an error because you’re missing some crucial information: A
description and license are required so that people will know what your crate
does and under what terms they can use it. In _Cargo.toml_, add a description
that's just a sentence or two, because it will appear with your crate in search
results. For the `license` field, you need to give a _license identifier
value_. The Linux Foundation’s Software Package Data Exchange (SPDX)
lists the identifiers you can use for this value. For example, to specify that
you’ve licensed your crate using the MIT License, add the `MIT` identifier:

Filename: Cargo.toml

```toml
[package]
name = "guessing_game"
license = "MIT"
```

If you want to use a license that doesn’t appear in the SPDX, you need to place
the text of that license in a file, include the file in your project, and then
use `license-file` to specify the name of that file instead of using the
`license` key.

Guidance on which license is appropriate for your project is beyond the scope
of this book. Many people in the Rust community license their projects in the
same way as Rust by using a dual license of `MIT OR Apache-2.0`. This practice
demonstrates that you can also specify multiple license identifiers separated
by `OR` to have multiple licenses for your project.

With a unique name, the version, your description, and a license added, the
_Cargo.toml_ file for a project that is ready to publish might look like this:

Filename: Cargo.toml

```toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"
description = "A fun game where you guess what number the computer has chosen."
license = "MIT OR Apache-2.0"

[dependencies]
```

Cargo’s documentation describes other
metadata you can specify to ensure that others can discover and use your crate
more easily.

### Publishing to Crates.io

Now that you’ve created an account, saved your API token, chosen a name for
your crate, and specified the required metadata, you’re ready to publish!
Publishing a crate uploads a specific version to
crates.io for others to use.

Be careful, because a publish is _permanent_. The version can never be
overwritten, and the code cannot be deleted except in certain circumstances.
One major goal of Crates.io is to act as a permanent archive of code so that
builds of all projects that depend on crates from
crates.io will continue to work. Allowing
version deletions would make fulfilling that goal impossible. However, there is
no limit to the number of crate versions you can publish.

Run the `cargo publish` command again. It should succeed now:

```console
$ cargo publish
    Updating crates.io index
   Packaging guessing_game v0.1.0 (file:///projects/guessing_game)
    Packaged 6 files, 1.2KiB (895.0B compressed)
   Verifying guessing_game v0.1.0 (file:///projects/guessing_game)
   Compiling guessing_game v0.1.0
(file:///projects/guessing_game/target/package/guessing_game-0.1.0)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.19s
   Uploading guessing_game v0.1.0 (file:///projects/guessing_game)
    Uploaded guessing_game v0.1.0 to registry `crates-io`
note: waiting for `guessing_game v0.1.0` to be available at registry
`crates-io`.
You may press ctrl-c to skip waiting; the crate should be available shortly.
   Published guessing_game v0.1.0 at registry `crates-io`
```

Congratulations! You’ve now shared your code with the Rust community, and
anyone can easily add your crate as a dependency of their project.

### Publishing a New Version of an Existing Crate

When you’ve made changes to your crate and are ready to release a new version,
you change the `version` value specified in your _Cargo.toml_ file and
republish. Use the Semantic Versioning rules to decide what an
appropriate next version number is, based on the kinds of changes you’ve made.
Then, run `cargo publish` to upload the new version.

### Deprecating Versions from Crates.io

Although you can’t remove previous versions of a crate, you can prevent any
future projects from adding them as a new dependency. This is useful when a
crate version is broken for one reason or another. In such situations, Cargo
supports yanking a crate version.

_Yanking_ a version prevents new projects from depending on that version while
allowing all existing projects that depend on it to continue. Essentially, a
yank means that all projects with a _Cargo.lock_ will not break, and any future
_Cargo.lock_ files generated will not use the yanked version.

To yank a version of a crate, in the directory of the crate that you’ve
previously published, run `cargo yank` and specify which version you want to
yank. For example, if we’ve published a crate named `guessing_game` version
1.0.1 and we want to yank it, then we’d run the following in the project
directory for `guessing_game`:

```console
$ cargo yank --vers 1.0.1
    Updating crates.io index
        Yank user@example.com
```

By adding `--undo` to the command, you can also undo a yank and allow projects
to start depending on a version again:

```console
$ cargo yank --vers 1.0.1 --undo
    Updating crates.io index
      Unyank user@example.com
```

A yank _does not_ delete any code. It cannot, for example, delete accidentally
uploaded secrets. If that happens, you must reset those secrets immediately.
