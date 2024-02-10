import 'dotenv/config';

type ApiResponse = {
  status: string;
  message: string;
  result: any[];
}

/**
 * sample get Tx data Scripts
 */
async function main() {
  const { 
    SCROLLSCAN_API_KEY
   } = process.env
 
  console.log(`================================== [START] ==================================`);

  const apiUrl = 'https://api-sepolia.scrollscan.com/api';
  const module = 'account';
  const action = 'txlist';
  const action2 = 'txlistinternal';
  const address = '0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072';
  const startblock = 0;
  const endblock = 99999999;
  const page = 1;
  const offset = 10000;
  const sort = 'asc';

  const url = `${apiUrl}?module=${module}&action=${action}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${SCROLLSCAN_API_KEY}`;
  const url2 = `${apiUrl}?module=${module}&action=${action2}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${SCROLLSCAN_API_KEY}`;

  try {
    // call API
    const response = await fetch(url);
    const response2 = await fetch(url2);

    if (response.ok && response2.ok) {
      const data: any = await response.json();
      const filteredData: any = data.result.filter((item: any) => item.to === address);
      console.log('Normal Transaction data:', filteredData);
      console.log('Normal Transaction count:', filteredData.length);

      const data2: any = await response2.json();
      const filteredData2: any = data2.result.filter((item: any) => item.to === address);
      console.log('Internal Transaction data:', filteredData2);
      console.log('Internal Transaction count:', filteredData2.length);

      console.log(`Total Transaction count:${filteredData.length + filteredData2.length}`)
    } else {
      console.error('Failed to fetch data. Status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(`================================== [END] ==================================`);
}

main().catch(console.error)