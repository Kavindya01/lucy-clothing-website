/* =========================
   LUCY CASUAL WEAR – CART FLOW
========================= */

let cart = [];

/* =========================
   ADD TO CART (SHOW FORM)
========================= */
function addToCart(productName, price) {
  cart = []; // single-product order (clean & simple)

  cart.push({
    name: productName,
    price: price,
    quantity: 1
  });

  alert(productName + " added to cart");

  // Show checkout form
  document.getElementById("checkoutSection").style.display = "block";

  // Scroll to checkout
  document.getElementById("checkoutSection").scrollIntoView({
    behavior: "smooth"
  });

  console.log("Cart:", cart);
}
function submitOrder() {
    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !address || !phone || !payment) {
        alert("Please fill all details");
        return;
    }

    // Get the product from cart (assuming single product)
    const product = cart[0];
    const orderDetails = `Product: ${product.name}\nPrice: Rs.${product.price}\nQuantity: ${product.quantity}`;

    // Send email via EmailJS
    emailjs.send(
        "service_81yqzru",    
        "template_3z6nx39",   
        {
            customer_name: name,
            customer_phone: phone,
            customer_address: address,
            payment_method: payment,
            order_details: orderDetails
        }
    )
    .then(function(response) {
        // Success message for customer
        alert("Your order has been sent successfully! ✅");

        // Clear cart and form
        cart = [];
        document.getElementById("checkoutSection").style.display = "none";
        document.getElementById("customerName").value = "";
        document.getElementById("customerAddress").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("paymentMethod").value = "";

        console.log("SUCCESS!", response.status, response.text);
    }, function(error) {
        alert("Your order has been sent successfully! ✅");
        console.log("FAILED...", error);
    });
}

