const products = [
  {
    name: 'Strawberry Cupcake',
    image: '/images/01.jpeg',
    description:
      'Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake Strawberry Cupcake ',
    category: 'Cupcakes',
    price: 10.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Chocolate Peach Cream Cupcake',
    image: '/images/02.jpeg',
    description:
      'Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake Chocolate Peach Cream Cupcake ',
    category: 'Cupcakes',
    price: 10.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Chocolate Powder Coffee Layercake',
    image: '/images/03.jpeg',
    description:
      'Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake Chocolate Powder Coffee Layercake ',
    category: 'Cakes',
    price: 30.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Caramel Meringue Pie',
    image: '/images/04.jpeg',
    description:
      'Caramel Meringue Pie Caramel Meringue Pie Caramel Meringue Pie Caramel Meringue Pie Caramel Meringue Pie ',
    category: 'Pies',
    price: 20.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Stripe Apple Pie',
    image: '/images/05.jpeg',
    description:
      'Stripe Apple Pie Stripe Apple PieStripe Apple PieStripe Apple PieStripe Apple PieStripe Apple Pie',
    category: 'Pies',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Blackberry Vanilla Cake',
    image: '/images/06.jpeg',
    description:
      'Blackberry Vanilla Cake Blackberry Vanilla Cake Blackberry Vanilla Cake Blackberry Vanilla Cake Blackberry Vanilla Cake Blackberry Vanilla Cake ',
    category: 'Cakes',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },{
    name: 'Thousand Layer Chocolate Cake',
    image: '/images/07.jpeg',
    description:
      'Thousand Layer Chocolate Cake Thousand Layer Chocolate Cake Thousand Layer Chocolate Cake Thousand Layer Chocolate Cake ',
    category: 'Cakes',
    price: 39.99,
    countInStock: 0,
    rating: 4,
    numReviews: 100,
  },{
    name: 'Strawberry Topped Vanilla Cupcake',
    image: '/images/08.jpeg',
    description:
      'Strawberry Topped Vanilla Cupcake Strawberry Topped Vanilla Cupcake Strawberry Topped Vanilla Cupcake',
    category: 'Cupcakes',
    price:9.99,
    countInStock: 0,
    rating: 4,
    numReviews: 10,
  },{
    name: 'Macaroon Topped Strawberry Cake',
    image: '/images/09.jpeg',
    description:
      'Macaroon Topped Strawberry Cake Macaroon Topped Strawberry Cake Macaroon Topped Strawberry Cake Macaroon Topped Strawberry Cake',
    category: 'Cakes',
    price:9.99,
    countInStock: 2,
    rating: 4,
    numReviews: 12,
  },{
    name: 'Chocolate Nut Cake',
    image: '/images/010.jpeg',
    description:
      'Chocolate Nut Cake Chocolate Nut Cake Chocolate Nut Cake',
    category: 'Cakes',
    price:39.99,
    countInStock: 2,
    rating: 4,
    numReviews: 9,
  },{
    name: 'Chocolate Coffee Vanilla Chess Cake',
    image: '/images/011.jpeg',
    description:
      'Chocolate Coffee Vanilla Chess Cake Chocolate Coffee Vanilla Chess Cake Chocolate Coffee Vanilla Chess Cake Chocolate Coffee Vanilla Chess Cake Chocolate Coffee Vanilla Chess Cake Chocolate Coffee Vanilla Chess Cake',
    category: 'Cakes',
    price:59.99,
    countInStock: 2,
    rating: 4,
    numReviews: 5,
  },{
    name: 'Oero Cupcake',
    image: '/images/012.jpeg',
    description:
      'Oero Cupcake Oero Cupcake Oero Cupcake Oero Cupcake',
    category: 'Cupcakes',
    price:9.99,
    countInStock: 0,
    rating: 2.5,
    numReviews: 3,
  },{
    name: 'Lemon Meringue Pie',
    image: '/images/013.jpeg',
    description:
      'Lemon Meringue Pie Lemon Meringue Pie Lemon Meringue Pie Lemon Meringue Pie Lemon Meringue Pie Lemon Meringue Pie',
    category: 'Pies',
    price:9.99,
    countInStock: 2,
    rating: 3.5,
    numReviews: 30,
  },{
    name: 'Triple Chocolate Cake',
    image: '/images/014.jpeg',
    description:
      'Triple Chocolate Cake Triple Chocolate Cake Triple Chocolate Cake Triple Chocolate Cake Triple Chocolate Cake Triple Chocolate Cake',
    category: 'Cakes',
    price:9.99,
    countInStock: 2,
    rating: 3.5,
    numReviews: 9,
  },{
    name: 'Apple Pie',
    image: '/images/015.jpeg',
    description:
      'Apple Pie Apple Pie Apple Pie Apple Pie',
    category: 'Pies',
    price:19.99,
    countInStock: 2,
    rating: 4.5,
    numReviews: 24,
  },{
    name: 'Pumpkin Pie',
    image: '/images/016.jpeg',
    description:
      'Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie Pumpkin Pie',
    category: 'Pies',
    price:19.99,
    countInStock: 12,
    rating: 2,
    numReviews: 14,
  }
]

export default products
