import { expect } from 'chai';
import request from 'supertest';

import '../../spec-helper';
import config from '../../../config';
import { application } from '../../../src/';
import profileFixture from '../../fixtures/profile';

let app;

describe('profile api', function () {
  before(async function () {
    app = await application(config);
  });

  beforeEach(async function () {
    await this.connection('$_profile').insert(profileFixture);
  });


  describe('detail', function () {
    it('should be able to get profile', function (done) {
      request(app)
        .get('/1')
        .set('x-client-id', 1)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.body).to.not.have.property('deleted');
          expect(res.body).to.have.property('name').equal('Bob');
          expect(res.body._links).to.have.property('self');
          expect(res.body._links.self).to.be.deep.equal({ href: '/1' });

          done();
        });
    });

    it('should get 404 when does not exists', function (done) {
      request(app)
        .get('/11111111')
        .set('x-client-id', 1)
        .expect(404, done);
    });
  });

  describe('create', function () {
    it('should be able to create', function (done) {
      request(app)
        .post('/')
        .send({
          name: 'Robert',
        })
        .set('x-client-id', 1)
        .expect(201)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.body._links).to.have.property('self');
          expect(res.body).to.not.have.property('deleted');
          expect(res.body).to.have.property('name').equal('Robert');
          expect(res.body._links.self).to.be.deep.equal({ href: `/${res.body.id}` });

          done();
        });
    });

    it('should get 400 when its not valid data', function (done) {
      request(app)
        .post('/')
        .send({})
        .set('x-client-id', 1)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.body).to.have.property('error');

          done();
        });
    });
  });

  describe('update', function () {
    it('should be able to update', function (done) {
      request(app)
        .put('/1')
        .send({
          name: 'Mike',
        })
        .set('x-client-id', 1)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.body._links).to.have.property('self');
          expect(res.body).to.not.have.property('deleted');
          expect(res.body).to.have.property('name', 'Mike');
          expect(res.body._links.self).to.be.deep.equal({ href: '/1' });

          done();
        });
    });
  });

  describe('remove', function () {
    it('should be able to remove', function (done) {
      request(app)
        .delete('/1')
        .set('x-client-id', 1)
        .expect(200)
        .end(done);
    });

    it('should get not found when does not exists', function (done) {
      request(app)
        .delete('/xyz')
        .set('x-client-id', 1)
        .expect(404)
        .end(done);
    });
  });
});
