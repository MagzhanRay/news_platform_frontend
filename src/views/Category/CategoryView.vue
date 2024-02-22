import { RouterLink } from 'vue-router'; import { RouterLink } from
'vue-router';
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Category
          <RouterLink to="/category/create" class="btn btn-primary float-end">
            Add category
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="this.categories.length > 0">
            <tr v-for="(category, index) in this.categories" :key="index">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <RouterLink
                  :to="{ path: '/category/' + category.id + '/edit' }"
                  class="btn btn-success"
                  >Edit</RouterLink
                >
                <button
                  type="button"
                  @click="deleteCategory(category.id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">Loading...</td>
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
  name: "categories",
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.getCategories();
    // console.log("im here");
  },
  methods: {
    getCategories() {
      axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
        this.categories = res.data.message;
        // console.log(this.categories);
      });
    },
    deleteCategory(categoryId) {
      if (confirm("Are you sure, you want to delete this data")) {
        // console.log(categoryId);
        axios
          .delete(`http://127.0.0.1:8000/api/categories/${categoryId}`)
          .then((res) => {
            alert(res.data.message);
            this.getCategories();
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
