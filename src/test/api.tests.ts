
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiJsonSchema from 'chai-json-schema';
import { AllureHelpers } from '../util/AllureHelpers';
let should = chai.should();

let reporter = new AllureHelpers()

let API_ROOT = 'https://jsonplaceholder.typicode.com';

let recordSchema = {
  type: 'object',
  required: ['userId', 'id', 'title', 'body'],
  properties: {
    userId: {
      type: 'integer',
      minimum: 1
    },
    id: {
      type: 'integer',
      minimum: 1
    },
    title: {
      type: 'string'
    },
    body: {
      type: 'string'
    }
  }
},
  recordsSchema = {
    type: 'array',
    minItems: 100,
    items: recordSchema
  },
  recordCreateSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer"
      }
    },
    required: [
      "id"
    ]
  },
  attachRecord = async (res) => {
    if (res.status >= 400) await reporter.attachLog("Response", res)
  }

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('Record Api: ', () => {

  it('Validate the Records Present', async () => {
    await reporter.step(1, "Making Get Request and Validating response", async () => {
      let res = await chai.request(API_ROOT).get('/posts');
      attachRecord(res);//Only attach response if status code depicts an error

      expect(res.status).to.be.eql(200);
      expect(res.body.length).to.be.at.least(100);
      expect(res.body).to.be.jsonSchema(recordsSchema);
    })
  });

  it('Validate the target Record', async () => {
    await reporter.step(1, "Making Get Request and Validating response", async () => {
      let input = 1,
        res = await chai.request(API_ROOT).get(`/posts/${input}`);
      attachRecord(res)

      expect(res.status).to.be.eql(200);
      expect(res.body).to.be.jsonSchema(recordSchema);
      expect(res.body.id).to.be.equal(input);
    })
  });

  it('Validate the invalid Response', async () => {
    await reporter.step(1, "Making Get Request and Validating response", async () => {
      let res = await chai.request(API_ROOT).get(`/invalidposts`);
      attachRecord(res)

      expect(res.status).to.be.eql(404);
    })
  });

  it('Validate the Creation of a Record', async () => {
    await reporter.step(1, "Making Post Request and Validating response", async () => {

      let body = { title: 'foo', body: "bar", userId: 1 },
        res = await chai.request(API_ROOT).post('/posts').send(JSON.stringify(body));
      attachRecord(res)

      expect(res.status).to.be.eql(201);
      expect(res.body).to.be.jsonSchema(recordCreateSchema);
    })
  });

  it('Validate the Updation of a Record', async () => {
    await reporter.step(1, "Making Put Request and Validating response", async () => {

      let body = { id: 1, title: 'abc', body: "xyz", userId: 1 },
        res = await chai.request(API_ROOT).put('/posts/1').send(body);
      attachRecord(res)

      expect(res.status).to.be.eql(200);
      expect(res.body).to.be.jsonSchema(recordSchema);
    })
  });

  it('Validate the Deletion of a Record', async () => {
    await reporter.step(1, "Making Delete Request and Validating response", async () => {
      let res = await chai.request(API_ROOT).delete('/posts/1');
      attachRecord(res)

      expect(res.status).to.be.eql(200);
      expect(res.body).to.be.eql({});
    })
  });

});