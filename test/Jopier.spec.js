/**
 * Created by Franz on 1/28/2015.
 */

(function () {
    'use strict';

    var should = require('should');
    var Jopier = require ('../core/Jopier');

    describe('Jopier Tests', function () {
        it ('should have default paths', function (done) {
            var jopier = new Jopier();
            jopier.getPath().should.equal('/jopier/:key');
            jopier.postPath().should.equal('/jopier/:key');
            jopier.allPath().should.equal('/jopier');
            done();
        });
        it ('should save to mongo', function (done) {
            var jopier = new Jopier();
            var req = {body: {content :'Test Content'}, params :{key :'SOME_CONTENT'}};
            var res = {
                status: function (value) {
                    (value).should.equal(200);
                    done();
                    return {send: function (msg){}};
                }
            };
            jopier.post(req, res);
        });
        it ('should pull from mongo', function (done) {
            var jopier = new Jopier();
            var req = {params :{key :'SOME_CONTENT'}};
            var res = {
                status: function (value) {
                    (value).should.equal(200);
                    return {send: function (msg){
                        (msg.content).should.equal('Test Content');
                        done();
                    }};
                }
            };
            jopier.get(req, res);
        });
    });

})();
