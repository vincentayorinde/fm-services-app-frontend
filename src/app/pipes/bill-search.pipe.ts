import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billSearch'
})
export class BillSearchPipe implements PipeTransform {

  transform(array: any[], text: string): any[] {
    if(text === ''){
      return array;
    }
    text = text.toLowerCase();
    return array.filter( item => {
      return item.service_type.toLowerCase().includes( text )
    })
  }

}
