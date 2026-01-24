import { openDB } from 'idb';
import CryptoJS from 'crypto-js';

const DB_NAME = 'EasyPeCloud';
const DB_VERSION = 1;
const STORE_NAME = 'userData';
const FILES_STORE = 'userFiles';
const SECRET_KEY = 'super-secret-local-cloud-key'; // In a real app, this would be user-derived or fetched securely.

// Initialize the Database
export const initCloud = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(FILES_STORE)) {
                db.createObjectStore(FILES_STORE, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

// Encrypt data
const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Save User Profile
export const saveUserProfile = async (userData) => {
    const db = await initCloud();
    const encryptedData = encrypt(userData);
    // We store the encrypted blob but also keep the ID visible for lookup if needed
    await db.put(STORE_NAME, { id: 'currentUser', data: encryptedData, lastUpdated: new Date() });
    return true;
};

// Get User Profile
export const getUserProfile = async () => {
    const db = await initCloud();
    const record = await db.get(STORE_NAME, 'currentUser');
    if (!record) return null;
    return decrypt(record.data);
};

// Simulate File Storage (Photos, Docs) - supporting the "40GB" concept via Blob storage
export const uploadFileToCloud = async (fileObj) => {
    const db = await initCloud();
    // In a real scenario, we'd encrypt the binary data too.
    // For this simulation, we store the file directly to avoid massive overhead during encryption of large files in JS.
    await db.put(FILES_STORE, {
        name: fileObj.name,
        type: fileObj.type,
        data: fileObj, // Storing the Blob
        uploadedAt: new Date()
    });
    return true;
};

export const getCloudFiles = async () => {
    const db = await initCloud();
    return db.getAll(FILES_STORE);
};

export const clearCloud = async () => {
    const db = await initCloud();
    await db.clear(STORE_NAME);
    await db.clear(FILES_STORE);
};
