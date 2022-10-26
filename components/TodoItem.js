// 导入 state
import {
  Checkbox,
  Grid,
  Text,
  Tooltip,
  Card,
  Modal,
  Loading,
} from "@nextui-org/react";
import { Work, Buy, TicketStar, TickSquare, Game } from "react-iconly";
import { useState } from "react";
import { ObjectID } from "bson";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ReactiveButton from "reactive-button";
export default function TodoItem(props) {
  console.log("!!!" + props.secret);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [convisible, setConvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const openHandler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const openConvisible = () => setConvisible(true);
  const closeConvisible = () => {
    setConvisible(false);
  };
  // Modal 的显示与隐藏

  // 删除事件
  const handleDelete = async (id) => {
    // reset error and message
    setError("");
    setMessage("");
    id = ObjectID(id);
    console.log("handleDelete " + id);
    // delete the post
    let response = await fetch(`/api/posts/?${props.secret}`, {
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
        className="border-red-500 bg-white dark:bg-gray-700 w-64 h-min shadow-none"
        // 点击打开Modal
        onPress={() => {
          console.log("打开Modal");
          openHandler();
        }}
      >
        <Card.Header>
          {/* 如果类型为1，就渲染生活图标，为2渲染工作，为3渲染学习 */}

          <Grid.Container css={{ pl: "$2" }}>
            <Checkbox
              lineThrough={true}
              className="text-xs"
              defaultSelected={false}
              labelColor="error"
              color="error"
              // 点击删除这条帖子
              onChange={() => handleDelete(props.id)}
              onFocusChange={openConvisible}
            >
              <Text className="text-black dark:text-white font-sans font-bold">
                {props.title}
              </Text>
            </Checkbox>
          </Grid.Container>
        </Card.Header>
        <Card.Footer className="ml-1 -mt-2 !-mb-1 ">
          <div className="bg-red-500 bg-opacity-50 rounded-lg flex items-center w-max h-min p-1">
            {props.type === 1 ? (
              <Tooltip text={props.lang.todo.itemText.life} position="bottom">
                <Game
                  className="h-8"
                  style={{ height: "18px" }}
                  set="bulk"
                  primaryColor="#F4516C"
                />
              </Tooltip>
            ) : props.type === 2 ? (
              <Tooltip text={props.lang.todo.itemText.work} position="bottom">
                <Work
                  className="h-8"
                  style={{ height: "18px" }}
                  set="bulk"
                  primaryColor="#F4516C"
                />
              </Tooltip>
            ) : (
              <Tooltip text={props.lang.todo.itemText.study} position="bottom">
                <TicketStar
                  className="h-8"
                  style={{ height: "18px" }}
                  set="bulk"
                  primaryColor="#F4516C"
                />
              </Tooltip>
            )}
            <Text
              size={10}
              className="text-black dark:text-white font-sans font-bold mr-2 ml-1"
            >
              {props.time}
            </Text>
          </div>
        </Card.Footer>
      </Card>
      {/* 提示删除成功 */}
      {message && (
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
                操作成功，努力刷新中...
              </Text>
            </Modal.Body>
          </Modal>
        </div>
      )}

      <Modal
        closeButton
        open={visible}
        aria-labelledby="modal-title"
        onClose={closeHandler}
        // 背景颜色
        style={{
          backgroundColor: props.color === "light" ? "#f5f5f5" : "#383838",
        }}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            b
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            Details
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text
            id="modal-title"
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            标题：{props.title}
          </Text>
          <Text
            id="modal-title"
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            描述：{props.content}
          </Text>
          <Text
            id="modal-title"
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            截止时间：{props.time}
          </Text>
          <Text
            id="modal-title"
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            类型：
            {props.type === 1 ? "生活" : props.type === 2 ? "工作" : "学习"}
          </Text>
          <Text
            id="modal-title"
            b
            size={18}
            // 字体颜色
            style={{ color: props.color === "light" ? "#000" : "#fff" }}
          >
            距离结束还有
            {props.time
              ? Math.floor(
                  (new Date(props.time).getTime() - new Date().getTime()) /
                    1000 /
                    60 /
                    60 /
                    24
                )
              : 0}
            天
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <ReactiveButton
            idleText="Delete"
            rounded
            color="red"
            onClick={() => handleDelete(props.id)}
          />
          <ReactiveButton
            idleText="Cancel"
            rounded
            color="light"
            onClick={() => setVisible(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
