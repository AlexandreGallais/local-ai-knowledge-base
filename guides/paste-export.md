# Paste the export on a workstation

The export comes in five part sizes, one folder each: `export/500k`, `1m`, `2m`, `5m`, `10m`. They hold the
same content. Paste the largest parts that your paste accepts: fewer parts, less work.

## 1. Find the largest size that pastes

1. On the workstation, create an empty folder, for example `~/paste-test`.
2. Create a file `global-001.txt` there, open `export/10m/global-001.txt` here, copy all of it, paste it
   into the new file, save.
3. Paste `import-base.ts` the same way, then run:

   ```sh
   node import-base.ts --target ~/paste-test-base
   ```

4. Read the first line it prints:
   - "Global base installed" or "part 2/N is missing": the paste worked; keep this size.
   - "the content was damaged by the paste" or "the end of the part is missing": the paste cut or
     changed the text; try again with the next size down: 5m, then 2m, 1m, 500k.
5. Write down the size you keep.

## 2. Paste the global base

1. In an empty folder, paste every `global-NNN.txt` of the size you keep, and `import-base.ts`.
2. From the folder where you want the base, run `node <folder of the parts>/import-base.ts`. The base
   lands in `./local-ai-base` there (see `install.md`).
3. If a part is damaged or missing, the command names it and writes nothing: paste that part again,
   then run the command again.

## 3. Paste the project kit

1. In an empty folder, paste every `project-NNN.txt` and `import-project.ts`.
2. From the root of the project, run `node <that folder>/import-project.ts`.
3. It writes `AGENTS.md` and `.agents/`. When the project already has them, it keeps what the team
   wrote: `AGENTS.md`, `.agents/profile.json`, the project skills and rules.

## What to report

- The largest size that pasted.
- The number of parts of the global base at that size.
- The first line printed by each import.
