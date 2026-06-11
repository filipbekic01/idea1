<template>
  <div>
    <template v-if="loggedIn">
      <p>Logged in as {{ user?.email }}</p>
      <button @click="onLogout">Logout</button>
    </template>
    <template v-else>
      <p>
        <NuxtLink to="/login">Login</NuxtLink>
        or
        <NuxtLink to="/register">Register</NuxtLink>
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()

async function onLogout() {
  await clear()
}
</script>
