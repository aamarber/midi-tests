import notesProgression from './ASPNNotesProgression';

const getNotesMap = () => {
    let result = {};
    
    for(let i = 21; i < 108; i++){

        result[i] = notesProgression[i % 12] + Math.floor(i/12);
    }

    return result;
}

let NotesMap = getNotesMap();

export default NotesMap;