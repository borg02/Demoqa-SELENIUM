module.exports = function () {

  this.Given(/^the category Skafferi was selected$/, async function () {
    
    //Get the "Skafferi" link and click it
    let skafferiLink = await driver.findElement(By.css('a[href="/sortiment/skafferi"]'));
    await skafferiLink.click();
  });

  let product;
  let boughtProduct;

  this.Then(/^that a product was added to the basket$/, async function () {

    // Get the first product on the page
    product = await driver.findElement(By.css('[itemtype="https://schema.org/Product"]'));


    // Randomize quantity (1 to 5), 
    // read the name and price of the product
    let name = await (await product.findElement(By.css('[itemprop="name"]'))).getText();
    let quantity = (Math.floor(Math.random() * 5) + 1);

    // Remember name, price, quantity and pricePer for later
    boughtProduct = { name, quantity };

    // Add the product to the cart in the right quantity
    let quantityField = await product.findElement(By.css('[aria-label="Ändra produktantal"]'));
    await quantityField.sendKeys(quantity + '', selenium.Key.ENTER);

    await driver.sleep(1000);
    console.log('\n Added %i %s to cart\n', boughtProduct.quantity, boughtProduct.name);
  });

  this.When(/^the user clicks \+ on the quantity button$/, async function () {

    await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

    let addButton = await driver.findElements(By.css("button[title='Öka antal']"));
    await addButton[0].click();

    await driver.sleep(1000);
  });

  this.Then(/^the product should have products quantity should have been added by 1$/, async function () {
    
    product = await driver.findElement(By.css('[itemtype="https://schema.org/Product"]'));
    quantity = await product.findElement(By.css('input[name="quantity"]'));
    
    quantity = (await quantity.getAttribute("value"));
    quantity = Number(quantity[0]);

    expect(boughtProduct.quantity + 1).is.equal(quantity)

    console.log("\n Added 1 %s to cart, now there is %i in cart\n", boughtProduct.name, quantity );
    await driver.sleep(1000);
  });

}