import { Form, Input, Modal, Rate, Upload } from "antd";
import Rating from "./rating";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hook";
import { addReviewProductAction } from "@/redux/action/user.action";

interface IProps {
  openModal?: boolean;
  handleCloseModal?: () => void;
  productId: string;
  userId?: string;
}
export default function AddReview({ productId, userId }: IProps) {
  const [forms] = Form.useForm();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
  };
  const { TextArea } = Input;
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const dispatch = useAppDispatch();
  const onCreateReview = async () => {
    const values = await forms.validateFields();
    const { content, rate, file } = values;
    try {
      await dispatch(
        addReviewProductAction({
          body: {
            productId: productId,
            rating: rate | 0,
            userId: +(userId as unknown as string),
            content,
          },
          file: {
            lists: file,
          },
        })
      );
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title text-xl">
        <button className="w-36 rounded-full bg-primary py-3 text-white font-medium">
          Write a review
        </button>
      </div>
      <div className="collapse-content ">
        <Form
          validateMessages={validateMessages}
          name="form-name"
          form={forms}
          onFinish={onCreateReview}
        >
          <div className="flex items-start justify-around">
            <div className="flex flex-col w-3/4">
              <Form.Item label="Content" name="content">
                <TextArea
                  rows={4}
                  className="bg-white  rounded-lg border-2 border-primary placeholder:text-base focus:bg-transparent"
                />
              </Form.Item>
              <div className="flex space-x-2 items-center py-2">
                <Form.Item name="rate" label="Rate">
                  <Rate className="text-primary w-full h-10" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name={"file"}
                  getValueFromEvent={normFile}
                  valuePropName="fileList"
                >
                  <Upload listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <button className="w-36 max-w-1/4 rounded-full bg-primary py-3 text-white font-medium">
              Send review
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
