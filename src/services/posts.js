import userApi from 'src/composables/UserApi'

export default function postsService () {
  const { list, store, update, destroy, getById } = userApi('posts')

  return {
    list,
    store,
    update,
    destroy,
    getById
  }
}
