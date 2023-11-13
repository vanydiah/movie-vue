<!-- eslint-disable max-len -->
<template>
  <q-page padding>
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
              <q-btn label="Add to My Collection" icon="add" color="info" dense size="sm" @click="handleAddMovie(movie)" />
            </q-card-actions>
        </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const movies = ref([]);
    const $router = useRouter();
    const $route = useRoute();
    const $q = useQuasar();

    const getMovies = async () => {
      try {
        const { query } = $route.query;
        const { data } = await api.get(`/search/movie?query=${query}&api_key=${process.env.TOKEN}`);
        movies.value = data.results;
      } catch (error) {
        $q.notify({ message: 'Error Movie not found', icon: 'times', color: 'negative' });
      }
    };

    const handleAddMovie = (movie) => {
      const myCollection = JSON.parse(localStorage.getItem('my_collection'));
      const movieArr = (myCollection && myCollection.length > 0) ? myCollection : [];
      if (movieArr.some((saved) => movie.id === saved.id)) {
        $q.notify({ message: 'This movie is already added to collection', icon: 'close', color: 'negative' });
      } else {
        movieArr.push(movie);
        localStorage.setItem('my_collection', JSON.stringify(movieArr));
        $q.notify({ message: 'Successfully added to collection', icon: 'check', color: 'positive' });
      }
    };

    onMounted(() => {
      getMovies();
    });

    return {
      movies,
      handleAddMovie,
    };
  },
});

</script>
