import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { API_URL } from '../../constants';
import "./post.css";

const MANDATORY_KEYS = ["author", "content", "title"];


export default function Post(props) {
    const { author, content, title, index, _id } = props;

    const [modalData, setModalData] = useState({
        author: author ?? "",
        content: content ?? "",
        title: title ?? ""
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const onHide = (e) => {
        e.stopPropagation();
        setShowDeleteModal(false);
    }

    const onHideEdit = (e) => {
        e.stopPropagation();
        setShowEditModal(false);
    }

    const handleChange = (name, value) => {
        setModalData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}posts/${_id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.log({ error });
        }
    }

    const handleEdit = async () => {
        const isMandatory = MANDATORY_KEYS.every((key) => {
            return modalData[key];
        })
        if (!isMandatory) return;
        try {
            const response = await fetch(`${API_URL}posts/${_id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'content-type': "application/json"
                },
                body: JSON.stringify(modalData)
            });
            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.log({ error });
        }
    }

    return <>
        <div className='post-container'>
            <div className='info-container'>
                <h2>{index + 1}) Title : {title}  </h2>
                <p className='content'>{content}</p>
                <p className='author'>{author}</p>
            </div>
            <div className='icons-container'>
                <EditOutlined onClick={e => setShowEditModal(true)} style={{ color: 'yellow', cursor: "pointer" }} />
                <DeleteOutlined onClick={e => setShowDeleteModal(true)} style={{ color: 'red', cursor: "pointer" }} />
            </div>
        </div>
        {showDeleteModal ? <div onClick={onHide} className="delete-modal-wrapper">
            <div onClick={e => e.stopPropagation()} className='delete-modal'>
                <h3>Are you sure you want to delete {title} ? </h3>
                <div className='btns-container'>
                    <Button onClick={onHide} type="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} style={{ marginLeft: 10 }} danger type="primary">
                        Delete
                    </Button>
                </div>
            </div>
        </div> : null}
        {showEditModal ? <div onClick={onHideEdit} className="delete-modal-wrapper">
            <div onClick={e => e.stopPropagation()} className='delete-modal'>
                <Input value={modalData.title} onChange={e => {
                    handleChange("title", e.target.value);
                }} placeholder="Title" />
                <Input value={modalData.content} onChange={e => {
                    handleChange("content", e.target.value);
                }} placeholder="Cotent" />
                <Input.TextArea value={modalData.author} onChange={e => {
                    handleChange("author", e.target.value);
                }} placeholder="Author" />
                <div className='btns-container'>
                    <Button onClick={onHideEdit} type="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleEdit} style={{ marginLeft: 10 }} danger type="primary">
                        Update
                    </Button>
                </div>
            </div>
        </div> : null}
    </>

}