import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(values: string, filterString: string, propName: string): any {
    if (values.length === 0 || filterString === '') {
      return values;
    }

    const result = [];

    for (const value of values) {

      if (value[propName] === filterString) {
        result.push(value);
      }
    }

    console.log(result);
    return result;
  }
}
