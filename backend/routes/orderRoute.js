const express = require("express");  
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

router.get("/me/orders",isAuthenticatedUser,myOrders)
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);
router.post("/order/new",isAuthenticatedUser,newOrder);
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);
router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;
