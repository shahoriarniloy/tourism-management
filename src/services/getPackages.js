export const getPackages = async () => { 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/get-all`)
    const data = await res.json();
    return data?.packages;
  
  }
