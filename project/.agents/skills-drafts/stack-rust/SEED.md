# SEED: stack-rust  (STK-04, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-rust
description: "Builds, tests and lints Rust projects with cargo and clippy through the internal registry or vendored sources - features, workspaces. Use when working in a project with Cargo.toml, running cargo build, test, clippy or fmt, or fixing rustc or borrow-checker errors."
metadata:
  id: STK-04
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed rustc, cargo, clippy, rustfmt versions and the toolchain file.
- [ ] Build, test, clippy and fmt commands as the project runs them.
- [ ] Internal registry or vendored dependencies (cargo vendor, source replacement).
- [ ] Features and workspaces.
- [ ] Reading borrow-checker errors and rustc --explain.

## Known pitfalls to confirm or drop

- cargo build pulling from crates.io instead of the mirror.
- clippy warnings as errors in CI only.
- Feature unification in workspaces.

## MCP servers and example queries

- rust-official-docs: cargo vendor source replacement, clippy -D warnings, rustc --explain
