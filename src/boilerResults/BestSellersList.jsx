import React from "react";
import { useNavigate } from "react-router-dom";

const BestSellersList = ({ data }) => {
    const navigate = useNavigate();
  // Define pricing for additional options
  const additionalPricing = {
    flueLength: {
      "1-2m": 80,
      "2-4m": 240,
      "4-8m": 640
    },
    flueLengthWall: {
        "1-2m": 80,
        "2-4m": 240,
        "4-8m": 640
      },
    newPlace: {
      "Same Room": 400,
      "Same Floor": 700,
      "Different Floor": 800,
      "loft/attic": 800,
      "Other": 700
    },
    flueToWindow: {
      "Less than 30cm": 100
    }
  };

  // Calculate additional installation costs
  const calculateAdditionalCosts = () => {
    let total = 0;
    
    if (data.flueLength && additionalPricing.flueLength[data.flueLength]) {
      total += additionalPricing.flueLength[data.flueLength];
    }
    if (data.flueLengthWall && additionalPricing.flueLengthWall[data.flueLengthWall]) {
        total += additionalPricing.flueLengthWall[data.flueLengthWall];
      }
    
    if (data.newPlace && additionalPricing.newPlace[data.newPlace]) {
      total += additionalPricing.newPlace[data.newPlace];
    }
    
    if (data.flueToWindow && additionalPricing.flueToWindow[data.flueToWindow]) {
      total += additionalPricing.flueToWindow[data.flueToWindow];
    }
    
    return total;
  };

  const additionalInstallationCost = calculateAdditionalCosts();

  // Define all product categories with complete boiler data
  const productCategories = {
    combi: {
      1: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 25kw Combi",
          badges: ["Quiet Mark", "Compact"],
          features: [
            "Instant hot water, no tank needed",
            "Suitable for 1–2 bedroom homes or apartments.",
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Hot Water flow rate": "10.2 litres/min",
            "Central heating output": "24 kW",
            "Boiler dimensions": "400x310x724mm"
          },
          basePrice: 2050,
          originalPrice: 2465,
          image: "/worcester/worcester4000.png"
        },
        {
          id: 2,
          title: "Worcester Bosch Greenstar 1000 24kW Combi",
          badges: ["Compact", "Great Value"],
          features: [
            "Efficient and affordable entry-level boiler",
            "Ideal for 1–2 bedroom homes or apartments",
           
          ],
          specs: {
            "Boiler warranty": "5 Years",
            "Water flow rate": "10.0 litres/min",
            "Heating output": "24 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 1800,
          originalPrice: 2000,
          image: "/worcester/worcester1000.jpeg"
        },
        {
          id: 3,
          title: "Worcester Bosch Greenstar 2000 25kW Combi",
          badges: ["94% ErP efficiency", "Quiet Mark"],
          features: [
            "Designed for small to medium homes with one bathroom",
            "Instant hot water with no need for a tank",
            "Quiet operation – ideal for kitchen or utility installations",
            "Lightweight and compact for easy installation"
          ],
          specs: {
            "Boiler warranty": "7 Years",
            "Water flow rate": "10.2 litres/min",
            "Heating output": "25 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 1950,
          originalPrice: 2125,
          image: "/worcester/worcester2000.png"
        },
        
        {
          id: 4,
          title: "Vaillant ecoFIT pure 825 Combi",
          badges: ["Quiet Mark", "Compact Size"],
          features: [
            "Perfect for small to medium-sized homes with one bathroom",
            "Delivers instant hot water without the need for a cylinder",
            "Ultra-quiet operation – Quiet Mark approved",
            "Compact enough to fit in a standard kitchen cupboard"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "10.4 litres/min",
            "Heating output": "25 kW",
            "Boiler dimensions": "700x390x295mm"
          },
          basePrice: 2300,
          originalPrice: 2550,
          image: "/vaillant/ecofit.jpeg"
        },
        
        
      ],
      2: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 25kw Combi",
          badges: ["Quiet Mark", "Compact"],
          features: [
            "Instant hot water, no tank needed",
            "Suitable for 1–2 bedroom homes or apartments.",
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Hot Water flow rate": "10.2 litres/min",
            "Central heating output": "24 kW",
            "Boiler dimensions": "400x310x724mm"
          },
          basePrice: 2050,
          originalPrice: 2465,
          image: "/worcester/worcester4000.png"
        },
        {
          id: 2,
          title: "Worcester Bosch Greenstar 1000 24kW Combi",
          badges: ["Compact", "Great Value"],
          features: [
            "Efficient and affordable entry-level boiler",
            "Ideal for 1–2 bedroom homes or apartments",
           
          ],
          specs: {
            "Boiler warranty": "5 Years",
            "Water flow rate": "10.0 litres/min",
            "Heating output": "24 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 1800,
          originalPrice: 2000,
          image: "/worcester/worcester1000.jpeg"
        },
        {
          id: 3,
          title: "Worcester Bosch Greenstar 2000 25kW Combi",
          badges: ["94% ErP efficiency", "Quiet Mark"],
          features: [
            "Designed for small to medium homes with one bathroom",
            "Instant hot water with no need for a tank",
            "Quiet operation – ideal for kitchen or utility installations",
            "Lightweight and compact for easy installation"
          ],
          specs: {
            "Boiler warranty": "7 Years",
            "Water flow rate": "10.2 litres/min",
            "Heating output": "25 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 1950,
          originalPrice: 2125,
          image: "/worcester/worcester2000.png"
        },
        
        {
          id: 4,
          title: "Vaillant ecoFIT pure 825 Combi",
          badges: ["Quiet Mark", "Compact Size"],
          features: [
            "Perfect for small to medium-sized homes with one bathroom",
            "Delivers instant hot water without the need for a cylinder",
            "Ultra-quiet operation – Quiet Mark approved",
            "Compact enough to fit in a standard kitchen cupboard"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "10.4 litres/min",
            "Heating output": "25 kW",
            "Boiler dimensions": "700x390x295mm"
          },
          basePrice: 2300,
          originalPrice: 2550,
          image: "/vaillant/ecofit.jpeg"
        },
        
      ],
      
      3: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 30kW Combi",
          badges: ["Quiet Mark", "94% ErP efficiency"],
          features: [
            "Perfect for medium-sized homes with 1–2 bathrooms",
            "Instant hot water without the need for a tank",
            "Quiet Mark certified – one of the quietest combi boilers available",
            "Modern LCD display with simple boiler controls"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "12.3 litres/min",
            "Heating output": "30 kW",
            "Boiler dimensions": "724x400x310mm"
          },
          basePrice: 2150,
          originalPrice: 2495,
          image: "/worcester/worcester4000.png"
        },{
          id: 2,
          title: "Worcester Bosch Greenstar 1000 30kW Combi",
          badges: ["Great Value", "Simple Controls"],
          features: [
            "Ideal for small to medium-sized homes with 1–2 bathrooms",
            "Instant hot water with no tank required",
            "Simple, easy-to-use boiler controls",
            "Affordable entry point into the Worcester Bosch range"
          ],
          specs: {
            "Boiler warranty": "5 Years",
            "Water flow rate": "12.3 litres/min",
            "Heating output": "30 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 2000,
          originalPrice: 2200,
          image: "/worcester/worcester1000.jpeg"
        },{
          id: 3,
          title: "Worcester Bosch Greenstar 2000 30kW Combi",
          badges: ["Quiet Mark", "Entry Level Worcester"],
          features: [
            "Best suited for small to medium homes with 1–2 bathrooms",
            "Delivers instant hot water with no hot water cylinder required",
            "Ultra-quiet operation – Quiet Mark approved",
            "Slim and lightweight for flexible installation (not cupboard-fit)"
          ],
          specs: {
            "Boiler warranty": "6 Years",
            "Water flow rate": "12.3 litres/min",
            "Heating output": "30 kW",
            "Boiler dimensions": "724x400x300mm"
          },
          basePrice: 2150,
          originalPrice: 2350,
          image: "/worcester/worcester2000.png"
        },{
          id: 5,
          title: "Vaillant ecoFIT pure 830 Combi",
          badges: ["Quiet Mark", "Compact Size"],
          features: [
            "Ideal for medium-sized homes with 1–2 bathrooms",
            "Delivers strong hot water performance without the need for a tank",
            "Ultra-quiet operation – Quiet Mark approved",
            "Compact enough to fit in a standard kitchen cupboard"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "12.2 litres/min",
            "Heating output": "30 kW",
            "Boiler dimensions": "700x390x295mm"
          },
          basePrice: 2470,
          originalPrice: 2650,
          image: "/vaillant/ecofit.jpeg"
        }
        
        
      ],
      4: [
        {
          id: 1,
          title: "Vaillant ecoFIT pure 835 Combi",
          badges: ["Quiet Mark", "Compact Size"],
          features: [
            "Perfect for medium to large homes with 2+ bathrooms",
            "High hot water flow rate – great for multiple showers",
            "Ultra-quiet operation – Quiet Mark approved",
            "Compact enough to fit in a standard kitchen cupboard"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "14.1 litres/min",
            "Heating output": "35 kW",
            "Boiler dimensions": "700x390x295mm"
          },
          basePrice: 2650,
          originalPrice: 2895,
          image: "/vaillant/ecofit.jpeg"
        },
        {
          id: 2,
          title: "Worcester Bosch Greenstar 8000 Life 32kW Combi",
          badges: ["Premium Design", "Ultra Quiet"],
          features: [
            "Ideal for medium to large homes with 1–2 bathrooms",
            "High hot water flow rate – perfect for powerful showers",
            "Modern full-colour display with touch controls",
            "Stylish premium design in black or white finish"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "13.1 litres/min",
            "Heating output": "32 kW",
            "Boiler dimensions": "780x440x365mm"
          },
          basePrice: 2550,
          originalPrice: 2895,
          image: "/worcester/greenstar8000-32kw.png"
        }
        
      ],
      
    },
    system: {
      1: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 8000 30kw System",
          badges: ["Premium", "Compact"],
          features: [
            "Works with existing cylinder",
            "Ideal for high hot water demand",
            "12.4 litres/min flow rate",
            "30kW heating output"
          ],
          specs: {
            "Boiler warranty": "12 Years",
            "Water flow rate": "12.4 litres/min",
            "Heating output": "30 kW",
            "Boiler dimensions": "450x300x700mm"
          },
          basePrice: 2595,
          originalPrice: 2865,
          image: "/frontpagephotos/third.webp"
        }
      ],
      2: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 8000 35kw System",
          badges: ["Premium", "Powerful"],
          features: [
            "For homes with 2+ bathrooms",
            "14.8 litres/min flow rate",
            "35kW heating output",
            "Weather compensation ready"
          ],
          specs: {
            "Boiler warranty": "12 Years",
            "Water flow rate": "14.8 litres/min",
            "Heating output": "35 kW",
            "Boiler dimensions": "450x300x700mm"
          },
          basePrice: 2795,
          originalPrice: 3065,
          image: "/frontpagephotos/first.webp"
        }
      ],
      3: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 8000 40kw System",
          badges: ["Commercial Grade", "Reliable"],
          features: [
            "For large 3-4 bedroom homes",
            "16.2 litres/min flow rate",
            "40kW heating output",
            "Advanced heating controls"
          ],
          specs: {
            "Boiler warranty": "12 Years",
            "Water flow rate": "16.2 litres/min",
            "Heating output": "40 kW",
            "Boiler dimensions": "450x300x700mm"
          },
          basePrice: 2995,
          originalPrice: 3265,
          image: "/frontpagephotos/second.webp"
        }
      ],
      4: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 8000 42kw System",
          badges: ["Commercial Grade", "High Performance"],
          features: [
            "For very large 4+ bedroom homes",
            "17.5 litres/min flow rate",
            "42kW heating output",
            "Advanced diagnostics"
          ],
          specs: {
            "Boiler warranty": "12 Years",
            "Water flow rate": "17.5 litres/min",
            "Heating output": "42 kW",
            "Boiler dimensions": "450x300x700mm"
          },
          basePrice: 3195,
          originalPrice: 3465,
          image: "/frontpagephotos/third.webp"
        }
      ]
    },
    regular: {
      1: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 24kw Regular",
          badges: ["Traditional", "Reliable"],
          features: [
            "Works with existing tank",
            "Compatible with solar thermal",
            "Simple controls",
            "24kW heating output"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "N/A (uses cylinder)",
            "Heating output": "24 kW",
            "Boiler dimensions": "390x295x695mm"
          },
          basePrice: 1995,
          originalPrice: 2265,
          image: "/frontpagephotos/first.webp"
        }
      ],
      2: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 30kw Regular",
          badges: ["Traditional", "Efficient"],
          features: [
            "For homes with existing tanks",
            "Compatible with renewable systems",
            "Reliable performance",
            "30kW heating output"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "N/A (uses cylinder)",
            "Heating output": "30 kW",
            "Boiler dimensions": "390x295x695mm"
          },
          basePrice: 2195,
          originalPrice: 2465,
          image: "/frontpagephotos/second.webp"
        }
      ],
      3: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 35kw Regular",
          badges: ["Traditional", "Powerful"],
          features: [
            "For larger homes with tanks",
            "Excellent heating performance",
            "Compatible with smart controls",
            "35kW heating output"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "N/A (uses cylinder)",
            "Heating output": "35 kW",
            "Boiler dimensions": "390x295x695mm"
          },
          basePrice: 2395,
          originalPrice: 2665,
          image: "/frontpagephotos/third.webp"
        }
      ],
      4: [
        {
          id: 1,
          title: "Worcester Bosch Greenstar 4000 40kw Regular",
          badges: ["Traditional", "High Performance"],
          features: [
            "For very large homes with tanks",
            "Commercial-grade reliability",
            "Compatible with multiple heating zones",
            "40kW heating output"
          ],
          specs: {
            "Boiler warranty": "10 Years",
            "Water flow rate": "N/A (uses cylinder)",
            "Heating output": "40 kW",
            "Boiler dimensions": "390x295x695mm"
          },
          basePrice: 2595,
          originalPrice: 2865,
          image: "/frontpagephotos/first.webp"
        }
      ]
    }
  };

  // Extract values from data
  const bedroomString = data?.bedRoom || "1 bedroom";
  const bedroomCount = parseInt(bedroomString) || 1;
  const validBedroomCount = Math.max(1, Math.min(4, bedroomCount));
  const currentBoilerType = data?.changeToCombi === "Yes" 
    ? 'combi' 
    : (data?.currentBoiler?.toLowerCase().replace(' boiler', '') || 'combi');
  
  // Get products for the current boiler type and bedroom count
  const currentProducts = productCategories[currentBoilerType]?.[validBedroomCount] || 
                         productCategories.combi[validBedroomCount];

  // Badge color variants
  const badgeColors = {
    "Quiet Mark": "bg-teal-100 text-teal-800",
    "Compact": "bg-blue-100 text-blue-800",
    "Energy A++": "bg-green-100 text-green-800",
    "WiFi Ready": "bg-purple-100 text-purple-800",
    "Best Seller": "bg-red-100 text-red-800",
    "Powerful": "bg-orange-100 text-orange-800",
    "Efficient": "bg-emerald-100 text-emerald-800",
    "Premium": "bg-amber-100 text-amber-800",
    "Traditional": "bg-stone-100 text-stone-800",
    "Reliable": "bg-indigo-100 text-indigo-800",
    "High Performance": "bg-rose-100 text-rose-800",
    "Commercial Grade": "bg-violet-100 text-violet-800"
  };

  // Product card component
  const ProductCard = ({ product }) => {
    const totalPrice = product.basePrice + additionalInstallationCost;
    const monthlyPrice = (totalPrice / 60).toFixed(2); // Example monthly calculation
    //sending data to other component via route
    const handleAddToBasket = () => {
        // Create a URL-friendly version of the boiler name
        const boilerNameSlug = product.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')  // Replace special chars with hyphens
          .replace(/-+/g, '-')            // Remove consecutive hyphens
          .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
  
        // Navigate to the boiler quote page with boiler details as state
        navigate(`/boilerQuote/results/${boilerNameSlug}`, {
          state: {
            boilerName: product.title,
            boilerImage: product.image,
            boilerPrice: totalPrice,
            boilerWarranty: product.specs["Boiler warranty"],
          }
        });
      };
      return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col lg:flex-row mb-8 transition-all hover:shadow-xl hover:-translate-y-1">
        {/* Image Section */}
        <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 flex items-center justify-center">
          <img 
            className="h-40 sm:h-48 lg:h-56 w-auto object-contain" 
            src={product.image} 
            alt={product.title} 
            loading="lazy"
          />
        </div>
        
        {/* Content Section */}
        <div className="lg:w-3/5 flex flex-col">
          <div className="p-4 sm:p-6 flex-grow">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
              {product.title}
            </h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge, index) => (
                  <span 
                    key={index} 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${badgeColors[badge] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
  
              <ul className="text-sm sm:text-base text-gray-700 mb-4 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block mr-2 mt-1 h-1 w-1 rounded-full bg-gray-500"></span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
  
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                  TECHNICAL SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">{key}:</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Price and CTA Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-blue-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Your fixed price including installation:
                  </p>
                  <div className="flex items-baseline flex-wrap gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      £{totalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      was £{(product.originalPrice + additionalInstallationCost).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Additional costs breakdown */}
                  {additionalInstallationCost > 0 && (
                    <div className="mt-2 text-xs sm:text-sm text-gray-700">
                      <p className="font-medium">Includes installation extras:</p>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        {data.flueLength &&
                          additionalPricing.flueLength[data.flueLength] > 0 && (
                            <li>
                              Flue length ({data.flueLength}): £{additionalPricing.flueLength[data.flueLength]}
                            </li>
                        )}
  
                        {data.flueLengthWall &&
                          additionalPricing.flueLengthWall[data.flueLengthWall] > 0 && (
                            <li>
                              Flue wall length ({data.flueLengthWall}): £{additionalPricing.flueLengthWall[data.flueLengthWall]}
                            </li>
                        )}
  
                        {data.newPlace &&
                          additionalPricing.newPlace[data.newPlace] > 0 && (
                            <li>
                              Installation location ({data.newPlace}): £{additionalPricing.newPlace[data.newPlace]}
                            </li>
                        )}
  
                        {data.flueToWindow &&
                          additionalPricing.flueToWindow[data.flueToWindow] > 0 && (
                            <li>
                              Window distance ({data.flueToWindow}): £{additionalPricing.flueToWindow[data.flueToWindow]}
                            </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleAddToBasket}
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95 text-sm sm:text-base"
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {data?.changeToCombi === "Yes" ? (
            "Recommended Combi Boilers"
          ) : (
            `Recommended ${currentBoilerType.charAt(0).toUpperCase() + currentBoilerType.slice(1)} Boilers`
          )}
          {` for ${validBedroomCount}-Bedroom ${validBedroomCount === 1 ? "Home" : "Homes"}`}
        </h2>
        
        <div className="space-y-6 sm:space-y-8">
        {currentProducts.map(product => (
          <ProductCard key={`${currentBoilerType}-${product.id}`} product={product} />
        ))}
      </div>
  
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
            Need help choosing?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Our heating experts can help you select the perfect boiler for your home. 
            Call us at <span className="font-bold text-blue-600">075 85548562</span> or 
            chat with us online for free advice.
          </p>
          <button className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg shadow-sm transition-all text-sm sm:text-base">
            Get Free Advice
          </button>
        </div>
      </div>
    );
  };
  
  export default BestSellersList;