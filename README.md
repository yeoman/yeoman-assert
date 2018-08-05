# yeoman-assert [![Build Status](https://travis-ci.org/yeoman/yeoman-assert.svg?branch=master)](https://travis-ci.org/yeoman/yeoman-assert)

`yeoman-assert` is extending the native Node.js `assert` module. Every method in `assert` also is available with `yeoman-assert`, plus some code scaffolding related assertion helpers.


## Install

```
$ npm install yeoman-assert
```


## Usage

```js
const assert = require('yeoman-assert');

assert(true);
assert.equal(1, 1);
```


## API

### `assert.file()`

- **path** (String|Array) Path to a file.

Assert that a file exists.

```js
assert.file('templates/user.hbs');
```

Assert that each file in the array exists.

```js
assert.file(['templates/user.hbs', 'templates/user/edit.hbs']);

```


### `assert.noFile()`

- **path** (String|Array) Path to a file.

Assert that a file doesn't exist.

```js
assert.noFile('templates/user.hbs');
```

Assert that each of an array of files doesn't exist.

```js
assert.noFile(['templates/user.hbs', 'templates/user/edit.hbs']);

```


### `assert.fileContent()`

- **file** (String|Array) Path to a file.
- **reg** (Regex|String) Regex or string that will be used to search the file.

Assert that a file's content matches a string.

```js
assert.fileContent('models/user.js', 'App.User = DS.Model.extend');

```

Assert that a file's content matches a regex.

```js
assert.fileContent('models/user.js', /App\.User = DS\.Model\.extend/);
```

Assert that each of an array of files content matches a regex or string.

```js
assert.fileContent([
   ['models/user.js', 'App.User = DS.Model.extend'],
   ['controllers/user.js', /App\.UserController = Ember\.ObjectController\.extend/]
]);
```


### `assert.noFileContent()`

- **file** (String|Array) Path to a file.
- **reg** (Regex|String) Regex or string that will be used to search the file.

Assert that a file's content does not match a string.

```js
assert.noFileContent('models/user.js', 'App.User = DS.Model.extend');

```

Assert that a file's content does not match a regex.

```js
assert.noFileContent('models/user.js', /App\.User = DS\.Model\.extend/);
```

Assert that each of an array of files content does not match a regex or string.

```js
assert.noFileContent([
   ['models/user.js', 'App.User = DS.Model.extend'],
   ['controllers/user.js', /App\.UserController = Ember\.ObjectController\.extend/]
]);
```

### `assert.textEqual()`

- **value** (String) A string.
- **expected** (String) The expected value of the string.

Assert that two strings are equal after standardization of newlines.

```js
assert.textEqual('I have a yellow cat', 'I have a yellow cat');
```


### `assert.implement()`

- **subject** (Object) Subject implementing the facade.
- **methods** (Object|Array) A facade, hash or array of keys to be implemented.

Assert an Object implements an interface.

```js
assert.implement(fs, ['readFile']);
```


### `assert.notImplement()`

- **subject** (Object) Subject not implementing the methods.
- **methods** (Object|Array) Hash or array of method names to be implemented.

Assert an Object doesn't implement any method of an interface.

```js
assert.notImplement(fs, ['foo']);
```

### `assert.objectContent()`

Assert an object contains at least a set of keys.

```js
var anObject = {a: 1};

assert.objectContent(anObject, {a: 2});
```

### `assert.noObjectContent()`

Assert an object does not contain at least a set of keys.

```js
var anObject = {a: 1};

assert.noObjectContent(anObject, {a: 1});
```

### `assert.jsonFileContent()`

Assert a JSON file contains at least a set of keys (relies on `assert.objectContent()`).

```js
assert.jsonFileContent('path/to/file.json', {a: 2});
```

### `assert.noJsonFileContent()`

Assert a JSON file does not contain at least a set of keys (relies on `assert.noObjectContent()`).

```js
assert.noJsonFileContent('path/to/file.json', {a: 1});
```


## Contribute

See the [contributing docs](http://yeoman.io/contributing/).


## License

BSD-2-Clause © Google
