import Redis from 'ioredis'

describe('hexists', () => {
  describe('hash exists', () => {
    const redis = new Redis({
      data: {
        foo: { bar: 'baz' },
      },
    })

    it('should return 1 if key exists in hash map', () => {
      return redis.hexists('foo', 'bar').then(status => {
        return expect(status).toBe(1)
      })
    })

    it('should return 0 if key not exists in hash map', () => {
      return redis.hexists('foo', 'baz').then(status => {
        return expect(status).toBe(0)
      })
    })
  })

  describe("hash doesn't exist", () => {
    const redis = new Redis()

    it('should return 0', () => {
      return redis.hexists('foo', 'baz').then(status => {
        return expect(status).toBe(0)
      })
    })
  })
})