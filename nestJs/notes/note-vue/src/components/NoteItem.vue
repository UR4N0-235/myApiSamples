<script setup></script>

<script lang="ts">
export default {
  props: {
    note: {
      note: String,
    },
  },
  data() {
    return {
      latest: true,
    };
  },
  methods: {
    deleteNote() {
      this.latest = false;
    },
    addNote() {
      this.latest = true;
    },
  },
  mounted(){
    console.log("NOTE INSEREDEEEE " + this.note.note);
  }
};
</script>

<template>
  <div class="noteItem">
    <div class="noteHeader">
      <button @click="deleteNote">X</button>
    </div>
    <div class="noteMain">
      <span>note body {{ latest }}</span>
    </div>
    <div class="noteFooter">
      <button @click="addNote">+</button>
    </div>
  </div>
</template>

<style>
.noteItem {
  border-color: red;
}
</style>
