# Git Workflow

This document describes the git conventions used in the Backporting.ai project.

## Commit Messages

Write commit messages in **imperative mood** with a **capitalized** first word. Keep the subject line under ~72 characters.

For non-trivial changes, add a body separated by a blank line explaining **why** the change was made.

### Format

```
<Subject line in imperative mood>

<Optional body explaining why, not what>
```

### Examples

Good:

```
Add search feature to digests page
```

```
Fix broken avatar link on about page

The image path was relative to the component instead of the public
directory, causing a 404 on all pages except the homepage.
```

```
Update digest for November
```

Bad:

```
added search           # not capitalized, past tense
```

```
fix stuff              # too vague
```

```
Add a brand new amazing search feature to the digests page that allows users to search  # too long
```

## Branch Naming

Use **flat descriptive names** with lowercase letters and hyphens:

```
add-search
fix-broken-link
update-digest-page
redesign-about-section
```

Always branch off from `main`. Delete the branch after it has been merged.

## Feature Branch Workflow

### 1. Create a branch

```bash
git checkout main
git pull origin main
git checkout -b your-branch-name
```

### 2. Make commits

Work on the branch, committing as you go following the commit message conventions above.

```bash
git add <files>
git commit -m "Add search component"
```

### 3. Rebase onto latest main

Before opening a PR, rebase your branch onto the latest `main` to ensure a clean, linear history:

```bash
git fetch origin
git rebase origin/main
```

Resolve any conflicts that arise, then continue the rebase:

```bash
# after resolving conflicts in each step
git add <resolved-files>
git rebase --continue
```

### 4. Push the branch

```bash
git push -u origin your-branch-name
```

If you have already pushed before and then rebased, you will need to force-push:

```bash
git push --force-with-lease
```

### 5. Open a pull request

Use the `gh` CLI to create a PR targeting `main`:

```bash
gh pr create --title "Add search feature" --body "Brief summary of what changed and why."
```

The PR description should be a **brief summary** of what changed. No formal template is required.

### 6. Merge

Once the PR is approved (or you are satisfied with the changes), merge using **rebase and merge** to maintain a linear history on `main`. On GitHub this is the "Rebase and merge" button.

After merging, delete the feature branch:

```bash
git branch -d your-branch-name
git push origin --delete your-branch-name
```

## Merge Strategy

This project uses **rebase and merge** to keep a clean, linear commit history on `main`. Avoid merge commits.

## Publishing

Merging to `main` triggers an automatic deploy to GitHub Pages via the [deploy workflow](../../.github/workflows/deploy.yml). Changes go live within a few minutes of the merge completing.
