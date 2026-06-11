<template>
  <section class="flex min-h-screen items-center justify-center bg-gray-50 px-6">
    <div class="w-full max-w-sm">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900">
        Register
      </h1>
      <form
        class="mt-8 space-y-5"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            autocomplete="new-password"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ loading ? 'Creating account…' : 'Register' }}
        </button>
      </form>
      <p
        v-if="error"
        class="mt-4 text-center text-sm text-red-600"
      >
        {{ error }}
      </p>
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-semibold text-gray-900 hover:text-gray-600"
        >
          Login
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const { fetch: fetchSession } = useUserSession()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await fetchSession()
    await navigateTo('/')
  }
  catch (e) {
    const err = e as { data?: { statusMessage?: string }, statusMessage?: string }
    error.value = err?.data?.statusMessage ?? err?.statusMessage ?? 'Registration failed'
  }
  finally {
    loading.value = false
  }
}
</script>
