import Head from "next/head";
// 导入 state
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WorkflowItem from "../components/WorkflowItem";
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
  Loading,
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
  // 获取今天的日期和星期
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const datea = today.getDate();
  const day = today.getDay();
  // 状态 showAlert
  const [showAlert, setShowAlert] = useState(false);
  // setAddok
  const [addok, setAddok] = useState(false);
  const [showError, setShowError] = useState(false);
  let colorMode = props.color;

  // 将 props 按照日期分类不同日期放入不同的数组
  const workList = props.posts;
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
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  if (!props.lang) {
    return <div>404</div>;
  }
  const handlePost = async (e) => {
    setError("");
    setMessage("");
    let iList = [];
    // fields check
    if (!title || !content) {
      setMessage("All fields are required！ 所有字段都是必填的");
      return setError("All fields are required");
    }
    let post = {
      title,
      content,
      iList,
      published: false,
      createdAt: new Date().toISOString(),
    };
    // save the post
    let response = await fetch(`/api/workflow?URL=${props.secret}`, {
      method: "POST",
      body: JSON.stringify(post),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // reset the fields
      setTitle("");
      setContent("添加成功！Success!");
      window.location.reload();
      closeHandler();
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 z-10 bg-transparent  pt-2 h-screen w-full">
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
            {props.lang.workflow.title}
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
            onClick={() => {
              handler();
            }}
            shadow
          />
        </div>
      </div>
      {/* 固定宽度的横向scroll视图 */}
      <div
        id="scroolView"
        onMouseDown={(e) => {
          // 禁止默认事件
          // e.preventDefault();
          e.target.addEventListener("mousemove", scroll);
          // 鼠标变成手掌
          e.target.style.cursor = "grab";
        }}
        // 响应鼠标左键松开事件
        onMouseUp={(e) => {
          e.target.removeEventListener("mousemove", scroll);
          // 鼠标变成默认
          e.target.style.cursor = "default";
        }}
        className="flex overflow-x-auto w-full h-4/5 pr-30 hscroll py-3 bg-transparent"
      >
        {/* 一共5列，每列w-96，不弹性变化，每行一个 */}
        <div className="flex items-start h-min min-w-max gap-x-3 pr-12 pl-3">
          {/* 按列并排渲染 WorkflowItem */}
          {props.posts.map((item) => (
            <WorkflowItem
              secret={props.secret}
              key={item._id}
              item={item}
              color={colorMode}
              lang={props.lang}
            />
          ))}
          {/* 当workListByDate无值，显示插图 */}
        </div>
        {props.posts.length === 0 && (
          <div className="flex flex-col -ml-20 items-center justify-center w-full h-full">
            <img
              src="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/jettodoqs2e.png"
              alt="empty"
              className="w-auto opacity-30 h-96"
            />
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
            {props.lang.workflow.addNewFlow}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="h-max scrollModal pb-2">
            <form className="scrollModal" onSubmit={handlePost}>
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                >
                  {props.lang.workflow.addTitle}
                </Text>
                <Input
                  label=""
                  clearable
                  bordered
                  name="title"
                  color="error"
                  // label="事件标题"
                  value={title}
                  placeholder={props.lang.workflow.addNewFlowEx}
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
                  {props.lang.workflow.addContent}
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
                  }}
                />
              </div>

              <div className="flex w-full gap-3">
                <ReactiveButton
                  idleText={props.lang.buttons.add}
                  rounded
                  shadow
                  color="red"
                  // type="submit"
                  onClick={() => {
                    handlePost();
                    // addok
                    // setAddok(true);
                  }}
                />
                {/* <div className="w-3"></div> */}
                <ReactiveButton
                  idleText={props.lang.buttons.cancel}
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
      {addok && (
        <div>
          <Modal
            open={true}
            onClose={() => setMessage("")}
            className="bg-red-200 bg-opacity-80"
          >
            <Modal.Header>
              <Loading color="error" type="points" />
            </Modal.Header>
            <Modal.Body>
              {/* <TickSquare set="bulk" primaryColor="error" /> */}

              <Text className="text-white font-sans font-bold">
                添加成功，努力刷新中...
              </Text>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {error && (
        <div>
          <Modal
            closeButton
            open={showError}
            onClose={() => setMessage("")}
            // className="bg-red-200 bg-opacity-80"
          >
            <Modal.Header>
              <Loading color="error" type="points" />
            </Modal.Header>
            <Modal.Body>
              {/* <TickSquare set="bulk" primaryColor="error" /> */}

              <Text className="text-white font-sans font-bold">
                请填写完整信息
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <ReactiveButton
                idleText="确定"
                rounded
                shadow
                color="light"
                onClick={() => setShowError(false)}
              />
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
