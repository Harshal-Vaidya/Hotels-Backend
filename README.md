<h1>Hotel-Application</h1>

The Node Hotel application is a Node.js-based system developed using the Express.js framework, with MongoDB as the database. This application manages data related to persons (staff) and menu items. It exposes specific endpoints to handle CRUD (Create, Read, Update, Delete) operations for both persons and menu items.

<h2>Endpoints</h2>
<h3>Persons</h3>
<ul>
<li><h4>Add a Person:</h4></li>
<ul>
<li>Endpoint: <code>POST /person</code></li>
<li>Description: Adds a person to the system with details such as name, role, etc.</li>
</ul>  
  
<li><h4>Get All Persons:</h4></li>
<ul>
<li>Endpoint: <code>GET /person</code></li>
<li>Description: Retrieves a list of all persons in the system.</li>
</ul>
  
<li><h4>Get Persons by Work Type:</h4></li>
<ul>
<li>Endpoint: <code>GET /person/:workType</code></li>
<li>Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).</li>
</ul>

<li><h4>Update a Person:</h4></li>
<ul>
<li>Endpoint: <code>PUT /person/:id</code></li>
<li>Description: Updates the details of a specific person identified by their ID.</li>
</ul>  

<li><h4>Delete a Person:</h4></li>
<ul>
<li>Endpoint: <code>DELETE /person/:id</code></li>
<li>Description: Deletes a person from the system based on their ID.</li>
</ul>
</ul>


<h3>Menu Items</h3>
<ul>
<li><h4>Add a Menu Item:</h4></li>
<ul>
<li>Endpoint: <code>POST /menu</code></li>
<li>Description: Adds a menu item to the system with details such as name, price, taste, etc.</li>
</ul>
  
<li><h4>Get All Menu Items:</h4></li>
<ul>
<li>Endpoint: <code>GET /menu</code></li>
<li>Description: Retrieves a list of all menu items in the system.</li>
</ul>
  
<li><h4>Get Menu Items by Taste:</h4></li>
<ul>
<li>Endpoint: <code>GET /menu/:taste</code></li>
<li>Description: Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).</li>
</ul>
  
<li><h4>Update a Menu Item:</h4></li>
<ul>
<li>Endpoint: <code>PUT /menu/:id</code></li>
<li>Description: Updates the details of a specific menu item identified by its ID.</li>
</ul>

<li><h4>Delete a Menu Item:</h4></li>
<ul>
<li>Endpoint: <code>DELETE /menu/:id</code></li>
<li>Description: Deletes a menu item from the system based on its ID.</li>
</ul>
</ul>


<h2>Data Models</h2>

<h3>Person</h3>
The <code>Person</code> data model represents information about staff members in the hotel.
<ul>
<li><h4>Fields:</h4></li>
<ul>
<li>name: String (Person's name)</li>
<li>age: Number (Person's age)</li>
<li>work: Enum (Role in the hotel, such as chef, waiter, manager)</li>
<li>mobile: String (Person's mobile number)</li>
<li>email: String (Person's email address, unique)</li>
<li>address: String (Person's address)</li>
<li>salary: Number (Person's salary)</li>
</ul>

<li><h4>Example:</h4></li>

<code>
{
  "name": "John Doe",
  "age": 30,
  "work": "waiter",
  "mobile": "123-456-7890",
  "email": "john@example.com",
  "address": "123 Main Street",
  "salary": 30000
}
</code>
</ul>


<h3>Menu Item</h3>
The <code>MenuItem</code> data model represents information about menu items available in the hotel.
<ul>
<li><h4>Fields:</h4></li>

<ul>
<li>name: String (Item's name)</li>
<li>price: Number (Item's price)</li>
<li>taste: Enum (Item's taste, such as sweet, spicy, sour)</li>
<li>is_drink: Boolean (Indicates if the item is a drink, default is false)</li>
<li>ingredients: Array of Strings (List of ingredients, default is an empty array)</li>
<li>num_sales: Number (Number of sales for the item, default is 0)</li>
</ul>
<li><h4>Example:</h4></li>
<code>
{
  "name": "Spicy Chicken Curry",
  "price": 12.99,
  "taste": "spicy",
  "is_drink": false,
  "ingredients": ["chicken", "spices", "vegetables"],
  "num_sales": 50
}
</code>
</ul>
<h2>Usage</h2>
<ol>
<li>Install Dependencies:</li>
<code>
npm install
</code>
</ol>
