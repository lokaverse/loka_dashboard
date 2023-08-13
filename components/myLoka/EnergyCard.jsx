import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RechargeButton from "./RechargeButton";

import { faBolt } from "@fortawesome/free-solid-svg-icons";
const EnergyCard = () => {
  return (
    <div className="flex-col w-full p-0 justify-center items-center text-center   ">
      <div className="w-full p-2  text-yellow-400 font-medium h-2/6">
        Energy Status
      </div>
      <div className="inline-block px-2  text-white font-medium h-2/6 bg-custom-green rounded-sm">
        58 days left <FontAwesomeIcon icon={faBolt} />
      </div>
      <div className="w-full p-0 pt-4 grid h-3/6 ">
        <RechargeButton buttonText={"RECHARGE"} />
      </div>
      <div className="w-full p-0 grid pt-4    h-1/6">$230 spent</div>
    </div>
  );
};

export default EnergyCard;
