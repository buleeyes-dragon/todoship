import Head from "next/head";
import AddPost from "./AddPosts";
import PostCard from "./Postcard";
import styles from "../styles/Home.module.css";
// usestate
import { useState } from "react";
import DateSelect from "../components/DateSelect";
import ReactiveButton from "reactive-button";
import React from "react";
import { Modal, Input, Row, Checkbox, Radio, Text } from "@nextui-org/react";
import AddPosts from "./AddPosts";
import { DayPicker } from "react-day-picker";
// 引入format
import { format } from "date-fns";
export default function App() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState(1);
  const [done, setDone] = useState(false);
  const [date, setDate] = useState("2022-10-25");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // 对时间date进行格式化，为年-月-日的形式
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handlePost = async (e) => {
    // e.preventDefault();
    // console.log("handlePost");
    // reset error and message
    setError("");
    setMessage("");
    console.log(
      "title" + title + "content" + content + "type" + type + "date" + date
    );
    // fields check
    if (!title || !type || !date || !content)
      return setError("All fields are required");
    date = formatDate(date);
    // post structure
    let post = {
      title,
      content,
      type,
      date,
      done,
      published: false,
      createdAt: new Date().toISOString(),
    };
    // save the post
    let response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    console.log("response", response);
    // get the data
    let data = await response.json();
    console.log(data);
    if (data.success) {
      // reset the fields
      setTitle("");
      setContent("");
      setType("");
      setDate("");
      // set the message
      closeHandler();
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      <ReactiveButton idleText="打开" rounded shadow onClick={handler} />
      <Modal
        closeButton
        blur
        scroll
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
        className="scrollModal"
        // Todo:滚动条样式
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            className="tracking-normal font-sans"
            size={18}
          >
            添加新日程
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="h-max scrollModal pb-5">
            <form className="scrollModal" onSubmit={handlePost}>
              <div className="m-1">
                <Text b size={17}>
                  事件标题
                </Text>
                <Input
                  label=""
                  clearable
                  bordered
                  name="title"
                  color="error"
                  // label="事件标题"
                  value={title}
                  placeholder="title"
                  initialValue="title"
                  width="100%"
                  className="my-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="m-1">
                <Text b size={17}>
                  事件描述
                </Text>
                <Input
                  label=""
                  clearable
                  bordered
                  name="content"
                  color="error"
                  // label="事件标题"
                  value={content}
                  placeholder="content"
                  initialValue="title"
                  width="100%"
                  className="my-3"
                  onChange={(e) => {
                    setContent(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="m-1">
                <Text b size={17}>
                  事件类型
                </Text>
                <Radio.Group
                  className="my-3"
                  // label="事件类型"
                  orientation="horizontal"
                  color="error"
                  defaultValue={["buenos-aires"]}
                  // 根据值的不同改变语言
                  // onFocusChange={(e) => {
                  //   setType(e.target.value);
                  //   console.log(e.target.value);
                  // }}
                >
                  <Radio
                    value={2}
                    onChange={(e) => {
                      setType(e.target.value);
                      // console.log(e.target.value);
                    }}
                  >
                    <Text
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                    >
                      工作
                    </Text>
                  </Radio>
                  <Radio
                    value={1}
                    onChange={(e) => {
                      setType(e.target.value);
                      // console.log(e.target.value);
                    }}
                  >
                    <Text
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                    >
                      生活
                    </Text>
                  </Radio>
                  <Radio
                    value={3}
                    onChange={(e) => {
                      setType(e.target.value);
                      // console.log(e.target.value);
                    }}
                  >
                    <Text
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                    >
                      学习
                    </Text>
                  </Radio>
                </Radio.Group>
                {/* <textarea
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              style={{ fontSize: "1.5rem" }}
              placeholder="Post type"
            /> */}
              </div>
              <div className="m-1">
                <Text b size={17}>
                  截止日期
                </Text>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  //   footer={footer}
                />
              </div>
              <div className="flex w-full gap-3">
                <ReactiveButton
                  idleText="添加"
                  rounded
                  shadow
                  color="red"
                  // type="submit"
                  onClick={handlePost}
                />
                {/* <div className="w-3"></div> */}
                <ReactiveButton
                  idleText="取消"
                  rounded
                  shadow
                  color="light"
                  onClick={closeHandler}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* 添加成功和失败的提醒 */}
          {message && <div className="text-red-500 text-center">{message}</div>}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
