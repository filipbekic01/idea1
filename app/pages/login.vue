<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <p>
        <label>
          Email
          <input
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
          >
        </label>
      </p>
      <p>
        <label>
          Password
          <input
            v-model="password"
            type="password"
            name="password"
            autocomplete="current-password"
          >
        </label>
      </p>
      <p>
        <button
          type="submit"
          :disabled="loading"
        >
          Login
        </button>
      </p>
    </form>
    <p v-if="error">
      {{ error }}
    </p>
    <p>
      No account?
      <NuxtLink to="/register">Register</NuxtLink>
    </p>
  </div>
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
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await fetchSession()
    await navigateTo('/')
  }
  catch (e) {
    const err = e as { data?: { statusMessage?: string }, statusMessage?: string }
    error.value = err?.data?.statusMessage ?? err?.statusMessage ?? 'Login failed'
  }
  finally {
    loading.value = false
  }
}
</script>
