<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-gutter-md"
    >
      <q-input
        filled
        v-model="form.title"
        label="Título"
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        filled
        v-model="form.author"
        label="Autor"
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
      />

       <q-editor
          v-model="form.content"
          flat
          content-class="bg-amber-3"
          toolbar-text-color="white"
          toolbar-toggle-color="yellow-8"
          toolbar-bg="primary"
          class="col-12"
          :toolbar="[
            ['bold', 'italic', 'underline'],
            [{
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
            }]
          ]"
        />

        <div class="q-gutter-md col-12">
          <q-btn label="Salvar" color="primary" type="submit" class="float-right" />
          <q-btn
          :to="{name: 'home'}"
          label="Cancelar"
          color="white"
          type="submit"
          class="float-right"
          text-color="primary" />
        </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

import postService from 'src/services/posts'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()

    const { store, update, getById } = postService()

    const form = ref({
      title: '',
      author: '',
      content: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        await getPost(route.params.id)
      }
    })

    const getPost = async (id) => {
      const response = await getById(id)
      form.value = response
    }

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await store(form.value)
        }

        router.push({ name: 'home' })

        $q.notify({
          type: 'positive',
          message: 'Post salvo com sucesso.'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Falha ao salvar o post.'
        })
      }
    }

    return {
      form,
      onSubmit
    }
  }

})
</script>
