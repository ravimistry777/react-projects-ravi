import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import benz1 from '../photos/Mer1.webp';
import benz2 from '../photos/Mer2.webp';
import benz3 from '../photos/Mer3.jpg';
import benz4 from '../photos/Mer4.jpg';
import benz5 from '../photos/Mer5.jpg';
import benz6 from '../photos/Mer6.jpg';
import benz7 from '../photos/Mer7.jpg';
import benz8 from '../photos/Mer8.jpg';
import audi1 from '../photos/audi1.jpg';
import audi2 from '../photos/audi2.jpg';
import audi3 from '../photos/audi3.jpg';
import audi4 from '../photos/audi4.jpg';
import audi5 from '../photos/audi5.jpg';
import hyu1 from '../photos/hyu1.jpg';
import hyu2 from '../photos/hyu2.jpg';
import hyu3 from '../photos/hyu3.jpg';
import hon1 from '../photos/hon1.jpg';
import hon2 from '../photos/hon2.jpg';
import hon3 from '../photos/hon3.jpg';
import hon4 from '../photos/hon4.jpg';
import toy1 from '../photos/toy1.jpg';
import toy2 from '../photos/toy2.webp';
import toy3 from '../photos/toy3.jpg';
import toy4 from '../photos/toy4.avif';
import mahi1 from '../photos/mahi1.avif';
import mahi2 from '../photos/mahi2.jpg';
import mahi3 from '../photos/mahi3.jpg';
import masu1 from '../photos/masu1.avif';
import masu2 from '../photos/masu2.avif';
import masu3 from '../photos/masu3.webp';
import skoda1 from '../photos/skoda1.webp';
import skoda2 from '../photos/skoda2.webp';
import skoda3 from '../photos/skoda3.webp';
import kia1 from '../photos/kia1.jpg';
import kia2 from '../photos/kia2.avif';
import kia3 from '../photos/kia3.avif';
import kia4 from '../photos/kia4.webp';
import kia5 from '../photos/kia5.jpg';
import kia6 from '../photos/kia6.jpg';
import ni1 from '../photos/ni1.avif';
import ni2 from '../photos/ni2.avif';
import ni3 from '../photos/ni3.avif';
import ni4 from '../photos/ni4.jpg';
import ni5 from '../photos/ni5.jpg';
import ni6 from '../photos/ni6.avif';
import ni7 from '../photos/ni7.png';
import ni8 from '../photos/ni8.webp';
import ni9 from '../photos/ni9.jpg';
import ni10 from '../photos/ni10.webp';
import ni11 from '../photos/ni11.webp';
import ni12 from '../photos/ni12.jpg';
import fiat1 from '../photos/fiat1.avif';
import fiat2 from '../photos/fiat2.webp';
import fiat3 from '../photos/fiat3.avif';
import fiat4 from '../photos/fiat4.webp';
import fiat5 from '../photos/fiat5.jpg';
import vw1 from '../photos/vw1.avif';
import vw2 from '../photos/vw2.avif';
import vw3 from '../photos/vw3.avif';
import vw4 from '../photos/vw4.jpg';
import bm1 from '../photos/bm1.webp';
import bm2 from '../photos/bm2.avif';
import bm3 from '../photos/bm3.webp';
import bm4 from '../photos/bm4.png';
import le1 from '../photos/le1.avif';
import le2 from '../photos/le2.avif';
import le3 from '../photos/le3.jpg';
import le4 from '../photos/le4.jpg';
import ge1 from '../photos/ge1.jpg';
import ge2 from '../photos/ge2.avif';
import ge3 from '../photos/ge3.avif';
import ge4 from '../photos/ge4.avif';
import ta1 from '../photos/ta1.avif';
import ta2 from '../photos/ta2.jpg';
import ta3 from '../photos/ta3.avif';
import ta4 from '../photos/ta4.avif';
import ford1 from '../photos/ford1.avif';
import ford2 from '../photos/ford2.avif';
import ford3 from '../photos/ford3.jpg';
import ford4 from '../photos/ford4.jpg';
import chev1 from '../photos/chev1.avif';
import chev2 from '../photos/chev2.jpg';
import chev3 from '../photos/chev3.jpg';
import chev4 from '../photos/chev4.webp';
import tesla1 from '../photos/tesla1.avif';
import tesla2 from '../photos/tesla2.avif';
import tesla3 from '../photos/tesla3.avif';
import tesla4 from '../photos/tesla4.avif';
import mazda1 from '../photos/mazda1.avif';
import mazda2 from '../photos/mazda2.avif';
import mazda3 from '../photos/mazda3.png';
import mazda4 from '../photos/mazda4.jpg';
import mits1 from '../photos/mits1.avif';
import mits2 from '../photos/mits2.jpg';
import mits3 from '../photos/mits3.png';
import mits4 from '../photos/mits4.jpg';
import suba1 from '../photos/suba1.avif';
import suba2 from '../photos/suba2.avif';
import suba3 from '../photos/suba3.jpg';
import suba4 from '../photos/suba4.jpg';
import volvo1 from '../photos/volvo1.avif';
import volvo2 from '../photos/volvo2.avif';
import volvo3 from '../photos/volvo3.jpg';
import volvo4 from '../photos/volvo4.webp';
import peu1 from '../photos/peu1.avif';
import peu2 from '../photos/peu2.avif';
import peu3 from '../photos/peu3.jpg';
import peu4 from '../photos/peu4.jpg';
import por1 from '../photos/por1.avif';
import por2 from '../photos/por2.webp';
import por3 from '../photos/por3.jpg';
import por4 from '../photos/por4.avif';
import cad1 from '../photos/cad1.webp';
import cad2 from '../photos/cad2.avif';
import cad3 from '../photos/cad3.avif';
import cad4 from '../photos/cad4.jpg';
import acu1 from '../photos/acu1.avif';
import acu2 from '../photos/acu2.avif';
import acu3 from '../photos/acu3.avif';
import acu4 from '../photos/acu4.jpg';
import suvtoy1 from '../photos/suvtoy1.avif';
import suvtoy2 from '../photos/suvtoy2.avif';
import suvtoy3 from '../photos/suvtoy3.avif';
import suvtoy4 from '../photos/suvtoy4.avif';



const getUserAddedCars = () => {
  try {
    return JSON.parse(localStorage.getItem('userAddedCars') || '{}')
  } catch (error) {
    return {}
  }
}

const getAllCarData = () => {
  const userCars = getUserAddedCars()

  const mergedData = JSON.parse(JSON.stringify(carData))

  Object.keys(userCars).forEach(category => {
    if (!mergedData[category]) {
      mergedData[category] = {
        title: category.charAt(0).toUpperCase() + category.slice(1) + " Cars",
        description: `Premium ${category} collection`,
        brands: {}
      }
    } else {
      if (!mergedData[category].brands) {
        mergedData[category].brands = {}
      }
    }

    Object.keys(userCars[category]).forEach(brand => {
      if (!mergedData[category].brands[brand]) {
        mergedData[category].brands[brand] = userCars[category][brand]
      } else {
        mergedData[category].brands[brand].cars = [
          ...mergedData[category].brands[brand].cars,
          ...userCars[category][brand].cars
        ]
      }
    })
  })

  return mergedData
}

const carData = {
  sedan: {
    title: "Executive Sedans",
    description: "Sophisticated sedans for the discerning driver",
    brands: {
      mercedes: {
        name: "Mercedes-Benz",
        cars: [
          {
            name: "Mercedes-Benz C-Class",
            price: "₹ 57.89-64.30/- Lakh",
            details: "A 5 seater Sedan, It is available in 3 variants, with engine options ranging from 1496 to 1999 cc and a choice of 1 transmission: Automatic. C-Class comes with 7 airbags. Mercedes-Benz C-Class is available in 7 colours.Users have reported a mileage of 14.65 kmpl for C-Class.",
            image: benz1,
            features: ["Hybrid", "1496cc,1993cc & 1999cc", "197 to 255bhp & 300 to 440Nm", "245 to 250 kmph"]
          },
          {
            name: "Mercedes-Benz A-Class Limousine",
            price: "₹44.46-45.95/- Lakh",
            details: "A 5 seater Sedan,It is available in 2 variants, with engine options ranging from 1332 to 1950 cc and a choice of 1 transmission: Automatic. A-Class Limousine has an NCAP rating of 5 stars and comes with 7 airbags. Mercedes-Benz A-Class Limousine is available in 5 colours. Users have reported a mileage of 15 to 15.65 kmpl for A-Class Limousine.",
            image: benz2,
            features: ["Petrol & Diesel", "1332 cc & 1950 cc", "147 to 161 bhp & 270 to 320 Nm", "227 to 230 kmph"]
          },
          {
            name: "Mercedes-Benz S-Class",
            price: "₹1.78-1.88/- Cr",
            details: "Mercedes-Benz S-Class price starts at ₹1.78 Cr and top model price goes upto ₹1.88 Cr. S-Class is offered in 2 variants - the base model of S-Class is S 350d and the top model Mercedes-Benz S-Class S450 4Matic.",
            image: benz3,
            features: ["Petrol & Diesel", "2925 cc - 2999 cc", "281.61-362.07 bhp & 500Nm - 600Nm", "250 kmph"]
          },
          {
            name: "Mercedes-Benz E-Class",
            price: "₹78.50-91.65 Lakh",
            details: "Mercedes-Benz E-Class price starts at ₹78.50 Lakh and top model price goes upto ₹91.65 Lakh. E-Class is offered in 3 variants - the base model of E-Class is E 200 and the top model Mercedes-Benz E-Class E 450.",
            image: benz4,
            features: ["Petrol & Diesel", "1993 cc - 2999 cc", "194-375 bhp & 320Nm - 500Nm", "15 kmpl"]
          },
          {
            name: "Mercedes-Benz AMG CLE 53",
            price: "₹1.28/- Cr",
            details: "Step inside the AMG CLE 53, and the cabin looks familiar, in keeping with its AMG identity. The dashboard layout is reminiscent of other AMGs like the CLE Cabriolet or GT 63, with the large central screen slightly tilted towards the driver to keep everything within easy reach.",
            image: benz5,
            features: ["Petrol", "2999 cc", "442 bhp & 560 Nm", "250 kmph"]
          },
          {
            name: "Mercedes-Benz EQS",
            price: "₹1.30-1.63/- Cr",
            details: "Mercedes-Benz EQS price starts at ₹1.30 Cr and top model price goes upto ₹1.63 Cr. EQS is offered in 2 variants - the base model of EQS is 580 4MATIC Celebration Edition and the top model Mercedes-Benz EQS 580 4Matic.",
            image: benz6,
            features: ["Electric", "107.8 kWh Battery", "536-750.97 bhp", "813 - 857 km range", "210 kmph", "31 Min-200kW(0-80%)"]
          },
          {
            name: "Mercedes-Benz AMG C43",
            price: "₹94.05/- Lakh",
            details: "This four-cylinder engine has a smooth pull and feels easy to drive in the city. It shifts through gears smoothly enough and behaves like a regular C-Class when you are in comfort mode.  Passing other cars is a breeze — just step on the gas, and the gearbox shifts down, giving you power when you need it.",
            image: benz7,
            features: ["Petrol", "1991 cc", "402.3 bhp & 500 Nm", "Automatic"]
          },
          {
            name: "Mercedes-Benz Maybach S-Class",
            price: "₹2.74 - 3.47/- Cr",
            details: "Mercedes-Benz Maybach S-Class price starts at ₹2.74 Cr and top model price goes upto ₹3.47 Cr. Maybach S-Class is offered in 2 variants - the base model of Maybach S-Class is S580 and the top model Mercedes-Benz Maybach S-Class S680.",
            image: benz8,
            features: ["Petrol", "3982cc - 5980cc", "496.17-603.46bhp & 700 Nm - 900 Nm", "250 kmph-Automatic"]
          },
          {
            name: "Mercedes-Benz AMG C 63",
            price: "₹1.91/- Cr",
            details: "Mercedes-Benz AMG C 63 price starts at ₹1.91 Cr. AMG C 63 is offered only 1 variant.",
            image: benz1,
            features: ["Petrol", "1991 cc", "469 bhp & 545 Nm", "4WD-Automatic"]
          }
        ]
      },
      audi: {
        name: "Audi",
        cars: [
          {
            name: "Audi RS e-tron GT",
            price: "₹1.95/- Cr",
            details: "The Audi RS e-tron GT has 1 Electric Engine on offer. It is available with the Automatic transmission. The RS e-tron GT is a 5 seater and has length of 4989 mm, width of 1964 mm and a wheelbase of 2900 mm.",
            image: audi1,
            features: ["Electric", "481 km Range", "636.98 bhp", "200 kmph", "93 kWh Battery Capacity"]
          },
          {
            name: "Audi A4 2025",
            price: "₹70/- Lakh",
            details: "The Audi A6 2026 has 1 Petrol Engine on offer. The Petrol engine is 1984 cc . It is available with the Automatic transmission.",
            image: audi2,
            features: ["Petrol", "1984 cc", "Automatic", "Luxury"]
          },
          {
            name: "Audi A6",
            price: "₹63.74-69.89/- Lakh",
            details: "Audi A6 is a head-turner sedan that drives as good as it looks. It comes with a 10-inch touchscreen and a 16-speaker Bang and Olufsen sound system. The Audi A6 comes with a 2-litre turbo-petrol engine outputting 265 PS and 370 Nm and a 7-speed DCT.",
            image: audi3,
            features: ["Petrol", "1984 cc", "241.3 bhp & 370 Nm", "250kmph-automatic", "FWD"]
          },
          {
            name: "Audi S5 Sportback",
            price: "₹73.57-80.50/- Lakh",
            details: "Audi S5 Sportback price starts at ₹73.57 Lakh and top model price goes upto ₹80.50 Lakh. S5 Sportback is offered in 2 variants - the base model of S5 Sportback is 3.0L TFSI and the top model Audi S5 Sportback Platinum Edition.",
            image: audi4,
            features: ["Petrol", "2994 cc", "348.66 bhp & 500 Nm", "250kmph-automatic", "AWD"]
          },
          {
            name: "Audi A5",
            price: "₹50/- Lakh",
            details: "The Audi A5 has 1 Petrol Engine on offer. The Petrol engine is 1998 cc . It is available with the Automatic transmission.",
            image: audi5,
            features: ["Petrol", "1998 cc", "201-Automatic", "4 Cylinder", "Sedan"]
          },
        ]
      },
      Hyundai: {
        name: "Hyundai",
        cars: [
          {
            name: "Hyundai Verna",
            price: "₹10.69-16.98/- Lakh",
            details: "The Hyundai Verna is a compact sedan which is known for its futuristic and unconventional design language, which can be a hit or a miss. The Verna comes loaded with all the features one would expect from a Hyundai and also features level 2 advanced driver assistance systems (ADAS). Apart from a naturally aspirated petrol engine, the Verna also gets the option of a 1.5-litre turbo-petrol engine, which delivers the highest output in its segment.",
            image: hyu1,
            features: ["Petrol", "1482cc - 1497cc", "143.8Nm - 253Nm & 113.18 - 157.57bhp", "Manual / Automatic", "18.6 - 20.6kmpl"]
          },
          {
            name: "Hyundai Aura",
            price: "₹5.98-8.42/- Lakh",
            details: "The Hyundai Aura is an entry-level, subcompact sedan that offers a good blend of comfort and convenience features while being equipped with the necessary safety kit. It comes with a petrol engine which can be paired with both manual and automatic options, and also gets a choice of a factory-fitted CNG kit. ",
            image: hyu2,
            features: ["Petrol / CNG", "1197 cc", "68 - 82bhp & 95.2Nm - 113.8Nm", "17 kmpl", "Automatic / Manual"]
          },
          {
            name: "Hyundai IONIQ 6",
            price: "₹65/- Lakh , *Estimated Price in India ",
            details: "Hyundai IONIQ 6",
            image: hyu3,
            features: ["UPCOMING",]
          },
        ]
      },
      Honda: {
        name: "Honda",
        cars: [
          {
            name: "Honda Amaze",
            price: "₹7.41 - 10/- Lakh",
            details: "The Honda Amaze is a subcompact sedan that combines Honda's trusted brand value with elegant design, inside and out. Powered by a 90 PS 1.2-litre naturally aspirated petrol engine, it stands as the most powerful car in its segment. The Amaze is the only subcompact sedan in India equipped with ADAS.",
            image: hon1,
            features: ["Petrol", "1199 cc", "110Nm & 89bhp", "Manual / Automatic", "18.65 - 19.46kmpl"]
          },
          {
            name: "Honda City",
            price: "₹11.95 - 16.07/- Lakh",
            details: "The Honda City with its elegant design, an upmarket cabin that is comfortable and a trusty petrol engine make it a great all rounder in its segment. The 2025 Honda City could get model year updates or special editions later this year to keep it relevant in the market.",
            image: hon2,
            features: ["Petrol", "1498 cc", "119.35bhp & 145Nm", "17.8 - 18.4kmpl", "Automatic / Manual"]
          },
          {
            name: "Honda City Hybrid",
            price: "₹19.48/- Lakh",
            details: "Honda City Hybrid price starts at ₹19.48 Lakh. City Hybrid is offered only 1 variant.",
            image: hon3,
            features: ["Petrol", "1498 cc", "96.55bhp & 127Nm", "27.13kmpl", "Automatic"]
          },
          {
            name: "Honda Amaze 2nd Gen",
            price: "₹6.98 - 7.80/- Lakh",
            details: "The Honda Amaze is a subcompact sedan that combines Honda's trusted brand value with elegant design along with segment-best features like ADAS. Powered by a smooth and refined four-cylinder petrol engine, it is the most powerful car in its segment. The Honda Amaze 2025 is sold alongside the second-generation model.",
            image: hon4,
            features: ["Petrol", "1199 cc", "88.5bhp & 110Nm", "18.3 - 18.6kmpl", "Automatic / Manual"]
          },
        ]
      },
      TOYOTA: {
        name: "TOYOTA",
        cars: [
          {
            name: "Toyota Camry",
            price: "₹47.48/- Lakh",
            details: "The new-generation Toyota Camry has undergone significant changes, be it its design, interior, and features. It now comes with an updated 2.5-litre petrol-hybrid powertrain, delivering a combined output of up to 230 PS. Its safety kit now also includes a complete suite of ADAS.",
            image: toy1,
            features: ["Petrol", "2487 cc", "221 Nm & 227 bhp", "Automatic", "25.49 kmpl"]
          },
          {
            name: "Toyota Prius Plug-In Hybrid (2025)",
            price: "₹38.5 - 46.2/- Lakh (estimated, imported model)",
            details: "The 2025 Toyota Prius Plug-In Hybrid features a sleek, futuristic design and an efficient plug-in hybrid system combining a 2.0-litre petrol engine with an electric motor to produce 220 hp. It offers an electric-only driving range of up to 44 miles (≈70 km) and delivers around 52 km/l fuel efficiency in hybrid mode. Inside",
            image: toy2,
            features: ["Plug-in Hybrid (Petrol + Electric)", "1987 cc", "220 hp & e-CVT", "Automatic", "Up to 52 km/l (Hybrid) | 70 km EV range"]
          },
          {
            name: "Toyota Corolla Hybrid (2025)",
            price: "₹22.00 - 27.80/- Lakh",
            details: "The 2025 Toyota Corolla Hybrid brings a refined design, advanced hybrid powertrain (1.8 L petrol + electric motor) with e-CVT, and premium tech & safety including the Toyota Safety Sense suite. It offers strong fuel efficiency (around 24-25 km/l in hybrid form) and modern infotainment and comfort features.",
            image: toy3,
            features: ["Hybrid (Petrol + Electric)", "1798 cc (1.8L) + Electric Motor", "Approx. 120 PS combined / ~142 Nm (hybrid variant)", "Automatic (e-CVT)", "Around 24-25 km/l (hybrid estimated India)"]
          },
          {
            name: "Toyota Mirai (2025)",
            price: "₹43/- Lakh",
            details: "The 2025 Toyota Mirai is a hydrogen fuel-cell electric vehicle (FCEV) that uses hydrogen and oxygen to generate electricity and emit only water vapour. It delivers an EPA-estimated driving range of up to 402 miles (~647 km) on a full tank. The 2025 model is offered in a single trim (XLE) with enhanced standard equipment such as Digital Key.",
            image: toy4,
            features: ["Fuel Cell Electric (Hydrogen)", "182 hp & 221 lb-ft (≈300 Nm)", "Automatic (1-speed direct drive) RWD", "Up to ~647 km (≈402 miles) range; 74 MPGe combined"]
          }
        ]
      },

      Mahindra: {
        name: "Mahindra & Mahindra",
        cars: [
          {
            name: "Mahindra Verito",
            price: "₹7.57 - 9.17/- Lakh",
            details: "The Mahindra Verito is a compact sedan known for its spacious interior and reliable performance. It offers comfortable seating for 5 passengers and comes with both petrol and diesel engine options.",
            image: mahi1,
            features: ["Petrol & Diesel", "1461 cc", "63-64 bhp & 160-160Nm", "19.01 kmpl", "Manual"]
          },
          {
            name: "Mahindra e-Verito",
            price: "₹9.46 - 9.99/- Lakh",
            details: "The Mahindra eVerito is an all-electric version of the Verito sedan. It offers zero emissions and low running costs, making it an eco-friendly choice for urban commuting.",
            image: mahi2,
            features: ["Electric", "72V 3-Phase AC Motor", "31 kW (41.5 bhp) & 91 Nm", "110 km range", "Automatic"]
          },
          {
            name: "Mahindra Verito Vibe",
            price: "₹6.67 - 8.47/- Lakh",
            details: "The Mahindra Verito Vibe is a compact notchback based on the Verito platform. It combines sedan-like comfort with the practicality of a hatchback.",
            image: mahi3,
            features: ["Petrol & Diesel", "1461 cc", "63-64 bhp & 160-160Nm", "18.2-19.01 kmpl", "Manual"]
          }
        ]
      },

      MarutiSuzuki: {
        name: "Maruti Suzuki",
        cars: [
          {
            name: "Maruti Suzuki Dzire",
            price: "₹6.56 - 9.39/- Lakh",
            details: "The Maruti Suzuki Dzire is India's best-selling compact sedan, known for its fuel efficiency, low maintenance costs, and premium features. It offers a perfect blend of style, comfort, and performance.",
            image: masu1,
            features: ["Petrol & CNG", "1197 cc", "88.5-89 bhp & 113-122 Nm", "23.26-31.12 kmpl", "Manual & Automatic"]
          },
          {
            name: "Maruti Suzuki Ciaz",
            price: "₹9.09 - 12.08/- Lakh",
            details: "The Maruti Suzuki Ciaz is a premium mid-size sedan offering spacious interiors, sophisticated styling, and advanced features. It's known for its comfortable ride quality and impressive fuel efficiency.",
            image: masu2,
            features: ["Petrol & Hybrid", "1462 cc", "101.64 bhp & 136 Nm", "20.04-21.56 kmpl", "Manual & Automatic"]
          },
          {
            name: "Maruti Suzuki Swift Dzire Tour",
            price: "₹6.38 - 6.95/- Lakh",
            details: "The Swift Dzire Tour is specifically designed for commercial use and fleet operators. It offers reliable performance, low running costs, and durable build quality for extensive daily use.",
            image: masu3,
            features: ["Petrol & CNG", "1197 cc", "88.5 bhp & 113 Nm", "23.26-31.12 kmpl", "Manual"]
          },
        ]
      },

      Skoda: {
        name: "Škoda",
        cars: [
          {
            name: "Skoda Slavia",
            price: "₹11.53 - 19.13/- Lakh",
            details: "The Skoda Slavia is a premium mid-size sedan that combines European design with superior build quality. It features a spacious interior, advanced safety features, and powerful TSI engines.",
            image: skoda1,
            features: ["Petrol", "999 cc & 1498 cc", "113.42-147.5 bhp & 178-250 Nm", "18-19.47 kmpl", "Manual & Automatic"]
          },
          {
            name: "Skoda Octavia",
            price: "₹29 - 33/- Lakh",
            details: "The Skoda Octavia is a premium executive sedan known for its sophisticated design, luxurious features, and exceptional driving dynamics. It offers a perfect blend of performance, comfort, and technology.",
            image: skoda2,
            features: ["Petrol", "1984 cc", "187.74 bhp & 320 Nm", "15.81 kmpl", "Automatic"]
          },
          {
            name: "Skoda Superb",
            price: "₹54- 58/- Lakh",
            details: "The Skoda Superb is a luxury flagship sedan that offers immense space, premium features, and powerful performance. It's known for its 'Simply Clever' features and exceptional comfort.",
            image: skoda3,
            features: ["Petrol", "1984 cc", "187.74 bhp & 320 Nm", "14.12 kmpl", "Automatic"]
          }
        ]
      },
      Kia: {
        name: "KIA",
        cars: [
          {
            name: "Kia K5",
            price: "₹25 - 30/- Lakh",
            details: "The Kia K5 is a stylish mid-size sedan known for its bold design, advanced technology, and powerful turbocharged engines. It offers sporty performance with premium features.",
            image: kia1,
            features: ["Petrol", "2497 cc & 1999 cc", "180-286 bhp & 241-422 Nm", "13-15 kmpl", "Automatic"]
          },
          {
            name: "Kia Rio Sedan",
            price: "₹12 - 15/- Lakh",
            details: "The Kia Rio Sedan is a compact executive car offering excellent value, fuel efficiency, and modern features in a stylish package. Perfect for urban commuting.",
            image: kia2,
            features: ["Petrol", "1497 cc", "118 bhp & 146 Nm", "17-19 kmpl", "Manual & Automatic"]
          },
          {
            name: "Kia Stinger",
            price: "₹55 - 65/- Lakh",
            details: "The Kia Stinger is a high-performance sports sedan with rear-wheel drive, powerful engine options, and luxurious interiors. It combines sports car performance with sedan practicality.",
            image: kia3,
            features: ["Petrol", "2199 cc & 3342 cc", "255-365 bhp & 353-510 Nm", "10-12 kmpl", "Automatic"]
          },
          {
            name: "Kia Cerato",
            price: "₹18 - 22/- Lakh",
            details: "The Kia Cerato is a compact sedan offering sophisticated styling, advanced safety features, and efficient performance. Known for its reliability and modern design.",
            image: kia4,
            features: ["Petrol", "1999 cc", "152 bhp & 192 Nm", "15-17 kmpl", "Manual & Automatic"]
          },
          {
            name: "Kia K8",
            price: "₹35 - 45/- Lakh",
            details: "The Kia K8 is a premium executive sedan featuring bold design with diamond-inspired patterns, luxurious interiors, and advanced technology. It replaces the Kia Cadenza in global markets.",
            image: kia5,
            features: ["Petrol", "3470 cc", "296 bhp & 359 Nm", "12-14 kmpl", "8-Speed Automatic"]
          },
          {
            name: "Kia Forte",
            price: "₹15 - 20/- Lakh",
            details: "The Kia Forte is a compact sedan offering excellent value, modern styling, and fuel-efficient performance. Known for its reliability and comprehensive feature set.",
            image: kia6,
            features: ["Petrol", "1999 cc", "147 bhp & 179 Nm", "16-18 kmpl", "CVT Automatic"]
          },
        ]
      },

      nissan: {
        name: "NISSAN",
        cars: [
          {
            name: "Nissan Altima",
            price: "₹25 - 32/- Lakh",
            details: "The Nissan Altima is a mid-size sedan known for its comfortable ride, spacious interior, and available all-wheel drive. Features modern styling and advanced safety technologies.",
            image: ni1,
            features: ["Petrol", "2488 cc", "188 bhp & 244 Nm", "15-17 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Sentra",
            price: "₹18 - 23/- Lakh",
            details: "The Nissan Sentra is a compact sedan offering stylish design, fuel efficiency, and modern technology features. Known for its comfortable cabin and smooth ride quality.",
            image: ni2,
            features: ["Petrol", "1998 cc", "149 bhp & 198 Nm", "16-18 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Versa",
            price: "₹12 - 16/- Lakh",
            details: "The Nissan Versa is a subcompact sedan that offers exceptional value, great fuel economy, and surprising interior space for its class.",
            image: ni3,
            features: ["Petrol", "1498 cc", "122 bhp & 154 Nm", "18-20 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Sylphy",
            price: "₹20 - 25/- Lakh",
            details: "The Nissan Sylphy is a global compact sedan known for its premium features, comfortable ride, and fuel-efficient performance. Popular in Asian markets.",
            image: ni4,
            features: ["Petrol", "1498 cc & 1998 cc", "122-150 bhp & 154-200 Nm", "17-19 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Maxima",
            price: "₹40 - 48/- Lakh",
            details: "The Nissan Maxima is a full-size sports sedan with premium features, powerful V6 engine, and sporty styling. Known as the '4-Door Sports Car'.",
            image: ni5,
            features: ["Petrol", "3498 cc", "300 bhp & 354 Nm", "12-14 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Skyline",
            price: "₹45 - 60/- Lakh",
            details: "The Nissan Skyline is an iconic sports sedan known for its performance heritage and advanced technology. Features powerful engines and premium luxury features.",
            image: ni6,
            features: ["Petrol", "2997 cc & 3799 cc", "400-565 bhp & 475-600 Nm", "10-12 kmpl", "Automatic"]
          },
          {
            name: "Nissan Almera",
            price: "₹15 - 20/- Lakh",
            details: "The Nissan Almera is a compact sedan offering great fuel efficiency, comfortable interior, and reliable performance. Popular in global markets.",
            image: ni7,
            features: ["Petrol", "1498 cc", "99 bhp & 134 Nm", "17-19 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Sunny",
            price: "₹12 - 16/- Lakh",
            details: "The Nissan Sunny is a reliable compact sedan known for its spacious cabin, fuel efficiency, and affordable maintenance costs.",
            image: ni8,
            features: ["Petrol", "1498 cc", "98 bhp & 132 Nm", "17-19 kmpl", "Manual & CVT"]
          },
          {
            name: "Nissan Teana",
            price: "₹30 - 38/- Lakh",
            details: "The Nissan Teana is a premium executive sedan offering luxurious comfort, advanced features, and smooth V6 performance.",
            image: ni9,
            features: ["Petrol", "2495 cc & 3498 cc", "180-252 bhp & 228-334 Nm", "12-14 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Cima",
            price: "₹65 - 80/- Lakh",
            details: "The Nissan Cima is a flagship luxury sedan with premium features, spacious interior, and powerful performance. Competes with German luxury sedans.",
            image: ni10,
            features: ["Petrol Hybrid", "3498 cc", "360 bhp & 350 Nm", "14-16 kmpl", "7-Speed Automatic"]
          },
          {
            name: "Nissan Bluebird",
            price: "₹18 - 22/- Lakh",
            details: "The Nissan Bluebird is a classic mid-size sedan known for its reliability, comfortable ride, and practical design.",
            image: ni11,
            features: ["Petrol", "1998 cc", "140 bhp & 192 Nm", "15-17 kmpl", "CVT Automatic"]
          },
          {
            name: "Nissan Pulsar",
            price: "₹16 - 21/- Lakh",
            details: "The Nissan Pulsar is a sporty compact sedan offering dynamic styling, engaging driving experience, and modern features.",
            image: ni12,
            features: ["Petrol", "1598 cc & 1997 cc", "110-190 bhp & 154-240 Nm", "15-17 kmpl", "Manual & CVT"]
          }
        ]
      },

      fiat: {
        name: "Fiat",
        cars: [
          {
            name: "Fiat Tipo",
            price: "₹12 - 16/- Lakh",
            details: "The Fiat Tipo is a compact sedan offering European styling, spacious interior, and efficient engine options. Known for its practical design and comfortable ride.",
            image: fiat1,
            features: ["Petrol & Diesel", "1368 cc & 1598 cc", "95-120 bhp & 215-320 Nm", "16-20 kmpl", "Manual & Automatic"]
          },
          {
            name: "Fiat Cronos",
            price: "₹10 - 14/- Lakh",
            details: "The Fiat Cronos is a subcompact sedan designed for emerging markets, offering modern features, fuel efficiency, and attractive pricing.",
            image: fiat2,
            features: ["Petrol", "1368 cc", "101 bhp & 136 Nm", "17-19 kmpl", "Manual & CVT"]
          },
          {
            name: "Fiat Linea",
            price: "₹14 - 18/- Lakh",
            details: "The Fiat Linea is a premium compact sedan known for its Italian design, comfortable ride quality, and engaging driving dynamics.",
            image: fiat3,
            features: ["Petrol & Diesel", "1368 cc & 1598 cc", "112-114 bhp & 207-321 Nm", "15-20 kmpl", "Manual"]
          },
          {
            name: "Fiat Siena",
            price: "₹8 - 11/- Lakh",
            details: "The Fiat Siena is an entry-level compact sedan offering basic transportation with Fiat's reliability and practical design for budget-conscious buyers.",
            image: fiat4,
            features: ["Petrol", "1242 cc & 1368 cc", "85-101 bhp & 115-136 Nm", "18-21 kmpl", "Manual"]
          },
          {
            name: "Fiat 124",
            price: "₹25 - 30/- Lakh",
            details: "The Fiat 124 is a classic sports sedan with modern interpretation, featuring rear-wheel drive, lively performance, and iconic Italian styling.",
            image: fiat5,
            features: ["Petrol", "1368 cc", "170 bhp & 250 Nm", "14-16 kmpl", "Manual & Automatic"]
          }
        ]
      },

      volkswagen: {
        name: "Volkswagen",
        cars: [
          { name: "Volkswagen Virtus", price: "₹11.56 - 19.41/- Lakh", details: "Premium compact sedan with European styling", image: vw1, features: ["Petrol", "999cc & 1498cc", "114-148 bhp", "17-20 kmpl", "Manual & Automatic"] },
          { name: "Volkswagen Jetta", price: "₹20 - 25/- Lakh", details: "Executive sedan with German engineering", image: vw2, features: ["Petrol & Diesel", "1395cc & 1968cc", "150 bhp", "18-22 kmpl", "Automatic"] },
          { name: "Volkswagen Passat", price: "₹30 - 35/- Lakh", details: "Premium business sedan", image: vw3, features: ["Petrol & Diesel", "1984cc", "190 bhp", "16-20 kmpl", "Automatic"] },
          { name: "Volkswagen Arteon", price: "₹40 - 45/- Lakh", details: "Luxury fastback sedan", image: vw4, features: ["Petrol", "1984cc", "190-280 bhp", "14-17 kmpl", "Automatic"] }
        ]
      },

      bmw: {
        name: "BMW",
        cars: [
          { name: "BMW 3 Series", price: "₹45.90 - 64.90/- Lakh", details: "Sports executive sedan", image: bm1, features: ["Petrol & Diesel", "1998cc & 2993cc", "190-374 bhp", "12-20 kmpl", "Automatic"] },
          { name: "BMW 5 Series", price: "₹65 - 75/- Lakh", details: "Luxury business sedan", image: bm2, features: ["Petrol & Diesel", "1998cc & 2993cc", "248-375 bhp", "14-18 kmpl", "Automatic"] },
          { name: "BMW 7 Series", price: "₹1.50 - 2.50/- Cr", details: "Flagship luxury sedan", image: bm3, features: ["Petrol & Diesel", "2998cc & 4395cc", "375-530 bhp", "10-15 kmpl", "Automatic"] },
          { name: "BMW 8 Series", price: "₹1.80 - 2.20/- Cr", details: "Luxury sports sedan", image: bm4, features: ["Petrol", "2998cc & 4395cc", "335-530 bhp", "10-13 kmpl", "Automatic"] }
        ]
      },
      lexus: {
        name: "Lexus",
        cars: [
          { name: "Lexus ES", price: "₹59 - 65/- Lakh", details: "Executive luxury sedan", image: le1, features: ["Petrol Hybrid", "2487cc", "215 bhp", "22-25 kmpl", "CVT"] },
          { name: "Lexus LS", price: "₹1.80 - 2.20/- Cr", details: "Flagship luxury sedan", image: le2, features: ["Petrol Hybrid", "3456cc", "354 bhp", "15-18 kmpl", "Automatic"] },
          { name: "Lexus IS", price: "₹55 - 60/- Lakh", details: "Compact sports sedan", image: le3, features: ["Petrol", "1998cc", "241 bhp", "14-16 kmpl", "Automatic"] },
          { name: "Lexus GS", price: "₹75 - 85/- Lakh", details: "Executive sports sedan", image: le4, features: ["Petrol", "2494cc & 3456cc", "215-311 bhp", "12-15 kmpl", "Automatic"] }
        ]
      },
      genesis: {
        name: "Genesis",
        cars: [
          { name: "Genesis G70", price: "₹50 - 60/- Lakh", details: "Compact executive sedan", image: ge1, features: ["Petrol", "1998cc & 3342cc", "252-365 bhp", "12-15 kmpl", "Automatic"] },
          { name: "Genesis G80", price: "₹65 - 75/- Lakh", details: "Executive luxury sedan", image: ge2, features: ["Petrol", "2497cc & 3498cc", "300-375 bhp", "11-14 kmpl", "Automatic"] },
          { name: "Genesis G90", price: "₹85 - 95/- Lakh", details: "Flagship luxury sedan", image: ge3, features: ["Petrol", "3498cc", "370 bhp", "10-12 kmpl", "Automatic"] },
          { name: "Genesis G80 Electric", price: "₹70 - 80/- Lakh", details: "Electric luxury sedan", image: ge4, features: ["Electric", "Dual Motor", "370 bhp", "520 km range", "Automatic"] }
        ]
      },
      tata: {
        name: "Tata Motors",
        cars: [
          { name: "Tata Tigor", price: "₹6.30 - ₹8.70/- Lakh", details: "Compact sedan with style", image: ta1, features: ["Petrol & CNG", "1199cc", "84-73 bhp", "20-26 kmpl", "Manual & Automatic"] },
          { name: "Tata Indigo", price: "₹5.50 - ₹7.50/- Lakh", details: "Budget family sedan", image: ta2, features: ["Petrol & Diesel", "1396cc & 1405cc", "69-90 bhp", "17-25 kmpl", "Manual"] },
          { name: "Tata Manza", price: "₹7 - ₹9/- Lakh", details: "Premium compact sedan", image: ta3, features: ["Petrol & Diesel", "1368cc & 1248cc", "89-89 bhp", "17-21 kmpl", "Manual"] },
          { name: "Tata Indigo eCS", price: "₹5 - ₹6.50/- Lakh", details: "Entry-level compact sedan", image: ta4, features: ["Petrol & Diesel", "1396cc & 1405cc", "69-70 bhp", "18-25 kmpl", "Manual"] }
        ]
      },
      ford: {
        name: "Ford",
        cars: [
          { name: "Ford Fiesta", price: "₹15 - ₹20/- Lakh", details: "Sporty compact sedan", image: ford1, features: ["Petrol & Diesel", "1499cc & 1498cc", "120-153 bhp", "16-24 kmpl", "Manual & Automatic"] },
          { name: "Ford Fusion", price: "₹25 - ₹30/- Lakh", details: "Mid-size sedan with hybrid", image: ford2, features: ["Petrol Hybrid", "1999cc & 2499cc", "158-188 bhp", "18-23 kmpl", "Automatic"] },
          { name: "Ford Taurus", price: "₹35 - ₹40/- Lakh", details: "Full-size sedan", image: ford3, features: ["Petrol", "3496cc", "288 bhp", "12-14 kmpl", "Automatic"] },
          { name: "Ford Mondeo", price: "₹28 - ₹33/- Lakh", details: "Executive sedan", image: ford4, features: ["Petrol & Diesel", "1499cc & 1997cc", "160-210 bhp", "16-22 kmpl", "Automatic"] }
        ]
      },
      chevrolet: {
        name: "Chevrolet",
        cars: [
          { name: "Chevrolet Cruze", price: "₹18 - ₹22/- Lakh", details: "Sporty compact sedan", image: chev1, features: ["Petrol & Diesel", "1399cc & 1998cc", "156-163 bhp", "15-26 kmpl", "Manual & Automatic"] },
          { name: "Chevrolet Malibu", price: "₹25 - ₹30/- Lakh", details: "Mid-size sedan", image: chev2, features: ["Petrol", "1490cc & 1998cc", "160-250 bhp", "15-18 kmpl", "Automatic"] },
          { name: "Chevrolet Impala", price: "₹40 - ₹45/- Lakh", details: "Classic American sedan", image: chev3, features: ["Petrol", "3564cc", "305 bhp", "11-13 kmpl", "Automatic"] },
          { name: "Chevrolet Sonic", price: "₹12 - ₹15/- Lakh", details: "Compact sedan", image: chev4, features: ["Petrol", "1399cc", "138 bhp", "17-19 kmpl", "Manual & Automatic"] }
        ]
      },
      tesla: {
        name: "Tesla",
        cars: [
          { name: "Tesla Model 3", price: "₹60 - ₹70/- Lakh", details: "Electric executive sedan", image: tesla1, features: ["Electric", "Dual Motor", "283-503 bhp", "491-629 km range", "Automatic"] },
          { name: "Tesla Model S", price: "₹1.20 - ₹1.50/- Cr", details: "Electric luxury sedan", image: tesla2, features: ["Electric", "Triple Motor", "670-1020 bhp", "652-837 km range", "Automatic"] },
          { name: "Tesla Model S Plaid", price: "₹1.80 - ₹2/- Cr", details: "High-performance electric sedan", image: tesla3, features: ["Electric", "Triple Motor", "1020 bhp", "837 km range", "Automatic"] },
          { name: "Tesla Model 3 Performance", price: "₹75 - ₹80/- Lakh", details: "Sporty electric sedan", image: tesla4, features: ["Electric", "Dual Motor", "503 bhp", "629 km range", "Automatic"] }
        ]
      },
      mazda: {
        name: "Mazda",
        cars: [
          { name: "Mazda 3", price: "₹20 - ₹25/- Lakh", details: "Premium compact sedan", image: mazda1, features: ["Petrol", "1998cc", "121-162 bhp", "16-18 kmpl", "Automatic"] },
          { name: "Mazda 6", price: "₹30 - ₹35/- Lakh", details: "Executive sports sedan", image: mazda2, features: ["Petrol", "2488cc", "187 bhp", "14-16 kmpl", "Automatic"] },
          { name: "Mazda 2 Sedan", price: "₹15 - ₹18/- Lakh", details: "Compact sedan", image: mazda3, features: ["Petrol", "1496cc", "114 bhp", "18-20 kmpl", "Automatic"] },
          { name: "Mazda 929", price: "₹40 - ₹45/- Lakh", details: "Classic luxury sedan", image: mazda4, features: ["Petrol", "2954cc", "200 bhp", "10-12 kmpl", "Automatic"] }
        ]
      },
      mitsubishi: {
        name: "Mitsubishi",
        cars: [
          { name: "Mitsubishi Lancer", price: "₹18 - ₹22/- Lakh", details: "Sporty compact sedan", image: mits1, features: ["Petrol", "1998cc", "146 bhp", "15-17 kmpl", "Manual & CVT"] },
          { name: "Mitsubishi Galant", price: "₹25 - ₹30/- Lakh", details: "Mid-size family sedan", image: mits2, features: ["Petrol", "2378cc", "160 bhp", "13-15 kmpl", "Automatic"] },
          { name: "Mitsubishi Mirage G4", price: "₹12 - ₹15/- Lakh", details: "Compact economy sedan", image: mits3, features: ["Petrol", "1193cc", "76 bhp", "20-22 kmpl", "CVT"] },
          { name: "Mitsubishi Diamante", price: "₹35 - ₹40/- Lakh", details: "Executive luxury sedan", image: mits4, features: ["Petrol", "2497cc & 3497cc", "175-245 bhp", "11-13 kmpl", "Automatic"] }
        ]
      },
      subaru: {
        name: "Subaru",
        cars: [
          { name: "Subaru Legacy", price: "₹35 - 40/- Lakh", details: "All-wheel drive sedan", image: suba1, features: ["Petrol", "2498cc & 2600cc", "182-260 bhp", "14-16 kmpl", "CVT"] },
          { name: "Subaru Impreza", price: "₹25 - 30/- Lakh", details: "Compact AWD sedan", image: suba2, features: ["Petrol", "1995cc", "152 bhp", "16-18 kmpl", "CVT"] },
          { name: "Subaru WRX", price: "₹45 - 50/- Lakh", details: "Performance sports sedan", image: suba3, features: ["Petrol", "2457cc", "268 bhp", "12-14 kmpl", "Manual & CVT"] },
          { name: "Subaru Levorg", price: "₹40 - 45/- Lakh", details: "Sports touring sedan", image: suba4, features: ["Petrol", "1998cc", "268 bhp", "14-16 kmpl", "CVT"] }
        ]
      },
      volvo: {
        name: "Volvo",
        cars: [
          { name: "Volvo S60", price: "₹45 - 50/- Lakh", details: "Premium compact sedan", image: volvo1, features: ["Petrol", "1969cc", "250 bhp", "15-17 kmpl", "Automatic"] },
          { name: "Volvo S90", price: "₹60 - 65/- Lakh", details: "Executive luxury sedan", image: volvo2, features: ["Petrol", "1969cc", "250 bhp", "14-16 kmpl", "Automatic"] },
          { name: "Volvo S40", price: "₹35 - 40/- Lakh", details: "Compact executive sedan", image: volvo3, features: ["Petrol & Diesel", "1595cc & 1984cc", "150-177 bhp", "16-20 kmpl", "Automatic"] },
          { name: "Volvo S80", price: "₹55 - 60/- Lakh", details: "Executive business sedan", image: volvo4, features: ["Petrol & Diesel", "1984cc & 2400cc", "190-205 bhp", "14-18 kmpl", "Automatic"] }
        ]
      },
      peugeot: {
        name: "Peugeot",
        cars: [
          { name: "Peugeot 508", price: "₹35 - 40/- Lakh", details: "Executive fastback sedan", image: peu1, features: ["Petrol & Diesel", "1199cc & 1997cc", "130-225 bhp", "17-23 kmpl", "Automatic"] },
          { name: "Peugeot 408", price: "₹25 - 30/- Lakh", details: "Compact fastback sedan", image: peu2, features: ["Petrol", "1199cc", "130 bhp", "18-20 kmpl", "Automatic"] },
          { name: "Peugeot 301", price: "₹15 - 18/- Lakh", details: "Compact budget sedan", image: peu3, features: ["Petrol", "1199cc", "82 bhp", "19-21 kmpl", "Manual"] },
          { name: "Peugeot 607", price: "₹45 - 50/- Lakh", details: "Executive luxury sedan", image: peu4, features: ["Petrol & Diesel", "1997cc & 2179cc", "140-204 bhp", "14-18 kmpl", "Automatic"] }
        ]
      },
      porsche: {
        name: "Porsche",
        cars: [
          { name: "Porsche Panamera", price: "₹1.50 - 2.50/- Cr", details: "Luxury sports sedan", image: por1, features: ["Petrol Hybrid", "2894cc & 3996cc", "330-690 bhp", "10-15 kmpl", "Automatic"] },
          { name: "Porsche Taycan", price: "₹1.80 - 2.80/- Cr", details: "Electric sports sedan", image: por2, features: ["Electric", "Dual Motor", "476-761 bhp", "430-484 km range", "Automatic"] },
          { name: "Porsche Panamera Sport Turismo", price: "₹1.60 - 2.60/- Cr", details: "Luxury sports wagon", image: por3, features: ["Petrol Hybrid", "2894cc & 3996cc", "330-680 bhp", "11-16 kmpl", "Automatic"] },
          { name: "Porsche Taycan Cross Turismo", price: "₹1.90 - 2.90/- Cr", details: "Electric crossover sedan", image: por4, features: ["Electric", "Dual Motor", "476-761 bhp", "415-456 km range", "Automatic"] }
        ]
      },
      cadillac: {
        name: "Cadillac",
        cars: [
          { name: "Cadillac CT4", price: "₹55 - 60/- Lakh", details: "Compact luxury sedan", image: cad1, features: ["Petrol", "1998cc & 2198cc", "237-325 bhp", "12-14 kmpl", "Automatic"] },
          { name: "Cadillac CT5", price: "₹65 - 70/- Lakh", details: "Executive luxury sedan", image: cad2, features: ["Petrol", "1998cc & 3564cc", "237-360 bhp", "11-13 kmpl", "Automatic"] },
          { name: "Cadillac CT6", price: "₹85 - 90/- Lakh", details: "Flagship luxury sedan", image: cad3, features: ["Petrol", "1998cc & 3564cc", "237-404 bhp", "10-12 kmpl", "Automatic"] },
          { name: "Cadillac XTS", price: "₹75 - 80/- Lakh", details: "Full-size luxury sedan", image: cad4, features: ["Petrol", "3564cc", "304 bhp", "11-13 kmpl", "Automatic"] }
        ]
      },
      acura: {
        name: "Acura",
        cars: [
          { name: "Acura TLX", price: "₹55 - 60/- Lakh", details: "Premium sports sedan", image: acu1, features: ["Petrol", "1993cc & 3493cc", "272-355 bhp", "12-15 kmpl", "Automatic"] },
          { name: "Acura RLX", price: "₹80 - 85/- Lakh", details: "Executive luxury sedan", image: acu2, features: ["Petrol Hybrid", "3471cc", "377 bhp", "14-16 kmpl", "Automatic"] },
          { name: "Acura ILX", price: "₹45 - 50/- Lakh", details: "Compact luxury sedan", image: acu3, features: ["Petrol", "1997cc", "201 bhp", "15-17 kmpl", "Automatic"] },
          { name: "Acura TSX", price: "₹50 - 55/- Lakh", details: "Executive sports sedan", image: acu4, features: ["Petrol", "1997cc & 2354cc", "201-205 bhp", "14-16 kmpl", "Automatic"] }
        ]
      }
    }
  },


suv: {
  title: "Luxury SUVs",
  description: "Commanding presence with premium comfort",
  brands: {
    toyota: {
      name: "Toyota",
      cars: [
        { name: "Toyota Fortuner", price: "₹32.59 - 50.44/- Lakh", details: "Premium SUV with rugged capability", image: suvtoy1, features: ["Diesel", "2755 cc", "201 bhp & 500 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Toyota Land Cruiser", price: "₹1.47 - 2.17/- Cr", details: "Legendary off-road luxury SUV", image: suvtoy2, features: ["Petrol", "3445 cc", "309 bhp & 700 Nm", "8-10 kmpl", "Automatic"] },
        { name: "Toyota RAV4", price: "₹35.00 - 40/- Lakh", details: "Compact crossover SUV", image: suvtoy3, features: ["Petrol Hybrid", "2487 cc", "219 bhp", "18-20 kmpl", "Automatic"] },
        { name: "Toyota Highlander", price: "₹55.00 - 60/- Lakh", details: "Premium family SUV", image: suvtoy4, features: ["Petrol Hybrid", "2487 cc", "243 bhp", "16-18 kmpl", "Automatic"] }
      ]
    },
    honda: {
      name: "Honda",
      cars: [
        { name: "Honda CR-V", price: "₹28.15 - ₹34.39 Lakh", details: "Premium compact SUV", image: "#", features: ["Petrol", "1997 cc", "190 bhp & 243 Nm", "16-18 kmpl", "Automatic"] },
        { name: "Honda Elevate", price: "₹11.00 - ₹16.00 Lakh", details: "Compact urban SUV", image: "#", features: ["Petrol", "1498 cc", "119 bhp & 145 Nm", "16-18 kmpl", "Manual & CVT"] },
        { name: "Honda Pilot", price: "₹45.00 - ₹50.00 Lakh", details: "Full-size family SUV", image: "#", features: ["Petrol", "3471 cc", "280 bhp & 355 Nm", "12-14 kmpl", "Automatic"] },
        { name: "Honda HR-V", price: "₹20.00 - ₹25.00 Lakh", details: "Subcompact crossover SUV", image: "#", features: ["Petrol", "1498 cc", "119 bhp & 145 Nm", "17-19 kmpl", "CVT"] }
      ]
    },
    mercedes: {
      name: "Mercedes-Benz",
      cars: [
        { name: "Mercedes-Benz GLC", price: "₹57.50 - ₹65.00 Lakh", details: "Luxury compact SUV", image: "#", features: ["Petrol", "1991 cc", "255 bhp & 400 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Mercedes-Benz GLE", price: "₹85.00 - ₹95.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol & Diesel", "1991 cc & 2925 cc", "265-325 bhp", "12-15 kmpl", "Automatic"] },
        { name: "Mercedes-Benz GLS", price: "₹1.10 - ₹1.30 Cr", details: "Full-size luxury SUV", image: "#", features: ["Petrol & Diesel", "2999 cc & 2925 cc", "325-394 bhp", "10-13 kmpl", "Automatic"] },
        { name: "Mercedes-Benz G-Class", price: "₹1.65 - ₹2.50 Cr", details: "Iconic off-road luxury SUV", image: "#", features: ["Petrol & Diesel", "2999 cc & 2925 cc", "286-577 bhp", "8-11 kmpl", "Automatic"] }
      ]
    },
    bmw: {
      name: "BMW",
      cars: [
        { name: "BMW X1", price: "₹45.90 - ₹50.90 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1499 cc", "134 bhp & 230 Nm", "16-18 kmpl", "Automatic"] },
        { name: "BMW X3", price: "₹65.50 - ₹72.50 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol & Diesel", "1998 cc", "190-252 bhp", "14-17 kmpl", "Automatic"] },
        { name: "BMW X5", price: "₹79.90 - ₹95.90 Lakh", details: "Premium luxury SUV", image: "#", features: ["Petrol & Diesel", "2998 cc", "265-335 bhp", "12-15 kmpl", "Automatic"] },
        { name: "BMW X7", price: "₹1.22 - ₹1.63 Cr", details: "Flagship luxury SUV", image: "#", features: ["Petrol & Diesel", "2998 cc & 2993 cc", "335-390 bhp", "11-14 kmpl", "Automatic"] }
      ]
    },
    audi: {
      name: "Audi",
      cars: [
        { name: "Audi Q3", price: "₹45.00 - ₹50.00 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1395 cc", "150 bhp & 250 Nm", "16-18 kmpl", "Automatic"] },
        { name: "Audi Q5", price: "₹65.00 - ₹72.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol & Diesel", "1984 cc", "245 bhp & 370 Nm", "14-17 kmpl", "Automatic"] },
        { name: "Audi Q7", price: "₹85.00 - ₹95.00 Lakh", details: "Premium luxury SUV", image: "#", features: ["Petrol & Diesel", "2995 cc", "340 bhp & 500 Nm", "12-15 kmpl", "Automatic"] },
        { name: "Audi Q8", price: "₹1.02 - ₹1.25 Cr", details: "Coupe-style luxury SUV", image: "#", features: ["Petrol", "2995 cc", "340 bhp & 500 Nm", "11-14 kmpl", "Automatic"] }
      ]
    },
    volvo: {
      name: "Volvo",
      cars: [
        { name: "Volvo XC40", price: "₹45.00 - ₹50.00 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1969 cc", "197 bhp & 300 Nm", "15-17 kmpl", "Automatic"] },
        { name: "Volvo XC60", price: "₹65.00 - ₹70.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol", "1969 cc", "250 bhp & 350 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Volvo XC90", price: "₹90.00 - ₹95.00 Lakh", details: "Premium luxury SUV", image: "#", features: ["Petrol", "1969 cc", "300 bhp & 420 Nm", "13-15 kmpl", "Automatic"] },
        { name: "Volvo EX90", price: "₹1.10 - ₹1.20 Cr", details: "Electric luxury SUV", image: "#", features: ["Electric", "Dual Motor", "517 bhp", "600 km range", "Automatic"] }
      ]
    },
    landrover: {
      name: "Land Rover",
      cars: [
        { name: "Range Rover Evoque", price: "₹67.00 - ₹72.00 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1997 cc", "200 bhp & 320 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Range Rover Velar", price: "₹85.00 - ₹90.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol & Diesel", "1997 cc & 2999 cc", "250-400 bhp", "13-16 kmpl", "Automatic"] },
        { name: "Range Rover Sport", price: "₹1.05 - ₹1.25 Cr", details: "Performance luxury SUV", image: "#", features: ["Petrol & Diesel", "2999 cc & 4999 cc", "355-575 bhp", "10-14 kmpl", "Automatic"] },
        { name: "Range Rover", price: "₹2.00 - ₹3.50 Cr", details: "Flagship luxury SUV", image: "#", features: ["Petrol & Diesel", "2999 cc & 4999 cc", "400-565 bhp", "9-13 kmpl", "Automatic"] }
      ]
    },
    porsche: {
      name: "Porsche",
      cars: [
        { name: "Porsche Macan", price: "₹85.00 - ₹1.10 Cr", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1984 cc & 2894 cc", "265-440 bhp", "12-15 kmpl", "Automatic"] },
        { name: "Porsche Cayenne", price: "₹1.25 - ₹2.00 Cr", details: "Executive luxury SUV", image: "#", features: ["Petrol", "2995 cc & 3996 cc", "340-641 bhp", "10-14 kmpl", "Automatic"] },
        { name: "Porsche Cayenne Coupe", price: "₹1.35 - ₹2.10 Cr", details: "Coupe-style luxury SUV", image: "#", features: ["Petrol", "2995 cc & 3996 cc", "340-641 bhp", "10-13 kmpl", "Automatic"] }
      ]
    },
    lexus: {
      name: "Lexus",
      cars: [
        { name: "Lexus UX", price: "₹40.00 - ₹45.00 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol Hybrid", "1987 cc", "181 bhp", "21-23 kmpl", "CVT"] },
        { name: "Lexus NX", price: "₹60.00 - ₹65.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol Hybrid", "2487 cc", "239 bhp", "18-20 kmpl", "CVT"] },
        { name: "Lexus RX", price: "₹95.00 - ₹1.05 Cr", details: "Premium luxury SUV", image: "#", features: ["Petrol Hybrid", "2487 cc & 3456 cc", "308-366 bhp", "16-18 kmpl", "Automatic"] },
        { name: "Lexus LX", price: "₹2.00 - ₹2.50 Cr", details: "Full-size luxury SUV", image: "#", features: ["Petrol", "3445 cc", "409 bhp & 650 Nm", "8-10 kmpl", "Automatic"] }
      ]
    },
    jaguar: {
      name: "Jaguar",
      cars: [
        { name: "Jaguar E-PACE", price: "₹70.00 - ₹75.00 Lakh", details: "Compact luxury SUV", image: "#", features: ["Petrol", "1997 cc", "200 bhp & 320 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Jaguar F-PACE", price: "₹75.00 - ₹85.00 Lakh", details: "Executive luxury SUV", image: "#", features: ["Petrol & Diesel", "1997 cc & 2999 cc", "250-400 bhp", "13-16 kmpl", "Automatic"] },
        { name: "Jaguar I-PACE", price: "₹1.20 - ₹1.30 Cr", details: "Electric luxury SUV", image: "#", features: ["Electric", "Dual Motor", "400 bhp", "470 km range", "Automatic"] }
      ]
    },
    volkswagen: {
      name: "Volkswagen",
      cars: [
        { name: "Volkswagen Taigun", price: "₹11.00 - ₹19.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol", "999 cc & 1498 cc", "114-148 bhp", "17-20 kmpl", "Manual & Automatic"] },
        { name: "Volkswagen Tiguan", price: "₹35.00 - ₹40.00 Lakh", details: "Premium SUV", image: "#", features: ["Petrol", "1984 cc", "190 bhp & 320 Nm", "14-16 kmpl", "Automatic"] },
        { name: "Volkswagen Touareg", price: "₹80.00 - ₹85.00 Lakh", details: "Luxury SUV", image: "#", features: ["Petrol & Diesel", "2967 cc & 2698 cc", "286-340 bhp", "12-15 kmpl", "Automatic"] }
      ]
    },
    skoda: {
      name: "Skoda",
      cars: [
        { name: "Skoda Kushaq", price: "₹11.00 - ₹19.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol", "999 cc & 1498 cc", "114-148 bhp", "17-20 kmpl", "Manual & Automatic"] },
        { name: "Skoda Kodiaq", price: "₹40.00 - ₹45.00 Lakh", details: "Premium SUV", image: "#", features: ["Petrol", "1984 cc", "190 bhp & 320 Nm", "14-16 kmpl", "Automatic"] }
      ]
    },
    hyundai: {
      name: "Hyundai",
      cars: [
        { name: "Hyundai Creta", price: "₹11.00 - ₹20.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol & Diesel", "1497 cc & 1493 cc", "113-115 bhp", "17-21 kmpl", "Manual & Automatic"] },
        { name: "Hyundai Venue", price: "₹7.50 - ₹13.00 Lakh", details: "Subcompact SUV", image: "#", features: ["Petrol & Diesel", "1197 cc & 1493 cc", "81-115 bhp", "18-24 kmpl", "Manual & Automatic"] },
        { name: "Hyundai Tucson", price: "₹30.00 - ₹35.00 Lakh", details: "Premium SUV", image: "#", features: ["Petrol & Diesel", "1999 cc", "152-182 bhp", "15-18 kmpl", "Automatic"] },
        { name: "Hyundai Santa Fe", price: "₹45.00 - ₹50.00 Lakh", details: "Full-size SUV", image: "#", features: ["Petrol", "2199 cc", "202 bhp & 440 Nm", "14-16 kmpl", "Automatic"] }
      ]
    },
    kia: {
      name: "Kia",
      cars: [
        { name: "Kia Seltos", price: "₹10.90 - ₹20.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol & Diesel", "1497 cc & 1493 cc", "113-115 bhp", "17-21 kmpl", "Manual & Automatic"] },
        { name: "Kia Sonet", price: "₹7.00 - ₹14.00 Lakh", details: "Subcompact SUV", image: "#", features: ["Petrol & Diesel", "1197 cc & 1493 cc", "81-115 bhp", "18-24 kmpl", "Manual & Automatic"] },
        { name: "Kia Carens", price: "₹10.00 - ₹18.00 Lakh", details: "MPV-style SUV", image: "#", features: ["Petrol & Diesel", "1497 cc & 1493 cc", "113-115 bhp", "16-21 kmpl", "Manual & Automatic"] },
        { name: "Kia EV6", price: "₹60.00 - ₹65.00 Lakh", details: "Electric SUV", image: "#", features: ["Electric", "Dual Motor", "325 bhp", "528 km range", "Automatic"] }
      ]
    },
    mahindra: {
      name: "Mahindra",
      cars: [
        { name: "Mahindra Scorpio", price: "₹13.00 - ₹24.00 Lakh", details: "Rugged SUV", image: "#", features: ["Diesel", "2198 cc", "130-175 bhp & 300-400 Nm", "15-17 kmpl", "Manual & Automatic"] },
        { name: "Mahindra XUV700", price: "₹14.00 - ₹26.00 Lakh", details: "Premium SUV", image: "#", features: ["Petrol & Diesel", "1997 cc & 2198 cc", "150-185 bhp & 300-450 Nm", "15-18 kmpl", "Manual & Automatic"] },
        { name: "Mahindra Thar", price: "₹11.00 - ₹17.00 Lakh", details: "Off-road SUV", image: "#", features: ["Petrol & Diesel", "1997 cc & 2198 cc", "150-130 bhp & 300-300 Nm", "15-18 kmpl", "Manual & Automatic"] },
        { name: "Mahindra Bolero", price: "₹9.00 - ₹10.00 Lakh", details: "Utility SUV", image: "#", features: ["Diesel", "1493 cc", "75 bhp & 210 Nm", "16-18 kmpl", "Manual"] }
      ]
    },
    tata: {
      name: "Tata Motors",
      cars: [
        { name: "Tata Nexon", price: "₹8.00 - ₹15.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol & Diesel", "1199 cc & 1497 cc", "118-108 bhp & 170-260 Nm", "17-24 kmpl", "Manual & Automatic"] },
        { name: "Tata Harrier", price: "₹15.00 - ₹25.00 Lakh", details: "Premium SUV", image: "#", features: ["Diesel", "1956 cc", "168 bhp & 350 Nm", "16-18 kmpl", "Manual & Automatic"] },
        { name: "Tata Safari", price: "₹16.00 - ₹26.00 Lakh", details: "Full-size SUV", image: "#", features: ["Diesel", "1956 cc", "168 bhp & 350 Nm", "15-17 kmpl", "Manual & Automatic"] },
        { name: "Tata Punch", price: "₹6.00 - ₹10.00 Lakh", details: "Micro SUV", image: "#", features: ["Petrol", "1199 cc", "85 bhp & 113 Nm", "18-20 kmpl", "Manual & Automatic"] }
      ]
    },
    ford: {
      name: "Ford",
      cars: [
        { name: "Ford Endeavour", price: "₹35.00 - ₹40.00 Lakh", details: "Premium SUV", image: "#", features: ["Diesel", "1996 cc", "170 bhp & 420 Nm", "12-14 kmpl", "Automatic"] },
        { name: "Ford EcoSport", price: "₹8.00 - ₹12.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol & Diesel", "1498 cc & 1499 cc", "123-100 bhp & 150-215 Nm", "15-21 kmpl", "Manual & Automatic"] },
        { name: "Ford Territory", price: "₹25.00 - ₹30.00 Lakh", details: "Mid-size SUV", image: "#", features: ["Petrol", "1490 cc", "163 bhp & 270 Nm", "14-16 kmpl", "Automatic"] }
      ]
    },
    chevrolet: {
      name: "Chevrolet",
      cars: [
        { name: "Chevrolet Trailblazer", price: "₹30.00 - ₹35.00 Lakh", details: "Premium SUV", image: "#", features: ["Diesel", "1998 cc", "170 bhp & 350 Nm", "13-15 kmpl", "Automatic"] },
        { name: "Chevrolet Captiva", price: "₹25.00 - ₹30.00 Lakh", details: "Mid-size SUV", image: "#", features: ["Petrol", "1998 cc", "220 bhp & 350 Nm", "12-14 kmpl", "Automatic"] },
        { name: "Chevrolet Trax", price: "₹15.00 - ₹18.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol", "1399 cc", "155 bhp & 240 Nm", "16-18 kmpl", "Automatic"] }
      ]
    },
    nissan: {
      name: "Nissan",
      cars: [
        { name: "Nissan Magnite", price: "₹6.00 - ₹11.00 Lakh", details: "Compact SUV", image: "#", features: ["Petrol", "999 cc", "71-99 bhp & 96-152 Nm", "18-20 kmpl", "Manual & CVT"] },
        { name: "Nissan Kicks", price: "₹10.00 - ₹15.00 Lakh", details: "Mid-size SUV", image: "#", features: ["Petrol", "1498 cc", "104 bhp & 142 Nm", "16-18 kmpl", "Manual & CVT"] },
        { name: "Nissan X-Trail", price: "₹40.00 - ₹45.00 Lakh", details: "Premium SUV", image: "#", features: ["Petrol", "1997 cc", "142 bhp & 200 Nm", "14-16 kmpl", "CVT"] },
        { name: "Nissan Patrol", price: "₹80.00 - ₹85.00 Lakh", details: "Full-size luxury SUV", image: "#", features: ["Petrol", "5552 cc", "400 bhp & 560 Nm", "8-10 kmpl", "Automatic"] }
      ]
    }
  }
},

  sports: {
    title: "Performance Sports",
    description: "Unleash extraordinary performance",
    brands: {
      porsche: {
        name: "Porsche",
        cars: [
          {
            name: "Porsche 911",
            price: "₹1.8-2.2 Crore",
            details: "Petrol, 2981cc, 10.5 kmpl",
            image: "#",
            features: ["Sport Chrono", "PDK", "Active Suspension", "20-inch Wheels"]
          }
        ]
      }
    }
  }
}

const FindCars = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const getCategoryFromURL = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('category') || ''
  }

  useEffect(() => {
    const categoryFromURL = getCategoryFromURL()
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL)
      setSelectedBrand('')
    }
  }, [location.search])

  const categories = [
    { name: 'sedan', title: 'Executive Sedans', icon: 'fas fa-car', color: '#d4af37' },
    { name: 'suv', title: 'Luxury SUVs', icon: 'fas fa-truck', color: '#1a1a1a' },
    { name: 'sports', title: 'Sport Cars', icon: 'fas fa-tachometer-alt', color: '#b91c1c' },
    { name: 'coupe', title: 'Grand Coupes', icon: 'fas fa-car', color: '#1e40af' }
  ]

  const handleAddCar = () => {
    navigate('/add-car')
  }

  const handleContact = () => {
    navigate('/contact')
  }

  const handleCategorySelect = (category) => {
    navigate(`/find-cars?category=${category}`)
  }

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
  }

  const handleBackToCategories = () => {
    navigate('/find-cars')
    setSelectedCategory('')
    setSelectedBrand('')
  }

  const handleBackToBrands = () => {
    setSelectedBrand('')
  }

  if (!selectedCategory) {
    return (
      <div className="cars-section-premium" style={{ paddingTop: '120px' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="section-title">Our Premium Collection</h1>
              <p className="section-subtitle">
                Curated selection of luxury and performance vehicles
              </p>
            </Col>
          </Row>
          <Row>
            {categories.map((category, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card
                  className="category-card-premium fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div className="category-icon-premium">
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.title}</h3>
                  <p>Explore premium selection</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    )
  }

  if (selectedCategory && !selectedBrand) {
    const categoryData = getAllCarData()[selectedCategory]
    const categoryInfo = categories.find(cat => cat.name === selectedCategory)

    if (!categoryData) {
      return (
        <div className="cars-section-premium" style={{ paddingTop: '120px' }}>
          <Container className="text-center">
            <h3>Collection coming soon</h3>
            <Button
              className="btn-premium mt-3"
              onClick={handleBackToCategories}
            >
              Back to Collections
            </Button>
          </Container>
        </div>
      )
    }

    return (
      <div className="cars-section-premium" style={{ paddingTop: '120px' }}>
        <Container>
          <Breadcrumb className="breadcrumb-premium">
            <Breadcrumb.Item onClick={handleBackToCategories} style={{ cursor: 'pointer' }}>
              Collections
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {categoryData.title}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">{categoryData.title}</h2>
              <p className="section-subtitle">{categoryData.description}</p>
            </Col>
          </Row>

          <Row>
            {Object.entries(categoryData.brands).map(([brandKey, brand], index) => (
              <Col lg={4} md={6} key={brandKey} className="mb-4">
                <Card
                  className="brand-card-premium slide-in-left"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => handleBrandSelect(brandKey)}
                >
                  <h4>{brand.name}</h4>
                  <p className="text-muted">{brand.cars.length} model{brand.cars.length > 1 ? 's' : ''} available</p>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button
                className="btn-premium"
                onClick={handleAddCar}
              >
                <i className="fas fa-plus me-2"></i>
                Add New Car to {categoryData.title}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  if (selectedCategory && selectedBrand) {
    const categoryData = getAllCarData()[selectedCategory]
    const brandData = categoryData.brands[selectedBrand]

    return (
      <div className="cars-section-premium" style={{ paddingTop: '120px' }}>
        <Container>
          <Breadcrumb className="breadcrumb-premium">
            <Breadcrumb.Item onClick={handleBackToCategories} style={{ cursor: 'pointer' }}>
              Collections
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={handleBackToBrands} style={{ cursor: 'pointer' }}>
              {categoryData.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {brandData.name}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">{brandData.name}</h2>
              <p className="section-subtitle">{categoryData.title}</p>
            </Col>
          </Row>

          <Row className="g-4">
            {brandData.cars.map((car, index) => (
              <Col xl={4} lg={6} md={6} key={index} className="mb-4">
                <Card className="car-card-premium slide-in-right h-100" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div style={{ overflow: 'hidden', height: '310px' }}>
                    <img src={car.image} alt={car.name} className="car-image-premium w-100" />
                  </div>
                  <div className="car-details-premium d-flex flex-column h-100">
                    <h4>{car.name}</h4>
                    <p className="text-muted mb-1 flex-grow-1">{car.details}</p>

                    <div className="car-features-premium mb-3">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="feature-badge">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <p className="car-price-premium">{car.price}</p>
                    <Button className="btn-enquire mt-auto" onClick={handleContact}>Request Details</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button className="btn-premium" onClick={handleAddCar}>
                <i className="fas fa-plus me-2"></i>
                Add New Car to {brandData.name}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default FindCars