import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface NoteFormProps {
  initialNote?: { title: string; content: string; image: string };
  onSave: (note: { title: string; content: string; image: string }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialNote, onSave }) => {
  const [title, setTitle] = useState<string>(initialNote?.title || '');
  const [content, setContent] = useState<string>(initialNote?.content || '');
  const [image, setImage] = useState<string | null>(initialNote?.image || null);

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
    setImage(initialNote?.image || null);
  }, [initialNote]);

  const handleImageChange = (file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (title && content) {
      onSave({ title, content, image: image || '' });
      setTitle('');
      setContent('');
      setImage(null);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} className="max-w-md mx-auto">
      <Form.Item label="Title" rules={[{ required: true }]}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>

      <Form.Item label="Content" rules={[{ required: true }]}>
        <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
      </Form.Item>

      <Form.Item label="Image">
        <Upload
          customRequest={({ file, onSuccess }) => {
            onSuccess?.('ok');
            handleImageChange(file as File);
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save Note
      </Button>
    </Form>
  );
};

export default NoteForm;
