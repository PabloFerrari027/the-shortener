# The Shortener

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Git

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/PabloFerrari027/the-shortener.git
cd the-shortener

# 2. Install dependencies
npm install

# 3. That's it! All configurations are already in the repository
```

## Available Scripts

### Development

```bash
# Start development server
npm run start

# Start in watch mode
npm run start:dev

# Start in debug mode
npm run start:debug

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:cov
```

### Commits and Versioning

```bash
# Make a standardized commit (interactive)
npm run commit

# Create a new release (automatically determines version)
npm run release

# Create specific release versions
npm run release:patch  # 1.0.0 → 1.0.1 (bug fixes)
npm run release:minor  # 1.0.0 → 1.1.0 (new features)
npm run release:major  # 1.0.0 → 2.0.0 (breaking changes)

# Create first release (for new projects)
npm run release:first
```

## Development Workflow

### 1. Making Changes

```bash
# Create a new branch
git checkout -b feature/my-new-feature

# Make your changes
# ...

# Stage your changes
git add .
```

### 2. Committing Changes

**Always use the interactive commit tool:**

```bash
npm run commit
```

This will prompt you with:

1. **Select the type of change:**
   - `feat` - A new feature
   - `fix` - A bug fix
   - `docs` - Documentation only changes
   - `style` - Code style changes (formatting, semicolons, etc)
   - `refactor` - Code refactoring
   - `perf` - Performance improvements
   - `test` - Adding or updating tests
   - `chore` - Maintenance tasks, configs, etc
   - `ci` - CI/CD changes

2. **Scope** (optional) - What is affected (e.g., auth, user, api)

3. **Short description** - Brief summary of changes

4. **Long description** (optional) - Detailed explanation

5. **Breaking changes** (if any)

6. **Issues closed** (if any)

### 3. Push Changes

```bash
# Push your branch
git push origin feature/my-new-feature

# Create pull request on GitHub/GitLab
```

### 4. Creating Releases

After merging several features/fixes to main:

```bash
# Switch to main branch
git checkout main
git pull origin main

# Create release (analyzes commits and determines version)
npm run release

# Push with tags
git push --follow-tags origin main
```

## Understanding Versioning

The project follows **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
  - Triggered by: `fix:` commits

- **MINOR** (1.0.0 → 1.1.0): New features (backwards compatible)
  - Triggered by: `feat:` commits

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
  - Triggered by: commits with `BREAKING CHANGE:` in body or `!` after type (e.g., `feat!:`)

## Configuration Files

### `commitlint.config.ts`

Defines commit message validation rules following Conventional Commits.

### `.versionrc.json`

Configures how Standard Version generates the changelog:

- Which commit types appear in changelog
- Section names for different commit types
- What operations to skip/include

### `.husky/commit-msg`

Git hook that validates commit messages before accepting them.

## Common Mistakes to Avoid

1. **Don't use `git commit -m`** - Always use `npm run commit`
2. **Don't skip the commit type** - It's required for versioning
3. **Don't manually edit version in package.json** - Let Standard Version handle it
4. **Don't forget to push tags** - Use `git push --follow-tags`

## Troubleshooting

### Commit rejected by Commitlint

**Problem:** Your commit message doesn't follow the convention.

**Solution:** Use `npm run commit` instead of `git commit -m`.

### Husky hooks not running

**Problem:** Git hooks aren't executing.

**Solution:**

```bash
# Reinstall Husky
npm run prepare
# or
npx husky install
```

## License

This project is licensed under the MIT License.

## Authors

- Pablo Ferrari - [GitHub Profile](https://github.com/PabloFerrari027).
