import { Directive, OnChanges, SimpleChanges, Input, ElementRef} from '@angular/core';

@Directive({
  selector: '[DataBackgroundColor]'
})
export class DataBackGroundColorDirective implements OnChanges {

  ngOnChanges(changes: SimpleChanges){

      console.log(changes);

  }

}
