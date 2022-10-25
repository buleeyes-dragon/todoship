// 导入 state
import {
  Checkbox,
  Grid,
  Text,
  Tooltip,
  Card,
  Modal,
  Input,
} from "@nextui-org/react";
import {
  Work,
  Buy,
  TicketStar,
  TickSquare,
  Game,
  Activity,
} from "react-iconly";
import { useState } from "react";
import { ObjectID } from "bson";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ReactiveButton from "reactive-button";
import { DayPicker } from "react-day-picker";
export default function WorkflowItem(props) {
  let colorMode = props.colorMode;
  let tempList = props.list;
  console.log("!!!" + props.type);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [convisible, setConvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const openHandler = () => setVisibleTwo(true);
  const closeHandler = () => {
    setVisibleTwo(false);
  };
  const openConvisible = () => setConvisible(true);
  const closeConvisible = () => {
    setConvisible(false);
  };
  let itema = {
    title: title,
    content: content,
    date: date,
  };
  // Modal 的显示与隐藏
  // update workflow中的iList字段，这条数据是一个对象，对象中有一个属性是 id，值是当前时间戳，第二个属性是 title ，第三个属性是 content
  const handleUpdate = async (id, tempList) => {
    // reset error and message
    // 在数组 tempList 中加一条数据
    tempList.push(itema);
    console.log("handleUpdate " + tempList);
    setError("");
    setMessage("");
    id = ObjectID(id);
    console.log("handleUpdate " + id);
    // update the post
    let response = await fetch(`/api/workflow/`, {
      method: "UPDATE",
      body: {
        id: ObjectID(id),
        iList: tempList,
      },
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // set the message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log("更新成功");
      return setMessage(data.message);
    } else {
      // set the error
      console.log("更新失败" + data.message);
      return setError(data.message);
    }
  };

  // 删除事件
  const handleDelete = async (id) => {
    // reset error and message
    setError("");
    setMessage("");
    id = ObjectID(id);
    console.log("handleDelete " + id);
    // delete the post
    let response = await fetch(`/api/workflow/`, {
      method: "DELETE",
      body: ObjectID(id),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // set the message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      console.log("删除成功");
      return setMessage(data.message);
    } else {
      // set the error
      console.log("删除失败" + data.message);
      return setError(data.message);
    }
  };
  return (
    <div>
      {/* 如果convisible为true显示 */}
      {convisible && (
        <Confetti tweenDuration={12000} width={3000} height={3000} />
      )}
      <Card
        isPressable
        variant="bordered"
        borderWeight="normal"
        className="border-red-500 bg-white dark:bg-gray-700 w-max h-min shadow-none"
      >
        <Card.Header>
          {/* 如果类型为1，就渲染生活图标，为2渲染工作，为3渲染学习 */}

          <div className="flex justify-center items-center gap-1 w-full divide-y divide-y-reverse divide-red-500">
            <Activity set="bulk" primaryColor="red" />
            <Text className="text-black dark:text-white font-sans font-bold w-full ">
              {props.item.title}
            </Text>
          </div>
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer className="-mt-2 !-mb-1 ">
          <Modal.Footer>
            <ReactiveButton
              idleText="添加"
              color="red"
              outline
              onClick={handleUpdate}
            />
            <ReactiveButton idleText="删除" color="secondary" outline />
          </Modal.Footer>
        </Card.Footer>
      </Card>
      {/* 提示删除成功 */}
      {message && (
        <div>
          <Modal
            open={true}
            onClose={() => setMessage("")}
            className="bg-red-500 bg-opacity-80"
          >
            <Modal.Body>
              {/* <TickSquare set="bulk" primaryColor="error" /> */}
              <Text className="text-white font-sans font-bold">
                恭喜! 操作成功
              </Text>
            </Modal.Body>
          </Modal>
        </div>
      )}
      <Modal
        closeButton
        blur
        scroll
        aria-labelledby="modal-title"
        open={visibleTwo}
        onClose={closeHandler}
        width="600px"
        style={{
          backgroundColor: props.color === "light" ? "#f5f5f5" : "#383838",
        }}
        // Todo:滚动条样式
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            className="tracking-normal font-sans text-black dark:text-gray-100"
            size={18}
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            添加事件
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="h-max scrollModal pb-2">
            <form className="scrollModal">
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: props.color === "light" ? "#000" : "#fff" }}
                >
                  事件名
                </Text>
                <Input
                  label=""
                  clearable
                  bordered
                  name="title"
                  color="error"
                  // label="事件标题"
                  value={title}
                  placeholder="如XX作业"
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
                  style={{ color: props.color === "light" ? "#000" : "#fff" }}
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
                  onClick={handleUpdate}
                />
                {/* <div className="w-3"></div> */}
                <ReactiveButton
                  idleText="取消"
                  rounded
                  shadow
                  color="light"
                  onClick={setVisibleTwo}
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
