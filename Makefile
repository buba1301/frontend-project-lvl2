install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js' ./__tests__/__fixtures__/before1.json ./__tests__/__fixtures__/after1.json

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

