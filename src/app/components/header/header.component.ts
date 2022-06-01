import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  faSearch = faSearch;
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  search(event: Event) {
    //console.log('Teste');
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>{
      return moment.title.toLowerCase().includes(value);
    });
  }

}
