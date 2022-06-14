//logar como:
//gustavo@hotmail.com
//123456
//para acessar o add post
import { connect } from 'react-redux';
import { List, Card, Button, Col, Form, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetComments, GetPosts, PostComments } from '../actions/generalActions';
import Modal from 'antd/lib/modal/Modal';
import Comments from './Comments';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddPost from './AddPost';
import { AddUserPost } from '../actions/generalActions';

function Posts(props) {
  const { getPosts, loading, getComments, user } = useSelector(
    (state) => state.general
  );

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values.key = user.key;
    console.log(values);
    props.dispatch(AddUserPost(values));
    console.log('Received values of form: ', values);
    //window.location.reload();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const showModal = (id) => {
    let comentarios = getComments.filter((x) => x.postId === id);
    props.dispatch(PostComments(comentarios));
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = () => {
    setIsModal2Visible(true);
  };
  const handleOk2 = () => {
    setIsModal2Visible(false);
  };

  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };

  return (
    <div>
      <List
        loaging={loading.toString()}
        itemLayout="vertical"
        size="large"
        pagination={{
          position: 'both',
          onChange: (page) => {
            console.log(page);
          },
          responsive: true,
        }}
        dataSource={getPosts}
        footer={
          user.dba && (
            <div>
              <Button type="primary" onClick={() => showModal2()}>
                <PlusCircleOutlined />
              </Button>
              <Modal
                title="Adicionar Post"
                centered
                visible={isModal2Visible}
                onOk={handleOk2}
                onCancel={handleCancel2}
                footer={[]}
                width={1000}
              >
                <AddPost form={form} onFinish={onFinish} />
                <Space>
                  <Button onClick={() => setIsModal2Visible(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => form.submit()}
                    htmlType="submit"
                  >
                    Enviar
                  </Button>
                </Space>
                ,
              </Modal>
            </div>
          )
        }
        header={
          user.dba && (
            <div>
              <Button type="primary" onClick={() => showModal2()}>
                <PlusCircleOutlined />
              </Button>
              <Modal
                title="Adicionar Post"
                centered
                visible={isModal2Visible}
                onOk={handleOk2}
                onCancel={handleCancel2}
                footer={[]}
                width={1000}
              >
                <AddPost form={form} onFinish={onFinish} />
                <Space>
                  <Button onClick={() => setIsModal2Visible(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => form.submit()}
                    htmlType="submit"
                  >
                    Enviar
                  </Button>
                </Space>
                ,
              </Modal>
            </div>
          )
        }
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              title={<h1>{item.title}</h1>}
              bordered={false}
              style={{ width: '100%' }}
            >
              <p>{item.body}</p>
            </Card>
            <div>
              <br />
              <br />
              <Col span={12} offset={19}>
                <Button
                  style={{ flex: 1 }}
                  type="primary"
                  onClick={() => showModal(item.id)}
                >
                  Comentários
                </Button>
              </Col>
              <Modal
                title="Comentários"
                centered
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
              >
                <Comments />
              </Modal>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
export default connect()(Posts);
