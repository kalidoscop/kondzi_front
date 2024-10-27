import { Component, Input, OnInit } from '@angular/core';


interface CarouselImage {
  imageSrc:string,
  imageAlt:string,
  text:string
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent implements OnInit {

  @Input() images : CarouselImage[]=[]


  selectedIndex =0

  ngOnInit(): void {
    console.log(this.images);
    
    setInterval(()=>{
      this.deroule()
      // console.log(this.selectedIndex);
      
    },4000)
    
    // throw new Error('Method not implemented.');
  }

  deroule(){
    console.log(this.selectedIndex);
    
    if (this.selectedIndex === this.images.length-1) {
      this.selectedIndex=0
    }else{

      this.selectedIndex+=1
    }
  }

}
