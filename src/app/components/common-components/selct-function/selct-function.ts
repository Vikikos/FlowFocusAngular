import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component,Output,EventEmitter,  } from '@angular/core';

@Component({
  selector: 'selct-function',
  imports: [],
  templateUrl: './selct-function.html',
  styleUrl: './selct-function.css',
})
export class SelctFunction {
  @Output() functionSend = new EventEmitter<string>();

  sendFunciton( func :string  ): void{
    this.functionSend.emit(func)
  }
}

