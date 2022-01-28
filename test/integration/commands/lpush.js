import Redis from 'ioredis'

describe('lpush', () => {
  it('should add the values to the list in the correct order', () => {
    const redis = new Redis({
      data: {
        foo: ['1'],
      },
    })

    return redis.lpush('foo', 9, 8, 7).then(() => {
      return expect(redis.data.get('foo')).toEqual(['7', '8', '9', '1'])
    })
  })

  it('should return the new length of the list', () => {
    const redis = new Redis({
      data: {},
    })

    return redis.lpush('foo', 9, 8, 7).then(length => {
      return expect(length).toBe(3)
    })
  })

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new Redis({
      data: {
        foo: 'not a list',
      },
    })

    return redis.lpush('foo', 1).catch(err => {
      return expect(err.message).toBe('Key foo does not contain a list')
    })
  })
})