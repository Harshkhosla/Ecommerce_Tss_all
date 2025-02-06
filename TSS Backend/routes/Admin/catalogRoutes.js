const express = require('express');
const multer = require('multer');
const Catalog = require('../../models/catalog');

const router = express.Router();

const path = require('path');
const jwt = require('jsonwebtoken');
const Role = require('../../models/Role');


const uploadDirectory = '/var/www/html/tss_files/catalog';
// const uploadDirectory = 'uploads';

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


function generateUniqueCatalogId() {
  return `CAT${Date.now()}`;
}
// Create
router.post('/', upload.none(), async (req, res) => {
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
      permission.catg === 'Content' && permission.create
    );
    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    const catalogData = req.body;
    const catalog_id = generateUniqueCatalogId();
    catalogData.catalog_id = catalog_id;

    if (req.body) {
      catalogData.inputArea1 = {
        title: catalogData.inputArea1title,
        isChecked: catalogData.isChecked,
        subtitle1: catalogData.inputArea1subtitle1,
        subtitle2: catalogData.inputArea1subtitle2,
        image: {
          url: catalogData.inputArea1Image
        }
      },
      catalogData.inputArea2 = {
        imagelink: catalogData.inputArea2imagelink,
        image: {
          url: catalogData.inputArea2Image
        }
      },
        catalogData.inputArea3 = {
          Title: catalogData.inputArea3Title,
          image: {
            url: catalogData.inputArea3Image
          }
        },
        catalogData.inputArea4 = {
          imagelink: catalogData.inputArea4imagelink,
          image: {
            url: catalogData.inputArea4Image
          }
        },
        catalogData.inputArea5 = {
          centerText: catalogData.inputArea5conText,
          image: {
            url: catalogData.inputArea5Image
          },
          buttonText: catalogData.inputArea5buttonText
        }
    }
    const newCatalogItem = new Catalog(catalogData);
    await newCatalogItem.save();

    res.status(201).json({ message: 'Catalog item created successfully', newCatalogItem });
  } catch (error) {
    console.error('Error creating catalog item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Read - Get all catalog items
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
    const catalogItems = await Catalog.find();
    res.status(200).json({ catalogItems });
  } catch (error) {
    console.error('Error getting catalog items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Read - Get a catalog item by ID
router.get('/:catalog_id', async (req, res) => {
  try {
    const authToken = req.headers.authorization || req.headers.Authorization;
    console.log(authToken);
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
      permission.catg === 'Content' && permission.read
    );
    if (!canReadProducts) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    const catalogItem = await Catalog.findById(req.params.catalog_id);
    if (!catalogItem) {
      return res.status(404).json({ message: 'Catalog item not found' });
    }
    res.status(200).json({ catalogItem });
  } catch (error) {
    console.error('Error getting catalog item by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update - Update a catalog item by ID
router.put('/:catalog_id', upload.none(), async (req, res) => {
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

    console.log("req.body", req.body);

    // Fetch the existing catalog item
    const existingCatalogItem = await Catalog.findOne({ catalog_id: req.params.catalog_id });
    if (!existingCatalogItem) {
      return res.status(404).json({ message: 'Catalog item not found' });
    }

    const bodyData = req.body;
    const catalogData = { ...existingCatalogItem.toObject() }; // Clone the existing data

    if (bodyData?.catalogname) {
      catalogData.catalogname = bodyData.catalogname;
    }

    function updateImageField(area, newImage) {
      return {
        ...catalogData[area], 
        image: {
          url: newImage || catalogData[area]?.image?.url // Keep existing image if no new one is provided
        }
      };
    }

    if (bodyData?.inputArea1title || bodyData?.inputArea1subtitle1 || bodyData?.inputArea1subtitle2 || bodyData?.isChecked || bodyData?.inputArea1Image) {
      catalogData.inputArea1 = updateImageField('inputArea1', bodyData.inputArea1Image);
      catalogData.inputArea1.title = bodyData.inputArea1title || catalogData.inputArea1.title;
      catalogData.inputArea1.isChecked = bodyData.isChecked ?? catalogData.inputArea1.isChecked;
      catalogData.inputArea1.subtitle1 = bodyData.inputArea1subtitle1 || catalogData.inputArea1.subtitle1;
      catalogData.inputArea1.subtitle2 = bodyData.inputArea1subtitle2 || catalogData.inputArea1.subtitle2;
    }

    if (bodyData?.inputArea2imagelink || bodyData?.inputArea2Image) {
      catalogData.inputArea2 = updateImageField('inputArea2', bodyData.inputArea2Image);
      catalogData.inputArea2.imagelink = bodyData.inputArea2imagelink || catalogData.inputArea2.imagelink;
    }

    if (bodyData?.inputArea3Title || bodyData?.inputArea3Image) {
      catalogData.inputArea3 = updateImageField('inputArea3', bodyData.inputArea3Image);
      catalogData.inputArea3.Title = bodyData.inputArea3Title || catalogData.inputArea3.Title;
    }

    if (bodyData?.inputarea4imagelink || bodyData?.inputArea4Image) {
      catalogData.inputArea4 = updateImageField('inputArea4', bodyData.inputArea4Image);
      catalogData.inputArea4.imagelink = bodyData.inputarea4imagelink || catalogData.inputArea4.imagelink;
    }

    if (bodyData?.inputarea5centertext || bodyData?.inputarea5buttontext || bodyData?.inputArea5Image) {
      catalogData.inputArea5 = updateImageField('inputArea5', bodyData.inputArea5Image);
      catalogData.inputArea5.centerText = bodyData.inputarea5centertext || catalogData.inputArea5.centerText;
      catalogData.inputArea5.buttonText = bodyData.inputarea5buttontext || catalogData.inputArea5.buttonText;
    }

    const updatedCatalogItem = await Catalog.findOneAndUpdate(
      { catalog_id: req.params.catalog_id },
      catalogData,
      { new: true }
    );

    res.status(200).json({ message: 'Catalog item updated successfully', updatedCatalogItem });
  } catch (error) {
    console.error('Error updating catalog item by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






// Delete - Delete a catalog item by ID
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
    const deletedCatalogItem = await Catalog.findOneAndDelete(req.params.catalog_id);

    if (!deletedCatalogItem) {
      return res.status(404).json({ message: 'Catalog item not found' });
    }

    res.status(200).json({ message: 'Catalog item deleted successfully', deletedCatalogItem });
  } catch (error) {
    console.error('Error deleting catalog item by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

