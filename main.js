class Note {
    constructor(id, content){
        this.id = id;
        this.content = content;
    }
}


class UI{
    /*static showNotes(){
        let notes = Datos.getNotes();
        notes.forEach( (note, index) => {
            const NoteElement = UI.addNoteElement(note.id, note.content);
            document.getElementById('app').insertBefore(NoteElement, document.querySelector('.add-note'))
        })
    }*/

    static addNote(){
        const notes = Datos.getNotes();
        const noteObject = {
            id: Math.floor(Math.random()*100000), 
            content: ''
        }

        const noteElement = UI.addNoteElement(noteObject.id, noteObject.content);
        const container = document.getElementById('app');
        const btn = document.querySelector('.add-note');
        container.insertBefore(noteElement, btn)

        notes.push(noteObject);
        Datos.saveNotes(notes);
    }

    static addNoteElement(id, content){
        const textarea = document.createElement('textarea');
        textarea.className = 'note'; //textarea.classList.add('note');
        textarea.value = content;

        textarea.addEventListener('change', () => {
            UI.update(id, textarea.value);
        })

        textarea.addEventListener("dblclick", () => {
            const doDelete = confirm(
              "Are you sure you wish to delete this sticky note?"
            );
        
            if (doDelete) {
              deleteNote(id, textarea);
            }
          });

        return textarea;

    }

    static update(id, newContent){
        const notes = Datos.getNotes();
        const targetNote = notes.filter((note) => note.id == id)[0];
      
        targetNote.content = newContent;
        Datos.saveNotes(notes);
    }
 

}

class Datos {
    static getNotes(){
        let notes;
        const data = localStorage.getItem('notes');
        if(!data){
            notes = [];
        }else{
            notes = JSON.parse(data);
        }
        return notes
    }

    static saveNotes(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
      }
}


//Métodos
function deleteNote(id, element) {
    const notes = Datos.getNotes().filter((note) => note.id != id);

    Datos.saveNotes(notes);
    document.getElementById('app').removeChild(element);

}


//Método para mostrar notas
Datos.getNotes().forEach( (note, index) => {
    const NoteElement = UI.addNoteElement(note.id, note.content);
    document.getElementById('app').insertBefore(NoteElement, document.querySelector('.add-note'))
})

//document.addEventListener('DOMContentLoaded', UI.showNotes())

//EVentos
const btn = document.querySelector('.add-note');
btn.addEventListener('click', () => {
    UI.addNote();
    UI.showNotes();
})


