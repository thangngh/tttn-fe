import { DrawerHeader } from '@/components/mui/CustomSideBar';
import { EditableCell } from '@/components/table/table-edit.cell';
import { ColumnTypes } from '@/components/table/table-type';
import AdminLayout from '@/layouts/AdminLayout';
import { useAppDispatch } from '@/redux/hook';
import { Form, Table } from 'antd';
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

const mockDataUser = [
    {
        id: '1',
        firstname: 'John',
        lastname: 'Brown',
        gender: 'male',
        address: 'New York No. 1 Lake Park',
        phone: '123456789',
    },
];

const UserList = () => {
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
        { title: 'NAME', dataIndex: 'name', key: 'name', editable: true },
        { title: 'PHONE', dataIndex: 'phone', key: 'phone', editable: true },
        {
            title: 'ADDRESS',
            dataIndex: 'address',
            key: 'address',
            editable: true,
        },
        { title: 'GENDER', dataIndex: 'gender', key: 'gender', editable: true },
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
                <h1 className="text-black">User</h1>
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
                        dataSource={mockDataUser}
                        columns={mergedColumns as ColumnTypes}
                    />
                </Form>
            </div>
        </AdminLayout>
    );
};

export default UserList;
