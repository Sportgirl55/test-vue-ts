<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="container">
    <div class="title">
      <span>Users</span>
    </div>
    <div class="divider"></div>
    <div class="accordion">
      <div class="accordion__header">
        <span></span>
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Website</span>
      </div>
      <div v-for="(user, index) in users" :key="index">
        <div class="accordion__item" @click="toggleAccordion(index)">
          <div class="accordion__header">
            <div class="accordion__toggle-icon">
              <i
                class="accordion__toggle-icon-arrow fa"
                :class="{ 'fa-chevron-up': isOpen === index, 'fa-chevron-down': isOpen !== index }"
              ></i>
            </div>
            <span>{{ user.name }}</span>
            <span>{{ user.email }}</span>
            <span>{{ user.phone }}</span>
            <span>{{ user.website }}</span>
          </div>
        </div>
        <Accordion :user="users[index]" v-if="isOpen === index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/interfaces';
import Accordion from '@/components/Accordion.vue';

export default defineComponent({
  components: {
    Accordion,
  },
  data() {
    return {
      isOpen: null as number | null,
      users: [] as User[],
    };
  },
  async created() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      this.users = data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    toggleAccordion(index: number): void {
      this.isOpen = this.isOpen === index ? null : index;
    },
  },
});
</script>
