import Screen from "@/layouts/Screen";
import { Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Profile() {
  return (
    <Screen>
      <div className="w-full mb-5">
        <div className="w-full sm:container  px-4 relative flex items-center  flex-wrap sm:flex-nowrap justify-end container mx-[15px] sm:mx-auto space-3">
          <div
            // onClick={() => checkIsShop()}
            className="px-2 py-2 bg-red-500 text-white font-semibold cursor-pointer rounded-md"
          >
            <span>My Shop</span>
          </div>
        </div>
      </div>
      <div className="w-full sm:container mx-auto px-4">
        <div className="flex flex-col gap-x-[8px] mb-8"></div>
      </div>
    </Screen>
  );
}
