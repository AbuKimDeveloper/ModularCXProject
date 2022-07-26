import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react"
import { API_URL } from "../../constants";
import "./topbar.css"

const MODAL_STATE = {
  author: "",
  title: "",
  content: ""
}

const MANDATORY_KEYS = ["author", "content", "title"];

export default function TopBar() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalData, setModalData] = useState(MODAL_STATE);

  const handleChange = (name, value) => {
    setModalData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleReset = () => {
    setModalData(MODAL_STATE);
  }

  const onHide = (e) => {
    e.stopPropagation();
    setShowAddModal(false);
  }

  const handleAddModal = () => {
    setShowAddModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isMandatory = MANDATORY_KEYS.every((key) => {
      return modalData[key];
    })
    if (!isMandatory) return;
    try {
      const { author, content, title } = modalData;
      const response = await fetch(`${API_URL}posts`, {
        method: "POST",
        headers: {
          accept: "application/json",
          'content-type': "application/json"
        },
        body: JSON.stringify({ author, content, title })
      });
      const data = await response.json();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong !");
    }
  }

  return <div className="top-bar-container">
    <h1 className="top-bar-title">Welcome to the the blog website</h1>
    <Button onClick={handleAddModal} icon={<PlusOutlined />} className="top-bar-btn" type="primary">Add a post</Button>
    {showAddModal ? <div onClick={onHide} className="add-modal-wrapper">
      <div onClick={e => e.stopPropagation()} className="add-modal">
        <Form
          style={{ flex: 1 }}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please input author's name!" }]}
          >
            <Input value={modalData.author} onChange={e => {
              handleChange("author", e.target.value);
            }} placeholder="Author Name" />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input value={modalData.title} onChange={e => {
              handleChange("title", e.target.value);
            }} placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input content!" }]}
          >
            <Input.TextArea value={modalData.content} onChange={e => {
              handleChange("content", e.target.value);
            }} placeholder="Content" />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 10 }} danger type="primary" htmlType="reset">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div> : null}
  </div>
}
