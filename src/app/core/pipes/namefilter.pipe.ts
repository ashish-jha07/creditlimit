

import {PipeTransform,Pipe} from '@angular/core'



@Pipe({
    name: 'split'
  })
  export class SplitPipe implements PipeTransform {
    data :any  = []
    transform(val:string):any {
        this.data = val.split("/");

       return  this.data[this.data?.length-1]
    }
  }