import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, keyword: string): string {
    console.log(keyword);
    if (!keyword) {
      return value;
    }

    const regex = new RegExp(keyword, 'gi');
    return value.replace(regex, `<span class="highlighted">$&</span>`);
  }
}
