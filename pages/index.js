import Head from "next/head";
// 导入 state
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
import Test from "./Test";
// 将 @nextui-org/react 中 Button 重命名为 Btn 引入
import {
  Document,
  Calendar,
  Star,
  Setting,
  InfoCircle,
  Message,
  Folder,
} from "react-iconly";
import colorMode from "../todoapp.config";
import languages from "../language.config";
import Todo from "./Todo";
import TodoCalendar from "./TodoCalendar";
import ReactiveButton from "reactive-button";
let color = colorMode.lightColor;
export default function Home({ posts, workflow }) {
  console.log(posts);
  // 创建状态用于记录当前的 active 的导航
  const [active, setActive] = useState(1);
  // 创建状态用于记录当前的颜色模式
  const [colorMode, setColorMode] = useState("light");
  // 设置的可见性
  const [settingVisible, setSettingVisible] = useState(false);
  // 语言
  const [language, setLanguage] = useState(languages.English);
  // 设置弹窗的可见性函数
  const handler = () => setSettingVisible(true);
  const closeHandler = () => {
    setSettingVisible(false);
    console.log("closed");
  };
  return (
    <div
      className={`h-screen flex font-mono font-semibold z-10  ${colorMode}`}
      // style={{fontFamily:language===languages.Chinese?"'Noto Serif SC', serif":""}}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Carter+One&family=Fredoka+One&family=Gentium+Plus:wght@700&family=Josefin+Sans:wght@200;400&family=Lily+Script+One&family=Lobster&family=Noto+Sans+SC&family=Noto+Serif+SC&family=Pacifico&family=Righteous&display=swap"
          rel="stylesheet"
        ></link>
        <title>Todoship</title>
      </Head>
      {/*装饰高斯模糊圆，blur 蓝绿色渐变*/}

      <Modal
        closeButton
        blur
        width="700px"
        aria-labelledby="modal-title"
        open={settingVisible}
        onClose={closeHandler}
        // 设置边框颜色
        // css={{borderColor:colorMode==="light"?"#000":"#fff"}}
        // 背景颜色
        style={{
          backgroundColor: colorMode === "light" ? "#f5f5f5" : "#383838",
        }}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            b
            size={18}
            // 字体颜色
            style={{ color: colorMode === "light" ? "#000" : "#fff" }}
          >
            {language.setting.title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/*<Text b size={18}>{language.setting.language}</Text>*/}
          <Radio.Group
            label={language.setting.language}
            orientation="horizontal"
            color="error"
            defaultValue={["buenos-aires"]}
            // 根据值的不同改变语言
            onChange={(e) => {
              console.log(e);
              if (e === "Chinese") {
                setLanguage(languages.Chinese);
              } else {
                setLanguage(languages.English);
              }
            }}
          >
            <Radio value="Chinese">
              <Text
                style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                size={13}
              >
                简体中文
              </Text>
            </Radio>
            <Radio value="English">
              <Text
                style={{ color: colorMode === "light" ? "#000" : "#fff" }}
                size={13}
              >
                English
              </Text>
            </Radio>
          </Radio.Group>
          {/*<Row justify="space-between">*/}
          {/*    <Checkbox>*/}
          {/*        <Text size={14}>Remember me</Text>*/}
          {/*    </Checkbox>*/}
          {/*    <Text size={14}>Forgot password?</Text>*/}
          {/*</Row>*/}
        </Modal.Body>
        <Modal.Footer>
          {/*<Button flat auto  onClick={closeHandler}>*/}
          {/*    Close*/}
          {/*</Button>*/}
          <ReactiveButton
            idleText={language.setting.ok}
            rounded
            color="red"
            onClick={closeHandler}
          />
          <ReactiveButton
            idleText={language.setting.cancel}
            rounded
            color="light"
            onClick={closeHandler}
          />
        </Modal.Footer>
      </Modal>
      <aside
        className="relative min-w-max bg-opacity-90 h-full"
        aria-label="Sidebar"
        style={{ width: "10%" }}
      >
        {/*<div className="absolute top-0 left-0 w-96 h-96 bg-red-500 bg-opacity-50" style={{zIndex:0}}></div>*/}
        <div className="overflow-y-auto py-4 px-4 bg-gray-50 transition duration-600 ease dark:bg-gray-800 h-screen ">
          <a href="" className="flex items-center pl-2.5 mb-5">
            <img
              src="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/todoship-logo.svg"
              className="mr-2 h-6"
              alt="Logo"
            />
            <p
              style={{ fontFamily: "'Carter One', cursive", fontSize: "18px" }}
              className="dark:text-gray-100 font-mono self-center font-normal whitespace-nowrap  text-gray-700 tracking-wide"
            >
              Todosh
            </p>{" "}
            <p
              style={{ fontFamily: "'Carter One', cursive", fontSize: "18px" }}
              className="font-mono self-center font-normal whitespace-nowrap  text-red-400 tracking-wide"
            >
              i
            </p>
            <p
              style={{ fontFamily: "'Carter One', cursive", fontSize: "18px" }}
              className="dark:text-gray-100 font-mono self-center font-normal whitespace-nowrap  text-gray-700 tracking-wide mr-5"
            >
              p
            </p>
          </a>
          <ul className="space-y-2 ">
            <li>
              <a
                href="#"
                // 当 active 等于 1 时，添加 active 类名
                className={`flex  items-center pl-2.5 py-1.5 rounded-lg  bg-opacity-70 transition ease-in duration-300  hover:bg-red-50 dark:hover:bg-red-600 ${
                  active === 1 ? "bg-red-100 dark:bg-red-800" : ""
                }`}
                onClick={() => setActive(1)}
              >
                <Document
                  className="transition ease-in-out  duration-300"
                  set="bulk"
                  primaryColor={
                    active === 1 ? color.activeColor : color.iconColor
                  }
                />
                <span className="ml-3 dark:text-gray-200">
                  {language.menu.todo}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                // 当 active 等于 1 时，添加 active 类名
                className={`flex  items-center pl-2.5 py-1.5 rounded-lg  bg-opacity-70 transition ease-in duration-300  hover:bg-red-50 dark:hover:bg-red-600 ${
                  active === 2 ? "bg-red-100 dark:bg-red-800" : ""
                }`}
                onClick={() => setActive(2)}
              >
                <Folder
                  set="bulk"
                  className="transition ease-in-out  duration-300"
                  primaryColor={
                    active === 2 ? color.activeColor : color.iconColor
                  }
                />
                <span className="ml-3 dark:text-gray-200">
                  {language.menu.calendar}
                </span>
              </a>
            </li>
          </ul>
          {/*  底部设置按钮*/}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex items-center mb-5 justify-center">
              {/*<Tooltip content={"Settings"}>*/}
              <Setting
                onClick={handler}
                // 点击时按钮旋转360度
                className="cursor-pointer transition ease-in-out duration-300 transform hover:rotate-180"
                set="bulk"
                primaryColor={color.iconColor}
              />
              <Star
                // 点击切换颜色模式
                onClick={() => {
                  if (colorMode === "light") {
                    setColorMode("dark");
                  } else if (colorMode === "dark") {
                    setColorMode("light");
                  }
                }}
                className="ml-5 cursor-pointer transition ease-in-out duration-300 transform hover:opacity-50"
                set="bulk"
                primaryColor={color.iconColor}
              />
              {/*</Tooltip>*/}
            </div>
          </div>
        </div>
      </aside>

      <div
        className="w-full"
        style={{ fontSize: "30vh", whiteSpace: "nowrap", width: "90%" }}
      >
        {active === 1 ? (
          <Todo color={colorMode} posts={posts} lang={language} />
        ) : active === 2 ? (
          <TodoCalendar color={colorMode} posts={workflow} lang={language} />
        ) : (
          <div>404</div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  let response1 = await fetch(`${dev ? DEV_URL : PROD_URL}/api/workflow`);
  // extract the data
  let data1 = await response1.json();

  return {
    props: {
      posts: data["message"],
      workflow: data1["message"],
    },
  };
}
