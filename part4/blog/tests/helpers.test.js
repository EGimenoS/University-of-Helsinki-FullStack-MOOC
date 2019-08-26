const listHelper = require('../utils/list_helper')
const blogs = require('../utils/bloglist_test').blogs


describe('total likes', () => {
  const listWithOneBlog = blogs.slice(0,1)
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('it equals to the sum of likes in the blog list', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})