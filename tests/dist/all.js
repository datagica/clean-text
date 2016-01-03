'use strict';

var _cleanText = require('../../lib/clean-text');

var _cleanText2 = _interopRequireDefault(_cleanText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/clean-text', function () {

  describe('cleaning text', function () {

    it('should work on weird japanese characters', function () {

      var tests = [{
        input: ' foo： ?？b!！ar ',
        output: 'foo b ar'
      }];

      tests.map(function (test) {
        var output = (0, _cleanText2.default)(test.input);
        //console.log("output: " + JSON.stringify(output));
        expect(output).to.be.like(test.output);
      });
    });
  });
});