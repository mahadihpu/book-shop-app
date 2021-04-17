import { Menu } from "antd";
import "antd/dist/antd.css";
import Form from "antd/lib/form/Form";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Admin.css';
const Admin = () => {
    const {handleSubmit} = useForm();
    const [imageURL,setImageURL] = useState(null);
    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key','1a86b17b63b6f25bf9866c1c1c785e83');
        imageData.append('image',event.target.files[0]);
        axios.post("https://api.imgbb.com/1/upload",imageData)
        .then(res => {
            setImageURL(res.data.data.display_url)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            imageURL: imageURL

        };
        const url = 'http://localhost:5000/addBook';
        fetch(url ,{
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(eventData)
        })
        .then(res => {
            console.log("server side response")
        })
        console.log(eventData)
    };
  return (
    <>
      <Layout>
        <Sider style={{height: '700px'}}>
          <Title level={3} style={{ color: "white" ,padding:"10px"}}>
            Book Shop
          </Title>
          <Menu mode="inline" theme="dark">
            <Menu.Item>
            Dashboard</Menu.Item>
            <Menu.Item>Manage Books</Menu.Item>
            <Menu.Item>Add Books</Menu.Item>
            <Menu.Item>Edit Books</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: "10px",backgroundColor:"white"}}>
          <Title level={3} style={{ color: "black"}}>
            Add Books
          </Title>
          </Header>
          <Content style={{padding:'40px'}}>
            <Form>
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <label>Book Name:</label>
                <input
                  className="form-control inputs"
                  type="text"
                  name="name"
                  placeholder="Book Name"
                  style={{width:'50%',marginBottom:'20px',padding:'5px'}}
                />
                <label>Author Name:</label>
                <input
                  className="form-control inputs"
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  style={{width:'50%',marginBottom:'20px',padding:'5px'}}
                />
                <label>Price:</label>
                <input
                  className="form-control inputs"
                  type="number"
                  name="price"
                  placeholder="Book Price"
                  style={{width:'50%',marginBottom:'20px',padding:'5px'}}
                />
                <input
                  className="form-control inputs"
                  type="text"
                  name="key"
                  placeholder="Book Id"
                  style={{width:'50%',marginBottom:'20px',padding:'5px'}}
                />
                <label>Choose and Image:</label>
                <input
                  type="file"
                  name="image"
                  style={{marginBottom:'20px'}}
                  onChange={handleImageUpload}
                />
                <input type="submit" className="btn btn-primary"/>
              </form>
            </Form>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Admin;
