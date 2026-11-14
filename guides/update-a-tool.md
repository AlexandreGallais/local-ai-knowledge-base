# Update a tool to a new version

For the maintainers of the base, on a machine with network access, from the repository that holds
this one in `work/` and its build tools in `scripts/`. The workstation never does it: it receives the
new export.

## 1. See what is behind

```sh
node scripts/update-tool.ts
```

It prints one line per documentation source that has a newer release tag. A source that follows a
branch (MDN, TypeScript) is not listed: fetch it again to take its latest commit.

To see what is behind one project, from that project:

```sh
node /opt/local-ai-base/tools/check-versions.ts
```

## 2. Move the source to the new tag

```sh
node scripts/update-tool.ts angular v23.0.0
node scripts/fetch-library.ts --tool angular
node scripts/check-library.ts
```

`update-tool.ts` writes the tag and the version in `work/global/library/sources.json`; `fetch-library.ts`
replaces `global/library/angular/` and its notice.

## 3. Update the documents written for the AI

1. Read the release notes and the breaking changes of the new version, in the fetched library:
   `node global/tools/build-index.ts global`, then search for "breaking changes" and "deprecated".
2. List the documents of `global/docs/` whose header names the tool:
   `node global/tools/check-versions.ts <a project at the new version> global`.
3. In each of them: add the new rows to the "old to new" tables, with their version; fix what the new
   version changes; set `version` and `checked` in the header.
4. Update the lint and format configs of `project/.agents/lint/` if a plugin follows the major version
   of the tool (angular-eslint follows Angular), and its tested version in `global/packages.md`.

## 4. Check and deliver

```sh
node --test 'scripts/*.test.ts'
node scripts/check-base.ts
node scripts/export.ts
```

Then write the change in `CHANGELOG.md`, bump `global/VERSION`, and deliver the new export.
