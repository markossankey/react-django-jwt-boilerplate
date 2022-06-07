import axios from "axios";

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('backend login url test', () => {
  it('should return a access_token via response data, and refresh token via http only cookie', async () => {
    const response = await axios.post('http://localhost:8000/api/token/', { username: 'admin', password: 'admin' }, { withCredentials: true })
    expect(response.data.access).toBeDefined()
    expect(response.headers['set-cookie'][0]).toMatch(/refresh_token/)
  })
})
