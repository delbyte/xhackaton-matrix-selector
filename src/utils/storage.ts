// Types
interface SelectionData {
  teamName: string;
  email: string;
  rowIndex: number;
  colIndex: number;
  timestamp: string;
}

// Local storage keys
const STORAGE_KEY = 'hackathon-matrix-selections';
const EMAIL_ATTEMPTS_KEY = 'hackathon-matrix-attempts';

// Get all selection data
export const getAllSelections = (): SelectionData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting selection data:', error);
    return [];
  }
};

// Save selection data
export const saveSelectionData = (data: SelectionData): void => {
  try {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify([data]));
    
    // Update attempts count
    setAttemptsByEmail(data.email, 0);
    
    // Also save to a JSON file if we're in a deployed environment
    updateJsonFile();
  } catch (error) {
    console.error('Error saving selection data:', error);
  }
};

// Get attempts by email
export const getAttemptsByEmail = (email: string): number => {
  try {
    const selections = getAllSelections();
    return selections.find(s => s.email === email) ? 3 : 0;
  } catch (error) {
    console.error('Error getting attempts:', error);
    return 0;
  }
};

// Set attempts by email
export const setAttemptsByEmail = (email: string, count: number): void => {
  try {
    localStorage.setItem(EMAIL_ATTEMPTS_KEY, JSON.stringify({ [email]: count }));
  } catch (error) {
    console.error('Error setting attempts:', error);
  }
};

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(EMAIL_ATTEMPTS_KEY);
};

// Export data to JSON file
export const exportDataToJson = (): string => {
  const selections = getAllSelections();
  
  const dataToExport = {
    selections,
    exportedAt: new Date().toISOString()
  };
  
  return JSON.stringify(dataToExport, null, 2);
};

// Generate a downloadable link for the JSON data
export const getJsonDownloadLink = (): string => {
  const jsonData = exportDataToJson();
  const blob = new Blob([jsonData], { type: 'application/json' });
  return URL.createObjectURL(blob);
};

// Update the JSON file in the data folder (for deployed environments)
const updateJsonFile = (): void => {
  // In a real deployed environment, you would use a server-side endpoint to update a real file
  // For this implementation, we'll just make the data available for download
  
  // Create a hidden admin access link in the page if it doesn't exist
  if (!document.getElementById('admin-data-link')) {
    const adminSection = document.createElement('div');
    adminSection.id = 'admin-data-section';
    adminSection.style.position = 'fixed';
    adminSection.style.bottom = '10px';
    adminSection.style.right = '10px';
    adminSection.style.zIndex = '1000';
    adminSection.style.padding = '10px';
    adminSection.style.backgroundColor = 'rgba(0,0,0,0.8)';
    adminSection.style.borderRadius = '5px';
    adminSection.style.display = 'none';
    
    const dataLink = document.createElement('a');
    dataLink.id = 'admin-data-link';
    dataLink.textContent = 'Download Selection Data';
    dataLink.style.color = '#4F46E5';
    dataLink.style.textDecoration = 'underline';
    dataLink.style.cursor = 'pointer';
    dataLink.download = 'hackathon-matrix-data.json';
    
    adminSection.appendChild(dataLink);
    document.body.appendChild(adminSection);
    
    // Add a secret keyboard combination to show the admin section
    // Press 'a' + 'd' + 'm' + 'i' + 'n' in sequence
    let keySequence = '';
    document.addEventListener('keydown', (e) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.includes('admin')) {
        adminSection.style.display = 'block';
        keySequence = '';
        
        // Update the download link
        const link = document.getElementById('admin-data-link') as HTMLAnchorElement;
        if (link) {
          link.href = getJsonDownloadLink();
        }
      }
      // Reset if sequence gets too long
      if (keySequence.length > 20) keySequence = '';
    });
  }
  
  // Update the download link
  const link = document.getElementById('admin-data-link') as HTMLAnchorElement;
  if (link) {
    link.href = getJsonDownloadLink();
  }
};