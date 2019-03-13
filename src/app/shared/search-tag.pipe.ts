
    import {Pipe, PipeTransform} from '@angular/core';
 
    @Pipe({name: 'searchTag'})
    export class SearchTagPipe implements PipeTransform {
      transform(categories: any, searchText: any): any {
         if (searchText == null) return categories;

        return categories.filter(function(searchTag) {
          return searchTag.tags.toLowerCase().indexOf(searchText) > -1;
        });
      }
    }