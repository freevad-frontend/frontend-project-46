install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff -h:
	node gendiff.js

.PHONY: install publish lint 