const menuData = [
    {
        name: "Patel Juice Centre",
        tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
        categories: [
            {
                name: "Milkshake",
                items: [
                    { id: "pj1", name: "Cold coffee", price: 100 },
                    { id: "pj2", name: "Orieo", price: 120 },
                    { id: "pj3", name: "Kit kat", price: 120 },
                    { id: "pj4", name: "Chocolate", price: 100 },
                    { id: "pj5", name: "Avacado + Honey", price: 180 },
                ],
            },
            {
                name: "Falooda",
                items: [
                    { id: "pj6", name: "Royal Falooda", price: 100 },
                    { id: "pj7", name: "Kesar Falooda", price: 100 },
                    { id: "pj8", name: "Patel Special Falooda", price: 130 },
                    { id: "pj9", name: "Rabdi Falooda", price: 140 },
                    { id: "pj10", name: "Chocolate Falooda", price: 120 },
                ],
            },
            {
                name: "Blossom with vanilla Ice-cream",
                items: [
                    { id: "pj11", name: "Strawberry Blossom", price: 180 },
                    { id: "pj12", name: "Kit kat Blossom", price: 150 },
                    { id: "pj13", name: "Chocolate Blossom", price: 140 },
                    { id: "pj14", name: "Mango Blossom", price: 200 },
                    { id: "pj15", name: "Sitafal Blossom", price: 180 },
                ],
            },
        ],
    },
    {
        name: "B.E Bytes",
        tagline: "Bite-sized happiness, served hot & fresh!",
        categories: [
            {
                name: "Pav Items",
                items: [
                    { id: "be1", name: "Masala Vadapav", price: 40, jain: true, description: "Special" },
                    { id: "be2", name: "Pav Sandwich (1/2 pieces)", price: 50, description: "Also available as full for ₹90" },
                    { id: "be3", name: "Peri peri Paneer pav", price: 90, jain: true },
                    { id: "be4", name: "Thecha Vadapav", price: 50, jain: true },
                    { id: "be5", name: "Masala Khari", price: 100, jain: true, description: "Special" },
                ],
            },
            {
                name: "Bagel",
                items: [
                    { id: "be6", name: "The OG Bagel", price: 120, jain: true, description: "Half size. Full size: ₹230" },
                    {
                        id: "be7",
                        name: "B.E Bytes Special Bagel",
                        price: 120,
                        jain: true,
                        description: "Half size. Full size: ₹230",
                    },
                    { id: "be8", name: "Paneer Tikka Bagel", price: 120, jain: true, description: "Half size. Full size: ₹230" },
                    { id: "be9", name: "Peri Peri Bagel", price: 100, jain: true, description: "Half size. Full size: ₹190" },
                    { id: "be10", name: "Chocolate Bagel", price: 100, description: "Half size. Full size: ₹190" },
                ],
            },
            {
                name: "Bites",
                items: [
                    { id: "be11", name: "Classic Dough Balls", price: 100, jain: true, description: "Special" },
                    { id: "be12", name: "Peri peri Dough Balls", price: 100, jain: true },
                    { id: "be13", name: "Nutella Dough Balls", price: 100 },
                    { id: "be14", name: "Churro Dough Balls", price: 100 },
                ],
            },
        ],
    },
    {
        name: "Ramanandi - Bajra Pizza",
        tagline: "Tradition meets innovation – guilt-free pizza joy!",
        categories: [
            {
                name: "Bhakri Pizza (Wheat)",
                items: [
                    { id: "rp1", name: "Vegetable Bhakri Pizza", price: 170, jain: true, description: "Without cheese: ₹140" },
                    { id: "rp2", name: "Margherita Bhakri Pizza", price: 190, jain: true },
                    { id: "rp3", name: "Only Cheese Pizza", price: 190, jain: true },
                    { id: "rp4", name: "Only Corn Pizza", price: 170, jain: true, description: "Without cheese: ₹140" },
                    { id: "rp5", name: "Masala Paneer Pizza", price: 220, jain: true, description: "Without cheese: ₹190" },
                ],
            },
            {
                name: "Bajri/Jawar Pizza",
                items: [
                    { id: "rp6", name: "Vegetable B/J Pizza", price: 190, jain: true, description: "Without cheese: ₹160" },
                    { id: "rp7", name: "Only Cheese B/J Pizza", price: 210, jain: true },
                    { id: "rp8", name: "Margherita B/J Pizza", price: 210, jain: true },
                    { id: "rp9", name: "Only Corn B/J Pizza", price: 190, jain: true, description: "Without cheese: ₹160" },
                    { id: "rp10", name: "Masala Paneer B/J Pizza", price: 240, jain: true, description: "Without cheese: ₹210" },
                ],
            },
        ],
    },
    {
        name: "House of Sushi",
        tagline: "Roll with us to Japan & Vietnam!",
        categories: [
            {
                name: "Sushi",
                items: [
                    { id: "hs1", name: "California Sushi (4PC)", price: 180, description: "8PC: ₹300" },
                    { id: "hs2", name: "Avocado Sushi (4PC)", price: 210, description: "8PC: ₹330" },
                    { id: "hs3", name: "Exotic Sushi (4PC)", price: 180, description: "8PC: ₹300" },
                    { id: "hs4", name: "Asparagus Sushi (4PC)", price: 210, description: "8PC: ₹330" },
                    { id: "hs5", name: "Edamame Sushi (4PC)", price: 210, description: "8PC: ₹330" },
                ],
            },
            {
                name: "Vietnamese Roll",
                items: [
                    { id: "hs6", name: "Exotic Roll", price: 200 },
                    { id: "hs7", name: "Avocado Roll", price: 220 },
                    { id: "hs8", name: "Paneer Roll", price: 210 },
                    { id: "hs9", name: "Avocado Jalapeno Roll", price: 230 },
                ],
            },
        ],
    },
    {
        name: "Priya Foods",
        tagline: "Your Comfort food!",
        categories: [
            {
                name: "Comfort Food",
                items: [
                    { id: "pf1", name: "Vadapav", price: 20, jain: true, description: "Jain: ₹25" },
                    { id: "pf2", name: "Samosa pav", price: 25, jain: true },
                    { id: "pf3", name: "Idli chatni (2pc)", price: 30 },
                    { id: "pf4", name: "Medu Vada (2pc)", price: 45 },
                    { id: "pf5", name: "Single Vada", price: 17 },
                ],
            },
        ],
    },
    {
        name: "Cafe Jethwa Food Corner",
        tagline: "Snacks with swag!",
        categories: [
            {
                name: "Tornato (Potato) Twisters",
                items: [
                    { id: "cj1", name: "Maggic Masala Twister", price: 120 },
                    { id: "cj2", name: "Peri Peri Twister", price: 120 },
                    { id: "cj3", name: "Tandoori Twister", price: 120 },
                    { id: "cj4", name: "Cheese Twister", price: 120 },
                    { id: "cj5", name: "Salsa Twister", price: 120 },
                ],
            },
            {
                name: "Masala Fries",
                items: [
                    { id: "cj6", name: "Chilly garlic Masala Fries", price: 160 },
                    { id: "cj7", name: "Cheese Jalapeno Fries", price: 160 },
                    { id: "cj8", name: "Barbeque Masala Fries", price: 160 },
                    { id: "cj9", name: "Chilly cheese Masala Fries", price: 180 },
                    { id: "cj10", name: "Chipotle Masala Fries", price: 160 },
                ],
            },
            {
                name: "Jain Fries",
                items: [
                    { id: "cj11", name: "Plain Fries", price: 120 },
                    { id: "cj12", name: "Cheese Fries", price: 150 },
                    { id: "cj13", name: "BBQ Fries", price: 150 },
                    { id: "cj14", name: "Chilly Fries", price: 150 },
                    { id: "cj15", name: "Mayo Fries", price: 150 },
                ],
            },
        ],
    },
    {
        name: "Norchi",
        tagline: "Bowls. Rolls. Starters. All souls.",
        categories: [
            {
                name: "Bowls",
                items: [
                    { id: "no1", name: "Paneer Butter Masala & Jeera Rice", price: 220, jain: true },
                    { id: "no2", name: "Veg Manchurian & Fried Rice", price: 205, jain: true },
                    { id: "no3", name: "Paneer Chilli & Hakka Noodles", price: 230, jain: true },
                    { id: "no4", name: "Veg Makhani & Jeera Rice", price: 205, jain: true },
                    { id: "no5", name: "Veg Kadhai & Jeera Rice", price: 205, jain: true },
                ],
            },
            {
                name: "Starters",
                items: [
                    { id: "no6", name: "Paneer Chilli", price: 200, jain: true },
                    { id: "no7", name: "Veg Crispy", price: 190, jain: true },
                    { id: "no8", name: "Cheesy Corn Triangles", price: 180 },
                    { id: "no9", name: "Mushroom Chilli", price: 200 },
                    { id: "no10", name: "Veg Manchurian", price: 190, jain: true },
                ],
            },
        ],
    },
]

export default menuData



