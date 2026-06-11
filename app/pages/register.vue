<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <p>
        <label>
          Email
          <input v-model="email" type="email" name="email" autocomplete="email" />
        </label>
      </p>
      <p>
        <label>
          Password
          <input v-model="password" type="password" name="password" autocomplete="new-password" />
        </label>
      </p>
      <p>
        <button type="submit" :disabled="loading">Register</button>
      </p>
    </form>
    <p v-if="error">{{ error }}</p>
    <p>
      Already have an account?
      <NuxtLink to="/login">Login</NuxtLink>
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
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await fetchSession()
    await navigateTo('/')
  } catch (e: any) {
    error.value = e?.data?.statusMessage ?? e?.statusMessage ?? 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
