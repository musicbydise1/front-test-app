# E-commerce test project by Aksultan Yessenbay

## Description

This project is a simple product listing and shopping cart application. Users can browse products, search, sort by various criteria, add items to their cart, and view a summary of their selected items.

## Features

### 1. Product Listing
- Displays a list of products with details including title, description, price, rating, and an image.
- Users can view products in a grid layout and easily browse through the available items.

### 2. Search Functionality
- Allows users to search for products by title using a search input.
- The product list dynamically updates to show only the products that match the search query.

### 3. Sorting Options
- Provides sorting options to sort products by price (ascending/descending) or rating (ascending/descending).
- Users can easily find products based on their preferences.

### 4. Add to Cart
- Users can add products to their shopping cart by clicking the "Add to Cart" button.
- The cart displays the total number of items and the total amount in the footer.

### 5. Load More Products
- Implements a "Load More" button that allows users to load additional products in increments.
- The button disappears when all products have been loaded.

### 6. Cart Summary
- Displays a summary of items in the cart, including the last added item and its quantity.
- The summary is updated in real-time as items are added to the cart.

### 7. Testing
- Unit tests are implemented using Jest and React Testing Library to verify the functionality of key features, such as rendering products, filtering, sorting, and adding items to the cart.

## Known Issues

- **Responsive Design**: The layout might require further adjustments to ensure optimal display on all screen sizes, especially for smaller mobile devices.
- **Image Loading**: There may be delays in loading product images if the network connection is slow, as images are fetched from an external source.
- **Edge Cases in Sorting**: Sorting logic might need additional handling for products with the same price or rating to ensure consistent behavior.
- **State Persistence**: The cart state is not persisted across page reloads or sessions, meaning that items in the cart are lost if the user refreshes the page.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/musicbydise1/front-test-app.git/
    cd front-test-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Run tests:
    ```bash
    npm test
    ```


## Hope you enjoyed my implementation of the test 😁
