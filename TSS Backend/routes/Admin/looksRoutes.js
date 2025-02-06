// routes/looksRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); // Assuming you're using multer for handling file uploads

const path = require('path');
const Looks = require('../../models/looks');

const Role = require('../../models/Role');
const jwt = require('jsonwebtoken');

// Multer storage configuration
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
const uploadDirectory = '/var/www/html/tss_files/looks';
// const uploadDirectory = 'uploads';

// Create a new look
router.post('/', upload.none(), async (req, res) => {
  try {
    const authToken = req.headers.authorization || req.headers.Authorization;
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing authentication token' });
    }
    // Decode the authentication token
    const decodedToken = jwt.verify(authToken, 'your-secret-key');
    if (!decodedToken || !decodedToken.userId || !decodedToken.uid || !decodedToken.role) {
      return res.status(401).json({ message: 'Unauthorized: Invalid authentication token' });
    }
    const userRole = decodedToken.role;
    const userPermissionsArray = await Role.findOne({ role: userRole });
    const canReadProducts = userPermissionsArray.permissions.some(permission =>
      permission.catg === 'Content' && permission.create
    );
    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const { title, catalog_id, thumbnail, slider } = req.body;
    const newLook = new Looks({
      thumbnail: {
        url: thumbnail,
      },
      slider: [{ url: slider }],
      title: title,
      catalog_id: catalog_id,
    });

    await newLook.save();
    res.status(201).json(newLook);
  } catch (error) {
    console.error('Error creating a new Look:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all looks
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
    const allLooks = await Looks.find();
    res.status(200).json(allLooks);
  } catch (error) {
    console.error('Error fetching all Looks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific look by ID
router.get('/:catalog_id', async (req, res) => {
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
    console.log(req.params.catalog_id);
    const look = await Looks.find({ catalog_id: req.params.catalog_id });
    console.log(look);
    if (!look) {
      return res.status(404).json({ message: 'Look not found' });
    }
    res.status(200).json(look);
  } catch (error) {
    console.error('Error fetching Look by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Update a look by ID
router.put('/:catalog_id', upload.none(), async (req, res) => {
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
      permission.catg === 'Content' && permission.update
    );

    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const { title ,thumbnail, slider  } = req.body;
    const look = await Looks.findById(req.params.catalog_id);

    if (!look) {
      return res.status(404).json({ message: 'Look not found' });
    }

    look.title = title;
    await look.save();
    res.status(200).json(look);
  } catch (error) {
    console.error('Error updating Look by Catalog ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete a look by ID
router.delete('/:catalog_id', async (req, res) => {
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
      permission.catg === 'Content' && permission.delete
    );

    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const deletedLook = await Looks.findByIdAndDelete({ _id: req.params.catalog_id });

    if (!deletedLook) {
      return res.status(404).json({ message: 'Look not found' });
    }

    res.status(200).json({ message: 'Look deleted successfully', deletedLook });
  } catch (error) {
    console.error('Error deleting Look by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
