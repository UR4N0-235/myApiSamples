<script setup lang="ts">
import NoteItem from "@/components/NoteItem.vue";
</script>

<script lang="ts">
import api from "@/services/api";

export default {
  data() {
    return {
      newNote: ``,
      notes: [],
    };
  },
  methods: {
    addNote() {
      console.log("add note " + this.newNote);
      api.post("/notes", {
        body: this.newNote,
      }).then((response) => {
        console.log("response is " + JSON.stringify(response, null, 4));
      });
    },
    getNotes() {
      api.get("/notes").then((response) => {
        console.log("notes is " + JSON.stringify(response, null, 4));
        this.notes = response.data;
      });
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<template>
  <main>
    <div class="notesContainer">
      <div class="noteItem" v-for="note in notes">
        <NoteItem />
      </div>
    </div>
    <div class="noteInputContainer">
      <div>
        <label for="note">Insira uma notinha</label>
        <input name="note" type="text" v-model="newNote" />
        <button class="add" @click="addNote">+</button>
      </div>
    </div>
  </main>

  <footer>
    <button class="add" @click="addNote">+</button>
  </footer>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh -120px);
}
footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100vw;
}
footer button {
  color: green;
  width: 100px;
  height: 100px;
  font-size: 30px;
}
</style>
