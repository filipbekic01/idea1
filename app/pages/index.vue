<template>
  <section class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Welcome to Digi
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        A simple starting point for your next idea. Fast, modern, and ready to build on.
      </p>
      <div class="mt-10 flex items-center justify-center gap-4">
        <template v-if="loggedIn">
          <span class="text-gray-700">Signed in as {{ user?.email }}</span>
          <button
            class="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            @click="onLogout"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/register"
            class="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Get started
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="rounded-md px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:text-gray-600"
          >
            Login <span aria-hidden="true">→</span>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()

async function onLogout() {
  await clear()
}
</script>
