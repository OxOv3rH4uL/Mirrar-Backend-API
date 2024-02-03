Here's the formatted README.md:

---

# MIRRAR RESTAPI SERVICE

## **Note:**
Before running the project, follow these steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/OxOv3rH4uL/Mirrar-Backend-API
   ```
2. **Move to the Repository Folder and Install Dependencies**:
   ```bash
   cd Mirrar-Backend-API
   npm install
   ```
3. **Change MySQL Credentials**:
   Update the MySQL credentials in the script according to your username and password.

4. **Running the Tests**:
   Ensure to run these commands in 2 different terminals/command lines:
   ```bash
   node app.js
   ```
   ```bash
   npm run test
   ```

## **Introduction:**

Mirrar REST API uses Node.js for Backend Services and MySQL for the database. It handles data related to products and their variants.

![Schema Image](/assets/mirrar1.png)

## **Available Endpoints:**

1. `/` (GET):
   - Greeted with a message and provides information regarding the schema of the database.

2. **CREATING A PRODUCT AND VARIANT**
   - `/create/product` (POST):
     - Creates a product when all required data is provided. If any data is missing, it produces an error with an appropriate message. After creating the product, the response returns the records present in the table.

3. **GETTING DETAILS OF PRODUCT AND VARIANT**
   - `/product_variants` (GET):
     - Sends a response containing all the details of the product and their variants.
   - `/products` (GET):
     - Sends a response containing all the product details alone.

4. **SEARCHING PRODUCT AND VARIANT**
   - `/search/name/{data}` (GET):
     - Searches for products by name. If data is found, the response message will send all records that contain the product name 'data', else returns 404 not found.
   - `/search/desc/{desc_data}` (GET):
     - Searches for products by description. If data is found, the response message will send all records that contain the product description 'desc_data', else returns 404 not found.
   - `/search/variant_name/{var_name}` (GET):
     - Searches for products by variant name. If data is found, the response message will send all records that contain the variant name 'var_name'.
   - You can also search like:
     - `/search?name=`
     - `/search?desc=`
     - `/search?variant_name=`
     These endpoints send records in response if they contain the specified data, else 404 not found.

5. **UPDATE PRODUCT AND VARIANTS**
   - `/update/product/{id}` (PUT):
     - Updates the product of that id when all data regarding the product is given. If all details are not present, it returns an appropriate error message. Variant Details of the product can be updated by the below endpoint.
   - `/update/product/{p_id}/variant/{variant_id}` (PUT):
     - Updates the product's variant of that variant_id when all data regarding the product's variant is given. If all details are not present, it returns an appropriate error message.

6. **DELETE PRODUCT AND VARIANT**
   - `/delete/product/{id}` (DELETE):
     - If id is found, the product along with its variants are deleted. Else, 404 not found is produced.


Certainly! Here's the addition for the end of your README.md:

---

## **Testing:**

Unit tests have been written for all the endpoints and functionalities. Each test describes the function it's testing. You can simply run all the tests by using the following command:

```bash
npm run test
```

This will inform users about the availability of unit tests and how to run them.

