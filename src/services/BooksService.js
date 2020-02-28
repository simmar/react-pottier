const collection = [];
const commercialOffers = [];

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

  //return en fonction des urls (avec différents isbn) les offres
  static getDataOffers (productsIds) {
    const route = `/${productsIds}/commercialOffers`;

    return fetch (endPoint + route)
      .then (res => res.json ())
      .then (dataFromAPI => {
        commercialOffers.length = 0;
        commercialOffers.push (...dataFromAPI.offers);

        return commercialOffers;
      });
  }
}
