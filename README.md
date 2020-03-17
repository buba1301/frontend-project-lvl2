[![Maintainability](https://api.codeclimate.com/v1/badges/f6ce536e50342d5ef5a0/maintainability)](https://codeclimate.com/github/buba1301/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f6ce536e50342d5ef5a0/test_coverage)](https://codeclimate.com/github/buba1301/frontend-project-lvl2/test_coverage)
![Node CI](https://github.com/buba1301/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

# Difference calculator

To run a utility that shows what has changed in the file, clone the repository and start

```
make install
make publish
npm link
```

To compare the file before and after, run

```
gendiff FILENAME1 FILENAME2
```

By default, the string format is displayed with a convenient display of changes

Default format example

https://asciinema.org/a/ksU74wqqYpoFOSqUTQLbNZa9C

There is also the ability to display the difference in a plain format and format JSON

Plane format example

https://asciinema.org/a/QHORA9R1wbRqVmcQOhL3tx7kp

Format JSON example

https://asciinema.org/a/tapF0Onlfdz3dy2YFR0HCyg0E