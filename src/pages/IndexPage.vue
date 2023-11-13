<!-- eslint-disable max-len -->
<template>
  <div class="q-pa-md">
    <q-form @submit="handleFilter(form.query)" class="row q-col-gutter-sm justify-center align-center q-mb-md">
      <div class="row align-center col-md-6">
        <q-input filled v-model="form.query" label="Search by movie title..." style="width: 100%" />
      </div>
      <div class="row align-center col-md-1">
        <q-btn icon="search" type="submit" color="primary" />
      </div>
    </q-form>

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start justify-center">
        <div class="col-md-2 col-sm-5" v-for="movie in movies" :key="movie.id" :item ="movie">
          <q-card flat bordered class="my-card" @click="handleViewMovie(movie)" style="cursor: pointer;">
            <q-img :src="`https://image.tmdb.org/t/p/w200`+movie.poster_path">
              <div class="absolute-bottom">
                <div class="text-subtitle2"><b>{{ movie.title }}</b></div>
                <div class="row justify-between">
                  <div class="text-subtitle4">{{ movie.release_date.substring(0, 4) }}</div>
                  <div class="text-subtitle4">&#9734; {{ parseFloat(movie.vote_average).toFixed(1) }}</div>
                </div>
              </div>
            </q-img>
            <q-card-actions class="row justify-center">
              <q-btn label="Add to My Collection" icon="add" color="info" dense size="sm" @click="handleAddMovie(movie)" />
            </q-card-actions>
        </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="moviedialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- <q-table title="Users" :rows="movies" :columns="columns" row-key="title">
      <template v-slot:top>
        <q-space />
        <q-btn color="primary" label="Add Movie" :to="{ name: 'formUser' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditUser(props.row.id)" />
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeleteUser(props.row.id)" />
        </q-td>
      </template>
    </q-table> -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const pages = ref(1);
    const movies = ref([]);
    const moviedialog = ref(false);
    const form = ref({
      field: '',
      query: '',
    });
    const columns = [
      {
        name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left',
      }, {
        name: 'title', field: 'title', label: 'Title', sortable: true, align: 'left',
      }, {
        name: 'overview', field: 'overview', label: 'Summary', sortable: true, align: 'left',
      }, {
        name: 'actions', field: 'actions', label: 'Actions', align: 'right',
      },
    ];
    const selectOptions = [
      'id', 'title', 'overview',
    ];
    const $q = useQuasar();
    const router = useRouter();

    const getMovies = async () => {
      try {
        const { data } = await api.get(`movie/now_playing?api_key=${process.env.TOKEN}&page=1`);
        movies.value = data.results;
        pages.value = data.total_pages;
      } catch (error) {
        throw new Error(error);
      }
    };

    const handleViewMovie = (movie) => {
      moviedialog.value = true;
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

    // eslint-disable-next-line consistent-return
    const handleFilter = (query) => {
      router.push({ name: 'formFilter', query: { query } });
    };

    onMounted(() => {
      getMovies();
    });

    return {
      columns,
      movies,
      moviedialog,
      form,
      selectOptions,
      handleFilter,
      handleAddMovie,
    };
  },
});

</script>
