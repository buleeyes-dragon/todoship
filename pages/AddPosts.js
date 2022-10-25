import { useState } from "react";

import styles from "../styles/Home.module.css";
import { Text, Input, Radio } from "@nextui-org/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import ReactiveButton from "reactive-button";
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [done, setDone] = useState(false);
  const [date, setDate] = useState("2022-10-25");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // 对时间date进行格式化，为年-月-日的形式
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

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

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setTitle("");
      setContent("");
      setType("");
      setDate("");
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      {/*<Nav />*/}
      <div className="h-96 scrollModal">
        <form className="scrollModal" onSubmit={handlePost}>
          {error ? (
            <div className="m-1">
              <Text className={styles.error}>{error}</Text>
            </div>
          ) : null}
          {message ? (
            <div className="m-1">
              <Text size={6} className={styles.message}>
                {message}
              </Text>
            </div>
          ) : null}
          <div className="m-1">
            <Text b size={17}>
              事件标题
            </Text>
            <Input
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
              onChange={(e) => setContent(e.target.value)}
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
              onChange={(e) => setType(e.target.value)}
            >
              <Radio value={2}>
                <Text
                  // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                  size={13}
                >
                  工作
                </Text>
              </Radio>
              <Radio value={1}>
                <Text
                  // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                  size={13}
                >
                  生活
                </Text>
              </Radio>
              <Radio value={3}>
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
          <div className="m-1">
            <ReactiveButton
              idleText="添加"
              rounded
              shadow
              color="red"
              type="submit"
              // onClick={}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
