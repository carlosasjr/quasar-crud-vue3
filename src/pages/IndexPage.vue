<template>
  <q-page padding>
    <q-table
      title="Posts"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h5">Posts</span>
        <q-space />
        <q-btn color="primary"  label="Novo" :to="{name : 'formPost'}" />
      </template>

    <template v-slot:body-cell-action="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" dense size="sm" color="info" @click="handleEdit(props.row.id)" />
          <q-btn icon="delete" dense size="sm" color="red" @click="handleDestroy(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import postService from 'src/services/posts'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    onMounted(() => {
      getPosts()
    })
    const $q = useQuasar()
    const router = useRouter()

    const posts = ref([])
    const columns = [
      { name: 'id', field: 'id', label: '#', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'left' },
      { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
      { name: 'action', field: 'action', label: 'Ações', align: 'right' }
    ]
    const { list, destroy } = postService()

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Falha ao buscar os posts.'
        })
      }
    }

    const handleDestroy = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar o post?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await destroy(id)
          await getPosts()
          $q.notify({
            type: 'positive',
            message: 'Post deletado com sucesso.'
          })
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Falha ao deletar o posts.'
        })
      }
    }

    const handleEdit = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }

    return {
      columns,
      posts,
      handleDestroy,
      handleEdit
    }
  }
})
</script>
