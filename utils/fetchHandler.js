import toast from 'react-hot-toast';

async function fetchHandler(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = `Error ${response.status}: ${errorData.message}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    toast.error(error.message);
    console.error(`Fetch Error: ${error}`);
    throw error;
  }
}

export default fetchHandler;

 
