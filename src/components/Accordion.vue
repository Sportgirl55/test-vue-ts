<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="accordion__content">
    <div class="accordion__user-data">
      <div v-for="(header, index) in tableHeaders" :key="index">
        <div class="accordion__table-header">{{ header }}</div>
      </div>
      <div class="accordion__table-column">
        <div class="accordion__input-wrapper">
          <label class="accordion__input-label" for="street">Street</label>
          <input
            class="accordion__input"
            type="text"
            id="street"
            name="street"
            v-model="localUser.address.street"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="suite" class="accordion__input-label">Suite</label>
          <input
            class="accordion__input"
            type="text"
            id="suite"
            name="suite"
            v-model="localUser.address.suite"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="city" class="accordion__input-label">City</label>
          <input
            v-model="localUser.address.city"
            class="accordion__input"
            type="text"
            id="city"
            name="city"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="zipcode" class="accordion__input-label">Zipcode</label>
          <input
            v-model="localUser.address.zipcode"
            class="accordion__input"
            type="text"
            id="zipcode"
            name="zipcode"
          />
        </div>
      </div>
      <div class="accordion__table-column">
        <div class="accordion__input-wrapper">
          <label for="company" class="accordion__input-label">Name</label>
          <input
            v-model="localUser.company.name"
            class="accordion__input"
            type="text"
            id="company"
            name="company"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="catchPhrase" class="accordion__input-label">CatchPhrase</label>
          <input
            v-model="localUser.company.catchPhrase"
            class="accordion__input"
            type="text"
            id="catchPhrase"
            name="catchPhrase"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="bs" class="accordion__input-label">Bs</label>
          <input
            v-model="localUser.company.bs"
            class="accordion__input"
            type="text"
            id="bs"
            name="bs"
          />
        </div>
      </div>
      <div class="accordion__table-column">
        <div class="accordion__input-wrapper">
          <label for="name" class="accordion__input-label">Name</label>
          <input
            v-model="localUser.name"
            class="accordion__input"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="username" class="accordion__input-label">Username</label>
          <input
            v-model="localUser.username"
            class="accordion__input"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="email" class="accordion__input-label">Email</label>
          <input
            v-model="localUser.email"
            class="accordion__input"
            type="text"
            id="email"
            name="email"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="phone" class="accordion__input-label">Phone</label>
          <input
            v-model="localUser.phone"
            class="accordion__input"
            type="text"
            id="phone"
            name="phone"
          />
        </div>
        <div class="accordion__input-wrapper">
          <label for="website" class="accordion__input-label">Website</label>
          <input
            v-model="localUser.website"
            class="accordion__input"
            type="text"
            id="website"
            name="website"
          />
        </div>
      </div>
    </div>

    <button
      :id="`button-${user.id}`"
      class="accordion__alert-button"
      @click="showChangedData()"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/interfaces';

export default defineComponent({
  name: 'AccordionComponent',
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  data() {
    return {
      localUser: JSON.parse(JSON.stringify(this.user)) as User,
    };
  },
  computed: {
    tableHeaders(): string[] {
      return ['Address', 'Company', 'Basic info'];
    },
  },
  methods: {
    showChangedData(): void {
      const changedData = Object.keys(this.localUser).reduce((acc, key) => {
        if (key === 'address' || key === 'company') {
          Object.keys(this.localUser[key]).forEach((subKey) => {
            if (subKey !== 'geo' && this.localUser[key][subKey] !== this.user[key][subKey]) {
              acc[`${key}.${subKey}`] = this.localUser[key][subKey];
            }
          });
        } else if (
          (typeof this.localUser[key] !== 'object' && this.localUser[key] !== this.user[key])
          || (typeof this.localUser[key] === 'object'
            && typeof this.user[key] === 'object'
            && Object.keys(this.localUser[key]).some(
              (subKey) => this.localUser[key][subKey] !== this.user[key][subKey],
            ))
        ) {
          acc[key] = this.localUser[key];
        }
        return acc;
      }, {} as Record<string, unknown>);

      let output = '';
      Object.entries(changedData).forEach(([key, value]) => {
        output += `${key}: ${value}\n`;
      });

      output = output.slice(0, -2);

      if (output.length > 0) {
        alert(output);
      }
    },
  },
});
</script>
