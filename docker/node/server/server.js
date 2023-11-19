import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './app/controllers/auth.controller.js';
import foodPreferenceRoutes from './app/controllers/foodpreference.controller.js';
import groupRoutes from './app/controllers/group.controller.js';
import groupChatMessageRoutes from "./app/controllers/groupchatmessage.controller.js";
import groupFoodPreferenceRoutes from "./app/controllers/groupfoodpreference.controller.js";
import groupMemberRoutes from "./app/controllers/groupmember.controller.js";
import groupPictureRoutes from "./app/controllers/grouppicture.controller.js";
import groupRegionPreferenceRoutes from "./app/controllers/groupregionpreference.controller.js";
import locationRoutes from "./app/controllers/location.controller.js";
import meetingRoutes from "./app/controllers/meeting.controller.js";
import regionPreferenceRoutes from "./app/controllers/regionpreference.controller.js";
import resetPasswordRoutes from './app/controllers/resetPasswordRoutes.controller.js';
import userRoutes from "./app/controllers/user.controller.js";
import userFoodPreferenceRoutes from "./app/controllers/userfoodpreference.controller.js";
import userRegionPreferenceRoutes from "./app/controllers/userregionpreference.controller.js";
import { setupAssociations } from './app/models/associations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api', foodPreferenceRoutes);
app.use('/api', groupFoodPreferenceRoutes);
app.use('/api', groupMemberRoutes);
app.use('/api', groupPictureRoutes);
app.use('/api', groupRegionPreferenceRoutes);
app.use('/api', meetingRoutes);
app.use('/api', regionPreferenceRoutes);
app.use('/api', userRoutes);
app.use('/api', userFoodPreferenceRoutes);
app.use('/api', userRegionPreferenceRoutes);
app.use('/api', groupRoutes);
app.use('/api', locationRoutes);
app.use('/api', resetPasswordRoutes);
app.use('/api', groupChatMessageRoutes);


console.log("__dirname: ", __dirname);
console.log("uploads directory: ", path.join(__dirname, 'uploads'));

setupAssociations();

app.get('/', (req, res) => {
    res.json({message: "Welcome to the application."});
    console.log(`My server is now running at landing page.`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});
