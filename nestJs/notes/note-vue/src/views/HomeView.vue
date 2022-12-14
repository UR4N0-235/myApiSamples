<script setup lang="ts">
import NoteItem from "@/components/NoteItem.vue";
</script>

<script lang="ts">
import api from "@/services/api";

export default {
  data() {
    return {
      notes: [],
    };
  },
  methods: {
    addNote() {
      console.log("add note");
    },
  },
  mounted() {
    api.get("/").then((response) => {
      console.log(response);
    });
  },
};
</script>

<template>
  <main>
    <span>{{ notes }}</span>
    <NoteItem />
  </main>
  <footer>
    <button @click="addNote">Add note</button>
  </footer>
</template>

<style>
.main {
}
footer {
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
}
footer button {
  color: green;
}
</style>
