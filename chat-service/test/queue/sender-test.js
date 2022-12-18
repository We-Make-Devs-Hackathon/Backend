/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.ENABLE_QUEUE = 'false';
const chai = require('chai');
let expect = chai.expect;
const sinon = require('sinon');
const requestTemplate = require('../../util/request-template');
const sender = require('../../queue/sender');


function run() {
    describe('Emit test', () => {
        let requestTemplatePost;

        beforeEach(function () {
            requestTemplatePost = sinon.stub(requestTemplate, 'post');
        });

        afterEach(function () {
            requestTemplatePost.restore();
        });

        it('it should emit', async () => {
            let req = {
                traceId: 'traceid',
                id: 'id',
                log: (...args) => { },
                error: () => { }
            };
            requestTemplatePost.returns({
                then: (value) => {
                    value();
                    return {
                        catch: (value2) => {
                            value2();
                        }
                    };
                }
            });
            const result = await sender.emit(req, 'type', { name: 'test' }, 'hospital-game');
            expect(result).to.not.eql(null);
            expect(req.log('error')).to.not.eql(null);
        });

        it('it should throw error services must array ', async () => {
            let req = {
                traceId: 'traceid',
                id: 'id',
                log: (...args) => { },
                error: () => { }
            };
            requestTemplatePost.returns({
                then: (value) => {
                    value();
                    return {
                        catch: (value2) => {
                            value2();
                        }
                    };
                }
            });
            try {
                await sender.emit(req, 'type', { name: 'test' }, ...[]);
            } catch (error) {
                expect(error).to.eql('services must be array');
            }
        });
    });
}

module.exports = {
    run
};