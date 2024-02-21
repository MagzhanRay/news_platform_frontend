<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit news</h4>
      </div>
      <div class="card-body">
        <ul
          class="alert alert-warning"
          v-if="Object.keys(this.errorList).length > 0"
        >
          <li
            class="mb-0 ms-3"
            v-for="(error, index) in this.errorList"
            :key="index"
          >
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">Title</label>
          <input type="text" v-model="model.news.title" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Description</label>
          <input
            type="text"
            v-model="model.news.description"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Category</label>
          <input
            type="text"
            v-model="model.news.category_id"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button type="button" @click="updatenews" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "newsEdit",
  data() {
    return {
      newsId: "",
      errorList: "",
      model: {
        news: {
          title: "",
          description: "",
          category_id: "",
        },
      },
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.newsId = this.$route.params.id;
    this.getNewsData(this.$route.params.id);
  },
  methods: {
    getNewsData(newsId) {
      axios
        .get(`http://127.0.0.1:8000/api/news/${newsId}`)
        .then((res) => {
          console.log(res.data.message);
          this.model.news = res.data.message;
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },
    updatenews() {
      var mythis = this;
      axios
        .put(`http://127.0.0.1:8000/api/news/${this.newsId}`, this.model.news)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);

          this.errorList = "";
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors;
            }
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>
