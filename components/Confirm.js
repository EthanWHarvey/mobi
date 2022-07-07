import React from "react";
import RideSelector from "./RideSelector";
import { useContext } from "react";
import { MobiContext } from "../context/mobiContext";
import { ethers } from 'ethers'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `font-mono bg-blue-300 text-white m-4 py-4 text-center text-xl`,
};

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
   
  } = useContext(MobiContext);

  const storeTripDetails = async () => {
    try {
      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_MOBI_ADDRESS,
            gas: '0x7EF40', // 520000 Gwei
            value: ethers.utils.parseEther(price)._hex,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
      {pickupCoordinates && dropoffCoordinates && <RideSelector />}
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropoff)}
          >
            Confirm {selectedRide.service || 'MobiZ'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
