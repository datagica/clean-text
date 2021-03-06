'use strict'

class CleanText {
  constructor(opts) {
    if (typeof opts === 'undefined') {
      opts = {}
    }

    // TODO add more special characters:
    // https://ja.wikipedia.org/wiki/%E6%8B%AC%E5%BC%A7
    // https://en.wikipedia.org/wiki/Bracket
    // https://en.wikipedia.org/wiki/Comma
    // https://en.wikipedia.org/wiki/Colon_(punctuation)
    // https://en.wikipedia.org/wiki/Question_mark
    // https://en.wikipedia.org/wiki/Quotation_mark
    // https://en.wikipedia.org/wiki/Semicolon
    // https://en.wikipedia.org/wiki/Slash_(punctuation)

    this.separators = opts.separators || [
      '0009', // character tabulation
      '000A', // line feed
      '000B', // line tabulation
      '000C', // form feed
      '000D', // carriage return
      '0020', // space
      '0021', // exclamation mark
      '0022', // quotation mark
      '0027', // apostrophe
      '0028', // left parenthesis
      '0029', // right parenthesis
      '002C', // comma
      '003A', // colon
      '003B', // semicolon
      '003F', // question mark
      '0085', // next line
      '00A0', // no-break space
      '00A7', // section sign
      '00B6', // pilcrow (paragraph mark, paragraph sign, paraph, alinea)
      '00B7', // interpunct
      '01C3', // latin letter retroflex click
      '02D0', // ipa triangular colon
      '1680', // ogham space mark
      '2000', // en quad
      '2001', // em quad
      '2002', // en space
      '2003', // em space
      '2004', // three-per-em space
      '2005', // four-per-em space
      '2006', // six-per-em space
      '2007', // figure space
      '2008', // punctuation space
      '2009', // thin space
      '200A', // hair space

      // OK actually we want to keep this one, it is part of some words
      // '2012', // figure dash

      '2013', // en dash
      '2014', // em dash
      '2015', // horizontal bar

      '2025', // japanese two-dots ellipsis
      '2026', // japanese three-dots ellipsis
      '2028', // line separator
      '2029', // paragraph separator
      '2047', // double question mark
      '2048', // question exclamation mark
      '2049', // exclamation question mark
      '202F', // narrow no-break space
      '205F', // medium mathematical space
      '203C', // double exclamation mark
      '2E0F', // paragraphos
      '3000', // ideographic space
      '3002', // japanese full stop
      '303D', // japanese part alternation mark
      'FF1A', // full-width colon
      'FF1F', // full-width question mark
      'FE56', // small question mark
      'FE57', // small exclamation mark
      'FF01' // full-width exclamation mark
    ];

    const splitCharacters = this.separators.map(s => '\\u' + s).join('');
    this.pattern = new RegExp(`[ :\\s${splitCharacters}]+`, 'g');
  }

  keepText(text, cb) {
    const finalResult = text
      .replace(/(?:\t|\r|\n)+/g, ' ')
      .replace(/\s+/g, ' ');
    if (typeof cb !== 'undefined') {
      cb(finalResult);
    } else {
      return finalResult;
    }
  }
  keepWords(text, cb) {
    const finalResult = text
      .replace(/(?:\t|\r|\n)+/g, ' ')
      .replace(/(?:!|\:|\?|;|,)/g, ' ')
      .replace(/(?:"|'|\(|\))/g, ' ')
      .replace(/\s+/g, ' ');
    /*
      .replace(/àâäã/,'a')
      .replace(/èéêë/,'e')
      .replace(/îï/,'i')
      .replace(/ôöõ/,'o')
      .replace(/ûü/,'u')
      .replace(/ñ/,'n');
      */

    if (typeof cb !== 'undefined') {
      cb(finalResult);
    } else {
      return finalResult;
    }
  }

  cleanText(txt) {
    return txt.replace(this.pattern, ' ').trim();
  }
}



const singletonInstance = new CleanText({})
const singletonMethod = function() {
  return singletonInstance.cleanText.apply(singletonInstance, arguments);
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.cleanText = singletonInstance
module.exports.CleanText = CleanText
module.exports.separators = singletonInstance.separators
