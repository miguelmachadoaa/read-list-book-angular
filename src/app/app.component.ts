import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common'
import { BooksService } from './services/books.service';
import { LocalStorageService } from './services/local.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'books';
  books : any;
  term : string = 'programacion';
  reads: any = [];
  subjects = [];
  constructor(
    private booksService: BooksService, 
    private localStorageService: LocalStorageService
    ) {}

  ngOnInit() {

    this.reads = this.localStorageService.getItem('reads');

    // Llamada a la API con Axios
    axios.get('https://openlibrary.org/search.json?title=programacion')
      .then((response) => {
        this.books = response.data;
        this.subjects = this.books.docs.map((book: { subject: any; }) => {
          if(book.subject ){
            if(book.subject[0] !== undefined){
              return book.subject[0]
            }
          }
        }).filter((item:any) => item!=undefined);
        this.subjects = [...new Set(this.subjects)];
      })
      .catch((error) => {
        console.error(error);
      });
  }

  search(){
    axios.get('https://openlibrary.org/search.json?title='+this.term)
    .then((response) => {
      this.books = response.data;
      this.subjects = this.books.docs.map((book: { subject: any; }) => {
        if(book.subject ){
          if(book.subject[0] !== undefined){
            return book.subject[0]
          }
        }
      }).filter((item:any) => item!=undefined);
      this.subjects = [...new Set(this.subjects)];
    })
    .catch((error) => {
      console.error(error);
    });
  }

  searchTerm(term:string){
    this.term = term;
    this.search();
  }

  addToRead(item:any) {

    this.localStorageService.setItem('reads', item);
   // this.reads.push(item);
    this.reads = this.localStorageService.getItem('reads');
    console.log(this.reads);
  }

  delToRead(item:any, i:any) {

    this.localStorageService.removeItem('reads', i);
   // this.reads.push(item);
    this.reads = this.localStorageService.getItem('reads');
  }
}
