/* eslint-disable no-undef */
const chai = require('chai');
let expect = chai.expect;
const utils = require('../../util/utils');

function run() {

    describe('Set TimeOut Test', () => {
        it('it should call function after 10ms', async () => {
            await utils.sleep(10);
        });
    });

    describe('Split Array Test', () => {
        it('it should return split array data', () => {
            const result = utils.splitArray(['name', 'username'], splitInSize = 10);
            expect(result).to.eql([['name', 'username']]);
        });
    });

    describe('Random Integer Test', () => {
        it('it should return random integer ', () => {
            const result = utils.randomIntFromInterval(1, 5);
            expect(result).to.not.eql(null);
        });
    });
}


module.exports = {
    run
};