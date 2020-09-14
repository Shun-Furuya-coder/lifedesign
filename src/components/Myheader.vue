<template>
  <header>
    <div class="left-header">
      <router-link to="/">Life Design</router-link>
    </div>
    <div class="right-header">
      <router-link to="/profile" class="profile">Profile</router-link>
      <router-link to="/users">Users</router-link>
    </div>
  </header>
</template>

<style lang="scss">
header {
  background-color: rgb(59, 177, 255);
  padding: 10px;
  height: 50px;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  .left-header {
    padding-left: 30px;
  }
  .right-header {
    padding-right: 30px;
    .profile {
      padding: 20px;
    }
  }

  a {
    color: white;
    font-size: 20px;
    text-decoration: none;
    line-height: 50px;
  }
}
</style>
