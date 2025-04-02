const ConnectToMongo = require("./db");
const express = require("express");
const http = require("http"); // Add the http module
const socketIo = require("socket.io");
var cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/Admin/userRoutes.js");
const adminRoutes = require("./routes/Admin/adminRoutes");
const userManagementRoutes = require("./routes/Admin/User_ManagementRoutes");
const departmentRoutes = require("./routes/Admin/DepartmentRoutes");
const roleRoutes = require("./routes/Admin/RoleRoutes");
const settingRoutes = require("./routes/Admin/settingsRoutes");
const cmsRoutes = require("./routes/Admin/cmsRoutes");
const footerRoutes = require("./routes/Admin/footerRoutes");
const pagesRoutes = require("./routes/Admin/pagesRoutes");
const homeRoutes = require("./routes/Admin/homeRoutes");
const aboutRoutes = require("./routes/Admin/aboutRoutes.js");
const contactRoutes = require("./routes/Admin/contactRoutes.js");
const promoCodeRoutes = require("./routes/Admin/promoCodeRoutes");
const generalConfigRoutes = require("./routes/Admin/generalConfigRoutes");
const catalogRoutes = require("./routes/Admin/catalogRoutes");
const productRoutes = require("./routes/Admin/productRoutes");
const promotionRoutes = require("./routes/Admin/promotionRoutes");
const categoryRoutes = require("./routes/Admin/categoryRoutes");
const bannerRoutes = require("./routes/Admin/BannerRoute.js");
const productCategoryRoutes = require("./routes/Admin/productCategoryRoutes");
const OrderRoutes = require("./routes/Admin/OrderRoutes.js");
const reviewRoutes = require("./routes/Admin/reviewController");
const transactionRoutes = require("./routes/Admin/transactions");
const looksRoutes = require("./routes/Admin/looksRoutes");
const pageController = require("./routes/Admin/pageController.js");
const ClientHome = require("./routes/Client/HomeClient.js");
const productcat = require("./routes/Client/productcatg.js");
const productDetails = require("./routes/Client/productDetails.js");
const catalogClientRoutes = require("./routes/Client/CatalogRoutes.js");
const CartRoutes = require("./routes/Client/cartRoutes.js");
const Clientlogin = require("./routes/Client/Clientlogin.js");
const visitorsRouter = require("./routes/Client/visitorRoutes.js");
const review = require("./routes/Client/Review.js");
const liked = require("./routes/Client/liked.js");
const about = require("./routes/Client/About.js");
const payment = require("./routes/Client/Payment_routes.js");
const contact = require("./routes/Client/contactroutes.js");
const Stripe = require("./routes/Client/Stripe.js");
const Orders = require("./routes/Client/Orders.js");
const promotions = require("./routes/Client/promotionroutes.js");
const ImageRoute = require("./routes/ImageUploads/ImageUpload.js");
const TicketSupport = require("./routes/Websocket/TicketSupport.js");
const { Server } = require("socket.io");
const Ticket = require("./models/Ticket.js");
const { connectRedis } = require("./redis/redisClient.js");
const timeMiddleware = require("./middleware/TimeCalculationMiddleware.js");
const client = require('prom-client');


ConnectToMongo();
const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));


const server = http.createServer(app);

app.use(express.json());

app.use("/admin/user",timeMiddleware, userRoutes);
app.use("/admin/admin",timeMiddleware, adminRoutes);
app.use("/admin/user_management",timeMiddleware, userManagementRoutes);
app.use("/admin/departments",timeMiddleware, departmentRoutes);
app.use("/admin/roles",timeMiddleware, roleRoutes);
app.use("/admin/settings",timeMiddleware, settingRoutes);
app.use("/admin/cms",timeMiddleware, cmsRoutes);
app.use("/admin/footer",timeMiddleware, footerRoutes);
app.use("/admin/pages",timeMiddleware, pagesRoutes);
app.use("/admin/home", timeMiddleware,homeRoutes);
app.use("/admin/about", timeMiddleware,aboutRoutes);
app.use("/admin/contact",timeMiddleware, contactRoutes);
app.use("/admin/promo-code",timeMiddleware, promoCodeRoutes);
app.use("/admin/general-config",timeMiddleware, generalConfigRoutes);
app.use("/admin/catalog",timeMiddleware, catalogRoutes);
app.use("/admin/product",timeMiddleware, productRoutes);
app.use("/admin/promotion",timeMiddleware, promotionRoutes);
app.use("/admin/categories",timeMiddleware, categoryRoutes);
app.use("/admin/productCategory",timeMiddleware, productCategoryRoutes);
app.use("/admin/banner",timeMiddleware, bannerRoutes);
app.use("/admin/oders",timeMiddleware, OrderRoutes);
app.use("/admin/review",timeMiddleware, reviewRoutes);
app.use("/admin/transactions",timeMiddleware, transactionRoutes);
app.use("/admin/looks",timeMiddleware, looksRoutes);
app.use("/admin/page",timeMiddleware, pageController);

//clients-Routes
app.use("/client",timeMiddleware, ClientHome);
app.use("/client/auth",timeMiddleware, Clientlogin);
app.use("/client/productcat",timeMiddleware, productcat);
app.use("/client/productDetails",timeMiddleware, productDetails);
app.use("/client/catalog",timeMiddleware, catalogClientRoutes);
app.use("/client/cart", timeMiddleware,CartRoutes);
app.use("/client/visitors", timeMiddleware,visitorsRouter);
app.use("/client/review", timeMiddleware,review);
app.use("/client/liked",timeMiddleware, liked);
app.use("/client/About",timeMiddleware, about);
app.use("/client/payments",timeMiddleware, payment);
app.use("/client/contacts",timeMiddleware, contact);
app.use("/client", Stripe);
app.use("/client/orders",timeMiddleware, Orders);
app.use("/client",timeMiddleware, promotions);





app.get('/metrics', async (req, res) => {
  const metrices = await client.register.metrics()
  res.set('Content-Type', client.register.contentType);
  res.end(metrices);
});



app.use("/admin/imageupload",timeMiddleware, ImageRoute);


app.use('/admin/ticket',timeMiddleware, TicketSupport)


// app.use("/client/liked",liked)

// app.use('/client/page', ClientHome);

// websocket part





const io = new Server(server, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  
  },
  transports: ["websocket", "polling"], 
  allowEIO3: true, 
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", async (data) => {
    const { tid, uid, msg, role } = data;
    const newMessage = {
      role,
      message: msg,
    };
    try {
      await Ticket.findOneAndUpdate(
        { tid: uid },
        { $push: { messages: newMessage } },
        { new: true }
      );
      io.emit("receive_message", { tid, ...newMessage });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});




const PORT2 = process.env.PORT || 5300;
server.listen(5300, () => {
  console.log(`Web socket SERVER IS RUNNING on port ${PORT2}`);
});

// connectRedis()

const PORT = process.env.PORT || 5200;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
