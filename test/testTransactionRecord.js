const getOption = require('../src/transactionRecord.js').getOption;
//const executeOption = require('../src/transactionRecord.js').executeOption;
const getStructure = require('../src/transactionRecord.js').getStructure;
const assert = require('assert');

describe("getOption",function(){
  it("should give the save command when save is present", function(){
    let actual = ["--save","--bevarage","orange","--empid","1111","--qty",1];
    assert.strictEqual(getOption(actual),"--save");
  });

    it("should give the query command when query is present", function(){
      let actual = ["--query","--empid","1111"];
      assert.strictEqual(getOption(actual),"--query");
  });
});

describe("getStructure",function() {
  it("should form the structure when options are correct", function(){
    let details = ["bevarage","orange","empid","111","qty","1"];
    let expected =  {
      "empid": details[3],
      "bevarages": details[1],
      "qty": details[5],
      "date":new Date()
    };
    assert.deepStrictEqual(getStructure(details), expected)
  })
});
