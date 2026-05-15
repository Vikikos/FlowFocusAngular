import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../components/note/interfaces/note';

@Pipe({
  name: 'noteFilter',
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: INote[], filterBy: string): INote[] {
    if (!notes) return [];

    if (!filterBy) return notes;

    const filter = filterBy.toLocaleLowerCase();

    return notes.filter((note) => {
        // 3. Verificamos ambos campos convirtiéndolos a minúsculas
        // Usamos el operador ?. por si alguno de los campos llegara a ser undefined
        const nameMatch = note.title?.toLocaleLowerCase().includes(filter);
        const contentMatch = note.content?.toLocaleLowerCase().includes(filter);

        // Si cualquiera de los dos coincide, la nota pasa el filtro
        return nameMatch || contentMatch;
    });
  }


}
