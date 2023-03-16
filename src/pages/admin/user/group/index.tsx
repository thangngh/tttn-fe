import { DrawerHeader } from '@/components/mui/CustomSideBar';
import { EditableCell } from '@/components/table/table-edit.cell';
import { ColumnTypes } from '@/components/table/table-type';
import AdminLayout from '@/layouts/AdminLayout';
import { useAppDispatch } from '@/redux/hook';
import { Form, Input, Modal, Table } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

interface DataType {
    id?: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    address?: string;
    phone?: string;
    email?: string;
    createdat?: Date;
    updatedat?: Date;
    isactive: boolean;
    role: string;
}

const Group = () => {
    const [editingKey, setEditingKey] = React.useState<string>('');
    const router = useRouter();
    const [forms] = Form.useForm();
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        forms.resetFields();
        setOpen(false);
    };

    const isEditing = (record: DataType) => record.id === editingKey;

    const edit = (record: DataType) => {
        forms.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.id as string);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const columns: (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'GROUP', dataIndex: 'group', key: 'group', editable: true },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    return (
        <AdminLayout>
            <div className="h-full w-full max-w-[800px] overflow-x-auto  my-4 p-4">
                <DrawerHeader />
                <h1 className="text-black">Group</h1>
                <Modal
                    style={{
                        color: 'black',
                    }}
                    open={open}
                    // onOk={handleClose}
                    // onCancel={handleClose}
                    centered
                    // footer={[
                    //   <Button key="back" onClick={handleClose}>
                    //     Hủy
                    //   </Button>,
                    //   <Button key="submit" onClick={onCreateCategory}>
                    //     Thêm
                    //   </Button>,
                    // ]}
                >
                    <div>
                        <h1 className="my-4 text-base font-medium">
                            Thêm thư mục mới
                        </h1>
                        <Form
                            validateMessages={validateMessages}
                            name="form-name"
                            form={forms}
                            // onFinish={onCreateCategory}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Name</label>
                                    <Form.Item
                                        name={'name'}
                                        rules={[{ required: true }]}
                                    >
                                        <Input className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal>
                <Form form={forms} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        // pagination={{
                        //   onChange: cancel,
                        // }}
                        bordered
                        dataSource={[]}
                        columns={mergedColumns as ColumnTypes}
                    />
                </Form>
            </div>
        </AdminLayout>
    );
};

export default Group;
