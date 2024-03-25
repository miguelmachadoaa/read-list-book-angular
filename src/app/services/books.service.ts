import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  async  getBooks() {
    await axios.get('https://openlibrary.org/search.json?title=programacion')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

      return []
  }


}
