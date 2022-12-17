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

        <label for="note">Nova nota</label>
        <button class="closseBtn"><span>x</span></button>
        <input name="note" type="text" v-model="newNote" />
        <button class="add" @click="addNote">
          <span>+</span>
        </button>
      </div>
    </div>

  </main>

  <footer>
    <button class="addNetNoteBtn" @click="addNote"><span>+</span></button>
  </footer>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh -120px);
}

.noteInputContainer {
  position: absolute;
  top: 20vh;
  left: 30vw;

  width: 50vw;
  background-color: whitesmoke;

  border-color: black;
  border: 5px;

  display: flex;
  justify-content: space-around;

}

footer {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100vw;
}

footer button {
  width: 50px;
  height: 50px;
  font-size: 50px;

  background-color: rgba(0, 0, 0, 0);
  border-color: black;
  color: green;
  border-radius: 10px;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addNetNoteBtn::selection {
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
}
</style>
