# Project Conventions
- Data should be split from application code
- Use standard-readme (https://github.com/richardlitt/standard-readme)
- Use semver (https://semver.org) for versioning
- Use conventional-commits (https://conventionalcommits.org)
    * Commit types for code: dev, fix, feat, refactor
    * Commit types for non-code: style, chore, release
- Prompt for confirmation before editing files when the current branch 
  name does not match 'dev-*'

# Code Style
- Use tabs for indentation
- Allow spaces for alignment
- Produce space-aligned code only when it improves readibility
- Wrap any produced code and commit comments at 72 columns, assuming an 
  indenting tab counts as two columns and other characters count as one
- In wrapped code or comments, prefer to keep a space at the end of any 
  line which gets wrapped (e.g. maintain compatibility with Vim's 
  convention for flowed text).
