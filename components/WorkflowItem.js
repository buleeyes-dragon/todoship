// 导入 state
import {
  Checkbox,
  Grid,
  Text,
  Tooltip,
  Card,
  Modal,
  Input,
  Loading,
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
import { format, set } from "date-fns";
export default function WorkflowItem(props) {
  let colorMode = props.colorMode;
  let tempList = props.item.iList;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [convisible, setConvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [reallyVisible, setReallyVisible] = useState(false);
  const openrvHandler = () => setReallyVisible(true);
  const closervHandler = () => {
    setReallyVisible(false);
  };
  const openHandler = () => setVisibleTwo(true);
  const closeHandler = () => {
    setVisibleTwo(false);
  };
  const openConvisible = () => setConvisible(true);
  const closeConvisible = () => {
    setConvisible(false);
  };

  // let itema = {
  //   title: title,
  //   content: content,
  //   date: date,
  // };
  // Modal 的显示与隐藏
  // update workflow中的iList字段，这条数据是一个对象，对象中有一个属性是 id，值是当前时间戳，第二个属性是 title ，第三个属性是 content
  const handleUpdate = async (_id, iList1) => {
    // reset error and message
    // 在数组 tempList 中加一条数据
    // 生成8位随机字符串
    let itemid = Math.random().toString(36).substr(2);

    // 检验输入是否为空
    if (!title || !date || !content) {
      setMessage("All fields are required！ 所有字段都是必填的");
      return;
      // return setError("All fields are required！ 所有字段都是必填的");
    }

    let itema = {
      title: title,
      content: content,
      date: date,
      itemid: itemid,
    };

    iList1.push(itema);
    setError("");
    setMessage("");
    // update the post
    let response = await fetch(`/api/workflow?URL=${props.secret}`, {
      method: "PUT",
      body: JSON.stringify({ id: ObjectID(_id), iList: iList1 }),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // set the message
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  // 删除 workflow 中的 iList 中的某一条数据
  const handleDeleteItem = async (_id, iList1, itemid) => {
    // reset error and message
    // 在数组 tempList 中加一条数据

    // 在 iList1 中查找 itemid==itemid的数据并删除
    for (let i = 0; i < iList1.length; i++) {
      if (iList1[i].itemid == itemid) {
        iList1.splice(i, 1);
      }
    }
    setError("");
    setMessage("");
    // update the post
    let response = await fetch(`/api/workflow?URL=${props.secret}`, {
      method: "PUT",
      body: JSON.stringify({ id: ObjectID(_id), iList: iList1 }),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // set the message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  // 删除事件
  const handleDelete = async (id) => {
    // reset error and message
    setError("");
    setMessage("");
    id = ObjectID(id);
    // delete the post
    let response = await fetch(`/api/workflow?URL=${props.secret}`, {
      method: "DELETE",
      body: ObjectID(id),
    });
    // get the datao
    let data = await response.json();
    if (data.success) {
      // set the message
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      return setMessage(data.message);
    } else {
      // set the error
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
        // isPressable
        variant="bordered"
        borderWeight="normal"
        className="border-red-500 bg-white dark:bg-gray-700 w-max h-min shadow-none"
      >
        <Card.Header>
          {/* 如果类型为1，就渲染生活图标，为2渲染工作，为3渲染学习 */}
          <div className="w-full">
            <div className="flex justify-center items-center gap-1 w-full divide-y divide-y-reverse divide-red-500">
              <Activity set="bulk" primaryColor="red" />
              <Text className="text-black dark:text-white font-sans font-bold w-full ">
                {props.item.title}
              </Text>
            </div>
            {/* <Text className="text-black dark:text-white text-sm pl-6 font-sans font-thin w-full ">
              {props.item.content}
            </Text> */}
          </div>
        </Card.Header>
        <Card.Body>
          {
            // 列表渲染 prop.item.iList数组
            props.item.iList.map((item) => (
              <Grid.Container
                key={item.itemid}
                className="flex justify-between"
                css={{ pl: "$2" }}
              >
                <Checkbox
                  lineThrough={true}
                  defaultSelected={false}
                  labelColor="error"
                  color="error"
                  label=""
                  // 点击删除这条帖子
                  // onChange={() => handleDelete(props.id)}
                  onFocusChange={openConvisible}
                  className="text-xs  "
                  // 绑定参数
                  onChange={() =>
                    handleDeleteItem(
                      props.item._id,
                      props.item.iList,
                      item.itemid
                    )
                  }
                >
                  <div>
                    <Text
                      // 规定最多显示字数
                      css={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      className="text-black w-32 dark:text-white font-sans font-semibold flex-1"
                    >
                      {item.title}
                    </Text>
                  </div>
                </Checkbox>
                <div>
                  <Text className="text-black float-right dark:text-white font-sans flex-1 font-thin">
                    {/* 格式化时间并显示 */}
                    {format(new Date(item.date), "yyyy-MM-dd")}
                  </Text>
                </div>
              </Grid.Container>
            ))
          }
        </Card.Body>
        <Card.Footer className="-mt-2 !-mb-1 ">
          <Modal.Footer>
            <ReactiveButton
              idleText={props.lang.buttons.add}
              color="red"
              outline
              onClick={openHandler}
            />
            <ReactiveButton
              idleText={props.lang.buttons.delete}
              color="secondary"
              outline
              onClick={openrvHandler}
            />
          </Modal.Footer>
        </Card.Footer>
      </Card>
      {/* 提示删除成功 */}
      {message && (
        <div>
          <Modal
            closeButton
            open={true}
            blur
            onClose={() => setMessage("")}
            // className="bg-red-200 bg-opacity-80"
          >
            <Modal.Header>
              <Loading color="error" type="points" />
            </Modal.Header>
            <Modal.Body>
              {/* <TickSquare set="bulk" primaryColor="error" /> */}

              <Text className="text-black dark:text-white font-sans font-bold">
                {message}
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
            {props.lang.workflow.addThings}
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
                  {props.lang.workflow.title}
                </Text>
                <Input
                  label=""
                  clearable
                  bordered
                  name="title"
                  color="error"
                  // label="事件标题"
                  value={title}
                  placeholder={props.lang.workflow.addExample}
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
              <div className="m-1">
                <Text
                  b
                  size={17}
                  style={{ color: props.color === "light" ? "#000" : "#fff" }}
                >
                  {props.lang.workflow.addDDL}
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
                  idleText={props.lang.buttons.add}
                  rounded
                  shadow
                  color="red"
                  // type="submit"
                  onClick={(e) => {
                    handleUpdate(props.item._id, props.item.iList);
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
      {/* 确认删除弹窗 */}
      <Modal
        closeButton
        blur
        scroll
        aria-labelledby="modal-title"
        open={reallyVisible}
        onClose={closervHandler}
        // 深浅色
        style={{
          backgroundColor: props.color === "light" ? "#f5f5f5" : "#383838",
        }}
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            className="tracking-normal font-sans text-red-500"
            size={18}
          >
            {props.lang.warning}
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
                  {props.lang.reallyDelete}
                </Text>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full gap-3">
            <ReactiveButton
              idleText={props.lang.todo.itemText.detailDelete}
              rounded
              shadow
              color="red"
              // type="submit"
              onClick={(e) => {
                setMessage("删除成功");
                handleDelete(props.item._id, props.item.iList);
              }}
            />
            {/* <div className="w-3"></div> */}
            <ReactiveButton
              idleText={props.lang.todo.itemText.detailQuit}
              rounded
              shadow
              color="light"
              onClick={closervHandler}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
