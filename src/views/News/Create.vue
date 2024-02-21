<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add news</h4>
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
          <button type="button" @click="savenews" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "newsCreate",
  data() {
    return {
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
  methods: {
    savenews() {
      var mythis = this;
      axios
        .post("http://127.0.0.1:8000/api/news", this.model.news)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);

          this.model.news = {
            title: "",
            description: "",
            category_id: "",
          };

          this.errorList = "";
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors;
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
