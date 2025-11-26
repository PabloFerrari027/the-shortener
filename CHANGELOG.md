# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/PabloFerrari027/the-shortener/compare/v0.1.0...v0.2.0) (2025-11-26)


### Features

* add CI workflow with GitHub Actions ([d04cc0a](https://github.com/PabloFerrari027/the-shortener/commit/d04cc0aa954b964edfad6114c564ddce7d4686d8))
* add DeleteShortUrl service ([13eeb6f](https://github.com/PabloFerrari027/the-shortener/commit/13eeb6f6de4e976d6e93dc49d8ba6d5973368e31))
* add docker compose configurations for production and test environments ([c529872](https://github.com/PabloFerrari027/the-shortener/commit/c529872294ebcf16acd8e63436be427ae9dbbd07))
* add findById method to ShortUrl repository ([88810bf](https://github.com/PabloFerrari027/the-shortener/commit/88810bf155a4b9be408be5b4eb6c4431d5a8af4b))
* add global validation pipe configuration ([34f2340](https://github.com/PabloFerrari027/the-shortener/commit/34f2340653de96d0b7a5dc7db05d46786eca55ab))
* add list endpoint with query validation to shortener controller ([67973c0](https://github.com/PabloFerrari027/the-shortener/commit/67973c06a81ff2a112183e36218a5c7bda029c06))
* add ListShortnerUrls service ([d57c1b5](https://github.com/PabloFerrari027/the-shortener/commit/d57c1b51654b5d86fcade8cc12001ebfd13af7b9))
* add method overloading to ShortUrl presentation layer ([a099c64](https://github.com/PabloFerrari027/the-shortener/commit/a099c6489e8d716623111d02b790a374d003974b))
* add shared utilities and error handling infrastructure ([32d9fdf](https://github.com/PabloFerrari027/the-shortener/commit/32d9fdf9ece4e0ce1d1d00d7654d6ce6f60a1044))
* add shortener HTTP controller with Swagger documentation ([5b57095](https://github.com/PabloFerrari027/the-shortener/commit/5b57095d3700bc6ae10737c744a498d620335158))
* add ShortUrl presentation layer for response formatting ([d1b36f4](https://github.com/PabloFerrari027/the-shortener/commit/d1b36f4250b31f65435c882d21dc13b0b549529d))
* add ShortUrl repository interface and implementations ([e9afcb5](https://github.com/PabloFerrari027/the-shortener/commit/e9afcb578479ba39daf9423ffdad75b7dcb48fe5))
* add Sort utility for generic array sorting ([f5b122f](https://github.com/PabloFerrari027/the-shortener/commit/f5b122feda54e9886b6b7d1441d34e3b9bf7c28e))
* add unified test script to run all test suites ([395e830](https://github.com/PabloFerrari027/the-shortener/commit/395e830b961aa60504c02e7cbe042e6abbad15d3))
* configure application bootstrap with global exception filter ([9fc0ca2](https://github.com/PabloFerrari027/the-shortener/commit/9fc0ca2127d638a70215b587db4711f7e55db492))
* configure Jest for multiple test environments ([e64de3b](https://github.com/PabloFerrari027/the-shortener/commit/e64de3bad038fae4014649d4226593c76f1912aa))
* configure shortener module and dependency injection ([06149f0](https://github.com/PabloFerrari027/the-shortener/commit/06149f0a0936f797343f8de33dad499d9c266c47))
* feat: add list method to ShortUrl repository interface ([2e601a3](https://github.com/PabloFerrari027/the-shortener/commit/2e601a370af4e3e2dedacc34ac8ca29145f8a440))
* implement environment-based repository selection ([cbac350](https://github.com/PabloFerrari027/the-shortener/commit/cbac350e50dfff7aed160270257452d9528cd6a7))
* implement list method in ShortUrl repositories ([4bdc99c](https://github.com/PabloFerrari027/the-shortener/commit/4bdc99ce40deb5fa72a87ff58f57cd5f2aae95b2))
* implement Prisma repository for short URLs ([67198a6](https://github.com/PabloFerrari027/the-shortener/commit/67198a6dc75121f05eb277bd8854ad0b675c504f))
* implement ShortUrl domain entity with validation and serialization ([dfa37cb](https://github.com/PabloFerrari027/the-shortener/commit/dfa37cbd5b828913fded1e631deead5da27705f1))
* implement URL shortener application services ([fd15163](https://github.com/PabloFerrari027/the-shortener/commit/fd151632e4a1e8a46e8622029161b1daa7a65e7f))
* integrate Prisma ORM with PostgreSQL database ([bb20abd](https://github.com/PabloFerrari027/the-shortener/commit/bb20abd1d9fa33ab0b6d4c40767deabf4033c3a8))
* register ListShortnerUrls service in module ([7a4a097](https://github.com/PabloFerrari027/the-shortener/commit/7a4a097e4a4b0450d2264013b876d226394e2cbe))


### Bug Fixes

* add no-floating-promises eslint disable for bootstrap function ([edcd9dd](https://github.com/PabloFerrari027/the-shortener/commit/edcd9ddd0387839d3b43ae379364636111577ba6))
* correct url and hash mapping in ShortUrl toJSON method ([fb35353](https://github.com/PabloFerrari027/the-shortener/commit/fb35353979a416a43c2a03f4e9a55a54ba4be154))
* improve ShortUrlRepository interface type safety ([a52dc02](https://github.com/PabloFerrari027/the-shortener/commit/a52dc0243c87c588b5688acff5ca5e6b0ba561a6))
* update shortener controller validation rules and make fields required ([40f2f48](https://github.com/PabloFerrari027/the-shortener/commit/40f2f48706cad734df435d10f9616e3b742db6ef))


### Code Refactoring

* migrate setup script from TypeScript to JavaScript ([9f175ca](https://github.com/PabloFerrari027/the-shortener/commit/9f175ca6dd4c27d52f0226e148e1598c8e759b56))
* standardize service output to return entities instead of primitives ([2ad3fc4](https://github.com/PabloFerrari027/the-shortener/commit/2ad3fc4fc5a2e75592da0c9f24819b57c53ab8a3))
* standardize UpdateShortUrl service output format ([40f4a40](https://github.com/PabloFerrari027/the-shortener/commit/40f4a408a3e2d13acc7345bf2d80fc430313eb12))
* update pagination options to use page-based approach ([765b9c1](https://github.com/PabloFerrari027/the-shortener/commit/765b9c15920d90e71f55ec95f5a716044c71c71b))

## [0.1.0](https://github.com/PabloFerrari027/the-shortener/compare/v0.0.2...v0.1.0) (2025-11-25)

### 0.0.2 (2025-11-24)


### Documentation

* add comprehensive README with setup and workflow instructions ([0c04d3e](https://github.com/PabloFerrari027/the-shortener/commit/0c04d3e800e57dc43b684f018681e60cdf779e17))


### Code Refactoring

* migrate setup script from bash to TypeScript ([a784d5a](https://github.com/PabloFerrari027/the-shortener/commit/a784d5adad76605a5db00a7bbed43978adf06a1f))
