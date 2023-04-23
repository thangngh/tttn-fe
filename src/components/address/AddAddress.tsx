import { Button, Form, Input, Modal } from "antd";
import React from "react";

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
      {/* <Form
        validateMessages={validateMessages}
        name="form-name"
        form={forms}
        onFinish={onCreateAddressUser}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <Form.Item name={"name"} rules={[{ required: true }]}>
              <Input className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
            </Form.Item>
          </div>
        </div>
      </Form> */}
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
          <button className="btn btn-outline btn-success">+ Add new </button>
        </div>
      </div>
    </Modal>
  );
}
