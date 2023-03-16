import { Form, Input, InputNumber } from 'antd';

interface EditableCellProps<T> {
    title: React.ReactNode;
    editable: boolean;
    editing: boolean;
    children: React.ReactNode;
    dataIndex: keyof T;
    record: T;
    index: number;
    inputType: 'number' | 'text';
    handleSave: (record: T) => void;
}

export const EditableCell: React.FC<EditableCellProps<any>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex as string}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
