import type { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/generalComponents/Navigation";
import NFTDashboard from "../../components/home/NFTDashboard";
import ContractDashboard from "../../components/myLoka/ContractDashboard";
import TokenDashboard from "../../components/home/TokenDashboard";
import MiningDashboard from "../../components/home/MiningDashboard";
import DashboardMenu from "../../components/generalComponents/DashboardMenu";
import ConnectWalletPrompt from "../../components/generalComponents/ConnectWalletPrompt";
import { useConnect } from "@stacks/connect-react";
import { cvToString } from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network";

import {
  AnchorMode,
  standardPrincipalCV,
  callReadOnlyFunction,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
} from "@stacks/transactions";

import Head from "next/head";

const MyLoka: NextPage = () => {
  const dispatch = useDispatch();
  const [nftList, setNFTList] = useState([]);
  const currentInvestmentValue = useSelector(
    (state: any) => state.rootReducer.investment
  );

  const currentICPAddress = useSelector(
    (state: any) => state.rootReducer.icpAddress
  );

  const loka = useSelector((state: any) => state.rootReducer.lokaCanister);
  /*const stacksAddress = useSelector(
    (state: any) => state.rootReducer.stacksAddress

  ); */

  const getNFTList = async () => {
    if (loka && currentICPAddress) {
      const nftList_ = await loka.getOwnedContracts();
      setNFTList(nftList_);
      console.log(nftList);
    }
  };

  useEffect(() => {
    getNFTList();
  }, [loka]);
  const stacksAddress = 1;
  return (
    <div className="bg-btc-pattern w-full">
      <Head>
        <title>Loka</title>
        <meta content="Loka" name="description" />
        <link href="/favico_loka.png" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500&family=Open+Sans:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Navigation */}
      <nav className="w-full h-20 sm:h-16">
        {/* Navigation content */}
        <NavigationBar />
      </nav>

      {/* Buy Loka */}
      <div className="flex-grow flex flex-col md:flex-row h-full w-full lg:px-20   mx-auto justify-center items-start text-center">
        <div className="flex-grow flex flex-col md:flex-row lg:max-w-[90%]  mx-auto  ">
          <div className="w-full flex-grow flex flex-col ">
            {" "}
            {currentICPAddress != "" && currentICPAddress != null ? (
              <div className="flex-grow flex flex-col md:flex-row h-full w-full justify-start items-start text-left  mx-auto ">
                <div className="sticky-div hidden lg:flex items-end ">
                  <DashboardMenu selectedMenu={"My Loka"} />
                </div>
                <div className="h-full w-full mx-auto justify-start items-start text-center lg:text-left md:min-w-[900px] lg:min-w-[900px] ">
                  <section className="lg:min-h-[80px]p-5 pt-10 pb-0 lg:flex justify-start text-3xl text-center  lg:text-left text-white">
                    MY LOKA
                  </section>
                  {nftList.map((nft, index) => (
                    <section key={index} className="lg:flex p-5 ">
                      <ContractDashboard image={"lokaNFT.png"} nft={nft} />
                    </section>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full w-full mx-auto justify-center items-center text-center ">
                <ConnectWalletPrompt />
              </div>
            )}
            <section className=" p-5">{/*transaction*/}</section>
          </div>
        </div>
      </div>

      {/*<footer className="w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default MyLoka;
