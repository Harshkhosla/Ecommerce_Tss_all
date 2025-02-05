const express = require('express');
const multer = require('multer');
const Home = require('../../models/home');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const Role = require('../../models/Role');
// const uploadDirectory = 'uploads';
const uploadDirectory = '/var/www/html/tss_files/home';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = generateUniqueRid() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

function generateUniqueRid() {
  return `RID${Date.now()}`;
}
const upload = multer({ storage: storage });

// Read
router.get('/', async (req, res) => {
  try {
    const authToken = req.headers.authorization || req.headers.Authorization;
    console.log(authToken);
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing authentication token' });
    }
    // Decode the authentication token
    const decodedToken = jwt.verify(authToken, 'your-secret-key');
    // Check if the decoded token has the necessary fields (userId, uid, role)
    if (!decodedToken || !decodedToken.userId || !decodedToken.uid || !decodedToken.role) {
      return res.status(401).json({ message: 'Unauthorized: Invalid authentication token' });
    }
    // Get the user's role and permissions from the database based on the decoded token
    const userRole = decodedToken.role;
    const userPermissionsArray = await Role.findOne({ role: userRole });
    console.log(userPermissionsArray);
    // Check if the user has permission to read products in the "Inventory" category
    const canReadProducts = userPermissionsArray.permissions.some(permission =>
      permission.catg === 'Content' && permission.read
    );

    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const homeData = await Home.findOne();
    res.status(200).json(homeData);
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/', upload.none(), async (req, res) => {
  try {
    const authToken = req.headers.authorization || req.headers.Authorization;
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing authentication token' });
    }
    const decodedToken = jwt.verify(authToken, 'your-secret-key');
    if (!decodedToken || !decodedToken.userId || !decodedToken.uid || !decodedToken.role) {
      return res.status(401).json({ message: 'Unauthorized: Invalid authentication token' });
    }
    const userRole = decodedToken.role;
    const userPermissionsArray = await Role.findOne({ role: userRole });
    const canReadProducts = userPermissionsArray.permissions.some(permission =>
      permission.catg === 'Content' && permission.update
    );
    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const homeData = req.body;
    if (homeData['CollectionArea.images']) {
      const data = JSON.parse(homeData['CollectionArea.images'])
      console.log(homeData['CollectionArea.images'], "sdkvjbsdv");
      homeData['CollectionArea.images'] = data.map(item => {
        return { url: item.url };
      });
    }
    const existingHome = await Home.findOne();
    if (!existingHome) {
      const newHome = new Home(homeData);
      await newHome.save();
      return res.status(201).json({ message: 'Home data created successfully', newHome });
    }
    const updatedHome = await Home.updateOne({}, { $set: homeData });
    console.log('Update successful:', updatedHome);

    res.status(200).json({ message: 'Home data updated successfully', updatedHome });
  } catch (error) {
    console.error('Error updating or creating home data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
