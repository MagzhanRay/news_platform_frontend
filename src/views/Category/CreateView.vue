<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Category</h4>
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
          <label for="">Name</label>
          <input
            type="text"
            v-model="model.category.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button type="button" @click="saveCategory" class="btn btn-primary">
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
  name: "categoryCreate",
  data() {
    return {
      errorList: "",
      model: {
        category: {
          name: "",
        },
      },
    };
  },
  methods: {
    saveCategory() {
      var mythis = this;
      axios
        .post("http://127.0.0.1:8000/api/categories", this.model.category)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);

          this.model.category = {
            name: "",
          };
          this.errorList = "";
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 422) {
              mythis.errorList = error.response.data.errors;
            }
            // console.log(error.responce.data);
            // console.log(error.responce.status);
            // console.log(error.responce.headers);
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
