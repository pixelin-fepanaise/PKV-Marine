// Product Details Page JavaScript

// Load product data when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadProductDetails();
});

function loadProductDetails() {
  // Get product ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId || !productsData[productId]) {
    // If no valid product ID, redirect to home
    window.location.href = "index.html#products";
    return;
  }

  const product = productsData[productId];

  // Update page title
  document.title = `${product.name} - PKV Marine`;

  // Update breadcrumb
  document.querySelector(".breadcrumb span").textContent = product.name;

  // Update product name
  document.querySelector(".product-info h1").textContent = product.name;

  // Update certification badge
  const certBadge = document.querySelector(".certification-badge");
  if (product.certified) {
    certBadge.textContent = `✓ ${product.certificationText}`;
    certBadge.style.display = "inline-block";
  } else {
    certBadge.style.display = "none";
  }

  // Update description
  document.querySelector(".product-description p").textContent =
    product.description;

  // Update images
  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.images[0];
  mainImage.alt = product.name;

  const thumbnailContainer = document.querySelector(".thumbnail-container");
  thumbnailContainer.innerHTML = "";
  product.images.forEach((image, index) => {
    const thumb = document.createElement("img");
    thumb.src = image;
    thumb.alt = `${product.name} - View ${index + 1}`;
    thumb.className = `thumbnail ${index === 0 ? "active" : ""}`;
    thumb.onclick = function () {
      changeImage(this);
    };
    thumbnailContainer.appendChild(thumb);
  });

  // Update specifications
  const specList = document.querySelector(".spec-list");
  specList.innerHTML = "";
  product.specifications.forEach((spec) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="spec-label">${spec.label}</span>
      <span class="spec-value">${spec.value}</span>
    `;
    specList.appendChild(li);
  });

  // Update features
  const featuresList = document.querySelector(".features-list");
  featuresList.innerHTML = "";
  product.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Update compliance
  const complianceList = document.querySelector(".compliance-list");
  complianceList.innerHTML = "";
  product.compliance.forEach((standard) => {
    const li = document.createElement("li");
    li.textContent = `• ${standard}`;
    complianceList.appendChild(li);
  });

  // Load related products (excluding current product)
  loadRelatedProducts(productId);
}

function loadRelatedProducts(currentProductId) {
  const relatedGrid = document.querySelector(
    ".related-products .products-grid"
  );
  relatedGrid.innerHTML = "";

  // Define the order of all products to ensure consistent display
  const productOrder = [
    "immersion-suit",
    "liferaft",
    "embarkation-ladder",
    "pilot-ladder",
    "life-jacket",
    "eebd",
    "scba",
  ];

  // Find the index of the current product
  const currentIndex = productOrder.indexOf(currentProductId);

  let count = 0;
  let offset = 1; // Start from the next product after current

  // Iterate through all 7 products with circular rotation
  // Start from next product after current and wrap around
  while (count < 4 && offset < productOrder.length) {
    // Calculate the index with circular wrap-around
    const index = (currentIndex + offset) % productOrder.length;
    const productId = productOrder[index];

    const product = productsData[productId];
    if (product) {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        <p class="product-name">${product.name}</p>
        <button class="product-btn" onclick="viewProduct('${productId}')">View Details</button>
      `;
      relatedGrid.appendChild(card);
      count++;
    }

    offset++;
  }
}

// Image gallery functionality
function changeImage(thumbnail) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = thumbnail.src;

  // Update active thumbnail
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnail.classList.add("active");
}

// View Product - Navigate to product details with ID
function viewProduct(productId) {
  window.location.href = `product-details.html?id=${productId}`;
}
