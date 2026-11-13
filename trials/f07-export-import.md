# F7 trial on the workstation

What to play on the workstation to check criterion C38: a 500 KB export file, pasted at once, is
accepted by the import with no difference. Then the real export of the base. About 20 minutes.

## 1. Make the paste sample

On the machine that has the repository:

```sh
node scripts/paste-sample.ts paste-sample
```

Expected: `Wrote import.ts and base-1.txt (476282 bytes) to …/paste-sample.` The part is fake text,
with accents, signs, tabs and backticks: the characters a copy is most likely to change.

## 2. Paste it on the workstation

1. On the workstation, create an empty folder `paste-trial/`.
2. Create `paste-trial/import.ts`, open `paste-sample/import.ts`, copy all of it, paste it, save.
3. Create `paste-trial/base-1.txt`, copy all of `paste-sample/base-1.txt` in one go, paste it,
   save. Note whether the paste took one try, and how long.
4. In a terminal in `paste-trial/`:

```sh
node --version
node import.ts
```

Expected: `Import done: 2 files written.` If the import says that `base-1.txt` was damaged by the
copy, the paste changed at least one character: note it, and try again with `--max-kb 250` on the
first machine (`node scripts/export.ts --max-kb 250` for the real export).

5. Check that the pasted text kept its signs:

```sh
cat sample/accents-and-signs.md
wc -l sample/long-text.md
```

Expected: `Vanne à boisseau, débit 12,5 m³/h, ±0,5 bar, « guillemets »…` and `4805 sample/long-text.md`.

## 3. The real export

On the first machine: `node scripts/export.ts`. Then paste `export/import.ts` and each
`export/base-<n>.txt` into an empty folder of the workstation, as in part 2, and run:

```sh
node import.ts
node scripts/check-base.ts code
```

Expected: `Import done: … files written.`, then `Base check passed: … 0 findings.`

## Results

Write the date, the version of Node on the workstation, and the editor used to paste.

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| 2. Paste of 476 KB in one go |  | time, tries |
| 2. `node import.ts` accepts the part |  |  |
| 2. Accents and signs kept |  |  |
| 3. Real export pasted and imported |  | number of parts |
| 3. Base check on the imported base |  |  |
