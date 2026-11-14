// Lint pass of this project: only what the format pass cannot fix. Run it with `npm run lint` (the
// skill apply-strict-lint adds the script) or `node /opt/local-ai-base/tools/lint-file.ts --all`.
// A rule whose plugin is not installed is left out; Angular rules come with @angular/core.
import { lintConfig } from './lint.mjs';
import { projectOptions } from './options.mjs';

export default await lintConfig(projectOptions());
