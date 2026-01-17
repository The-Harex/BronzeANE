import React from 'react';
import { getSettings } from '@/lib/settings';
import NavbarClient from './NavbarClient';

export default function Navbar() {
  const settings = getSettings();
  
  return <NavbarClient siteName={settings.siteName} />;
}
