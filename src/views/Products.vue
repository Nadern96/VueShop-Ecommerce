<template>
  <div class="Products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <h3>Basic CRUD (create/read/update/delete) in Firebase and Vue</h3>
      <div class="product-test">
        <div class="form-group">
          <input
            type="text"
            placeholder="Product Name"
            v-model="product.name"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Price"
            v-model="product.price"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <button @click="saveData" class="btn btn-primary">Save Data</button>
        </div>
        <hr />

        <h3>Products list</h3>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.data().name }}</td>
                <td>{{ product.data().price }}</td>
                <td>
                  <button @click="editProduct(product)" class="btn btn-primary">
                    Edit
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Price"
                v-model="product.price"
                class="form-control"
              />
            </div>
            <hr />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import $ from "jquery";

export default {
  name: "Products",

  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
      },
      active_item: null,
    };
  },
  methods: {
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          this.products.push(doc);
        });
      });
      
      // this.readData(); another way (my way)
    },
    updateProduct() {
      db.collection("products")
        .doc(this.active_item)
        .update(this.product)
        .then(() => {
          $("#editModal").modal("hide");
          this.watcher();
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    editProduct(product) {
      $("#editModal").modal("show");
      this.product = product.data();
      this.active_item = product.id;
    },
    deleteProduct(docID) {
      if (confirm("Are you sure ?")) {
        db.collection("products")
          .doc(docID)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    },
    readData() {
      this.reset();
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            this.products.push(doc);
          });
        });
    },
    saveData() {
      // Add a new document in collection "cities"
      db.collection("products")
        .add(this.product)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
  },
  created() {
    this.readData();
  },
};
</script>
<style scoped lang="scss"></style>
