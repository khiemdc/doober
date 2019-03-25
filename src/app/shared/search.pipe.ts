
    import {Pipe, PipeTransform} from '@angular/core';
 
    @Pipe({name: 'filter'})
    export class SearchPipe implements PipeTransform {
      transform(files: any[], searchText: any): any[] {
        if (!files) { return []; }
         if (!searchText) { return files; }

        searchText = searchText.toLowerCase();
        return files.filter ( it => {
            return it.name.toLowerCase().includes(searchText);
          });
      }
    }
