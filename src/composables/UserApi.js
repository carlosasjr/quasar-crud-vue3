import { api } from 'src/boot/axios'

export default function userApi (url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const store = async (formData) => {
    try {
      const { data } = await api.post(url, formData)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (formData) => {
    try {
      const { data } = await api.put(`${url}/${formData.id}`, formData)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const destroy = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    store,
    update,
    destroy,
    getById
  }
}
