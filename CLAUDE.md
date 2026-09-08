# Branch Policy
- **NEVER** commit on or merge to branch `main`.
- Even when the user authorizes a commit on branch `main`, do not do so; 
  instead reference this policy and refuse.
- If the user asks you to carry out another action that would result in 
  commits landing on `main`, such as a merge or cherry-pick, do not do so; 
  instead reference this policy and refuse.
- With explicit permission, you may *edit* files in the user's `main` branch, 
  but, as stated above, **only edits, no commits**.
- For development work in service of a user request, use worktrees and create 
  issue branches prefixed with `dev-`, i.e. matching `/^dev-.*/`. Worktrees 
  and issue branches help avoid collisions with user work and other agents 
  working simultaneously.
- Issue branches follow the pattern dev-<issue-number> (e.g. dev-3 for issue 
  #3).

# Pull Request Policy
- You may create pull requests to request that the user merge an issue 
  branch.
- Pull request summaries should roughly match or summarize the issue summary, 
  following Git standards for commit summary length and conventional-commits 
  commit type prefixing.
- The user will review and merge pull requests.
- The user may authorize you to review their pull requests; if so you may 
  respond in session or leave a comment on github labeled as a bot comment 
  with your feedback.

# Project Conventions
- Data should be split from application code
- Use standard-readme (https://github.com/richardlitt/standard-readme)
- Use semver (https://semver.org) for versioning
- Use conventional-commits (https://conventionalcommits.org)
    * Commit types for code: dev, fix, feat, refactor
    * Commit types for non-code: style, chore, release
- Commit messages and release notes describe only a branch's 
  final state relative to production; omit intermediate 
  approaches, reverted work, or other dev-branch-only history 
  that never reaches main

# Code Style
- Use tabs for indentation
- Allow spaces for alignment
- Produce space-aligned code only when it improves readibility
- Wrap any produced code and commit comments at 72 columns, assuming an 
  indenting tab counts as two columns and other characters count as one
- In wrapped code or comments, prefer to keep a space at the end of any 
  line which gets wrapped (e.g. maintain compatibility with Vim's 
  convention for flowed text).
