const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/restaurant/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(restaurantId) },
      include: { menuItems: true },
    });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/restaurant", async (req, res) => {
  const {
    name,
    since,
    isOpen,
    opsStartTime,
    opsEndTime,
    ownerId,
    slug,
    description,
    location,
  } = req.body;
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        since,
        isOpen,
        opsStartTime,
        opsEndTime,
        ownerId,
        slug,
        description,
        location,
      },
    });
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/restaurant/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const {
    name,
    since,
    isOpen,
    opsStartTime,
    opsEndTime,
    ownerId,
    slug,
    description,
    location,
  } = req.body;
  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: parseInt(restaurantId) },
      data: {
        name,
        since,
        isOpen,
        opsStartTime,
        opsEndTime,
        ownerId,
        slug,
        description,
        location,
      },
    });
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/restaurant/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await prisma.restaurant.delete({
      where: { id: parseInt(restaurantId) },
    });
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/restaurant/search", async (req, res) => {
  const { city, couponCode } = req.body;
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { location: city },
      include: { menuItems: true },
    });

    if (couponCode) {
      restaurants.forEach((restaurant) => {
        restaurant.menuItems = restaurant.menuItems.filter((menuItem) =>
          menuItem.couponCode.includes(couponCode)
        );
      });
    }

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
