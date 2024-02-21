import { RouterLink } from 'vue-router'; import { RouterLink } from
'vue-router';
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          News
          <RouterLink to="/news/create" class="btn btn-primary float-end">
            Add News
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="this.news.length > 0">
            <tr v-for="(news, index) in this.news" :key="index">
              <td>{{ news.id }}</td>
              <td>{{ news.title }}</td>
              <td>{{ news.description }}</td>
              <td>{{ news.category_id }}</td>
              <td>
                <RouterLink
                  :to="{ path: '/news/' + news.id + '/edit' }"
                  class="btn btn-success mx-2"
                >
                  Edit
                </RouterLink>
                <button
                  type="button"
                  @click="deleteNews(news.id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "news",
  data() {
    return {
      news: [],
    };
  },
  mounted() {
    this.getNews();
    // console.log("im here");
  },
  methods: {
    getNews() {
      axios.get("http://127.0.0.1:8000/api/news").then((res) => {
        this.news = res.data.message;
        // console.log(this.news);
      });
    },

    deleteNews(newsId) {
      if (confirm("Are you sure, you want to delete this data?")) {
        // console.log(newsId);
        axios.delete(`http://127.0.0.1:8000/api/news/${newsId}`).then((res) => {
          alert(res.data.message);
          this.getNews();
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
      }
    },
  },
};
</script>
