<template>
  <form @submit.prevent="createEvent">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>
    <h3>Name & describe you event</h3>
    <div class="field">
      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />
    </div>
    <div class="field">
      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />
    </div>

    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Add a location"
      />
    </div>

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker 
        v-model="event.date"
        placeholder="Select a date"
      />
    </div>
    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option> v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>

    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event).then(() => {
          this.$router.push({
            name: 'EventDetails', 
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(error =>
          console.log('There was a problem creating the event: ', error)
        );
    },
    createFreshEventObject() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 1000000);

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: null,
        time: '',
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
