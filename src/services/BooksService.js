const collection = [];

const endPoint = 'http://henri-potier.xebia.fr/books';

export class BookService {
  static getData () {
    // return Promise.resolve(mockData);
    return fetch (endPoint).then (res => res.json ()).then (dataFromAPI => {
      collection.length = 0;
      collection.push (...dataFromAPI);

      return collection;
    });
  }
}
