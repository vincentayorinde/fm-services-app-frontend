import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allUsersSearch'
})
export class AllUsersSearchPipe implements PipeTransform {

  transform(array: any[], text: string): any[] {
    if(text === ''){
      return array;
    }
    text = text.toLowerCase();
    return array.filter( item => {
      return item.name.toLowerCase().includes( text )
    })
  }

}
