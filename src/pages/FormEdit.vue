<!-- eslint-disable max-len -->
<template>
  <q-page padding>
    <q-form @submit="handleSubmit()" class="row q-col-gutter-sm justify-center">
      <div class="col-lg-7 col-xs-12">
        <q-input filled v-model="form.title" label="Title *" lazy-rules :rules="[val => val && val.length > 0 || 'Please type min 1 and max 191 characters']" type="text" />
      </div>
      <div class="col-lg-7 col-xs-12">
        <q-input filled v-model="form.director" label="Director" lazy-rules type="text" />
      </div>
      <div class="col-lg-7 col-xs-12" style="padding-top: 2rem">
        <q-input filled v-model="form.overview" label="Summary" lazy-rules type="textarea" />
      </div>

      <div class="col-lg-7 col-xs-12" style="padding-top: 2rem">
        <q-select
          filled
          v-model="form.genres"
          multiple
          :options="genres.map(g=>{return g['name']})"
          use-chips
          stack-label
          label="Genres"
        />
        <!-- <label>Genres</label>
        <div class="row">
          <div class="col-2" v-for="genre in genres" :key="genre.id" :item ="genre"><q-checkbox v-model="genres">{{ genre.name }}</q-checkbox></div>
        </div> -->
      </div>

      <div class="col-lg-7 col-xs-12 q-gutter-sm" style="padding-top: 2rem; padding-bottom: 2rem;">
        <q-btn label="Save" type="submit" color="primary" class="float-right" icon="save" @submit="handleSubmit()" />
        <q-btn label="Cancel" color="white" class="float-right" text-color="primary" :to="{ name: 'my-collection' }" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'FormMovie',
  setup() {
    const form = ref({
      id: '',
      title: '',
      overview: '',
      genres: [],
    });
    const route = useRoute();
    // const getMoviesById = async (id) => {
    //   try {
    //     const { data } = await api.get(`movies/${id}`);
    //     return data.data;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // };
    const getMoviesById = (id) => {
      const collection = JSON.parse(localStorage.getItem('my_collection'));
      // eslint-disable-next-line array-callback-return
      const objWithIdIndex = collection.find((obj) => obj.id.toString() === id.toString());
      return objWithIdIndex;
    };

    onMounted(() => {
      if (route.params.id) {
        const response = getMoviesById(route.params.id);
        form.value = response;
      }
    });
    const $q = useQuasar();
    const router = useRouter();

    const genres = [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 99,
        name: 'Documentary',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 36,
        name: 'History',
      },
      {
        id: 27,
        name: 'Horror',
      },
      {
        id: 10402,
        name: 'Music',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10749,
        name: 'Romance',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 10770,
        name: 'TV Movie',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 10752,
        name: 'War',
      },
      {
        id: 37,
        name: 'Western',
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const post = async (form) => {
      try {
        const { data } = await api.post('movies', form.value);
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const update = async (form) => {
      try {
        // const { data } = await api.put(`movies/${route.params.id}`, form.value);
        const collection = JSON.parse(localStorage.getItem('my_collection'));
        const movieIndex = collection.findIndex((obj) => obj.id.toString() === form.id.toString());
        collection[movieIndex].title = form.value?.title;
        localStorage.setItem('my_collection', JSON.stringify(collection));
        $q.notify({ message: 'Movie updated', icon: 'check', color: 'positive' });
        router.push({ name: 'my-collection' });
        // return data.data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleSubmit = async () => {
      if (route.params.id) {
        try {
          await update(form);
        } catch (error) {
          $q.notify({ message: 'Error: Movie not updated', icon: 'close', color: 'negative' });
        }
      } else {
        post(form);
        $q.notify({ message: 'Movie created', icon: 'check', color: 'positive' });
        router.push({ name: 'my-collection' });
      }
    };

    return {
      form,
      genres,
      handleSubmit,
    };
  },
});
</script>

<style></style>
