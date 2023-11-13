<!-- eslint-disable max-len -->
<template>
  <div class="q-pa-md">

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start justify-center">
        <div class="col-lg-2 col-sm-6" v-for="movie in movies" :key="movie.id" :item ="movie">
          <q-card flat bordered class="my-card">
            <q-img :src="`https://image.tmdb.org/t/p/w200`+movie.poster_path">
              <div class="absolute-bottom">
                <div class="text-subtitle2">{{ movie.title }}</div>
                <div class="row justify-between">
                  <div class="text-subtitle4">{{ movie.release_date.substring(0, 4) }}</div>
                  <div class="text-subtitle4">&#9734; {{ parseFloat(movie.vote_average).toFixed(1) }}</div>
                </div>
              </div>
            </q-img>
            <q-card-actions class="justify-center">
              <q-btn label="Edit" icon="edit" color="info" dense size="sm" @click="handleEditMovie(movie.id)" />
              <q-btn label="Remove" icon="delete" color="warning" dense size="sm" @click="handleDeleteMovie(movie.id)" />
            </q-card-actions>
        </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MyCollection',
  setup() {
    const movies = ref([]);
    const form = ref({
      field: '',
      query: '',
    });
    const $q = useQuasar();
    const router = useRouter();

    const getMovies = async () => {
      try {
        const data = JSON.parse(localStorage.getItem('my_collection'));
        movies.value = data && data.length > 0 ? data : [];
      } catch (error) {
        throw new Error(error);
      }
    };
    // eslint-disable-next-line consistent-return
    const remove = async (id) => {
      try {
        // const data = await api.delete(`movies/${id}`);
        // return data.data;
        const collection = JSON.parse(localStorage.getItem('my_collection'));
        const objWithIdIndex = collection.findIndex((obj) => obj.id === id);
        collection.splice(objWithIdIndex, 1);
        localStorage.setItem('my_collection', JSON.stringify(collection));
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleEditMovie = async (id) => {
      router.push({ name: 'formMovie', params: { id } });
    };

    const handleFilter = (query) => {
      router.push({ name: 'formFilter', query: { query } });
    };

    const handleDeleteMovie = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: 'Confirm',
          message: 'Would you like to remove this movie from your collection?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({ message: 'Movie removed', icon: 'check', color: 'positive' });
          await getMovies();
        });
      } catch (error) {
        $q.notify({ message: 'Error Movie delete', icon: 'times', color: 'negative' });
      }
    };

    onMounted(() => {
      getMovies();
    });

    return {
      movies,
      form,
      handleDeleteMovie,
      handleEditMovie,
      handleFilter,
    };
  },
});

</script>
