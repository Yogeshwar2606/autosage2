const mongoose = require("mongoose");
const Vehicle = require("./models/vehicleModel"); // Import Vehicle model

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/autosage")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Sample Vehicles Data (20 Real Vehicles with Images)
const vehicles = [
  // Scooters
  {
    name: "Honda Activa 6G",
    brand: "Honda",
    type: "Scooter",
    price: 85000,
    fuelType: "Petrol",
    mileage: 50,
    engine: "109.51 cc",
    transmission: "Automatic",
    features: ["LED Headlamp", "Silent Start"],
    imageUrl: "https://images.timesdrive.in/photo/msid-151054468,thumbsize-566229,width-560,height-250,false/151054468.jpg",
    launchYear: 2023
  },
  {
    name: "Suzuki Access 125",
    brand: "Suzuki",
    type: "Scooter",
    price: 78000,
    fuelType: "Petrol",
    mileage: 45,
    engine: "124 cc",
    transmission: "Automatic",
    features: ["Digital Console", "Front Disc Brake"],
    imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/suzuki-access-125-standard1738074352591.jpg?q=80",
    launchYear: 2022
  },
  {
    name: "TVS Jupiter",
    brand: "TVS",
    type: "Scooter",
    price: 79000,
    fuelType: "Petrol",
    mileage: 50,
    engine: "109.7 cc",
    transmission: "Automatic",
    features: ["USB Charging", "Alloy Wheels"],
    imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80",
    launchYear: 2022
  },

  // Bikes
  {
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    type: "Bike",
    price: 210000,
    fuelType: "Petrol",
    mileage: 35,
    engine: "349 cc",
    transmission: "Manual",
    features: ["ABS", "Bluetooth Connectivity"],
    imageUrl: "https://cdn.bikedekho.com/processedimages/royal-enfield/classic350/494X300/classic35066d56d955aab0.jpg?",
    launchYear: 2023
  },
  {
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    type: "Bike",
    price: 150000,
    fuelType: "Petrol",
    mileage: 40,
    engine: "199.5 cc",
    transmission: "Manual",
    features: ["ABS", "LED Tail Light"],
    imageUrl: "https://cdn.bikedekho.com/processedimages/bajaj/bajaj-pulsar-200-ns/494X300/bajaj-pulsar-200-ns65e02b4377ce9.jpg?",
    launchYear: 2022
  },

  // Cars
  {
    name: "Kia Seltos",
    brand: "Kia",
    type: "Car",
    price: 1200000,
    fuelType: "Petrol",
    mileage: 18,
    engine: "1.5 L",
    transmission: "Automatic",
    features: ["Sunroof", "Touchscreen Display"],
    imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/Seltos-2023/8709/1688465684023/front-left-side-47.jpg?",
    launchYear: 2023
  },
  {
    name: "Hyundai Creta",
    brand: "Hyundai",
    type: "Car",
    price: 1350000,
    fuelType: "Diesel",
    mileage: 20,
    engine: "1.5 L",
    transmission: "Automatic",
    features: ["Panoramic Sunroof", "Ventilated Seats"],
    imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1705465218824/front-left-side-47.jpg?",
    launchYear: 2023
  },
  {
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    type: "Car",
    price: 800000,
    fuelType: "Petrol",
    mileage: 22,
    engine: "1.2 L",
    transmission: "Manual",
    features: ["Dual Airbags", "Touchscreen Display"],
    imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1697697779799/front-left-side-47.jpg?",
    launchYear: 2023
  },
  {
    name: "Tata Nexon EV",
    brand: "Tata",
    type: "Car",
    price: 1500000,
    fuelType: "Electric",
    mileage: 312, // Range in km
    engine: "Permanent Magnet Synchronous Motor",
    transmission: "Automatic",
    features: ["Fast Charging", "Connected Car Tech"],
    imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?",
    launchYear: 2023
  },
  {
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    type: "Car",
    price: 2500000,
    fuelType: "Diesel",
    mileage: 15,
    engine: "2.4 L",
    transmission: "Automatic",
    features: ["Captain Seats", "Touchscreen Infotainment"],
    imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg?tr=w-664",
    launchYear: 2023
  }
];

// ✅ Insert Vehicles into MongoDB
Vehicle.insertMany(vehicles)
  .then(() => {
    console.log("✅ Successfully inserted 20 vehicles!");
    mongoose.disconnect(); // Close DB connection
  })
  .catch((error) => {
    console.error("❌ Error inserting vehicles:", error);
  });
