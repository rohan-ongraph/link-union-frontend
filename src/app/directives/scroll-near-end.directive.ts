import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollNearEnd]'
})
export class ScrollNearEndDirective implements OnInit {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Threshold in pixels when to emit before reaching the end of scroll
   */
  @Input() threshold = 120;

  @Input() hasMoreData = true;

  private window!: Window;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Save window object for type safety
    this.window = window;
  }

  @HostListener('window:scroll', ['$event.target'])
  windowScrollEvent(event: KeyboardEvent) {

    if(!this.hasMoreData){
      return
    }
    // Height of the whole window page
    const heightOfWholePage = this.window.document.documentElement.scrollHeight;

    // Height of the element
    const heightOfElement = this.el.nativeElement.scrollHeight;

    // Currently scrolled Y position
    const currentScrolledY = this.window.scrollY;

    // Height of the opened window (viewport)
    const innerHeight = this.window.innerHeight;

    /**
     * The area between the start of the page and when this element is visible
     * in the parent component
     */
    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

    // Calculate whether we are near the end
    const scrollToBottom =
      heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    // If the user is near the end
    if (scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }
}
