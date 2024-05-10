### Hexlet tests and linter status:
[![Actions Status](https://github.com/freevad-frontend/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/freevad-frontend/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8d5228c4f4faf5823d99/maintainability)](https://codeclimate.com/github/freevad-frontend/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8d5228c4f4faf5823d99/test_coverage)](https://codeclimate.com/github/freevad-frontend/frontend-project-46/test_coverage)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

# Difference Calculator

Difference Calculator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, for example, http://www.jsondiff.com/. Such a mechanism is used when outputting tests or automatically tracking changes in configuration files.

Utility features:

- Support of different input formats: yaml, json
- Report generation in plain text, stylish and json formats

Translated with DeepL.com (free version)

# System requirements
	Node.js v20.11.1

# Installation
## for Windows:

- Install the latest version of Node.js on your system from https://nodejs.org/en/download
- Clone the created repository to your computer using command 
	`git clone https://github.com/freevad-frontend/frontend-project-46`
- Go to the folder frontend-project-44
	`cd frontend-project-46`

## for Ubuntu:

- Install the latest version of Node.js on your system 
	`node install`
- Clone the created repository to your computer using command 
	`git clone https://github.com/freevad-frontend/frontend-project-46`
- Go to the folder frontend-project-44
	`cd frontend-project-46`
- Install make with the install command running npm ci
	`make install npm ci`
- Initialize your npm package inside the root directory of your project using command npm init
	`npm init`
- Install the package on your system using npm link. The npm link command may require running with sudo
	`npm link`

# Working with the utility
## Help output
### Description
Utility Reference Information.
### Launch

- for Windows:
  `node bin/gendiff -h`
- for Ubuntu:
  `node bin/gendiff -h`

> Usage: gendiff [options] <filepath1> <filepath2>
>
> Compares two configuration files and shows a difference.
> 
> Options:  
>  &nbsp;&nbsp;&nbsp;&nbsp;-V, --version        output the version number  
>  &nbsp;&nbsp;&nbsp;&nbsp;-f, --format [type]  output format (default: "stylish")  
>  &nbsp;&nbsp;&nbsp;&nbsp;-h, --help           output usage information  


## Stylish formatter
### Description
Comparison output as strings with +/- signs.
+ means that the variable has been added,
- means that the variable has been deleted.
### Launch

- for Windows:
  `node bin/gendiff -f __fixtures__/fileNS1.json __fixtures__/fileNS2.json`
- for Ubuntu:
  `node bin/gendiff -f __fixtures__/fileNS1.json __fixtures__/fileNS2.json`

[![asciicast](https://asciinema.org/a/658693.svg)](https://asciinema.org/a/658693)


## Plain formatter
### Description
Comparison output as strings with plain text.
- Each change is written on one line.
- If the new property value is composite, it is written [complex value].
- If the property is nested, the entire path to the root is displayed, not just the parent.
### Launch

- for Windows:
  `node bin/gendiff -f plain __fixtures__/fileNS1.json __fixtures__/fileNS2.json`
- for Ubuntu:
  `node bin/gendiff -f plain __fixtures__/fileNS1.json __fixtures__/fileNS2.json`
[![asciicast](https://asciinema.org/a/658695.svg)](https://asciinema.org/a/658695)


## Json formatter
### Description
Output in Json format
### Launch

- for Windows:
  `node bin/gendiff -f json __fixtures__/fileNS1.json __fixtures__/fileNS2.json`
- for Ubuntu:
  `node bin/gendiff -f json __fixtures__/fileNS1.json __fixtures__/fileNS2.json`
[![asciicast](https://asciinema.org/a/658696.svg)](https://asciinema.org/a/658696)