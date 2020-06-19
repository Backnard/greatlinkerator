const axios = require('axios');

require('dotenv').config();
const { API_URL } = process.env;

describe('Booleans', ()=>{
    it('is a test of the tests', async ()=>{
        expect(true === true).toEqual(true);
    });
})

describe('Router Tests', ()=>{
  describe('Links Router', ()=>{

    it('is a test / GET all links', async ()=>{
        const res = axios.get(`${API_URL}/links`);

        expect(res.data.status).toEqual(true);
    });

    it('is a test of / POST create tags', ()=>{
        const res = axios.post(`${API_URL}/links`, {
            url: 'www.facebook.com',
            comment: 'does anybody remember myspace?',
            date:'2020-06-18'

        })

            expect(res.data.status).toEqual(true);
    })

    it('is a test of /: PATCH create tags', ()=>{
        const res = axios.patch(`${API_URL}/links/1`, {
            comments: 'does anybody remember myspace?',
            tags: 'BIG BROTHER'

        })

            expect(res.data.status).toEqual(true);
    })

  })  
   
})