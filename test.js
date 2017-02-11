'use strict';
const path = require('path');
const assert = require('assert');
const yoAssert = require('.');

const noop = () => {};

describe('yeoman-assert', () => {
  beforeEach(() => {
    process.chdir(path.join(__dirname, 'fixtures'));
  });

  it('extend native assert module', () => {
    yoAssert.implement(yoAssert, assert);
  });

  describe('.file()', () => {
    it('accept a file that exists', () => {
      assert.doesNotThrow(yoAssert.file.bind(yoAssert, 'testFile'));
    });

    it('accept an array of files all of which exist', () => {
      assert.doesNotThrow(yoAssert.file.bind(yoAssert, ['testFile', 'testFile2']));
    });

    it('reject a file that does not exist', () => {
      assert.throws(yoAssert.file.bind(yoAssert, 'etherealTestFile'));
    });

    it('reject multiple files one of which does not exist', () => {
      assert.throws(yoAssert.file.bind(yoAssert, ['testFile', 'intangibleTestFile']));
    });
  });

  describe('.noFile()', () => {
    it('accept a file that does not exist', () => {
      assert.doesNotThrow(yoAssert.noFile.bind(yoAssert, 'etherealTestFile'));
    });

    it('accept an array of files all of which do not exist', () => {
      assert.doesNotThrow(
        yoAssert.noFile.bind(yoAssert, ['etherealTestFile', 'intangibleTestFile']));
    });

    it('reject a file that exists', () => {
      assert.throws(yoAssert.noFile.bind(yoAssert, 'testFile'));
    });

    it('reject an array of files one of which exists', () => {
      assert.throws(
        yoAssert.noFile.bind(yoAssert, ['testFile', 'etherealTestFile']));
    });
  });

  describe('.fileContent()', () => {
    it('accept a file and regex when the file content matches the regex', () => {
      assert.doesNotThrow(yoAssert.fileContent.bind(yoAssert, 'testFile', /Roses are red/));
    });

    it('accept a file and string when the file contains the string', () => {
      assert.doesNotThrow(yoAssert.fileContent.bind(yoAssert, 'testFile', 'Roses are red'));
    });

    it('reject a file and regex when the file content does not match the regex', () => {
      assert.throws(yoAssert.fileContent.bind(yoAssert, 'testFile', /Roses are blue/));
    });

    it('reject a file and string when the file content does not contain the string', () => {
      assert.throws(yoAssert.fileContent.bind(yoAssert, 'testFile', 'Roses are blue'));
    });

    it('accept an array of file/regex pairs when each file\'s content matches the corresponding regex', () => {
      const arg = [
        ['testFile', /Roses are red/],
        ['testFile2', /Violets are blue/]
      ];
      assert.doesNotThrow(yoAssert.fileContent.bind(yoAssert, arg));
    });

    it('reject an array of file/regex pairs when one file\'s content does not matches the corresponding regex', () => {
      const arg = [
        ['testFile', /Roses are red/],
        ['testFile2', /Violets are orange/]
      ];
      assert.throws(yoAssert.fileContent.bind(yoAssert, arg));
    });
  });

  describe('.noFileContent()', () => {
    it('accept a file and regex when the file content does not match the regex', () => {
      assert.doesNotThrow(yoAssert.noFileContent.bind(yoAssert, 'testFile', /Roses are blue/));
    });

    it('accept a file and string when the file content does not contain the string', () => {
      assert.doesNotThrow(yoAssert.noFileContent.bind(yoAssert, 'testFile', 'Roses are blue'));
    });

    it('reject a file and regex when the file content matches the regex', () => {
      assert.throws(yoAssert.noFileContent.bind(yoAssert, 'testFile', /Roses are red/));
    });

    it('reject a file and string when the file content contain the string', () => {
      assert.throws(yoAssert.noFileContent.bind(yoAssert, 'testFile', 'Roses are red'));
    });

    it('accept an array of file/regex pairs when each file\'s content does not match its corresponding regex', () => {
      const arg = [
        ['testFile', /Roses are green/],
        ['testFile2', /Violets are orange/]
      ];
      assert.doesNotThrow(yoAssert.noFileContent.bind(yoAssert, arg));
    });

    it('reject an array of file/regex pairs when one file\'s content does matches its corresponding regex', () => {
      const arg = [
        ['testFile', /Roses are red/],
        ['testFile2', /Violets are orange/]
      ];
      assert.throws(yoAssert.noFileContent.bind(yoAssert, arg));
    });
  });

  describe('.textEqual()', () => {
    it('pass with two similar simple lines', () => {
      assert.doesNotThrow(yoAssert.textEqual.bind(yoAssert,
        'I have a yellow cat',
        'I have a yellow cat'
      ));
    });

    it('fails with two different simple lines', () => {
      assert.throws(yoAssert.textEqual.bind(yoAssert,
        'I have a yellow cat',
        'I have a brown cat'
      ));
    });

    it('pass with two similar simple lines with different new line types', () => {
      assert.doesNotThrow(yoAssert.textEqual.bind(yoAssert,
        'I have a\nyellow cat',
        'I have a\r\nyellow cat'
      ));
    });
  });

  describe('.implement()', () => {
    beforeEach(function () {
      this.subject = {foo: noop, bar: noop};
      this.interfaceSome = ['foo'];
      this.interfaceComplete = ['foo', 'bar'];
      this.interfaceMore = ['foo', 'yo'];
    });

    it('pass if an object implement an interface', function () {
      assert.doesNotThrow(yoAssert.implement.bind(yoAssert, this.subject, this.interfaceSome));
      assert.doesNotThrow(yoAssert.implement.bind(yoAssert, this.subject, this.interfaceComplete));
    });

    it('fails if methods are missing', function () {
      assert.throws(yoAssert.implement.bind(yoAssert, this.subject, this.interfaceMore));
    });

    it('allow interface to be an object (using its object.keys)', function () {
      const interfacePass = {foo: noop};
      const interfaceFail = {yop: noop};
      assert.doesNotThrow(yoAssert.implement.bind(yoAssert, this.subject, interfacePass));
      assert.throws(yoAssert.implement.bind(yoAssert, this.subject, interfaceFail));
    });

    it('when object is passed in, it only check it implements the methods', function () {
      const expected = {foo: noop, yop: 'some arg'};
      assert.doesNotThrow(yoAssert.implement.bind(yoAssert, this.subject, expected));
    });
  });

  describe('.notImplement()', () => {
    beforeEach(function () {
      this.subject = {foo: noop, bar: noop};
      this.interfaceSome = ['foo'];
    });

    it('pass if an object doesn\'t implement an interface', function () {
      assert.doesNotThrow(yoAssert.notImplement.bind(yoAssert, this.subject, ['stuff']));
    });

    it('fails if methods are present', function () {
      assert.throws(yoAssert.notImplement.bind(yoAssert, this.subject, ['foo']));
    });
  });

  describe('.objectContent()', () => {
    it('pass if object contains the keys', () => {
      assert.doesNotThrow(yoAssert.objectContent.bind(yoAssert, {
        a: 'foo'
      }, {
        a: 'foo'
      }));
    });

    it('pass if object contains nested objects and arrays', () => {
      assert.doesNotThrow(yoAssert.objectContent.bind(yoAssert, {
        a: {b: 'foo'},
        b: [0, 'a'],
        c: 'a'
      }, {
        a: {b: 'foo'},
        b: [0, 'a']
      }));
    });

    it('pass if array is incomplete', () => {
      assert.doesNotThrow(yoAssert.objectContent.bind(yoAssert, {
        b: [0, 'a']
      }, {
        b: [0]
      }));
    });

    it('fails if object does not contain a key', () => {
      assert.throws(yoAssert.objectContent.bind(yoAssert, {}, {
        a: 'foo'
      }));
    });

    it('fails if nested object does not contain a key', () => {
      assert.throws(yoAssert.objectContent.bind(yoAssert, {
        a: {}
      }, {
        a: {b: 'foo'}
      }));
    });
  });

  describe('.noObjectContent()', () => {
    it('fails if object contains the keys', () => {
      assert.throws(yoAssert.noObjectContent.bind(yoAssert, {
        a: 'foo'
      }, {
        a: 'foo'
      }));
    });

    it('pass if object contains nested objects and arrays', () => {
      assert.throws(yoAssert.noObjectContent.bind(yoAssert, {
        a: {b: 'foo'},
        b: [0, 'a'],
        c: 'a'
      }, {
        a: {b: 'foo'},
        b: [0, 'a']
      }));
    });

    it('pass if array is incomplete', () => {
      assert.throws(yoAssert.noObjectContent.bind(yoAssert, {
        b: [0, 'a']
      }, {
        b: [0]
      }));
    });

    it('pass if object does not contain a key', () => {
      assert.doesNotThrow(yoAssert.noObjectContent.bind(yoAssert, {}, {
        a: 'foo'
      }));
    });

    it('pass if nested object does not contain a key', () => {
      assert.doesNotThrow(yoAssert.noObjectContent.bind(yoAssert, {
        a: {}
      }, {
        a: {b: 'foo'}
      }));
    });
  });

  describe('.jsonFileContent()', () => {
    const file = path.join(__dirname, 'fixtures/dummy.json');

    it('is aliased to .JSONFileContent()', () => {
      assert(yoAssert.jsonFileContent === yoAssert.JSONFileContent);
    });

    it('pass if file contains the keys', () => {
      assert.doesNotThrow(yoAssert.jsonFileContent.bind(yoAssert, file, {
        a: {b: 1},
        b: [1, 2],
        d: null
      }));
    });

    it('fails if file does not contain the keys', () => {
      assert.throws(yoAssert.jsonFileContent.bind(yoAssert, file, {
        a: {b: 1},
        b: 'a'
      }));

      assert.throws(yoAssert.jsonFileContent.bind(yoAssert, file, {
        a: {b: 3},
        b: [1]
      }));
    });

    it('fails if file does not exists', () => {
      assert.throws(yoAssert.jsonFileContent.bind(yoAssert, 'does-not-exist', {}));
    });
  });

  describe('.noJsonFileContent()', () => {
    const file = path.join(__dirname, 'fixtures/dummy.json');

    it('is aliased to .noJSONFileContent()', () => {
      assert(yoAssert.noJsonFileContent === yoAssert.noJSONFileContent);
    });

    it('fails if file contains the keys', () => {
      assert.throws(yoAssert.noJsonFileContent.bind(yoAssert, file, {
        a: {b: 1},
        b: [1, 2]
      }));
    });

    it('pass if file does not contain the keys', () => {
      assert.doesNotThrow(yoAssert.noJsonFileContent.bind(yoAssert, file, {
        c: {b: 1},
        b: 'a'
      }));

      assert.doesNotThrow(yoAssert.noJsonFileContent.bind(yoAssert, file, {
        a: {b: 3},
        b: [2]
      }));
    });

    it('fails if file does not exists', () => {
      assert.throws(yoAssert.noJsonFileContent.bind(yoAssert, 'does-not-exist', {}));
    });
  });
});
