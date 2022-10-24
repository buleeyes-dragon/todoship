import Head from 'next/head'
// 导入 state
import {useState} from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Checkbox, Grid, Row, Text, Tooltip, Modal, Input} from "@nextui-org/react";
import {Document, Calendar, Star, Setting, InfoCircle, Message, Plus} from 'react-iconly'
import colorMode from '../todoapp.config'
import languages from '../language.config'
import ReactiveButton from 'reactive-button';

export default function Todo(props) {
    // 获取今天的日期和星期
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    // const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    console.log(props);
    return (<div className="bg-gray-100 dark:bg-gray-900 z-10 bg-transparent pl-5 pt-2 h-screen w-full">
            {/*显示时间，在一行显示*/}
            <div className="flex justify-between items-center max-h-20">
                <div>
                    <Text h1
                          size={30}
                        // 字体颜色
                          className="text-gray-800 dark:text-gray-100 font-sans font-semibold tracking-normal"
                        // className="font-sans font-semibold"
                          weight="bold">
                        {props.lang.todo.title}</Text>
                    <Text h3 size={14} className="text-gray-500 dark:text-gray-300">
                        {year}-{month}-{date} {props.lang.week[day]}
                    </Text>
                </div>

                {/*    发布按钮，在最右边*/}
                <div className="mr-10 -mt-12">
                    <ReactiveButton  rounded  color="red" idleText={
                        <div className="flex gap-3 items-center">
                            <Plus set="bulk" primaryColor="white"/> {props.lang.todo.add}
                        </div>
                    } shadow/>
                </div>
            </div>
            {/*<div className="absolute top-0 left-0 w-96 h-96 bg-red-500 bg-opacity-50" style={{zIndex:-1}}></div>*/}
        </div>);
}