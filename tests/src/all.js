const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

import cleanText from "../../lib/clean-text";

describe('@datagica/clean-text', () => {

  describe('cleaning text', () => {

    it('should work on weird japanese characters', () => {

      const tests = [{
        input: ` foo： ?？b!！ar `,
        output: `foo b ar`
      }];

      tests.map(test => {
        const output = cleanText(test.input)
        //console.log("output: " + JSON.stringify(output));
        expect(output).to.be.like(test.output)
      })

    })
  })
})
