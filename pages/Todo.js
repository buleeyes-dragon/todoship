import Head from "next/head";
// 导入 state
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { DayPicker } from "react-day-picker";
// 引入format
import { format } from "date-fns";
import {
  Button,
  Checkbox,
  Grid,
  Row,
  Text,
  Tooltip,
  Modal,
  Input,
  Radio,
} from "@nextui-org/react";
import {
  Document,
  Calendar,
  Star,
  Setting,
  InfoCircle,
  Message,
  Plus,
} from "react-iconly";
// import colorMode from "../todoapp.config";
import languages from "../language.config";
import ReactiveButton from "reactive-button";
import TodoItem from "../components/TodoItem";
// import { StyledRadioGroupLabel } from "@nextui-org/react/types/radio/radio.styles";

export default function Todo(props) {
  // 状态 showAlert
  const [showAlert, setShowAlert] = useState(false);
  console.log(props);
  let colorMode = props.color;
  // 获取今天的日期和星期
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const datea = today.getDate();
  const day = today.getDay();
  // 获取昨天的日期
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // yesterday转换为年月日格式
  const yesterdayYear = yesterday.getFullYear();
  const yesterdayMonth = yesterday.getMonth() + 1;
  const yesterdayDate = yesterday.getDate();
  yesterday = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDate}`;

  // 将 props 按照日期分类不同日期放入不同的数组
  const todoList = props.posts;
  console.log(props);
  let todoListByDate = {};
  if (todoList) {
    todoList.forEach((item) => {
      const date = item.date;
      if (todoListByDate[date]) {
        todoListByDate[date].push(item);
      } else {
        todoListByDate[date] = [item];
      }
    });
  }
  // 将 todoListByDate 按照日期排序
  const todoListByDateSorted = {};
  Object.keys(todoListByDate)
    .sort()
    .forEach((key) => {
      todoListByDateSorted[key] = todoListByDate[key];
    });
  todoListByDate = todoListByDateSorted;
  console.log("@@@");
  console.log(Object.keys(todoListByDate).length);
  // 当鼠标在id为scroolView上按住左键移动鼠标，实现横向滚动
  const scroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    e.target.scrollLeft = scrollLeft + e.movementX;
  };
  // modal 的可见性
  const [visible, setVisible] = useState(false);
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
    console.log(new Date(date), new Date());
    // 如果时间早于昨天，提示错误
    if (new Date(date) < new Date(yesterday)) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
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
      setType(1);
      setDate("");
      // set the message
      closeHandler();
      window.location.reload();
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  // 转换函数，如果是汉语，就将星期几转换为中文
  const convertWeek = (day) => {
    if (props.lang === "zh") {
      switch (day) {
        case "Sunday":
          return "星期日";
        case "Monday":
          return "星期一";
        case "Tuesday":
          return "星期二";
        case "Wednesday":
          return "星期三";
        case "Thursday":
          return "星期四";
        case "Friday":
          return "星期五";
        case "Saturday":
          return "星期六";
      }
    }
  };

  // 随机表情
  const randomEmoji = () => {
    const emojiList = [
      "😁",
      "🎉",
      "🎈",
      "🎁",
      "🎀",
      "🎊",
      "🎂",
      "🎅",
      "🎄",
      "🎆",
      "🎇",
      "🎉",
      "🎈",
      "🎏",
      "🎐",
      "🎑",
      "🎒",
      "🎓",
      "🎠",
      "🎡",
      "🎢",
      "🎣",
      "🎤",
      "🎥",
      "🎦",
      "🎧",
      "🎨",
      "🎩",
      "🎪",
      "🎫",
      "🎬",
      "🎭",
      "🎮",
      "🎯",
      "🎰",
      "🎱",
      "🎲",
      "🎳",
      "🎴",
      "🎵",
      "🎶",
      "🎷",
      "🎸",
      "🎹",
      "🎺",
      "🎻",
      "🎼",
      "🎽",
      "🎾",
      "🎿",
      "🏀",
      "🏁",
      "🏂",
      "🏃",
      "🏄",
      "🏆",
      "🏈",
      "🏊",
      "🏠",
      "🏡",
      "🏮",
      "🏯",
      "🏰",
    ];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 z-10 bg-transparent  pt-2 h-screen w-full">
      {/*显示时间，在一行显示*/}
      <div className="flex justify-between items-center h-1/5 pl-3">
        <div>
          <Text
            h1
            size={30}
            // 字体颜色
            className="text-gray-00 dark:text-gray-100 font-sans font-semibold tracking-normal"
            // className="font-sans font-semibold"
            weight="bold"
          >
            {props.lang.todo.title}
          </Text>
          <Text h3 size={14} className="text-gray-500 dark:text-gray-300">
            {year}-{month}-{datea} {props.lang.week[day]}
          </Text>
        </div>

        {/*    发布按钮，在最右边*/}
        <div className="mr-12 -mt-12">
          <ReactiveButton
            rounded
            color="red"
            idleText={
              <div className="flex gap-3 items-center">
                <Plus set="bulk" primaryColor="white" /> {props.lang.todo.add}
              </div>
            }
            onClick={handler}
            shadow
          />
        </div>
      </div>
      {/* 固定宽度的横向scroll视图 */}
      <div
        id="scroolView"
        // 响应鼠标左键按下事件
        onMouseDown={(e) => {
          // 禁止默认事件
          e.preventDefault();
          e.target.addEventListener("mousemove", scroll);
          // 鼠标变成手掌
          e.target.style.cursor = "grab";
        }}
        // 响应鼠标左键松开事件
        onMouseUp={(e) => {
          e.target.removeEventListener("mousemove", scroll);
          console.log(e);
          // 鼠标变成默认
          e.target.style.cursor = "default";
        }}
        className="flex overflow-x-auto w-full h-4/5 pr-30 hscroll py-3 bg-transparent"
      >
        {/* 一共5列，每列w-96，不弹性变化，每行一个 */}
        <div className="flex items-start h-min min-w-max gap-x-3 pr-12 pl-3">
          {/* 渲染todoListByDate，依据不同的下标进行渲染，渲染在不同列，只渲染从昨天（yesterday变量）开始到七天后的 */}
          {todoListByDate &&
            Object.keys(todoListByDate).map((key, index) => {
              if (key >= yesterday) {
                return (
                  <div key={index} className="grid grid-cols-1 gap-1 mb-1 ml-3">
                    <div className="text-base text-black dark:text-white">
                      {key} {/* 计算并显示这一天是星期几,显示为 周几 的格式 */}·{" "}
                      {props.lang.week[new Date(key).getDay()]}
                      {/* 如果props.lang.week[new Date(key).getDay()]是周末就显示笑脸 */}
                      {props.lang.week[new Date(key).getDay()] === "星期六" ||
                      props.lang.week[new Date(key).getDay()] === "Saturday" ||
                      props.lang.week[new Date(key).getDay()] === "星期日" ||
                      props.lang.week[new Date(key).getDay()] === "Sunday"
                        ? "🎉"
                        : ""}
                    </div>
                    {todoListByDate[key].map((item, index) => {
                      return (
                        <TodoItem
                          key={index}
                          title={item.title}
                          content={item.content}
                          type={item.type}
                          time={item.date}
                          lang={props.lang}
                          id={item._id}
                          color={props.color}
                        />
                      );
                    })}
                  </div>
                );
              }
            })}
          {/* 当todoListByDate无值，显示插图 */}
        </div>
        {Object.keys(todoListByDate).length === 0 && (
          <div className="flex flex-col -ml-20 items-center justify-center w-full h-full">
            <img
              src="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/jettodoqs.png"
              alt="empty"
              className="w-96 h-96"
            />
            <Text b size={20} className="text-black dark:text-white">
              {props.lang.todo.empty}
            </Text>
          </div>
        )}
      </div>

      <Modal
        closeButton
        blur
        scroll
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
        style={{
          backgroundColor: colorMode === "light" ? "#f5f5f5" : "#383838",
        }}
        // Todo:滚动条样式
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            className="tracking-normal font-sans text-black dark:text-gray-100"
            size={18}
            style={{ color: colorMode === "light" ? "#000" : "#fff" }}
          >
            添加新日程
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="h-max scrollModal pb-5">
            <form className="scrollModal" onSubmit={handlePost}>
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                >
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
                  className="my-3 text-red-500"
                  style={{ color: "rgb(239, 68, 68)" }}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                >
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
                  style={{ color: "rgb(239, 68, 68)" }}
                  onChange={(e) => {
                    setContent(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                >
                  事件类型
                </Text>
                <Radio.Group
                  className="my-3"
                  // label="事件类型"
                  orientation="horizontal"
                  color="error"
                  defaultValue={["buenos-aires"]}
                  onChange={setType}
                >
                  <Radio value={2}>
                    <Text
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                      style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                    >
                      工作
                    </Text>
                  </Radio>
                  <Radio value={1}>
                    <Text
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                      style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                    >
                      生活
                    </Text>
                  </Radio>
                  <Radio value={3}>
                    <Text
                      style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      // style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                      size={13}
                    >
                      学习
                    </Text>
                  </Radio>
                </Radio.Group>
              </div>
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                >
                  截止日期
                </Text>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  //   footer={footer}
                />
              </div>
              {/* 如果showAlert为true显示日期错误信息 */}
              {showAlert && (
                <Modal
                  open={true}
                  onClose={() => setMessage("")}
                  className="bg-red-500 bg-opacity-80"
                >
                  <Modal.Body>
                    {/* <TickSquare set="bulk" primaryColor="error" /> */}
                    <Text className="text-white font-sans font-bold">
                      请不要选择今天之前的日期
                    </Text>
                  </Modal.Body>
                </Modal>
              )}
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
