import React from "react";

export default function Discount() {
  const [openOpenDiscountModal, setOpenOpenDiscountModal] =
    React.useState(false);
  const handleOpenDiscountModal = () => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
    setOpenOpenDiscountModal(true);
  };

  const handleCloseDiscountModal = () => {
    document.body.style.overflow = "unset";
    document.body.style.pointerEvents = "auto";
    setOpenOpenDiscountModal(false);
  };
}
