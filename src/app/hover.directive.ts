import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { reduce } from 'rxjs';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  @Input() appHover: string= 'pink';

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    console.log(this.element.nativeElement);
  }


  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;

    this.renderer.setStyle(
      this.element.nativeElement, 
      'backgroundColor', 
      this.appHover
    );


    // @HostListener('mouseenter')  onmouseenter()
      this.renderer.setStyle(
        this.element.nativeElement, 
        'backgroundColor', 
        'oceanblue'
      );
    

    // @HostListener('mouseenter')  onmouseleave()
      this.renderer.setStyle(
        this.element.nativeElement, 
        'backgroundColor', 
        'oceanblue'
      );
    

  }

}
