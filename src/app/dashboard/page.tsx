"use client";
import React, { useEffect, useState } from "react";
import { contract } from "../../util/web3"; 

const Page = () => {
  const [nfts, setNfts] = useState<Array<{
    id: string;
    date: string;
    name: string;
    studentName: string;
    imageUrl: string;
  }>>([]);
  
  useEffect(() => {
    const fetchNfts = async () => {
      try {
        // Fetch NFTs from the contract
        const totalSupply = (await contract.methods.totalSupply().call()) as number;
        const nftsData = [];
  
        for (let i = 0; i < totalSupply; i++) {
          try {
            const tokenId = await contract.methods.tokenByIndex(i).call() as string;
  
            if (tokenId) {
              const tokenURI = await contract.methods.tokenURI(tokenId).call() as string;
  
              // Parse tokenURI to get name, date, student name, and image URL
              if (tokenURI) {
                const tokenMetadata = await fetch(tokenURI);
                const tokenData = await tokenMetadata.json();
  
                nftsData.push({
                  id: tokenId,
                  date: tokenData.date,
                  name: tokenData.name,
                  studentName: tokenData.studentName,
                  imageUrl: tokenData.imageUrl,
                });
              }
            }
          } catch (error) {
            console.error(`Error fetching NFT data for tokenId ${i}:`, (error as Error).message);
          }
        }
  
        setNfts(nftsData);
      } catch (error) {
        console.error('Error fetching NFTs:', (error as Error).message);
      }
    };
  
    fetchNfts();
  }, []);
  
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl">Degrees</h1>

      <div className="mt-8 flex items-center flex-wrap gap-8">
        {nfts.map((nft) => (
          <div key={nft.id} className="degree-card p-2 border shadow-md rounded-md max-w-[18rem]">
            <img src={nft.imageUrl} className="" alt={nft.name} />
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {nft.date}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {nft.name}
              </h2>
              <p className="mt-1">{nft.studentName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
