import { Button, Form, Input, Modal } from "antd";
import React from "react";
import AddNewAddress from "./newAddress/AddNewAddress";

interface IProp {
  [key: string]: any;
}

export default function AddAddress({
  openModal,
  handleCloseModal,
  handleOpenModal,
}: IProp) {
  const [forms] = Form.useForm();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
  };

  const [openAddAddressModal, setOpenAddAddressModal] = React.useState(false);
  const handleOpenAddAddressModal = () => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
    setOpenAddAddressModal(true);
  };

  const handleCloseAddAddressModal = () => {
    document.body.style.overflow = "unset";
    document.body.style.pointerEvents = "auto";
    setOpenAddAddressModal(false);
  };

  const onCreateAddressUser = async () => {};
  return (
    <Modal
      open={openModal}
      onCancel={handleCloseModal}
      centered
      footer={[
        <Button
          className="btn btn-outline btn-warning"
          key="back"
          onClick={handleCloseModal}
        >
          Close
        </Button>,
        <Button
          className="btn btn-outline btn-accent"
          key="submit"
          onClick={onCreateAddressUser}
        >
          Approved
        </Button>,
      ]}
      className="overflow-auto"
    >
      <div className="relative p-4 border-b-2 border-primary py-2">
        <div className="card-body my-3 shadow-lg bg-slate-100">
          <div className="flex -mx-6 space-x-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" checked className="checkbox" />
              </label>
            </div>
            <div className="space-y-2">
              <div>
                <p>
                  <span className="text-sm font-medium">
                    Hoàng Thị Hồng Nhung
                  </span>{" "}
                  | <span>(+84) 393271417</span>
                </p>
              </div>
              <div className="">
                Cây Xăng, Xóm2 Diễn Phong Xã Diễn Phong, Huyện Diễn Châu, Nghệ
                An
              </div>
              <button className="btn btn-primary btn-outline btn-sm text-primary">
                Default
              </button>
            </div>
            <span className="text-sm text-primary hover:underline cursor-pointer">
              Change
            </span>
          </div>
        </div>
        <div className="cart ">
          <button
            onClick={handleOpenAddAddressModal}
            className="btn btn-outline btn-success"
          >
            + Add new{" "}
          </button>
        </div>
        <AddNewAddress
          openModal={openAddAddressModal}
          handleCloseModal={handleCloseAddAddressModal}
        />
      </div>
    </Modal>
  );
}
