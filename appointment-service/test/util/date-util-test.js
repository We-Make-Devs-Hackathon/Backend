/* eslint-disable no-undef */
const chai = require('chai');
let expect = chai.expect;
const dateUtil = require('../../util/date-util'); 

function run(){
    
    describe('Get Week start Test', () => {
        let date = new Date();
        it('it should return week date', async() => {
            const result = dateUtil.getWeekStart(null,date);
            expect(result).to.not.eql(null);
        });
        it('it should return week date', async() => {
            const result = dateUtil.getWeekStart(null,null);
            expect(result).to.not.eql(null);
        });
    });

    describe('Get Week End Test', () => {
        let date = new Date();
        it('it should return end week date', async() => {
            const result = dateUtil.getWeekEnd(null,date);
            expect(result).to.not.eql(null);
        });
        it('it should return end week date', async() => {
            const result = dateUtil.getWeekEnd(null,null);
            expect(result).to.not.eql(null);
        });
    });

    describe('Get Date Start Of Test', () => {
        let date = new Date();
        it('it should return start of week date', async() => {
            const result = dateUtil.getStartOf(null,date,'week');
            expect(result).to.not.eql(null);
        });
        it('it should return start of week date', async() => {
            const result = dateUtil.getStartOf(null,null,'day');
            expect(result).to.not.eql(null);
        });
        it('it should return start of day date', async() => {
            const result = dateUtil.getStartOf(null,date,'day');
            expect(result).to.not.eql(null);
        });
    });

    describe('Get Date End Of Test', () => {
        let date = new Date();
        it('it should return end of week date', async() => {
            const result = dateUtil.getEndOf(null,date,'week');
            expect(result).to.not.eql(null);
        });
        it('it should return end of week date', async() => {
            const result = dateUtil.getEndOf(null,null,'day');
            expect(result).to.not.eql(null);
        });
        it('it should return end of day date', async() => {
            const result = dateUtil.getEndOf(null,date,'day');
            expect(result).to.not.eql(null);
        });
    });
}

module.exports ={
    run
};