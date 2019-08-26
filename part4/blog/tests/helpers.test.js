const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  expect(listHelper.dummy()).toBe(1)
})