import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DrawerHeader } from "@/components/mui/CustomSideBar";
import Screen from "@/layouts/Screen";
import StepButton from "@mui/material/StepButton";
import { createTheme, StepLabel, ThemeProvider } from "@mui/material";
import CreateShopComponent from "@/components/create-shop/CreateShop";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { isShopAction } from "@/redux/action/shop.action";
import { RootState } from "@/redux/store";
import ShopDetailComponent from "@/components/create-shop/ShopDetail";
import FinishedCreateShopComponent from "@/components/create-shop/Finished-create-shop";
import SVGLogo from "@/components/svg/Svg-logo";
import GuardLayout from "@/layouts/GuardLayout";
import { getRoleAction } from "@/redux/action/user.action";
import { useRouter } from "next/router";
import { IRole } from "@/type/auth.interface";

const steps = ["Shop information", "Shop details", "Finished"];

const theme = createTheme({
  components: {},
});

export default function CreateShop() {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector((state: RootState) => state.userReducer.role);
  const checkIsShop = useAppSelector(
    (state: RootState) => state.shopReducer.isShop
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(isShopAction());
  }, []);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getRoleAction());
  }, []);

  console.log("role ", role);

  React.useEffect(() => {
    if (checkIsShop) {
      router.push("/shop/dashboard");
    } else if (role?.data === IRole.ADMIN) {
      router.push("/not-found");
    } else {
      return;
    }
  }, [checkIsShop, role?.data, router]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <CreateShopComponent onNext={handleNext} />;
      case 1:
        return <ShopDetailComponent onBack={handleBack} onNext={handleNext} />;
      case 2:
        return <FinishedCreateShopComponent onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GuardLayout>
        <Screen>
          <DrawerHeader />
          <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
            <div className=" flex space-x-2 items-center">
              <SVGLogo />
              <span className="text-xl font-medium">| Shop Information</span>
            </div>
          </div>
          <div className="w-full sm:container  px-4 relative flex items-center  flex-wrap sm:flex-nowrap justify-end container mx-[15px] sm:mx-auto space-3">
            <div className="flex flex-col space-y-4 w-full">
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>{getStepContent(activeStep)}</div>
                )}
              </div>
            </div>
          </div>
        </Screen>
      </GuardLayout>
    </ThemeProvider>
  );
}
