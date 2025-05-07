<template>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{ title }}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home
            <span class="visually-hidden">(current)</span>
        </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/add-contact">Add Contact </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/contact-detail/:id">Contact Detail </router-link>
        </li> -->
      </ul>
      <form class="d-flex search-form">
        <div class="input-group">
          <input class="form-control search-input" type="search" placeholder="Search..." aria-label="Search">
          <button class="btn btn-outline-light search-btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'AppHeader',
    props: {
        title: {
            type: String,
            required: true
        }
    }

}
</script>

<style scoped>
.search-form {
  min-width: 300px;
}

.search-input {
  border-radius: 20px 0 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 15px;
  transition: all 0.3s ease;
}

.search-input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: none;
  color: white;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-btn {
  border-radius: 0 20px 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 15px;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>

