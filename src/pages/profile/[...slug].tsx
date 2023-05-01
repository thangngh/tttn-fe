import Screen from "@/layouts/Screen";
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import React from "react";

const availableRoute = ["my-profile", "order"];

export default function Profile() {
  const router = useRouter();
  console.log("router", router);
  return <h1></h1>;
}
