import fs from 'fs';
import path from 'path';
import { Settings } from '@/app/actions';

const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

export function getSettings(): Settings {
  try {
    if (!fs.existsSync(settingsFilePath)) {
        return {
            siteName: "BronzeANE",
            siteDescription: "Illuminating the History, Religion, and Culture of the Bronze Age Near East.",
            contactEmail: "info@bronzeane.com"
        };
    }
    const fileData = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
        siteName: "BronzeANE",
        siteDescription: "Illuminating the History, Religion, and Culture of the Bronze Age Near East.",
        contactEmail: "info@bronzeane.com"
    };
  }
}
