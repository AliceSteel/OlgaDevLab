<template>
  <section id="contact" class="w-full px-0 py-32 pb-26 font-medium">
    <h2 class="px-[15%] text-2xl leading-none pt-12">Let's chat!</h2>
    <p class="px-[15%] pb-12 text-2xl leading-none">hello@olgadevlab.com or drop a message here:</p>
    <form
      id="contact_form"
      class="relative flex w-full flex-col items-start justify-around border-t border-black/80"
      @submit.prevent="checkAndSend"
      novalidate="true"
    >
      <div class="form-field relative h-30 w-full border-b border-black/80">
        <input
          v-model.trim="name"
          @focus="resetError('name')"
          class="form-input"
          type="text"
          placeholder=" "
          name="name"
        />
        <label class="floating-label"><sup>(1) </sup>Name</label>
        <div v-if="errors.name.length" class="error-message">
          {{ errors.name }}
        </div>
      </div>

      <div class="form-field relative h-30 w-full border-b border-black/80">
        <input
          v-model.trim="email"
          @focus="resetError('email')"
          class="form-input"
          type="email"
          placeholder=" "
          name="email"
        />
        <label class="floating-label"><sup>(2) </sup>Email</label>
        <div v-if="errors.email" class="error-message">
          {{ errors.email }}
        </div>
      </div>

      <div class="form-field relative h-60 w-full border-b border-black/80">
        <textarea
          v-model.trim="message"
          rows="2"
          @focus="resetError('message')"
          class="form-input"
          type="text"
          name="message"
          placeholder=" "
        ></textarea>
        <label class="floating-label"><sup>(3) </sup>Message</label>
        <div
          v-if="errors.message.length"
          class="absolute left-0 top-full z-10 w-full border-t-2 border-red-500 pl-[30%] text-left text-base leading-6 text-red-500"
        >
          {{ errors.message }}
        </div>
      </div>

      <button
        id="form_btn"
        type="submit"
        class="relative flex w-full items-start justify-start border-b border-black/80 bg-white px-[15%] py-6 text-left text-[clamp(3rem,4.5vw,4.5rem)] leading-none capitalize text-black transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white"
      >
        <span><sup>(4) </sup>Submit</span>
      </button>
      <div
        v-if="answer.text"
        :class="
          answer.success
            ? 'absolute left-[20%] top-full text-left text-2xl text-green-600'
            : 'absolute left-0 top-full z-10 w-full border-t-2 border-red-500 pl-[30%] text-left text-base leading-6 text-red-500'
        "
      >
        {{ answer.text }}
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'

const name = ref('')
const email = ref('')
const message = ref('')

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const answer = reactive<{
  success: boolean
  text: string
}>({
  success: false,
  text: '',
})

let answerTimer: ReturnType<typeof setTimeout> | undefined

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const resetError = (field: keyof typeof errors) => {
  errors[field] = ''
}

const checkAndSend = async () => {
  let valid = true

  if (!name.value || name.value.length <= 1) {
    errors.name = 'Name longer than 1 letter is required.'
    valid = false
  }

  if (!email.value) {
    errors.email = 'Email is required.'
    valid = false
  } else if (!isValidEmail(email.value)) {
    errors.email = 'Valid email is required.'
    valid = false
  }

  if (!message.value || message.value.length < 2) {
    errors.message = 'Message longer than 2 characters is required.'
    valid = false
  }

  if (!valid) return

  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: name.value,
        reply_to: email.value,
        message: message.value,
      },
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      },
    )

    if (response.status === 200) {
      answer.success = true
      answer.text = 'Message successfully sent'

      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      answer.success = false
      answer.text = response.text || 'Failed to send'
    }
  } catch (error) {
    console.error(error)
    answer.success = false
    answer.text = 'Send error. Please try again later'
  }

  if (answerTimer) {
    clearTimeout(answerTimer)
  }

  answerTimer = setTimeout(() => {
    answer.success = false
    answer.text = ''
  }, 5000)
}

onUnmounted(() => {
  if (answerTimer) {
    clearTimeout(answerTimer)
  }
})
</script>

<style scoped>
@reference "../assets/main.css";
sup {
  font-size: 1rem;
  vertical-align: super;
  top: 0;
  margin-right: 1rem;
}

.form-input {
  @apply h-full w-full rounded-none border-0 px-[15%] py-6
    text-[clamp(3rem,4.5vw,4.5rem)] leading-none outline-none
    focus:ring-0;
}

.floating-label {
  @apply pointer-events-none absolute left-0 top-0 w-full px-[15%] py-6
    text-[clamp(3rem,4.5vw,4.5rem)] leading-none capitalize
    transition-all duration-200;
}

.form-field:has(input:focus) .floating-label,
.form-field:has(textarea:focus) .floating-label,
.form-field:has(input:not(:placeholder-shown)) .floating-label,
.form-field:has(textarea:not(:placeholder-shown)) .floating-label {
  @apply -top-6 text-[1.9rem];
}

.error-message {
  @apply absolute left-0 top-full z-10 w-full border-t-2 border-red-500
    pl-[30%] text-left text-base leading-6 text-red-500;
}

sup {
  @apply mr-4 align-super text-base;
}
</style>
